import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../services/firebase';
import { getOrCreateDeviceId, getBrowserDeviceInfo } from '../utils/deviceId';

export interface UserProfile {
  userId: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isSubscribed: boolean;
  bmdcRegNumber?: string;
  designation?: string;
  subscriptionPlan?: string;
  subscriptionExpiresAt?: string;
  deviceId: string;
  lastLoginAt?: unknown;
  registeredAt?: unknown;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  localDeviceId: string;
  deviceInfo: string;
  isSubscribed: boolean;
  isDeviceMatched: boolean;
  isAccessAllowed: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  transferToThisDevice: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateBmdcInfo: (bmdcRegNumber: string, designation?: string) => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const localDeviceId = getOrCreateDeviceId();
  const deviceInfo = getBrowserDeviceInfo();

  // Listen to Auth State
  useEffect(() => {
    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthError(null);

      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }

      if (!currentUser) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const userDocPath = `users/${currentUser.uid}`;
      const userDocRef = doc(db, 'users', currentUser.uid);

      try {
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
          // Developer/Admin is auto-subscribed; standard users start as unsubscribed until activated
          const isAdminOrDev = currentUser.email === 'oly.em10@gmail.com';
          const initialProfile: UserProfile = {
            userId: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Doctor',
            photoURL: currentUser.photoURL || '',
            isSubscribed: isAdminOrDev,
            deviceId: localDeviceId,
            registeredAt: serverTimestamp(),
            lastLoginAt: serverTimestamp()
          };

          await setDoc(userDocRef, initialProfile);
          setUserProfile(initialProfile);
        } else {
          const data = docSnap.data() as UserProfile;
          setUserProfile(data);

          // If the device already matches or no device was previously set, update lastLogin
          if (!data.deviceId || data.deviceId === localDeviceId) {
            await updateDoc(userDocRef, {
              deviceId: localDeviceId,
              lastLoginAt: serverTimestamp(),
              displayName: currentUser.displayName || data.displayName || 'Doctor',
              photoURL: currentUser.photoURL || data.photoURL || ''
            });
          }
        }
      } catch (err) {
        console.error('Error fetching/initializing user profile:', err);
        setAuthError(err instanceof Error ? err.message : 'Failed to synchronize user profile.');
        handleFirestoreError(err, OperationType.GET, userDocPath);
      } finally {
        setLoading(false);
      }

      // Real-time synchronization of subscription status and device locking
      unsubscribeDoc = onSnapshot(
        userDocRef,
        (snap) => {
          if (snap.exists()) {
            setUserProfile(snap.data() as UserProfile);
          }
        },
        (error) => {
          console.error('User profile subscription listener error:', error);
          handleFirestoreError(error, OperationType.GET, userDocPath);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) {
        unsubscribeDoc();
      }
    };
  }, [localDeviceId]);

  // Sign In with Google popup
  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      console.error('Sign in error:', err);
      const message = err instanceof Error ? err.message : 'Google sign-in was cancelled or failed.';
      setAuthError(message);
      setLoading(false);
    }
  };

  // Sign Out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setAuthError(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Transfer Active License to Current Device
  const transferToThisDevice = async () => {
    if (!auth.currentUser) return;
    const userDocPath = `users/${auth.currentUser.uid}`;
    const userDocRef = doc(db, 'users', auth.currentUser.uid);

    try {
      setLoading(true);
      await updateDoc(userDocRef, {
        deviceId: localDeviceId,
        lastLoginAt: serverTimestamp()
      });
      setAuthError(null);
    } catch (err) {
      console.error('Failed to transfer device access:', err);
      setAuthError('Could not transfer license to this device. Please check your network.');
      handleFirestoreError(err, OperationType.UPDATE, userDocPath);
    } finally {
      setLoading(false);
    }
  };

  // Manual refresh of profile
  const refreshProfile = async () => {
    if (!auth.currentUser) return;
    const userDocPath = `users/${auth.currentUser.uid}`;
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        setUserProfile(snap.data() as UserProfile);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, userDocPath);
    }
  };

  const updateBmdcInfo = async (bmdcRegNumber: string, designation?: string) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await setDoc(userDocRef, {
        userId: user.uid,
        email: user.email || '',
        bmdcRegNumber: bmdcRegNumber.trim(),
        designation: designation?.trim() || '',
        updatedAt: serverTimestamp()
      }, { merge: true });
      setUserProfile((prev) => prev ? {
        ...prev,
        bmdcRegNumber: bmdcRegNumber.trim(),
        designation: designation?.trim() || ''
      } : null);
    } catch (err) {
      console.error('Error updating BMDC info:', err);
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const isSubscribed = Boolean(userProfile?.isSubscribed);
  const isDeviceMatched = Boolean(userProfile?.deviceId && userProfile.deviceId === localDeviceId);
  const isAccessAllowed = Boolean(user && isSubscribed && isDeviceMatched);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        localDeviceId,
        deviceInfo,
        isSubscribed,
        isDeviceMatched,
        isAccessAllowed,
        authError,
        signInWithGoogle,
        signOutUser,
        transferToThisDevice,
        refreshProfile,
        updateBmdcInfo,
        clearAuthError: () => setAuthError(null)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

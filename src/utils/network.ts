import { useState, useEffect } from 'react';
import { doc, setDoc, getDocFromServer, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { PaymentRequest } from '../types/payment';

const PAYMENT_QUEUE_KEY = 'shishudose_payment_offline_queue_v1';

/**
 * Checks if the device has a real, functioning internet connection.
 * Bypasses false-positive `navigator.onLine` issues in webviews and Android TWAs.
 * Features strict 2.5s timeouts to prevent UI hangs.
 */
export async function checkReliableConnectivity(): Promise<boolean> {
  // If navigator in browser unambiguously reports online, do a quick verification
  const navOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  // Lightweight probe to verify actual internet access
  const fetchProbe = async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch('/manifest.json?_t=' + Date.now(), {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return res.ok || res.status === 304;
    } catch {
      return false;
    }
  };

  // Firestore server probe
  const firestoreProbe = async (): Promise<boolean> => {
    try {
      const pingPromise = getDocFromServer(doc(db, 'test', 'ping'));
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT')), 2500)
      );
      await Promise.race([pingPromise, timeoutPromise]);
      return true;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message.toLowerCase() : '';
      if (msg.includes('timeout') || msg.includes('offline') || msg.includes('unavailable') || msg.includes('network')) {
        return false;
      }
      // Permission denied or document-not-found means we reached Google Firebase servers!
      return true;
    }
  };

  // Run probes
  const [fetchResult, firestoreResult] = await Promise.allSettled([
    fetchProbe(),
    firestoreProbe()
  ]);

  const fetchSuccess = fetchResult.status === 'fulfilled' && fetchResult.value;
  const firestoreSuccess = firestoreResult.status === 'fulfilled' && firestoreResult.value;

  if (fetchSuccess || firestoreSuccess) {
    return true;
  }

  // If both probes failed, rely on navigator.onLine as conservative fallback
  return navOnline;
}

/**
 * Hook for components that need real-time reliable network status.
 */
export function useReliableOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      const realStatus = await checkReliableConnectivity();
      if (isMounted) setIsOnline(realStatus);
    };

    const handleOnline = () => {
      if (isMounted) setIsOnline(true);
      verify();
    };

    const handleOffline = () => {
      // Don't immediately assume false in mobile webviews, verify first
      verify();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    verify();

    return () => {
      isMounted = false;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Serializable offline payment object representation
 */
export interface QueuedPaymentItem extends Omit<PaymentRequest, 'createdAt'> {
  createdAtMs: number;
}

/**
 * Offline Payment Queue: Stores payment requests safely in localStorage
 * so that no doctor's submission or TrxID is ever lost.
 * Ensures clean serialization (never saving raw FieldValue symbols).
 */
export function savePaymentToOfflineQueue(payment: PaymentRequest): void {
  try {
    const queue = getOfflinePaymentQueue();
    // Prevent duplicate entries by requestId or transactionId
    const exists = queue.some(
      p => p.requestId === payment.requestId || p.transactionId === payment.transactionId
    );
    if (!exists) {
      const cleanItem: QueuedPaymentItem = {
        requestId: payment.requestId,
        userId: payment.userId,
        doctorName: payment.doctorName,
        doctorEmail: payment.doctorEmail,
        bmdcRegNumber: payment.bmdcRegNumber,
        plan: payment.plan,
        amount: payment.amount,
        senderNumber: payment.senderNumber,
        transactionId: payment.transactionId,
        status: 'pending',
        createdAtMs: Date.now()
      };
      queue.push(cleanItem);
      localStorage.setItem(PAYMENT_QUEUE_KEY, JSON.stringify(queue));
    }
  } catch (err) {
    console.warn('Could not save to offline payment queue:', err);
  }
}

export function getOfflinePaymentQueue(): QueuedPaymentItem[] {
  try {
    const raw = localStorage.getItem(PAYMENT_QUEUE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as QueuedPaymentItem[];
  } catch {
    return [];
  }
}

export function removePaymentFromOfflineQueue(requestId: string): void {
  try {
    const queue = getOfflinePaymentQueue();
    const filtered = queue.filter(p => p.requestId !== requestId);
    localStorage.setItem(PAYMENT_QUEUE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.warn('Could not update offline payment queue:', err);
  }
}

export function hasPendingOfflinePayments(): boolean {
  return getOfflinePaymentQueue().length > 0;
}

/**
 * Syncs any pending queued payments to Firestore once network connectivity is restored.
 */
export async function syncOfflinePaymentQueue(): Promise<number> {
  const queue = getOfflinePaymentQueue();
  if (queue.length === 0) return 0;

  let syncedCount = 0;
  for (const item of queue) {
    try {
      const { createdAtMs, ...rest } = item;
      const writePromise = setDoc(doc(db, 'payment_requests', item.requestId), {
        ...rest,
        status: 'pending',
        createdAt: serverTimestamp(),
        syncedFromOffline: true,
        offlineSubmittedAt: new Date(createdAtMs).toISOString()
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('SYNC_TIMEOUT')), 5000)
      );

      await Promise.race([writePromise, timeoutPromise]);
      removePaymentFromOfflineQueue(item.requestId);
      syncedCount++;
    } catch (err) {
      console.warn(`Failed to sync queued payment ${item.requestId}:`, err);
    }
  }

  return syncedCount;
}

// Automatically attempt sync when window comes back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    setTimeout(() => {
      syncOfflinePaymentQueue();
    }, 2000);
  });
}


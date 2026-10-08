import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BkashPaymentModal } from './BkashPaymentModal';
import { BKASH_CONFIG } from '../types/payment';
import { 
  Lock, 
  Smartphone, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw, 
  LogOut, 
  Stethoscope, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Receipt,
  PhoneCall
} from 'lucide-react';

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const {
    user,
    userProfile,
    loading,
    deviceInfo,
    localDeviceId,
    isSubscribed,
    isDeviceMatched,
    isAccessAllowed,
    signInWithGoogle,
    signOutUser,
    transferToThisDevice,
    refreshProfile,
    authError,
    clearAuthError
  } = useAuth();

  const [isTransferring, setIsTransferring] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md max-w-sm w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 mx-auto flex items-center justify-center animate-pulse">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Verifying Doctor Authorization</h3>
            <p className="text-xs text-slate-500 mt-1">
              Checking subscription and single-device security status...
            </p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-sky-600 h-full w-2/3 animate-indeterminate"></div>
          </div>
        </div>
      </div>
    );
  }

  // 1. NOT LOGGED IN: Doctor sign-in prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-slate-50 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="p-6 bg-gradient-to-r from-sky-800 to-slate-900 text-white text-center relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center mb-3.5 border border-white/20">
              <Stethoscope className="w-7 h-7 text-sky-300" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">ShishuDose BD</h1>
            <p className="text-xs sm:text-sm text-sky-200 mt-1 font-medium">
              Pediatric Dosing & Clinical Guidelines
            </p>
            <div className="mt-2 text-[11px] text-sky-300/80">
              Clinical Lead: Dr. Ashraful Haque Oly (ডাঃ আশরাফুল হক অলি)
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
                <button onClick={clearAuthError} className="text-rose-500 hover:text-rose-700 font-bold">×</button>
              </div>
            )}

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>DGDA approved pediatric drug formulations with ml syringe dosing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ICDDR,B & WHO dehydration and fluid calculators (Holliday-Segar)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>One-device restricted access to safeguard clinical licensing</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Doctor Sign In with Google</span>
            </button>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-500">
                Single device policy enforced via browser ID · {deviceInfo}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. LOGGED IN, BUT SUBSCRIPTION INACTIVE (isSubscribed: false)
  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white text-center">
            <div className="w-13 h-13 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-3 border border-white/20">
              <Lock className="w-6 h-6 text-sky-300" />
            </div>
            <h2 className="text-xl font-bold">ক্লিনিক্যাল সাবস্ক্রিপশন প্রয়োজন</h2>
            <p className="text-xs text-sky-200 mt-1">
              ShishuDose BD ফুল লাইসেন্স সক্রিয় করতে বিকাশ দিয়ে সাবস্ক্রাইব করুন
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* User Info Card */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'Doctor'} className="w-9 h-9 rounded-full border border-slate-300" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                    {(user.displayName || user.email || 'D')[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {user.displayName || 'Doctor'}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  {userProfile?.bmdcRegNumber ? (
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-1.5 py-0.2 rounded mt-0.5 inline-block">
                      BMDC: {userProfile.bmdcRegNumber}
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded mt-0.5 inline-block">
                      BMDC নম্বর যুক্ত করুন
                    </span>
                  )}
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Pending Activation
              </span>
            </div>

            {/* Pricing Plans Summary */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Monthly */}
              <div 
                onClick={() => setShowPaymentModal(true)}
                className="p-3 bg-slate-50 border-2 border-slate-200 hover:border-[#D12053] rounded-xl cursor-pointer transition-all hover:shadow-xs group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">মাসিক প্ল্যান</span>
                  <span className="text-[9px] font-semibold bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">১ মাস</span>
                </div>
                <div className="text-lg font-black text-[#D12053] group-hover:scale-105 transition-transform">
                  ৳১০০
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">সব পেডিয়াট্রিক ড্রাগ ডোজ ও ফ্লুইড</p>
              </div>

              {/* Yearly */}
              <div 
                onClick={() => setShowPaymentModal(true)}
                className="p-3 bg-rose-50/40 border-2 border-rose-200 hover:border-[#D12053] rounded-xl cursor-pointer transition-all hover:shadow-xs group relative overflow-hidden"
              >
                <div className="absolute -right-6 top-2 bg-emerald-600 text-white text-[7px] font-black px-6 py-0.2 rotate-45 uppercase">
                  ৳২০০ সেভ
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">বাৎসরিক প্ল্যান</span>
                  <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">১২ মাস</span>
                </div>
                <div className="text-lg font-black text-[#D12053] group-hover:scale-105 transition-transform">
                  ৳১,০০০
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">ফুল লাইসেন্স + ১ বছর সাপোর্ট</p>
              </div>
            </div>

            {/* Main bKash CTA Button */}
            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#D12053] hover:bg-[#B01740] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <Receipt className="w-4 h-4" />
              <span>বিকাশ দিয়ে সাবস্ক্রাইব করুন (bKash Payment)</span>
            </button>

            {/* Developer Contact Box */}
            <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-xs space-y-1 text-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-950">ক্লিনিক্যাল অ্যাডমিন & বিকাশ হেল্পলাইন:</span>
                <span className="font-mono text-xs font-bold text-sky-900 bg-sky-100/80 px-2 py-0.5 rounded">
                  01670175663
                </span>
              </div>
              <p className="text-[11px] text-slate-600">ডাঃ আশরাফুল হক অলি (oly.em10@gmail.com)</p>
            </div>

            {/* Actions: Refresh & Sign Out */}
            <div className="flex gap-2 pt-1">
              <button
                disabled={isRefreshing}
                onClick={async () => {
                  setIsRefreshing(true);
                  await refreshProfile();
                  setTimeout(() => setIsRefreshing(false), 600);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>স্ট্যাটাস রিফ্রেশ করুন</span>
              </button>

              <button
                onClick={() => signOutUser()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>লগআউট</span>
              </button>
            </div>
          </div>
        </div>

        {/* bKash Payment Modal */}
        <BkashPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            refreshProfile();
          }}
        />
      </div>
    );
  }

  // 3. LOGGED IN & SUBSCRIBED, BUT ACCESSED FROM ANOTHER DEVICE (DeviceId Mismatch)
  if (!isDeviceMatched) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-rose-200 shadow-xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-rose-700 to-rose-900 text-white text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-3 border border-white/20">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-bold">1-Device Access Restriction</h2>
            <p className="text-xs text-rose-100 mt-1">
              Account currently locked to another active device
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
              <p className="font-bold">Active Device Policy Violation</p>
              <p className="text-[11px] leading-relaxed text-rose-800">
                Your licensed account (<span className="font-semibold">{user.email}</span>) is active on a different browser or device. ShishuDose BD restricts each doctor license to exactly 1 device at a time.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-600">
                <span>Registered Device ID:</span>
                <span className="font-mono text-slate-900 font-bold">
                  {userProfile?.deviceId ? `...${userProfile.deviceId.slice(-10)}` : 'None'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Current Device:</span>
                <span className="font-semibold text-slate-900">{deviceInfo}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Current Device ID:</span>
                <span className="font-mono text-sky-800 font-bold">
                  ...{localDeviceId.slice(-10)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              To use this device, you can transfer your license. The other device will automatically be disconnected.
            </p>

            {/* Transfer Action */}
            <div className="space-y-2 pt-1">
              <button
                disabled={isTransferring}
                onClick={async () => {
                  setIsTransferring(true);
                  await transferToThisDevice();
                  setIsTransferring(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>{isTransferring ? 'Transferring License...' : 'Transfer Access to This Device'}</span>
              </button>

              <button
                onClick={() => signOutUser()}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. ACCESS GRANTED: User is logged in, subscribed, and on their authorized device
  return <>{children}</>;
};

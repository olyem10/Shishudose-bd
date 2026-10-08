import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Smartphone, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  Clock,
  Sparkles,
  Receipt
} from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { BKASH_CONFIG, PaymentRequest } from '../types/payment';
import { getOrCreateDeviceId } from '../utils/deviceId';
import { 
  checkReliableConnectivity, 
  savePaymentToOfflineQueue, 
  syncOfflinePaymentQueue 
} from '../utils/network';

interface BkashPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const BkashPaymentModal: React.FC<BkashPaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user, userProfile, updateBmdcInfo, signInWithGoogle } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [bmdcRegNumber, setBmdcRegNumber] = useState(userProfile?.bmdcRegNumber || '');
  const [designation, setDesignation] = useState(userProfile?.designation || '');
  const [guestDoctorName, setGuestDoctorName] = useState('');
  const [guestDoctorEmail, setGuestDoctorEmail] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (userProfile?.bmdcRegNumber && !bmdcRegNumber) {
      setBmdcRegNumber(userProfile.bmdcRegNumber);
    }
    if (userProfile?.designation && !designation) {
      setDesignation(userProfile.designation);
    }
  }, [userProfile]);

  if (!isOpen) return null;

  const currentPlan = BKASH_CONFIG.plans[selectedPlan];

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(BKASH_CONFIG.walletNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanBmdc = bmdcRegNumber.trim();
    const cleanSender = senderNumber.trim();
    const cleanTrx = transactionId.trim().toUpperCase();

    if (!cleanBmdc || cleanBmdc.length < 3) {
      setErrorMsg('অনুগ্রহ করে আপনার সঠিক বিএমডিসি রেজিস্ট্রেশন নম্বর (BMDC Reg No.) প্রদান করুন');
      return;
    }

    if (!cleanSender || cleanSender.length < 11) {
      setErrorMsg('অনুগ্রহ করে সঠিক বিকাশ মোবাইল নম্বর প্রদান করুন (১১ ডিজিট)');
      return;
    }

    if (!cleanTrx || cleanTrx.length < 6) {
      setErrorMsg('অনুগ্রহ করে বিকাশ থেকে প্রাপ্ত TrxID (Transaction ID) প্রদান করুন');
      return;
    }

    const effectiveDoctorName = user 
      ? (user.displayName || 'Doctor') 
      : (guestDoctorName.trim() || 'Doctor');

    const effectiveDoctorEmail = user 
      ? (user.email || '') 
      : guestDoctorEmail.trim();

    if (!user && (!effectiveDoctorEmail || !effectiveDoctorEmail.includes('@'))) {
      setErrorMsg('অনুগ্রহ করে আপনার সঠিক ইমেইল অ্যাড্রেস প্রদান করুন (ভেরিফিকেশনের জন্য)');
      return;
    }

    setSubmitting(true);
    const requestId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const effectiveUserId = user 
      ? user.uid 
      : (`guest_${getOrCreateDeviceId().replace(/[^a-zA-Z0-9_-]/g, '')}`).substring(0, 100);

    const paymentData: PaymentRequest = {
      requestId,
      userId: effectiveUserId,
      doctorName: effectiveDoctorName,
      doctorEmail: effectiveDoctorEmail,
      bmdcRegNumber: cleanBmdc,
      plan: selectedPlan,
      amount: currentPlan.price,
      senderNumber: cleanSender,
      transactionId: cleanTrx,
      status: 'pending',
      createdAt: serverTimestamp()
    };

    // 1. Immediately backup to offline queue and localStorage so no TrxID or submission is ever lost
    savePaymentToOfflineQueue(paymentData);
    try {
      localStorage.setItem('shishudose_submitted_trx', cleanTrx);
      localStorage.setItem('shishudose_submitted_phone', cleanSender);
      localStorage.setItem('shishudose_submitted_email', effectiveDoctorEmail);
      localStorage.setItem('shishudose_last_plan', selectedPlan);
    } catch {
      // ignore
    }

    try {
      // 2. Perform direct Firestore write with a 6-second timeout race
      const writePromise = setDoc(doc(db, 'payment_requests', requestId), paymentData);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT_SYNC_OFFLINE')), 6000)
      );

      await Promise.race([writePromise, timeoutPromise]);

      // If doctor is logged in, safely update profile BMDC info
      if (user) {
        try {
          await updateBmdcInfo(cleanBmdc, designation.trim());
        } catch (profileErr) {
          console.warn('Profile BMDC update warning:', profileErr);
        }
      }

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      console.warn('Firestore direct write state notice:', err);
      const errorStr = err instanceof Error ? err.message : String(err);

      // Only treat explicit permission denial as a block
      if (errorStr.toLowerCase().includes('permission') || errorStr.toLowerCase().includes('insufficient')) {
        setErrorMsg('ডাটাবেজ অনুমতি যাচাই করা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        setSubmitting(false);
        return;
      }

      // In case of transient network timeout or cell switch:
      // The request is already safely queued in localStorage!
      // Schedule background sync and mark success so the UI doesn't show a false-positive failure!
      setTimeout(() => {
        syncOfflinePaymentQueue();
      }, 1000);

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header - bKash Branded */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#D12053] to-[#B01740] text-white flex items-center justify-between gap-3 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">বিকাশ সাবস্ক্রিপশন পেমেন্ট</h2>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30">
                  bKash
                </span>
              </div>
              <p className="text-xs text-rose-100">
                ShishuDose BD পূর্ণাঙ্গ লাইসেন্স অ্যাক্টিভেশন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          
          {isSuccess ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                পেমেন্ট রিকোয়েস্ট জমা হয়েছে!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                আপনার বিকাশ ট্রানজেকশন আইডি (<span className="font-mono font-bold text-slate-900">{transactionId.toUpperCase()}</span>) যাচাইয়ের জন্য জমা হয়েছে।
                ক্লিনিক্যাল অ্যাডমিন (ডাঃ আশরাফুল হক অলি) দ্রুত যাচাই করে আপনার অ্যাকাউন্ট অ্যাক্টিভেট করে দেবেন।
              </p>

              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-left space-y-1">
                <p className="font-bold text-sky-950">যেকোনো প্রয়োজনে যোগাযোগ:</p>
                <p className="text-sky-900">ডাঃ আশরাফুল হক অলি (01670175663)</p>
                <p className="text-slate-600">ইমেইল: oly.em10@gmail.com</p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer transition-colors"
              >
                ঠিক আছে (বন্ধ করুন)
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Select Plan */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">
                  ১. সাবস্ক্রিপশন প্ল্যান নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Monthly Plan */}
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('monthly')}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer relative ${
                      selectedPlan === 'monthly'
                        ? 'border-[#D12053] bg-rose-50/50 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-xs">মাসিক প্ল্যান</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                        ১ মাস
                      </span>
                    </div>
                    <div className="text-base font-black text-[#D12053]">
                      ৳১০০ <span className="text-[10px] text-slate-500 font-normal">/ মাস</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                      আনলিমিটেড ক্যালকুলেটর ও গাইডলাইন
                    </p>
                  </button>

                  {/* Yearly Plan */}
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('yearly')}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer relative overflow-hidden ${
                      selectedPlan === 'yearly'
                        ? 'border-[#D12053] bg-rose-50/50 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="absolute -right-7 top-2 bg-emerald-600 text-white text-[8px] font-black px-7 py-0.5 rotate-45 uppercase">
                      ২০০ সেভ
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-xs">বাৎসরিক প্ল্যান</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                        ১২ মাস
                      </span>
                    </div>
                    <div className="text-base font-black text-[#D12053]">
                      ৳১,০০০ <span className="text-[10px] text-slate-500 font-normal">/ বছর</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                      পূর্ণ ১ বছরের ফুল এক্সেস + জরুরি সাপোর্ট
                    </p>
                  </button>
                </div>
              </div>

              {/* Step 2: Payment Instructions */}
              <div className="p-3.5 bg-rose-50 border border-rose-200/90 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-950 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#D12053]" />
                    <span>২. বিকাশ সেন্ড মানি (Send Money):</span>
                  </span>
                  <span className="text-[10px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                    Personal
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-rose-200 shadow-2xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">বিকাশ পার্সোনাল নম্বর:</span>
                    <span className="text-sm font-mono font-black text-slate-900 tracking-wider">
                      {BKASH_CONFIG.walletNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#D12053] hover:bg-[#B01740] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedNumber ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNumber ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
                  </button>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">১</span>
                    <span>বিকাশ অ্যাপে গিয়ে <strong>Send Money</strong> অপশন সিলেক্ট করুন।</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">২</span>
                    <span>টাকার পরিমাণ দিন: <strong>৳{currentPlan.price}</strong> (নির্বাচিত: {currentPlan.name})</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">৩</span>
                    <span>পেমেন্ট সফল হলে প্রাপ্ত <strong>TrxID</strong> কপি করে নিচের বক্সে দিন।</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Verification Submission Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <label className="font-bold text-slate-800 block">
                  ৩. আপনার পেমেন্টের তথ্য জমা দিন:
                </label>

                {!user ? (
                  <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-sky-950">
                        চিকিৎসকের যোগাযোগের তথ্য:
                      </span>
                      <button
                        type="button"
                        onClick={signInWithGoogle}
                        className="text-[10px] font-bold text-sky-700 hover:text-sky-900 bg-white border border-sky-300 px-2 py-0.5 rounded shadow-2xs cursor-pointer flex items-center gap-1"
                      >
                        <span>বা Google দিয়ে লগইন</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-600 block mb-0.5">আপনার নাম *</label>
                        <input
                          type="text"
                          required
                          placeholder="ডাঃ নাম"
                          value={guestDoctorName}
                          onChange={(e) => setGuestDoctorName(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-sky-600"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-600 block mb-0.5">ইমেইল অ্যাড্রেস *</label>
                        <input
                          type="email"
                          required
                          placeholder="doctor@example.com"
                          value={guestDoctorEmail}
                          onChange={(e) => setGuestDoctorEmail(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-sky-600"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-[11px] text-emerald-900">
                    <span className="font-semibold">লগইনকৃত: {user.displayName || 'Doctor'}</span>
                    <span className="text-emerald-700 font-mono text-[10px]">{user.email}</span>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-2.5 bg-rose-100 border border-rose-300 rounded-lg text-rose-900 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-700" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-2.5">
                  {/* Doctor BMDC Verification Input */}
                  <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-sky-950 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
                        <span>বিএমডিসি রেজিস্ট্রেশন নম্বর (BMDC Reg No.) *</span>
                      </label>
                      <a
                        href="https://bmdc.org.bd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-sky-700 hover:underline font-semibold"
                      >
                        BMDC পোর্টাল
                      </a>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: A-12345 বা D-6789"
                      value={bmdcRegNumber}
                      onChange={(e) => setBmdcRegNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-sky-300 rounded-lg text-xs font-mono font-bold focus:outline-sky-700"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="পদবী / ডিগ্রি (যেমন: MBBS, DCH, FCPS)"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-700 focus:outline-sky-600"
                      />
                    </div>
                    <p className="text-[10px] text-sky-800/80 leading-tight">
                      ⚠️ ওষুধের অপব্যবহার রোধে শুধুমাত্র নিবন্ধিত চিকিৎসকদের জন্য অ্যাক্সেস অনুমোদিত হয়।
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      যে বিকাশ নম্বর থেকে টাকা পাঠিয়েছেন:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono focus:outline-sky-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      বিকাশ ট্রানজেকশন আইডি (TrxID):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: 9K72J8AX..."
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono uppercase focus:outline-sky-600 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 bg-[#D12053] hover:bg-[#B01740] disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>সাবমিট করা হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <span>পেমেন্ট তথ্য সাবমিট করুন (৳{currentPlan.price})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

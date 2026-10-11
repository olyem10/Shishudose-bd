import React, { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc,
  updateDoc, 
  serverTimestamp,
  query,
  orderBy 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { useAuth, UserProfile } from '../contexts/AuthContext';
import { PaymentRequest } from '../types/payment';
import { 
  ShieldCheck, 
  Users, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Search, 
  ExternalLink, 
  RefreshCw, 
  X,
  Smartphone,
  Check,
  AlertCircle,
  Receipt,
  Copy,
  Clock,
  Calendar
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'doctors' | 'payments'>('payments');
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [paymentsList, setPaymentsList] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [copiedTrx, setCopiedTrx] = useState<string | null>(null);

  const isAdmin = user?.email === 'oly.em10@gmail.com';

  const fetchData = async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      // 1. Fetch Users
      const usersSnap = await getDocs(collection(db, 'users'));
      const uList: UserProfile[] = [];
      usersSnap.forEach((d) => {
        uList.push(d.data() as UserProfile);
      });
      uList.sort((a, b) => {
        if (a.isSubscribed === b.isSubscribed) return 0;
        return a.isSubscribed ? 1 : -1;
      });
      setUsersList(uList);

      // 2. Fetch Payment Requests
      const paymentsSnap = await getDocs(collection(db, 'payment_requests'));
      const pList: PaymentRequest[] = [];
      paymentsSnap.forEach((d) => {
        pList.push(d.data() as PaymentRequest);
      });
      // Sort: pending first, then newest
      pList.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return 0;
      });
      setPaymentsList(pList);
    } catch (err) {
      console.error('Admin fetch data error:', err);
      handleFirestoreError(err, OperationType.LIST, 'admin_data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAdmin) {
      fetchData();
    }
  }, [isOpen, isAdmin]);

  const toggleSubscription = async (targetUser: UserProfile) => {
    setUpdatingId(targetUser.userId);
    const newStatus = !targetUser.isSubscribed;
    try {
      const ref = doc(db, 'users', targetUser.userId);
      await updateDoc(ref, {
        isSubscribed: newStatus,
        updatedAt: serverTimestamp()
      });
      setUsersList(prev => prev.map(u => u.userId === targetUser.userId ? { ...u, isSubscribed: newStatus } : u));
      setNotification(`Doctor ${targetUser.displayName || targetUser.email} has been ${newStatus ? 'activated (Subscribed)' : 'deactivated'}.`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.error('Update error:', err);
      handleFirestoreError(err, OperationType.UPDATE, `users/${targetUser.userId}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const resetDevice = async (targetUser: UserProfile) => {
    if (!confirm(`Are you sure you want to reset the active device for ${targetUser.displayName || targetUser.email}? They will be able to register a new device on their next login.`)) {
      return;
    }
    setUpdatingId(targetUser.userId);
    try {
      const ref = doc(db, 'users', targetUser.userId);
      await updateDoc(ref, {
        deviceId: '',
        lastLoginAt: serverTimestamp()
      });
      setUsersList(prev => prev.map(u => u.userId === targetUser.userId ? { ...u, deviceId: '' } : u));
      setNotification(`Device reset successful for ${targetUser.displayName || targetUser.email}.`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.error('Device reset error:', err);
      handleFirestoreError(err, OperationType.UPDATE, `users/${targetUser.userId}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleApprovePayment = async (payReq: PaymentRequest) => {
    setUpdatingId(payReq.requestId);
    const durationDays = payReq.plan === 'yearly' ? 365 : 30;
    const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

    try {
      // 1. Update Payment Request status
      await updateDoc(doc(db, 'payment_requests', payReq.requestId), {
        status: 'approved',
        reviewedAt: serverTimestamp()
      });

      // 2. Activate Doctor subscription in users collection (setDoc with merge so guest submissions activate smoothly)
      await setDoc(doc(db, 'users', payReq.userId), {
        userId: payReq.userId,
        email: payReq.doctorEmail || '',
        displayName: payReq.doctorName || 'Doctor',
        bmdcRegNumber: payReq.bmdcRegNumber || '',
        isSubscribed: true,
        subscriptionPlan: payReq.plan,
        subscriptionExpiresAt: expiresAt,
        updatedAt: serverTimestamp()
      }, { merge: true });

      setPaymentsList(prev => prev.map(p => p.requestId === payReq.requestId ? { ...p, status: 'approved' } : p));
      setUsersList(prev => {
        const exists = prev.some(u => u.userId === payReq.userId);
        if (exists) {
          return prev.map(u => u.userId === payReq.userId ? { ...u, isSubscribed: true } : u);
        }
        return [
          {
            userId: payReq.userId,
            email: payReq.doctorEmail || '',
            displayName: payReq.doctorName || 'Doctor',
            bmdcRegNumber: payReq.bmdcRegNumber,
            isSubscribed: true,
            subscriptionPlan: payReq.plan,
            subscriptionExpiresAt: expiresAt,
            deviceId: ''
          },
          ...prev
        ];
      });
      setNotification(`পেমেন্ট অনুমোদিত! ${payReq.doctorName}-এর ${payReq.plan === 'yearly' ? '১ বছর' : '১ মাস'}-এর সাবস্ক্রিপশন চালু হয়েছে।`);
      setTimeout(() => setNotification(null), 4500);
    } catch (err) {
      console.error('Payment approval error:', err);
      handleFirestoreError(err, OperationType.UPDATE, `payment_requests/${payReq.requestId}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRejectPayment = async (payReq: PaymentRequest) => {
    if (!confirm(`Are you sure you want to reject payment for ${payReq.doctorName} (TrxID: ${payReq.transactionId})?`)) {
      return;
    }
    setUpdatingId(payReq.requestId);
    try {
      await updateDoc(doc(db, 'payment_requests', payReq.requestId), {
        status: 'rejected',
        reviewedAt: serverTimestamp()
      });
      setPaymentsList(prev => prev.map(p => p.requestId === payReq.requestId ? { ...p, status: 'rejected' } : p));
      setNotification(`Payment request rejected for ${payReq.doctorName}.`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.error('Payment rejection error:', err);
      handleFirestoreError(err, OperationType.UPDATE, `payment_requests/${payReq.requestId}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCopyTrx = (trx: string) => {
    navigator.clipboard.writeText(trx);
    setCopiedTrx(trx);
    setTimeout(() => setCopiedTrx(null), 2000);
  };

  if (!isOpen) return null;

  const pendingPaymentsCount = paymentsList.filter(p => p.status === 'pending').length;

  const filteredUsers = usersList.filter(u => 
    (u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPayments = paymentsList.filter(p => 
    (p.doctorName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.doctorEmail || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.transactionId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.senderNumber || '').includes(searchQuery)
  );

  const consoleUrl = "https://console.firebase.google.com/project/cedar-cosine-55p7n/firestore/databases/ai-studio-shishudosebdpedi-8ea76b97-34da-451e-b521-90ca90cfb28e/data";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">Admin Doctor & Payment Management</h2>
                <span className="bg-sky-400/20 text-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-400/30">
                  Dr. Ashraful Haque Oly (ডাঃ আশরাফুল হক অলি)
                </span>
              </div>
              <p className="text-xs text-sky-200/80">
                বিকাশ পেমেন্ট অনুমোদন, ডাক্তার সাবস্ক্রিপশন এবং ডিভাইস লকিং কন্ট্রোল
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Firebase Console link */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'payments'
                  ? 'bg-white text-[#D12053] shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Receipt className="w-3.5 h-3.5 text-[#D12053]" />
              <span>বিকাশ পেমেন্ট রিকোয়েস্ট</span>
              {pendingPaymentsCount > 0 && (
                <span className="bg-[#D12053] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pendingPaymentsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-white text-sky-900 shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-sky-700" />
              <span>ডাক্তার তালিকা ({usersList.length})</span>
            </button>
          </div>

          <a
            href={consoleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-sky-800 hover:text-sky-950 hover:underline"
          >
            <span>Firebase Console ডাটাবেস</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mx-4 mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Toolbar: Search & Refresh */}
        <div className="p-3 sm:px-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={activeTab === 'payments' ? "Search by doctor, TrxID or bKash number..." : "Search by doctor name or email..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-sky-600"
            />
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {loading && (usersList.length === 0 && paymentsList.length === 0) ? (
            <div className="py-12 text-center text-xs text-slate-500">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-sky-700 mb-2" />
              Loading data from Firestore...
            </div>
          ) : activeTab === 'payments' ? (
            /* TAB 1: BKASH PAYMENTS */
            filteredPayments.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 space-y-1">
                <Receipt className="w-8 h-8 mx-auto text-slate-300 mb-1" />
                <p>এখনও কোনো বিকাশ পেমেন্ট রিকোয়েস্ট জমা পড়েনি।</p>
                <p className="text-[11px] text-slate-500">ডাক্তাররা বিকাশ করে TrxID সাবমিট করলে এখানে দেখতে পাবেন।</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPayments.map((p) => {
                  const isPending = p.status === 'pending';
                  const isApproved = p.status === 'approved';

                  return (
                    <div
                      key={p.requestId}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isPending
                          ? 'bg-rose-50/30 border-rose-300 shadow-xs'
                          : isApproved
                          ? 'bg-emerald-50/20 border-emerald-200'
                          : 'bg-slate-50 border-slate-200 opacity-70'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Info Column */}
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {p.doctorName}
                            </span>
                            {p.bmdcRegNumber ? (
                              <span className="text-[10px] font-bold bg-sky-100 text-sky-900 px-2 py-0.5 rounded border border-sky-300 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-sky-700" />
                                <span>BMDC: {p.bmdcRegNumber}</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                                BMDC জমা দেয়নি
                              </span>
                            )}
                            <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                              isPending
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : isApproved
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {p.status}
                            </span>
                            <span className="text-[11px] font-bold text-[#D12053] bg-rose-100 px-2 py-0.2 rounded">
                              ৳{p.amount} ({p.plan === 'yearly' ? 'বাৎসরিক' : 'মাসিক'})
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="text-xs text-slate-600">{p.doctorEmail}</p>
                            {p.bmdcRegNumber && (
                              <a
                                href="https://bmdc.org.bd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-0.5 font-semibold"
                                title="BMDC অফিসিয়াল পোর্টালে এই ডাক্তারকে সার্চ করে যাচাই করুন"
                              >
                                <span>BMDC পোর্টাল চেক</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                            <div className="flex items-center gap-1 text-slate-700">
                              <span className="text-slate-400">প্রেরক বিকাশ:</span>
                              <strong className="font-mono text-slate-900">{p.senderNumber}</strong>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400">TrxID:</span>
                              <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-900">
                                {p.transactionId}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyTrx(p.transactionId)}
                                className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                                title="Copy TrxID"
                              >
                                {copiedTrx === p.transactionId ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          {isPending ? (
                            <>
                              <button
                                disabled={updatingId === p.requestId}
                                onClick={() => handleApprovePayment(p)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>অনুমোদন ও সক্রিয় করুন</span>
                              </button>

                              <button
                                disabled={updatingId === p.requestId}
                                onClick={() => handleRejectPayment(p)}
                                className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>বাতিল</span>
                              </button>
                            </>
                          ) : isApproved ? (
                            <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                              <Check className="w-4 h-4 text-emerald-600" /> সক্রিয় লাইসেন্স
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">প্রত্যাখ্যাত</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* TAB 2: DOCTORS DIRECTORY */
            filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No registered doctors found.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const isTargetAdmin = u.email === 'oly.em10@gmail.com';
                  const isPending = !u.isSubscribed;

                  return (
                    <div 
                      key={u.userId}
                      className={`py-3 px-2 sm:px-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                        isPending ? 'bg-amber-50/50 hover:bg-amber-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* User Identity Info */}
                      <div className="flex items-start gap-3 min-w-0">
                        {u.photoURL ? (
                          <img src={u.photoURL} alt={u.displayName || 'Doctor'} className="w-9 h-9 rounded-full border border-slate-200 mt-0.5" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs mt-0.5">
                            {(u.displayName || u.email || 'D')[0].toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {u.displayName || 'Doctor'}
                            </p>
                            {u.bmdcRegNumber ? (
                              <span className="text-[10px] font-bold bg-sky-100 text-sky-900 px-1.5 py-0.2 rounded border border-sky-300 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-sky-700" />
                                <span>BMDC: {u.bmdcRegNumber}</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                                BMDC নেই
                              </span>
                            )}
                            {isTargetAdmin && (
                              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded">
                                Admin
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>{u.email}</span>
                            {u.designation && (
                              <span className="text-slate-600 font-medium">· {u.designation}</span>
                            )}
                            {u.bmdcRegNumber && (
                              <a
                                href="https://bmdc.org.bd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-0.5 font-semibold"
                              >
                                <span>BMDC চেক</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                            <span>Device ID: {u.deviceId ? `...${u.deviceId.slice(-8)}` : '<Not Registered>'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          disabled={updatingId === u.userId || isTargetAdmin}
                          onClick={() => toggleSubscription(u)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            u.isSubscribed
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-600 text-white hover:bg-amber-700 shadow-2xs'
                          }`}
                        >
                          {u.isSubscribed ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Subscribed</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Activate License</span>
                            </>
                          )}
                        </button>

                        <button
                          disabled={updatingId === u.userId || !u.deviceId}
                          onClick={() => resetDevice(u)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3 text-slate-500" />
                          <span className="hidden sm:inline">Reset Device</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* Footer Guidance */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            💡 <strong>বিকাশ হেল্পলাইন:</strong> আপনার বিকাশ নম্বর <strong>01670175663</strong>-এ টাকা আসার পর TrxID মিলিয়ে "অনুমোদন ও সক্রিয় করুন" চাপুন।
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};

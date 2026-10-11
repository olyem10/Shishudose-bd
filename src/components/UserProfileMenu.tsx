import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AdminPanelModal } from './AdminPanelModal';
import { BkashPaymentModal } from './BkashPaymentModal';
import { 
  User, 
  ShieldCheck, 
  Smartphone, 
  LogOut, 
  ChevronDown, 
  Check, 
  RefreshCw,
  Users,
  ExternalLink,
  Receipt
} from 'lucide-react';

export const UserProfileMenu: React.FC = () => {
  const { user, userProfile, localDeviceId, deviceInfo, signOutUser, refreshProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.email === 'oly.em10@gmail.com';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer"
          title="Account & Subscription Status"
        >
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || 'Doctor'} className="w-6 h-6 rounded-full border border-slate-200" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center">
              {(user.displayName || user.email || 'D')[0].toUpperCase()}
            </div>
          )}
          <div className="hidden md:flex flex-col text-left leading-tight">
            <span className="text-xs font-bold text-slate-800 max-w-[110px] truncate">
              {user.displayName || 'Doctor'}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {isAdmin ? 'Admin · 1-Device' : '1-Device Active'}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-lg p-3 z-50 space-y-3 text-xs">
            {/* User Header */}
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Doctor'} className="w-9 h-9 rounded-full border border-slate-200" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center">
                  {(user.displayName || user.email || 'D')[0].toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-slate-900 truncate">
                    {user.displayName || 'Doctor'}
                  </p>
                  {isAdmin && (
                    <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                {userProfile?.bmdcRegNumber ? (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-sky-800 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-sky-700" />
                    <span>BMDC: {userProfile.bmdcRegNumber}</span>
                    {userProfile.designation && <span className="text-slate-500 font-normal">({userProfile.designation})</span>}
                  </div>
                ) : (
                  <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                    BMDC নম্বর যুক্ত নেই
                  </div>
                )}
              </div>
            </div>

            {/* License & Device Status */}
            <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Subscription:</span>
                <span className="font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" /> Active License
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Device Policy:</span>
                <span className="font-semibold text-sky-800 text-[10px]">
                  Locked to 1 Device
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Current Device:</span>
                <span className="font-medium text-slate-800 truncate max-w-[130px]">
                  {deviceInfo}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-200/60">
                <span>Device ID:</span>
                <span>...{localDeviceId.slice(-10)}</span>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin ? (
              <div className="pt-1 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowAdminModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-lg transition-colors font-bold text-xs cursor-pointer border border-sky-200/80"
                >
                  <Users className="w-3.5 h-3.5 text-sky-700" />
                  <span>Doctor & Payment Management</span>
                </button>
              </div>
            ) : (
              <div className="pt-1 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowPaymentModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-[#D12053] rounded-lg transition-colors font-bold text-xs cursor-pointer"
                >
                  <Receipt className="w-3.5 h-3.5 text-[#D12053]" />
                  <span>বিকাশ সাবস্ক্রিপশন প্ল্যান</span>
                </button>
              </div>
            )}

            {/* WhatsApp Doctor Group Link */}
            <div className="pt-1 border-t border-slate-100">
              <a
                href="https://chat.whatsapp.com/BaVUP2NDNz4Jv1STLXbNZG"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition-colors font-bold text-xs"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-current text-emerald-600" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp গ্রুপে যোগ দিন</span>
                </span>
                <span className="text-[10px] text-emerald-600 bg-white px-1.5 py-0.2 rounded border border-emerald-200">Join</span>
              </a>
            </div>

            {/* Actions */}
            <div className="space-y-1 pt-1 border-t border-slate-100">
              <button
                onClick={async () => {
                  setIsRefreshing(true);
                  await refreshProfile();
                  setTimeout(() => setIsRefreshing(false), 500);
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Sync Account Status</span>
                </span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  signOutUser();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors font-semibold cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Admin Doctor Management Modal */}
      {isAdmin && (
        <AdminPanelModal
          isOpen={showAdminModal}
          onClose={() => setShowAdminModal(false)}
        />
      )}

      {/* bKash Payment Modal for Renewals */}
      <BkashPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={() => refreshProfile()}
      />
    </>
  );
};


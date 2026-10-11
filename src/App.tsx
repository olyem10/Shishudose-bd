/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PatientProfile } from './types/pediatric';
import { calculateBSA } from './utils/calculator';
import { PatientBar } from './components/PatientBar';
import { DrugDirectory } from './components/DrugDirectory';
import { GuidelineViewer } from './components/GuidelineViewer';
import { FluidCalculator } from './components/FluidCalculator';
import { EmergencyCrashSheet } from './components/EmergencyCrashSheet';
import { PWAInstallButton, OfflineIndicator } from './components/PWAInstallButton';
import { DeveloperModal } from './components/DeveloperModal';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionGuard } from './components/SubscriptionGuard';
import { UserProfileMenu } from './components/UserProfileMenu';
import { PrescriptionProvider, usePrescription } from './contexts/PrescriptionContext';
import { PrescriptionPadModal } from './components/PrescriptionPadModal';
import { GrowthMonitoring } from './components/GrowthMonitoring';
import { 
  Pill, 
  BookOpen, 
  Droplets, 
  Zap, 
  TrendingUp,
  Moon, 
  Sun, 
  ShieldCheck, 
  FileText,
  Smartphone,
  UserCheck
} from 'lucide-react';

type NavTab = 'drugs' | 'guidelines' | 'growth' | 'fluids' | 'emergency';

const INITIAL_PATIENT: PatientProfile = {
  weightKg: 10,
  ageYears: 1,
  ageMonths: 0,
  ageDays: 0,
  gender: 'male',
  bsaM2: calculateBSA(10)
};

function MainContent() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('drugs');
  const [showDeveloperModal, setShowDeveloperModal] = useState<boolean>(false);
  const { isOpenPad, setIsOpenPad, itemCount } = usePrescription();

  // Patient Profile State with LocalStorage persistence
  const [patient, setPatient] = useState<PatientProfile>(() => {
    try {
      const saved = localStorage.getItem('shishudose_patient');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PATIENT;
  });

  // Favorites list state with LocalStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shishudose_favorites');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['paracetamol', 'amoxicillin', 'zinc_sulphate', 'salbutamol', 'cefixime'];
  });

  // Dark / Ward mode toggle
  const [isWardMode, setIsWardMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('shishudose_wardmode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shishudose_patient', JSON.stringify(patient));
    } catch (e) {
      console.warn('Storage quota', e);
    }
  }, [patient]);

  useEffect(() => {
    try {
      localStorage.setItem('shishudose_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Storage quota', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('shishudose_wardmode', String(isWardMode));
    } catch (e) {
      console.warn('Storage quota', e);
    }
  }, [isWardMode]);

  const toggleFavorite = (drugId: string) => {
    setFavorites((prev) =>
      prev.includes(drugId) ? prev.filter((id) => id !== drugId) : [...prev, drugId]
    );
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isWardMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* 
        TOP BAR CONTRACT:
        [Brand title, one line] — [4–6 nav links, 1–2 word labels, single-line] — [1–2 primary actions]
      */}
      {/* TOP BAR CONTRACT */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setActiveTab('drugs'); }}
            className="text-base sm:text-lg font-bold tracking-tight text-sky-800 flex items-center gap-2 select-none hover:text-sky-950 transition-colors shrink-0"
          >
            <img 
              src="/icon.svg" 
              alt="শিশু ডোজ লোগো" 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shadow-xs object-contain border border-sky-100 bg-white" 
            />
            <span className="font-extrabold tracking-tight text-slate-900">
              Shishu<span className="text-sky-700">Dose</span> <span className="text-[10px] sm:text-xs text-slate-500 font-semibold font-mono">BD</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop: in header) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('drugs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'drugs'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200/80 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>Drug Dosing</span>
            </button>

            <button
              onClick={() => setActiveTab('guidelines')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'guidelines'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200/80 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Clinical Guidelines</span>
            </button>

            {/* WHO Growth Chart Navigation Button */}
            <button
              onClick={() => setActiveTab('growth')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'growth'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>WHO Growth Chart (গ্রোথ চার্ট)</span>
            </button>

            <button
              onClick={() => setActiveTab('fluids')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'fluids'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200/80 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Fluids & Blood</span>
            </button>

            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'emergency'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200/80 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-rose-900">Crash Sheet</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions & WhatsApp */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Prescription Pad Header Button */}
            <button
              onClick={() => setIsOpenPad(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all active:scale-98 cursor-pointer relative"
              title="কম্প্রিহেন্সিভ প্রেসক্রিপশন প্যাড ওপেন করুন"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">প্রেসক্রিপশন প্যাড</span>
              <span className="sm:hidden font-bold">Rx Pad</span>
              {itemCount > 0 && (
                <span className="bg-white text-emerald-800 text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-2xs">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Prominent WhatsApp Doctor Community Button */}
            <a
              href="https://chat.whatsapp.com/BaVUP2NDNz4Jv1STLXbNZG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-all active:scale-98"
              title="শিশুডোজ ডক্টরস হোয়াটসঅ্যাপ গ্রুপে যুক্ত হোন"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            <UserProfileMenu />
            
            <button
              onClick={() => setShowDeveloperModal(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-bold rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-950 border border-sky-300 transition-all shadow-xs whitespace-nowrap cursor-pointer"
              title="ডক্টর প্রোফাইল ও Play Store / APK এক্সপোর্ট গাইড"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span className="hidden md:inline">Dr. Ashraful Haque Oly</span>
              <span className="md:hidden font-bold">ডাঃ অলি</span>
              <span className="bg-sky-600 text-white text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded font-black tracking-wide">APK</span>
            </button>
            <PWAInstallButton onOpenApkModal={() => setShowDeveloperModal(true)} />
          </div>

        </div>

        {/* Sub-Navigation Bar for Mobile and Tablets: Always visible scrollable tabs */}
        <div className="lg:hidden border-t border-slate-200/80 bg-slate-50/90 px-2 py-1.5 overflow-x-auto scrollbar-none flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('drugs')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'drugs'
                ? 'bg-sky-600 text-white shadow-xs font-bold'
                : 'text-slate-700 hover:bg-slate-200 bg-white border border-slate-200'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Drug Dosing</span>
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'guidelines'
                ? 'bg-sky-600 text-white shadow-xs font-bold'
                : 'text-slate-700 hover:bg-slate-200 bg-white border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guidelines</span>
          </button>

          {/* Dedicated WHO Growth Chart Mobile Tab Button */}
          <button
            onClick={() => setActiveTab('growth')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'growth'
                ? 'bg-emerald-600 text-white shadow-xs font-bold ring-2 ring-emerald-300'
                : 'text-emerald-800 hover:bg-emerald-100 bg-emerald-50 border border-emerald-300'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="font-bold">📊 WHO গ্রোথ চার্ট</span>
          </button>

          <button
            onClick={() => setActiveTab('fluids')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'fluids'
                ? 'bg-sky-600 text-white shadow-xs font-bold'
                : 'text-slate-700 hover:bg-slate-200 bg-white border border-slate-200'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Fluids & Blood</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'emergency'
                ? 'bg-rose-600 text-white shadow-xs font-bold'
                : 'text-rose-800 hover:bg-rose-100 bg-rose-50 border border-rose-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Crash Sheet</span>
          </button>
        </div>
      </header>

      {/* Persistent Patient Input Bar */}
      <PatientBar 
        patient={patient} 
        onChange={setPatient} 
        onOpenGrowthChart={() => setActiveTab('growth')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-5 sm:px-6">
        
        {/* TAB 1: DRUG DOSAGE DIRECTORY */}
        {activeTab === 'drugs' && (
          <DrugDirectory
            patient={patient}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {/* TAB 2: CLINICAL GUIDELINES */}
        {activeTab === 'guidelines' && (
          <GuidelineViewer patient={patient} />
        )}

        {/* TAB 3: WHO GROWTH MONITORING & PERCENTILES */}
        {activeTab === 'growth' && (
          <GrowthMonitoring patient={patient} onUpdatePatient={setPatient} />
        )}

        {/* TAB 4: IV FLUIDS & REHYDRATION */}
        {activeTab === 'fluids' && (
          <FluidCalculator patient={patient} />
        )}

        {/* TAB 4: EMERGENCY CRASH SHEET */}
        {activeTab === 'emergency' && (
          <EmergencyCrashSheet patient={patient} />
        )}

      </main>

      {/* Developer & Android APK Modal */}
      <DeveloperModal
        isOpen={showDeveloperModal}
        onClose={() => setShowDeveloperModal(false)}
      />

      {/* Comprehensive Pediatric Prescription Pad Modal */}
      <PrescriptionPadModal
        isOpen={isOpenPad}
        onClose={() => setIsOpenPad(false)}
        patient={patient}
      />

      {/* Floating Prescription Pad Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 no-print">
        <button
          onClick={() => setIsOpenPad(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-xl border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title="প্রেসক্রিপশন প্যাড ওপেন করুন (Open Prescription Pad)"
        >
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-sm shadow-2xs">
            ℞
          </div>
          <div className="text-left">
            <div className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">প্রেসক্রিপশন প্যাড</div>
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>Rx Pad</span>
              <span className="bg-white text-emerald-800 text-[11px] font-black px-1.5 py-0.2 rounded-full">
                {itemCount} টি ঔষধ
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Offline Toast Indicator */}
      <OfflineIndicator />

      {/* Quiet Clinical Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-medium text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Grounded in Bangladesh DGDA, ICDDR,B, WHO IMCI & BPA Pediatric Protocols</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Lead Clinical Developer: <button onClick={() => setShowDeveloperModal(true)} className="font-semibold text-sky-800 hover:underline">Dr. Ashraful Haque Oly (ডাঃ আশরাফুল হক অলি)</button> · Registered Medical Practitioner Support.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-600 flex-wrap justify-center sm:justify-end">
            <a
              href="https://chat.whatsapp.com/BaVUP2NDNz4Jv1STLXbNZG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 font-semibold hover:underline flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>WhatsApp ডক্টরস কমিউনিটি</span>
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setShowDeveloperModal(true)}
              className="text-emerald-700 hover:text-emerald-900 font-semibold hover:underline flex items-center gap-1"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android APK Edition</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>Commercial Formulations in BD</span>
            <span aria-hidden="true">·</span>
            <span>Bangla Prescription Output</span>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SubscriptionGuard>
        <PrescriptionProvider>
          <MainContent />
        </PrescriptionProvider>
      </SubscriptionGuard>
    </AuthProvider>
  );
}

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
import { 
  Pill, 
  BookOpen, 
  Droplets, 
  Zap, 
  Moon, 
  Sun, 
  ShieldCheck, 
  FileText,
  Smartphone,
  UserCheck
} from 'lucide-react';

type NavTab = 'drugs' | 'guidelines' | 'fluids' | 'emergency';

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
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setActiveTab('drugs'); }}
            className="text-lg font-bold tracking-tight text-sky-800 flex items-center gap-2 select-none hover:text-sky-950 transition-colors"
          >
            <img 
              src="/icon.svg" 
              alt="শিশু ডোজ লোগো" 
              className="w-9 h-9 rounded-full shadow-xs object-contain border border-sky-100 bg-white" 
            />
            <span className="font-extrabold tracking-tight text-slate-900">
              Shishu<span className="text-sky-700">Dose</span> <span className="text-xs text-slate-500 font-semibold font-mono">BD</span>
            </span>
          </a>

          {/* Zone 2: 4 Clean single-line text navigation links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('drugs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'drugs'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200/80'
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
                  ? 'bg-sky-50 text-sky-800 border border-sky-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Clinical Guidelines</span>
            </button>

            <button
              onClick={() => setActiveTab('fluids')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'fluids'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200/80'
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
                  ? 'bg-rose-50 text-rose-800 border border-rose-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-rose-900">Crash Sheet</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action Items & Doctor Profile */}
          <div className="flex items-center gap-2">
            {/* Prescription Pad Header Button */}
            <button
              onClick={() => setIsOpenPad(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all active:scale-98 cursor-pointer relative"
              title="কম্প্রিহেন্সিভ প্রেসক্রিপশন প্যাড ওপেন করুন"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>প্রেসক্রিপশন প্যাড</span>
              {itemCount > 0 && (
                <span className="bg-white text-emerald-800 text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-2xs">
                  {itemCount}
                </span>
              )}
            </button>

            <UserProfileMenu />
            <button
              onClick={() => setShowDeveloperModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-950 border border-sky-300 transition-all shadow-xs whitespace-nowrap cursor-pointer"
              title="ডক্টর প্রোফাইল ও Play Store / APK এক্সপোর্ট গাইড"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span className="hidden md:inline">Dr. Ashraful Haque Oly (ডাঃ আশরাফুল হক অলি)</span>
              <span className="md:hidden font-bold">ডাঃ অলি</span>
              <span className="bg-sky-600 text-white text-[10px] px-1.5 py-0.5 rounded font-black tracking-wide">APK 📥</span>
            </button>
            <PWAInstallButton onOpenApkModal={() => setShowDeveloperModal(true)} />
          </div>

        </div>
      </header>

      {/* Persistent Patient Input Bar */}
      <PatientBar patient={patient} onChange={setPatient} />

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

        {/* TAB 3: IV FLUIDS & REHYDRATION */}
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

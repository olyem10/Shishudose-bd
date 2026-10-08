import React, { useState } from 'react';
import { 
  UserCheck, 
  Smartphone, 
  Download, 
  ShieldCheck, 
  ExternalLink, 
  Check, 
  Copy, 
  FileCode, 
  Sparkles, 
  Heart,
  X,
  Settings,
  AlertCircle,
  ArrowRight,
  HelpCircle,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://shishudose-bd.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDirectInstall = async () => {
    if (isInstallable) {
      await install();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 to-sky-800 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold backdrop-blur-xs">
              👨‍⚕️
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-sky-200 font-semibold">
                Lead Clinical Developer
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex flex-wrap items-baseline gap-2">
                <span>Dr. Ashraful Haque Oly</span>
                <span className="text-xs font-semibold text-sky-200">(ডাঃ আশরাফুল হক অলি)</span>
              </h2>
              <p className="text-xs text-sky-100">
                Physician & Pediatric Clinical Informatics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 text-xs text-slate-600 max-h-[75vh] overflow-y-auto">
          
          {/* Developer Dedication & Purpose */}
          <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100/80 space-y-2">
            <h3 className="font-bold text-sky-950 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-700" />
              <span>Vision of ShishuDose BD</span>
            </h3>
            <p className="leading-relaxed text-slate-700">
              Developed by <strong>Dr. Ashraful Haque Oly (ডাঃ আশরাফুল হক অলি)</strong> to provide Bangladeshi doctors, pediatric residents, and medical officers with an instant, trustworthy dosing calculator and emergency bedside protocol that works seamlessly in wards, OPDs, and rural health complexes without relying on cellular internet.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-sky-800 font-medium">
              <span>✓ DGDA BD Commercial Concentrations</span>
              <span aria-hidden="true">·</span>
              <span>✓ ICDDR,B Diarrhea Protocols</span>
              <span aria-hidden="true">·</span>
              <span>✓ WHO IMCI Pneumonia Timer</span>
              <span aria-hidden="true">·</span>
              <span>✓ 100% Offline Capable</span>
            </div>
          </div>

          {/* ANDROID APK VERSION & INSTALLATION */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Android APK Version & Direct Installation</span>
              </h3>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                Android Ready
              </span>
            </div>

            <p className="leading-relaxed text-slate-700">
              This application is built with modern <strong>WebAPK / Trusted Web Activity (TWA)</strong> standards. When you install it on any Android device, Android’s Google Play Services system automatically compiles it into a <strong>native Android APK (WebAPK)</strong> with its own package identifier (<code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">com.shishudose.pediatric.app</code>).
            </p>

            {/* Direct 1-Click Install Button */}
            <div className="pt-1">
              {isInstalled ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>The Android APK version is already installed on this device!</span>
                </div>
              ) : isInstallable ? (
                <button
                  onClick={handleDirectInstall}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-colors text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Install Android APK Now (1-Tap WebAPK)</span>
                </button>
              ) : (
                <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                  <span className="font-semibold text-slate-900">How to Install as APK on Android Chrome:</span>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
                    <li>Open this page in <strong>Google Chrome</strong> or <strong>Samsung Internet</strong>.</li>
                    <li>Tap the <strong>three vertical dots (⋮)</strong> menu at the top-right corner.</li>
                    <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                    <li>Android will automatically mint and install the native standalone APK onto your home screen and app drawer!</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Option B: Download Standalone .AAB / APK for Google Play Store */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                  <FileCode className="w-4 h-4 text-emerald-600" />
                  <span>Google Play Store প্যাকেজ (.AAB / APK) তৈরি করার সহজ গাইড:</span>
                </span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                  Visual Guide
                </span>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedUrl ? 'URL Copied!' : 'Copy App URL'}</span>
                </button>

                <a
                  href="/pwa-512x512.png"
                  download="shishudose-512x512.png"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ধাপ ১: Download App Icon (512×512)</span>
                </a>

                <a
                  href={`https://www.pwabuilder.com?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-colors"
                >
                  <span>ধাপ ২: Open PWABuilder</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* VISUAL ILLUSTRATED MOCKUP OF PWABUILDER SCREEN */}
              <div className="p-3.5 bg-gradient-to-b from-sky-50 to-indigo-50/50 rounded-xl border border-sky-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-950">
                  <HelpCircle className="w-4 h-4 text-sky-600" />
                  <span>PWABuilder-এ "Options" এবং "Icon" অপশনটি যেখানে থাকে (চিত্রসহ বিবরণ):</span>
                </div>

                {/* Illustrated Mock Card */}
                <div className="bg-white rounded-lg border-2 border-slate-300 p-3 shadow-xs space-y-2.5 max-w-md mx-auto">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
                        ▶
                      </div>
                      <span className="font-bold text-slate-900 text-xs">Google Play (Android)</span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Store Package</span>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Publish your PWA to the Google Play Store with an Android App Bundle (.aab).
                  </p>

                  {/* Buttons Mock with highlighted pointer */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 py-1.5 px-3 bg-emerald-600/30 text-emerald-950/60 rounded text-center text-xs font-bold border border-emerald-300">
                        Generate Package
                      </div>
                      
                      {/* HIGHLIGHTED OPTIONS BUTTON */}
                      <div className="relative py-1.5 px-3 bg-amber-400 text-slate-900 rounded text-center text-xs font-extrabold border-2 border-amber-600 shadow-sm animate-pulse flex items-center gap-1">
                        <Settings className="w-3 h-3 text-slate-900" />
                        <span>Options 👈</span>
                      </div>
                    </div>

                    {/* Visual Callout */}
                    <div className="p-2 bg-amber-50 border border-amber-300 rounded text-[11px] text-amber-950 flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>এখানে ক্লিক করবেন:</strong> "Generate Package" বাটনের ডানপাশে থাকা <strong>"Options"</strong> বাটনে ক্লিক করুন।
                      </div>
                    </div>
                  </div>

                  {/* Drawer Mockup */}
                  <div className="p-2.5 bg-slate-50 rounded border border-dashed border-slate-300 space-y-1.5 text-[11px]">
                    <div className="font-bold text-slate-700 flex items-center gap-1">
                      <Settings className="w-3 h-3 text-slate-500" />
                      <span>Options ক্লিক করার পর ভেতরে যা করবেন:</span>
                    </div>
                    <div className="pl-2 space-y-1 text-slate-600">
                      <div>১. একটু নিচে স্ক্রল করলে <strong>"Icon"</strong> বা <strong>"Choose File"</strong> অপশন দেখতে পাবেন।</div>
                      <div>২. সেখানে ওপরের <strong>"Download App Icon (512×512)"</strong> থেকে ডাউনলোড করা ইমেজটি আপলোড করুন।</div>
                      <div>৩. নিচে <strong>"Save"</strong> চাপুন, তারপর <strong>"Generate Package"</strong> চাপুন।</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/70 border border-emerald-300 px-2.5 py-1 rounded-full inline-block">
                    ✓ ছবি সরাসরি আপলোড করলে গুগলের ক্লাউড রান সিকিউরিটি আর কোনো বাধা সৃষ্টি করতে পারবে না!
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* WINDOWS DESKTOP INSTALLATION GUIDE */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>💻</span>
              <span>Windows Desktop & Laptop Installation (উইন্ডোজ কম্পিউটারে ইনস্টল)</span>
            </h3>
            <p className="text-slate-700 leading-relaxed">
              You can install ShishuDose BD as a native standalone desktop application on Windows 10/11 with zero extra software:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>Open this app link in <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong> on your PC.</li>
              <li>Look at the address bar on the right side and click the <strong>Install (💻 / ⊕)</strong> icon.</li>
              <li>Or click browser menu (⋮) → <strong>"Save and share"</strong> → <strong>"Install ShishuDose BD"</strong>.</li>
              <li>Click <strong>Install</strong>. It creates a desktop icon and runs full-screen with offline support!</li>
            </ol>
          </div>

          {/* Acknowledgments */}
          <div className="p-3 bg-slate-50 rounded-xl text-slate-500 text-[11px] space-y-1">
            <strong className="text-slate-700">Clinical Protocol Acknowledgments:</strong>
            <p>
              Formulations verified against DGDA (Directorate General of Drug Administration, Bangladesh). Clinical protocols adapted from ICDDR,B (Mohakhali), WHO IMCI Bangladesh guidelines, and the Bangladesh Paediatric Association (BPA).
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

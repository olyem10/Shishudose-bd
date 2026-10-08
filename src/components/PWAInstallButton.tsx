import React, { useState } from 'react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { Download, WifiOff, Share2, PlusSquare, Check, Smartphone } from 'lucide-react';

interface PWAInstallButtonProps {
  onOpenApkModal?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ onOpenApkModal }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setJustInstalled(true);
      setTimeout(() => setJustInstalled(false), 3000);
    }
  };

  if (isInstalled || justInstalled) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md">
        <Check className="w-3.5 h-3.5 text-emerald-600" />
        <span className="font-medium">{isAndroid ? 'APK Installed' : 'App Installed'}</span>
      </span>
    );
  }

  if (isInstallable) {
    return (
      <button
        onClick={handleInstall}
        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors whitespace-nowrap active:scale-98"
        title="Install as native APK on Android or desktop"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>{isAndroid ? 'Install APK' : 'Install App (APK)'}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Add to iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-semibold text-slate-900">Install ShishuDose on iOS</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  ✕
                </button>
              </div>
              <div className="mt-3 space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <Share2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <p>
                    1. Tap the <strong className="text-slate-900">Share</strong> icon in Safari’s bottom toolbar.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <PlusSquare className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <p>
                    2. Scroll down and select <strong className="text-slate-900">Add to Home Screen</strong>.
                  </p>
                </div>
                <p className="bg-sky-50 p-2.5 rounded-md text-sky-900 text-xs">
                  This enables full offline drug calculations and clinical guidelines during ward rounds without cellular or Wi-Fi connectivity.
                </p>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for browsers that already installed or don't support beforeinstallprompt
  return (
    <button
      onClick={onOpenApkModal}
      className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors whitespace-nowrap"
      title="View Android APK & Install Instructions"
    >
      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
      <span>APK Version</span>
    </button>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg border border-amber-500 animate-in fade-in slide-in-from-bottom-2">
      <WifiOff className="w-4 h-4" />
      <span>Offline Mode — All formulas & DGDA guidelines remain functional.</span>
    </div>
  );
};

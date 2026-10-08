import React, { useState, useRef } from 'react';
import { 
  X, 
  Printer, 
  Download,
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Syringe, 
  Sparkles,
  Stethoscope,
  ShieldCheck,
  Pill
} from 'lucide-react';
import { DrugDoseProtocol, PatientProfile, DrugFormulation, CalculatedDoseResult } from '../types/pediatric';
import { toBanglaDigits } from '../utils/calculator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

interface PrescriptionSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  drug: DrugDoseProtocol;
  patient: PatientProfile;
  formulation: DrugFormulation;
  result: CalculatedDoseResult;
  customDose: number;
}

export const PrescriptionSlipModal: React.FC<PrescriptionSlipModalProps> = ({
  isOpen,
  onClose,
  drug,
  patient,
  formulation,
  result,
  customDose
}) => {
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const slipRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const today = new Date();
  const dateStrEn = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const monthsBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const dateStrBn = `${toBanglaDigits(today.getDate())} ${monthsBn[today.getMonth()]} ${toBanglaDigits(today.getFullYear())}`;

  const primaryBrand = formulation.bdBrands[0] || drug.popularBDBrands[0] || drug.genericName;
  const brandList = formulation.bdBrands.slice(0, 3).join(', ');

  // Patient age display
  const patientAgeEn = patient.ageYears > 0 
    ? `${patient.ageYears}y ${patient.ageMonths}m` 
    : `${patient.ageMonths} Months`;
  const patientAgeBn = patient.ageYears > 0 
    ? `${toBanglaDigits(patient.ageYears)} বছর ${toBanglaDigits(patient.ageMonths)} মাস` 
    : `${toBanglaDigits(patient.ageMonths)} মাস`;

  const patientGenderEn = patient.gender === 'male' ? 'Male / Boy' : 'Female / Girl';
  const patientGenderBn = patient.gender === 'male' ? 'ছেলে (Male)' : 'মেয়ে (Female)';

  // Dosage string
  const doseStringBn = result.dropsPerDose && formulation.formType === 'drops'
    ? `${toBanglaDigits(result.dropsPerDose)} ফোঁটা (${toBanglaDigits(result.volumePerDoseMl || 0)} মিলি)`
    : formulation.formType === 'eye_drops'
    ? '১ ফোঁটা করে আক্রান্ত চোখে'
    : formulation.formType === 'injection' && result.volumePerDoseMl
    ? `${toBanglaDigits(result.volumePerDoseMl)} মিলি (IV/IM সিরিঞ্জে)`
    : result.volumePerDoseMl
    ? `${toBanglaDigits(result.volumePerDoseMl)} মিলি (${result.teaspoonDescription})`
    : result.tabletsPerDose
    ? `${toBanglaDigits(result.tabletsPerDose)} টি ${formulation.unitLabel}`
    : `${toBanglaDigits(result.dosePerAdministrationMg)} মি.গ্রা.`;

  const doseStringEn = result.dropsPerDose && formulation.formType === 'drops'
    ? `${result.dropsPerDose} Drops (${result.volumePerDoseMl} ml)`
    : formulation.formType === 'eye_drops'
    ? '1 Drop into affected eye(s)'
    : formulation.formType === 'injection' && result.volumePerDoseMl
    ? `${result.volumePerDoseMl} ml (IV/IM injection)`
    : result.volumePerDoseMl
    ? `${result.volumePerDoseMl} ml (${result.teaspoonDescription})`
    : result.tabletsPerDose
    ? `${result.tabletsPerDose} ${formulation.unitLabel}`
    : `${result.dosePerAdministrationMg} mg`;

  // Formatted summary text for WhatsApp / Copy
  const formattedShareTextBn = `📋 *শিশুর প্রেসক্রিপশন ও ওষুধের মাত্রা নোট*
🏥 *শিশু ডোজ বিডি (ShishuDose BD)*
👨‍⚕️ *ক্লিনিক্যাল ডেভেলপার: ডাঃ আশরাফুল হক অলি*
---------------------------------
👶 *রোগীর বিবরণ:*
• ওজন: ${toBanglaDigits(patient.weightKg)} কেজি (${patient.weightKg} kg)
• বয়স: ${patientAgeBn}
• লিঙ্গ: ${patientGenderBn}
• তারিখ: ${dateStrBn}
---------------------------------
💊 *প্রেসক্রিপশন (Rx):*
• জেনেরিক: ${drug.genericName} ${drug.banglaName ? `(${drug.banglaName})` : ''}
• প্রচলিত ব্র্যান্ড: ${primaryBrand} ${brandList ? `(${brandList})` : ''}
• ফরম্যুলেশন: ${formulation.name}

💉 *একবারের নির্ধারিত মাত্রা:*
👉 *${doseStringBn}* [${toBanglaDigits(result.dosePerAdministrationMg)} মি.গ্রা. সক্রিয় উপাদান]
• খাওয়ার নিয়ম: ${drug.banglaSchedule}
• ব্যবহারের সময়সূচী: ${drug.frequency}
• কতদিন চলবে: ${drug.standardDurationDays}
${formulation.reconstitutionNote ? `• প্রস্তুতি: ${formulation.reconstitutionNote}\n` : ''}
⚠️ *নির্দেশনা ও সতর্কতা:*
• মেপে খাওয়ানোর জন্য ড্রপার বা ১/৩/৫ মিলি প্লাস্টিক সিরিঞ্জ ব্যবহার করুন।
• ডাক্তারের পরামর্শ ছাড়া ডোজ পরিবর্তন করবেন না।
---------------------------------
🇧🇩 ডিজিডিএ (DGDA BD), আইসিডিডিআর,বি ও ডব্লিউএইচও গাইডলাইন অনুসারী`;

  const formattedShareTextEn = `📋 *PEDIATRIC PRESCRIPTION SUMMARY*
🏥 *ShishuDose BD - Clinical Calculator*
👨‍⚕️ *Clinical Lead: Dr. Ashraful Haque Oly (ডাঃ আশরাফুল হক অলি)*
---------------------------------
👶 *Patient Profile:*
• Weight: ${patient.weightKg} kg
• Age: ${patientAgeEn}
• Gender: ${patientGenderEn}
• Date: ${dateStrEn}
---------------------------------
💊 *Prescription (Rx):*
• Generic: ${drug.genericName}
• BD Brands: ${primaryBrand} (${brandList})
• Formulation: ${formulation.name}

💉 *Calculated Dose per Administration:*
👉 *${doseStringEn}* (${result.dosePerAdministrationMg} mg active ingredient)
• Frequency: ${drug.frequency}
• Instructions: ${drug.englishSchedule}
• Duration: ${drug.standardDurationDays}
${formulation.reconstitutionNote ? `• Preparation: ${formulation.reconstitutionNote}\n` : ''}
⚠️ *Administration Guide:*
• Use a calibrated 1ml/3ml/5ml oral syringe or dropper for exact volume.
• Do not exceed the prescribed frequency.
---------------------------------
Grounded in Bangladesh DGDA, ICDDR,B & WHO IMCI Protocols.`;

  const currentShareText = lang === 'bn' ? formattedShareTextBn : formattedShareTextEn;

  const handleCopyText = () => {
    navigator.clipboard.writeText(currentShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentShareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ShishuDose Rx - ${drug.genericName} (${patient.weightKg} kg)`,
          text: currentShareText
        });
      } catch (e) {
        console.log('Share dismissed', e);
      }
    } else {
      handleCopyText();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!slipRef.current) return;
    setIsExportingPdf(true);

    try {
      const element = slipRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, 295));
      
      const fileName = `ShishuDose_Rx_${drug.genericName}_${patient.weightKg}kg_${today.toISOString().slice(0, 10)}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150">
      <div 
        id="printable-prescription-slip"
        ref={slipRef}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[94vh] print:max-h-none print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:rounded-none"
      >
        
        {/* Top Action Bar (Hidden in Print) */}
        <div className="no-print bg-slate-900 text-white p-3.5 sm:px-5 flex items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold">
              Rx
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>প্রেসক্রিপশন সামারি স্লিপ (Prescription Note)</span>
              </h3>
              <p className="text-[11px] text-sky-200">
                রোগীর জন্য ডোজ সামারি শেয়ার অথবা প্রিন্ট করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setLang('bn')}
                className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                  lang === 'bn' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-md font-semibold transition-colors ${
                  lang === 'en' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Prescription Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 bg-white text-slate-900 print:overflow-visible print:p-6">
          
          {/* Clinic / Prescriber Header */}
          <div className="border-b-2 border-sky-800 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-sky-900 tracking-tight">
                  শিশু<span className="text-sky-600">ডোজ</span> বিডি
                </span>
                <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">
                  Pediatric Rx Note
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                ডাঃ আশরাফুল হক অলি (Dr. Ashraful Haque Oly)
              </h4>
              <p className="text-xs text-slate-600">
                Physician & Pediatric Clinical Informatics · ShishuDose Clinical Team
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-600 space-y-0.5">
              <p className="font-semibold text-slate-800">
                তারিখ (Date): <span className="font-mono">{lang === 'bn' ? dateStrBn : dateStrEn}</span>
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Rx Ref: SD-{Math.abs(Math.sin(patient.weightKg) * 10000).toFixed(0)}
              </p>
            </div>
          </div>

          {/* Patient Demographic Bar */}
          <div className="bg-sky-50/70 border border-sky-200/90 rounded-xl p-3.5 sm:px-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">রোগীর ওজন (Weight):</span>
              <strong className="text-sm font-bold text-slate-900 font-mono">
                {lang === 'bn' ? `${toBanglaDigits(patient.weightKg)} কেজি` : `${patient.weightKg} kg`}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">বয়স (Age):</span>
              <strong className="text-sm font-bold text-slate-900">
                {lang === 'bn' ? patientAgeBn : patientAgeEn}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">লিঙ্গ (Gender):</span>
              <strong className="text-sm font-bold text-slate-900">
                {lang === 'bn' ? patientGenderBn : patientGenderEn}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">প্রোটোকল ভিত্তি (Basis):</span>
              <strong className="text-sm font-bold text-sky-800">
                {customDose} {drug.doseUnit}
              </strong>
            </div>
          </div>

          {/* Medication Rx Box */}
          <div className="border-2 border-slate-300 rounded-2xl p-4 sm:p-5 relative bg-white space-y-4">
            
            {/* Rx Symbol */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black font-serif text-sky-800 italic select-none">
                  ℞
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {drug.genericName}
                    {drug.banglaName && <span className="font-sans font-normal text-slate-600 ml-1.5">({drug.banglaName})</span>}
                  </h3>
                  <p className="text-xs text-slate-500">
                    প্রচলিত ব্র্যান্ড (Brands in BD): <strong className="text-slate-700">{primaryBrand}</strong> {brandList ? `(${brandList})` : ''}
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
                {formulation.name}
              </span>
            </div>

            {/* High Impact Dose Highlight Banner */}
            <div className="p-4 bg-gradient-to-r from-sky-50 to-emerald-50/50 border border-sky-200 rounded-xl space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  {lang === 'bn' ? 'একবারের নির্ধারিত মাত্রা (Dose per Administration):' : 'Calculated Dose per Administration:'}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Active Drug: {result.dosePerAdministrationMg} mg
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-sky-800 tracking-tight font-sans">
                {lang === 'bn' ? doseStringBn : doseStringEn}
              </div>

              {/* Spoon/Syringe Instruction */}
              {result.volumePerDoseMl && (
                <div className="flex items-center gap-1.5 text-xs text-sky-950 font-medium pt-1 border-t border-sky-200/60">
                  <Syringe className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                  <span>
                    {lang === 'bn' 
                      ? 'সঠিক পরিমাপের জন্য পরিমাপক চামচ, ড্রপার বা প্লাস্টিক সিরিঞ্জ দিয়ে মেপে খাওয়ান।'
                      : 'Administer using calibrated oral syringe or medicine dropper for accuracy.'}
                  </span>
                </div>
              )}
            </div>

            {/* Schedule & Duration Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-500 block text-[11px] mb-0.5">
                  {lang === 'bn' ? 'খাওয়ার সময়সূচী (Schedule):' : 'Schedule & Frequency:'}
                </span>
                <strong className="text-slate-900 block text-sm">
                  {lang === 'bn' ? drug.banglaSchedule : drug.englishSchedule}
                </strong>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  {drug.frequency}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-500 block text-[11px] mb-0.5">
                  {lang === 'bn' ? 'মেয়াদ ও মোট দিন (Duration):' : 'Treatment Duration:'}
                </span>
                <strong className="text-slate-900 block text-sm">
                  {drug.standardDurationDays}
                </strong>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  {lang === 'bn' ? 'ডাক্তারের পরামর্শমতো পূর্ণ মেয়াদ শেষ করুন' : 'Complete the prescribed full course'}
                </span>
              </div>
            </div>

            {/* Preparation / Dilution note if any */}
            {formulation.reconstitutionNote && (
              <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 space-y-0.5">
                <span className="font-bold">ঔষধ প্রস্তুত প্রণালী (Preparation): </span>
                <span>{formulation.reconstitutionNote}</span>
              </div>
            )}

            {/* Clinical Warnings */}
            {result.warnings.length > 0 && (
              <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl text-xs text-rose-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>{lang === 'bn' ? 'সতর্কতা (Precautions):' : 'Safety Precautions:'}</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-900">
                  {result.warnings.map(w => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Doctor Signature & Stamp Area (Especially clean on Print) */}
          <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-xs">
            <div className="text-[11px] text-slate-500 max-w-sm">
              <p className="font-semibold text-slate-700">ShishuDose BD - Clinical Safety Verified</p>
              <p>DGDA Approved Concentrations · ICDDR,B & WHO IMCI Standard Protocols</p>
            </div>

            <div className="text-center min-w-[160px]">
              <div className="border-b border-slate-400 w-40 pb-1 mb-1"></div>
              <p className="font-bold text-slate-800 text-[11px]">
                {lang === 'bn' ? 'চিকিৎসকের স্বাক্ষর ও সীল' : "Doctor's Signature & Seal"}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Bar (Hidden in Print) */}
        <div className="no-print bg-slate-50 border-t border-slate-200 p-3.5 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            {/* WhatsApp Share Button */}
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all active:scale-98 cursor-pointer"
              title="Share prescription summary via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp এ পাঠান</span>
            </button>

            {/* Native Mobile Share */}
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white shadow-xs transition-all active:scale-98 cursor-pointer"
              title="Share via installed apps (Messages, Mail, etc.)"
            >
              <Share2 className="w-4 h-4" />
              <span>মোবাইল শেয়ার</span>
            </button>

            {/* Copy Text Button */}
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
              title="Copy text note to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-emerald-700">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>নোট কপি</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              title="Download Prescription Slip as PDF"
            >
              <Download className="w-4 h-4" />
              <span>{isExportingPdf ? 'পিডিএফ হচ্ছে...' : 'পিডিএফ ডাউনলোড'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all active:scale-98 cursor-pointer"
              title="Print Prescription Slip"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট করুন (Print Slip)</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

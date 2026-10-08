import React, { useState, useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Copy, 
  MessageCircle, 
  AlertTriangle, 
  Stethoscope, 
  FileText, 
  Syringe, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Info,
  ChevronDown
} from 'lucide-react';
import { PatientProfile } from '../types/pediatric';
import { usePrescription, PrescriptionItem } from '../contexts/PrescriptionContext';
import { toBanglaDigits } from '../utils/calculator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

interface PrescriptionPadModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
}

// Common Pediatric Clinical Diagnoses in Bangladesh
const COMMON_DIAGNOSES = [
  'Acute Bronchiolitis',
  'Viral Fever with URTI',
  'Acute Watery Diarrhea (Some Dehydration)',
  'Severe Pneumonia (WHO IMCI)',
  'Acute Otitis Media (AOM)',
  'Bronchial Asthma in Exacerbation',
  'Enteric Fever (Typhoid)',
  'Urinary Tract Infection (UTI)',
  'Neonatal Sepsis (Probable)',
  'Febrile Convulsion',
  'Croup (Acute Laryngotracheobronchitis)',
  'Atopic Dermatitis / Scabies'
];

// Common Pediatric Investigations in BD
const COMMON_INVESTIGATIONS = [
  'CBC with ESR & Platelet count',
  'CRP (Quantitative)',
  'Serum Electrolytes (Na+, K+, Cl-, HCO3-)',
  'Urine R/M/E & C/S',
  'CXR P/A view',
  'Dengue NS1 Antigen & IgG/IgM',
  'Stool R/M/E & Reducing Substances',
  'Blood C/S with sensitivity',
  'Serum Creatinine & Urea',
  'Widal Test / Typhidot'
];

export const PrescriptionPadModal: React.FC<PrescriptionPadModalProps> = ({
  isOpen,
  onClose,
  patient
}) => {
  const {
    items,
    patientName,
    guardianName,
    diagnosis,
    investigations,
    advice,
    followUp,
    removeItem,
    updateItem,
    addItem,
    clearPrescription,
    setPatientName,
    setGuardianName,
    setDiagnosis,
    setInvestigations,
    setAdvice,
    setFollowUp
  } = usePrescription();

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customDrugName, setCustomDrugName] = useState('');
  const [customFormulation, setCustomFormulation] = useState('');
  const [customDose, setCustomDose] = useState('');
  const [customFrequency, setCustomFrequency] = useState('দিনে ৩ বার (খাওয়ার পর)');
  const [customDuration, setCustomDuration] = useState('৫ দিন');
  const [customInstructions, setCustomInstructions] = useState('');

  // Editing state for an item in list
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const today = new Date();
  const dateStrEn = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const monthsBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const dateStrBn = `${toBanglaDigits(today.getDate())} ${monthsBn[today.getMonth()]} ${toBanglaDigits(today.getFullYear())}`;

  // Age display
  const patientAgeEn = patient.ageYears > 0 
    ? `${patient.ageYears}y ${patient.ageMonths}m` 
    : `${patient.ageMonths} Months`;
  const patientAgeBn = patient.ageYears > 0 
    ? `${toBanglaDigits(patient.ageYears)} বছর ${toBanglaDigits(patient.ageMonths)} মাস` 
    : `${toBanglaDigits(patient.ageMonths)} মাস`;

  const patientGenderBn = patient.gender === 'male' ? 'ছেলে (Male)' : 'মেয়ে (Female)';

  // Quick Diagnosis Picker
  const handleSelectDiagnosis = (diag: string) => {
    if (!diagnosis) {
      setDiagnosis(diag);
    } else if (!diagnosis.includes(diag)) {
      setDiagnosis(`${diagnosis}, ${diag}`);
    }
  };

  // Quick Investigation Picker
  const handleSelectInvestigation = (inv: string) => {
    if (!investigations) {
      setInvestigations(inv);
    } else if (!investigations.includes(inv)) {
      setInvestigations(`${investigations}\n• ${inv}`);
    }
  };

  // Add Custom Medication Manually
  const handleAddCustomMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDrugName.trim() || !customDose.trim()) return;

    addItem({
      genericName: customDrugName.trim(),
      brandName: customDrugName.trim(),
      formulation: customFormulation.trim() || 'Oral Medicine',
      doseDisplay: customDose.trim(),
      frequency: customFrequency.trim() || 'দিনে ৩ বার',
      duration: customDuration.trim() || '৫ দিন',
      instructions: customInstructions.trim()
    });

    // Reset form
    setCustomDrugName('');
    setCustomFormulation('');
    setCustomDose('');
    setCustomInstructions('');
    setShowAddCustom(false);
  };

  // 1. Direct PDF Download with jsPDF and html2canvas
  const handleDownloadPdf = async () => {
    if (!printAreaRef.current) return;
    setIsExportingPdf(true);

    try {
      // Create high-res canvas of the prescription slip
      const element = printAreaRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // 2x for retina crystal crisp text
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `ShishuDose_Rx_${patientName.trim() ? patientName.trim().replace(/\s+/g, '_') : 'Patient'}_${today.toISOString().slice(0, 10)}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      // Fallback to window.print if html2canvas faces issues
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  // 2. Native Print
  const handlePrint = () => {
    window.print();
  };

  // 3. Formatted WhatsApp Note
  const generateWhatsAppText = () => {
    let text = `📋 *শিশু প্রেসক্রিপশন নোট (Pediatric Prescription)*\n`;
    text += `🏥 *শিশু ডোজ বিডি (ShishuDose BD)*\n`;
    text += `👨‍⚕️ *ডাঃ আশরাফুল হক অলি (Dr. Ashraful Haque Oly)*\n`;
    text += `---------------------------------\n`;
    text += `👶 *রোগীর তথ্য:*\n`;
    if (patientName) text += `• নাম: ${patientName}\n`;
    text += `• বয়স: ${patientAgeBn} | ওজন: ${toBanglaDigits(patient.weightKg)} কেজি (${patient.weightKg} kg)\n`;
    text += `• তারিখ: ${dateStrBn}\n`;
    if (diagnosis) text += `• ডায়াগনোসিস: *${diagnosis}*\n`;
    text += `---------------------------------\n`;

    if (investigations) {
      text += `🔬 *প্রয়োজনীয় পরীক্ষা (Investigations):*\n${investigations}\n`;
      text += `---------------------------------\n`;
    }

    text += `💊 *ঔষধের তালিকা (Rx Medications):*\n`;
    if (items.length === 0) {
      text += `(কোনো ওষুধ যুক্ত করা হয়নি)\n`;
    } else {
      items.forEach((item, index) => {
        text += `\n*${toBanglaDigits(index + 1)}. ${item.brandName || item.genericName}* (${item.formulation})\n`;
        text += `   👉 মাত্রা: *${item.doseDisplay}*\n`;
        text += `   ⏰ নিয়ম: ${item.frequency} | মেয়াদ: ${item.duration}\n`;
        if (item.instructions) text += `   ℹ️ নির্দেশ: ${item.instructions}\n`;
      });
    }

    text += `\n---------------------------------\n`;
    if (advice) text += `📌 *পরামর্শ:* ${advice}\n`;
    if (followUp) text += `📅 *ফলো-আপ:* ${followUp}\n`;
    text += `---------------------------------\n`;
    text += `🇧🇩 ডিজিডিএ (DGDA BD) ও আইসিডিডিআর,বি পেডিয়াট্রিক প্রোটোকল অনুসারী`;

    return text;
  };

  const handleWhatsAppShare = () => {
    const text = generateWhatsAppText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateWhatsAppText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[96vh] print:max-h-none print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:rounded-none">
        
        {/* Top Control Bar (Hidden in Print) */}
        <div className="no-print bg-gradient-to-r from-sky-950 via-slate-900 to-sky-900 text-white p-3.5 sm:px-6 flex items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 font-bold text-lg shadow-2xs">
              ℞
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  কম্প্রিহেন্সিভ পেডিয়াট্রিক প্রেসক্রিপশন প্যাড
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {items.length} টি ঔষধ যুক্ত
                </span>
              </div>
              <p className="text-xs text-sky-200/80">
                একসাথে একাধিক ঔষধ, ডায়াগনোসিস ও ইনভেস্টিগেশন সহ ফুল প্রেসক্রিপশন তৈরি ও প্রিন্ট/পিডিএফ করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearPrescription}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-900/40 transition-colors"
              title="Reset prescription pad for new patient"
            >
              নতুন প্যাড (Clear)
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50 print:p-0 print:bg-white print:overflow-visible">
          
          {/* Controls Bar for Doctor Input (Hidden in Print) */}
          <div className="no-print bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            
            {/* Row 1: Patient Name & Guardian */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  রোগীর নাম (Patient Name - ঐচ্ছিক):
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="যেমন: আব্দুল্লাহ / Baby of Nazmin"
                  className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  অভিভাবকের নাম / ফোন (Guardian / Contact):
                </label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="যেমন: মোঃ রফিকুল ইসলাম (017xxxxxxxx)"
                  className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Row 2: Clinical Diagnosis (ডায়াগনোসিস) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-sky-700" />
                  <span>ক্লিনিক্যাল ডায়াগনোসিস (Clinical Diagnosis / Impression):</span>
                </label>
                <span className="text-[11px] text-slate-400">ক্লিক করে দ্রুত যোগ করুন</span>
              </div>
              
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="যেমন: Acute Bronchiolitis, Viral Fever with Dehydration"
                className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500 mb-2"
              />

              {/* Quick Diagnosis Chips */}
              <div className="flex flex-wrap gap-1.5">
                {COMMON_DIAGNOSES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleSelectDiagnosis(d)}
                    className="text-[10px] font-semibold px-2 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-lg border border-sky-200/80 transition-colors cursor-pointer"
                  >
                    + {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Investigations (ইনভেস্টিগেশন) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-700" />
                  <span>প্রয়োজনীয় ইনভেস্টিগেশন (Investigations / Lab Tests):</span>
                </label>
                <span className="text-[11px] text-slate-400">ক্লিক করে যোগ করুন</span>
              </div>

              <textarea
                value={investigations}
                onChange={(e) => setInvestigations(e.target.value)}
                rows={2}
                placeholder="যেমন: ১. CBC with ESR & Platelets&#10;২. CXR P/A view&#10;৩. Serum Electrolytes"
                className="w-full text-xs font-medium px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500 mb-2"
              />

              {/* Quick Investigation Chips */}
              <div className="flex flex-wrap gap-1.5">
                {COMMON_INVESTIGATIONS.map((inv) => (
                  <button
                    key={inv}
                    type="button"
                    onClick={() => handleSelectInvestigation(inv)}
                    className="text-[10px] font-semibold px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-lg border border-indigo-200/80 transition-colors cursor-pointer"
                  >
                    + {inv}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: Custom Drug Quick-Add Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                ড্রাগ ডিরেক্টরি থেকে যেকোনো ওষুধে <strong>'+ প্রেসক্রিপশনে যোগ করুন'</strong> চাপুন অথবা এখান থেকে সরাসরি কাস্টম ড্রাগ লিখুন:
              </span>
              <button
                type="button"
                onClick={() => setShowAddCustom(!showAddCustom)}
                className="text-xs font-bold px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ম্যানুয়ালি ড্রাগ যোগ করুন</span>
              </button>
            </div>

            {/* Custom Drug Input Form */}
            {showAddCustom && (
              <form onSubmit={handleAddCustomMedicine} className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-sky-950">
                  <span>নতুন ঔষধের তথ্য লিখুন:</span>
                  <button type="button" onClick={() => setShowAddCustom(false)} className="text-slate-400 hover:text-slate-600">×</button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    value={customDrugName}
                    onChange={(e) => setCustomDrugName(e.target.value)}
                    placeholder="ঔষধের নাম (যেমন: Syrup Zinc / Napa)"
                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={customFormulation}
                    onChange={(e) => setCustomFormulation(e.target.value)}
                    placeholder="ফরম্যুলেশন (যেমন: 20mg/5ml Syrup)"
                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    required
                    value={customDose}
                    onChange={(e) => setCustomDose(e.target.value)}
                    placeholder="মাত্রা (যেমন: 5 ml বা ১ চামচ)"
                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={customFrequency}
                    onChange={(e) => setCustomFrequency(e.target.value)}
                    placeholder="খাওয়ার নিয়ম (যেমন: দিনে ৩ বার)"
                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    placeholder="মেয়াদ (যেমন: ৫-৭ দিন)"
                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    placeholder="বিশেষ নির্দেশ (যেমন: খাবারের পর)"
                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    যোগ করুন (+ Add)
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* ========================================================= */}
          {/* THE MASTER PRINTABLE & PDF PRESCRIPTION PAD (A4 Standard) */}
          {/* ========================================================= */}
          <div 
            id="printable-prescription-slip"
            ref={printAreaRef}
            className="bg-white p-6 sm:p-10 rounded-2xl border-2 border-slate-300 shadow-md text-slate-900 space-y-6 print:border-none print:shadow-none print:p-6 print:rounded-none"
          >
            
            {/* Header: Prescriber & Institution */}
            <div className="border-b-2 border-sky-800 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-sky-900 tracking-tight">
                    শিশু<span className="text-sky-600">ডোজ</span> বিডি
                  </span>
                  <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">
                    Pediatric Prescription
                  </span>
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
                  ডাঃ আশরাফুল হক অলি (Dr. Ashraful Haque Oly)
                </h2>
                <p className="text-xs text-slate-600">
                  MBBS, Registered Physician · Pediatric Clinical Informatics
                </p>
                <p className="text-[11px] text-slate-500">
                  Lead Clinical Developer, ShishuDose BD Pediatric Care
                </p>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">
                  তারিখ (Date): <span className="font-mono text-slate-900 font-bold">{dateStrBn}</span>
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  Prescription Ref: SD-PED-{Math.abs(Math.sin(patient.weightKg * 100) * 10000).toFixed(0)}
                </p>
                <p className="text-[11px] text-slate-500">
                  জরুরি যোগাযোগ: 01670175663
                </p>
              </div>
            </div>

            {/* Patient Demographic Banner */}
            <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-3.5 sm:px-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">রোগীর নাম (Name):</span>
                <strong className="text-sm font-bold text-slate-900">
                  {patientName || 'শিশু রোগী (Pediatric Patient)'}
                </strong>
                {guardianName && (
                  <span className="text-[10px] text-slate-500 block mt-0.5">অভিভাবক: {guardianName}</span>
                )}
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">ওজন (Weight):</span>
                <strong className="text-sm font-bold text-sky-800 font-mono">
                  {toBanglaDigits(patient.weightKg)} কেজি ({patient.weightKg} kg)
                </strong>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">বয়স (Age):</span>
                <strong className="text-sm font-bold text-slate-900">
                  {patientAgeBn} ({patientAgeEn})
                </strong>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">লিঙ্গ (Gender):</span>
                <strong className="text-sm font-bold text-slate-900">
                  {patientGenderBn}
                </strong>
              </div>
            </div>

            {/* Main Clinical Body: Two Column Pad Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[380px]">
              
              {/* LEFT COLUMN: Clinical Diagnosis & Investigations (4 cols on desktop) */}
              <div className="md:col-span-4 border-r-0 md:border-r border-slate-200 md:pr-5 space-y-5">
                
                {/* 1. Clinical Diagnosis */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="text-xs font-bold text-sky-950 flex items-center gap-1.5 uppercase tracking-wider">
                    <Stethoscope className="w-3.5 h-3.5 text-sky-700" />
                    <span>রোগ নির্ণয় (Diagnosis)</span>
                  </h4>
                  <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                    {diagnosis || 'ক্লিনিক্যাল নিরীক্ষা অনুযায়ী'}
                  </p>
                </div>

                {/* 2. Investigations / Lab Tests */}
                {investigations && (
                  <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-1.5">
                    <h4 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5 uppercase tracking-wider">
                      <FileText className="w-3.5 h-3.5 text-indigo-700" />
                      <span>পরীক্ষা-নিরীক্ষা (Tests)</span>
                    </h4>
                    <div className="text-xs text-slate-800 font-medium whitespace-pre-line leading-relaxed">
                      {investigations}
                    </div>
                  </div>
                )}

                {/* 3. General Advice & Warnings */}
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-amber-900 text-[11px] uppercase">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span>জরুরি বিপদচিহ্ন:</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    শিশু দ্রুত শ্বাস নিলে, বুকের খাঁচা ডেবে গেলে, খিঁচুনি বা অতিরিক্ত নিস্তেজ হলে অবিলম্বে নিকটস্থ হাসপাতালে নিয়ে যান।
                  </p>
                </div>

              </div>

              {/* RIGHT COLUMN: ℞ Medications List (8 cols on desktop) */}
              <div className="md:col-span-8 space-y-4">
                
                {/* Rx Symbol Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-3xl font-black font-serif text-sky-900 italic select-none">
                    ℞
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    ওষুধের নাম ও সুনির্দিষ্ট মাত্রা ({items.length} টি আইটেম)
                  </span>
                </div>

                {/* Drugs List */}
                {items.length === 0 ? (
                  <div className="py-12 text-center space-y-2 border-2 border-dashed border-slate-200 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 mx-auto flex items-center justify-center">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">প্রেসক্রিপশন প্যাড খালি রয়েছে</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      ড্রাগ ডিরেক্টরি থেকে ওষুধের কার্ডে <strong>'+ প্রেসক্রিপশনে যোগ করুন'</strong> চাপুন অথবা উপরে ম্যানুয়ালি ড্রাগ যোগ করুন।
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {items.map((item, idx) => (
                      <div 
                        key={item.id} 
                        className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-all shadow-2xs relative group"
                      >
                        {/* Drug Name & Brand */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono text-sm font-bold text-sky-800">
                                {idx + 1}.
                              </span>
                              <h4 className="text-sm font-bold text-slate-900">
                                {item.brandName || item.genericName}
                              </h4>
                              {item.banglaName && (
                                <span className="text-xs text-slate-500 font-normal">
                                  ({item.banglaName})
                                </span>
                              )}
                              <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                                {item.formulation}
                              </span>
                            </div>

                            {item.genericName !== item.brandName && (
                              <p className="text-[11px] text-slate-500 ml-5">
                                Generic: {item.genericName}
                              </p>
                            )}
                          </div>

                          {/* Action Buttons (Hidden in Print) */}
                          <div className="no-print flex items-center gap-1 opacity-90 group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                              title="Remove from prescription"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Calculated Dose & Schedule Callout */}
                        <div className="ml-5 mt-2 p-2.5 bg-sky-50/60 border border-sky-100 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-sky-950">
                            <Syringe className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                            <span>একবারের মাত্রা: <span className="text-sky-900 font-extrabold text-sm">{item.doseDisplay}</span></span>
                            {item.activeMg && (
                              <span className="text-[10px] text-slate-500 font-normal">({item.activeMg} mg active)</span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-slate-700">
                            <span className="font-semibold">{item.frequency}</span>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="font-bold text-slate-900">{item.duration}</span>
                          </div>
                        </div>

                        {/* Special Instructions / Syringe Precision */}
                        {(item.instructions || item.reconstitutionNote) && (
                          <div className="ml-5 mt-1.5 text-[11px] text-slate-600 flex items-start gap-1">
                            <span className="font-semibold text-slate-700">নির্দেশনা:</span>
                            <span>{item.instructions || item.reconstitutionNote}</span>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                )}

                {/* Advice & Follow-up Section */}
                <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-900 shrink-0">পরামর্শ (Advice):</span>
                    <span className="text-slate-700">{advice}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 shrink-0">পরবর্তী সাক্ষাত (Follow-up):</span>
                    <span className="text-slate-700 font-semibold">{followUp}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Signature & Credential Footer */}
            <div className="pt-8 border-t-2 border-slate-300 flex items-end justify-between text-xs">
              <div className="text-[11px] text-slate-500 max-w-sm">
                <p className="font-bold text-slate-700">ShishuDose BD - Clinical Safety Verified</p>
                <p>বাংলাদেশ ডিজিডিএ (DGDA BD) অনুমোদিত ফরম্যুলেশন ও আইসিডিডিআর,বি পেডিয়াট্রিক প্রোটোকল।</p>
              </div>

              <div className="text-center min-w-[200px]">
                <div className="border-b border-slate-400 w-44 mx-auto pb-1 mb-1"></div>
                <p className="font-bold text-slate-900 text-xs">ডাঃ আশরাফুল হক অলি</p>
                <p className="text-[10px] text-slate-500">চিকিৎসকের স্বাক্ষর ও সীল (Doctor's Signature & Seal)</p>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM MASTER ACTION BAR (Hidden in Print) */}
        {/* ========================================================= */}
        <div className="no-print bg-white border-t border-slate-200 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          
          {/* Left Buttons: Share & Copy */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* WhatsApp Share */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all active:scale-98 cursor-pointer"
              title="Send complete prescription to patient via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp এ পাঠান</span>
            </button>

            {/* Copy Note */}
            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Copy complete prescription text note"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-700">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>নোট কপি</span>
                </>
              )}
            </button>
          </div>

          {/* Right Buttons: PDF Download & Print Pad */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* 1. PDF DOWNLOAD BUTTON */}
            <button
              type="button"
              disabled={isExportingPdf}
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              title="Download Prescription as standard PDF file"
            >
              <Download className="w-4 h-4" />
              <span>{isExportingPdf ? 'পিডিএফ তৈরি হচ্ছে...' : 'পিডিএফ ডাউনলোড (Download PDF)'}</span>
            </button>

            {/* 2. PRINT BUTTON */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all active:scale-98 cursor-pointer"
              title="Print Prescription on Paper or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট করুন (Print Pad)</span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

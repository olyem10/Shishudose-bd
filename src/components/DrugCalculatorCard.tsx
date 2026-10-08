import React, { useState, useId } from 'react';
import { DrugDoseProtocol, PatientProfile, DrugFormulation } from '../types/pediatric';
import { calculateDrugDose, toBanglaDigits } from '../utils/calculator';
import { PrescriptionSlipModal } from './PrescriptionSlipModal';
import { usePrescription } from '../contexts/PrescriptionContext';
import { 
  Copy, 
  Check, 
  AlertTriangle, 
  Info, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Pill, 
  Droplet, 
  Syringe, 
  Sparkles,
  Calendar,
  Clock,
  Eye,
  Printer,
  Share2,
  Plus,
  FileText
} from 'lucide-react';

interface DrugCalculatorCardProps {
  drug: DrugDoseProtocol;
  patient: PatientProfile;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

function getSyringeRecommendation(volumeMl: number): { label: string; details: string } {
  if (volumeMl <= 1) {
    return {
      label: '1 ml Tuberculin Syringe (100 units)',
      details: 'Calibrated in 0.01 ml marks for micro-dose precision'
    };
  } else if (volumeMl <= 3) {
    return {
      label: '3 ml Syringe',
      details: 'Calibrated in 0.1 ml graduations'
    };
  } else if (volumeMl <= 5) {
    return {
      label: '5 ml Syringe',
      details: 'Calibrated in 0.2 ml graduations'
    };
  } else if (volumeMl <= 10) {
    return {
      label: '10 ml Syringe',
      details: 'Calibrated in 0.5 ml graduations'
    };
  } else {
    return {
      label: '20 ml or 50 ml Syringe / IV Burette Set',
      details: 'Infuse via pediatric microburette or syringe driver'
    };
  }
}

export const DrugCalculatorCard: React.FC<DrugCalculatorCardProps> = ({
  drug,
  patient,
  isFavorite,
  onToggleFavorite
}) => {
  const formulationSelectId = useId();
  const doseSliderId = useId();
  // State for user-selected formulation
  const [selectedFormulationIndex, setSelectedFormulationIndex] = useState(0);
  // State for custom dose within min-max range
  const [customDose, setCustomDose] = useState<number>(drug.defaultDoseMg);
  // State for prescription copied toast
  const [copiedLang, setCopiedLang] = useState<'bn' | 'en' | null>(null);
  // Collapsible clinical tips
  const [isExpanded, setIsExpanded] = useState(false);
  // Prescription Slip Modal for Sharing & Printing
  const [showPrescriptionSlip, setShowPrescriptionSlip] = useState(false);

  // Global Multi-Drug Prescription Pad Context
  const { items, addItem, removeItem, setIsOpenPad } = usePrescription();
  const isAddedToPad = items.some(item => item.genericName.toLowerCase() === drug.genericName.toLowerCase());

  const formulation: DrugFormulation = drug.formulations[selectedFormulationIndex] || drug.formulations[0];
  const totalMonths = patient.ageYears * 12 + patient.ageMonths;

  const result = calculateDrugDose(
    drug,
    patient.weightKg,
    totalMonths,
    formulation,
    customDose
  );

  const handleTogglePrescriptionPad = () => {
    if (isAddedToPad) {
      const existing = items.find(item => item.genericName.toLowerCase() === drug.genericName.toLowerCase());
      if (existing) removeItem(existing.id);
    } else {
      const primaryBrand = formulation.bdBrands[0] || drug.popularBDBrands[0] || drug.genericName;
      const doseDisplay = result.dropsPerDose && formulation.formType === 'drops'
        ? `${toBanglaDigits(result.dropsPerDose)} ফোঁটা (${toBanglaDigits(result.volumePerDoseMl || 0)} মিলি)`
        : formulation.formType === 'eye_drops'
        ? '১ ফোঁটা করে আক্রান্ত চোখে'
        : formulation.formType === 'injection' && result.volumePerDoseMl
        ? `${toBanglaDigits(result.volumePerDoseMl)} মিলি (IV/IM)`
        : result.volumePerDoseMl
        ? `${toBanglaDigits(result.volumePerDoseMl)} মিলি (${result.teaspoonDescription})`
        : result.tabletsPerDose
        ? `${toBanglaDigits(result.tabletsPerDose)} টি ${formulation.unitLabel}`
        : `${toBanglaDigits(result.dosePerAdministrationMg)} মি.গ্রা.`;

      addItem({
        drugId: drug.id,
        genericName: drug.genericName,
        banglaName: drug.banglaName,
        brandName: primaryBrand,
        formulation: formulation.name,
        doseDisplay,
        activeMg: result.dosePerAdministrationMg,
        frequency: drug.banglaSchedule || drug.frequency,
        duration: drug.standardDurationDays,
        instructions: result.volumePerDoseMl ? 'মেপে খাওয়ানোর জন্য ড্রপার বা সিরিঞ্জ ব্যবহার করুন' : undefined,
        reconstitutionNote: formulation.reconstitutionNote
      });
    }
  };

  const handleCopy = (lang: 'bn' | 'en') => {
    const textToCopy = lang === 'bn' ? result.prescriptionTextBn : result.prescriptionTextEn;
    navigator.clipboard.writeText(textToCopy);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2500);
  };

  // Form type icon
  const getFormIcon = (type: string) => {
    switch (type) {
      case 'eye_drops':
        return <Eye className="w-3.5 h-3.5 text-cyan-600" />;
      case 'drops':
        return <Droplet className="w-3.5 h-3.5 text-sky-600" />;
      case 'injection':
        return <Syringe className="w-3.5 h-3.5 text-rose-600" />;
      case 'suppository':
        return <Pill className="w-3.5 h-3.5 text-purple-600" />;
      case 'tablet':
      case 'dispersible_tablet':
        return <Pill className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Droplet className="w-3.5 h-3.5 text-teal-600" />;
    }
  };

  return (
    <div className={`bg-white rounded-xl border transition-all ${
      isFavorite ? 'border-sky-300 ring-1 ring-sky-100 shadow-sm' : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
    }`}>
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {drug.genericName}
              </h3>
              {drug.banglaName && (
                <span className="text-xs text-slate-500 font-medium font-sans">
                  ({drug.banglaName})
                </span>
              )}
            </div>

            {/* Unboxed Metadata (Zero-Pill Rule) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-medium text-slate-700">{drug.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-sky-700 font-medium">
                {drug.popularBDBrands.slice(0, 4).join(', ')}
                {drug.popularBDBrands.length > 4 ? ` +${drug.popularBDBrands.length - 4}` : ''}
              </span>
              {drug.manufacturerNotes && (
                <>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline text-slate-400">{drug.manufacturerNotes}</span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-600 pt-0.5 line-clamp-2">
              {drug.indication}
            </p>
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite(drug.id)}
            className={`p-2 rounded-lg transition-colors shrink-0 ${
              isFavorite 
                ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                : 'text-slate-300 hover:text-amber-500 hover:bg-slate-50'
            }`}
            title={isFavorite ? 'Remove from pinned list' : 'Pin to top of ward round list'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Formulation Selector */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <label htmlFor={formulationSelectId} className="text-xs font-semibold text-slate-600 shrink-0">
            Formulation:
          </label>
          <div className="relative flex-1 min-w-[220px]">
            <select
              id={formulationSelectId}
              value={selectedFormulationIndex}
              onChange={(e) => setSelectedFormulationIndex(parseInt(e.target.value))}
              className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium rounded-lg px-3 py-1.5 pr-8 hover:bg-slate-100 focus:outline-hidden focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              {drug.formulations.map((form, idx) => (
                <option key={form.name} value={idx}>
                  {form.name} ({form.bdBrands.slice(0, 2).join(', ')})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Calculated Output Zone */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-sky-50/40 to-transparent">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* PRIMARY VOLUME / LIQUID DOSE */}
          <div className="bg-white p-3.5 rounded-xl border border-sky-100/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                {getFormIcon(formulation.formType)}
                <span>Calculated Administration</span>
              </span>
              <button
                type="button"
                onClick={() => setShowPrescriptionSlip(true)}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                title="Open Prescription Note for Print or WhatsApp Share"
              >
                <Printer className="w-3 h-3 text-emerald-600" />
                <span>প্রিন্ট / শেয়ার</span>
              </button>
            </div>

            <div className="mt-2">
              {formulation.formType === 'eye_drops' ? (
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-700 font-mono tabular-nums tracking-tight">
                    1 <span className="text-lg font-sans text-cyan-900 font-bold">Drop</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Instill into affected eye(s) 3 times daily
                  </div>
                </div>
              ) : result.dropsPerDose && formulation.formType === 'drops' ? (
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-700 font-mono tabular-nums tracking-tight">
                    {result.dropsPerDose} <span className="text-lg font-sans text-sky-900 font-bold">Drops</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Equal to <strong className="font-mono tabular-nums">{result.volumePerDoseMl} ml</strong> ({result.dosePerAdministrationMg} mg active)
                  </div>
                </div>
              ) : formulation.formType === 'injection' && result.volumePerDoseMl ? (
                <div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 font-mono tabular-nums tracking-tight">
                      {result.volumePerDoseMl} <span className="text-lg font-sans text-rose-900 font-bold">ml IV / IM</span>
                    </div>
                    <span className="text-[10px] font-bold text-rose-800 bg-rose-100/90 border border-rose-200 px-1.5 py-0.5 rounded">
                      Direct ml Syringe Dose
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 mt-1">
                    Draw up <strong className="font-mono tabular-nums text-slate-900">{result.volumePerDoseMl} ml</strong> with syringe ({drug.doseUnit.includes('IU') ? `${result.dosePerAdministrationMg.toLocaleString()} IU` : `${result.dosePerAdministrationMg} mg`} active)
                  </div>
                  
                  {/* Syringe Guide */}
                  <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-start gap-2 text-slate-700">
                    <Syringe className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900 text-[11px]">
                        Recommended: {getSyringeRecommendation(result.volumePerDoseMl).label}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {getSyringeRecommendation(result.volumePerDoseMl).details}
                      </p>
                    </div>
                  </div>

                  {formulation.reconstitutionNote && (
                    <div className="mt-1.5 p-2 bg-rose-50/80 border border-rose-200/60 rounded-md text-[11px] text-rose-950 font-medium">
                      💉 <strong>Preparation & Dilution:</strong> {formulation.reconstitutionNote}
                    </div>
                  )}
                </div>
              ) : result.volumePerDoseMl ? (
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-700 font-mono tabular-nums tracking-tight">
                    {result.volumePerDoseMl} <span className="text-lg font-sans text-sky-900 font-bold">ml</span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 mt-0.5 flex items-center gap-1.5">
                    <span>{result.teaspoonDescription}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="font-mono tabular-nums text-slate-600">({result.dosePerAdministrationMg} mg)</span>
                  </div>
                </div>
              ) : result.tabletsPerDose ? (
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-700 font-mono tabular-nums tracking-tight">
                    {result.tabletsPerDose} <span className="text-lg font-sans text-sky-900 font-bold">{formulation.unitLabel}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    ({result.dosePerAdministrationMg} mg active dose)
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-700 font-mono tabular-nums tracking-tight">
                    {result.dosePerAdministrationMg} <span className="text-lg font-sans text-sky-900 font-bold">{drug.doseUnit}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Frequency and Duration */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-medium text-slate-800">{drug.frequency}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Duration: <strong>{drug.standardDurationDays}</strong></span>
              </div>
            </div>
          </div>

          {/* DOSE ADJUSTER & SUMMARY METRICS */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label htmlFor={doseSliderId} className="font-semibold text-slate-700">Dose per Weight:</label>
                <span className="font-mono font-bold text-sky-800 tabular-nums">
                  {customDose} {drug.doseUnit}
                </span>
              </div>

              {/* Slider if min/max differ */}
              {drug.minDoseMg !== drug.maxDoseMg ? (
                <div className="space-y-1">
                  <input
                    id={doseSliderId}
                    type="range"
                    min={drug.minDoseMg}
                    max={drug.maxDoseMg}
                    step={drug.minDoseMg < 1 ? 0.05 : 1}
                    value={customDose}
                    onChange={(e) => setCustomDose(parseFloat(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-600 font-mono tabular-nums">
                    <span>Min: {drug.minDoseMg}</span>
                    <span>Std: {drug.defaultDoseMg}</span>
                    <span>Max: {drug.maxDoseMg}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Fixed protocol dose: {drug.defaultDoseMg} {drug.doseUnit}
                </p>
              )}
            </div>

            {/* Daily Total & Ceiling status */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">24-Hour Total:</span>
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {result.dailyTotalMg} mg / day
              </span>
            </div>

            {result.isMaxDoseCapped && (
              <div className="mt-1.5 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Dose capped at safe adult/child maximum ceiling.
              </div>
            )}
          </div>

        </div>

        {/* Warnings / Cautions */}
        {result.warnings.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {result.warnings.map((w) => (
              <div key={w} className="flex items-start gap-2 p-2 rounded-lg bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{w}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer: Copy Rx in Bangla & English & Print/Share */}
      <div className="p-3 sm:px-5 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Add to Multi-Drug Prescription Pad */}
          <button
            type="button"
            onClick={handleTogglePrescriptionPad}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs transition-all whitespace-nowrap active:scale-98 cursor-pointer ${
              isAddedToPad
                ? 'bg-emerald-700 text-white hover:bg-emerald-800 ring-2 ring-emerald-400'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
            title={isAddedToPad ? 'প্রেসক্রিপশন প্যাড থেকে বাদ দিন' : 'প্রেসক্রিপশন প্যাডে এই ওষুধ যোগ করুন'}
          >
            {isAddedToPad ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>প্যাডে যুক্ত আছে</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>+ প্রেসক্রিপশনে যোগ করুন</span>
              </>
            )}
          </button>

          {/* Quick open full pad if items present */}
          {items.length > 0 && (
            <button
              type="button"
              onClick={() => setIsOpenPad(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 transition-colors whitespace-nowrap cursor-pointer"
              title="ফুল প্রেসক্রিপশন প্যাড ওপেন করুন"
            >
              <FileText className="w-3.5 h-3.5 text-sky-700" />
              <span>প্যাড দেখুন ({items.length})</span>
            </button>
          )}

          {/* Quick Single Rx Slip View */}
          <button
            type="button"
            onClick={() => setShowPrescriptionSlip(true)}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors whitespace-nowrap cursor-pointer"
            title="Generate individual drug prescription slip"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>সিঙ্গেল স্লিপ</span>
          </button>

          {/* Copy Bengali Prescription */}
          <button
            onClick={() => handleCopy('bn')}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white shadow-2xs transition-colors whitespace-nowrap active:scale-98 cursor-pointer"
            title="Copy standard prescription text in Bengali"
          >
            {copiedLang === 'bn' ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>কপি হয়েছে</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>বাংলা টেক্সট</span>
              </>
            )}
          </button>

          {/* Copy English Prescription */}
          <button
            onClick={() => handleCopy('en')}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors whitespace-nowrap cursor-pointer"
            title="Copy prescription text in English"
          >
            {copiedLang === 'en' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>English Rx</span>
              </>
            )}
          </button>
        </div>

        {/* Expand Details Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 rounded hover:bg-slate-200/50 transition-colors"
        >
          <span>Clinical Pearls</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Clinical Pearls & Administration Tips */}
      {isExpanded && (
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-600 space-y-2">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-sky-600" />
            <span>Prescribing Notes & Administration Instructions:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600">
            {drug.clinicalTips.map((tip) => (
              <li key={tip} className="leading-relaxed">{tip}</li>
            ))}
          </ul>
          {drug.banglaSchedule && (
            <div className="mt-2 p-2 bg-white rounded border border-slate-200 text-slate-700">
              <strong className="text-slate-900">বাংলা সময়সূচী: </strong>
              <span>{drug.banglaSchedule}</span>
            </div>
          )}
        </div>
      )}

      {/* Prescription Note Modal for Printing & WhatsApp Sharing */}
      <PrescriptionSlipModal
        isOpen={showPrescriptionSlip}
        onClose={() => setShowPrescriptionSlip(false)}
        drug={drug}
        patient={patient}
        formulation={formulation}
        result={result}
        customDose={customDose}
      />

    </div>
  );
};

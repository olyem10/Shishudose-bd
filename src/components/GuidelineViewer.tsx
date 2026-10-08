import React, { useState, useEffect } from 'react';
import { BANGLADESH_CLINICAL_GUIDELINES } from '../data/bangladeshGuidelines';
import { PatientProfile, ClinicalGuideline } from '../types/pediatric';
import { calculatePediatricFluids } from '../utils/calculator';
import { 
  BookOpen, 
  Search, 
  AlertTriangle, 
  Info, 
  Activity, 
  Timer, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  Droplets,
  Heart,
  ShieldAlert
} from 'lucide-react';

interface GuidelineViewerProps {
  patient: PatientProfile;
  initialGuidelineId?: string;
}

export const GuidelineViewer: React.FC<GuidelineViewerProps> = ({ patient, initialGuidelineId }) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialGuidelineId || BANGLADESH_CLINICAL_GUIDELINES[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Respiratory Rate Counter State for IMCI
  const [rrCount, setRrCount] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = () => {
    setRrCount(0);
    setTimerSeconds(60);
    setIsTimerRunning(true);
  };

  const handleTapBreath = () => {
    if (!isTimerRunning && timerSeconds === 60) {
      setIsTimerRunning(true);
    }
    if (timerSeconds > 0) {
      setRrCount((prev) => prev + 1);
    }
  };

  const handleResetCounter = () => {
    setIsTimerRunning(false);
    setTimerSeconds(60);
    setRrCount(0);
  };

  const totalMonths = patient.ageYears * 12 + patient.ageMonths;
  const isInfant = totalMonths < 12;
  const fluidCalcs = calculatePediatricFluids(patient.weightKg, isInfant);

  // Fast breathing threshold determination
  let rrThreshold = 40;
  let rrAgeLabel = '12–59 Months (Threshold: ≥40 bpm)';
  if (totalMonths < 2) {
    rrThreshold = 60;
    rrAgeLabel = '< 2 Months (Threshold: ≥60 bpm)';
  } else if (totalMonths < 12) {
    rrThreshold = 50;
    rrAgeLabel = '2–11 Months (Threshold: ≥50 bpm)';
  }

  const isFastBreathing = rrCount >= rrThreshold;

  // Filtered guidelines
  const filteredGuidelines = BANGLADESH_CLINICAL_GUIDELINES.filter((g) => {
    const q = searchQuery.toLowerCase();
    return (
      g.title.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      (g.banglaTitle && g.banglaTitle.includes(q))
    );
  });

  const selectedGuideline: ClinicalGuideline | undefined =
    BANGLADESH_CLINICAL_GUIDELINES.find((g) => g.id === selectedId) ||
    filteredGuidelines[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Sidebar List of Guidelines */}
      <div className="lg:col-span-4 space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search guidelines (diarrhea, asthma, dengue...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* List items */}
        <div className="space-y-1.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
          {filteredGuidelines.map((guideline) => {
            const isActive = guideline.id === selectedGuideline?.id;
            return (
              <button
                key={guideline.id}
                onClick={() => setSelectedId(guideline.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                  isActive
                    ? 'bg-sky-50 border-sky-300 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-medium text-sky-800">{guideline.category}</span>
                    {guideline.badge && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-400 truncate">{guideline.badge}</span>
                      </>
                    )}
                  </div>
                  <h4 className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                    isActive ? 'text-sky-950' : 'text-slate-900'
                  }`}>
                    {guideline.title}
                  </h4>
                  {(guideline.banglaTitle || guideline.banglaName) && (
                    <p className="text-[11px] text-slate-500 truncate">
                      {guideline.banglaTitle || guideline.banglaName}
                    </p>
                  )}
                </div>
                <ChevronRight className={`w-4 h-4 mt-1 shrink-0 ${
                  isActive ? 'text-sky-700' : 'text-slate-300'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Guideline Article */}
      <div className="lg:col-span-8">
        {selectedGuideline ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
            
            {/* Header */}
            <div className="p-5 sm:p-6 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-sky-700">{selectedGuideline.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedGuideline.badge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {selectedGuideline.title}
              </h2>
              {(selectedGuideline.banglaTitle || selectedGuideline.banglaName) && (
                <p className="text-sm font-medium text-slate-600">
                  {selectedGuideline.banglaTitle || selectedGuideline.banglaName}
                </p>
              )}
              <p className="text-xs sm:text-sm text-slate-600 pt-1 leading-relaxed">
                {selectedGuideline.summary}
              </p>
            </div>

            {/* DYNAMIC CALCULATOR EMBEDS BASED ON PROTOCOL */}
            
            {/* 1. Diarrhea Fluid Calculator Embed */}
            {selectedGuideline.id === 'icddrb-diarrhea' && (
              <div className="p-4 sm:p-6 bg-sky-50/50">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-950 uppercase tracking-wide mb-3">
                  <Droplets className="w-4 h-4 text-sky-600" />
                  <span>Personalized Rehydration Volumes for {patient.weightKg} kg Child</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Plan B ORS */}
                  <div className="p-3 bg-white rounded-lg border border-sky-200">
                    <span className="text-[11px] font-semibold text-slate-500">Plan B (Some Dehydration)</span>
                    <div className="mt-1 text-xl font-bold font-mono text-sky-800 tabular-nums">
                      {fluidCalcs.planBORS4HoursMl} ml
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      ORS over 4 hours (75 ml/kg). Give spoon by spoon.
                    </p>
                  </div>

                  {/* Plan C Phase 1 */}
                  <div className="p-3 bg-white rounded-lg border border-sky-200">
                    <span className="text-[11px] font-semibold text-slate-500">Plan C: Initial 30 ml/kg</span>
                    <div className="mt-1 text-xl font-bold font-mono text-sky-800 tabular-nums">
                      {fluidCalcs.planCPhase1Ml} ml
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {isInfant ? 'Infuse over 1 hour (Infant < 1 yr)' : 'Infuse over 30 min (Age ≥ 1 yr)'} with Cholera Saline / Ringer’s.
                    </p>
                  </div>

                  {/* Plan C Phase 2 */}
                  <div className="p-3 bg-white rounded-lg border border-sky-200">
                    <span className="text-[11px] font-semibold text-slate-500">Plan C: Subsequent 70 ml/kg</span>
                    <div className="mt-1 text-xl font-bold font-mono text-sky-800 tabular-nums">
                      {fluidCalcs.planCPhase2Ml} ml
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {isInfant ? 'Infuse over 5 hours (Infant < 1 yr)' : 'Infuse over 2.5 hours (Age ≥ 1 yr)'}.
                    </p>
                  </div>
                </div>

                {/* Mandatory Zinc notice */}
                <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory Zinc: </strong>
                    {totalMonths < 6 ? '10 mg/day (1 tsp syrup) for 14 continuous days.' : '20 mg/day (2 tsp syrup or 1 dispersible tab) for 14 continuous days.'}
                  </span>
                </div>
              </div>
            )}

            {/* 2. Pneumonia Fast Breathing Counter Embed */}
            {selectedGuideline.id === 'imci-pneumonia' && (
              <div className="p-4 sm:p-6 bg-emerald-50/40 border-b border-emerald-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wide">
                    <Timer className="w-4 h-4 text-emerald-600" />
                    <span>Live 60-Second IMCI Respiratory Rate Counter</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    {rrAgeLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Big Tap Area */}
                  <div className="sm:col-span-7">
                    <button
                      onClick={handleTapBreath}
                      className="w-full py-5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl shadow-xs transition-all flex flex-col items-center justify-center gap-1 cursor-pointer select-none"
                    >
                      <span className="text-xs font-medium text-emerald-100 uppercase tracking-wider">
                        {isTimerRunning ? 'Tap On Each Inhalation' : 'Click to Start 60s Count'}
                      </span>
                      <span className="text-4xl font-extrabold font-mono tabular-nums">
                        {rrCount}
                      </span>
                      <span className="text-xs text-emerald-100">breaths recorded</span>
                    </button>
                  </div>

                  {/* Timer & Controls */}
                  <div className="sm:col-span-5 space-y-2.5">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                      <span className="text-xs text-slate-500 font-medium">Timer Remaining</span>
                      <div className={`text-2xl font-bold font-mono tabular-nums ${timerSeconds <= 10 && timerSeconds > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-900'}`}>
                        00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleStartTimer}
                        disabled={isTimerRunning}
                        className="flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-50 transition-colors"
                      >
                        Start 60s
                      </button>
                      <button
                        onClick={handleResetCounter}
                        className="py-1.5 px-2.5 text-xs font-medium rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* IMCI Triage Result Banner */}
                {rrCount > 0 && timerSeconds === 0 && (
                  <div className={`mt-3 p-3 rounded-lg border text-xs font-medium flex items-start gap-2.5 ${
                    isFastBreathing 
                      ? 'bg-rose-50 border-rose-200 text-rose-950' 
                      : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  }`}>
                    {isFastBreathing ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>FAST BREATHING DETECTED ({rrCount} bpm ≥ {rrThreshold} bpm cutoff).</strong>
                          <p className="mt-0.5">
                            Classify as <strong>PNEUMONIA</strong> (if no chest indrawing/stridor). Prescribe Outpatient Oral Amoxicillin high-dose 80-90 mg/kg/day BID for 5 days. Check for lower chest wall indrawing.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>NORMAL RESPIRATORY RATE ({rrCount} bpm &lt; {rrThreshold} bpm cutoff).</strong>
                          <p className="mt-0.5">
                            No fast breathing. Classify as No Pneumonia: Cough or Cold. Provide home care, soothing fluids, and advice on danger signs.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 3. Dengue Fluid Rate Calculator Embed */}
            {selectedGuideline.id === 'dengue-pediatric' && (
              <div className="p-4 sm:p-6 bg-amber-50/50">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wide mb-3">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Dengue Critical Phase Fluid Rates for {patient.weightKg} kg</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <span className="text-[11px] font-semibold text-slate-500">Maintenance (Holliday-Segar)</span>
                    <div className="mt-1 text-xl font-bold font-mono text-slate-900 tabular-nums">
                      {fluidCalcs.maintenanceMlPerHour} ml / hr
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Daily: {fluidCalcs.maintenanceMlPerDay} ml / 24 hr
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <span className="text-[11px] font-semibold text-slate-500">5 ml / kg / hr (Moderate Leakage)</span>
                    <div className="mt-1 text-xl font-bold font-mono text-amber-800 tabular-nums">
                      {fluidCalcs.denguePlasmaRate5ml} ml / hr
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Titrate every 2-4 hr based on HCT & urine output.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <span className="text-[11px] font-semibold text-slate-500">7 ml / kg / hr (High Leakage)</span>
                    <div className="mt-1 text-xl font-bold font-mono text-amber-800 tabular-nums">
                      {fluidCalcs.denguePlasmaRate7ml} ml / hr
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Limit to 1-2 hours before stepping down.
                    </p>
                  </div>
                </div>

                <div className="mt-3 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900">
                  <strong>CRITICAL CONTRAINDICATION: </strong>
                  Do NOT prescribe Ibuprofen, Aspirin, or any NSAIDs in suspected dengue. Paracetamol only (10-15 mg/kg Q4-6H).
                </div>
              </div>
            )}

            {/* Guideline Sections */}
            <div className="p-5 sm:p-6 space-y-6">
              {selectedGuideline.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                    {sec.heading}
                  </h3>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed list-disc list-inside pl-1">
                    {sec.content.map((point, pIdx) => (
                      <li key={pIdx} className="leading-relaxed">
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Callouts */}
                  {sec.callout && (
                    <div className={`p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 ${
                      sec.callout.type === 'alert'
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : sec.callout.type === 'warning'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-sky-50 border-sky-200 text-sky-900'
                    }`}>
                      {sec.callout.type === 'alert' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      ) : sec.callout.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      )}
                      <span>{sec.callout.text}</span>
                    </div>
                  )}

                  {/* Tables */}
                  {sec.tableData && (
                    <div className="overflow-x-auto rounded-lg border border-slate-200 mt-2">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            {sec.tableData.headers.map((h) => (
                              <th key={h} className="py-2.5 px-3 font-semibold text-slate-800">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sec.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="py-2 px-3 text-slate-700 font-mono tabular-nums">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* References */}
            <div className="p-5 bg-slate-50/60 text-xs text-slate-500 space-y-1">
              <span className="font-semibold text-slate-700">Official Clinical References:</span>
              <ul className="list-disc list-inside space-y-0.5 pl-1 text-slate-500">
                {selectedGuideline.references.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ul>
            </div>

          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
            No guidelines matched your search.
          </div>
        )}
      </div>

    </div>
  );
};

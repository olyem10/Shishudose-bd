import React, { useState } from 'react';
import { PatientProfile } from '../types/pediatric';
import { calculatePediatricFluids } from '../utils/calculator';
import { Droplet, Info, AlertCircle, Clock, CheckCircle2, HeartPulse, ShieldAlert, Sparkles, Syringe, Activity, Flame } from 'lucide-react';

interface FluidCalculatorProps {
  patient: PatientProfile;
}

export const FluidCalculator: React.FC<FluidCalculatorProps> = ({ patient }) => {
  const [fluidScenario, setFluidScenario] = useState<'maintenance' | 'planB' | 'planC' | 'dengue' | 'blood' | 'electrolytes'>('maintenance');

  // Blood Transfusion States
  const [bloodProduct, setBloodProduct] = useState<'prbc' | 'whole_blood' | 'platelet' | 'ffp' | 'cryo' | 'exchange'>('prbc');
  const [currentHb, setCurrentHb] = useState<number>(6.5);
  const [targetHb, setTargetHb] = useState<number>(10.0);
  const [prbcCalculationMode, setPrbcCalculationMode] = useState<'target' | 'rule10' | 'rule15'>('target');
  const [prbcFactor, setPrbcFactor] = useState<number>(4); // 4 for standard PRBC, 3 for Hct ~70% PRBC
  const [transfusionHours, setTransfusionHours] = useState<number>(3); // 2 to 4 hours
  const [exchangeType, setExchangeType] = useState<'term' | 'preterm'>('term');
  const [dropsPerMl, setDropsPerMl] = useState<15 | 60>(15); // Standard blood transfusion set is 15 drops/ml

  // Electrolyte States
  const [electrolyteMode, setElectrolyteMode] = useState<'hyponatremia' | 'hypernatremia' | 'hyperkalemia' | 'hypokalemia' | 'bicarbonate'>('hyponatremia');
  const [serumNa, setSerumNa] = useState<number>(118);
  const [targetNa, setTargetNa] = useState<number>(125);
  const [isSymptomaticSeizures, setIsSymptomaticSeizures] = useState<boolean>(true);
  const [hyperNa, setHyperNa] = useState<number>(160);
  const [targetHyperNa, setTargetHyperNa] = useState<number>(145);
  const [serumK, setSerumK] = useState<number>(6.8);
  const [hasEcgChanges, setHasEcgChanges] = useState<boolean>(true);
  const [hypoK, setHypoK] = useState<number>(2.5);
  const [targetHypoK, setTargetHypoK] = useState<number>(4.0);
  const [baseDeficit, setBaseDeficit] = useState<number>(10);
  const [currentHco3, setCurrentHco3] = useState<number>(8);
  const [targetHco3, setTargetHco3] = useState<number>(15);

  const totalMonths = patient.ageYears * 12 + patient.ageMonths;
  const isInfant = totalMonths < 12;
  const isNeonate = totalMonths === 0 && patient.ageDays <= 28;

  const fluids = calculatePediatricFluids(patient.weightKg, isInfant);

  // Blood calculations
  const hbRise = Math.max(0, targetHb - currentHb);
  let activeVolume = 0;
  let activeInfusionHours = transfusionHours;

  if (bloodProduct === 'prbc') {
    if (prbcCalculationMode === 'target') {
      activeVolume = Math.round(patient.weightKg * hbRise * prbcFactor);
    } else if (prbcCalculationMode === 'rule10') {
      activeVolume = Math.round(patient.weightKg * 10);
    } else {
      activeVolume = Math.round(patient.weightKg * 15);
    }
  } else if (bloodProduct === 'whole_blood') {
    activeVolume = prbcCalculationMode === 'target'
      ? Math.round(patient.weightKg * hbRise * 6)
      : Math.round(patient.weightKg * 20);
  } else if (bloodProduct === 'platelet') {
    activeVolume = Math.round(patient.weightKg * 10);
    activeInfusionHours = 0.5; // 30 min
  } else if (bloodProduct === 'ffp') {
    activeVolume = Math.round(patient.weightKg * 15);
    activeInfusionHours = 1.5; // 1-2 hours
  } else if (bloodProduct === 'cryo') {
    activeVolume = Math.round(patient.weightKg * 7.5);
    activeInfusionHours = 0.5; // 30 min
  } else if (bloodProduct === 'exchange') {
    activeVolume = Math.round(patient.weightKg * (exchangeType === 'term' ? 160 : 180));
    activeInfusionHours = 2.0; // 2 hours
  }

  const hourlyRate = activeInfusionHours > 0 ? Math.round(activeVolume / activeInfusionHours) : activeVolume;
  const dropRate = activeInfusionHours > 0 ? Math.round((activeVolume * dropsPerMl) / (activeInfusionHours * 60)) : 0;
  const furosemideMg = Math.round(patient.weightKg * 1.0 * 10) / 10;
  const isSevereAnemia = currentHb < 5.0;

  return (
    <div className="space-y-5">
      {/* Top Selector Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200">
        <button
          onClick={() => setFluidScenario('maintenance')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            fluidScenario === 'maintenance'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Daily Maintenance (Holliday-Segar)
        </button>

        <button
          onClick={() => setFluidScenario('planB')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            fluidScenario === 'planB'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Diarrhea Plan B (ORS 4hr)
        </button>

        <button
          onClick={() => setFluidScenario('planC')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            fluidScenario === 'planC'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Diarrhea Plan C (Fast IV)
        </button>

        <button
          onClick={() => setFluidScenario('dengue')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            fluidScenario === 'dengue'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dengue Critical Phase Rates
        </button>

        <button
          onClick={() => setFluidScenario('blood')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            fluidScenario === 'blood'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-rose-700 hover:bg-rose-50'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Blood Transfusion (রক্ত সঞ্চালন)</span>
        </button>

        <button
          onClick={() => setFluidScenario('electrolytes')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            fluidScenario === 'electrolytes'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-amber-800 hover:bg-amber-50'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Electrolytes (ইলেক্ট্রোলাইট কারেকশন)</span>
        </button>
      </div>

      {/* Scenario 1: Daily Maintenance */}
      {fluidScenario === 'maintenance' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pediatric Maintenance Fluid Requirement
              </h3>
              <p className="text-xs text-slate-500">
                Standard Holliday-Segar formula for weight <strong className="font-mono tabular-nums">{patient.weightKg} kg</strong>.
              </p>
            </div>
            <span className="text-xs font-medium text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
              Holliday-Segar Standard
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100 text-center">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Total 24-Hour Volume
              </span>
              <div className="text-3xl font-extrabold text-sky-900 font-mono tabular-nums mt-1">
                {fluids.maintenanceMlPerDay} <span className="text-sm font-sans font-medium text-slate-600">ml / day</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Calculated basal 24-hr fluid needs.
              </p>
            </div>

            <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100 text-center">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Hourly Infusion Rate
              </span>
              <div className="text-3xl font-extrabold text-sky-900 font-mono tabular-nums mt-1">
                {fluids.maintenanceMlPerHour} <span className="text-sm font-sans font-medium text-slate-600">ml / hr</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Infusion pump setting (ml/hr).
              </p>
            </div>

            <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100 text-center">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Microdropper Drop Rate
              </span>
              <div className="text-3xl font-extrabold text-sky-900 font-mono tabular-nums mt-1">
                {fluids.microdropperDropsPerMin} <span className="text-sm font-sans font-medium text-slate-600">drops / min</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                60 drops/ml pediatric micro set (1 ml/hr = 1 gtt/min).
              </p>
            </div>
          </div>

          {/* Solution Recommendation */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Recommended Solution Selection (Bangladesh Standard Practice):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900">Infants & Children (&gt; 1 month):</strong>
                <p className="text-slate-600 mt-1">
                  0.45% NaCl in 5% Dextrose (Half Normal Saline in 5% DA) or 0.225% NaCl in 5% DA (1/4th Normal Saline in 5% DA) with added 20 mmol/L KCl (once urine output is established).
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-900">Neonates (&lt; 28 days):</strong>
                <p className="text-slate-600 mt-1">
                  10% Dextrose in Water (D10W). Day 1: 60–80 ml/kg/day, increasing by 10-20 ml/kg daily up to 150 ml/kg/day by Day 7. Add electrolytes on Day 2-3.
                </p>
              </div>
            </div>
          </div>

          {/* Formula breakdown */}
          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 font-mono">
            <strong>Formula Rules: </strong>
            First 10 kg: 100 ml/kg · 10 to 20 kg: + 50 ml/kg · Each kg &gt; 20 kg: + 20 ml/kg.
          </div>
        </div>
      )}

      {/* Scenario 2: Diarrhea Plan B */}
      {fluidScenario === 'planB' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Plan B: Oral Rehydration for Some Dehydration
              </h3>
              <p className="text-xs text-slate-500">
                ICDDR,B & WHO Guideline for patient weighing <strong className="font-mono tabular-nums">{patient.weightKg} kg</strong>.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              ICDDR,B Protocol
            </span>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                Calculated ORS Target Volume in 4 Hours:
              </span>
              <div className="text-4xl font-extrabold text-emerald-800 font-mono tabular-nums mt-1">
                {fluids.planBORS4HoursMl} ml
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Formula: Weight ({patient.weightKg} kg) × 75 ml administered over 4 hours.
              </p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-700 max-w-xs space-y-1">
              <div className="font-semibold text-emerald-950">Administration Rate:</div>
              <div>Hourly target: <strong>{Math.round(fluids.planBORS4HoursMl / 4)} ml / hr</strong></div>
              <div>Approx: <strong>{Math.round((fluids.planBORS4HoursMl / 4) / 5)} teaspoons / hr</strong></div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900">Key Practical Clinical Instructions:</h4>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600">
              <li>Give using a clean cup and teaspoon. For babies, give one teaspoon every 1 to 2 minutes.</li>
              <li>If the child vomits, <strong>wait 10 minutes</strong>, then resume more slowly (1 spoonful every 2-3 minutes).</li>
              <li>If vomiting is persistent, a single dose of <strong>Ondansetron (0.15 mg/kg)</strong> can be given 30 minutes before resuming ORS.</li>
              <li>Reassess the child after 4 hours for signs of dehydration (skin pinch, eyes, thirst).</li>
              <li>Continue breastfeeding throughout rehydration.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Scenario 3: Diarrhea Plan C */}
      {fluidScenario === 'planC' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Plan C: Rapid Intravenous Rehydration for Severe Dehydration
              </h3>
              <p className="text-xs text-slate-500">
                Total 100 ml/kg of Cholera Saline or Ringer’s Lactate for <strong className="font-mono tabular-nums">{patient.weightKg} kg</strong> child.
              </p>
            </div>
            <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
              Emergency IV Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phase 1 */}
            <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-rose-900">
                  Phase 1: Initial 30 ml/kg
                </span>
                <span className="text-xs font-medium text-rose-800">
                  {isInfant ? 'Over 1 Hour' : 'Over 30 Minutes'}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-rose-950 font-mono tabular-nums">
                {fluids.planCPhase1Ml} ml
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                {isInfant 
                  ? 'Infant (< 12 months): Run 30 ml/kg rapidly over 60 minutes.' 
                  : 'Child (≥ 12 months): Run 30 ml/kg very rapidly over 30 minutes.'}
              </p>
              <div className="text-[11px] text-rose-800 bg-white/80 p-2 rounded border border-rose-200 mt-2 font-medium">
                Check radial pulse at end of Phase 1. If still weak or imperceptible, repeat the 30 ml/kg bolus rapidly.
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-sky-900">
                  Phase 2: Subsequent 70 ml/kg
                </span>
                <span className="text-xs font-medium text-sky-800">
                  {isInfant ? 'Over 5 Hours' : 'Over 2.5 Hours'}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-sky-950 font-mono tabular-nums">
                {fluids.planCPhase2Ml} ml
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                {isInfant 
                  ? 'Infant (< 12 months): Run 70 ml/kg over 5 hours (Rate: ' + Math.round(fluids.planCPhase2Ml / 5) + ' ml/hr).' 
                  : 'Child (≥ 12 months): Run 70 ml/kg over 2.5 hours (Rate: ' + Math.round(fluids.planCPhase2Ml / 2.5) + ' ml/hr).'}
              </p>
              <div className="text-[11px] text-sky-800 bg-white/80 p-2 rounded border border-sky-200 mt-2 font-medium">
                Offer ORS (5 ml/kg/hr) as soon as the child is conscious and able to swallow safely.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario 4: Dengue */}
      {fluidScenario === 'dengue' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Dengue Critical Phase Plasma Leakage Fluid Rates
              </h3>
              <p className="text-xs text-slate-500">
                Bangladesh National Dengue Protocol for weight <strong className="font-mono tabular-nums">{patient.weightKg} kg</strong>.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              National Dengue BD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-xs font-semibold text-slate-600">Maintenance Baseline</span>
              <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums mt-1">
                {fluids.maintenanceMlPerHour} ml / hr
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Normal basal fluid rate.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-xs font-semibold text-amber-900">5 ml / kg / hr (Moderate Leakage)</span>
              <div className="text-2xl font-bold font-mono text-amber-900 tabular-nums mt-1">
                {fluids.denguePlasmaRate5ml} ml / hr
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Start here if HCT rises and warning signs present.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-xs font-semibold text-rose-900">7 ml / kg / hr (Rapid Leakage)</span>
              <div className="text-2xl font-bold font-mono text-rose-900 tabular-nums mt-1">
                {fluids.denguePlasmaRate7ml} ml / hr
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Give for 1-2 hours only, then step down.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 space-y-1">
            <strong className="text-slate-900">Dengue Fluid Rules:</strong>
            <p>1. Target urine output is ≥ 1.0 ml/kg/hour.</p>
            <p>2. Gradually reduce fluid rate every 2–4 hours (e.g. 7 → 5 → 3 → 2 ml/kg/hr) as hematocrit stabilizes.</p>
            <p>3. Total fluid quota for 48 hours = Maintenance + 5% Deficit. Avoid fluid overload in recovery phase.</p>
          </div>
        </div>
      )}

      {/* Scenario 5: Blood & Component Transfusion */}
      {fluidScenario === 'blood' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-6">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
                  <HeartPulse className="w-5 h-5" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Pediatric Blood & Component Transfusion Calculator
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Clinical calculations for patient weight <strong className="font-mono tabular-nums text-slate-800">{patient.weightKg} kg</strong> (BPA & WHO transfusion protocols).
              </p>
            </div>
            <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-3 py-1 rounded-md border border-rose-200">
              BPA & WHO Pediatric Hematology
            </span>
          </div>

          {/* Blood Product Sub-Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setBloodProduct('prbc')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                bloodProduct === 'prbc'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-rose-900 hover:bg-slate-200/60'
              }`}
            >
              PRBC (প্যাকড রেড সেল)
            </button>
            <button
              onClick={() => setBloodProduct('whole_blood')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                bloodProduct === 'whole_blood'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-rose-900 hover:bg-slate-200/60'
              }`}
            >
              Whole Blood (হোল ব্লাড)
            </button>
            <button
              onClick={() => setBloodProduct('platelet')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                bloodProduct === 'platelet'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-rose-900 hover:bg-slate-200/60'
              }`}
            >
              Platelets (প্লেটলেট)
            </button>
            <button
              onClick={() => setBloodProduct('ffp')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                bloodProduct === 'ffp'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-rose-900 hover:bg-slate-200/60'
              }`}
            >
              FFP (প্লাজমা)
            </button>
            <button
              onClick={() => setBloodProduct('cryo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                bloodProduct === 'cryo'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-700 hover:text-rose-900 hover:bg-slate-200/60'
              }`}
            >
              Cryoprecipitate
            </button>
            <button
              onClick={() => setBloodProduct('exchange')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                bloodProduct === 'exchange'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-purple-700 hover:bg-purple-50'
              }`}
            >
              Exchange Transfusion (নবজাতক)
            </button>
          </div>

          {/* Configuration Grid */}
          {(bloodProduct === 'prbc' || bloodProduct === 'whole_blood') && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-rose-50/50 rounded-xl border border-rose-100">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Current Hemoglobin (বর্তমান Hb):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="18"
                    value={currentHb}
                    onChange={(e) => setCurrentHb(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                  />
                  <span className="text-xs font-medium text-slate-600">g/dL</span>
                </div>
                {isSevereAnemia && (
                  <span className="inline-block mt-1 text-[11px] font-semibold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
                    ⚠️ Severe Anemia (Hb &lt; 5 g/dL)
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Target Hemoglobin (কাঙ্ক্ষিত Hb):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="5"
                    max="18"
                    value={targetHb}
                    onChange={(e) => setTargetHb(parseFloat(e.target.value) || 10)}
                    className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                  />
                  <span className="text-xs font-medium text-slate-600">g/dL</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Required Rise: <strong>+{(Math.max(0, targetHb - currentHb)).toFixed(1)} g/dL</strong>
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Calculation Method:
                </label>
                <select
                  value={prbcCalculationMode}
                  onChange={(e) => setPrbcCalculationMode(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                >
                  <option value="target">Target Hb Formula (Weight × ΔHb × {bloodProduct === 'prbc' ? '4' : '6'})</option>
                  <option value="rule10">Standard 10 ml / kg (Ward Rule)</option>
                  <option value="rule15">Standard 15 ml / kg (Moderate Anemia)</option>
                </select>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {bloodProduct === 'prbc' ? 'PRBC raises Hb by ~1 g/dL per 4 ml/kg' : 'Whole Blood raises Hb by ~1 g/dL per 6 ml/kg'}
                </span>
              </div>
            </div>
          )}

          {/* Transfusion Duration & Drop Rate Set */}
          {(bloodProduct === 'prbc' || bloodProduct === 'whole_blood') && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-slate-700">Infusion Duration:</span>
                <div className="flex items-center gap-1">
                  {[2, 3, 4].map((hrs) => (
                    <button
                      key={hrs}
                      onClick={() => setTransfusionHours(hrs)}
                      className={`px-2.5 py-1 rounded font-medium transition-colors ${
                        transfusionHours === hrs
                          ? 'bg-rose-700 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {hrs} Hours
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 ml-1">(Max 4 hrs to prevent bacterial sepsis)</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Set Factor:</span>
                <button
                  onClick={() => setDropsPerMl(15)}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    dropsPerMl === 15 ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  Standard Blood Set (15 drops/ml)
                </button>
                <button
                  onClick={() => setDropsPerMl(60)}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    dropsPerMl === 60 ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  Microdrip / Syringe Pump
                </button>
              </div>
            </div>
          )}

          {/* Exchange Transfusion Controls */}
          {bloodProduct === 'exchange' && (
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-purple-950">
                    Double Volume Exchange Transfusion (DVET)
                  </h4>
                  <p className="text-xs text-purple-700">
                    Indicated for severe neonatal hyperbilirubinemia, hemolytic disease of the newborn (Rh/ABO).
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setExchangeType('term')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      exchangeType === 'term' ? 'bg-purple-700 text-white' : 'bg-white text-purple-900 border border-purple-200'
                    }`}
                  >
                    Full Term (160 ml/kg)
                  </button>
                  <button
                    onClick={() => setExchangeType('preterm')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      exchangeType === 'preterm' ? 'bg-purple-700 text-white' : 'bg-white text-purple-900 border border-purple-200'
                    }`}
                  >
                    Preterm (180 ml/kg)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Transfusion Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Total Volume */}
            <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-200 text-center">
              <span className="text-xs font-semibold text-rose-900 uppercase tracking-wider block">
                Total Volume Required
              </span>
              <div className="text-3xl font-extrabold text-rose-950 font-mono tabular-nums mt-1">
                {activeVolume} <span className="text-sm font-sans font-medium text-rose-800">ml</span>
              </div>
              <p className="text-[11px] text-rose-700 mt-1">
                {(activeVolume / patient.weightKg).toFixed(1)} ml / kg body weight
              </p>
            </div>

            {/* Card 2: Hourly Rate */}
            <div className="p-4 bg-sky-50/70 rounded-xl border border-sky-200 text-center">
              <span className="text-xs font-semibold text-sky-900 uppercase tracking-wider block">
                Infusion Rate
              </span>
              <div className="text-3xl font-extrabold text-sky-950 font-mono tabular-nums mt-1">
                {hourlyRate} <span className="text-sm font-sans font-medium text-sky-800">ml / hr</span>
              </div>
              <p className="text-[11px] text-sky-700 mt-1">
                Duration: {activeInfusionHours} hour{activeInfusionHours !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Card 3: Drop Rate */}
            <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-200 text-center">
              <span className="text-xs font-semibold text-teal-900 uppercase tracking-wider block">
                Chamber Drip Rate
              </span>
              <div className="text-3xl font-extrabold text-teal-950 font-mono tabular-nums mt-1">
                {dropRate} <span className="text-sm font-sans font-medium text-teal-800">drops / min</span>
              </div>
              <p className="text-[11px] text-teal-700 mt-1">
                Using {dropsPerMl} drops/ml set factor
              </p>
            </div>

            {/* Card 4: Furosemide / Adjunct Dose */}
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-center">
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block">
                Furosemide (Lasix) IV
              </span>
              <div className="text-2xl font-extrabold text-amber-950 font-mono tabular-nums mt-1">
                {furosemideMg} <span className="text-sm font-sans font-medium text-amber-800">mg</span>
              </div>
              <p className="text-[11px] text-amber-800 mt-1">
                (1 mg/kg IV = {(furosemideMg / 10).toFixed(1)} ml ampoule)
              </p>
            </div>

          </div>

          {/* Product Specific Clinical Protocols */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs text-slate-700">
            <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-200 pb-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Clinical Transfusion Pearls & Bangladesh Pediatric Protocols:</span>
            </div>

            {bloodProduct === 'prbc' && (
              <div className="space-y-1.5 leading-relaxed">
                <p>
                  • <strong>Transfusion Threshold:</strong> As per BPA guidelines, PRBC transfusion is indicated if <strong>Hb &lt; 7.0 g/dL</strong> in stable children, or <strong>Hb &lt; 8.0–10.0 g/dL</strong> in severe septic shock, uncorrected cyanotic heart disease, or ongoing active bleeding.
                </p>
                <p>
                  • <strong>Maximum Single Transfusion:</strong> Do NOT exceed <strong>15–20 ml/kg</strong> in a single transfusion session to prevent Transfusion-Associated Circulatory Overload (TACO). If a larger deficit exists, divide into two sessions separated by 12–24 hours.
                </p>
                <p>
                  • <strong>Severe Anemia Alert (Hb &lt; 5 g/dL):</strong> The myocardium is in hyperdynamic failure. Infuse slowly at <strong>2 to 3 ml/kg/hr</strong> over 4 full hours, and give <strong>Furosemide {furosemideMg} mg IV</strong> at the beginning or midpoint of transfusion.
                </p>
              </div>
            )}

            {bloodProduct === 'whole_blood' && (
              <div className="space-y-1.5 leading-relaxed">
                <p>
                  • <strong>Dose Guide:</strong> <strong>20 ml/kg</strong> (or Weight × Target Hb rise × 6).
                </p>
                <p>
                  • <strong>Indication:</strong> Acute massive exsanguinating hemorrhage / hypovolemic shock where PRBC and plasma components are not separately available.
                </p>
                <p>
                  • <strong>Precaution:</strong> Whole blood contains plasma volume that poses a higher risk of circulatory overload in normovolemic children. PRBC is always preferred when available.
                </p>
              </div>
            )}

            {bloodProduct === 'platelet' && (
              <div className="space-y-1.5 leading-relaxed">
                <p>
                  • <strong>Dose:</strong> <strong>10 ml/kg</strong> of Random Donor Platelets (RDP) or <strong>1 unit per 10 kg body weight</strong>.
                </p>
                <p>
                  • <strong>Infusion Speed:</strong> Rapidly over <strong>20 to 30 minutes</strong> through a platelet transfusion set (do not use PRBC filters that trap platelets).
                </p>
                <p>
                  • <strong>Expected Increment:</strong> Platelet count should increase by <strong>30,000 to 50,000 /μL</strong>.
                </p>
                <p>
                  • <strong>Clinical Triggers:</strong> In Dengue / sepsis: Prophylactic transfusion is NOT recommended unless platelet &lt; 10,000/μL without bleeding, or &lt; 50,000/μL with significant mucosal/GI bleeding or before invasive procedures.
                </p>
              </div>
            )}

            {bloodProduct === 'ffp' && (
              <div className="space-y-1.5 leading-relaxed">
                <p>
                  • <strong>Dose:</strong> <strong>10 to 15 ml/kg</strong> (Total volume for this child: <strong>{Math.round(patient.weightKg * 10)} – {Math.round(patient.weightKg * 15)} ml</strong>).
                </p>
                <p>
                  • <strong>Infusion Speed:</strong> Over <strong>1 to 2 hours</strong>.
                </p>
                <p>
                  • <strong>Indications:</strong> Coagulopathy with active bleeding (INR &gt; 1.5, prolonged PT/APTT), liver failure, Disseminated Intravascular Coagulation (DIC), or massive transfusion protocol.
                </p>
              </div>
            )}

            {bloodProduct === 'cryo' && (
              <div className="space-y-1.5 leading-relaxed">
                <p>
                  • <strong>Dose:</strong> <strong>5 to 10 ml/kg</strong> or <strong>1 unit per 5–10 kg body weight</strong> (Total volume: <strong>{Math.round(patient.weightKg * 5)} – {Math.round(patient.weightKg * 10)} ml</strong>).
                </p>
                <p>
                  • <strong>Infusion Speed:</strong> Over <strong>15 to 30 minutes</strong>.
                </p>
                <p>
                  • <strong>Indication:</strong> Hypofibrinogenemia (Fibrinogen &lt; 100 mg/dL), DIC with severe bleeding, Hemophilia A or von Willebrand disease when specific factor concentrates are unavailable.
                </p>
              </div>
            )}

            {bloodProduct === 'exchange' && (
              <div className="space-y-1.5 leading-relaxed">
                <p>
                  • <strong>Total Volume:</strong> <strong>{exchangeType === 'term' ? '160 ml/kg (Full term)' : '180 ml/kg (Preterm)'}</strong> = <strong>{activeVolume} ml</strong>.
                </p>
                <p>
                  • <strong>Aliquot Size:</strong> Push-pull cycle of <strong>{Math.min(20, Math.max(5, Math.round(patient.weightKg * 5)))} ml</strong> per cycle over 1.5 to 2 hours total.
                </p>
                <p>
                  • <strong>Calcium Antidote:</strong> Give <strong>1 ml of 10% Calcium Gluconate</strong> (diluted with equal volume sterile water) IV slow push after every <strong>100 ml</strong> of blood exchanged, with heart rate monitoring (prevents citrate-induced hypocalcemia and cardiac arrest).
                </p>
              </div>
            )}

            {/* Acute Transfusion Reaction Protocol */}
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-950 mt-2 space-y-1">
              <strong className="text-rose-900 block font-bold">
                🚨 Acute Transfusion Reaction Emergency Protocol (তাৎক্ষণিক করণীয়):
              </strong>
              <p>1. <strong>STOP transfusion immediately</strong> if fever &gt; 1°C, rigors, rash, urticaria, wheezing, hypotension, or dark urine occur.</p>
              <p>2. Disconnect the blood set, keep the IV line open with fresh Normal Saline.</p>
              <p>3. Check Airway, Breathing, Pulse, and Blood Pressure.</p>
              <p>4. Give <strong>Hydrocortisone ({Math.min(200, Math.round(patient.weightKg * 4))} mg IV)</strong> and <strong>Chlorpheniramine (0.1 mg/kg)</strong>. If anaphylaxis / bronchospasm: <strong>Adrenaline 1:1,000 IM ({Math.min(0.5, Math.round(patient.weightKg * 0.01 * 100) / 100)} ml)</strong>.</p>
              <p>5. Return remaining blood unit and give fresh blood/urine samples to blood bank for repeat cross-match and Coombs test.</p>
            </div>

          </div>

        </div>
      )}

      {/* Scenario 6: Electrolyte Disturbances & Emergency Fluid Correction */}
      {fluidScenario === 'electrolytes' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-6">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
                  <Activity className="w-5 h-5" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Pediatric Electrolyte Disturbances & Emergency Fluid Correction
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Precision clinical formulas and safety constraints for weight <strong className="font-mono tabular-nums text-slate-800">{patient.weightKg} kg</strong>.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              PALS & Pediatric Nephrology Standard
            </span>
          </div>

          {/* Electrolyte Sub-Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setElectrolyteMode('hyponatremia')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                electrolyteMode === 'hyponatremia'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-amber-900 hover:bg-slate-200/60'
              }`}
            >
              Hyponatremia (সোডিয়াম ঘাটতি)
            </button>
            <button
              onClick={() => setElectrolyteMode('hypernatremia')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                electrolyteMode === 'hypernatremia'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-amber-900 hover:bg-slate-200/60'
              }`}
            >
              Hypernatremia (হাইপারন্যাট্রিমিয়া)
            </button>
            <button
              onClick={() => setElectrolyteMode('hyperkalemia')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                electrolyteMode === 'hyperkalemia'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-rose-800 hover:bg-rose-50'
              }`}
            >
              Hyperkalemia (হাইপারক্যালিমিয়া)
            </button>
            <button
              onClick={() => setElectrolyteMode('hypokalemia')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                electrolyteMode === 'hypokalemia'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-amber-900 hover:bg-slate-200/60'
              }`}
            >
              Hypokalemia (হাইপোক্যালিমিয়া)
            </button>
            <button
              onClick={() => setElectrolyteMode('bicarbonate')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                electrolyteMode === 'bicarbonate'
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'text-indigo-800 hover:bg-indigo-50'
              }`}
            >
              Sodium Bicarbonate (অ্যাসিডোসিস)
            </button>
          </div>

          {/* 1. HYPONATREMIA */}
          {electrolyteMode === 'hyponatremia' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Current Serum Na⁺ (বর্তমান সোডিয়াম):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="90"
                      max="140"
                      value={serumNa}
                      onChange={(e) => setSerumNa(parseFloat(e.target.value) || 120)}
                      className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                    <span className="text-xs font-medium text-slate-600">mEq/L</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Target Serum Na⁺ (কাঙ্ক্ষিত সোডিয়াম):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="120"
                      max="145"
                      value={targetNa}
                      onChange={(e) => setTargetNa(parseFloat(e.target.value) || 125)}
                      className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                    <span className="text-xs font-medium text-slate-600">mEq/L</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Deficit: <strong>{Math.max(0, targetNa - serumNa)} mEq/L</strong> (Target max rise: 10–12 mEq/L/24hr)
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Clinical Symptoms Status:
                  </label>
                  <button
                    onClick={() => setIsSymptomaticSeizures(!isSymptomaticSeizures)}
                    className={`w-full px-3 py-1.5 text-xs font-bold rounded-lg border text-left flex items-center justify-between ${
                      isSymptomaticSeizures
                        ? 'bg-rose-100 text-rose-900 border-rose-300'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    <span>{isSymptomaticSeizures ? '🚨 Seizures / Coma (তীব্র খিঁচুনি)' : 'Asymptomatic / Mild'}</span>
                    <span className="text-[11px] underline">Toggle</span>
                  </button>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {isSymptomaticSeizures ? 'Requires 3% Hypertonic Saline bolus' : 'Requires slow deficit correction'}
                  </span>
                </div>
              </div>

              {/* Hyponatremia Calculations */}
              {(() => {
                const deltaNa = Math.max(0, targetNa - serumNa);
                const naDeficitMeq = Math.round(0.6 * patient.weightKg * deltaNa * 10) / 10;
                const hypertonicBolusMl = Math.round(patient.weightKg * 3); // 3 ml/kg
                const totalHypertonicMl = Math.round((naDeficitMeq / 0.513) * 10) / 10; // 3% NaCl has 0.513 mEq/ml
                const totalNsMl = Math.round((naDeficitMeq / 0.154) * 10) / 10; // 0.9% NS has 0.154 mEq/ml

                return (
                  <div className="space-y-4">
                    {isSymptomaticSeizures && (
                      <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-rose-950 font-bold text-sm">
                          <Flame className="w-4 h-4 text-rose-600" />
                          <span>EMERGENCY SEIZURE ARREST: 3% Hypertonic Saline (3% NaCl) Stat Bolus</span>
                        </div>
                        <div className="flex flex-wrap items-baseline gap-3">
                          <div className="text-3xl font-extrabold text-rose-900 font-mono tabular-nums">
                            {hypertonicBolusMl} <span className="text-sm font-sans font-medium text-rose-700">ml IV</span>
                          </div>
                          <span className="text-xs text-rose-800 font-medium">
                            (3.0 ml/kg of 3% NaCl infused slowly over 10 to 20 minutes)
                          </span>
                        </div>
                        <p className="text-xs text-rose-800 leading-relaxed">
                          • <strong>Clinical Effect:</strong> 3 ml/kg of 3% NaCl raises serum sodium by <strong>~2.5 to 3.0 mEq/L</strong>, which rapidly reduces cerebral edema and stops life-threatening seizures.
                        </p>
                        <p className="text-xs text-rose-800 leading-relaxed">
                          • If active seizures continue, repeat a second bolus of <strong>{hypertonicBolusMl} ml (3 ml/kg)</strong> over 20 minutes. Stop immediately once seizures cease.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-center">
                        <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block">
                          Total Sodium Deficit
                        </span>
                        <div className="text-2xl font-extrabold text-amber-950 font-mono tabular-nums mt-1">
                          {naDeficitMeq} <span className="text-sm font-sans font-medium text-amber-800">mEq</span>
                        </div>
                        <p className="text-[11px] text-amber-700 mt-1">
                          Formula: 0.6 × {patient.weightKg} kg × {deltaNa} mEq/L
                        </p>
                      </div>

                      <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-center">
                        <span className="text-xs font-semibold text-sky-900 uppercase tracking-wider block">
                          Equivalent 3% NaCl Volume
                        </span>
                        <div className="text-2xl font-extrabold text-sky-950 font-mono tabular-nums mt-1">
                          {totalHypertonicMl} <span className="text-sm font-sans font-medium text-sky-800">ml</span>
                        </div>
                        <p className="text-[11px] text-sky-700 mt-1">
                          (3% NaCl = 0.513 mEq/ml)
                        </p>
                      </div>

                      <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200 text-center">
                        <span className="text-xs font-semibold text-teal-900 uppercase tracking-wider block">
                          Equivalent 0.9% NS Volume
                        </span>
                        <div className="text-2xl font-extrabold text-teal-950 font-mono tabular-nums mt-1">
                          {totalNsMl} <span className="text-sm font-sans font-medium text-teal-800">ml</span>
                        </div>
                        <p className="text-[11px] text-teal-700 mt-1">
                          (0.9% Normal Saline = 0.154 mEq/ml)
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-100/70 border border-amber-300 rounded-xl text-xs text-amber-950 space-y-1.5">
                      <strong className="block font-bold text-amber-950">
                        ⚠️ CRITICAL MAXIMUM CORRECTION RATE LIMIT (সতর্কবার্তা):
                      </strong>
                      <p>
                        • <strong>Do NOT exceed 10 to 12 mEq/L rise in 24 hours</strong> (and &lt; 18 mEq/L in 48 hours). Hourly rise should not exceed <strong>0.5 mEq/L/hour</strong>.
                      </p>
                      <p>
                        • <strong>Danger of Rapid Correction:</strong> Overly rapid correction dehydrates brain cells and causes fatal or irreversible <strong>Osmotic Demyelination Syndrome (Central Pontine Myelinolysis)</strong> with spastic quadriparesis, pseudobulbar palsy, and locked-in syndrome.
                      </p>
                      <p>
                        • Recheck serum electrolytes every 2 to 4 hours during active correction.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 2. HYPERNATREMIA */}
          {electrolyteMode === 'hypernatremia' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Current Serum Na⁺ (বর্তমান সোডিয়াম):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="145"
                      max="190"
                      value={hyperNa}
                      onChange={(e) => setHyperNa(parseFloat(e.target.value) || 155)}
                      className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                    <span className="text-xs font-medium text-slate-600">mEq/L</span>
                  </div>
                  <span className="text-[11px] text-rose-700 font-semibold mt-1 block">
                    {hyperNa >= 160 ? 'Severe Hypernatremic Dehydration' : 'Moderate Hypernatremia'}
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Target Serum Na⁺ (কাঙ্ক্ষিত সোডিয়াম):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="135"
                      max="150"
                      value={targetHyperNa}
                      onChange={(e) => setTargetHyperNa(parseFloat(e.target.value) || 145)}
                      className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                    <span className="text-xs font-medium text-slate-600">mEq/L</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Safe correction period: <strong>48 to 72 hours</strong>
                  </span>
                </div>
              </div>

              {(() => {
                const fraction = Math.max(0, (hyperNa / 140) - 1);
                const freeWaterDeficitL = Math.round(0.6 * patient.weightKg * fraction * 100) / 100;
                const freeWaterDeficitMl = Math.round(freeWaterDeficitL * 1000);
                const maxDropPerDay = 10; // 10-12 mEq/day
                const safeHours = Math.max(48, Math.round(((hyperNa - targetHyperNa) / 0.5)));

                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-center">
                        <span className="text-xs font-semibold text-sky-900 uppercase tracking-wider block">
                          Free Water Deficit
                        </span>
                        <div className="text-2xl font-extrabold text-sky-950 font-mono tabular-nums mt-1">
                          {freeWaterDeficitMl} <span className="text-sm font-sans font-medium text-sky-800">ml</span>
                        </div>
                        <p className="text-[11px] text-sky-700 mt-1">
                          ({freeWaterDeficitL} Liters pure water deficit)
                        </p>
                      </div>

                      <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-center">
                        <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block">
                          Correction Timeframe
                        </span>
                        <div className="text-2xl font-extrabold text-amber-950 font-mono tabular-nums mt-1">
                          48 – 72 <span className="text-sm font-sans font-medium text-amber-800">Hours</span>
                        </div>
                        <p className="text-[11px] text-amber-700 mt-1">
                          Rate: ≤ 0.5 mEq/L / hour
                        </p>
                      </div>

                      <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200 text-center">
                        <span className="text-xs font-semibold text-teal-900 uppercase tracking-wider block">
                          Hourly Fluid Allocation
                        </span>
                        <div className="text-2xl font-extrabold text-teal-950 font-mono tabular-nums mt-1">
                          {Math.round((freeWaterDeficitMl / 48) + fluids.maintenanceMlPerHour)} <span className="text-sm font-sans font-medium text-teal-800">ml / hr</span>
                        </div>
                        <p className="text-[11px] text-teal-700 mt-1">
                          (Deficit / 48h + Maintenance)
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-950 space-y-1.5">
                      <strong className="block font-bold text-rose-950">
                        🚨 LETHAL RISK: CEREBRAL EDEMA & CONVULSIONS (মস্তিষ্কে পানি জমা):
                      </strong>
                      <p>
                        • <strong>Do NOT lower serum sodium faster than 0.5 mEq/L per hour (maximum 10–12 mEq/L per 24 hours).</strong>
                      </p>
                      <p>
                        • In hypernatremia, brain cells produce idiogenic osmoles to protect their volume. If serum sodium drops too fast, free water rushes into the brain cells causing <strong>massive cerebral edema, seizures, brain herniation, and death</strong>.
                      </p>
                      <p>
                        • <strong>Preferred Fluid:</strong> 0.45% Saline (Half Normal Saline) in 5% Dextrose, or 0.2% Saline in 5% Dextrose. NEVER infuse sterile water or plain D5W rapidly!
                      </p>
                      <p>
                        • If child develops seizures during hypernatremia rehydration: Give <strong>3% NaCl 3 ml/kg IV bolus</strong> immediately to raise serum sodium and shrink the swollen brain cells.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 3. HYPERKALEMIA */}
          {electrolyteMode === 'hyperkalemia' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-rose-950 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-600" />
                      <span>Life-Threatening Hyperkalemia Protocol (সিরাম K⁺ &gt; 6.0 mEq/L)</span>
                    </h4>
                    <p className="text-xs text-rose-800">
                      3-Step Emergency Resuscitation for patient weight <strong className="font-mono">{patient.weightKg} kg</strong>.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-rose-900">Current K⁺:</span>
                    <input
                      type="number"
                      step="0.1"
                      min="5"
                      max="10"
                      value={serumK}
                      onChange={(e) => setSerumK(parseFloat(e.target.value) || 6.5)}
                      className="w-20 px-2 py-1 text-sm font-bold font-mono bg-white border border-rose-300 rounded-lg text-center"
                    />
                    <span className="text-xs text-rose-800">mEq/L</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/80 rounded-lg border border-rose-200 text-xs text-rose-900">
                  <strong>ECG Warning Signs of Lethal Arrhythmia:</strong> Tall peaked T-waves → PR prolongation & flattened P-waves → QRS widening → Sine wave pattern → Ventricular Fibrillation / Asystole.
                </div>
              </div>

              {/* 3 Steps */}
              <div className="space-y-3">
                
                {/* STEP 1 */}
                <div className="p-4 bg-white rounded-xl border-2 border-rose-300 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-rose-600 text-white uppercase">
                      Step 1: Cardiac Membrane Stabilization (Stat)
                    </span>
                    <span className="text-[11px] font-bold text-rose-800">Onset: 1–3 min (Duration: 30–60 min)</span>
                  </div>
                  <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-200">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-rose-950">10% Calcium Gluconate IV:</span>
                      <span className="text-xl font-extrabold font-mono text-rose-900 tabular-nums">
                        {Math.round(patient.weightKg * 1.0 * 10) / 10} ml IV
                      </span>
                    </div>
                    <p className="text-xs text-rose-800 mt-1">
                      Dose: <strong>1.0 ml/kg of 10% solution (100 mg/kg)</strong>. Dilute 1:1 with Normal Saline or 5% Dextrose. Infuse slowly IV over <strong>5 to 10 minutes</strong> with continuous ECG/pulse monitoring.
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      *Note: Calcium stabilizes the resting membrane potential against arrhythmias; it does NOT lower serum K+. Repeat once in 5-10 min if ECG changes persist.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="p-4 bg-white rounded-xl border border-amber-300 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-amber-600 text-white uppercase">
                      Step 2: Shift K⁺ Into Cells (Temporary Redistribution)
                    </span>
                    <span className="text-[11px] font-bold text-amber-800">Onset: 15–30 min (Duration: 2–4 hr)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <span className="font-bold text-amber-950 block">A. Insulin + Dextrose Infusion:</span>
                      <div className="mt-1 text-sm font-mono font-bold text-amber-900">
                        Regular Insulin: {(patient.weightKg * 0.1).toFixed(1)} Units
                      </div>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Mix with <strong>{patient.weightKg * 2} ml of 25% Dextrose</strong> (or <strong>{patient.weightKg * 5} ml of 10% Dextrose</strong>). Infuse IV over 30 minutes. Check bedside blood glucose every 30 min.
                      </p>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <span className="font-bold text-amber-950 block">B. Salbutamol Nebulization:</span>
                      <div className="mt-1 text-sm font-mono font-bold text-amber-900">
                        {patient.ageYears < 5 ? '2.5 mg (0.5 ml)' : '5.0 mg (1.0 ml)'}
                      </div>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Nebulize in 2.5 ml Normal Saline with 100% Oxygen. Beta-2 agonist stimulates Na+/K+ ATPase to pump potassium intracellularly.
                      </p>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <span className="font-bold text-amber-950 block">C. Sodium Bicarbonate 8.4%:</span>
                      <div className="mt-1 text-sm font-mono font-bold text-amber-900">
                        {Math.round(patient.weightKg * 1.0)} – {Math.round(patient.weightKg * 2.0)} ml IV
                      </div>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        1 to 2 mEq/kg (1-2 ml/kg) diluted 1:1 with sterile water over 10 min (especially if metabolic acidosis present).
                      </p>
                    </div>

                  </div>
                </div>

                {/* STEP 3 */}
                <div className="p-4 bg-white rounded-xl border border-teal-300 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-teal-700 text-white uppercase">
                      Step 3: Eliminate Potassium from Body
                    </span>
                    <span className="text-[11px] font-bold text-teal-800">Definitive Excretion</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    
                    <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                      <span className="font-bold text-teal-950 block">A. Furosemide (Lasix) IV:</span>
                      <div className="mt-1 text-sm font-mono font-bold text-teal-900">
                        {Math.round(patient.weightKg * 1.0)} mg IV ({Math.round(patient.weightKg * 0.1 * 10) / 10} ml)
                      </div>
                      <p className="text-[11px] text-teal-800 mt-0.5">
                        1 mg/kg IV slow push. Promotes kaliuresis in patients with functioning renal output.
                      </p>
                    </div>

                    <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                      <span className="font-bold text-teal-950 block">B. Potassium Binder (Kalimate / K-bind):</span>
                      <div className="mt-1 text-sm font-mono font-bold text-teal-900">
                        {Math.round(patient.weightKg * 1.0)} g PO / Rectal
                      </div>
                      <p className="text-[11px] text-teal-800 mt-0.5">
                        Calcium / Sodium Polystyrene Sulfonate 1 g/kg suspended in 20% sorbitol or water orally or retention enema.
                      </p>
                    </div>

                    <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                      <span className="font-bold text-teal-950 block">C. Hemodialysis / Peritoneal Dialysis:</span>
                      <div className="mt-1 text-sm font-bold text-teal-900">
                        Emergent Renal Consultation
                      </div>
                      <p className="text-[11px] text-teal-800 mt-0.5">
                        Indications: Anuric Acute Kidney Injury (AKI), refractory hyperkalemia failing medical therapy.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 4. HYPOKALEMIA */}
          {electrolyteMode === 'hypokalemia' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Current Serum K⁺ (বর্তমান পটাশিয়াম):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="3.5"
                      value={hypoK}
                      onChange={(e) => setHypoK(parseFloat(e.target.value) || 2.5)}
                      className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                    <span className="text-xs font-medium text-slate-600">mEq/L</span>
                  </div>
                  <span className="text-[11px] font-semibold text-rose-700 mt-1 block">
                    {hypoK < 2.5 ? 'Severe Hypokalemia (Arrhythmia / Ileus / Paralysis Risk)' : 'Moderate Hypokalemia'}
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Target Serum K⁺ (কাঙ্ক্ষিত পটাশিয়াম):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="3.5"
                      max="4.5"
                      value={targetHypoK}
                      onChange={(e) => setTargetHypoK(parseFloat(e.target.value) || 4.0)}
                      className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                    <span className="text-xs font-medium text-slate-600">mEq/L</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Deficit: <strong>{(Math.max(0, targetHypoK - hypoK)).toFixed(1)} mEq/L</strong>
                  </span>
                </div>
              </div>

              {(() => {
                const kDeficitMeq = Math.round((targetHypoK - hypoK) * patient.weightKg * 0.4 * 10) / 10;
                const maxIvRatePerHourMeq = Math.round(patient.weightKg * 0.5 * 10) / 10;
                const oralSyrupDailyMl = Math.round(((patient.weightKg * 2.0) / 1.33) * 10) / 10; // 2 mEq/kg/day, 20mEq/15ml = 1.33 mEq/ml

                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-center">
                        <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block">
                          Estimated K⁺ Deficit
                        </span>
                        <div className="text-2xl font-extrabold text-amber-950 font-mono tabular-nums mt-1">
                          {kDeficitMeq} <span className="text-sm font-sans font-medium text-amber-800">mEq</span>
                        </div>
                        <p className="text-[11px] text-amber-700 mt-1">
                          Formula: (Target K - Current K) × Wt × 0.4
                        </p>
                      </div>

                      <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 text-center">
                        <span className="text-xs font-semibold text-rose-900 uppercase tracking-wider block">
                          Max Safe IV Infusion Rate
                        </span>
                        <div className="text-2xl font-extrabold text-rose-950 font-mono tabular-nums mt-1">
                          {maxIvRatePerHourMeq} <span className="text-sm font-sans font-medium text-rose-800">mEq / hr</span>
                        </div>
                        <p className="text-[11px] text-rose-700 mt-1">
                          (Max limit: 0.3 to 0.5 mEq/kg/hr)
                        </p>
                      </div>

                      <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200 text-center">
                        <span className="text-xs font-semibold text-teal-900 uppercase tracking-wider block">
                          Oral Syrup K-Sol / Potk
                        </span>
                        <div className="text-2xl font-extrabold text-teal-950 font-mono tabular-nums mt-1">
                          {oralSyrupDailyMl} <span className="text-sm font-sans font-medium text-teal-800">ml / day</span>
                        </div>
                        <p className="text-[11px] text-teal-700 mt-1">
                          Divide BID/TID with meals & water
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-rose-100 border border-rose-300 rounded-xl text-xs text-rose-950 space-y-1.5">
                      <strong className="block font-bold text-rose-950">
                        ☠️ DEADLY WARNING: NEVER GIVE DIRECT UNDILUTED IV BOLUS OF KCl:
                      </strong>
                      <p>
                        • Direct IV push of Potassium Chloride triggers instant cardiac standstill and ventricular fibrillation.
                      </p>
                      <p>
                        • <strong>Peripheral Line Concentration Limit:</strong> Maximum <strong>40 mEq/L</strong> (no more than 20 mEq in a 500 ml fluid bottle). Higher concentrations cause severe chemical phlebitis and pain.
                      </p>
                      <p>
                        • <strong>Central Line Concentration Limit:</strong> Maximum <strong>60 to 80 mEq/L</strong> with cardiac monitoring.
                      </p>
                      <p>
                        • <strong>Prerequisite:</strong> Never administer IV potassium until adequate urine output (&gt; 1 ml/kg/hr) is established to avoid converting hypokalemia into fatal hyperkalemia.
                      </p>
                      <p>
                        • Check serum Magnesium (hypomagnesemia causes refractory hypokalemia unresponsive to potassium alone).
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 5. METABOLIC ACIDOSIS & SODIUM BICARBONATE */}
          {electrolyteMode === 'bicarbonate' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-indigo-50/50 rounded-xl border border-indigo-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Base Deficit (or Base Excess in minus):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="2"
                      max="30"
                      value={baseDeficit}
                      onChange={(e) => setBaseDeficit(parseFloat(e.target.value) || 10)}
                      className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                    <span className="text-xs font-medium text-slate-600">mEq/L</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    From arterial or venous blood gas (ABG/VBG)
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Or Current Serum HCO3⁻:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="2"
                      max="20"
                      value={currentHco3}
                      onChange={(e) => setCurrentHco3(parseFloat(e.target.value) || 8)}
                      className="w-full px-3 py-1.5 text-sm font-bold font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                    <span className="text-xs font-medium text-slate-600">mEq/L</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Severe if pH &lt; 7.1 and HCO3⁻ &lt; 10 mEq/L
                  </span>
                </div>
              </div>

              {(() => {
                const bicarbDeficitMeq = Math.round(0.3 * patient.weightKg * baseDeficit * 10) / 10;
                const halfDoseMeq = Math.round((bicarbDeficitMeq / 2) * 10) / 10;
                const bicarb84Ml = bicarbDeficitMeq; // 1 mEq/ml
                const halfDose84Ml = halfDoseMeq;
                const bicarb75Ml = Math.round((bicarbDeficitMeq / 0.89) * 10) / 10;

                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
                        <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wider block">
                          Total Bicarbonate Deficit
                        </span>
                        <div className="text-2xl font-extrabold text-indigo-950 font-mono tabular-nums mt-1">
                          {bicarbDeficitMeq} <span className="text-sm font-sans font-medium text-indigo-800">mEq</span>
                        </div>
                        <p className="text-[11px] text-indigo-700 mt-1">
                          Formula: 0.3 × {patient.weightKg} kg × {baseDeficit} BD
                        </p>
                      </div>

                      <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                        <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wider block">
                          First Phase Dose (Half Deficit)
                        </span>
                        <div className="text-2xl font-extrabold text-emerald-950 font-mono tabular-nums mt-1">
                          {halfDose84Ml} <span className="text-sm font-sans font-medium text-emerald-800">ml (8.4%)</span>
                        </div>
                        <p className="text-[11px] text-emerald-700 mt-1">
                          Give over 2 to 4 hours, then recheck ABG
                        </p>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                          Total 7.5% Solution Volume
                        </span>
                        <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                          {bicarb75Ml} <span className="text-sm font-sans font-medium text-slate-600">ml</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          (7.5% solution = 0.89 mEq/ml)
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 space-y-1.5">
                      <strong className="block font-bold text-indigo-900">
                        Clinical Administration Protocol (সোডিয়াম বাইকার্বোনেট নিয়মাবলী):
                      </strong>
                      <p>
                        • <strong>Emergency Stat Dose (Cardiac Arrest / Extreme Acidosis):</strong> 1.0 mEq/kg = <strong>{Math.round(patient.weightKg * 1.0)} ml of 8.4% solution</strong> diluted 1:1 with sterile water slow IV push over 5-10 minutes.
                      </p>
                      <p>
                        • <strong>Infants &amp; Neonates:</strong> Always dilute 1:1 with Sterile Water for Injection (making a 4.2% solution) to prevent hyperosmolar intracranial hemorrhage.
                      </p>
                      <p>
                        • <strong>Ventilation Requirement:</strong> Bicarbonate generates carbon dioxide (CO2) in the blood. If the child is hypoventilating, CO2 accumulates and worsens paradoxical intracellular acidosis. Ensure effective bag-mask ventilation or mechanical ventilation before infusing.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

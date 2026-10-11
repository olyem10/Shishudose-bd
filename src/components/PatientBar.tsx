import React, { useState } from 'react';
import { PatientProfile } from '../types/pediatric';
import { estimateWeightFromAge, calculateBSA } from '../utils/calculator';
import { User, Calculator, AlertCircle, ChevronDown, ChevronUp, RotateCcw, TrendingUp } from 'lucide-react';

interface PatientBarProps {
  patient: PatientProfile;
  onChange: (updated: PatientProfile) => void;
  onOpenGrowthChart?: () => void;
}

export const PatientBar: React.FC<PatientBarProps> = ({ patient, onChange, onOpenGrowthChart }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const totalMonths = patient.ageYears * 12 + patient.ageMonths;
  const isNeonate = totalMonths === 0 && patient.ageDays <= 28;
  const isInfant = totalMonths < 12;

  const estimated = estimateWeightFromAge(patient.ageYears, patient.ageMonths);

  const handleWeightChange = (newVal: number) => {
    const val = Math.max(0.5, Math.min(100, Math.round(newVal * 10) / 10));
    const bsa = calculateBSA(val, patient.heightCm);
    onChange({ ...patient, weightKg: val, bsaM2: bsa });
  };

  const handleYearsChange = (years: number) => {
    const y = Math.max(0, Math.min(18, years));
    onChange({ ...patient, ageYears: y });
  };

  const handleMonthsChange = (months: number) => {
    const m = Math.max(0, Math.min(11, months));
    onChange({ ...patient, ageMonths: m });
  };

  const handleDaysChange = (days: number) => {
    const d = Math.max(0, Math.min(30, days));
    onChange({ ...patient, ageDays: d });
  };

  const handleHeightChange = (height: number) => {
    const h = height > 0 ? height : undefined;
    const bsa = calculateBSA(patient.weightKg, h);
    onChange({ ...patient, heightCm: h, bsaM2: bsa });
  };

  const applyEstimatedWeight = () => {
    handleWeightChange(estimated.aplsKg);
  };

  const handleReset = () => {
    onChange({
      weightKg: 10,
      ageYears: 1,
      ageMonths: 0,
      ageDays: 0,
      gender: 'male',
      bsaM2: calculateBSA(10)
    });
  };

  const quickWeights = [3.5, 6, 8, 10, 12, 15, 20, 25, 30];

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Main Controls: Weight & Age */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            
            {/* Weight Input Box */}
            <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg p-1.5 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
              <label htmlFor="patient-weight" className="text-xs font-semibold text-slate-600 px-2 uppercase tracking-wide">
                Weight
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleWeightChange(patient.weightKg - 0.5)}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold active:bg-slate-200 transition-colors"
                  aria-label="Decrease weight by 0.5 kg"
                >
                  −
                </button>
                <div className="relative">
                  <input
                    id="patient-weight"
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="100"
                    value={patient.weightKg}
                    onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 1)}
                    className="w-20 text-center font-mono text-lg font-bold text-slate-900 bg-transparent focus:outline-hidden tabular-nums"
                  />
                  <span className="text-xs font-medium text-slate-500 mr-2">kg</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleWeightChange(patient.weightKg + 0.5)}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold active:bg-slate-200 transition-colors"
                  aria-label="Increase weight by 0.5 kg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Age Controls */}
            <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg p-1.5 gap-2">
              <span className="text-xs font-semibold text-slate-600 px-1 uppercase tracking-wide">
                Age
              </span>
              
              {/* Years */}
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={patient.ageYears}
                  onChange={(e) => handleYearsChange(parseInt(e.target.value) || 0)}
                  className="w-12 text-center font-mono text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-md py-1 focus:ring-1 focus:ring-sky-500 tabular-nums"
                />
                <span className="text-xs text-slate-500">yr</span>
              </div>

              {/* Months */}
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={patient.ageMonths}
                  onChange={(e) => handleMonthsChange(parseInt(e.target.value) || 0)}
                  className="w-11 text-center font-mono text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-md py-1 focus:ring-1 focus:ring-sky-500 tabular-nums"
                />
                <span className="text-xs text-slate-500">mo</span>
              </div>

              {/* Days for infants */}
              {patient.ageYears === 0 && patient.ageMonths <= 2 && (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={patient.ageDays}
                    onChange={(e) => handleDaysChange(parseInt(e.target.value) || 0)}
                    className="w-11 text-center font-mono text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-md py-1 focus:ring-1 focus:ring-sky-500 tabular-nums"
                  />
                  <span className="text-xs text-slate-500">days</span>
                </div>
              )}
            </div>

            {/* Gender Selector */}
            <div className="flex items-center bg-slate-50 border border-slate-300 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => onChange({ ...patient, gender: 'male' })}
                className={`px-2 py-1 rounded-md font-bold transition-all text-xs ${
                  patient.gender === 'male'
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ছেলে (Male / Boy)"
              >
                👦 Boy
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...patient, gender: 'female' })}
                className={`px-2 py-1 rounded-md font-bold transition-all text-xs ${
                  patient.gender === 'female'
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="মেয়ে (Female / Girl)"
              >
                👧 Girl
              </button>
            </div>

            {/* Quick Estimator Trigger */}
            <button
              onClick={applyEstimatedWeight}
              className="text-xs flex items-center gap-1.5 text-sky-800 hover:text-sky-950 font-medium py-1 px-2.5 rounded-md hover:bg-sky-50 border border-sky-200 transition-colors whitespace-nowrap"
              title="Estimate weight using APLS Formula"
            >
              <Calculator className="w-3.5 h-3.5 text-sky-600" />
              <span>Est. ({estimated.aplsKg} kg)</span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
              title="Reset to 1-year default (10 kg)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Quick presets and BSA Info */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline">Presets:</span>
            <div className="flex items-center gap-1 overflow-x-auto py-0.5">
              {quickWeights.map((w) => (
                <button
                  key={w}
                  onClick={() => handleWeightChange(w)}
                  className={`px-2 py-1 rounded text-xs font-mono tabular-nums transition-colors ${
                    patient.weightKg === w
                      ? 'bg-sky-700 text-white font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {w}kg
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 px-1 py-1 rounded hover:bg-slate-100 font-medium whitespace-nowrap ml-1"
            >
              <span>BSA: {patient.bsaM2 || 0.45} m²</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {onOpenGrowthChart && (
              <button
                type="button"
                onClick={onOpenGrowthChart}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition-colors shadow-2xs whitespace-nowrap"
                title="WHO বৃদ্ধি ও গ্রোথ চার্ট খুলুন"
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>WHO গ্রোথ চার্ট 📊</span>
              </button>
            )}
          </div>
        </div>

        {/* Neonate / Critical Age Banner */}
        {isNeonate && (
          <div className="mt-2.5 flex items-center gap-2 p-2 bg-amber-50 border border-amber-200/80 rounded-lg text-amber-900 text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Neonate Alert (&lt; 28 days):</strong> Immature hepatic glucuronidation and reduced GFR. Ceftriaxone & Cotrimoxazole are contraindicated. Paracetamol dosing interval must be lengthened (Q8-12H).
            </span>
          </div>
        )}

        {/* Collapsible Height & Surface Area Panel */}
        {showAdvanced && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-slate-50/50 p-2.5 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Height / Length:</span>
              <input
                type="number"
                min="30"
                max="180"
                placeholder="Height (cm)"
                value={patient.heightCm || ''}
                onChange={(e) => handleHeightChange(parseFloat(e.target.value) || 0)}
                className="w-20 text-center font-mono bg-white border border-slate-200 rounded px-2 py-1 tabular-nums focus:ring-1 focus:ring-sky-500"
              />
              <span className="text-slate-500">cm</span>
            </div>

            <div className="text-slate-600">
              <span>BSA (Mosteller): </span>
              <strong className="text-slate-900 font-mono tabular-nums">{patient.bsaM2 || 0.45} m²</strong>
            </div>

            <div className="text-slate-600">
              <span>Estimated Weight Formula: </span>
              <span className="font-mono text-slate-700">{estimated.description}</span>
            </div>

            <div className="text-slate-600">
              <span>WHO 50th Centile Median: </span>
              <strong className="text-slate-900 font-mono tabular-nums">{estimated.who50thKg} kg</strong>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

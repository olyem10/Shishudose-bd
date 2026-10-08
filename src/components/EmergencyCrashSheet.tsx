import React from 'react';
import { PatientProfile } from '../types/pediatric';
import { 
  Zap, 
  Printer, 
  ShieldAlert, 
  HeartPulse, 
  Wind, 
  Syringe, 
  Flame, 
  AlertTriangle,
  Activity 
} from 'lucide-react';

interface EmergencyCrashSheetProps {
  patient: PatientProfile;
}

export const EmergencyCrashSheet: React.FC<EmergencyCrashSheetProps> = ({ patient }) => {
  const w = patient.weightKg;
  const age = patient.ageYears + patient.ageMonths / 12;

  // Resuscitation calculations
  const ettUncuffed = Math.round(((patient.ageYears / 4) + 4) * 2) / 2;
  const ettCuffed = Math.max(3.0, Math.round(((patient.ageYears / 4) + 3.5) * 2) / 2);
  const ettDepth = Math.round((patient.ageYears / 2 + 12) * 10) / 10;

  // Defibrillation
  const defibInitialJ = Math.round(w * 2);
  const defibSubsequentJ = Math.round(w * 4);

  // Drugs
  const adrenalineCprMl = Math.round(w * 0.1 * 100) / 100; // 0.1 ml/kg of 1:10,000 (0.01 mg/kg)
  const adrenalineAnaphylaxisMl = Math.min(0.5, Math.round(w * 0.01 * 100) / 100); // 0.01 ml/kg of 1:1000 IM (max 0.3/0.5ml)
  const atropineMg = Math.max(0.1, Math.min(0.5, Math.round(w * 0.02 * 100) / 100)); // 0.02 mg/kg
  const fluidBolus10ml = Math.round(w * 10);
  const fluidBolus20ml = Math.round(w * 20);
  const d10wBolusMl = Math.round(w * 2 * 10) / 10; // 2 ml/kg
  const buccalMidazolamMg = Math.min(10, Math.round(w * 0.2 * 10) / 10); // 0.2 mg/kg
  const rectalDiazepamMg = Math.min(10, Math.round(w * 0.5 * 10) / 10); // 0.5 mg/kg
  const phenobarbitalLoadingMg = Math.round(w * 20); // 20 mg/kg
  const hydrocortisoneMg = Math.min(200, Math.round(w * 4)); // 4 mg/kg
  const frusemideMg = Math.min(40, Math.round(w * 1.0 * 10) / 10); // 1.0 mg/kg
  const frusemideMl = Math.round((frusemideMg / 10) * 100) / 100; // 10 mg/ml ampoule

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-rose-50 border border-rose-200 p-4 rounded-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-rose-600 text-white">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-rose-950">
              Emergency Crash-Cart & Rapid Resuscitation Sheet
            </h2>
            <p className="text-xs text-rose-800">
              Instant life-support calculations personalized for a <strong className="font-mono tabular-nums">{w} kg</strong> child ({patient.ageYears}y {patient.ageMonths}m) · <span className="font-medium">Clinical Lead: Dr. Ashraful Haque Oly (ডাঃ আশরাফুল হক অলি)</span>
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-white border border-rose-300 hover:bg-rose-100 text-rose-900 rounded-lg shadow-2xs transition-colors"
        >
          <Printer className="w-4 h-4 text-rose-600" />
          <span>Print Emergency Sheet</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* 1. CARDIAC ARREST & DEFIBRILLATION */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 bg-rose-700 text-white flex items-center gap-2">
            <HeartPulse className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Cardiac Arrest (PALS)</h3>
          </div>
          <div className="p-4 space-y-3 text-xs">
            <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-100">
              <span className="text-slate-600 font-medium">Adrenaline (Epinephrine) IV/IO:</span>
              <div className="text-xl font-extrabold text-rose-800 font-mono tabular-nums mt-0.5">
                {adrenalineCprMl} ml of 1:10,000
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                0.01 mg/kg (0.1 ml/kg of 1:10,000). Repeat every 3-5 min.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500">1st Shock (2 J/kg):</span>
                <div className="text-base font-bold font-mono text-slate-900 tabular-nums">
                  {defibInitialJ} Joules
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500">2nd+ Shock (4 J/kg):</span>
                <div className="text-base font-bold font-mono text-slate-900 tabular-nums">
                  {defibSubsequentJ} Joules
                </div>
              </div>
            </div>

            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
              <span>CPR Ratio: </span>
              <strong className="text-slate-900">15:2</strong> (two rescuers) with high-flow oxygen.
            </div>
          </div>
        </div>

        {/* 2. AIRWAY & INTUBATION */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 bg-sky-700 text-white flex items-center gap-2">
            <Wind className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Airway & Intubation (ETT)</h3>
          </div>
          <div className="p-4 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-sky-50 rounded-lg border border-sky-100">
                <span className="text-[11px] text-slate-600 font-medium">Uncuffed ETT Size:</span>
                <div className="text-xl font-bold font-mono text-sky-900 tabular-nums mt-0.5">
                  {ettUncuffed} mm ID
                </div>
                <span className="text-[10px] text-slate-400">Formula: (Age/4) + 4</span>
              </div>
              <div className="p-2.5 bg-sky-50 rounded-lg border border-sky-100">
                <span className="text-[11px] text-slate-600 font-medium">Cuffed ETT Size:</span>
                <div className="text-xl font-bold font-mono text-sky-900 tabular-nums mt-0.5">
                  {ettCuffed} mm ID
                </div>
                <span className="text-[10px] text-slate-400">Formula: (Age/4) + 3.5</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-600 font-medium">Depth of Insertion at Lips / Teeth:</span>
              <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                {ettDepth} cm
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Formula: Age/2 + 12 cm (or 3 × ETT size).
              </p>
            </div>

            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
              <span>Laryngoscope Blade: </span>
              <strong className="text-slate-900">
                {age < 1 ? 'Miller 0 or 1 (Straight)' : age < 5 ? 'Miller 1 or Mac 2' : 'Mac 2 or 3'}
              </strong>
            </div>
          </div>
        </div>

        {/* 3. FLUID BOLUS & HYPOGLYCEMIA */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 bg-teal-700 text-white flex items-center gap-2">
            <Syringe className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Shock & Hypoglycemia</h3>
          </div>
          <div className="p-4 space-y-3 text-xs">
            <div className="p-2.5 bg-teal-50 rounded-lg border border-teal-100">
              <span className="text-slate-600 font-medium">Hypovolemic Shock IV Bolus (Normal Saline / RL):</span>
              <div className="text-lg font-bold font-mono text-teal-900 tabular-nums mt-0.5">
                {fluidBolus10ml} – {fluidBolus20ml} ml
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                10 to 20 ml/kg over 15-20 min. Check lungs for crackles before repeating.
              </p>
            </div>

            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100">
              <span className="text-slate-700 font-medium">Acute Hypoglycemia Bolus (10% Dextrose D10W):</span>
              <div className="text-lg font-bold font-mono text-amber-900 tabular-nums mt-0.5">
                {d10wBolusMl} ml IV Push
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                2 ml/kg IV slow push over 2-3 min. Recheck sugar in 15 min.
              </p>
            </div>
          </div>
        </div>

        {/* 4. STATUS EPILEPTICUS RESCUE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 bg-purple-700 text-white flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Seizures & Status Epilepticus</h3>
          </div>
          <div className="p-4 space-y-2.5 text-xs">
            <div className="p-2.5 bg-purple-50 rounded-lg border border-purple-100">
              <span className="text-slate-600 font-medium">Buccal Midazolam (First-Line):</span>
              <div className="text-base font-bold font-mono text-purple-900 tabular-nums mt-0.5">
                {buccalMidazolamMg} mg ({(buccalMidazolamMg / 5).toFixed(2)} ml of 5mg/ml)
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                0.2 mg/kg squirted between lower gum and cheek.
              </p>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-600 font-medium">Rectal Diazepam:</span>
              <div className="text-base font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                {rectalDiazepamMg} mg ({(rectalDiazepamMg / 5).toFixed(2)} ml of 10mg/2ml)
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                0.5 mg/kg PR via needleless syringe.
              </p>
            </div>

            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
              <span>Neonatal Seizure First-Line: </span>
              <strong className="text-slate-900 font-mono tabular-nums">
                Phenobarbital {phenobarbitalLoadingMg} mg
              </strong>{' '}
              (20 mg/kg IV slow over 20 min).
            </div>
          </div>
        </div>

        {/* 5. ANAPHYLAXIS EMERGENCY */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 bg-rose-800 text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Anaphylaxis Emergency</h3>
          </div>
          <div className="p-4 space-y-3 text-xs">
            <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
              <span className="text-rose-950 font-bold">Adrenaline 1:1,000 IM (Anterolateral Thigh):</span>
              <div className="text-xl font-extrabold font-mono text-rose-800 tabular-nums mt-0.5">
                {adrenalineAnaphylaxisMl} ml IM
              </div>
              <p className="text-[11px] text-rose-900 mt-0.5 font-medium">
                0.01 ml/kg of 1:1,000 (0.01 mg/kg). NEVER give 1:1000 IV! Repeat in 5-15 min if needed.
              </p>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-600 font-medium">Hydrocortisone IV (Adjunct):</span>
              <div className="text-base font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                {hydrocortisoneMg} mg IV Stat
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                4 mg/kg IV push. Prevents late biphasic reaction.
              </p>
            </div>
          </div>
        </div>

        {/* 6. ACUTE SEVERE ASTHMA */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 bg-amber-700 text-white flex items-center gap-2">
            <Flame className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Acute Severe Asthma</h3>
          </div>
          <div className="p-4 space-y-2.5 text-xs">
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100">
              <span className="text-slate-700 font-medium">Salbutamol Nebulization (5 mg/ml):</span>
              <div className="text-base font-bold font-mono text-amber-900 tabular-nums mt-0.5">
                {patient.ageYears < 5 ? '0.5 ml (2.5 mg)' : '1.0 ml (5.0 mg)'} in 2.5 ml NS
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Repeat every 20 min × 3 in the first hour.
              </p>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-600 font-medium">Ipratropium Nebulization (250 mcg/ml):</span>
              <div className="text-base font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                {patient.ageYears < 5 ? '1.0 ml (250 mcg)' : '2.0 ml (500 mcg)'}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Add to Salbutamol for synergistic effect.
              </p>
            </div>

            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 space-y-1">
              <div>
                <span>Oral Steroid: </span>
                <strong className="text-slate-900">
                  Prednisolone {Math.round(w)} mg PO ({Math.round(w * 2)} mg max).
                </strong>
              </div>
              <div>
                <span>IV Steroid (Life-Threatening / Status Asthmaticus): </span>
                <strong className="text-rose-900">
                  Methylprednisolone {Math.min(60, Math.round(w * 2))} mg IV (2 mg/kg loading, max 60mg)
                </strong>{' '}
                or Hydrocortisone {hydrocortisoneMg} mg IV stat.
              </div>
            </div>
          </div>
        </div>

        {/* 7. ACUTE HEART FAILURE & FLUID OVERLOAD */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 bg-blue-700 text-white flex items-center gap-2">
            <Syringe className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Acute Pulmonary Edema / Fluid Overload</h3>
          </div>
          <div className="p-4 space-y-3 text-xs">
            <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-blue-950 font-bold">Furosemide (Frusemide / Lasix) IV:</span>
              <div className="text-xl font-extrabold font-mono text-blue-900 tabular-nums mt-0.5">
                {frusemideMl} ml IV ({frusemideMg} mg)
              </div>
              <p className="text-[11px] text-blue-900 mt-0.5 font-medium">
                1.0 mg/kg (0.1 ml/kg of 20 mg/2 ml [10 mg/ml] ampoule). Slow IV push over 2-3 minutes.
              </p>
            </div>

            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
              <span>Rate Limit: </span>
              <strong className="text-slate-900">Max 4 mg/min</strong> slow push to prevent ototoxicity. Repeat in 6-12 hr PRN.
            </div>
          </div>
        </div>

        {/* 8. EMERGENCY BLOOD PRODUCTS & PULSE STEROID */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 bg-rose-900 text-white flex items-center gap-2">
            <HeartPulse className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Emergency Blood Products & Pulse Steroid</h3>
          </div>
          <div className="p-4 space-y-2.5 text-xs">
            <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
              <span className="text-rose-950 font-bold">PRBC Emergency Transfusion (10–15 ml/kg):</span>
              <div className="text-lg font-extrabold font-mono text-rose-800 tabular-nums mt-0.5">
                {Math.round(w * 10)} – {Math.round(w * 15)} ml PRBC
              </div>
              <p className="text-[11px] text-rose-900 mt-0.5">
                Infuse over 2-4 hours. In severe anemia (Hb &lt; 5 g/dL), give Furosemide {frusemideMg} mg IV midway.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600 block text-[11px]">FFP (10–15 ml/kg):</span>
                <strong className="text-slate-900 font-mono text-sm">{Math.round(w * 10)}–{Math.round(w * 15)} ml</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600 block text-[11px]">Platelets (10 ml/kg):</span>
                <strong className="text-slate-900 font-mono text-sm">{Math.round(w * 10)} ml</strong>
              </div>
            </div>

            <div className="p-2.5 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-purple-950 font-bold">Methylprednisolone Pulse (30 mg/kg, Max 1,000 mg):</span>
              <div className="text-base font-bold font-mono text-purple-900 tabular-nums mt-0.5">
                {Math.min(1000, Math.round(w * 30))} mg IV Infusion
              </div>
              <p className="text-[11px] text-purple-800 mt-0.5">
                In 50–100 ml Normal Saline over 60–120 minutes with continuous BP monitoring.
              </p>
            </div>
          </div>
        </div>

        {/* 9. EMERGENCY ELECTROLYTES & CRITICAL ANTIDOTES */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-3.5 bg-amber-700 text-white flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Emergency Electrolytes & Antidotes</h3>
          </div>
          <div className="p-4 space-y-2.5 text-xs">
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-amber-950 font-bold">10% Calcium Gluconate IV (100 mg/kg = 1.0 ml/kg):</span>
              <div className="text-lg font-extrabold font-mono text-amber-900 tabular-nums mt-0.5">
                {Math.round(w * 1.0 * 10) / 10} ml IV
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Dilute 1:1 with NS/D5W. Infuse slow push over 5-10 min with ECG/pulse check. For tetany, hyperkalemia membrane stabilization.
              </p>
            </div>

            <div className="p-2.5 bg-indigo-50 rounded-lg border border-indigo-200">
              <span className="text-indigo-950 font-bold">8.4% Sodium Bicarbonate (1.0 mEq/kg = 1.0 ml/kg):</span>
              <div className="text-lg font-extrabold font-mono text-indigo-900 tabular-nums mt-0.5">
                {Math.round(w * 1.0)} ml IV (Max 50 ml)
              </div>
              <p className="text-[11px] text-indigo-800 mt-0.5">
                Dilute 1:1 with sterile water over 10 min. For severe metabolic acidosis (pH &lt; 7.1) and hyperkalemia. Ensure ventilation.
              </p>
            </div>

            <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
              <span className="text-rose-950 font-bold">3% Hypertonic Saline (3 ml/kg for Hyponatremic Seizures):</span>
              <div className="text-lg font-extrabold font-mono text-rose-900 tabular-nums mt-0.5">
                {Math.round(w * 3)} ml IV
              </div>
              <p className="text-[11px] text-rose-800 mt-0.5">
                Infuse over 10 to 20 minutes to rapidly arrest hyponatremic convulsions / acute cerebral edema.
              </p>
            </div>

            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-emerald-950 font-bold">Artesunate IV / IM (Severe Malaria - {w < 20 ? '3.0 mg/kg' : '2.4 mg/kg'}):</span>
              <div className="text-lg font-extrabold font-mono text-emerald-900 tabular-nums mt-0.5">
                {(w < 20 ? w * 3.0 : w * 2.4).toFixed(1)} mg IV Stat
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Give at 0, 12, 24 hr. Life-saving first-line drug for cerebral / severe malaria in Bangladesh.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Safety Notice */}
      <div className="p-3 bg-slate-100 rounded-lg text-[11px] text-slate-600 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-slate-500 shrink-0" />
        <span>
          Verification Reminder: Confirm patient weight and double-check high-alert medications (Adrenaline, Concentrated Electrolytes, Benzodiazepines) prior to administration.
        </span>
      </div>
    </div>
  );
};

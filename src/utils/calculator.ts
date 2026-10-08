import { DrugDoseProtocol, DrugFormulation, CalculatedDoseResult } from '../types/pediatric';

export function estimateWeightFromAge(years: number, months: number): {
  aplsKg: number;
  who50thKg: number;
  description: string;
} {
  const totalMonths = years * 12 + months;

  let aplsKg = 10;
  if (totalMonths <= 12) {
    aplsKg = Math.round(((totalMonths + 9) / 2) * 10) / 10;
  } else if (years < 6) {
    aplsKg = (years + 4) * 2;
  } else {
    aplsKg = years * 3 + 7;
  }

  // WHO 50th percentile median weights
  let who50thKg = 10;
  if (totalMonths === 0) who50thKg = 3.3;
  else if (totalMonths === 1) who50thKg = 4.5;
  else if (totalMonths === 3) who50thKg = 6.4;
  else if (totalMonths === 6) who50thKg = 7.9;
  else if (totalMonths === 9) who50thKg = 8.9;
  else if (totalMonths === 12) who50thKg = 9.6;
  else if (totalMonths === 18) who50thKg = 10.9;
  else if (totalMonths === 24) who50thKg = 12.2;
  else if (years === 3) who50thKg = 14.3;
  else if (years === 4) who50thKg = 16.3;
  else if (years === 5) who50thKg = 18.3;
  else if (years === 6) who50thKg = 20.5;
  else if (years === 7) who50thKg = 22.9;
  else if (years === 8) who50thKg = 25.4;
  else if (years === 9) who50thKg = 28.1;
  else if (years === 10) who50thKg = 31.2;
  else if (years === 12) who50thKg = 38.0;
  else who50thKg = Math.min(60, Math.round(years * 3.2));

  return {
    aplsKg,
    who50thKg,
    description: totalMonths <= 12 ? 'Infant formula: (months + 9)/2' : years < 6 ? 'APLS: (Age + 4) × 2' : 'APLS: (Age × 3) + 7'
  };
}

export function calculateBSA(weightKg: number, heightCm?: number): number {
  if (!heightCm || heightCm <= 0) {
    // Estimation by Boyd or Haycock weight formula when height is unavailable:
    // BSA ~ (Weight^0.725 * 71.84) / 10000 or simplified: (weight * 4 + 7) / (weight + 90)
    return Math.round(((weightKg * 4 + 7) / (weightKg + 90)) * 100) / 100;
  }
  // Mosteller formula: sqrt((height * weight) / 3600)
  return Math.round(Math.sqrt((heightCm * weightKg) / 3600) * 100) / 100;
}

export function toBanglaDigits(num: number | string): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (w) => banglaDigits[+w]);
}

export function formatTeaspoon(ml: number): string {
  if (ml <= 0) return '0 ml';
  if (Math.abs(ml - 1.25) < 0.2) return '1/4 চা চামচ (১.২৫ মিলি)';
  if (Math.abs(ml - 2.5) < 0.3) return '1/2 চা চামচ (২.৫ মিলি)';
  if (Math.abs(ml - 3.75) < 0.3) return '3/4 চা চামচ (৩.৭৫ মিলি)';
  if (Math.abs(ml - 5) < 0.4) return '১ চা চামচ (৫ মিলি)';
  if (Math.abs(ml - 7.5) < 0.4) return '১ ১/২ চা চামচ (৭.৫ মিলি)';
  if (Math.abs(ml - 10) < 0.5) return '২ চা চামচ (১০ মিলি)';
  if (Math.abs(ml - 15) < 0.6) return '১ টেবিল চামচ (১৫ মিলি)';
  return `${ml} মিলি (${toBanglaDigits(ml)} ml)`;
}

export function calculateDrugDose(
  drug: DrugDoseProtocol,
  weightKg: number,
  ageMonths: number,
  formulation: DrugFormulation,
  targetDoseMgPerKg?: number
): CalculatedDoseResult {
  const targetDose = targetDoseMgPerKg ?? drug.defaultDoseMg;
  let dosePerAdministrationMg = 0;
  let isMaxDoseCapped = false;
  const warnings: string[] = [...drug.warnings];

  // Age restriction check
  if (drug.ageMinMonths !== undefined && ageMonths < drug.ageMinMonths) {
    warnings.unshift(
      `⚠️ AGE WARNING: Drug normally indicated from age ${drug.ageMinMonths} months. Current age is ${ageMonths} months.`
    );
  }

  // Dose calculation logic
  if (drug.doseType === 'per_kg_per_dose') {
    dosePerAdministrationMg = targetDose * weightKg;
  } else if (drug.doseType === 'per_kg_per_day') {
    const dailyTotal = targetDose * weightKg;
    dosePerAdministrationMg = dailyTotal / Math.max(1, drug.frequencyTimesPerDay);
  } else if (drug.doseType === 'fixed_by_age') {
    dosePerAdministrationMg = targetDose;
  } else if (drug.doseType === 'bsa_based') {
    const bsa = calculateBSA(weightKg);
    dosePerAdministrationMg = targetDose * bsa;
  }

  // Single dose ceiling cap
  if (drug.maxSingleDoseMg && dosePerAdministrationMg > drug.maxSingleDoseMg) {
    dosePerAdministrationMg = drug.maxSingleDoseMg;
    isMaxDoseCapped = true;
    warnings.push(`Dose capped at maximum single dose limit of ${drug.maxSingleDoseMg} mg.`);
  }

  // Daily ceiling cap
  let dailyTotalMg = dosePerAdministrationMg * drug.frequencyTimesPerDay;
  if (drug.maxDailyDoseMg && dailyTotalMg > drug.maxDailyDoseMg) {
    dailyTotalMg = drug.maxDailyDoseMg;
    dosePerAdministrationMg = dailyTotalMg / drug.frequencyTimesPerDay;
    isMaxDoseCapped = true;
    warnings.push(`Daily dose capped at maximum safe limit of ${drug.maxDailyDoseMg} mg/day.`);
  }

  // Round dose in mg to sensible precision
  dosePerAdministrationMg = Math.round(dosePerAdministrationMg * 10) / 10;
  dailyTotalMg = Math.round(dailyTotalMg * 10) / 10;

  // Volume calculations for liquid formulations
  let volumePerDoseMl: number | undefined;
  let dropsPerDose: number | undefined;
  let teaspoonDescription: string | undefined;
  let tabletsPerDose: number | undefined;

  if (formulation.concentrationMgPerMl && formulation.concentrationMgPerMl > 0) {
    const rawVolume = dosePerAdministrationMg / formulation.concentrationMgPerMl;
    // For volumes < 2 ml, preserve 2 decimal places, otherwise 1 decimal place
    volumePerDoseMl = rawVolume < 2 ? Math.round(rawVolume * 100) / 100 : Math.round(rawVolume * 10) / 10;
    
    // Drops calculation
    const factor = formulation.dropFactor || 20;
    dropsPerDose = Math.round(rawVolume * factor);

    teaspoonDescription = formatTeaspoon(volumePerDoseMl);
  } else if (formulation.mgPerUnit && formulation.mgPerUnit > 0) {
    tabletsPerDose = Math.round((dosePerAdministrationMg / formulation.mgPerUnit) * 10) / 10;
  }

  // Construct standard Bangladeshi prescription strings
  const primaryBrand = formulation.bdBrands[0] || drug.popularBDBrands[0] || drug.genericName;

  let rxDoseEn = '';
  let rxDoseBn = '';

  if (formulation.formType === 'eye_drops') {
    rxDoseEn = `1 drop into affected eye(s)`;
    rxDoseBn = `১ ফোঁটা করে আক্রান্ত চোখে`;
  } else if (formulation.formType === 'injection' && volumePerDoseMl) {
    const isIU = drug.doseUnit.includes('IU');
    const unitTextEn = isIU ? `${dosePerAdministrationMg.toLocaleString()} IU` : `${dosePerAdministrationMg} mg`;
    const unitTextBn = isIU ? `${toBanglaDigits(dosePerAdministrationMg)} IU` : `${toBanglaDigits(dosePerAdministrationMg)} মি.গ্রা.`;
    rxDoseEn = `${volumePerDoseMl} ml IV/IM (${unitTextEn}) — draw with syringe`;
    rxDoseBn = `${toBanglaDigits(volumePerDoseMl)} মিলি শিরাপথে/মাংসে [${unitTextBn}] — সিরিঞ্জে টেনে নিন`;
  } else if (formulation.formType === 'drops' && dropsPerDose) {
    rxDoseEn = `${dropsPerDose} drops (${volumePerDoseMl} ml)`;
    rxDoseBn = `${toBanglaDigits(dropsPerDose)} ফোঁটা (${toBanglaDigits(volumePerDoseMl || 0)} মিলি)`;
  } else if (volumePerDoseMl) {
    rxDoseEn = `${volumePerDoseMl} ml (${dosePerAdministrationMg} mg)`;
    rxDoseBn = `${teaspoonDescription} [${toBanglaDigits(dosePerAdministrationMg)} মি.গ্রা.]`;
  } else if (tabletsPerDose) {
    rxDoseEn = `${tabletsPerDose} ${formulation.unitLabel}`;
    rxDoseBn = `${toBanglaDigits(tabletsPerDose)} টি ${formulation.unitLabel}`;
  } else {
    rxDoseEn = `${dosePerAdministrationMg} ${drug.doseUnit}`;
    rxDoseBn = `${toBanglaDigits(dosePerAdministrationMg)} মি.গ্রা.`;
  }

  const prescriptionTextEn = `Rx: ${primaryBrand} (${formulation.name})
Dose: ${rxDoseEn}
${formulation.reconstitutionNote ? `Preparation: ${formulation.reconstitutionNote}\n` : ''}Instructions: ${drug.englishSchedule}
Duration: ${drug.standardDurationDays}`;

  const prescriptionTextBn = `ঔষধ: ${primaryBrand} (${formulation.name})
মাত্রা: ${rxDoseBn}
${formulation.reconstitutionNote ? `প্রস্তুতি: ${formulation.reconstitutionNote}\n` : ''}নিয়ম: ${drug.banglaSchedule}
মেয়াদ: ${drug.standardDurationDays}`;

  return {
    drug,
    selectedFormulation: formulation,
    dosePerAdministrationMg,
    dailyTotalMg,
    volumePerDoseMl,
    dropsPerDose,
    teaspoonDescription,
    tabletsPerDose,
    isMaxDoseCapped,
    warnings,
    prescriptionTextEn,
    prescriptionTextBn
  };
}

export interface FluidCalculationResult {
  weightKg: number;
  maintenanceMlPerDay: number;
  maintenanceMlPerHour: number;
  microdropperDropsPerMin: number; // 60 gtt/ml micro set = ml/hr
  standardPediatricDropsPerMin: number; // 20 gtt/ml set = (ml/hr * 20) / 60 = ml/hr / 3
  denguePlasmaRate5ml: number;
  denguePlasmaRate7ml: number;
  planBORS4HoursMl: number;
  planCFastIVTotalMl: number;
  planCPhase1Ml: number;
  planCPhase2Ml: number;
}

export function calculatePediatricFluids(weightKg: number, isInfantUnder12Months: boolean): FluidCalculationResult {
  // Holliday-Segar formula
  let dailyMl = 0;
  if (weightKg <= 10) {
    dailyMl = weightKg * 100;
  } else if (weightKg <= 20) {
    dailyMl = 1000 + (weightKg - 10) * 50;
  } else {
    dailyMl = 1500 + (weightKg - 20) * 20;
  }

  const hourlyMl = Math.round((dailyMl / 24) * 10) / 10;
  const microdropper = Math.round(hourlyMl); // 60 gtt/ml micro set: 1 ml/hr = 1 drop/min
  const standardSet = Math.round(hourlyMl / 3); // 20 gtt/ml set: 1 ml/hr = 1/3 drop/min

  // Plan B: ORS 75 ml/kg over 4 hours
  const planBORS = Math.round(weightKg * 75);

  // Plan C: 100 ml/kg total
  const planCTotal = Math.round(weightKg * 100);
  const planCPhase1 = Math.round(weightKg * 30);
  const planCPhase2 = Math.round(weightKg * 70);

  // Dengue 5-7 ml/kg/hr
  const dengue5 = Math.round(weightKg * 5);
  const dengue7 = Math.round(weightKg * 7);

  return {
    weightKg,
    maintenanceMlPerDay: Math.round(dailyMl),
    maintenanceMlPerHour: hourlyMl,
    microdropperDropsPerMin: microdropper,
    standardPediatricDropsPerMin: standardSet,
    denguePlasmaRate5ml: dengue5,
    denguePlasmaRate7ml: dengue7,
    planBORS4HoursMl: planBORS,
    planCFastIVTotalMl: planCTotal,
    planCPhase1Ml: planCPhase1,
    planCPhase2Ml: planCPhase2
  };
}

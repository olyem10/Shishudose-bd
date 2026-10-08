export type AgeUnit = 'days' | 'months' | 'years';

export interface PatientProfile {
  weightKg: number;
  ageYears: number;
  ageMonths: number;
  ageDays: number;
  gender: 'male' | 'female';
  heightCm?: number;
  bsaM2?: number; // Body surface area
}

export type TherapeuticCategory = 
  | 'antipyretic_analgesic'
  | 'antibiotics'
  | 'antimalarial'
  | 'antitubercular'
  | 'respiratory'
  | 'antihistamine'
  | 'gastrointestinal'
  | 'anticonvulsant_emergency'
  | 'electrolytes_emergency'
  | 'corticosteroids'
  | 'vitamins_minerals'
  | 'ophthalmic_topical'
  | 'cardiovascular';

export interface DrugFormulation {
  name: string; // e.g. "Syrup 120 mg / 5 ml", "Drops 80 mg / ml"
  formType: 'syrup' | 'suspension' | 'drops' | 'tablet' | 'dispersible_tablet' | 'injection' | 'suppository' | 'sachet' | 'respule' | 'inhaler' | 'eye_drops';
  concentrationMgPerMl?: number; // e.g. 24 for 120mg/5ml, 80 for drops
  mgPerUnit?: number; // e.g. 500 for 500mg tab, 125 for suppository
  unitLabel: string; // "ml", "drops", "tab", "supp", "sachet", "puff"
  dropFactor?: number; // e.g. 20 drops per ml
  teaspoonFactor?: number; // 5ml = 1 tsp
  reconstitutionNote?: string; // e.g. "Reconstitute 500mg vial in 5ml WFI (100 mg/ml)"
  bdBrands: string[]; // e.g. ["Napa", "Ace", "Fast", "Reset", "Pyrofen"]
}

export interface DrugDoseProtocol {
  id: string;
  genericName: string;
  banglaName?: string;
  category: TherapeuticCategory;
  categoryLabel: string;
  popularBDBrands: string[];
  manufacturerNotes?: string; // Top BD pharma: Square, Beximco, Incepta, Renata, SK+F, Acme
  indication: string;
  
  // Dosing specs
  doseType: 'per_kg_per_dose' | 'per_kg_per_day' | 'fixed_by_age' | 'bsa_based';
  defaultDoseMg: number; // e.g. 15 for 15mg/kg/dose or 50 for 50mg/kg/day
  minDoseMg: number;
  maxDoseMg: number;
  doseUnit: 'mg/kg/dose' | 'mg/kg/day' | 'mg/dose' | 'IU/dose' | 'IU/kg/day' | 'IU/kg/dose' | 'mcg/kg/day';
  
  frequency: string; // "Every 4-6 hours (Q4-6H)", "Every 8 hours (TID)", "Every 12 hours (BID)", "Once daily (OD)"
  frequencyTimesPerDay: number; // e.g. 4 for QDS, 3 for TID, 2 for BID, 1 for OD
  banglaSchedule: string; // "দিনে ৩ বার (খাওয়ার পর)", "জ্বর হলে ৪-৬ ঘণ্টা পর পর"
  englishSchedule: string; // "1 tsp 3 times daily after food"
  
  standardDurationDays: string; // "3-5 days as needed", "5-7 days", "10-14 days"
  maxSingleDoseMg?: number; // e.g. 1000 mg
  maxDailyDoseMg?: number; // e.g. 4000 mg or 60 mg/kg/day
  
  // Safety & Cautions
  neonatalSafety: 'safe' | 'caution' | 'contraindicated';
  ageMinMonths?: number;
  warnings: string[];
  clinicalTips: string[];
  banglaPrescriptionTemplate?: string;
  
  formulations: DrugFormulation[];
}

export interface CalculatedDoseResult {
  drug: DrugDoseProtocol;
  selectedFormulation: DrugFormulation;
  dosePerAdministrationMg: number;
  dailyTotalMg: number;
  volumePerDoseMl?: number;
  dropsPerDose?: number;
  teaspoonDescription?: string;
  tabletsPerDose?: number;
  isMaxDoseCapped: boolean;
  warnings: string[];
  prescriptionTextEn: string;
  prescriptionTextBn: string;
}

export interface ClinicalGuideline {
  id: string;
  title: string;
  banglaTitle?: string;
  banglaName?: string;
  category: string;
  summary: string;
  badge?: string;
  sections: {
    heading: string;
    content: string[];
    callout?: {
      type: 'warning' | 'alert' | 'info' | 'protocol';
      text: string;
    };
    tableData?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  references: string[];
}

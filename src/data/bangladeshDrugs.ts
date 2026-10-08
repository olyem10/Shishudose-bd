import { DrugDoseProtocol } from '../types/pediatric';

export const BANGLADESH_PEDIATRIC_DRUGS: DrugDoseProtocol[] = [
  // ==========================================
  // ANTIPYRETICS & ANALGESICS
  // ==========================================
  {
    id: 'paracetamol',
    genericName: 'Paracetamol (Acetaminophen)',
    banglaName: 'প্যারাসিটামল',
    category: 'antipyretic_analgesic',
    categoryLabel: 'Antipyretic / Analgesic',
    popularBDBrands: ['Napa', 'Ace', 'Fast', 'Reset', 'Pyrofen', 'Xpa', 'Renova'],
    manufacturerNotes: 'Beximco (Napa), Square (Ace), Acme (Fast), Incepta (Reset), Renata (Pyrofen)',
    indication: 'Fever, mild-to-moderate pain, post-immunization pyrexia',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 15,
    minDoseMg: 10,
    maxDoseMg: 15,
    doseUnit: 'mg/kg/dose',
    frequency: 'Every 4 to 6 hours (Max 4 times / 24 hr)',
    frequencyTimesPerDay: 4,
    banglaSchedule: 'জ্বর বা ব্যথা হলে প্রতি ৪-৬ ঘণ্টা পর পর (দিনে সর্বোচ্চ ৪ বার)',
    englishSchedule: 'Every 4-6 hours as needed for fever (Max 4 doses in 24 hr)',
    standardDurationDays: '3 to 5 days (PRN)',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 4000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Maximum safe 24-hour total: 60 mg/kg/day (do not exceed 4,000 mg/day).',
      'Overdose leads to hepatotoxicity. Be mindful of concurrent cold preparations containing paracetamol.',
      'In neonates: extended dosing interval (every 8 to 12 hours) due to immature hepatic glucuronidation.'
    ],
    clinicalTips: [
      'Paediatric Drops (80 mg/ml) is ideal for neonates and infants < 1 year to avoid large liquid volumes.',
      'For severe vomiting or febrile convulsions with inability to swallow, use Suppositories (60mg, 125mg, 250mg, 500mg). Suppository dose is 15-20 mg/kg/dose.',
      'Wait at least 4 hours between consecutive doses.'
    ],
    banglaPrescriptionTemplate: 'খাওয়ার পর জ্বর থাকলে খাবে। অতিরিক্ত খাবেন না।',
    formulations: [
      {
        name: 'Syrup 120 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 24,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Napa Syrup', 'Ace Syrup', 'Fast Syrup', 'Pyrofen Syrup']
      },
      {
        name: 'Paediatric Suspension 120 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 24,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Napa Susp', 'Ace Susp']
      },
      {
        name: 'Paediatric Drops 80 mg / 1 ml (for infants)',
        formType: 'drops',
        concentrationMgPerMl: 80,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Napa Drops', 'Ace Drops', 'Reset Drops', 'Fast Drops']
      },
      {
        name: 'Forte / DS Syrup 250 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 50,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Napa Extra/Forte', 'Ace Plus', 'Reset Forte']
      },
      {
        name: 'Suppository 125 mg',
        formType: 'suppository',
        mgPerUnit: 125,
        unitLabel: 'suppository',
        bdBrands: ['Napa 125 Suppository', 'Ace 125 Suppository']
      },
      {
        name: 'Suppository 250 mg',
        formType: 'suppository',
        mgPerUnit: 250,
        unitLabel: 'suppository',
        bdBrands: ['Napa 250 Suppository', 'Ace 250 Suppository']
      },
      {
        name: 'Suppository 60 mg (Infant)',
        formType: 'suppository',
        mgPerUnit: 60,
        unitLabel: 'suppository',
        bdBrands: ['Napa 60 Suppository', 'Ace 60 Suppository']
      },
      {
        name: 'Tablet 500 mg',
        formType: 'tablet',
        mgPerUnit: 500,
        unitLabel: 'tablet',
        bdBrands: ['Napa 500mg', 'Ace 500mg', 'Fast 500mg']
      }
    ]
  },
  {
    id: 'ibuprofen',
    genericName: 'Ibuprofen',
    banglaName: 'আইবুপ্রোফেন',
    category: 'antipyretic_analgesic',
    categoryLabel: 'Antipyretic / Analgesic',
    popularBDBrands: ['Flamyd', 'Profen', 'Nurofen', 'Profenac'],
    manufacturerNotes: 'Beximco, Square, Incepta',
    indication: 'High persistent fever, juvenile inflammatory arthritis, musculoskeletal pain',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 10,
    minDoseMg: 5,
    maxDoseMg: 10,
    doseUnit: 'mg/kg/dose',
    frequency: 'Every 6 to 8 hours (TID / QID with food)',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'দিনে ৩ বার ভরা পেটে (প্রতি ৬-৮ ঘণ্টা পর পর)',
    englishSchedule: 'Every 6-8 hours with food or milk (Max 40 mg/kg/day)',
    standardDurationDays: '3 to 5 days',
    maxSingleDoseMg: 400,
    maxDailyDoseMg: 1200,
    neonatalSafety: 'contraindicated',
    ageMinMonths: 6,
    warnings: [
      'STRICT WARNING: CONTRAINDICATED in suspected Dengue fever or bleeding diathesis due to risk of severe thrombocytopenic hemorrhage and gastritis.',
      'Contraindicated in infants younger than 6 months or dehydrated children (risk of acute kidney injury).',
      'Always give strictly after food or milk to prevent gastric irritation.'
    ],
    clinicalTips: [
      'Reserve for fever unresponsive to Paracetamol, when Dengue has been ruled out.',
      'Ensure the child is well hydrated.'
    ],
    banglaPrescriptionTemplate: 'খাবার সাথে সাথে বা খাওয়ার ঠিক পর খাবে। খালি পেটে কখনোই নয়।',
    formulations: [
      {
        name: 'Suspension 100 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 20,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Flamyd Susp', 'Profen Susp']
      },
      {
        name: 'Tablet 200 mg',
        formType: 'tablet',
        mgPerUnit: 200,
        unitLabel: 'tablet',
        bdBrands: ['Profen 200mg', 'Flamyd 200mg']
      },
      {
        name: 'Tablet 400 mg',
        formType: 'tablet',
        mgPerUnit: 400,
        unitLabel: 'tablet',
        bdBrands: ['Profen 400mg']
      }
    ]
  },

  // ==========================================
  // ANTIBIOTICS & ANTIMICROBIALS
  // ==========================================
  {
    id: 'amoxicillin',
    genericName: 'Amoxicillin',
    banglaName: 'এমোক্সিসিলিন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Moxacil', 'Tycil', 'Fimoxyl', 'Amopen', 'Aristomox'],
    manufacturerNotes: 'Square (Moxacil), Beximco (Tycil), Incepta (Fimoxyl), Acme (Amopen)',
    indication: 'WHO IMCI first-line for non-severe pneumonia, acute otitis media (AOM), streptococcal pharyngitis, skin infections',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 50,
    minDoseMg: 40,
    maxDoseMg: 90,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 2 or 3 doses daily (TID every 8h or BID high-dose every 12h)',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'দিনে ৩ বার (প্রতি ৮ ঘণ্টা পর পর) - খাওয়ার আগে বা পরে',
    englishSchedule: 'Every 8 hours (or every 12 hours for high-dose pneumonia) for 5-7 days',
    standardDurationDays: '5 to 7 days',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 3000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Check for penicillin / beta-lactam hypersensitivity.',
      'WHO IMCI guidelines for fast-breathing pneumonia recommend high-dose Amoxicillin (80-90 mg/kg/day divided BID) for 5 days.',
      'Reconstituted dry suspension must be stored in refrigerator and used within 7-10 days.'
    ],
    clinicalTips: [
      'Can be taken with or without food.',
      'For AOM and resistant S. pneumoniae, use high dose 80-90 mg/kg/day.',
      'Finish the full course even if fever resolves after 48 hours.'
    ],
    banglaPrescriptionTemplate: 'বোতলে ফোটানো ঠান্ডা পানি দাগ পর্যন্ত দিয়ে ঝাঁকিয়ে নিয়ে ৫ দিন খাবে।',
    formulations: [
      {
        name: 'Dry Syrup 125 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 25,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Moxacil Syr', 'Tycil Syr', 'Fimoxyl Syr']
      },
      {
        name: 'Forte Dry Syrup 250 mg / 5 ml (DS)',
        formType: 'syrup',
        concentrationMgPerMl: 50,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Moxacil Forte', 'Tycil DS', 'Fimoxyl Forte']
      },
      {
        name: 'Paediatric Drops 100 mg / 1 ml',
        formType: 'drops',
        concentrationMgPerMl: 100,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Moxacil Drops', 'Tycil Drops']
      },
      {
        name: 'Capsule 250 mg',
        formType: 'tablet',
        mgPerUnit: 250,
        unitLabel: 'capsule',
        bdBrands: ['Moxacil 250mg', 'Tycil 250mg']
      },
      {
        name: 'Capsule 500 mg',
        formType: 'tablet',
        mgPerUnit: 500,
        unitLabel: 'capsule',
        bdBrands: ['Moxacil 500mg', 'Tycil 500mg']
      }
    ]
  },
  {
    id: 'co_amoxiclav',
    genericName: 'Amoxicillin + Clavulanic Acid (Co-Amoxiclav)',
    banglaName: 'কো-এমোক্সিক্লাভ',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Moxaclav', 'Klavox', 'Bioxid', 'Augmentin', 'A-Clav'],
    manufacturerNotes: 'Square (Moxaclav), Incepta (Klavox), Beximco (Bioxid), GSK (Augmentin)',
    indication: 'Beta-lactamase producing infections: recurrent otitis media, sinusitis, animal bites, complicated pneumonia, UTI',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 45,
    minDoseMg: 30,
    maxDoseMg: 90,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 2 or 3 doses daily (BID for 7:1 ratio, TID for 4:1 ratio)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (প্রতি ১২ ঘণ্টা পর পর) - খাবারের শুরুতে খাবে',
    englishSchedule: 'Every 12 hours (BID formulation) at the start of a meal for 5-7 days',
    standardDurationDays: '5 to 7 days',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 2000,
    neonatalSafety: 'caution',
    ageMinMonths: 2,
    warnings: [
      'Frequently causes diarrhea / loose stools due to clavulanic acid. Give at the beginning of meals to minimize GI distress.',
      'Dosage is calculated strictly based on the Amoxicillin component.',
      'Beware of hepatic dysfunction in prolonged courses.'
    ],
    clinicalTips: [
      'BID formulations (457 mg/5ml or 228.5 mg/5ml, 7:1 ratio) cause significantly less diarrhea than older TID (4:1) formulations.',
      'Advise parents to give yogurt or probiotics if loose stools occur.'
    ],
    banglaPrescriptionTemplate: 'খাবার শুরুর ঠিক আগে খাবে। পাতলা পায়খানা হতে পারে, ওরস্যালাইন খাওয়াবেন।',
    formulations: [
      {
        name: 'Syrup 156.25 mg / 5 ml (125mg Amox + 31.25mg Clav)',
        formType: 'syrup',
        concentrationMgPerMl: 25,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Moxaclav 156.25', 'Klavox 156.25', 'Bioxid 156.25']
      },
      {
        name: 'Suspension 312.5 mg / 5 ml (250mg Amox + 62.5mg Clav)',
        formType: 'suspension',
        concentrationMgPerMl: 50,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Moxaclav 312.5 DS', 'Klavox 312.5', 'Bioxid 312.5']
      },
      {
        name: 'BID Forte Susp 457 mg / 5 ml (400mg Amox + 57mg Clav - 7:1)',
        formType: 'suspension',
        concentrationMgPerMl: 80,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Moxaclav 457 BID', 'Klavox 457', 'Bioxid 457']
      },
      {
        name: 'Tablet 625 mg (500mg Amox + 125mg Clav)',
        formType: 'tablet',
        mgPerUnit: 500,
        unitLabel: 'tablet',
        bdBrands: ['Moxaclav 625mg', 'Klavox 625mg']
      }
    ]
  },
  {
    id: 'cefixime',
    genericName: 'Cefixime (3rd Gen Cephalosporin)',
    banglaName: 'সেফিক্সিম',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Denvar', 'Ceftron Oral', 'C-Tri', 'Taxim', 'Orfix', 'Roxim'],
    manufacturerNotes: 'Square (Denvar), Beximco (Ceftron), Incepta (C-Tri), Aristopharma (Taxim)',
    indication: 'Uncomplicated enteric fever (Typhoid), urinary tract infections (UTI), acute shigellosis, step-down therapy',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 8,
    minDoseMg: 8,
    maxDoseMg: 20,
    doseUnit: 'mg/kg/day',
    frequency: 'Once daily (OD) or divided into 2 doses (BID every 12 hr)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (প্রতি ১২ ঘণ্টা পর পর) - খাবার পর',
    englishSchedule: 'Every 12 hours (BID) or once daily for 7-14 days',
    standardDurationDays: '7 to 14 days (14 days for Typhoid)',
    maxSingleDoseMg: 400,
    maxDailyDoseMg: 800,
    neonatalSafety: 'caution',
    ageMinMonths: 6,
    warnings: [
      'For Typhoid / Enteric fever in Bangladesh: BPA & ICDDR,B recommend higher dose of 15-20 mg/kg/day divided BID for 10-14 days due to partial resistance.',
      'Contraindicated in cephalosporin allergy.',
      'Safety not established in infants < 6 months.'
    ],
    clinicalTips: [
      'Suspension has significantly higher bioavailability than tablets in children.',
      'Reconstituted suspension must be discarded after 14 days.'
    ],
    banglaPrescriptionTemplate: 'টাইফয়েড হলে টানা ১০-১৪ দিন খাওয়া শেষ করতে হবে, মাঝপথে বন্ধ করবেন না।',
    formulations: [
      {
        name: 'Dry Suspension 100 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 20,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Denvar Susp', 'C-Tri Susp', 'Taxim Susp', 'Orfix Susp']
      },
      {
        name: 'Forte Suspension 200 mg / 5 ml (DS)',
        formType: 'suspension',
        concentrationMgPerMl: 40,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Denvar Forte', 'C-Tri DS', 'Taxim DS']
      },
      {
        name: 'Paediatric Drops 100 mg / 1 ml',
        formType: 'drops',
        concentrationMgPerMl: 100,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Denvar Drops', 'C-Tri Drops']
      },
      {
        name: 'Capsule 200 mg',
        formType: 'tablet',
        mgPerUnit: 200,
        unitLabel: 'capsule',
        bdBrands: ['Denvar 200mg', 'Ceftron 200mg']
      },
      {
        name: 'Capsule 400 mg',
        formType: 'tablet',
        mgPerUnit: 400,
        unitLabel: 'capsule',
        bdBrands: ['Denvar 400mg', 'Ceftron 400mg']
      }
    ]
  },
  {
    id: 'cefuroxime',
    genericName: 'Cefuroxime Axetil (2nd Gen Cephalosporin)',
    banglaName: 'সেফুরোক্সিম এক্সিটিল',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Kilbac', 'Cerox-A', 'Cetil', 'Xime', 'Furocef'],
    manufacturerNotes: 'Incepta (Kilbac), Beximco (Cerox-A), Square (Cetil), Renata (Xime)',
    indication: 'Community-acquired pneumonia (CAP), acute sinusitis, impetigo, second-line AOM',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 30,
    minDoseMg: 20,
    maxDoseMg: 30,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 2 doses daily (BID every 12 hr)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (প্রতি ১২ ঘণ্টা পর পর) - অবশ্যই খাবার সাথে সাথে বা খাবারের পর',
    englishSchedule: 'Every 12 hours with food for 5-10 days',
    standardDurationDays: '5 to 7 days',
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 1000,
    neonatalSafety: 'caution',
    ageMinMonths: 3,
    warnings: [
      'Very bitter taste if crushed. Never crush tablets. Liquid suspension should be taken with milk or sweet juice if tolerated.',
      'Absorption is significantly enhanced when taken with or immediately after food.'
    ],
    clinicalTips: [
      'Excellent activity against H. influenzae and Moraxella catarrhalis.',
      'Store reconstituted suspension at 2-8°C.'
    ],
    banglaPrescriptionTemplate: 'অবশ্যই ভরা পেটে খাবে। ওষুধটি তিক্ত স্বাদের হতে পারে।',
    formulations: [
      {
        name: 'Dry Suspension 125 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 25,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Kilbac Susp', 'Cerox-A Susp', 'Cetil Susp']
      },
      {
        name: 'Dry Suspension 250 mg / 5 ml (DS)',
        formType: 'suspension',
        concentrationMgPerMl: 50,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Kilbac DS', 'Cerox-A DS', 'Cetil DS']
      },
      {
        name: 'Tablet 250 mg',
        formType: 'tablet',
        mgPerUnit: 250,
        unitLabel: 'tablet',
        bdBrands: ['Kilbac 250mg', 'Cerox-A 250mg']
      },
      {
        name: 'Tablet 500 mg',
        formType: 'tablet',
        mgPerUnit: 500,
        unitLabel: 'tablet',
        bdBrands: ['Kilbac 500mg', 'Cerox-A 500mg']
      }
    ]
  },
  {
    id: 'ceftriaxone',
    genericName: 'Ceftriaxone Sodium (IV / IM)',
    banglaName: 'সেফট্রিয়াক্সন ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Ceftron IV', 'Traxyl', 'Rocephin', 'A-Gram', 'Triject'],
    manufacturerNotes: 'Beximco (Ceftron), Square (Traxyl), Roche (Rocephin), Acme (A-Gram)',
    indication: 'Bacterial meningitis, severe sepsis, complicated enteric fever, severe pneumonia requiring admission',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 50,
    minDoseMg: 50,
    maxDoseMg: 100,
    doseUnit: 'mg/kg/day',
    frequency: 'Once daily (OD) or divided Q12H (Q12H preferred in Meningitis 100 mg/kg/day)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'শিরায় (IV) দিনে ১ বার ধীরে ধীরে ইনফিউশন দিতে হবে',
    englishSchedule: 'IV slow infusion once daily (or Q12H for meningitis 100 mg/kg/day) for 7-14 days',
    standardDurationDays: '7 to 14 days',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 4000,
    neonatalSafety: 'contraindicated',
    ageMinMonths: 1,
    warnings: [
      'STRICT CONTRAINDICATION IN NEONATES (<28 days): Ceftriaxone can displace bilirubin from albumin, precipitating kernicterus, and forms fatal crystalline precipitates with IV Calcium (e.g. Ringer’s Lactate). Use Cefotaxime in neonates instead.',
      'Never administer simultaneously with Calcium-containing IV solutions (Hartmann / Ringer’s) via the same line.'
    ],
    clinicalTips: [
      'Infuse over 30 minutes in Normal Saline or 5% Dextrose.',
      'For pediatric bacterial meningitis: 100 mg/kg/day divided Q12H (max 4 g/day).',
      'For severe Typhoid in Bangladesh: 75-100 mg/kg/day for 10-14 days.'
    ],
    banglaPrescriptionTemplate: 'শিরাপথে ডাক্তার বা নার্সের তত্ত্বাবধানে আস্তে আস্তে পুশ করতে হবে।',
    formulations: [
      {
        name: 'IV Injection (50 mg/ml) — 250 mg in 5 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 250,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 250 mg vial in 5 ml sterile water (WFI) -> 50 mg/ml solution. Draw exact ml into syringe.',
        bdBrands: ['Ceftron 250mg', 'Traxyl 250mg']
      },
      {
        name: 'IV Injection (100 mg/ml) — 500 mg in 5 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 100,
        mgPerUnit: 500,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 500 mg vial in 5 ml sterile water (WFI) -> 100 mg/ml solution. Draw exact ml into syringe.',
        bdBrands: ['Ceftron 500mg', 'Traxyl 500mg']
      },
      {
        name: 'IV Injection (100 mg/ml) — 1 g in 10 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 100,
        mgPerUnit: 1000,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 1 g vial in 10 ml sterile water (WFI) -> 100 mg/ml solution. Draw exact ml into syringe.',
        bdBrands: ['Ceftron 1g', 'Traxyl 1g']
      }
    ]
  },
  {
    id: 'azithromycin',
    genericName: 'Azithromycin (Macrolide)',
    banglaName: 'এজিথ্রোমাইসিন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Zimax', 'Azyth', 'Zithrin', 'Tridosil', 'Azith'],
    manufacturerNotes: 'Square (Zimax), Beximco (Azyth), Renata (Zithrin), Incepta (Tridosil)',
    indication: 'Atypical pneumonia (Mycoplasma/Chlamydia), Pertussis, Shigella dysentery, Enteric fever (first-line in BD)',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 10,
    minDoseMg: 10,
    maxDoseMg: 20,
    doseUnit: 'mg/kg/day',
    frequency: 'Once daily (OD) on an empty stomach (1 hr before or 2 hr after food)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'দিনে ১ বার (খাওয়ার ১ ঘণ্টা আগে অথবা ২ ঘণ্টা পর)',
    englishSchedule: 'Once daily on an empty stomach for 3 to 5 days (7-10 days for Typhoid 20 mg/kg/day)',
    standardDurationDays: '3 to 5 days (10 days for Typhoid)',
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 1000,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'Enteric fever in Bangladesh: ICDDR,B & BPA recommend 20 mg/kg/day OD for 7-10 days for high cure rates.',
      'Standard respiratory tract infection: 10 mg/kg/day OD for 3-5 days.',
      'Caution in children with prolonged QT interval or cardiac arrhythmias.',
      'In young infants < 6 weeks: potential risk of infantile hypertrophic pyloric stenosis (IHPS).'
    ],
    clinicalTips: [
      'Long tissue half-life allows convenient once-daily dosing.',
      'Best absorbed when taken on an empty stomach, but can be taken with small snack if nausea occurs.'
    ],
    banglaPrescriptionTemplate: 'খাবার ১ ঘণ্টা পূর্বে বা ২ ঘণ্টা পরে খালি পেটে দিনে ১ বার খাবে।',
    formulations: [
      {
        name: 'Dry Suspension 200 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 40,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Zimax Susp', 'Azyth Susp', 'Tridosil Susp', 'Zithrin Susp']
      },
      {
        name: 'Paediatric Drops 100 mg / 1 ml',
        formType: 'drops',
        concentrationMgPerMl: 100,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Zimax Drops', 'Azyth Drops']
      },
      {
        name: 'Tablet 250 mg',
        formType: 'tablet',
        mgPerUnit: 250,
        unitLabel: 'tablet',
        bdBrands: ['Zimax 250mg', 'Azyth 250mg']
      },
      {
        name: 'Tablet 500 mg',
        formType: 'tablet',
        mgPerUnit: 500,
        unitLabel: 'tablet',
        bdBrands: ['Zimax 500mg', 'Azyth 500mg']
      }
    ]
  },
  {
    id: 'ciprofloxacin',
    genericName: 'Ciprofloxacin',
    banglaName: 'সিপ্রোফ্লক্সাসিন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Ciprocin', 'Neofloxin', 'Beuflox', 'Flontin'],
    manufacturerNotes: 'Square (Ciprocin), Beximco (Neofloxin), Incepta (Beuflox)',
    indication: 'WHO / ICDDR,B first-line for acute invasive diarrhea / Shigella dysentery, complicated UTI, Pseudomonas',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 30,
    minDoseMg: 20,
    maxDoseMg: 30,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 2 doses daily (BID every 12 hr)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (প্রতি ১২ ঘণ্টা পর পর) - প্রচুর পানি সহ খাবে',
    englishSchedule: 'Every 12 hours with plenty of fluids for 3-5 days (dysentery) or 7-10 days (UTI)',
    standardDurationDays: '3 days for Shigellosis; 7-10 days for UTI',
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 1000,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'Approved by WHO/ICDDR,B for pediatric Shigella bloody diarrhea. Benefits outweigh theoretical cartilage toxicity concerns.',
      'Do not administer simultaneously with antacids, iron, zinc, or milk (decreases fluoroquinolone absorption by 50-80%). Separate by at least 2 hours.'
    ],
    clinicalTips: [
      'For acute invasive diarrhea (blood in stool): 15 mg/kg BID for 3 days cures Shigellosis.',
      'High resistance rates for Typhoid in Bangladesh; Azithromycin or Cefixime is generally preferred for Typhoid unless culture-proven sensitive.'
    ],
    banglaPrescriptionTemplate: 'রক্ত আমাশয়ে ৩ দিন খাবে। দুধ বা আয়রনের সাথে একসাথে খাবেন না।',
    formulations: [
      {
        name: 'Suspension 250 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 50,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Ciprocin Susp', 'Neofloxin Susp']
      },
      {
        name: 'Tablet 250 mg',
        formType: 'tablet',
        mgPerUnit: 250,
        unitLabel: 'tablet',
        bdBrands: ['Ciprocin 250mg', 'Neofloxin 250mg']
      },
      {
        name: 'Tablet 500 mg',
        formType: 'tablet',
        mgPerUnit: 500,
        unitLabel: 'tablet',
        bdBrands: ['Ciprocin 500mg', 'Neofloxin 500mg']
      }
    ]
  },
  {
    id: 'cotrimoxazole',
    genericName: 'Cotrimoxazole (Trimethoprim + Sulfamethoxazole)',
    banglaName: 'কো-ট্রাইমক্সাজল',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Cotrim', 'B-Trim', 'Septra', 'Trimolin'],
    manufacturerNotes: 'Beximco, Square, Glaxo, Acme',
    indication: 'Pneumocystis jirovecii (PJP) prophylaxis/treatment, Stenotrophomonas, CA-MRSA, uncomplicated UTI',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 8,
    minDoseMg: 6,
    maxDoseMg: 12,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 2 doses daily (BID every 12 hr)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (প্রতি ১২ ঘণ্টা পর পর) - প্রচুর পানি সহ খাবে',
    englishSchedule: 'Every 12 hours with adequate hydration (dosed on TMP component)',
    standardDurationDays: '5 to 7 days',
    maxSingleDoseMg: 160,
    maxDailyDoseMg: 320,
    neonatalSafety: 'contraindicated',
    ageMinMonths: 2,
    warnings: [
      'STRICT CONTRAINDICATION in infants < 6-8 weeks due to risk of kernicterus (sulfonamides displace bilirubin).',
      'Contraindicated in severe G6PD deficiency (risk of acute hemolytic anemia).'
    ],
    clinicalTips: [
      'Standard suspension is 240 mg/5 ml (40 mg TMP + 200 mg SMX). Dosing is calculated based on Trimethoprim (TMP: 6-10 mg/kg/day).',
      'Encourage generous fluid intake to prevent crystalluria.'
    ],
    banglaPrescriptionTemplate: 'প্রচুর পানি পান করাবেন। বাচ্চার বয়স ২ মাসের কম হলে নিষিদ্ধ।',
    formulations: [
      {
        name: 'Suspension 240 mg / 5 ml (40mg TMP + 200mg SMX)',
        formType: 'suspension',
        concentrationMgPerMl: 8, // based on TMP component
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Cotrim Susp', 'B-Trim Susp']
      },
      {
        name: 'Tablet (80mg TMP + 400mg SMX)',
        formType: 'tablet',
        mgPerUnit: 80,
        unitLabel: 'tablet',
        bdBrands: ['Cotrim Tab', 'B-Trim Tab']
      },
      {
        name: 'DS Tablet (160mg TMP + 800mg SMX)',
        formType: 'tablet',
        mgPerUnit: 160,
        unitLabel: 'tablet',
        bdBrands: ['Cotrim DS', 'B-Trim DS']
      }
    ]
  },
  {
    id: 'metronidazole',
    genericName: 'Metronidazole',
    banglaName: 'মেট্রোনিডাজল',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Filmet', 'Amodis', 'Flamyd', 'Metro', 'Dyzole'],
    manufacturerNotes: 'Square (Filmet), Beximco (Amodis), Incepta (Flamyd)',
    indication: 'Amoebiasis (E. histolytica), Giardiasis, anaerobic intra-abdominal infections, C. difficile',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 35,
    minDoseMg: 30,
    maxDoseMg: 50,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 3 doses daily (TID every 8 hr with food)',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'দিনে ৩ বার (প্রতি ৮ ঘণ্টা পর পর) - অবশ্যই খাবার পর খাবে',
    englishSchedule: 'Every 8 hours with food for 5 days (Giardiasis) or 7-10 days (Amoebiasis)',
    standardDurationDays: '5 to 10 days',
    maxSingleDoseMg: 800,
    maxDailyDoseMg: 2000,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'Do NOT prescribe indiscriminately for simple acute watery diarrhea (ICDDR,B warning: only indicate if trophozoites seen or proven giardiasis/amoebiasis).',
      'Give with food to decrease metallic taste and nausea.'
    ],
    clinicalTips: [
      'Giardiasis: 15 mg/kg/day divided TID for 5-7 days.',
      'Amoebic dysentery / liver abscess: 35-50 mg/kg/day divided TID for 7-10 days.'
    ],
    banglaPrescriptionTemplate: 'খাবার ঠিক পরে খাবে। মুখে ধাতব স্বাদ লাগতে পারে।',
    formulations: [
      {
        name: 'Suspension 200 mg / 5 ml (Benzoate)',
        formType: 'suspension',
        concentrationMgPerMl: 40,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Filmet Susp', 'Amodis Susp', 'Flamyd Susp']
      },
      {
        name: 'Tablet 200 mg',
        formType: 'tablet',
        mgPerUnit: 200,
        unitLabel: 'tablet',
        bdBrands: ['Filmet 200mg', 'Amodis 200mg']
      },
      {
        name: 'Tablet 400 mg',
        formType: 'tablet',
        mgPerUnit: 400,
        unitLabel: 'tablet',
        bdBrands: ['Filmet 400mg', 'Amodis 400mg']
      },
      {
        name: 'IV Infusion 500 mg / 100 ml',
        formType: 'injection',
        concentrationMgPerMl: 5,
        unitLabel: 'ml',
        bdBrands: ['Filmet IV', 'Amodis IV']
      }
    ]
  },
  {
    id: 'ampicillin',
    genericName: 'Ampicillin (IV / IM)',
    banglaName: 'এম্পিসিলিন ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Ampicin', 'Pen-A', 'Fimopen'],
    manufacturerNotes: 'Square (Ampicin), Beximco (Pen-A)',
    indication: 'WHO first-line empirical therapy for neonatal sepsis (combined with Gentamicin), Listeria monocytogenes, Group B Strep',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 100,
    minDoseMg: 100,
    maxDoseMg: 200,
    doseUnit: 'mg/kg/day',
    frequency: 'Neonate < 7 days: Q12H; Neonate >= 7 days: Q8H; Meningitis: Q6H (200 mg/kg/day)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'শিরাপথে প্রতি ১২ ঘণ্টা (বয়স < ৭ দিন) বা প্রতি ৮ ঘণ্টা (বয়স ≥ ৭ দিন) পর পর',
    englishSchedule: 'IV slow push Q12H (first week of life) or Q8H (age >= 7d) for 7-10 days',
    standardDurationDays: '7 to 14 days',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 12000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'First-line regimen for early-onset neonatal sepsis is IV Ampicillin + IV Gentamicin.',
      'Check for penicillin allergy.'
    ],
    clinicalTips: [
      'In neonatal meningitis: increase dose to 200-300 mg/kg/day divided Q6-8H to cross blood-brain barrier.'
    ],
    banglaPrescriptionTemplate: 'শিরাপথে হাসপাতালে ভর্তি রেখে অভিজ্ঞ নার্স দ্বারা দিতে হবে।',
    formulations: [
      {
        name: 'IV Injection (50 mg/ml) — 250 mg in 5 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 250,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 250 mg vial in 5 ml sterile water -> 50 mg/ml solution. Draw exact ml into syringe.',
        bdBrands: ['Ampicin 250mg', 'Pen-A 250mg']
      },
      {
        name: 'IV Injection (100 mg/ml) — 500 mg in 5 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 100,
        mgPerUnit: 500,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 500 mg vial in 5 ml sterile water -> 100 mg/ml solution. Draw exact ml into syringe.',
        bdBrands: ['Ampicin 500mg', 'Pen-A 500mg']
      }
    ]
  },
  {
    id: 'gentamicin',
    genericName: 'Gentamicin (IV / IM Aminoglycoside)',
    banglaName: 'জেন্টামাইসিন ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Gentabac', 'Genthin', 'Gentasep'],
    manufacturerNotes: 'Square, Incepta, Acme',
    indication: 'Neonatal sepsis (Gram-negative coverage alongside Ampicillin), serious Gram-negative bacteremia, pyelonephritis',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 5,
    minDoseMg: 4,
    maxDoseMg: 7.5,
    doseUnit: 'mg/kg/day',
    frequency: 'Term neonate / Child: Once daily (OD) every 24 hr; Preterm < 32 wk: every 36-48 hr',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'শিরায় বা মাংসে দিনে ১ বার (প্রতি ২৪ ঘণ্টা পর পর) - ধীরে ধীরে ইনফিউশন',
    englishSchedule: 'IV slow infusion once daily (OD every 24 hr) for 7-10 days',
    standardDurationDays: '5 to 7 days',
    maxSingleDoseMg: 240,
    maxDailyDoseMg: 300,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Ototoxic and nephrotoxic. Avoid prolonged courses (>7-10 days) without monitoring serum levels.',
      'Ensure adequate hydration; dose must be extended in renal insufficiency or asphyxiated neonates.',
      'Extended interval once-daily dosing (OD every 24 hr) provides equal efficacy with less toxicity.'
    ],
    clinicalTips: [
      'Term neonate (>=37 wks): 5 mg/kg IV once every 24 hr.',
      'Preterm (<32 wks): 4-5 mg/kg IV once every 36 hr.',
      'Infuse slowly over 30-60 minutes in Normal Saline or 5% Dextrose.'
    ],
    banglaPrescriptionTemplate: 'শিরাপথে দিনে একবার। কোর্স ৫-৭ দিনের বেশি নয়।',
    formulations: [
      {
        name: 'Ampoule 20 mg / 2 ml (Pediatric)',
        formType: 'injection',
        concentrationMgPerMl: 10,
        unitLabel: 'ml',
        bdBrands: ['Gentabac 20mg/2ml', 'Genthin 20mg/2ml']
      },
      {
        name: 'Ampoule 80 mg / 2 ml',
        formType: 'injection',
        concentrationMgPerMl: 40,
        unitLabel: 'ml',
        bdBrands: ['Gentabac 80mg/2ml', 'Genthin 80mg/2ml']
      }
    ]
  },

  // ==========================================
  // RESPIRATORY & BRONCHODILATORS
  // ==========================================
  {
    id: 'salbutamol',
    genericName: 'Salbutamol (Albuterol)',
    banglaName: 'সালবিউটামল',
    category: 'respiratory',
    categoryLabel: 'Respiratory & Bronchodilators',
    popularBDBrands: ['Ventolin', 'Sultolin', 'Respolin', 'Asmasol'],
    manufacturerNotes: 'GlaxoSmithKline (Ventolin), Square (Sultolin), Beximco (Asmasol)',
    indication: 'Acute bronchospasm, pediatric asthma exacerbation, viral wheeze (age > 1 yr)',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 0.15,
    minDoseMg: 0.1,
    maxDoseMg: 0.2,
    doseUnit: 'mg/kg/dose',
    frequency: 'Oral: Every 6 to 8 hours (TID). Inhalation/Nebulization: Every 20 min in acute emergency',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'সিরাপ: দিনে ৩ বার (প্রতি ৮ ঘণ্টা পর পর)। নেবুলাইজার: জরুরি প্রয়োজনে ২০ মিনিট পর পর।',
    englishSchedule: 'Syrup: TID (every 8 hr). Nebulizer solution: 2.5mg (<5y) or 5mg (>5y) in 2.5ml NS',
    standardDurationDays: '3 to 7 days',
    maxSingleDoseMg: 4,
    maxDailyDoseMg: 12,
    neonatalSafety: 'caution',
    ageMinMonths: 6,
    warnings: [
      'Inhaled route (MDI with valved holding chamber spacer or nebulization) is FAR SUPERIOR to oral syrup with faster onset and fewer tremors/tachycardia.',
      'Oral syrup commonly causes tremors, restlessness, and sinus tachycardia.',
      'Not recommended in acute bronchiolitis under 1 year unless documented bronchodilator responsiveness.'
    ],
    clinicalTips: [
      'For Acute Asthma: Nebulization with Respirator Solution (5 mg/ml): Age < 5 yr: 0.5 ml (2.5 mg) + 2 ml Normal Saline; Age >= 5 yr: 1.0 ml (5 mg) + 2 ml Normal Saline.',
      'For MDI Inhaler: 2-4 puffs via baby mask spacer (up to 6-10 puffs in acute severe attack).'
    ],
    banglaPrescriptionTemplate: 'স্পেসার মাস্ক দিয়ে ইনহেলার বা নেবুলাইজেশন মুখে খাওয়ার সিরাপের চেয়ে অনেক বেশি কার্যকরী।',
    formulations: [
      {
        name: 'Syrup 2 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 0.4,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Sultolin Syr', 'Ventolin Syr', 'Asmasol Syr']
      },
      {
        name: 'Nebulizer Solution 5 mg / 1 ml (0.5%)',
        formType: 'respule',
        concentrationMgPerMl: 5,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Sultolin Respirator Sol', 'Ventolin Respirator Sol']
      },
      {
        name: 'Inhaler MDI (100 mcg / puff)',
        formType: 'inhaler',
        unitLabel: 'puff',
        bdBrands: ['Sultolin Inhaler', 'Ventolin Inhaler', 'Asmasol Inhaler']
      }
    ]
  },
  {
    id: 'ipratropium',
    genericName: 'Ipratropium Bromide (Anticholinergic)',
    banglaName: 'ইপ্রাট্রোপিয়াম ব্রোমাইড',
    category: 'respiratory',
    categoryLabel: 'Respiratory & Bronchodilators',
    popularBDBrands: ['Ipratrop', 'Atrovent', 'Iprabid'],
    manufacturerNotes: 'Beximco, Square, Incepta',
    indication: 'Acute severe pediatric asthma exacerbation (add-on to Salbutamol)',
    doseType: 'fixed_by_age',
    defaultDoseMg: 0.25,
    minDoseMg: 0.125,
    maxDoseMg: 0.5,
    doseUnit: 'mg/dose',
    frequency: 'Every 20 minutes for first hour (3 doses) combined with Salbutamol, then Q4-6H PRN',
    frequencyTimesPerDay: 4,
    banglaSchedule: 'তীব্র হাঁপানিতে সালবিউটামলের সাথে নেবুলাইজেশন দিতে হবে',
    englishSchedule: 'Nebulize with Salbutamol every 20-30 min in first hour of acute severe asthma',
    standardDurationDays: '1 to 2 days',
    maxSingleDoseMg: 0.5,
    neonatalSafety: 'caution',
    ageMinMonths: 12,
    warnings: [
      'Use only by nebulization/inhalation. Combine with Salbutamol for synergistic bronchodilation in moderate-to-severe attacks.',
      'Protect eyes from mist (can cause mydriasis / blurred vision).'
    ],
    clinicalTips: [
      'Dose: Children < 5 years: 125–250 mcg (0.5–1.0 ml of 250 mcg/ml solution).',
      'Children >= 5 years: 250–500 mcg (1–2 ml).'
    ],
    banglaPrescriptionTemplate: 'নেবুলাইজারের চেম্বারে সালবিউটামল এবং নরমাল স্যালাইনের সাথে মিশিয়ে দিন।',
    formulations: [
      {
        name: 'Nebulizer Solution 250 mcg / 1 ml (0.025%)',
        formType: 'respule',
        concentrationMgPerMl: 0.25,
        unitLabel: 'ml',
        bdBrands: ['Ipratrop Resp Sol', 'Iprabid Resp Sol']
      }
    ]
  },
  {
    id: 'budesonide_respules',
    genericName: 'Budesonide (Inhaled Corticosteroid)',
    banglaName: 'বুডেসোনাইড রেসপিউল',
    category: 'respiratory',
    categoryLabel: 'Respiratory & Bronchodilators',
    popularBDBrands: ['Pulmicort', 'Budicort', 'Budecon'],
    manufacturerNotes: 'AstraZeneca, Square (Budicort), Beximco',
    indication: 'Croup (acute laryngotracheobronchitis), recurrent wheeze / asthma control, acute severe wheeze',
    doseType: 'fixed_by_age',
    defaultDoseMg: 0.5,
    minDoseMg: 0.25,
    maxDoseMg: 2.0,
    doseUnit: 'mg/dose',
    frequency: 'Croup: 2 mg single dose. Maintenance: 0.25 - 0.5 mg BID',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'নেবুলাইজারের মাধ্যমে দিনে ১-২ বার। ক্রুপ হলে এককালীন ২ মিলিগ্রাম।',
    englishSchedule: 'Nebulized BID for asthma/wheeze; 2 mg stat for acute croup (laryngotracheobronchitis)',
    standardDurationDays: '5 to 14 days or ongoing maintenance',
    maxSingleDoseMg: 2.0,
    neonatalSafety: 'safe',
    ageMinMonths: 6,
    warnings: [
      'Rinse mouth / face after administration to prevent oral candidiasis (thrush) and facial dermatitis.'
    ],
    clinicalTips: [
      'For Croup (stridor at rest, barking cough): Single 2 mg nebulized dose is as effective as oral Dexamethasone.',
      'For pediatric asthma exacerbation: 0.5 - 1 mg nebulized Q12H speeds recovery.'
    ],
    banglaPrescriptionTemplate: 'নেবুলাইজ করার পর বাচ্চার মুখ ও ঠোঁট ভেজা সুতি কাপড় দিয়ে মুছে দিন।',
    formulations: [
      {
        name: 'Respules 0.5 mg / 2 ml',
        formType: 'respule',
        concentrationMgPerMl: 0.25,
        unitLabel: 'respule',
        bdBrands: ['Budicort 0.5mg Respule', 'Pulmicort 0.5mg']
      },
      {
        name: 'Respules 1.0 mg / 2 ml',
        formType: 'respule',
        concentrationMgPerMl: 0.5,
        unitLabel: 'respule',
        bdBrands: ['Budicort 1mg Respule', 'Pulmicort 1mg']
      }
    ]
  },
  {
    id: 'montelukast',
    genericName: 'Montelukast Sodium',
    banglaName: 'মন্টেলুকাস্ট',
    category: 'respiratory',
    categoryLabel: 'Respiratory & Bronchodilators',
    popularBDBrands: ['Monas', 'Montene', 'Provair', 'Odmon', 'Acrokast'],
    manufacturerNotes: 'Square (Monas), Beximco (Montene), Incepta (Provair), Renata (Odmon)',
    indication: 'Prophylaxis and chronic management of pediatric asthma, allergic rhinitis, exercise-induced bronchospasm',
    doseType: 'fixed_by_age',
    defaultDoseMg: 4,
    minDoseMg: 4,
    maxDoseMg: 10,
    doseUnit: 'mg/dose',
    frequency: 'Once daily at bedtime (OD HS)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'রাতে ঘুমানোর আগে ১ বার (চিবিয়ে বা পানির সাথে)',
    englishSchedule: 'Once daily in the evening at bedtime',
    standardDurationDays: '1 to 3 months for asthma maintenance',
    maxSingleDoseMg: 10,
    neonatalSafety: 'contraindicated',
    ageMinMonths: 6,
    warnings: [
      'Not indicated for acute asthma attacks (slow onset of action).',
      'Neuropsychiatric caution: monitor for sleep disturbances, nightmares, irritability, or mood changes.'
    ],
    clinicalTips: [
      'Age 6 months - 5 years: 4 mg daily (oral granules / chewable tablet).',
      'Age 6 - 14 years: 5 mg daily (chewable tablet).',
      'Age >= 15 years: 10 mg daily (tablet).'
    ],
    banglaPrescriptionTemplate: 'রাতে শোয়ার আগে খাবে। তীব্র হাঁপানির সময় এটি তাত্ক্ষণিক কাজ করবে না।',
    formulations: [
      {
        name: 'Sachet 4 mg (Oral Granules for < 2 yr)',
        formType: 'sachet',
        mgPerUnit: 4,
        unitLabel: 'sachet',
        bdBrands: ['Monas 4mg Sachet', 'Montene 4mg Sachet', 'Provair 4mg Granules']
      },
      {
        name: 'Chewable Tablet 4 mg (Age 2-5 yr)',
        formType: 'tablet',
        mgPerUnit: 4,
        unitLabel: 'tablet',
        bdBrands: ['Monas 4mg Chewable', 'Montene 4mg', 'Provair 4mg', 'Odmon 4mg']
      },
      {
        name: 'Chewable Tablet 5 mg (Age 6-14 yr)',
        formType: 'tablet',
        mgPerUnit: 5,
        unitLabel: 'tablet',
        bdBrands: ['Monas 5mg Chewable', 'Montene 5mg', 'Provair 5mg']
      },
      {
        name: 'Tablet 10 mg (Age >= 15 yr)',
        formType: 'tablet',
        mgPerUnit: 10,
        unitLabel: 'tablet',
        bdBrands: ['Monas 10mg', 'Montene 10mg']
      }
    ]
  },

  // ==========================================
  // ANTIHISTAMINES & ALLERGY
  // ==========================================
  {
    id: 'cetirizine',
    genericName: 'Cetirizine Hydrochloride (2nd Gen Antihistamine)',
    banglaName: 'সেটিরিজিন',
    category: 'antihistamine',
    categoryLabel: 'Antihistamines & Allergy',
    popularBDBrands: ['Alatrol', 'Cetriz', 'Atrizin', 'Rhino', 'Cetriler'],
    manufacturerNotes: 'Square (Alatrol), Beximco (Cetriz), Incepta (Atrizin)',
    indication: 'Allergic rhinitis, urticaria, pruritus, allergic conjunctivitis',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 0.25,
    minDoseMg: 0.25,
    maxDoseMg: 0.5,
    doseUnit: 'mg/kg/day',
    frequency: 'Once daily (OD) or divided BID (every 12 hr)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'দিনে ১ বার (রাতে ঘুমানোর আগে) অথবা দিনে ২ বার',
    englishSchedule: 'Once daily at bedtime or divided BID for 5-10 days',
    standardDurationDays: '5 to 7 days',
    maxSingleDoseMg: 10,
    maxDailyDoseMg: 10,
    neonatalSafety: 'contraindicated',
    ageMinMonths: 6,
    warnings: [
      'Age guideline: 6-12 months: 2.5 mg once daily; 1-2 years: 2.5 mg OD or BID; 2-5 years: 5 mg daily; >6 years: 10 mg daily.',
      'Less sedating than 1st generation antihistamines, but may still cause mild drowsiness.'
    ],
    clinicalTips: [
      'Drops (10 mg/ml): 0.25 ml = 2.5 mg (ideal for infants 6-12 months).',
      'Syrup (5 mg/5 ml): 2.5 ml = 2.5 mg (half teaspoon).'
    ],
    banglaPrescriptionTemplate: 'রাতে শোয়ার আগে খাবে। কিছুটা ঝিমুনি হতে পারে।',
    formulations: [
      {
        name: 'Syrup 5 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 1.0,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Alatrol Syr', 'Cetriz Syr', 'Atrizin Syr']
      },
      {
        name: 'Paediatric Drops 10 mg / 1 ml',
        formType: 'drops',
        concentrationMgPerMl: 10.0,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Alatrol Drops', 'Cetriz Drops', 'Atrizin Drops']
      },
      {
        name: 'Tablet 10 mg',
        formType: 'tablet',
        mgPerUnit: 10,
        unitLabel: 'tablet',
        bdBrands: ['Alatrol 10mg', 'Cetriz 10mg']
      }
    ]
  },
  {
    id: 'fexofenadine',
    genericName: 'Fexofenadine Hydrochloride (Non-sedating Antihistamine)',
    banglaName: 'ফেক্সোফেনাডিন',
    category: 'antihistamine',
    categoryLabel: 'Antihistamines & Allergy',
    popularBDBrands: ['Fexo', 'Fenofex', 'Axodin', 'Rhinil'],
    manufacturerNotes: 'Square (Fexo), Beximco (Fenofex), Incepta (Axodin)',
    indication: 'Allergic rhinitis, chronic idiopathic urticaria (strictly non-sedating)',
    doseType: 'fixed_by_age',
    defaultDoseMg: 30,
    minDoseMg: 15,
    maxDoseMg: 60,
    doseUnit: 'mg/dose',
    frequency: 'Twice daily (BID every 12 hr)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (প্রতি ১২ ঘণ্টা পর পর) - খাবারের সাথে বা ছাড়া',
    englishSchedule: 'Every 12 hours (BID) for 5-10 days',
    standardDurationDays: '5 to 10 days',
    maxSingleDoseMg: 60,
    maxDailyDoseMg: 120,
    neonatalSafety: 'contraindicated',
    ageMinMonths: 6,
    warnings: [
      'Do NOT take with fruit juices (apple, orange, grapefruit) as they decrease bioavailability by 35%. Take with water.',
      'Age 6 months - 2 years: 15 mg BID (2.5 ml of 30mg/5ml susp).',
      'Age 2 - 11 years: 30 mg BID (5 ml / 1 tsp of 30mg/5ml susp).',
      'Age >= 12 years: 60 mg BID or 120 mg OD.'
    ],
    clinicalTips: [
      'True non-sedating antihistamine: does not cross blood-brain barrier.',
      'Preferred choice in school-going children to prevent daytime sleepiness.'
    ],
    banglaPrescriptionTemplate: 'পানি দিয়ে খাবেন। ফলের রসের সাথে খাওয়া যাবে না। ঘুম ধরবে না।',
    formulations: [
      {
        name: 'Suspension 30 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 6,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Fexo Susp', 'Fenofex Susp', 'Axodin Susp']
      },
      {
        name: 'Tablet 60 mg',
        formType: 'tablet',
        mgPerUnit: 60,
        unitLabel: 'tablet',
        bdBrands: ['Fexo 60mg', 'Fenofex 60mg']
      },
      {
        name: 'Tablet 120 mg',
        formType: 'tablet',
        mgPerUnit: 120,
        unitLabel: 'tablet',
        bdBrands: ['Fexo 120mg', 'Fenofex 120mg']
      }
    ]
  },

  // ==========================================
  // GASTROINTESTINAL & REHYDRATION
  // ==========================================
  {
    id: 'zinc_sulphate',
    genericName: 'Zinc Sulphate / Zinc Acetate (ICDDR,B & WHO Protocol)',
    banglaName: 'জিঙ্ক সালফেট (ডায়রিয়া প্রোটোকল)',
    category: 'gastrointestinal',
    categoryLabel: 'Gastrointestinal & Rehydration',
    popularBDBrands: ['Baby Zinc', 'Zif-S', 'Zes', 'Pe-Zinc', 'Zincat'],
    manufacturerNotes: 'Square (Baby Zinc), Incepta (Zif-S), Beximco (Zes), Acme (Pe-Zinc)',
    indication: 'MANDATORY for all pediatric diarrhea cases (WHO/ICDDR,B), promotes mucosal repair and reduces recurrence for 3 months',
    doseType: 'fixed_by_age',
    defaultDoseMg: 20,
    minDoseMg: 10,
    maxDoseMg: 20,
    doseUnit: 'mg/dose',
    frequency: 'Once daily (OD) for FULL 10-14 days regardless of when diarrhea stops',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'টানা ১০-১৪ দিন খাবে। বয়স ৬ মাসের নিচে: ১০ মি.গ্রা. (১ চামচ); বয়স ৬ মাসের বেশি: ২০ মি.গ্রা. (২ চামচ বা ১টি বড়ি)',
    englishSchedule: 'Age < 6 months: 10 mg/day; Age >= 6 months: 20 mg/day for 14 continuous days',
    standardDurationDays: '14 continuous days',
    maxSingleDoseMg: 20,
    maxDailyDoseMg: 20,
    neonatalSafety: 'safe',
    ageMinMonths: 1,
    warnings: [
      'CRITICAL: Must be continued for the entire 10-14 days even after diarrhea stops to boost mucosal immunity.',
      'Give between meals or with food if it causes mild nausea or vomiting.',
      'Dispersible tablet can be dissolved in a teaspoon of clean water or breastmilk.'
    ],
    clinicalTips: [
      'Reduces diarrhea duration by 25% and reduces subsequent diarrhea episodes for up to 3 months.',
      'Standard BD syrup is 10 mg elemental zinc / 5 ml. Dispersible tablet is 20 mg.'
    ],
    banglaPrescriptionTemplate: 'ডায়রিয়া ভালো হয়ে গেলেও অবশ্যই টানা ১৪ দিন নিয়ম করে খাওয়া শেষ করতে হবে।',
    formulations: [
      {
        name: 'Syrup 10 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 2.0,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Baby Zinc Syr', 'Zif-S Syr', 'Zes Syr', 'Pe-Zinc Syr']
      },
      {
        name: 'Dispersible Tablet 20 mg',
        formType: 'dispersible_tablet',
        mgPerUnit: 20,
        unitLabel: 'tablet',
        bdBrands: ['Baby Zinc 20mg Tab', 'Zif-S 20mg Tab', 'Zes 20mg Tab']
      }
    ]
  },
  {
    id: 'ondansetron',
    genericName: 'Ondansetron (5-HT3 Antagonist Antiemetic)',
    banglaName: 'অনডানসেট্রন',
    category: 'gastrointestinal',
    categoryLabel: 'Gastrointestinal & Rehydration',
    popularBDBrands: ['Emistat', 'Onset', 'Zolac', 'Emeset', 'Ondaron'],
    manufacturerNotes: 'Incepta (Emistat), Beximco (Onset), Square (Zolac)',
    indication: 'Persistent vomiting in acute gastroenteritis to facilitate oral rehydration therapy (ORT), post-chemo nausea',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 0.15,
    minDoseMg: 0.1,
    maxDoseMg: 0.15,
    doseUnit: 'mg/kg/dose',
    frequency: 'Oral or slow IV: Single dose before ORS trial, or every 8 hours PRN (Max 3 doses)',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'বমি বেশি হলে খাবার বা স্যালাইন দেওয়ার ৩০ মিনিট আগে ১ বার খাবে',
    englishSchedule: 'Single dose 0.15 mg/kg 30 min before ORS trial (or Q8H PRN)',
    standardDurationDays: '1 to 2 days PRN',
    maxSingleDoseMg: 8,
    maxDailyDoseMg: 16,
    neonatalSafety: 'caution',
    ageMinMonths: 6,
    warnings: [
      'Weight-tiered simplified single dose in acute gastroenteritis: Weight 8-15 kg: 2 mg (2.5 ml); 15-30 kg: 4 mg (5 ml); >30 kg: 8 mg.',
      'Caution in children with congenital long QT syndrome.'
    ],
    clinicalTips: [
      'Single dose facilitates successful oral rehydration and prevents hospital admission in 80% of vomiting children with diarrhea.',
      'Wait 30 minutes after giving Ondansetron before resuming oral rehydration solution (spoon by spoon).'
    ],
    banglaPrescriptionTemplate: 'ওষুধ খাওয়ানোর ৩০ মিনিট পর থেকে অল্প অল্প করে চামচে ওরস্যালাইন খাওয়ান।',
    formulations: [
      {
        name: 'Syrup 4 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 0.8,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Emistat Syr', 'Onset Syr', 'Zolac Syr']
      },
      {
        name: 'Injection 2 mg / 1 ml (Slow IV)',
        formType: 'injection',
        concentrationMgPerMl: 2.0,
        unitLabel: 'ml',
        bdBrands: ['Emistat IV', 'Onset IV']
      },
      {
        name: 'Tablet 4 mg',
        formType: 'tablet',
        mgPerUnit: 4,
        unitLabel: 'tablet',
        bdBrands: ['Emistat 4mg', 'Onset 4mg']
      }
    ]
  },
  {
    id: 'domperidone',
    genericName: 'Domperidone',
    banglaName: 'ডমপেরিডন',
    category: 'gastrointestinal',
    categoryLabel: 'Gastrointestinal & Rehydration',
    popularBDBrands: ['Deflux', 'Motigut', 'Vidon', 'Omidon', 'Don-A'],
    manufacturerNotes: 'Square (Deflux), Beximco (Motigut), Incepta (Vidon), Acme (Omidon)',
    indication: 'Gastroesophageal reflux (GERD), delayed gastric emptying, mild nausea',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 0.25,
    minDoseMg: 0.2,
    maxDoseMg: 0.4,
    doseUnit: 'mg/kg/dose',
    frequency: 'Every 8 hours (TID), 15-30 minutes BEFORE meals',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'দিনে ৩ বার (খাওয়ার ১৫-৩০ মিনিট আগে)',
    englishSchedule: 'TID 15-30 minutes before meals for 3-5 days',
    standardDurationDays: '3 to 5 days',
    maxSingleDoseMg: 10,
    maxDailyDoseMg: 30,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'Do not exceed 0.25 mg/kg TID or 35 mg/day due to risk of QT prolongation and ventricular arrhythmias.',
      'Must be taken strictly before feeds to stimulate gastric motility.',
      'Use for the shortest possible duration.'
    ],
    clinicalTips: [
      'Drops (5 mg/ml) is convenient for infants with gastroesophageal reflux.',
      '0.05 ml = 1 drop = 0.25 mg.'
    ],
    banglaPrescriptionTemplate: 'প্রতিবার দুধ বা খাবার খাওয়ানোর ১৫-৩০ মিনিট আগে খাবে।',
    formulations: [
      {
        name: 'Suspension 5 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 1.0,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Deflux Susp', 'Motigut Susp', 'Vidon Susp', 'Omidon Susp']
      },
      {
        name: 'Paediatric Drops 5 mg / 1 ml',
        formType: 'drops',
        concentrationMgPerMl: 5.0,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Deflux Drops', 'Motigut Drops', 'Vidon Drops']
      },
      {
        name: 'Tablet 10 mg',
        formType: 'tablet',
        mgPerUnit: 10,
        unitLabel: 'tablet',
        bdBrands: ['Deflux 10mg', 'Motigut 10mg']
      }
    ]
  },
  {
    id: 'albendazole',
    genericName: 'Albendazole (Broad Spectrum Anthelmintic)',
    banglaName: 'এলবেনডাজল (কৃমিনাশক)',
    category: 'gastrointestinal',
    categoryLabel: 'Gastrointestinal & Rehydration',
    popularBDBrands: ['Almex', 'Ben-A', 'Alben', 'Zentel'],
    manufacturerNotes: 'Square (Almex), Beximco (Ben-A), Incepta (Alben), GSK (Zentel)',
    indication: 'Intestinal helminthiasis (Ascaris, hookworm, whipworm, enterobius, pinworm)',
    doseType: 'fixed_by_age',
    defaultDoseMg: 400,
    minDoseMg: 200,
    maxDoseMg: 400,
    doseUnit: 'mg/dose',
    frequency: 'Single dose with fatty meal; repeat in 2 weeks for pinworm/enterobiasis',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'এককালীন ১ বার (খাওয়ার পর)। বয়স ১-২ বছর: ২০০ মি.গ্রা. (১ চামচ); বয়স >২ বছর: ৪০০ মি.গ্রা. (২ চামচ বা ১টি বড়ি)',
    englishSchedule: 'Single dose after meal. Age 1-2 years: 200 mg; Age >= 2 years: 400 mg single dose',
    standardDurationDays: 'Single dose (repeat after 2 weeks if heavy infestation or pinworm)',
    maxSingleDoseMg: 400,
    neonatalSafety: 'contraindicated',
    ageMinMonths: 12,
    warnings: [
      'CONTRAINDICATED in children under 1 year of age.',
      'Give with a fatty meal (e.g. whole milk, egg) to increase absorption if treating tissue parasites.',
      'Treat entire family if pinworm / enterobiasis is diagnosed.'
    ],
    clinicalTips: [
      'National Deworming Program in Bangladesh: 400 mg chewable tablet every 6 months for all school children >= 2 years.'
    ],
    banglaPrescriptionTemplate: 'রাতে ভারী খাবারের পর চিবিয়ে খাবে। ১ বছরের নিচের শিশুকে দেওয়া যাবে না।',
    formulations: [
      {
        name: 'Suspension 200 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 40,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Almex Susp', 'Ben-A Susp', 'Alben Susp']
      },
      {
        name: 'Chewable Tablet 400 mg',
        formType: 'tablet',
        mgPerUnit: 400,
        unitLabel: 'tablet',
        bdBrands: ['Almex 400mg', 'Ben-A 400mg', 'Alben 400mg']
      }
    ]
  },

  // ==========================================
  // CORTICOSTEROIDS
  // ==========================================
  {
    id: 'prednisolone',
    genericName: 'Prednisolone',
    banglaName: 'প্রেডনিসোলোন',
    category: 'corticosteroids',
    categoryLabel: 'Corticosteroids',
    popularBDBrands: ['Deltason', 'Pred', 'Prelone', 'Steron'],
    manufacturerNotes: 'Square (Deltason), Beximco (Pred), Incepta (Prelone)',
    indication: 'Acute asthma exacerbation, nephrotic syndrome, acute allergy / anaphylaxis step-down, autoimmune conditions',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 1.0,
    minDoseMg: 1.0,
    maxDoseMg: 2.0,
    doseUnit: 'mg/kg/day',
    frequency: 'Once daily in the morning with breakfast (or divided BID in acute asthma)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'সকালে ভরা পেটে ১ বার খাবে (টানা ৩-৫ দিন)',
    englishSchedule: 'Once daily with morning breakfast for 3-5 days (asthma flare)',
    standardDurationDays: '3 to 5 days for asthma flare (no taper needed if < 7 days)',
    maxSingleDoseMg: 60,
    maxDailyDoseMg: 60,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'Always take with food or milk to prevent gastritis.',
      'A short burst of 3-5 days in acute asthma does NOT require tapering and does not cause adrenal suppression.',
      'Nephrotic Syndrome protocol: 2 mg/kg/day (or 60 mg/m2/day, max 60mg) single morning dose until remission (protein-free for 3 consecutive days).'
    ],
    clinicalTips: [
      'Asthma burst: 1-2 mg/kg/day (max 40-60 mg) for 3-5 days speeds recovery and prevents relapse.'
    ],
    banglaPrescriptionTemplate: 'সকালে ভারী নাস্তার পর খাবে। হাঁপানিতে ৩-৫ দিনের সংক্ষিপ্ত কোর্সে হঠাৎ বন্ধ করলেও কোনো ক্ষতি হয় না।',
    formulations: [
      {
        name: 'Syrup 5 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 1.0,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Deltason Syr', 'Pred Syr', 'Prelone Syr']
      },
      {
        name: 'Tablet 5 mg',
        formType: 'tablet',
        mgPerUnit: 5,
        unitLabel: 'tablet',
        bdBrands: ['Deltason 5mg', 'Pred 5mg']
      },
      {
        name: 'Tablet 20 mg',
        formType: 'tablet',
        mgPerUnit: 20,
        unitLabel: 'tablet',
        bdBrands: ['Deltason 20mg', 'Pred 20mg']
      }
    ]
  },
  {
    id: 'dexamethasone',
    genericName: 'Dexamethasone',
    banglaName: 'ডেক্সামিথাসন',
    category: 'corticosteroids',
    categoryLabel: 'Corticosteroids',
    popularBDBrands: ['Decason', 'Oradexon', 'Dexa', 'Dexamethason', 'Dexicort'],
    manufacturerNotes: 'Square (Decason), Organon/Beximco',
    indication: 'Croup (acute laryngotracheobronchitis), bacterial meningitis (prior to antibiotics), cerebral edema',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 0.15,
    minDoseMg: 0.15,
    maxDoseMg: 0.6,
    doseUnit: 'mg/kg/dose',
    frequency: 'Croup: Single stat dose (0.15-0.6 mg/kg). Meningitis: 0.15 mg/kg Q6H for 2-4 days',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'ক্রুপে (ঘেউ ঘেউ কাশি ও শ্বাসকষ্ট) এককালীন ১ বার খাওয়ানো হয়',
    englishSchedule: 'Single dose 0.15-0.6 mg/kg PO/IM/IV for croup',
    standardDurationDays: '1 to 2 doses for croup; 2-4 days in meningitis',
    maxSingleDoseMg: 16,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'In Croup: A single dose of 0.15 mg/kg is as effective as 0.6 mg/kg.',
      'In Bacterial Meningitis: Give 0.15 mg/kg IV 15-30 minutes BEFORE or with the first dose of antibiotic (prevents sensorineural hearing loss).'
    ],
    clinicalTips: [
      'Injectable solution (5 mg/ml) can be given orally mixed in a small spoon of syrup if oral elixir is unavailable.'
    ],
    banglaPrescriptionTemplate: 'ক্রুপের তীব্র কাশিতে এককালীন সেবনযোগ্য।',
    formulations: [
      {
        name: 'Elixir / Syrup 0.5 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 0.1,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Decason Elixir', 'Oradexon Elixir']
      },
      {
        name: 'Injection 5 mg / 1 ml',
        formType: 'injection',
        concentrationMgPerMl: 5.0,
        unitLabel: 'ml',
        bdBrands: ['Decason Inj', 'Oradexon Inj']
      },
      {
        name: 'Tablet 0.5 mg',
        formType: 'tablet',
        mgPerUnit: 0.5,
        unitLabel: 'tablet',
        bdBrands: ['Decason 0.5mg']
      }
    ]
  },
  {
    id: 'hydrocortisone',
    genericName: 'Hydrocortisone Sodium Succinate (IV / IM)',
    banglaName: 'হাইড্রোকর্টিসোন ইনজেকশন',
    category: 'corticosteroids',
    categoryLabel: 'Corticosteroids',
    popularBDBrands: ['Solu-Cortef', 'Cortef', 'Hydrocort'],
    manufacturerNotes: 'Pfizer, Incepta, Square',
    indication: 'Anaphylaxis emergency, acute severe asthma (life-threatening), acute adrenal crisis, septic shock',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 4.0,
    minDoseMg: 2.0,
    maxDoseMg: 5.0,
    doseUnit: 'mg/kg/dose',
    frequency: 'IV bolus stat, then every 6 hours (Q6H) until switch to oral prednisolone',
    frequencyTimesPerDay: 4,
    banglaSchedule: 'জরুরি পরিস্থিতিতে শিরায় (IV) প্রতি ৬ ঘণ্টা পর পর',
    englishSchedule: 'IV slow push 4 mg/kg Q6H for 24-48 hours',
    standardDurationDays: '1 to 2 days',
    maxSingleDoseMg: 200,
    maxDailyDoseMg: 800,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'In Anaphylaxis: Adrenaline (Epinephrine IM) is ALWAYS the primary life-saving drug. Hydrocortisone is an adjunct to prevent biphasic late reaction.',
      'Reconstitute with Sterile Water for Injection.'
    ],
    clinicalTips: [
      'Fast-acting glucocorticoid with mineralocorticoid activity.',
      'Dosing: 4 mg/kg IV stat, followed by 2-4 mg/kg Q6H.'
    ],
    banglaPrescriptionTemplate: 'হাসপাতালের জরুরি বিভাগে শিরাপথে দিতে হবে।',
    formulations: [
      {
        name: 'IV Injection (50 mg/ml) — 100 mg in 2 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 100,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 100 mg vial in 2 ml sterile water -> 50 mg/ml solution. Draw exact ml into syringe.',
        bdBrands: ['Solu-Cortef 100mg', 'Hydrocort 100mg']
      }
    ]
  },
  {
    id: 'methylprednisolone',
    genericName: 'Methylprednisolone (IV / Oral)',
    banglaName: 'মিথাইলপ্রেডনিসোলোন (ইনজেকশন ও ট্যাবলেট)',
    category: 'corticosteroids',
    categoryLabel: 'Corticosteroids',
    popularBDBrands: ['Solu-Medrol', 'Medrol', 'Methyl-P', 'Prednil'],
    manufacturerNotes: 'Pfizer (Solu-Medrol / Medrol), Incepta (Methyl-P), Square (Prednil)',
    indication: 'Acute severe asthma / status asthmaticus, pulse therapy (Lupus nephritis, steroid-resistant nephrotic syndrome, acute demyelinating encephalomyelitis - ADEM, severe MIS-C), anaphylaxis, acute spinal cord trauma',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 2.0,
    minDoseMg: 1.0,
    maxDoseMg: 30.0,
    doseUnit: 'mg/kg/day',
    frequency: 'Status Asthmaticus: 1-2 mg/kg/day IV divided Q6H-Q12H (or loading 2 mg/kg stat). Pulse Therapy: 20-30 mg/kg/day (Max 1,000 mg) IV infusion over 1-2 hours once daily for 3 days',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'তীব্র হাঁপানী/স্ট্যাটাস অ্যাজমাটিকাস: ১-২ মিগ্রা/কেজি/দিন (৬-১২ ঘণ্টা পর পর শিরায়)। পালস থেরাপি: ২০-৩০ মিগ্রা/কেজি/ডোজ (সর্বোচ্চ ১,০০০ মিগ্রা) দিনে ১ বার টানা ৩ দিন ধীরে ধীরে শিরায় ইনফিউশন।',
    englishSchedule: 'Asthma/Anti-inflammatory: 1-2 mg/kg/day IV divided Q6-12H. High-Dose Pulse: 20-30 mg/kg/day (max 1g) IV infusion over 60-120 min once daily for 3 days',
    standardDurationDays: 'Asthma: 1-3 days IV (then oral prednisolone); Pulse: 3 consecutive days',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 1000,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'Pulse Therapy (20-30 mg/kg/dose, max 1000 mg) MUST be infused slowly over 60 to 120 minutes in 50-100 ml Normal Saline or 5% Dextrose. Rapid bolus can cause life-threatening cardiac arrhythmias, sudden hypotension, or cardiovascular collapse.',
      'Continuous cardiac and BP monitoring required during pulse infusion.',
      'Check baseline blood glucose, serum potassium, and blood pressure before starting.',
      'In acute severe asthma: 1-2 mg/kg/day (max 60 mg/day) IV divided 2-4 times daily produces potent bronchodilatory anti-inflammatory effect with less mineralocorticoid/fluid retention than hydrocortisone.'
    ],
    clinicalTips: [
      'Advantage over Hydrocortisone: 5 times more potent glucocorticoid with virtually zero mineralocorticoid (sodium/water retention) effect.',
      'Reconstitution of Solu-Medrol / Methyl-P Act-O-Vial: Press down on plastic activator to force diluent into lower chamber. Gently agitate to dissolve.',
      'High-dose Pulse Protocol: Give once daily in the morning for 3 consecutive days. Check BP every 15 min during infusion.'
    ],
    banglaPrescriptionTemplate: 'জরুরি বিভাগে শিরায় ইনজেকশন অথবা নেফ্রোলজি/রিউমাটোলজির বিশেষ নির্দেশনায় পালস থেরাপিতে প্রদেয়।',
    formulations: [
      {
        name: 'Solu-Medrol / Methyl-P IV Inj 40 mg / vial',
        formType: 'injection',
        concentrationMgPerMl: 40,
        mgPerUnit: 40,
        unitLabel: 'vial',
        reconstitutionNote: 'Dissolve in 1 ml sterile diluent provided -> 40 mg/ml.',
        bdBrands: ['Solu-Medrol 40mg', 'Methyl-P 40mg']
      },
      {
        name: 'Solu-Medrol / Methyl-P IV Inj 125 mg / vial',
        formType: 'injection',
        concentrationMgPerMl: 62.5,
        mgPerUnit: 125,
        unitLabel: 'vial',
        reconstitutionNote: 'Dissolve in 2 ml sterile diluent provided -> 62.5 mg/ml.',
        bdBrands: ['Solu-Medrol 125mg', 'Methyl-P 125mg']
      },
      {
        name: 'Solu-Medrol / Methyl-P IV Inj 500 mg / vial',
        formType: 'injection',
        concentrationMgPerMl: 62.5,
        mgPerUnit: 500,
        unitLabel: 'vial',
        reconstitutionNote: 'Dissolve in 8 ml sterile diluent provided -> 62.5 mg/ml. For pulse therapy: dilute in 50-100 ml NS/5% Dextrose and infuse over 1-2 hours.',
        bdBrands: ['Solu-Medrol 500mg', 'Methyl-P 500mg']
      },
      {
        name: 'Solu-Medrol IV Inj 1000 mg (1 g) / vial',
        formType: 'injection',
        concentrationMgPerMl: 62.5,
        mgPerUnit: 1000,
        unitLabel: 'vial',
        reconstitutionNote: 'Dissolve in 16 ml diluent provided. Dilute in 100-250 ml NS and infuse over 2 hours.',
        bdBrands: ['Solu-Medrol 1g']
      },
      {
        name: 'Medrol Tablet 4 mg',
        formType: 'tablet',
        mgPerUnit: 4,
        unitLabel: 'tablet',
        bdBrands: ['Medrol 4mg', 'Methyl-P 4mg']
      },
      {
        name: 'Medrol Tablet 16 mg',
        formType: 'tablet',
        mgPerUnit: 16,
        unitLabel: 'tablet',
        bdBrands: ['Medrol 16mg', 'Methyl-P 16mg']
      }
    ]
  },

  // ==========================================
  // ANTICONVULSANTS & EMERGENCY MEDICATIONS
  // ==========================================
  {
    id: 'diazepam',
    genericName: 'Diazepam (Rectal / IV)',
    banglaName: 'ডায়াজেপাম (খিঁচুনির জরুরি ওষুধ)',
    category: 'anticonvulsant_emergency',
    categoryLabel: 'Anticonvulsants & Emergency',
    popularBDBrands: ['Sedil', 'Easium', 'Relum'],
    manufacturerNotes: 'Square (Sedil), Beximco (Easium), Incepta',
    indication: 'Acute febrile convulsion, status epilepticus, acute sedation',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 0.3,
    minDoseMg: 0.2,
    maxDoseMg: 0.5,
    doseUnit: 'mg/kg/dose',
    frequency: 'Rectal: 0.5 mg/kg; IV: 0.2-0.3 mg/kg. May repeat once in 10 minutes if seizure persists',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'খিঁচুনির সময় পায়খানার রাস্তায় বা শিরায় আস্তে আস্তে দিতে হবে',
    englishSchedule: 'Rectal 0.5 mg/kg or Slow IV 0.2-0.3 mg/kg over 2-3 minutes. Max 10 mg',
    standardDurationDays: 'Stat rescue dose only',
    maxSingleDoseMg: 10,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'RISK OF RESPIRATORY DEPRESSION: Always have bag-valve-mask and oxygen ready before IV administration.',
      'Push IV slowly over 2-3 minutes (not exceeding 1-2 mg/min) into a large vein. Do NOT dilute in IV fluids (precipitates).',
      'For home rescue in febrile convulsions: Rectal Diazepam solution (draw up IV solution using needle-less syringe with catheter, lubricate and insert into rectum 3-5 cm, hold buttocks together for 2 minutes).'
    ],
    clinicalTips: [
      'Rectal dose: 0.5 mg/kg (under 2 yr: 5 mg; 2-5 yr: 5-7.5 mg; >5 yr: 10 mg).',
      'If seizure lasts > 5 minutes after 2nd dose, initiate second-line anticonvulsant (Phenytoin / Levetiracetam).'
    ],
    banglaPrescriptionTemplate: 'জরুরি খিঁচুনি থামানোর জন্য। পায়খানার রাস্তায় সুঁই ছাড়া সিরিঞ্জ দিয়ে দিতে হবে।',
    formulations: [
      {
        name: 'Ampoule 10 mg / 2 ml (IV / Rectal)',
        formType: 'injection',
        concentrationMgPerMl: 5.0,
        unitLabel: 'ml',
        bdBrands: ['Sedil 10mg/2ml', 'Easium 10mg/2ml']
      }
    ]
  },
  {
    id: 'midazolam',
    genericName: 'Midazolam (Buccal / Intranasal / IV)',
    banglaName: 'মিডাজোলাম (গালের পাশে / নাকে খিঁচুনির ওষুধ)',
    category: 'anticonvulsant_emergency',
    categoryLabel: 'Anticonvulsants & Emergency',
    popularBDBrands: ['Dormicum', 'Hypnofast', 'Midolam'],
    manufacturerNotes: 'Roche, Incepta (Hypnofast), Square (Midolam)',
    indication: 'First-line rescue for status epilepticus (superior and safer than rectal diazepam), procedural sedation',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 0.2,
    minDoseMg: 0.15,
    maxDoseMg: 0.3,
    doseUnit: 'mg/kg/dose',
    frequency: 'Buccal or Intranasal: 0.2 - 0.3 mg/kg stat; IV: 0.1 - 0.15 mg/kg',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'খিঁচুনির সময় গালের ভেতরের মাড়ি ও গালের খাঁজে ফোঁটা ফোঁটা দিতে হবে',
    englishSchedule: 'Buccal 0.2-0.3 mg/kg into cheek pouch, or Intranasal via atomizer (Max 10 mg)',
    standardDurationDays: 'Stat rescue dose only',
    maxSingleDoseMg: 10,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'BUCCAL ROUTE: Draw up injectable solution (5 mg/ml) into syringe WITHOUT needle. Squirt gently between child’s gum and lower cheek pouch. Absorbed directly across buccal mucosa.',
      'More socially acceptable, faster to administer, and more effective than rectal diazepam.'
    ],
    clinicalTips: [
      'Buccal dose guide: 3-11 months: 2.5 mg; 1-4 years: 5 mg; 5-9 years: 7.5 mg; >= 10 years: 10 mg.',
      'Monitor airway, breathing, and oxygen saturation.'
    ],
    banglaPrescriptionTemplate: 'সুঁই ছাড়া সিরিঞ্জে নিয়ে বাচ্চার গালের ভেতরে মাড়ি ও গালের ফাঁকে আস্তে পুশ করুন।',
    formulations: [
      {
        name: 'Ampoule 5 mg / 1 ml (IV / Buccal / Intranasal)',
        formType: 'injection',
        concentrationMgPerMl: 5.0,
        unitLabel: 'ml',
        bdBrands: ['Dormicum 5mg/ml', 'Hypnofast 5mg/ml']
      },
      {
        name: 'Ampoule 15 mg / 3 ml (5 mg / ml)',
        formType: 'injection',
        concentrationMgPerMl: 5.0,
        unitLabel: 'ml',
        bdBrands: ['Dormicum 15mg/3ml', 'Hypnofast 15mg/3ml']
      }
    ]
  },
  {
    id: 'phenobarbital',
    genericName: 'Phenobarbital (Phenobarbitone)',
    banglaName: 'ফেনোবারবিটাল (নবজাতকের খিঁচুনির প্রথম ওষুধ)',
    category: 'anticonvulsant_emergency',
    categoryLabel: 'Anticonvulsants & Emergency',
    popularBDBrands: ['Gardenal', 'Luminal', 'Phenobar'],
    manufacturerNotes: 'Sanofi (Gardenal), Square',
    indication: 'FIRST-LINE anticonvulsant for Neonatal Convulsions, status epilepticus in infants, maintenance antiepileptic',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 20,
    minDoseMg: 15,
    maxDoseMg: 20,
    doseUnit: 'mg/kg/dose',
    frequency: 'Loading dose: 20 mg/kg IV slow over 20 min. Maintenance: 3-5 mg/kg/day divided BID starting 12-24h after loading',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'নবজাতকের খিঁচুনিতে লোডিং ২০ মি.গ্রা./কেজি শিরায় ধীরে দিতে হবে',
    englishSchedule: 'IV loading 20 mg/kg over 20-30 min; maintenance 3-5 mg/kg/day divided BID',
    standardDurationDays: 'Loading dose stat; maintenance as prescribed',
    maxSingleDoseMg: 300,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'First-line drug of choice for NEONATAL seizures (hypoxic-ischemic encephalopathy, meningitis, metabolic).',
      'Infuse slowly over 20-30 minutes. Rapid push causes profound hypotension and respiratory arrest.'
    ],
    clinicalTips: [
      'If seizures continue after 20 mg/kg, may give additional 5-10 mg/kg up to a total of 40 mg/kg.',
      'Check blood glucose first (rule out hypoglycemia with 10% Dextrose).'
    ],
    banglaPrescriptionTemplate: 'হাসপাতালের স্পেশাল কেয়ার বেবি ইউনিটে (SCANU/NICU) মনিটরিংয়ে দিতে হবে।',
    formulations: [
      {
        name: 'Injection 200 mg / 1 ml',
        formType: 'injection',
        concentrationMgPerMl: 200,
        unitLabel: 'ml',
        bdBrands: ['Gardenal Inj 200mg/ml']
      },
      {
        name: 'Tablet 30 mg',
        formType: 'tablet',
        mgPerUnit: 30,
        unitLabel: 'tablet',
        bdBrands: ['Gardenal 30mg']
      },
      {
        name: 'Tablet 60 mg',
        formType: 'tablet',
        mgPerUnit: 60,
        unitLabel: 'tablet',
        bdBrands: ['Gardenal 60mg']
      }
    ]
  },
  {
    id: 'adrenaline',
    genericName: 'Adrenaline (Epinephrine 1:1,000 & 1:10,000)',
    banglaName: 'এড্রেনালিন ইনজেকশন',
    category: 'anticonvulsant_emergency',
    categoryLabel: 'Anticonvulsants & Emergency',
    popularBDBrands: ['Adrenaline SK+F', 'Adrenalin Incepta', 'EpiPen BD'],
    manufacturerNotes: 'SK+F, Incepta, Popular',
    indication: 'Anaphylaxis (IM 1:1,000), Cardiac Arrest / CPR (IV 1:10,000), Severe Croup / Stridor (Nebulized 1:1,000)',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 0.01,
    minDoseMg: 0.01,
    maxDoseMg: 0.01,
    doseUnit: 'mg/kg/dose',
    frequency: 'Anaphylaxis: 0.01 mg/kg (0.01 ml/kg of 1:1,000) IM into anterolateral thigh. Repeat every 5-15 min if needed',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'এনাফাইল্যাক্সিসে রানের বাইরের অংশে (IM) ০.০১ মিলি/কেজি ইনজেকশন দিতে হবে',
    englishSchedule: 'IM 0.01 ml/kg of 1:1,000 solution (0.01 mg/kg) stat into mid-anterolateral thigh. Max 0.3ml (<12y) or 0.5ml (>12y)',
    standardDurationDays: 'Emergency rescue',
    maxSingleDoseMg: 0.5,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'ANAPHYLAXIS ROUTE IS STRICTLY INTRAMUSCULAR (IM) in the anterolateral thigh (vastus lateralis). NEVER give IV bolus of 1:1,000 (causes fatal arrhythmias/stroke).',
      'For CARDIAC ARREST (PALS): IV/IO dose is 0.01 mg/kg of 1:10,000 dilution (0.1 ml/kg of 1:10,000).',
      'For SEVERE CROUP: 0.5 ml/kg of 1:1,000 (max 5 ml) nebulized with oxygen.'
    ],
    clinicalTips: [
      'Standard BD ampoule is 1 mg / 1 ml (1:1,000).',
      'Quick Anaphylaxis IM Dose Guide (1:1000): 10 kg child = 0.1 ml; 20 kg child = 0.2 ml; 30 kg child = 0.3 ml.'
    ],
    banglaPrescriptionTemplate: 'জরুরি জীবনরক্ষাকারী ওষুধ। রানের বাইরের মাংসে দ্রুত পুশ করতে হবে।',
    formulations: [
      {
        name: 'Ampoule 1 mg / 1 ml (1:1,000)',
        formType: 'injection',
        concentrationMgPerMl: 1.0,
        unitLabel: 'ml',
        bdBrands: ['Adrenaline 1mg/ml Ampoule']
      }
    ]
  },
  {
    id: 'dextrose_10',
    genericName: '10% Dextrose in Water (D10W)',
    banglaName: '১০% ডেক্সট্রোজ ওয়াটার (হাইপোগ্লাইসেমিয়ার চিকিৎসা)',
    category: 'anticonvulsant_emergency',
    categoryLabel: 'Anticonvulsants & Emergency',
    popularBDBrands: ['10% Dextrose Beximco', '10% DA Incepta', '10% Dextrose Orion'],
    manufacturerNotes: 'Beximco Pharma, Incepta, Orion, Popular',
    indication: 'Pediatric and neonatal acute symptomatic hypoglycemia (Blood Sugar < 2.6 mmol/L in neonate, < 3.0 mmol/L in child)',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 200, // 200 mg/kg = 2 ml/kg of 10% Dextrose
    minDoseMg: 200,
    maxDoseMg: 500,
    doseUnit: 'mg/kg/dose',
    frequency: 'Bolus: 2 ml/kg of 10% Dextrose IV slow push over 2-3 minutes, followed by maintenance infusion (GIR 5-8 mg/kg/min)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'রক্তে গ্লুকোজ কমে গেলে শিরায় ২ মিলি/কেজি আস্তে আস্তে পুশ করতে হবে',
    englishSchedule: 'IV bolus 2 ml/kg of 10% Dextrose over 2-3 minutes, then continuous IV infusion',
    standardDurationDays: 'Acute resuscitation',
    maxSingleDoseMg: 5000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'RULE OF 10: Always use 10% Dextrose at 2 ml/kg for bolus in children (gives 0.2 g/kg of glucose).',
      'NEVER use 25% or 50% Dextrose bolus in neonates or infants (causes severe rebound hyperinsulinemia, hyperosmolality, and intracranial hemorrhage). Dilute down to 10%!'
    ],
    clinicalTips: [
      'Recheck blood glucose 15-20 minutes after bolus.',
      'Once bolus is given, immediately start maintenance IV fluids containing dextrose to prevent rebound hypoglycemia.'
    ],
    banglaPrescriptionTemplate: 'জরুরি শিরাপথে ২ মিলি/কেজি হারে আস্তে পুশ করুন। ১৫ মিনিট পর সুগার মাপুন।',
    formulations: [
      {
        name: '10% Dextrose Water IV Infusion',
        formType: 'injection',
        concentrationMgPerMl: 100, // 100 mg/ml
        unitLabel: 'ml',
        bdBrands: ['10% Dextrose Infusion 500ml']
      }
    ]
  },

  // ==========================================
  // VITAMINS & MINERALS
  // ==========================================
  {
    id: 'elemental_iron',
    genericName: 'Iron (Carbonyl Iron / Iron Polymaltose / Ferrous Fumarate)',
    banglaName: 'আয়রন ড্রপ / সিরাপ',
    category: 'vitamins_minerals',
    categoryLabel: 'Vitamins & Minerals',
    popularBDBrands: ['Fefol-CI', 'Ipec', 'Ferix', 'Poliron', 'Foliron'],
    manufacturerNotes: 'Square (Fefol-CI), Beximco (Ipec), Incepta (Ferix), Aristopharma',
    indication: 'Treatment and prophylaxis of Iron Deficiency Anemia (IDA) in infants and children',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 3,
    minDoseMg: 3,
    maxDoseMg: 6,
    doseUnit: 'mg/kg/day',
    frequency: 'Treatment of IDA: 3-6 mg elemental iron/kg/day divided 1-2 times daily between meals with Vitamin C/citrus juice',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'দিনে ১-২ বার (খাবারের মধ্যবর্তী সময়ে অথবা লেবুর রসের সাথে)',
    englishSchedule: '3 to 6 mg elemental Fe/kg/day for 2-3 months after hemoglobin normalizes',
    standardDurationDays: '3 months',
    maxSingleDoseMg: 100,
    maxDailyDoseMg: 200,
    neonatalSafety: 'safe',
    ageMinMonths: 4,
    warnings: [
      'DOSE IS CALCULATED BASED ON ELEMENTAL IRON, not the total salt weight.',
      'Do NOT administer with milk, tea, or calcium supplements (blocks absorption by up to 70%).',
      'Advise parents that iron turns stools dark/black (harmless) and can temporarily stain teeth (give with a dropper to back of tongue, brush or rinse after).'
    ],
    clinicalTips: [
      'Prophylaxis in low birth weight / preterm infants (<2.5 kg): 2 mg elemental iron/kg/day starting from 4-6 weeks of age.',
      'Continue for 2-3 months after Hb reaches normal levels to replenish iron stores.'
    ],
    banglaPrescriptionTemplate: 'দুধ বা চায়ের সাথে খাওয়াবেন না। পায়খানা কালো হতে পারে, এতে ভয়ের কিছু নেই।',
    formulations: [
      {
        name: 'Syrup 50 mg Elemental Fe / 5 ml (Iron Polymaltose)',
        formType: 'syrup',
        concentrationMgPerMl: 10,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Fefol-CI Syr', 'Ipec Syr', 'Ferix Syr']
      },
      {
        name: 'Paediatric Drops 50 mg Elemental Fe / 1 ml',
        formType: 'drops',
        concentrationMgPerMl: 50,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Fefol-CI Drops', 'Ipec Drops', 'Ferix Drops']
      }
    ]
  },
  {
    id: 'vitamin_d3',
    genericName: 'Vitamin D3 (Cholecalciferol)',
    banglaName: 'ভিটামিন ডি৩ ড্রপস',
    category: 'vitamins_minerals',
    categoryLabel: 'Vitamins & Minerals',
    popularBDBrands: ['D-Rise Drops', 'Ultra-D', 'Ostofed', 'Bio-D'],
    manufacturerNotes: 'Incepta (D-Rise), Square (Ultra-D), Beximco',
    indication: 'Rickets prevention, infant daily supplementation, nutritional vitamin D deficiency',
    doseType: 'fixed_by_age',
    defaultDoseMg: 400, // 400 IU
    minDoseMg: 400,
    maxDoseMg: 2000,
    doseUnit: 'IU/dose',
    frequency: 'Routine Prophylaxis: 400 IU daily starting from birth. Nutritional Rickets: 2,000 - 6,000 IU daily for 12 weeks',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'প্রতিদিন ১ বার (দুধ বা খাবারের সাথে) - রুটিন ৪০০ ইন্টারন্যাশনাল ইউনিট',
    englishSchedule: 'Routine daily supplement: 400 IU/day for all exclusively or partially breastfed infants',
    standardDurationDays: 'Daily for at least the first year of life',
    maxSingleDoseMg: 50000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'AAP and Bangladesh Paediatric Association recommend 400 IU daily for ALL breastfed infants starting in the first days of life.',
      'Check drop concentration carefully (e.g. 1 drop = 400 IU vs 1 ml = 400 IU).'
    ],
    clinicalTips: [
      'D-Rise Drops / Ultra-D drops usually supply 400 IU in 1 drop (or 0.5-1 ml depending on dropper pipettes). Give directly onto infant tongue or in milk.'
    ],
    banglaPrescriptionTemplate: 'প্রতিদিন নিয়ম করে মুখে ফোঁটা দিন। হাড় ও দাঁত শক্ত করবে।',
    formulations: [
      {
        name: 'Paediatric Drops (400 IU per drop / 10,000 IU/ml)',
        formType: 'drops',
        mgPerUnit: 400, // 400 IU
        unitLabel: 'drops',
        bdBrands: ['D-Rise Drops', 'Ultra-D Drops']
      },
      {
        name: 'Drops (1000 IU / 1 ml)',
        formType: 'drops',
        mgPerUnit: 1000,
        unitLabel: 'ml',
        bdBrands: ['D-Rise 1000IU', 'Ultra-D 1000IU']
      }
    ]
  },
  {
    id: 'vitamin_a',
    genericName: 'Vitamin A (Retinol High-Dose Capsule)',
    banglaName: 'ভিটামিন এ মেগাডোজ ক্যাপসুল',
    category: 'vitamins_minerals',
    categoryLabel: 'Vitamins & Minerals',
    popularBDBrands: ['National Vitamin A Blue/Red Capsule', 'A-Vitol', 'Retinol'],
    manufacturerNotes: 'Govt. EPI Bangladesh & Local Generic Formulations',
    indication: 'Measles treatment (prevent blindness & mortality), Severe Acute Malnutrition (SAM), xerophthalmia / night blindness',
    doseType: 'fixed_by_age',
    defaultDoseMg: 100000, // IU
    minDoseMg: 50000,
    maxDoseMg: 200000,
    doseUnit: 'IU/dose',
    frequency: 'Measles/SAM: Dose on Day 1, Day 2, and Day 14. National Campaign: Every 6 months',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'হাম বা অপুষ্টিতে: ১ম দিন, ২য় দিন এবং ১৪তম দিনে ১টি করে ক্যাপসুল কেটে খাওয়াতে হবে',
    englishSchedule: 'Age < 6 mo: 50,000 IU; Age 6-11 mo: 100,000 IU (Blue); Age >= 12 mo: 200,000 IU (Red)',
    standardDurationDays: '3 doses (Day 1, Day 2, Day 14 for Measles/SAM)',
    maxSingleDoseMg: 200000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'In Measles: Vitamin A reduces measles mortality by 50% and prevents blindness.',
      'Cut tip of capsule with clean scissors and squeeze drops directly into infant’s mouth; never let child swallow whole capsule (choking risk).'
    ],
    clinicalTips: [
      'Age < 6 months: 50,000 IU (half of blue capsule).',
      'Age 6 - 11 months: 100,000 IU (Blue capsule).',
      'Age >= 12 months: 200,000 IU (Red capsule).'
    ],
    banglaPrescriptionTemplate: 'ক্যাপসুলের মুখ কাঁচি দিয়ে কেটে তরল অংশ বাচ্চার মুখে চিপে খাওয়ান।',
    formulations: [
      {
        name: 'Blue Capsule 100,000 IU (6 - 11 months)',
        formType: 'sachet',
        mgPerUnit: 100000,
        unitLabel: 'capsule',
        bdBrands: ['Govt Blue Vitamin A 100,000 IU']
      },
      {
        name: 'Red Capsule 200,000 IU (>= 12 months)',
        formType: 'sachet',
        mgPerUnit: 200000,
        unitLabel: 'capsule',
        bdBrands: ['Govt Red Vitamin A 200,000 IU']
      }
    ]
  },

  // ==========================================
  // ADVANCED ANTIBIOTICS & CRITICAL CARE
  // ==========================================
  {
    id: 'meropenem',
    genericName: 'Meropenem (IV Carbapenem)',
    banglaName: 'মেরোপেনেম ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Meropen', 'Meronem', 'Meromac', 'Ropenem', 'Maxipen', 'Meropen-I'],
    manufacturerNotes: 'Square (Meropen), AstraZeneca/Beximco (Meronem), Incepta (Meromac), Renata (Ropenem)',
    indication: 'Severe hospital-acquired sepsis, febrile neutropenia, complicated intra-abdominal sepsis, pediatric bacterial meningitis, ventilator-associated pneumonia (VAP)',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 20,
    minDoseMg: 20,
    maxDoseMg: 40,
    doseUnit: 'mg/kg/dose',
    frequency: 'Every 8 hours (TID) slow IV infusion over 30 minutes (Q8H). In Meningitis: 40 mg/kg Q8H',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'শিরায় (IV) প্রতি ৮ ঘণ্টা পর পর ৩০ মিনিট ধরে ধীরে ধীরে ইনফিউশন দিতে হবে',
    englishSchedule: 'IV slow infusion over 30 min every 8 hours (20-40 mg/kg Q8H) for 7-14 days',
    standardDurationDays: '7 to 14 days (14-21 days for meningitis)',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 6000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'For Pediatric Bacterial Meningitis or Pseudomonas aeruginosa infections: High-dose is 40 mg/kg IV every 8 hours (max 2,000 mg per dose).',
      'Infuse slowly over 30 minutes in Normal Saline (0.9% NaCl) or 5% Dextrose. Do not administer rapid push.',
      'Neonatal Dosing (<28 days): Age < 7 days: 20 mg/kg Q12H; Age >= 7 days: 20 mg/kg Q8H.'
    ],
    clinicalTips: [
      'Broadest spectrum monotherapy covering Gram-positive, Gram-negative (including ESBL producers), and anaerobes.',
      'Significantly lower seizure risk compared to Imipenem-Cilastatin; preferred carbapenem for CNS infections in children.'
    ],
    banglaPrescriptionTemplate: 'হাসপাতালে ভর্তি রেখে শিরায় নরমাল স্যালাইনে মিশিয়ে ধীরে ধীরে ইনফিউশন দিতে হবে।',
    formulations: [
      {
        name: 'IV Injection (50 mg/ml) — 500 mg in 10 ml NS/WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 500,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 500 mg vial in 10 ml sterile water or NS -> 50 mg/ml solution. Draw exact calculated ml with syringe and infuse over 30 min.',
        bdBrands: ['Meropen 500mg', 'Meronem 500mg', 'Meromac 500mg']
      },
      {
        name: 'IV Injection (50 mg/ml) — 1 g in 20 ml NS/WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 1000,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 1 g vial in 20 ml sterile water or NS -> 50 mg/ml solution. Draw exact calculated ml with syringe and infuse over 30 min.',
        bdBrands: ['Meropen 1g', 'Meronem 1g', 'Meromac 1g']
      },
      {
        name: 'IV Injection (50 mg/ml) — 250 mg in 5 ml NS/WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 250,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 250 mg vial in 5 ml sterile water or NS -> 50 mg/ml solution. Draw exact calculated ml with syringe and infuse over 30 min.',
        bdBrands: ['Meropen 250mg', 'Meromac 250mg']
      }
    ]
  },
  {
    id: 'tigecycline',
    genericName: 'Tigecycline (IV Glycylcycline)',
    banglaName: 'টাইগেসাইক্লিন ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Tygacil', 'Tigecycline Incepta', 'Tigesan', 'Tygem'],
    manufacturerNotes: 'Pfizer (Tygacil), Incepta (Tigecycline), Square (Tigesan), Beacon (Tygem)',
    indication: 'Multi-drug resistant (MDR) complicated intra-abdominal sepsis, skin & soft tissue infections, Carbapenem-resistant Enterobacteriaceae (CRE) / Acinetobacter baumannii',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 1.2,
    minDoseMg: 1.0,
    maxDoseMg: 2.0,
    doseUnit: 'mg/kg/dose',
    frequency: 'Every 12 hours (BID) IV infusion over 30 to 60 minutes',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'শিরায় (IV) প্রতি ১২ ঘণ্টা পর পর ৩০-৬০ মিনিট ধরে ধীরে ধীরে ইনফিউশন দিতে হবে',
    englishSchedule: 'IV slow infusion over 30-60 min every 12 hours for 7-14 days',
    standardDurationDays: '7 to 14 days',
    maxSingleDoseMg: 50,
    maxDailyDoseMg: 100,
    neonatalSafety: 'caution',
    ageMinMonths: 6,
    warnings: [
      'Reserved for severe MDR infections in PICU/NICU when alternative options are exhausted.',
      'Potential risk of permanent tooth discoloration and enamel hypoplasia in children under 8 years (similar to tetracyclines). Use under specialist guidance.',
      'High incidence of nausea/vomiting; monitor serum amylase and lipase for pancreatitis.'
    ],
    clinicalTips: [
      'Age 8-11 years: 1.2 mg/kg IV every 12 hours (max 50 mg/dose).',
      'Age >= 12 years: 100 mg loading dose stat, then 50 mg every 12 hours.',
      'Infants & children < 8 years (off-label rescue): 1.0-1.5 mg/kg Q12H.',
      'Poor blood concentration; not recommended for primary bacteremia or ventilator-associated pneumonia monotherapy.'
    ],
    banglaPrescriptionTemplate: 'আইসিইউতে বিশেষজ্ঞ ডাক্তারের পরামর্শ অনুযায়ী শিরাপথে দিতে হবে।',
    formulations: [
      {
        name: 'IV Infusion (10 mg/ml) — 50 mg in 5 ml NS [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 10,
        mgPerUnit: 50,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 50 mg vial in 5 ml NS (10 mg/ml) -> add required calculated ml to IV infusion bag and infuse over 30-60 min.',
        bdBrands: ['Tygacil 50mg', 'Tigecycline Incepta 50mg', 'Tigesan 50mg']
      }
    ]
  },
  {
    id: 'teicoplanin',
    genericName: 'Teicoplanin (Ticoplan - IV / IM Glycopeptide)',
    banglaName: 'টাইকোপ্ল্যানিন ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Targocid', 'Teicoplan', 'Ticocin', 'Teico'],
    manufacturerNotes: 'Sanofi (Targocid), Incepta (Teicoplan), Square (Ticocin), Beximco (Teico)',
    indication: 'Methicillin-resistant Staphylococcus aureus (MRSA) bacteremia, osteomyelitis, septic arthritis, Enterococcal infections, CAPD peritonitis',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 10,
    minDoseMg: 6,
    maxDoseMg: 10,
    doseUnit: 'mg/kg/dose',
    frequency: 'Loading: 10 mg/kg Q12H for first 3 doses -> Maintenance: 6-10 mg/kg once daily (OD every 24 hr)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'প্রথম ৩টি ডোজ প্রতি ১২ ঘণ্টা পর পর, এরপর দিনে ১ বার (প্রতি ২৪ ঘণ্টা পর পর)',
    englishSchedule: 'Loading: 10 mg/kg Q12H for 3 doses; then maintenance: 6-10 mg/kg once daily IV/IM',
    standardDurationDays: '7 to 14 days (up to 4-6 weeks for osteomyelitis)',
    maxSingleDoseMg: 800,
    maxDailyDoseMg: 800,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'SIGNIFICANT ADVANTAGE OVER VANCOMYCIN: Much lower incidence of nephrotoxicity and ototoxicity, does not cause "Red Man Syndrome", and can be administered by rapid IV bolus (over 3-5 min) or IM injection.',
      'Neonatal Dosing (<2 months): Loading dose 16 mg/kg on Day 1 single dose; then maintenance 8 mg/kg once daily IV infusion over 30 min.'
    ],
    clinicalTips: [
      'Severe infections (osteomyelitis, endocarditis, septic shock): High maintenance 10-12 mg/kg OD.',
      'Moderate infections (skin/soft tissue, UTI): Maintenance 6-8 mg/kg OD.',
      'Can be given IM when IV access is lost.'
    ],
    banglaPrescriptionTemplate: 'শিরায় ৩-৫ মিনিটে পুশ বা মাংসে দেওয়া যায়। ভ্যানকোমাইসিনের চেয়ে অনেক বেশি নিরাপদ।',
    formulations: [
      {
        name: 'IV/IM Injection (66.7 mg/ml) — 200 mg in 3 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 66.67,
        mgPerUnit: 200,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 200 mg vial in 3 ml sterile water -> 66.7 mg/ml solution. Draw exact ml into syringe.',
        bdBrands: ['Targocid 200mg', 'Teicoplan 200mg', 'Ticocin 200mg']
      },
      {
        name: 'IV/IM Injection (133.3 mg/ml) — 400 mg in 3 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 133.33,
        mgPerUnit: 400,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 400 mg vial in 3 ml sterile water -> 133.3 mg/ml solution. Draw exact ml into syringe.',
        bdBrands: ['Targocid 400mg', 'Teicoplan 400mg', 'Ticocin 400mg']
      }
    ]
  },
  {
    id: 'ceftazidime',
    genericName: 'Ceftazidime (3rd Gen Antipseudomonal Cephalosporin)',
    banglaName: 'সেফটাজিডিম ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Fortum', 'C-Zid', 'Tazid', 'Ceftazim', 'Zidime'],
    manufacturerNotes: 'GSK (Fortum), Square (C-Zid), Incepta (Tazid), Beximco (Ceftazim)',
    indication: 'Pseudomonas aeruginosa infections, febrile neutropenia, hospital-acquired pneumonia, cystic fibrosis pulmonary exacerbation, severe UTI',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 100,
    minDoseMg: 100,
    maxDoseMg: 150,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 3 doses daily (every 8 hours, Q8H slow IV infusion)',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'শিরায় (IV) প্রতি ৮ ঘণ্টা পর পর ধীরে ধীরে ইনফিউশন দিতে হবে',
    englishSchedule: 'IV slow infusion every 8 hours (30-50 mg/kg Q8H) for 7-14 days',
    standardDurationDays: '7 to 14 days',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 6000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Key 3rd generation cephalosporin with dedicated antipseudomonal coverage.',
      'In Cystic Fibrosis or severe Pseudomonas meningitis: dose can be increased up to 150 mg/kg/day (50 mg/kg Q8H, max 6,000 mg/day).',
      'Neonatal Dosing (<28 days): Age < 7 days: 30 mg/kg IV Q12H; Age >= 7 days: 30 mg/kg IV Q8H.'
    ],
    clinicalTips: [
      'Infuse over 20-30 minutes in Normal Saline or 5% Dextrose.',
      'Unlike Ceftriaxone, Ceftazidime is safe in neonates and does not displace bilirubin from albumin.'
    ],
    banglaPrescriptionTemplate: 'শিরাপথে প্রতি ৮ ঘণ্টা পর পর হাসপাতালে ভর্তি রেখে দিতে হবে।',
    formulations: [
      {
        name: 'IV Injection (50 mg/ml) — 250 mg in 5 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 250,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 250 mg vial in 5 ml sterile water -> Draw exact calculated ml with syringe (50 mg/ml solution).',
        bdBrands: ['Fortum 250mg', 'C-Zid 250mg', 'Tazid 250mg']
      },
      {
        name: 'IV Injection (100 mg/ml) — 500 mg in 5 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 100,
        mgPerUnit: 500,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 500 mg vial in 5 ml sterile water -> Draw exact calculated ml with syringe (100 mg/ml solution).',
        bdBrands: ['Fortum 500mg', 'C-Zid 500mg', 'Tazid 500mg']
      },
      {
        name: 'IV Injection (100 mg/ml) — 1 g in 10 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 100,
        mgPerUnit: 1000,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 1 g vial in 10 ml sterile water -> Draw exact calculated ml with syringe (100 mg/ml solution).',
        bdBrands: ['Fortum 1g', 'C-Zid 1g', 'Tazid 1g']
      }
    ]
  },
  {
    id: 'amikacin',
    genericName: 'Amikacin Sulphate (IV / IM Aminoglycoside)',
    banglaName: 'এমিকাসিন ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Mikacin', 'Amikacin Incepta', 'Amikacin Beximco', 'Kacin'],
    manufacturerNotes: 'Square (Mikacin), Incepta (Amikacin), Beximco, Acme (Kacin)',
    indication: 'Gentamicin-resistant Gram-negative bacteremia, neonatal sepsis, complicated intra-abdominal sepsis, pyelonephritis, MDR-TB',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 15,
    minDoseMg: 15,
    maxDoseMg: 20,
    doseUnit: 'mg/kg/day',
    frequency: 'Once daily (OD every 24 hr) slow IV infusion over 30-60 min (or divided Q12H)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'শিরায় (IV) দিনে ১ বার ধীরে ধীরে ইনফিউশন দিতে হবে (প্রতি ২৪ ঘণ্টা পর পর)',
    englishSchedule: 'IV slow infusion over 30-60 min once daily (15-20 mg/kg OD) for 7-10 days',
    standardDurationDays: '5 to 10 days',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 1500,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Nephrotoxic and ototoxic. Keep courses limited to 7-10 days. Ensure optimal hydration.',
      'Once-daily extended-interval dosing (15-20 mg/kg OD) produces higher bactericidal peak levels with reduced nephrotoxicity compared to multiple daily doses.',
      'Neonatal Dosing: Term neonate: 15 mg/kg once every 24 hours. Preterm < 30 weeks: 15 mg/kg every 36-48 hours.'
    ],
    clinicalTips: [
      'Infuse slowly over 30 to 60 minutes in Normal Saline or 5% Dextrose. Never give rapid IV bolus.',
      'Stable against aminoglycoside-inactivating enzymes; active against most Gentamicin-resistant Klebsiella and Pseudomonas.'
    ],
    banglaPrescriptionTemplate: 'শিরাপথে দিনে একবার আধা ঘণ্টা ধরে স্যালাইনে দিতে হবে। কোর্স ৭-১০ দিনের বেশি নয়।',
    formulations: [
      {
        name: 'IV/IM Injection (50 mg/ml) — Ampoule 100 mg / 2 ml (Pediatric) [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        unitLabel: 'ml',
        reconstitutionNote: 'Pediatric ampoule 100 mg / 2 ml (50 mg/ml). Draw exact ml directly into syringe.',
        bdBrands: ['Mikacin 100mg/2ml', 'Amikacin 100mg/2ml']
      },
      {
        name: 'IV/IM Injection (250 mg/ml) — Ampoule 500 mg / 2 ml [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 250,
        unitLabel: 'ml',
        reconstitutionNote: 'Ampoule 500 mg / 2 ml (250 mg/ml). Draw exact ml with tuberculin or 1 ml/3 ml syringe. Dilute in 50-100 ml NS/D5W for 30-60 min infusion.',
        bdBrands: ['Mikacin 500mg/2ml', 'Amikacin 500mg/2ml']
      }
    ]
  },
  {
    id: 'clarithromycin',
    genericName: 'Clarithromycin (Macrolide)',
    banglaName: 'ক্ল্যারিথ্রোমাইসিন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Claricin', 'Kalecin', 'Claricid', 'Clarix', 'Maclar'],
    manufacturerNotes: 'Square (Claricin), Incepta (Kalecin), Abbott (Claricid), Beximco (Clarix)',
    indication: 'Community-acquired pneumonia (atypical coverage for Mycoplasma/Chlamydia), Pertussis (whooping cough), acute streptococcal pharyngitis, H. pylori eradication',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 15,
    minDoseMg: 15,
    maxDoseMg: 20,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 2 doses daily (every 12 hours, BID; 7.5 mg/kg/dose BID)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (প্রতি ১২ ঘণ্টা পর পর) - খাবারের সাথে বা খাবারের পর',
    englishSchedule: 'Every 12 hours (BID) with or after food for 7 to 10 days',
    standardDurationDays: '7 to 10 days',
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 1000,
    neonatalSafety: 'caution',
    ageMinMonths: 6,
    warnings: [
      'Give with food or milk to minimize gastrointestinal discomfort and metallic taste.',
      'Caution in children with known QT prolongation or cardiac arrhythmias.',
      'Drug interactions: Clarithromycin is a potent inhibitor of CYP3A4.'
    ],
    clinicalTips: [
      'First-line alternative in penicillin-allergic children with respiratory infections.',
      'Reconstituted suspension should be stored at room temperature (do NOT refrigerate, as it increases bitterness).'
    ],
    banglaPrescriptionTemplate: 'খাবার সাথে সাথে বা খাওয়ার পর খাবে। ফ্রিজে রাখবেন না, স্বাভাবিক তাপমাত্রায় রাখুন।',
    formulations: [
      {
        name: 'Dry Suspension 125 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 25,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Claricin Susp', 'Kalecin Susp', 'Clarix Susp']
      },
      {
        name: 'Dry Suspension 250 mg / 5 ml (DS)',
        formType: 'suspension',
        concentrationMgPerMl: 50,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Claricin DS', 'Kalecin DS', 'Clarix DS']
      },
      {
        name: 'Tablet 250 mg',
        formType: 'tablet',
        mgPerUnit: 250,
        unitLabel: 'tablet',
        bdBrands: ['Claricin 250mg', 'Kalecin 250mg']
      },
      {
        name: 'Tablet 500 mg',
        formType: 'tablet',
        mgPerUnit: 500,
        unitLabel: 'tablet',
        bdBrands: ['Claricin 500mg', 'Kalecin 500mg']
      }
    ]
  },
  {
    id: 'linezolid',
    genericName: 'Linezolid (Linazolid - Oxazolidinone)',
    banglaName: 'লিনেজোলিড',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Linospan', 'Linozid', 'Arlin', 'Linox', 'Lizomac'],
    manufacturerNotes: 'Square (Linospan), Incepta (Linozid), Beximco (Arlin), Renata (Linox)',
    indication: 'Methicillin-resistant Staphylococcus aureus (MRSA) pneumonia / bacteremia, Vancomycin-resistant Enterococcus faecium (VRE), complicated skin & soft tissue infections',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 10,
    minDoseMg: 10,
    maxDoseMg: 10,
    doseUnit: 'mg/kg/dose',
    frequency: 'Age < 12 years: Every 8 hours (TID). Age >= 12 years: 600 mg every 12 hours (BID)',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'বয়স ১২ বছরের নিচে: দিনে ৩ বার (প্রতি ৮ ঘণ্টা পর পর); বয়স ≥ ১২ বছর: দিনে ২ বার',
    englishSchedule: 'Age < 12y: 10 mg/kg Q8H; Age >= 12y: 600 mg Q12H PO/IV for 10-14 days',
    standardDurationDays: '10 to 14 days',
    maxSingleDoseMg: 600,
    maxDailyDoseMg: 1800,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'PEDIATRIC FREQUENCY RULE: Children under 12 years clear Linezolid significantly faster than adults; they REQUIRE dosing every 8 hours (TID), NOT every 12 hours.',
      'Monitor Complete Blood Count (CBC) weekly if treatment extends beyond 10-14 days due to risk of reversible myelosuppression (thrombocytopenia, anemia, neutropenia).',
      'Weak reversible nonselective MAO inhibitor; avoid large amounts of tyramine-rich food.'
    ],
    clinicalTips: [
      '100% oral bioavailability: oral suspension and IV doses are identical, allowing seamless step-down to home oral therapy.',
      'Neonatal Dosing (<7 days): 10 mg/kg Q12H. Preterm <34 weeks: 10 mg/kg Q12H.'
    ],
    banglaPrescriptionTemplate: '১২ বছরের নিচের শিশুদের ক্ষেত্রে অবশ্যই দিনে ৩ বার (৮ ঘণ্টা পর পর) নিয়ম করে দিতে হবে।',
    formulations: [
      {
        name: 'Dry Suspension 100 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 20,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Linospan Susp', 'Linozid Susp', 'Arlin Susp']
      },
      {
        name: 'IV Infusion 2 mg / 1 ml (300 ml / 600 mg bag)',
        formType: 'injection',
        concentrationMgPerMl: 2,
        unitLabel: 'ml',
        bdBrands: ['Linospan IV', 'Linozid IV', 'Arlin IV']
      },
      {
        name: 'Tablet 600 mg',
        formType: 'tablet',
        mgPerUnit: 600,
        unitLabel: 'tablet',
        bdBrands: ['Linospan 600mg', 'Linozid 600mg']
      }
    ]
  },
  {
    id: 'levofloxacin',
    genericName: 'Levofloxacin (Oral & IV Respiratory Fluoroquinolone)',
    banglaName: 'লেভোফ্লক্সাসিন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Levobac', 'Livo', 'Eleflo', 'Levoxin', 'Levoflox'],
    manufacturerNotes: 'Square (Levobac), Incepta (Livo), Beximco (Eleflo), Renata (Levoxin)',
    indication: 'Complicated community-acquired pneumonia (CAP) with suspected resistant S. pneumoniae, Multi-Drug Resistant Tuberculosis (MDR-TB), complicated pyelonephritis',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 16,
    minDoseMg: 10,
    maxDoseMg: 20,
    doseUnit: 'mg/kg/day',
    frequency: 'Age 6mo - 5yr: Divided BID (every 12 hr; 8-10 mg/kg/dose). Age >= 5yr: Once daily (OD; 10 mg/kg/day)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'বয়স ৫ বছরের নিচে: দিনে ২ বার (১২ ঘণ্টা পর পর); বয়স ৫ বছরের বেশি: দিনে ১ বার',
    englishSchedule: 'Age < 5y: 8-10 mg/kg BID; Age >= 5y: 10 mg/kg once daily for 7-14 days',
    standardDurationDays: '7 to 14 days',
    maxSingleDoseMg: 500,
    maxDailyDoseMg: 750,
    neonatalSafety: 'caution',
    ageMinMonths: 6,
    warnings: [
      'AGE-DEPENDENT CLEARANCE: Children under 5 years clear levofloxacin twice as fast as adults and require TWICE-DAILY (BID) dosing (8-10 mg/kg/dose BID). Children >= 5 years take once-daily (OD 10 mg/kg/day).',
      'Do not administer simultaneously with oral iron, zinc, calcium, or antacids (reduces absorption by 50-70%). Separate by at least 2 hours.',
      'Ensure adequate hydration to prevent crystalluria.'
    ],
    clinicalTips: [
      'Excellent oral bioavailability (>99%) and extensive lung tissue penetration.',
      'Core component of WHO pediatric MDR-TB regimens in Bangladesh.'
    ],
    banglaPrescriptionTemplate: 'প্রচুর পানি পান করাবেন। দুধ বা আয়রনের সাথে একসাথে খাবেন না।',
    formulations: [
      {
        name: 'Oral Solution 125 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 25,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Levobac Sol', 'Livo Susp', 'Eleflo Sol']
      },
      {
        name: 'Tablet 250 mg',
        formType: 'tablet',
        mgPerUnit: 250,
        unitLabel: 'tablet',
        bdBrands: ['Levobac 250mg', 'Livo 250mg']
      },
      {
        name: 'Tablet 500 mg',
        formType: 'tablet',
        mgPerUnit: 500,
        unitLabel: 'tablet',
        bdBrands: ['Levobac 500mg', 'Livo 500mg']
      },
      {
        name: 'IV Infusion 500 mg / 100 ml (5 mg/ml)',
        formType: 'injection',
        concentrationMgPerMl: 5,
        unitLabel: 'ml',
        bdBrands: ['Levobac IV', 'Livo IV']
      }
    ]
  },
  {
    id: 'moxifloxacin_eyedrops',
    genericName: 'Moxifloxacin 0.5% Eye Drops',
    banglaName: 'মক্সিফ্লক্সাসিন চোখের ড্রপ',
    category: 'ophthalmic_topical',
    categoryLabel: 'Eye Drops & ENT',
    popularBDBrands: ['Moxiflox Eye Drops', 'Optiflox', 'Moxaquin', 'Vigamox', 'Moxieye'],
    manufacturerNotes: 'Square (Moxiflox), Incepta (Optiflox), Beximco (Moxaquin), Novartis/Alcon (Vigamox)',
    indication: 'Acute bacterial conjunctivitis (pink eye), bacterial keratitis, corneal ulcer, neonatal ophthalmia prophylaxis/treatment',
    doseType: 'fixed_by_age',
    defaultDoseMg: 1, // 1 drop
    minDoseMg: 1,
    maxDoseMg: 2,
    doseUnit: 'mg/dose',
    frequency: '1 drop in the affected eye(s) 3 times daily (TID every 8 hours) for 5 to 7 days',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'আক্রান্ত চোখে ১ ফোঁটা করে দিনে ৩ বার (প্রতি ৮ ঘণ্টা পর পর) - টানা ৫-৭ দিন',
    englishSchedule: 'Instill 1 drop in the affected eye(s) 3 times daily for 5 to 7 days',
    standardDurationDays: '5 to 7 days',
    maxSingleDoseMg: 2,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Approved for infants and neonates from birth for bacterial conjunctivitis.',
      'Do NOT touch dropper tip to eye, fingers, or any surface to prevent bottle contamination.',
      'Continue for full 5-7 days even if redness resolves within 48 hours to prevent recurrence.'
    ],
    clinicalTips: [
      'Self-preserving formulation: does not contain benzalkonium chloride (BAK), gentle on pediatric ocular surface.',
      'Wash hands thoroughly before and after instillation. Pull lower eyelid down gently to form a pouch and instill 1 drop.'
    ],
    banglaPrescriptionTemplate: 'আক্রান্ত চোখে ১ ফোঁটা করে দিনে ৩ বার। ড্রপারের মুখ চোখে বা হাতে লাগাবেন না।',
    formulations: [
      {
        name: '0.5% Sterile Ophthalmic Solution (5 ml Dropper Bottle)',
        formType: 'eye_drops',
        concentrationMgPerMl: 5,
        unitLabel: 'drop',
        bdBrands: ['Moxiflox Eye Drops 5ml', 'Optiflox 5ml', 'Vigamox 5ml', 'Moxaquin 5ml']
      }
    ]
  },

  // ==========================================
  // NEW DRUGS: REQUESTED PEDIATRIC FORMULATIONS
  // ==========================================
  {
    id: 'flucloxacillin',
    genericName: 'Flucloxacillin Sodium (Anti-Staphylococcal Penicillin)',
    banglaName: 'ফ্লুক্লক্সাসিলিন (স্টাফাইলোকক্কাল ইনফেকশনের ওষুধ)',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Phylopen', 'Flumox', 'Flupen', 'Flucil', 'Aflox', 'Staphopen'],
    manufacturerNotes: 'Square (Phylopen), Beximco (Flumox), Incepta (Flupen), Acme (Flucil)',
    indication: 'Staphylococcal skin & soft tissue infections (impetigo, boils, cellulitis, abscess), scalded skin syndrome (SSSS), osteomyelitis, septic arthritis',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 50,
    minDoseMg: 25,
    maxDoseMg: 100,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 4 doses daily (every 6 hours, Q6H) on an empty stomach (1 hr before food)',
    frequencyTimesPerDay: 4,
    banglaSchedule: 'দিনে ৪ বার (প্রতি ৬ ঘণ্টা পর পর) - অবশ্যই খাবার ১ ঘণ্টা আগে খালি পেটে',
    englishSchedule: 'Every 6 hours (Q6H) on an empty stomach (1h before food) for 7-10 days',
    standardDurationDays: '7 to 10 days (up to 4-6 weeks for osteomyelitis)',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 4000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'STRICT EMPTY STOMACH RULE: Food reduces oral absorption significantly. Administer at least 30 to 60 minutes before feeds or meals.',
      'In severe infections (osteomyelitis, endocarditis, severe septic arthritis): high-dose is 100 to 200 mg/kg/day IV divided Q6H.',
      'Neonatal Dosing (<7 days): 25 mg/kg/dose Q12H; Neonates 7-28 days: 25 mg/kg/dose Q8H.'
    ],
    clinicalTips: [
      'Penicillinase-resistant penicillin: drug of choice for MSSA (Methicillin-sensitive Staphylococcus aureus).',
      'For skin infections like impetigo or cellulitis in Bangladesh, 50 mg/kg/day divided Q6H for 7 days.'
    ],
    banglaPrescriptionTemplate: 'অবশ্যই খাবার ১ ঘণ্টা পূর্বে খালি পেটে খাবে। কোর্স ৭ দিন পূরণ করতে হবে।',
    formulations: [
      {
        name: 'Dry Syrup 125 mg / 5 ml',
        formType: 'syrup',
        concentrationMgPerMl: 25,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Phylopen Syr', 'Flumox Syr', 'Flupen Syr']
      },
      {
        name: 'Forte Dry Syrup 250 mg / 5 ml (DS)',
        formType: 'syrup',
        concentrationMgPerMl: 50,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Phylopen DS', 'Flumox DS', 'Flupen DS']
      },
      {
        name: 'IV/IM Injection (50 mg/ml) — 250 mg in 5 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 250,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 250 mg vial in 5 ml sterile water -> 50 mg/ml solution. Draw exact calculated ml with syringe. Infuse over 15-30 min or deep IM.',
        bdBrands: ['Phylopen 250mg', 'Flumox 250mg']
      },
      {
        name: 'IV/IM Injection (100 mg/ml) — 500 mg in 5 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 100,
        mgPerUnit: 500,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 500 mg vial in 5 ml sterile water -> 100 mg/ml solution. Draw exact calculated ml with syringe.',
        bdBrands: ['Phylopen 500mg', 'Flumox 500mg']
      },
      {
        name: 'Capsule 250 mg',
        formType: 'tablet',
        mgPerUnit: 250,
        unitLabel: 'capsule',
        bdBrands: ['Phylopen 250mg', 'Flumox 250mg']
      },
      {
        name: 'Capsule 500 mg',
        formType: 'tablet',
        mgPerUnit: 500,
        unitLabel: 'capsule',
        bdBrands: ['Phylopen 500mg', 'Flumox 500mg']
      }
    ]
  },
  {
    id: 'ketotifen',
    genericName: 'Ketotifen Fumarate (Mast Cell Stabilizer & Antihistamine)',
    banglaName: 'কিটোটিফেন (হাঁপানি ও অ্যালার্জির প্রতিরোধক)',
    category: 'respiratory',
    categoryLabel: 'Respiratory & Asthma',
    popularBDBrands: ['Zaditen', 'Zadifex', 'Tosma', 'Tofen', 'Ketotif', 'Prosma'],
    manufacturerNotes: 'Novartis/Square (Zaditen), Beximco (Zadifex), Incepta (Tosma), Renata (Tofen)',
    indication: 'Long-term prevention of bronchial asthma in infants & children, allergic rhinitis, allergic conjunctivitis, atopic dermatitis / eczema',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 0.05,
    minDoseMg: 0.025,
    maxDoseMg: 0.05,
    doseUnit: 'mg/kg/dose',
    frequency: 'Twice daily (BID every 12 hours) with morning and evening meals',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (সকাল ও রাতে খাবারের সাথে) - একটানা ২-৩ মাস সেবন করতে হয়',
    englishSchedule: 'Every 12 hours with meals for 2 to 3 months (maintenance prophylaxis)',
    standardDurationDays: '1 to 3 months (prophylaxis)',
    maxSingleDoseMg: 1.0,
    maxDailyDoseMg: 2.0,
    neonatalSafety: 'caution',
    ageMinMonths: 6,
    warnings: [
      'NOT FOR ACUTE ATTACKS: Ketotifen is a prophylactic controller drug, NOT a rescue bronchodilator. Takes several weeks (usually 4-8 weeks) of regular use to achieve full prophylactic efficacy.',
      'May cause mild sedation and increased appetite/weight gain during the first few days of treatment.',
      'Approved for infants aged 6 months and older.'
    ],
    clinicalTips: [
      'Age 6 months to 3 years: 0.05 mg/kg (or 0.5 mg = 2.5 ml syrup) BID.',
      'Age > 3 years: 1.0 mg (5 ml syrup or 1 tablet) BID morning and night with meals.'
    ],
    banglaPrescriptionTemplate: 'হাঁপানির টান উঠলে এটি কাজ করবে না; টান প্রতিরোধে প্রতিদিন সকাল-রাত নিয়মিত খাওয়ান।',
    formulations: [
      {
        name: 'Syrup 1 mg / 5 ml (0.2 mg/ml)',
        formType: 'syrup',
        concentrationMgPerMl: 0.2,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Zaditen Syr', 'Zadifex Syr', 'Tosma Syr', 'Tofen Syr']
      },
      {
        name: 'Paediatric Drops 1 mg / 1 ml',
        formType: 'drops',
        concentrationMgPerMl: 1.0,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Tosma Drops', 'Zadifex Drops']
      },
      {
        name: 'Tablet 1 mg',
        formType: 'tablet',
        mgPerUnit: 1,
        unitLabel: 'tablet',
        bdBrands: ['Zaditen 1mg', 'Tosma 1mg', 'Tofen 1mg']
      }
    ]
  },
  {
    id: 'simethicone',
    genericName: 'Simethicone (Activated Dimethicone for Infant Colic)',
    banglaName: 'সিমেথিকন (শিশুদের পেটে গ্যাস ও কান্নাকাটি)',
    category: 'gastrointestinal',
    categoryLabel: 'GI & Diarrhea',
    popularBDBrands: ['Flacol', 'Disflatyl', 'Flatuna', 'Colicon', 'Simethicon Square'],
    manufacturerNotes: 'Square (Flacol), Incepta (Flatuna), Beximco, Acme (Colicon)',
    indication: 'Infant colic, abdominal cramps due to trapped intestinal gas, postprandial flatulence, dyspepsia, bloating before abdominal ultrasound',
    doseType: 'fixed_by_age',
    defaultDoseMg: 20,
    minDoseMg: 20,
    maxDoseMg: 40,
    doseUnit: 'mg/dose',
    frequency: 'Given with or immediately after feeds and at bedtime (up to 4 to 6 times daily as needed)',
    frequencyTimesPerDay: 4,
    banglaSchedule: 'দুধ খাওয়ানোর পর বা পেটে গ্যাসের ব্যথায় কান্নাকাটি করলে ড্রপ বা সিরাপ খাওয়ান',
    englishSchedule: 'Give after feeds and at bedtime (up to 4-6 times daily as needed for colic)',
    standardDurationDays: 'As needed (PRN)',
    maxSingleDoseMg: 40,
    maxDailyDoseMg: 240,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Completely inert antifoaming agent: acts locally in the GI tract by collapsing gas bubbles and is not absorbed into bloodstream.',
      'Safe from birth for newborn infant colic.',
      'Shake bottle well before use.'
    ],
    clinicalTips: [
      'Infants < 2 years: 20 mg (approx 0.3 ml of Flacol 67mg/ml drops = 6-7 drops) with or after each feed (max 240 mg/day).',
      'Children 2 to 12 years: 40 mg (approx 0.6 ml drops or 1 chewable tablet) 3-4 times daily after meals.'
    ],
    banglaPrescriptionTemplate: 'খাওয়ানোর আগে বোতল ভালো করে ঝাঁকিয়ে নিবেন। শিশু গ্যাসজনিত কারণে অতিরিক্ত কাঁদলে দিন।',
    formulations: [
      {
        name: 'Paediatric Drops 67 mg / 1 ml (Flacol)',
        formType: 'drops',
        concentrationMgPerMl: 67,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Flacol Drops 15ml', 'Disflatyl Drops', 'Simethicon Drops']
      },
      {
        name: 'Paediatric Drops 40 mg / 1 ml',
        formType: 'drops',
        concentrationMgPerMl: 40,
        unitLabel: 'drops',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Flatuna Drops', 'Colicon Drops']
      },
      {
        name: 'Chewable Tablet 40 mg',
        formType: 'tablet',
        mgPerUnit: 40,
        unitLabel: 'tablet',
        bdBrands: ['Disflatyl 40mg', 'Flacol 40mg']
      }
    ]
  },
  {
    id: 'famotidine',
    genericName: 'Famotidine (H2 Receptor Antagonist - Oral & IV)',
    banglaName: 'ফ্যামোটিডিন (পেটের এসিড ও গ্যাস্ট্রিক আলসার)',
    category: 'gastrointestinal',
    categoryLabel: 'GI & Diarrhea',
    popularBDBrands: ['Famotack', 'Neofam', 'Famtac', 'Pepcid', 'Antacid-F'],
    manufacturerNotes: 'Square (Famotack), Incepta (Neofam), Beximco (Famtac)',
    indication: 'Gastroesophageal reflux disease (GERD), peptic ulcer disease, stress ulcer prophylaxis in critically ill PICU patients',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 1.0,
    minDoseMg: 0.5,
    maxDoseMg: 1.5,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 2 doses daily (every 12 hours, BID) PO or slow IV',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (প্রতি ১২ ঘণ্টা পর পর) - খাওয়ার আগে বা খাওয়ার সাথে',
    englishSchedule: 'Every 12 hours (BID) PO or slow IV push over 2 minutes for 4 to 8 weeks',
    standardDurationDays: '4 to 8 weeks',
    maxSingleDoseMg: 40,
    maxDailyDoseMg: 80,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'In renal impairment: Reduce dose or extend dosing interval (Q24-36H) according to creatinine clearance.',
      'IV injection should be pushed slowly over at least 2 minutes (rapid injection may cause transient bradycardia/hypotension).'
    ],
    clinicalTips: [
      'Peptic ulcer / GERD in children: 0.5 mg/kg/dose BID (up to 1.0 mg/kg/dose BID in severe reflux).',
      'Preferred H2 blocker over ranitidine due to purity and lack of NDMA impurities.'
    ],
    banglaPrescriptionTemplate: 'গ্যাস্ট্রিক বা বুক জ্বালাপোড়ায় দিনে ২ বার। শিরায় দিলে আস্তে আস্তে পুশ করতে হবে।',
    formulations: [
      {
        name: 'Oral Suspension 10 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 2,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Famotack Susp', 'Neofam Susp']
      },
      {
        name: 'IV Injection (10 mg/ml) — Ampoule 20 mg / 2 ml [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 10,
        unitLabel: 'ml',
        reconstitutionNote: 'Ampoule 20 mg / 2 ml (10 mg/ml). Draw exact calculated ml with syringe. Dilute in 5-10 ml NS and give slow IV push over 2-3 minutes.',
        bdBrands: ['Famotack 20mg/2ml Inj', 'Neofam 20mg/2ml Inj']
      },
      {
        name: 'Tablet 20 mg',
        formType: 'tablet',
        mgPerUnit: 20,
        unitLabel: 'tablet',
        bdBrands: ['Famotack 20mg', 'Neofam 20mg', 'Famtac 20mg']
      },
      {
        name: 'Tablet 40 mg',
        formType: 'tablet',
        mgPerUnit: 40,
        unitLabel: 'tablet',
        bdBrands: ['Famotack 40mg', 'Neofam 40mg']
      }
    ]
  },
  {
    id: 'esomeprazole',
    genericName: 'Esomeprazole (Proton Pump Inhibitor - Oral & IV)',
    banglaName: 'এসোমিপ্রাজল (গ্যাস্ট্রিক, রিফ্লাক্স ও আলসার)',
    category: 'gastrointestinal',
    categoryLabel: 'GI & Diarrhea',
    popularBDBrands: ['Maxpro', 'Nexum', 'Sergel', 'Esomep', 'Proceptin', 'Opton'],
    manufacturerNotes: 'Square (Maxpro), Beximco (Nexum), Incepta (Sergel), Renata (Esomep)',
    indication: 'Gastroesophageal reflux disease (GERD) with erosive esophagitis, NSAID-induced gastric injury, stress ulcer prophylaxis in PICU, H. pylori eradication',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 1.0,
    minDoseMg: 0.5,
    maxDoseMg: 1.0,
    doseUnit: 'mg/kg/day',
    frequency: 'Once daily (OD every 24 hr) in the morning 30-60 min before breakfast (or divided BID in severe esophagitis)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'সকালে খাবারের ৩০-৬০ মিনিট পূর্বে খালি পেটে দিনে ১ বার',
    englishSchedule: 'Once daily in the morning 30-60 min before breakfast for 4-8 weeks',
    standardDurationDays: '4 to 8 weeks',
    maxSingleDoseMg: 40,
    maxDailyDoseMg: 40,
    neonatalSafety: 'caution',
    ageMinMonths: 1,
    warnings: [
      'Take 30-60 minutes BEFORE meals for maximum gastric acid inhibition.',
      'Sachets: Dissolve granules in clean water (approx 15 ml), stir and let thicken for 2-3 minutes, drink within 30 minutes. Do not crush micro-granules.',
      'IV injection: Give slow IV push over at least 3 minutes or as 10-30 min infusion.'
    ],
    clinicalTips: [
      'Weight < 10 kg: 0.5 to 1.0 mg/kg once daily (use 10 mg sachet divided in liquid or 5-10 mg).',
      'Weight 10 - 20 kg: 10 mg once daily.',
      'Weight > 20 kg: 10 to 20 mg once daily.'
    ],
    banglaPrescriptionTemplate: 'সকালে নাস্তার আধা ঘণ্টা আগে খাবে। স্যাশে পানিতে গুলিয়ে ২ মিনিট রেখে পান করাবেন।',
    formulations: [
      {
        name: 'Pediatric Sachet 10 mg (Oral Granules for Suspension)',
        formType: 'sachet',
        mgPerUnit: 10,
        unitLabel: 'sachet',
        bdBrands: ['Maxpro 10mg Sachet', 'Nexum 10mg Sachet', 'Sergel 10mg Sachet']
      },
      {
        name: 'IV Injection (8 mg/ml) — 40 mg in 5 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 8,
        mgPerUnit: 40,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 40 mg vial in 5 ml sterile water -> 8 mg/ml solution. Draw exact calculated ml with syringe. Give slow IV push over 3 minutes.',
        bdBrands: ['Maxpro IV 40mg', 'Nexum IV 40mg', 'Sergel IV 40mg']
      },
      {
        name: 'Tablet / Capsule 20 mg',
        formType: 'tablet',
        mgPerUnit: 20,
        unitLabel: 'capsule',
        bdBrands: ['Maxpro 20mg', 'Nexum 20mg', 'Sergel 20mg', 'Esomep 20mg']
      }
    ]
  },
  {
    id: 'sodium_picosulfate',
    genericName: 'Sodium Picosulfate (Stimulant Laxative Drops & Syrup)',
    banglaName: 'সোডিয়াম পিকোসালফেট (শিশুদের কোষ্ঠকাঠিন্যের ড্রপ / সিরাপ)',
    category: 'gastrointestinal',
    categoryLabel: 'GI & Diarrhea',
    popularBDBrands: ['Picolax', 'Skilax', 'Laxyl', 'Sodipic', 'Pico'],
    manufacturerNotes: 'Incepta (Picolax), Square (Skilax), Beximco (Laxyl)',
    indication: 'Acute and chronic functional constipation in children, painful defecation / stool withholding, bowel preparation before procedures',
    doseType: 'fixed_by_age',
    defaultDoseMg: 2.5,
    minDoseMg: 2.5,
    maxDoseMg: 10,
    doseUnit: 'mg/dose',
    frequency: 'Once daily at bedtime (effect occurs within 6-12 hours next morning)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'রাতে শোবার সময় দিনে ১ বার সেবন করতে হবে (পরদিন সকালে পেট পরিষ্কার হবে)',
    englishSchedule: 'Single dose at bedtime (produces soft stool next morning within 6-12 hours)',
    standardDurationDays: '3 to 7 days (as prescribed)',
    maxSingleDoseMg: 10,
    neonatalSafety: 'safe',
    ageMinMonths: 1,
    warnings: [
      'Onset of action is 6 to 12 hours; best given at night before bedtime.',
      'Adjust dose gradually until comfortable, soft stool is passed daily.',
      'Ensure adequate water intake and high-fiber diet alongside laxative therapy.'
    ],
    clinicalTips: [
      'Age 1 month - 4 years: 2.5 - 5 mg (approx 5 to 10 drops of 7.5mg/ml drops) at night.',
      'Age 4 - 10 years: 2.5 - 5 mg (5 to 10 ml syrup or 10-15 drops) at night.',
      'Age > 10 years: 5 - 10 mg (15 to 20 drops) at night.'
    ],
    banglaPrescriptionTemplate: 'রাতে ঘুমানোর আগে খাওয়াবেন। সকালে সহজে পেট পরিষ্কার হবে। পর্যাপ্ত পানি খাওয়ান।',
    formulations: [
      {
        name: 'Oral Drops 7.5 mg / 1 ml (approx 0.5 mg / drop)',
        formType: 'drops',
        concentrationMgPerMl: 7.5,
        unitLabel: 'drops',
        dropFactor: 15,
        teaspoonFactor: 5,
        bdBrands: ['Picolax Drops 15ml', 'Skilax Drops', 'Laxyl Drops']
      },
      {
        name: 'Oral Syrup 5 mg / 5 ml (1 mg/ml)',
        formType: 'syrup',
        concentrationMgPerMl: 1,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Picolax Syr 100ml', 'Skilax Syr']
      }
    ]
  },
  {
    id: 'vancomycin',
    genericName: 'Vancomycin Hydrochloride (IV Glycopeptide)',
    banglaName: 'ভ্যানকোমাইসিন ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Vancocin', 'Vancomax', 'Vanco', 'Vanmycin', 'Vantex'],
    manufacturerNotes: 'Eli Lilly/Square (Vancocin), Incepta (Vancomax), Beximco (Vanco), Renata (Vanmycin)',
    indication: 'Severe Methicillin-resistant Staphylococcus aureus (MRSA) bacteremia, MRSA pneumonia, central-line infections, endocarditis, shunt meningitis, severe C. difficile (oral route)',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 45,
    minDoseMg: 40,
    maxDoseMg: 60,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 3 or 4 doses daily (every 6 or 8 hours; 15 mg/kg/dose Q8H or 10-15 mg/kg Q6H) IV slow infusion over >= 60 minutes',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'শিরায় (IV) প্রতি ৮ ঘণ্টা পর পর অন্তত ৬০ মিনিট ধরে ধীরে ধীরে স্যালাইনে ইনফিউশন দিতে হবে',
    englishSchedule: 'IV slow infusion over at least 60 minutes every 8 hours (15 mg/kg/dose Q8H) for 7-14 days',
    standardDurationDays: '7 to 14 days (up to 4-6 weeks for endocarditis/osteomyelitis)',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 2000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'RED MAN SYNDROME: Rapid infusion causes histamine release leading to flushing, erythema of neck and face, hypotension, and wheezing. NEVER give rapid IV bolus! Infuse at a rate not exceeding 10 mg/min (minimum 60 minutes per dose).',
      'Nephrotoxicity and ototoxicity: Monitor serum creatinine and trough levels (target trough: 10-15 mcg/ml for mild-mod infections; 15-20 mcg/ml for pneumonia/endocarditis/meningitis).',
      'Neonatal Dosing (<28 days): Post-menstrual age dependent (typically 15 mg/kg Q12H to Q18H).'
    ],
    clinicalTips: [
      'Dilute final solution to <= 5 mg/ml in Normal Saline or 5% Dextrose before infusion.',
      'Reconstitute 500 mg with 10 ml WFI -> 50 mg/ml stock solution -> draw exact calculated ml with syringe, add to burette with 50-100 ml NS and run over 60 min.'
    ],
    banglaPrescriptionTemplate: 'খুব সাবধানতার সাথে স্যালাইনে মিশিয়ে অন্তত ৬০ মিনিট ধরে ধীরে ধীরে দিতে হবে। দ্রুত দিলে মুখ লাল ও প্রেশার কমতে পারে।',
    formulations: [
      {
        name: 'IV Injection (50 mg/ml) — 500 mg in 10 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 500,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 500 mg vial in 10 ml sterile water -> 50 mg/ml stock solution. Draw exact calculated ml with syringe, dilute to <= 5 mg/ml in NS/D5W and infuse over at least 60 minutes.',
        bdBrands: ['Vancocin 500mg', 'Vancomax 500mg', 'Vanco 500mg']
      },
      {
        name: 'IV Injection (50 mg/ml) — 1 g in 20 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 1000,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 1 g vial in 20 ml sterile water -> 50 mg/ml stock solution. Draw exact calculated ml with syringe, dilute and infuse over 60-120 minutes.',
        bdBrands: ['Vancocin 1g', 'Vancomax 1g']
      }
    ]
  },
  {
    id: 'imipenem_cilastatin',
    genericName: 'Imipenem + Cilastatin (IV Carbapenem)',
    banglaName: 'ইমিপেনেম + সিলাস্ট্যাটিন ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Tienam', 'Imiject', 'Copenem', 'Imipen', 'Pre-Penem'],
    manufacturerNotes: 'MSD/Square (Tienam), Incepta (Imiject), Beximco (Copenem), Popular (Imipen)',
    indication: 'Severe polymicrobial hospital-acquired sepsis, intra-abdominal peritonitis, complicated pediatric UTI, febrile neutropenia, multi-drug resistant Gram-negative infections',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 60,
    minDoseMg: 60,
    maxDoseMg: 100,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 4 doses daily (every 6 hours, Q6H; 15-25 mg/kg/dose Q6H) IV slow infusion over 30 to 60 minutes',
    frequencyTimesPerDay: 4,
    banglaSchedule: 'শিরায় (IV) প্রতি ৬ ঘণ্টা পর পর ৩০-৬০ মিনিট ধরে স্যালাইনে ধীরে ধীরে দিতে হবে',
    englishSchedule: 'IV slow infusion over 30-60 min every 6 hours (15-25 mg/kg Q6H) for 7-14 days',
    standardDurationDays: '7 to 14 days',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 4000,
    neonatalSafety: 'caution',
    ageMinMonths: 0,
    warnings: [
      'SEIZURE RISK: Imipenem has higher neurotoxicity and proconvulsant potential compared to Meropenem. CONTRAINDICATED in pediatric CNS infections / bacterial meningitis. For meningitis, use Meropenem instead.',
      'Cilastatin inhibits renal dehydropeptidase-I, preventing renal degradation of imipenem.',
      'Infuse doses <= 500 mg over 20-30 minutes; doses > 500 mg over 40-60 minutes.'
    ],
    clinicalTips: [
      'Broadest antibacterial spectrum covering Gram-positive, Gram-negative, and anaerobes.',
      'Neonatal Dosing (<7 days): 20 mg/kg Q12H; Neonates 7-28 days: 20 mg/kg Q8H.'
    ],
    banglaPrescriptionTemplate: 'আইসিইউ বা হাসপাতালে ভর্তি রেখে অভিজ্ঞ চিকিৎসকের পরামর্শে স্যালাইনে দিতে হবে। খিঁচুনির প্রবণতা থাকলে পরিহার করুন।',
    formulations: [
      {
        name: 'IV Infusion (5 mg/ml) — 500 mg in 100 ml NS/D5W [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 5,
        mgPerUnit: 500,
        unitLabel: 'ml',
        reconstitutionNote: 'Reconstitute 500 mg vial in 100 ml NS or 5% Dextrose -> 5 mg/ml solution. Draw/infuse exact calculated ml over 30 to 60 minutes.',
        bdBrands: ['Tienam 500mg', 'Imiject 500mg', 'Copenem 500mg']
      },
      {
        name: 'IV Injection (50 mg/ml) — 500 mg in 10 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 50,
        mgPerUnit: 500,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 500 mg vial in 10 ml sterile water -> 50 mg/ml solution. Draw exact ml into syringe, dilute into burette with 50-100 ml NS and infuse over 30-60 min.',
        bdBrands: ['Tienam 500mg', 'Imiject 500mg']
      }
    ]
  },
  {
    id: 'piperacillin_tazobactam',
    genericName: 'Piperacillin + Tazobactam (Antipseudomonal Penicillin)',
    banglaName: 'পাইপেরাসিলিন + ট্যাজোব্যাকটাম ইনজেকশন',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Tazopen', 'Piprapen', 'Tazobac', 'Zosyn', 'Piptaz', 'Maxitaz'],
    manufacturerNotes: 'Square (Tazopen), Beximco (Piprapen), Pfizer (Tazobac), Incepta (Piptaz)',
    indication: 'Hospital-acquired pneumonia (HAP), ventilator-associated pneumonia (VAP), Pseudomonas bacteremia, febrile neutropenia, complicated appendicitis / peritonitis',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 300,
    minDoseMg: 240,
    maxDoseMg: 400,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 3 or 4 doses daily (every 6 or 8 hours; 80-100 mg/kg/dose Q6-8H) IV slow infusion over 30 minutes (or extended infusion over 3-4 hours)',
    frequencyTimesPerDay: 4,
    banglaSchedule: 'শিরায় (IV) প্রতি ৬ ঘণ্টা পর পর ৩০ মিনিট ধরে ধীরে ধীরে ইনফিউশন দিতে হবে',
    englishSchedule: 'IV slow infusion over 30 minutes every 6 to 8 hours (80-100 mg/kg Q6-8H) for 7-14 days',
    standardDurationDays: '7 to 14 days',
    maxSingleDoseMg: 4500,
    maxDailyDoseMg: 16000,
    neonatalSafety: 'safe',
    ageMinMonths: 2,
    warnings: [
      'Dosing is based on the Piperacillin component (e.g. 2.25 g vial contains 2 g Piperacillin + 0.25 g Tazobactam; 4.5 g vial contains 4 g Piperacillin + 0.5 g Tazobactam).',
      'Extended infusion (over 3 to 4 hours) is increasingly preferred in PICU for severe Pseudomonas infections to optimize time above MIC.',
      'Check for penicillin / beta-lactam hypersensitivity.'
    ],
    clinicalTips: [
      'Excellent activity against Pseudomonas aeruginosa, Klebsiella, E. coli, and intra-abdominal anaerobes (Bacteroides fragilis).',
      'Infants 2-9 months: 80 mg/kg (piperacillin) Q8H; Children >= 9 months: 100 mg/kg (piperacillin) Q8H or 80 mg/kg Q6H.'
    ],
    banglaPrescriptionTemplate: 'হাসপাতালে ভর্তি রেখে শিরায় স্যালাইনে মিশিয়ে দিতে হবে। প্রতি ৬-৮ ঘণ্টা পর পর সময়মতো দিতে হবে।',
    formulations: [
      {
        name: 'IV Injection (100 mg/ml) — 2.25 g in 20 ml WFI/NS [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 100,
        mgPerUnit: 2000,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 2.25 g vial in 20 ml sterile water or NS -> 100 mg/ml (piperacillin component). Draw exact calculated ml with syringe and infuse over 30 min.',
        bdBrands: ['Tazopen 2.25g', 'Piprapen 2.25g', 'Tazobac 2.25g']
      },
      {
        name: 'IV Injection (200 mg/ml) — 4.5 g in 20 ml WFI/NS [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 200,
        mgPerUnit: 4000,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 4.5 g vial in 20 ml sterile water or NS -> 200 mg/ml (piperacillin component). Draw exact calculated ml with syringe, dilute and infuse over 30 min.',
        bdBrands: ['Tazopen 4.5g', 'Piprapen 4.5g', 'Tazobac 4.5g']
      }
    ]
  },
  {
    id: 'colistin',
    genericName: 'Colistin (Colistimethate Sodium - IV Polymyxin)',
    banglaName: 'কোলিস্টিন ইনজেকশন (কার্বাপেনেম-রেজিস্ট্যান্ট জীবাণুর বিরুদ্ধে)',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Colistat', 'Colistin Incepta', 'Colirost', 'Xylistin'],
    manufacturerNotes: 'Square (Colistat), Incepta (Colistin), Beximco (Colirost)',
    indication: 'Last-resort therapy for Carbapenem-Resistant Enterobacteriaceae (CRE), multi-drug resistant (MDR) Acinetobacter baumannii, and MDR Pseudomonas in PICU/NICU',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 75000, // IU/kg/day
    minDoseMg: 75000,
    maxDoseMg: 150000,
    doseUnit: 'IU/kg/day',
    frequency: 'Divided into 3 doses daily (every 8 hours, Q8H; 25,000-50,000 IU/kg/dose Q8H) IV slow infusion over 60 minutes',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'শিরায় (IV) প্রতি ৮ ঘণ্টা পর পর অন্তত ৬০ মিনিট ধরে ধীরে ধীরে স্যালাইনে ইনফিউশন দিতে হবে',
    englishSchedule: 'IV slow infusion over 60 min every 8 hours (25,000-50,000 IU/kg/dose Q8H) for 7-14 days',
    standardDurationDays: '7 to 14 days',
    maxSingleDoseMg: 3000000,
    maxDailyDoseMg: 9000000,
    neonatalSafety: 'caution',
    ageMinMonths: 0,
    warnings: [
      'HIGH NEPHROTOXICITY & NEUROTOXICITY: Monitor renal function (serum creatinine, urine output) daily. Avoid concurrent nephrotoxic agents if possible.',
      'UNIT CLARITY: 1 Million IU (MIU) is approximately equal to 33.3 mg of Colistin Base Activity (CBA) or 80 mg of Colistimethate sodium.',
      'Loading dose in critically ill children: Consider 75,000 IU/kg loading dose, then maintenance 75,000-150,000 IU/kg/day divided Q8H.'
    ],
    clinicalTips: [
      'Reconstitute 1 Million IU with 2 ml sterile water -> 500,000 IU/ml solution. Draw exact calculated ml with syringe.',
      'Add to 50 ml Normal Saline and infuse over 60 minutes.'
    ],
    banglaPrescriptionTemplate: 'আইসিইউতে বিশেষজ্ঞ ডাক্তারের প্রত্যক্ষ তত্ত্বাবধানে দিতে হবে। কিডনি ফাংশন ও প্রস্রাবের পরিমাণ নিয়মিত মাপতে হবে।',
    formulations: [
      {
        name: 'IV Injection (500,000 IU/ml) — 1 MIU in 2 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 500000,
        mgPerUnit: 1000000,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 1 Million IU vial in 2 ml sterile water -> 500,000 IU/ml solution. Draw exact calculated ml with syringe, dilute in 50 ml NS and infuse over 60 min.',
        bdBrands: ['Colistat 1 MIU', 'Colistin Incepta 1 MIU', 'Colirost 1 MIU']
      },
      {
        name: 'IV Injection (200,000 IU/ml) — 2 MIU in 10 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 200000,
        mgPerUnit: 2000000,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 2 Million IU vial in 10 ml sterile water -> 200,000 IU/ml solution. Draw exact calculated ml with syringe, dilute and infuse over 60 min.',
        bdBrands: ['Colistat 2 MIU', 'Colistin Incepta 2 MIU', 'Colirost 2 MIU']
      }
    ]
  },
  {
    id: 'acyclovir',
    genericName: 'Acyclovir (Oral Suspension & IV Antiviral)',
    banglaName: 'এসাইক্লোভির (হার্পিস, এনসেফালাইটিস ও জলবসন্ত)',
    category: 'antibiotics',
    categoryLabel: 'Antibiotics & Anti-infectives',
    popularBDBrands: ['Virux', 'Zovirax', 'Acyvir', 'Xovir', 'Cyclovir'],
    manufacturerNotes: 'Square (Virux), GSK (Zovirax), Beximco (Acyvir), Incepta (Xovir)',
    indication: 'Neonatal Herpes simplex virus (HSV) infection, Herpes simplex encephalitis, severe Varicella-Zoster (chickenpox) in immunocompromised child, mucocutaneous HSV',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 20,
    minDoseMg: 10,
    maxDoseMg: 20,
    doseUnit: 'mg/kg/dose',
    frequency: 'Encephalitis / Neonatal HSV: 20 mg/kg IV every 8 hours (TID) over 1 hr. Chickenpox: 20 mg/kg PO 4 times daily (QDS)',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'এনসেফালাইটিস/নবজাতকের হার্পিসে শিরায় প্রতি ৮ ঘণ্টা পর পর ১ ঘণ্টা ধরে ইনফিউশন দিতে হবে',
    englishSchedule: 'IV slow infusion over 1 hour every 8 hours (20 mg/kg Q8H) for 14-21 days (or PO 20 mg/kg QDS for 5 days in Varicella)',
    standardDurationDays: '14 to 21 days for encephalitis; 5 days for chickenpox',
    maxSingleDoseMg: 800,
    maxDailyDoseMg: 2400,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'RENAL TUBULAR CRYSTALLIZATION: Rapid IV push precipitates acyclovir crystals in renal tubules causing acute renal failure. NEVER give rapid IV bolus! Infuse slowly over at least 1 hour.',
      'Ensure high hydration state before and during IV therapy (provide maintenance IV fluids + 10-20% extra).',
      'In neonatal HSV (CNS or disseminated): 20 mg/kg IV Q8H for 21 days is life-saving.'
    ],
    clinicalTips: [
      'Dissolve 250 mg vial in 10 ml sterile water -> 25 mg/ml. Draw exact calculated ml with syringe, further dilute to <= 7 mg/ml in NS or D5W and infuse over 1 hour.',
      'Oral suspension is ideal for uncomplicated chickenpox in children > 2 years: 20 mg/kg/dose (max 800 mg) 4 times daily for 5 days.'
    ],
    banglaPrescriptionTemplate: 'শিরাপথে অন্তত ১ ঘণ্টা ধরে স্যালাইনে দিতে হবে। প্রচুর তরল বা স্যালাইন দিতে হবে যাতে কিডনিতে সমস্যা না হয়।',
    formulations: [
      {
        name: 'IV Infusion (25 mg/ml) — 250 mg in 10 ml WFI [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 25,
        mgPerUnit: 250,
        unitLabel: 'ml',
        reconstitutionNote: 'Dissolve 250 mg vial in 10 ml sterile water -> 25 mg/ml solution. Draw exact calculated ml with syringe, dilute to <= 7 mg/ml in NS/D5W and infuse slowly over at least 1 hour.',
        bdBrands: ['Virux IV 250mg', 'Zovirax IV 250mg', 'Acyvir IV 250mg']
      },
      {
        name: 'Oral Suspension 200 mg / 5 ml',
        formType: 'suspension',
        concentrationMgPerMl: 40,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Virux Susp 100ml', 'Zovirax Susp', 'Acyvir Susp']
      },
      {
        name: 'Tablet 200 mg',
        formType: 'tablet',
        mgPerUnit: 200,
        unitLabel: 'tablet',
        bdBrands: ['Virux 200mg', 'Zovirax 200mg']
      },
      {
        name: 'Tablet 400 mg',
        formType: 'tablet',
        mgPerUnit: 400,
        unitLabel: 'tablet',
        bdBrands: ['Virux 400mg', 'Zovirax 400mg']
      }
    ]
  },
  {
    id: 'furosemide',
    genericName: 'Furosemide / Frusemide (Loop Diuretic - Oral & IV)',
    banglaName: 'ফ্রুসেমাইড (পেশাব বাড়ানোর ইনজেকশন ও সিরাপ)',
    category: 'cardiovascular',
    categoryLabel: 'Cardiovascular & Diuretics',
    popularBDBrands: ['Lasix', 'Fusid', 'Frusemide Square', 'Diuril', 'Frusid'],
    manufacturerNotes: 'Sanofi (Lasix), Square (Fusid), Incepta (Frusid)',
    indication: 'Acute congestive heart failure, acute pulmonary edema, fluid overload in acute kidney injury / nephrotic syndrome, acute hypertensive crisis',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 1.0,
    minDoseMg: 0.5,
    maxDoseMg: 2.0,
    doseUnit: 'mg/kg/dose',
    frequency: 'IV: 1 mg/kg slow IV push over 2-3 min, may repeat in 6-12 hours if needed. Oral: 1-2 mg/kg/dose once or twice daily',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'শিরায় (IV) আস্তে আস্তে ২-৩ মিনিট ধরে পুশ করতে হবে অথবা মুখে দিনে ১-২ বার',
    englishSchedule: 'Slow IV push over 2-3 minutes (or oral solution) every 12 hours as needed for diuresis',
    standardDurationDays: 'As needed for fluid overload',
    maxSingleDoseMg: 40,
    maxDailyDoseMg: 80,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'OTOTOXICITY RISK: Rapid IV injection can cause tinnitus and permanent hearing loss. Inject slowly over 2-3 minutes (rate not exceeding 4 mg/min).',
      'Electrolyte monitoring: Check serum potassium (risk of hypokalemia), sodium, and bicarbonate (hypochloremic metabolic alkalosis).',
      'In preterm neonates: Chronic use increases risk of nephrocalcinosis and patent ductus arteriosus (PDA).'
    ],
    clinicalTips: [
      'Standard BD ampoule is 20 mg / 2 ml (10 mg/ml). Draw exact ml directly into syringe.',
      'Onset of diuresis is within 5 minutes after IV push and peaks within 30 minutes.'
    ],
    banglaPrescriptionTemplate: 'শিরাপথে ২-৩ মিনিট ধরে আস্তে পুশ করতে হবে। রক্তে পটাশিয়ামের মাত্রা খেয়াল রাখতে হবে।',
    formulations: [
      {
        name: 'IV/IM Injection (10 mg/ml) — Ampoule 20 mg / 2 ml [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 10,
        unitLabel: 'ml',
        reconstitutionNote: 'Ampoule 20 mg / 2 ml (10 mg/ml). Draw exact calculated ml directly into syringe. Give slow IV push over 2 to 3 minutes.',
        bdBrands: ['Lasix Inj 20mg/2ml', 'Fusid Inj 20mg/2ml']
      },
      {
        name: 'Oral Solution 10 mg / 1 ml (or 20 mg / 5 ml)',
        formType: 'syrup',
        concentrationMgPerMl: 10,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Lasix Liquid', 'Fusid Sol']
      },
      {
        name: 'Tablet 40 mg',
        formType: 'tablet',
        mgPerUnit: 40,
        unitLabel: 'tablet',
        bdBrands: ['Lasix 40mg', 'Fusid 40mg']
      }
    ]
  },
  {
    id: 'digoxin',
    genericName: 'Digoxin (Cardiac Glycoside - Paediatric Elixir & IV)',
    banglaName: 'ডিগক্সিন (শিশুদের হৃদরোগ ও হার্ট ফেইলিউর)',
    category: 'cardiovascular',
    categoryLabel: 'Cardiovascular & Diuretics',
    popularBDBrands: ['Lanoxin', 'Cardioxin', 'Digoxin SK+F'],
    manufacturerNotes: 'GSK/Aspen (Lanoxin), Square (Cardioxin), SK+F',
    indication: 'Pediatric congestive heart failure with dilated cardiomyopathy, supraventricular tachycardia (SVT) rate control, atrial flutter',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 0.010, // 10 mcg/kg/day = 0.010 mg/kg/day
    minDoseMg: 0.008,
    maxDoseMg: 0.012,
    doseUnit: 'mg/kg/day',
    frequency: 'Divided into 2 doses daily (every 12 hours, BID; approx 4-5 mcg/kg/dose BID)',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'দিনে ২ বার (প্রতি ১২ ঘণ্টা পর পর ঠিক সময়ে) - মাপমতো ড্রপার দিয়ে খাওয়ান',
    englishSchedule: 'Every 12 hours (BID) maintenance therapy with calibrated oral syringe / dropper',
    standardDurationDays: 'Chronic maintenance as directed by pediatric cardiologist',
    maxSingleDoseMg: 0.25,
    maxDailyDoseMg: 0.5,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'NARROW THERAPEUTIC INDEX: Extremely high risk of toxicity! Symptoms include bradycardia, arrhythmias, vomiting, poor feeding, lethargy, and yellow-green visual halo.',
      'Check apical heart rate for 1 full minute BEFORE each dose; hold dose if HR < 100 bpm in infant, < 80 bpm in young child, or < 60 bpm in older child.',
      'Hypokalemia markedly increases digoxin cardiotoxicity. Ensure normal serum potassium.',
      'Always use dedicated calibrated 1 ml oral syringe for measuring paediatric drops.'
    ],
    clinicalTips: [
      'Paediatric Elixir is 0.05 mg / 1 ml (50 mcg/ml).',
      'Term infants maintenance: 8-10 mcg/kg/day divided BID (0.008-0.010 mg/kg/day).',
      'Children 1-10 years: 8-10 mcg/kg/day divided BID.',
      'IV maintenance dose is 75% of oral dose due to higher bioavailability.'
    ],
    banglaPrescriptionTemplate: 'খুব সতর্কতার সাথে মাপমতো দিতে হবে। নাড়ির গতি (হার্ট রেট) কমে গেলে বা বমি হলে ওষুধ বন্ধ করে ডাক্তারকে দেখান।',
    formulations: [
      {
        name: 'Paediatric Oral Elixir 0.05 mg / 1 ml (50 mcg/ml)',
        formType: 'drops',
        concentrationMgPerMl: 0.05,
        unitLabel: 'ml',
        dropFactor: 20,
        teaspoonFactor: 5,
        bdBrands: ['Lanoxin Paediatric Elixir 0.05mg/ml 60ml', 'Cardioxin Elixir']
      },
      {
        name: 'IV Injection (0.025 mg/ml / 25 mcg/ml) — Diluted Ampoule [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 0.025,
        unitLabel: 'ml',
        reconstitutionNote: 'Dilute 1 ml of Digoxin ampoule (0.25 mg/ml) with 9 ml NS to make 25 mcg/ml (0.025 mg/ml). Draw exact calculated ml with 1 ml syringe. Infuse slowly over 5-10 minutes.',
        bdBrands: ['Lanoxin IV Ampoule 0.25mg/ml']
      },
      {
        name: 'Tablet 0.25 mg (250 mcg)',
        formType: 'tablet',
        mgPerUnit: 0.25,
        unitLabel: 'tablet',
        bdBrands: ['Lanoxin 0.25mg', 'Cardioxin 0.25mg']
      }
    ]
  },

  // ==========================================
  // ELECTROLYTE CORRECTION & EMERGENCY SOLUTIONS
  // ==========================================
  {
    id: 'calcium_gluconate',
    genericName: 'Calcium Gluconate 10% Injection',
    banglaName: 'ক্যালসিয়াম গ্লুকোনেট ১০% ইনজেকশন',
    category: 'electrolytes_emergency',
    categoryLabel: 'Electrolytes & Emergency',
    popularBDBrands: ['Calcium Gluconate 10% Ampoule', 'G-Calcium', 'Calcigluc'],
    manufacturerNotes: 'Gonoshasthaya (G-Calcium), Popular, JMI',
    indication: 'Hypocalcemic tetany/convulsions, severe hyperkalemia with ECG changes (myocardial membrane stabilization), neonatal exchange transfusion, magnesium toxicity',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 100,
    minDoseMg: 50,
    maxDoseMg: 100,
    doseUnit: 'mg/kg/dose',
    frequency: 'Emergency stat dose: 100 mg/kg (1.0 ml/kg of 10% solution). Repeat in 10-15 min if tetany/arrhythmia persists',
    frequencyTimesPerDay: 1,
    banglaSchedule: '১০০ মিগ্রা/কেজি = ১.০ মিলি/কেজি সমপরিমাণ ৫% ডেক্সট্রোজ বা নরমাল স্যালাইনে মিশিয়ে ধীরে ধীরে ৫-১০ মিনিট ধরে শিরায় ইনজেকশন',
    englishSchedule: '1.0 ml/kg of 10% solution (100 mg/kg) diluted 1:1 with NS or D5W given slow IV push over 5-10 min with ECG/heart rate monitoring',
    standardDurationDays: 'Emergency stat dose',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 4000,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'NEVER give rapid IV push! Rapid injection causes severe bradycardia, hypotension, and fatal cardiac arrest.',
      'Always dilute 1:1 with 5% Dextrose or Normal Saline and give over at least 5 to 10 minutes with continuous pulse/ECG monitoring.',
      'Extravasation causes severe tissue necrosis and sloughing. Verify patency of IV line before infusing.',
      'Incompatible with Ceftriaxone and Sodium Bicarbonate (forms insoluble calcium precipitates).'
    ],
    clinicalTips: [
      '10% Calcium Gluconate contains 100 mg/ml (0.465 mEq elemental calcium/ml).',
      'In Hyperkalemia: Calcium does NOT lower serum potassium; it immediately protects the cardiac myocytes against lethal arrhythmias within 1-3 minutes.',
      'In Exchange Transfusion: Give 1 ml of 10% Calcium Gluconate IV slow flush after every 100 ml of blood exchanged.'
    ],
    banglaPrescriptionTemplate: 'জরুরি বিভাগে শিরায় ধীরগতিতে (৫-১০ মিনিট ধরে) প্রয়োগযোগ্য। দ্রুত দিলে হৃদস্পন্দন বন্ধ হয়ে যেতে পারে।',
    formulations: [
      {
        name: '10% IV Injection (100 mg/ml) — 10 ml Ampoule [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 100,
        mgPerUnit: 1000,
        unitLabel: 'ml',
        reconstitutionNote: '1 ml = 100 mg. Draw exact calculated ml (1 ml/kg, max 10-20 ml). Dilute with equal volume 5% Dextrose or Normal Saline.',
        bdBrands: ['Calcium Gluconate 10% 10ml Inj', 'G-Calcium Inj']
      }
    ]
  },
  {
    id: 'sodium_bicarbonate',
    genericName: 'Sodium Bicarbonate 7.5% / 8.4% Injection',
    banglaName: 'সোডিয়াম বাইকার্বোনেট ইনজেকশন',
    category: 'electrolytes_emergency',
    categoryLabel: 'Electrolytes & Emergency',
    popularBDBrands: ['Sodium Bicarbonate 7.5%', 'Sodium Bicarbonate 8.4%', 'Bicarb Inj'],
    manufacturerNotes: 'Opsonin, Popular, JMI',
    indication: 'Severe metabolic acidosis (blood pH < 7.1, HCO3 < 10 mEq/L), severe hyperkalemia (shifts K+ into cells), tricyclic antidepressant (TCA) toxicity, prolonged CPR',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 1.0,
    minDoseMg: 1.0,
    maxDoseMg: 2.0,
    doseUnit: 'mg/kg/dose',
    frequency: 'Emergency stat dose: 1 to 2 mEq/kg (1-2 ml/kg of 8.4% solution or 1.1-2.2 ml/kg of 7.5% solution) slow IV push',
    frequencyTimesPerDay: 1,
    banglaSchedule: '১-২ মিলি/কেজি সমপরিমাণ ডিস্টিল্ড ওয়াটার বা স্যালাইনে মিশিয়ে ধীরে ধীরে ১০-১৫ মিনিট ধরে শিরায় প্রয়োগযোগ্য',
    englishSchedule: '1 to 2 mEq/kg (1-2 ml/kg) diluted 1:1 with sterile water slow IV push over 10-15 min',
    standardDurationDays: 'Emergency stat dose',
    maxSingleDoseMg: 100,
    neonatalSafety: 'caution',
    ageMinMonths: 0,
    warnings: [
      'In neonates and infants: ALWAYS dilute 1:1 with Sterile Water for Injection to make a 4.2% solution (0.5 mEq/ml) to prevent hyperosmolar intracranial hemorrhage.',
      'Ensure adequate ventilation before infusing (bicarbonate combines with H+ to produce CO2; hypoventilation worsens intracellular acidosis).',
      'Never mix with Calcium salts, Inotropes (Dopamine/Epinephrine), or Ceftriaxone in the same line.'
    ],
    clinicalTips: [
      '8.4% solution = 1.0 mEq HCO3 / ml; 7.5% solution = 0.89 mEq HCO3 / ml.',
      'Deficit Formula: Required Bicarbonate (mEq) = 0.3 × Weight (kg) × Base Deficit (or 0.5 × Weight × [Target HCO3 - Current HCO3]). Correct only half the calculated deficit over first 2-4 hours.'
    ],
    banglaPrescriptionTemplate: 'তীব্র অ্যাসিডোসিস বা হাইপারক্যালিমিয়ায় শিরায় ধীরে ধীরে প্রদেয়।',
    formulations: [
      {
        name: '8.4% IV Injection (1.0 mEq/ml) — 25 ml / 100 ml [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 1.0,
        unitLabel: 'ml',
        reconstitutionNote: '1 ml = 1 mEq HCO3. In children < 2 years, dilute 1:1 with sterile water.',
        bdBrands: ['Sodium Bicarbonate 8.4% Inj']
      },
      {
        name: '7.5% IV Injection (0.89 mEq/ml) — 20 ml Ampoule [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 0.89,
        unitLabel: 'ml',
        bdBrands: ['Sodium Bicarbonate 7.5% Inj']
      }
    ]
  },
  {
    id: 'hypertonic_saline_3',
    genericName: '3% Hypertonic Saline (3% NaCl)',
    banglaName: '৩% হাইপারটনিক স্যালাইন ইনফিউশন',
    category: 'electrolytes_emergency',
    categoryLabel: 'Electrolytes & Emergency',
    popularBDBrands: ['3% Sodium Chloride Infusion', 'Hypertonic Saline 3%'],
    manufacturerNotes: 'Popular, Beximco, Square, JMI',
    indication: 'Acute symptomatic hyponatremia (seizures, altered sensorium, coma) where serum sodium < 125 mEq/L',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 3.0,
    minDoseMg: 2.0,
    maxDoseMg: 4.0,
    doseUnit: 'mg/kg/dose',
    frequency: 'Emergency bolus: 3 ml/kg (or 2-4 ml/kg) IV slow infusion over 10-20 minutes',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'তীব্র খিঁচুনি/অজ্ঞান অবস্থায় ৩ মিলি/কেজি ১০-২০ মিনিট ধরে শিরায় ইনফিউশন (সিরাম সোডিয়াম ৩-৫ mEq/L বাড়ায়)',
    englishSchedule: '3 ml/kg IV slow push/infusion over 10-20 min. Repeat once if seizures continue',
    standardDurationDays: 'Emergency stat dose (Max 2 boluses)',
    maxSingleDoseMg: 150,
    neonatalSafety: 'caution',
    ageMinMonths: 0,
    warnings: [
      '3 ml/kg of 3% NaCl raises serum sodium by approximately 2.5 to 3 mEq/L, which is sufficient to stop cerebral edema and abort hyponatremic seizures.',
      'CRITICAL: Total sodium correction must NEVER exceed 10 to 12 mEq/L in the first 24 hours (and < 18 mEq/L in 48 hours) to prevent fatal Osmotic Demyelination Syndrome (Central Pontine Myelinolysis).',
      'If seizures stop, switch to slow maintenance/replacement fluids with frequent electrolyte monitoring every 2-4 hours.'
    ],
    clinicalTips: [
      '3% NaCl contains 513 mEq/L of Na+ (0.513 mEq/ml).',
      'How to make 3% Saline if commercial bottle unavailable: Mix 17 ml of 10% NaCl with 83 ml of 0.9% Normal Saline, OR add 60 ml of 7.45% KCl/NaCl into 500 ml NS.'
    ],
    banglaPrescriptionTemplate: 'হাইপোন্যাট্রিমিয়া জনিত খিঁচুনির জরুরি চিকিৎসায় ৩ মিলি/কেজি ১০-২০ মিনিটে শিরায় প্রদেয়।',
    formulations: [
      {
        name: '3% Sodium Chloride IV Infusion (0.513 mEq/ml) [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 1.0,
        unitLabel: 'ml',
        bdBrands: ['3% Sodium Chloride 100ml / 500ml']
      }
    ]
  },
  {
    id: 'potassium_chloride',
    genericName: 'Potassium Chloride (KCl) Injection & Syrup',
    banglaName: 'পটাশিয়াম ক্লোরাইড (KCl)',
    category: 'electrolytes_emergency',
    categoryLabel: 'Electrolytes & Emergency',
    popularBDBrands: ['K-Sol', 'Potk', 'K-Lyte', 'KCl Injection 15%'],
    manufacturerNotes: 'Square (K-Sol), Incepta (Potk)',
    indication: 'Hypokalemia (serum K+ < 3.5 mEq/L), replacement of ongoing GI losses, maintenance electrolyte additive',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 2.0,
    minDoseMg: 1.0,
    maxDoseMg: 4.0,
    doseUnit: 'mg/kg/day',
    frequency: 'Oral Syrup: 1-2 mEq/kg/day divided BID or TID. IV Infusion: 0.3-0.5 mEq/kg/hour mixed in IV fluid',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'সিরাপ কে-সল/পটক: ১-২ mEq/কেজি/দিন (খাওয়ার পর ভরা পেটে পানি মিশিয়ে দিনে ২-৩ বার)',
    englishSchedule: 'Oral: 1-2 mEq/kg/day divided BID-TID with meals. IV: mixed in fluid (Max 40 mEq/L peripheral line)',
    standardDurationDays: '3 to 5 days until serum K+ normalizes',
    maxSingleDoseMg: 40,
    maxDailyDoseMg: 80,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'DEADLY DANGER: NEVER GIVE UNDILUTED POTASSIUM CHLORIDE (KCl) AS DIRECT IV BOLUS! It causes instantaneous fatal cardiac standstill.',
      'IV Infusion Safety Limits: Maximum peripheral line concentration is 40 mEq/L (20 mEq in 500 ml bottle). Maximum central line concentration is 60–80 mEq/L.',
      'Maximum IV infusion rate: 0.3 to 0.5 mEq/kg/hour with continuous cardiac monitoring.',
      'Never start IV potassium until patient has verified urine output (> 1 ml/kg/hr).'
    ],
    clinicalTips: [
      'Syrup K-Sol / Potk: 20 mEq K+ per 15 ml (1.33 mEq/ml). Always dilute oral syrup in half a glass of juice or water to prevent gastric mucosal ulceration.',
      '15% KCl IV Ampoule: 2 mEq K+ / ml. Must be thoroughly mixed into IV bottle.'
    ],
    banglaPrescriptionTemplate: 'সিরাপ সর্বদা পানি বা ফলের রসে মিশিয়ে ভরা পেটে খাওয়াতে হবে।',
    formulations: [
      {
        name: 'Syrup 20 mEq / 15 ml (1.33 mEq/ml) [Calculated in ml]',
        formType: 'syrup',
        concentrationMgPerMl: 1.33,
        unitLabel: 'ml',
        teaspoonFactor: 5,
        bdBrands: ['K-Sol Syrup', 'Potk Syrup']
      },
      {
        name: '15% IV Injection (2 mEq/ml) — 10 ml Ampoule [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 2.0,
        unitLabel: 'ml',
        reconstitutionNote: 'DILUTE THOROUGHLY in IV fluids. Max 20 mEq (10 ml) in 500 ml bottle for peripheral line.',
        bdBrands: ['KCl 15% 10ml Ampoule']
      }
    ]
  },

  // ==========================================
  // ANTIMALARIAL MEDICATIONS (DGDA & WHO BANGLADESH)
  // ==========================================
  {
    id: 'artemether_lumefantrine',
    genericName: 'Artemether (20 mg) + Lumefantrine (120 mg) Dispersible',
    banglaName: 'আর্টেমেথার + লুমেফ্যান্ট্রিন (কোয়ার্টেম / লুমার্ত)',
    category: 'antimalarial',
    categoryLabel: 'Antimalarials',
    popularBDBrands: ['Coartem', 'Lumart', 'Fartem', 'Artem'],
    manufacturerNotes: 'Novartis (Coartem), Square (Lumart), Beximco (Fartem)',
    indication: 'First-line ACT (Artemisinin-based Combination Therapy) for uncomplicated Plasmodium falciparum and chloroquine-resistant P. vivax malaria in Bangladesh',
    doseType: 'fixed_by_age',
    defaultDoseMg: 1.0,
    minDoseMg: 1.0,
    maxDoseMg: 4.0,
    doseUnit: 'mg/dose',
    frequency: '6-dose regimen over 3 days (Hour 0, 8, 24, 36, 48, 60)',
    frequencyTimesPerDay: 2,
    banglaSchedule: '৬ ডোজের ৩ দিনের কোর্স: প্রথম ডোজ এখন, দ্বিতীয় ডোজ ৮ ঘণ্টা পর, এরপর পরবর্তী ২ দিন সকালে ও রাতে (খাবারের সাথে)',
    englishSchedule: '6-dose schedule over 3 days: Dose 1 stat, Dose 2 at 8 hr, then BID on Day 2 & Day 3 with milk or fatty food',
    standardDurationDays: '3 days (exactly 6 doses)',
    neonatalSafety: 'caution',
    ageMinMonths: 2,
    warnings: [
      'Take with milk, formula, or fatty food! Lumefantrine absorption is increased up to 16-fold by fat.',
      'If child vomits within 1 hour of taking the dose, repeat full dose.',
      'Weight Bands (DGDA & WHO standard): 5–14 kg: 1 tablet/dose; 15–24 kg: 2 tablets/dose; 25–34 kg: 3 tablets/dose; >= 35 kg: 4 tablets/dose.'
    ],
    clinicalTips: [
      'Dispersible tablets dissolve in water in 10-15 seconds, ideal for infants and toddlers.',
      'Rapid parasite clearance and fever defervescence within 24-48 hours.'
    ],
    banglaPrescriptionTemplate: 'দুধ বা চর্বিযুক্ত খাবারের সাথে খাওয়াতে হবে। ৩ দিনের মোট ৬টি ডোজ অবশ্যই সম্পূর্ণ করতে হবে।',
    formulations: [
      {
        name: 'Dispersible Tablet (Artemether 20 mg + Lumefantrine 120 mg)',
        formType: 'dispersible_tablet',
        mgPerUnit: 1,
        unitLabel: 'tablet',
        bdBrands: ['Coartem Dispersible', 'Lumart DT', 'Fartem DT']
      }
    ]
  },
  {
    id: 'artesunate_iv',
    genericName: 'Artesunate IV / IM Injection (60 mg vial)',
    banglaName: 'আর্টেসুনেট ইনজেকশন (তীব্র ম্যালেরিয়া)',
    category: 'antimalarial',
    categoryLabel: 'Antimalarials',
    popularBDBrands: ['Artesun', 'Larinate', 'Arsucam'],
    manufacturerNotes: 'Guilin / Popular, Square',
    indication: 'First-line drug of choice for Severe / Cerebral Malaria in children (reduces mortality significantly compared to quinine)',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 2.4,
    minDoseMg: 2.4,
    maxDoseMg: 3.0,
    doseUnit: 'mg/kg/dose',
    frequency: 'Severe Malaria: 2.4 mg/kg (or 3.0 mg/kg if weight < 20 kg) at 0 hr, 12 hr, 24 hr, then once daily until oral switch',
    frequencyTimesPerDay: 2,
    banglaSchedule: 'প্রথম দিন: ০ ঘণ্টা, ১২ ঘণ্টা ও ২৪ ঘণ্টায় শিরায়; এরপর প্রতিদিন ১ বার যতক্ষণ না মুখে খেতে পারে',
    englishSchedule: '2.4 mg/kg IV (3.0 mg/kg if < 20 kg) at 0, 12, 24 hours, then once daily for minimum 24 hours',
    standardDurationDays: 'Minimum 24 hours IV, then full 3-day course of oral ACT (Coartem)',
    maxSingleDoseMg: 200,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'WHO Recommendation: In children weighing < 20 kg, a higher dose of 3.0 mg/kg/dose gives equivalent drug exposure and superior survival.',
      'Must give at least 3 parenteral doses (24 hours), even if the patient can tolerate oral medicine earlier.',
      'Once patient tolerates oral medication, complete a full 3-day course of Artemether-Lumefantrine.'
    ],
    clinicalTips: [
      'Reconstitution: Dissolve 60 mg powder in 1 ml of 5% Sodium Bicarbonate diluent provided, then dilute with 5 ml Normal Saline or 5% Dextrose -> 10 mg/ml solution. Inject slowly IV over 2-3 minutes.'
    ],
    banglaPrescriptionTemplate: 'হাসপাতালের আইসিইউ বা ওয়ার্ডে জরুরিভিত্তিতে শিরায় প্রদেয়। মুখে খেতে পারলে কোয়ার্টেম শুরু করতে হবে।',
    formulations: [
      {
        name: 'IV/IM Injection 60 mg vial (10 mg/ml reconstituted) [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 10,
        mgPerUnit: 60,
        unitLabel: 'ml',
        reconstitutionNote: 'Reconstitute 60 mg vial with 1 ml 5% Sodium Bicarb ampoule, then add 5 ml NS -> 10 mg/ml solution. Dose 2.4 mg/kg = 0.24 ml/kg (or 0.3 ml/kg if < 20 kg).',
        bdBrands: ['Artesun 60mg Inj', 'Larinate 60mg Inj']
      }
    ]
  },
  {
    id: 'chloroquine',
    genericName: 'Chloroquine Phosphate',
    banglaName: 'ক্লোরোকুইন ফসফেট',
    category: 'antimalarial',
    categoryLabel: 'Antimalarials',
    popularBDBrands: ['Jasochlor', 'Nivaquine', 'Chloroquine'],
    manufacturerNotes: 'Square, Incepta, Sanofi',
    indication: 'Treatment of sensitive Plasmodium vivax, P. malariae, and P. ovale malaria in non-resistant zones',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 10.0,
    minDoseMg: 5.0,
    maxDoseMg: 10.0,
    doseUnit: 'mg/kg/day',
    frequency: '3-day course (Total 25 mg base/kg): Day 1: 10 mg base/kg stat; Day 2: 10 mg base/kg; Day 3: 5 mg base/kg',
    frequencyTimesPerDay: 1,
    banglaSchedule: '৩ দিনের কোর্স: ১ম দিন ১০ মিগ্রা/কেজি, ২য় দিন ১০ মিগ্রা/কেজি, ৩য় দিন ৫ মিগ্রা/কেজি (মোট ২৫ মিগ্রা বেস/কেজি)',
    englishSchedule: 'Day 1: 10 mg base/kg PO; Day 2: 10 mg base/kg PO; Day 3: 5 mg base/kg PO after meals',
    standardDurationDays: '3 days total',
    maxSingleDoseMg: 600,
    maxDailyDoseMg: 600,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Dosing is expressed in Chloroquine BASE (150 mg base = 250 mg chloroquine phosphate). Verify base vs salt on syrup bottle.',
      'Bitter taste can provoke vomiting in children; give with sweet food or banana.',
      'In P. vivax, follow with 14 days of Primaquine to eradicate liver hypnozoites (radical cure).'
    ],
    clinicalTips: [
      'Syrup: 50 mg base per 5 ml (10 mg base/ml). Day 1 & 2 dose = 1 ml syrup per kg; Day 3 dose = 0.5 ml syrup per kg.'
    ],
    banglaPrescriptionTemplate: 'খাওয়ার পর সেব্য। সম্পূর্ণ ৩ দিনের কোর্স শেষ করতে হবে।',
    formulations: [
      {
        name: 'Syrup 50 mg base / 5 ml (10 mg/ml) [Calculated in ml]',
        formType: 'syrup',
        concentrationMgPerMl: 10,
        unitLabel: 'ml',
        teaspoonFactor: 5,
        bdBrands: ['Jasochlor Syrup', 'Nivaquine Syrup']
      },
      {
        name: 'Tablet 150 mg base (250 mg phosphate)',
        formType: 'tablet',
        mgPerUnit: 150,
        unitLabel: 'tablet',
        bdBrands: ['Jasochlor 250mg', 'Nivaquine 250mg']
      }
    ]
  },
  {
    id: 'primaquine',
    genericName: 'Primaquine Phosphate',
    banglaName: 'প্রাইমাকুইন (র‍্যাডিক্যাল কিউর)',
    category: 'antimalarial',
    categoryLabel: 'Antimalarials',
    popularBDBrands: ['PMQ', 'Primaquine', 'Malirid'],
    manufacturerNotes: 'Square, Incepta',
    indication: 'Radical cure of Plasmodium vivax and P. ovale hypnozoites to prevent relapses; single-dose gametocidal in P. falciparum',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 0.25,
    minDoseMg: 0.25,
    maxDoseMg: 0.5,
    doseUnit: 'mg/kg/day',
    frequency: 'P. vivax radical cure: 0.25 to 0.5 mg base/kg once daily with food for 14 consecutive days',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'সিরাম জি৬পিডি (G6PD) পরীক্ষার পর: ০.২৫-০.৫ মিগ্রা/কেজি প্রতিদিন ১ বার করে টানা ১৪ দিন ভরা পেটে',
    englishSchedule: '0.25-0.5 mg base/kg once daily with meals for 14 days (screen for G6PD deficiency first)',
    standardDurationDays: '14 days',
    maxSingleDoseMg: 15,
    maxDailyDoseMg: 30,
    neonatalSafety: 'caution',
    ageMinMonths: 6,
    warnings: [
      'CONTRAINDICATED in G6PD deficiency (causes severe life-threatening acute intravascular hemolysis). Always test G6PD before starting 14-day course.',
      'Contraindicated in infants < 6 months and pregnant females.',
      'Take with food to minimize abdominal cramps and nausea.'
    ],
    clinicalTips: [
      'In mild G6PD deficiency: WHO recommends 0.75 mg base/kg once weekly for 8 weeks under close medical observation.'
    ],
    banglaPrescriptionTemplate: 'রক্তের জি৬পিডি পরীক্ষা স্বাভাবিক হলে তবেই টানা ১৪ দিন ভরা পেটে সেবনীয়। প্রস্রাব গাঢ় লাল বা কালো হলে সাথে সাথে বন্ধ করুন।',
    formulations: [
      {
        name: 'Tablet 7.5 mg base',
        formType: 'tablet',
        mgPerUnit: 7.5,
        unitLabel: 'tablet',
        bdBrands: ['PMQ 7.5mg', 'Primaquine 7.5mg']
      },
      {
        name: 'Tablet 15 mg base',
        formType: 'tablet',
        mgPerUnit: 15,
        unitLabel: 'tablet',
        bdBrands: ['PMQ 15mg', 'Primaquine 15mg']
      }
    ]
  },
  {
    id: 'quinine_iv',
    genericName: 'Quinine Dihydrochloride IV Injection',
    banglaName: 'কুইনাইন ইনজেকশন',
    category: 'antimalarial',
    categoryLabel: 'Antimalarials',
    popularBDBrands: ['Quinine Dihydrochloride Inj', 'Quinimax'],
    manufacturerNotes: 'Square, Gaco',
    indication: 'Alternative treatment of severe malaria when parenteral Artesunate is unavailable',
    doseType: 'per_kg_per_dose',
    defaultDoseMg: 10.0,
    minDoseMg: 10.0,
    maxDoseMg: 20.0,
    doseUnit: 'mg/kg/dose',
    frequency: 'Loading: 20 mg salt/kg in 5% Dextrose over 4 hr; Maintenance: 10 mg salt/kg Q8H over 2-4 hr',
    frequencyTimesPerDay: 3,
    banglaSchedule: 'লোডিং ডোজ: ২০ মিগ্রা/কেজি ৫% ডেক্সট্রোজে ৪ ঘণ্টা ধরে; এরপর প্রতি ৮ ঘণ্টা পর পর ১০ মিগ্রা/কেজি',
    englishSchedule: 'Loading 20 mg salt/kg over 4 hr in D5W, then 10 mg/kg Q8H infused over 2-4 hr',
    standardDurationDays: 'Until patient can swallow oral medicine',
    maxSingleDoseMg: 1200,
    neonatalSafety: 'caution',
    ageMinMonths: 0,
    warnings: [
      'HIGH RISK OF HYPOGLYCEMIA: Quinine is a potent stimulator of pancreatic insulin secretion. Always infuse in 5% or 10% Dextrose and monitor blood glucose every 2-4 hours.',
      'NEVER give IV bolus (causes lethal hypotension and arrhythmias). Must be infused over at least 2-4 hours.',
      'Cardiotoxic: Monitor ECG for QT prolongation.'
    ],
    clinicalTips: [
      'Artesunate IV is significantly superior to Quinine in terms of survival and ease of administration. Use Quinine only if Artesunate is unavailable.'
    ],
    banglaPrescriptionTemplate: 'আইসিইউতে ডেক্সট্রোজ স্যালাইনের সাথে ধীরগতিতে ইনফিউশনে প্রদেয়। রক্তে গ্লুকোজ নিয়মিত মাপতে হবে।',
    formulations: [
      {
        name: 'IV Injection 300 mg / ml — 2 ml Ampoule (600 mg) [Calculated in ml]',
        formType: 'injection',
        concentrationMgPerMl: 300,
        mgPerUnit: 600,
        unitLabel: 'ml',
        reconstitutionNote: 'Dilute in 5-10 ml/kg of 5% Dextrose and infuse slowly over 4 hours.',
        bdBrands: ['Quinine 600mg/2ml Inj']
      }
    ]
  },

  // ==========================================
  // ANTI-TUBERCULOSIS (TB) DRUGS (NTP BANGLADESH & WHO)
  // ==========================================
  {
    id: 'pediatric_tb_rhz',
    genericName: 'Pediatric TB Dispersible FDC (R75 / H50 / Z150)',
    banglaName: 'শিশু টিবি ৩-কম্বিনেশন বড়ি (RHZ)',
    category: 'antitubercular',
    categoryLabel: 'Anti-TB Medications',
    popularBDBrands: ['R-Cinex Z Kid', 'Tombex Kid', 'NTP Pediatric TB Kit'],
    manufacturerNotes: 'Beximco (Tombex Kid), Square (R-Cinex Kid), NTP Bangladesh (Free government supply)',
    indication: 'Intensive Phase (first 2 months) of Pediatric Tuberculosis (Pulmonary TB, Lymph node TB, Abdominal TB, TB Meningitis)',
    doseType: 'fixed_by_age',
    defaultDoseMg: 1.0,
    minDoseMg: 1.0,
    maxDoseMg: 4.0,
    doseUnit: 'mg/dose',
    frequency: 'Once daily in the morning on an empty stomach (30 min before breakfast) for 2 months (8 weeks)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'প্রতিদিন সকালে খালি পেটে ১ বার পানিতে গুলিয়ে খাবে (টানা ২ মাস - ইনটেনসিভ ফেজ)',
    englishSchedule: 'Once daily in the morning on an empty stomach dispersed in 5-10 ml water for 2 months',
    standardDurationDays: '2 months (Intensive Phase 2HRZ)',
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Each dispersible tablet contains: Rifampicin 75 mg + Isoniazid 50 mg + Pyrazinamide 150 mg.',
      'Weight Bands (NTP Bangladesh & WHO standard): 4–7 kg: 1 tablet/day; 8–11 kg: 2 tablets/day; 12–15 kg: 3 tablets/day; 16–24 kg: 4 tablets/day; >= 25 kg: Use adult formulations.',
      'Rifampicin turns urine, tears, and sweat harmlessly orange-red. Reassure the parents.',
      'Give Pyridoxine (Vitamin B6) 5-10 mg/day concurrently to prevent INH-induced peripheral neuropathy.'
    ],
    clinicalTips: [
      'Child-friendly fruit flavored dispersible tablets dissolve in a spoon of clean water in 10-20 seconds.',
      'Available FREE OF COST at all Upazila Health Complexes (UHC) and DOTS corners across Bangladesh under the National TB Control Programme (NTP).'
    ],
    banglaPrescriptionTemplate: 'প্রতিদিন সকালে নাস্তার ৩০ মিনিট আগে পানিতে গুলিয়ে খাবে। প্রস্রাব লাল বা কমলা হতে পারে, এতে ভয়ের কিছু নেই।',
    formulations: [
      {
        name: 'Dispersible Tablet (R 75mg + H 50mg + Z 150mg)',
        formType: 'dispersible_tablet',
        mgPerUnit: 1,
        unitLabel: 'tablet',
        bdBrands: ['NTP Pediatric TB RHZ Kid', 'Tombex Kid Tab', 'R-Cinex Z Kid']
      }
    ]
  },
  {
    id: 'pediatric_tb_rh',
    genericName: 'Pediatric TB Dispersible FDC (R75 / H50)',
    banglaName: 'শিশু টিবি ২-কম্বিনেশন বড়ি (RH)',
    category: 'antitubercular',
    categoryLabel: 'Anti-TB Medications',
    popularBDBrands: ['R-Cinex Kid', 'Tombex RH Kid', 'NTP Continuation Kit'],
    manufacturerNotes: 'Beximco (Tombex), Square (R-Cinex), NTP Bangladesh',
    indication: 'Continuation Phase (4 to 10 months) of Pediatric Tuberculosis following 2 months of intensive phase',
    doseType: 'fixed_by_age',
    defaultDoseMg: 1.0,
    minDoseMg: 1.0,
    maxDoseMg: 4.0,
    doseUnit: 'mg/dose',
    frequency: 'Once daily in the morning on an empty stomach for 4 months (Pulmonary/Lymph node) or 10 months (TB Meningitis/Bone TB)',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'প্রতিদিন সকালে খালি পেটে ১ বার পানিতে গুলিয়ে খাবে (টানা ৪ মাস - কন্টিনিউয়েশন ফেজ)',
    englishSchedule: 'Once daily in the morning on an empty stomach for 4 months (4HR regimen)',
    standardDurationDays: '4 months (Total 6 months treatment)',
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Each dispersible tablet contains: Rifampicin 75 mg + Isoniazid 50 mg.',
      'Weight Bands: 4–7 kg: 1 tablet/day; 8–11 kg: 2 tablets/day; 12–15 kg: 3 tablets/day; 16–24 kg: 4 tablets/day.',
      'Strict adherence without missing a single day is critical to prevent Multi-Drug Resistant TB (MDR-TB).'
    ],
    clinicalTips: [
      'Duration: Pulmonary & Lymph Node TB: 4 months continuation (Total 6 months: 2HRZ + 4HR). TB Meningitis & Spinal/Osteoarticular TB: 10 months continuation (Total 12 months: 2HRZE + 10HR).'
    ],
    banglaPrescriptionTemplate: 'প্রতিদিন সকালে খালি পেটে পানিতে গুলিয়ে খাবে। একদিনের জন্যও ওষুধ বন্ধ করা যাবে না।',
    formulations: [
      {
        name: 'Dispersible Tablet (R 75mg + H 50mg)',
        formType: 'dispersible_tablet',
        mgPerUnit: 1,
        unitLabel: 'tablet',
        bdBrands: ['NTP Pediatric TB RH Kid', 'Tombex RH Kid', 'R-Cinex Kid']
      }
    ]
  },
  {
    id: 'ethambutol',
    genericName: 'Ethambutol (E)',
    banglaName: 'ইথামবিউটল',
    category: 'antitubercular',
    categoryLabel: 'Anti-TB Medications',
    popularBDBrands: ['Myambutol', 'Etibi', 'Ethambutol'],
    manufacturerNotes: 'Square (Etibi), Beximco',
    indication: 'Fourth drug in intensive phase (2HRZE) for extensive pulmonary TB, cavitary TB, TB Meningitis, and areas with high INH resistance',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 20.0,
    minDoseMg: 15.0,
    maxDoseMg: 25.0,
    doseUnit: 'mg/kg/day',
    frequency: 'Once daily in the morning for 2 months alongside RHZ',
    frequencyTimesPerDay: 1,
    banglaSchedule: '২০ মিগ্রা/কেজি প্রতিদিন সকালে ১ বার (টানা ২ মাস ইনটেনসিভ ফেজে RHZ-এর সাথে)',
    englishSchedule: '20 mg/kg/day (range 15-25 mg/kg) once daily with RHZ for 2 months',
    standardDurationDays: '2 months',
    maxSingleDoseMg: 1200,
    maxDailyDoseMg: 1200,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'WHO has confirmed that Ethambutol is SAFE in children of all ages (including neonates and infants) at the recommended dose of 20 mg/kg/day.',
      'Retrobulbar optic neuritis (decreased visual acuity, red-green color blindness) is extremely rare at 20 mg/kg/day; stop if visual changes reported.'
    ],
    clinicalTips: [
      'Always added to RHZ in TB Meningitis and severe/extensive parenchymal TB.'
    ],
    banglaPrescriptionTemplate: 'সকালে অন্য টিবি ওষুধের সাথে ১ বার খাবে।',
    formulations: [
      {
        name: 'Tablet 100 mg (Pediatric)',
        formType: 'tablet',
        mgPerUnit: 100,
        unitLabel: 'tablet',
        bdBrands: ['Etibi 100mg', 'Myambutol 100mg']
      },
      {
        name: 'Tablet 400 mg',
        formType: 'tablet',
        mgPerUnit: 400,
        unitLabel: 'tablet',
        bdBrands: ['Etibi 400mg', 'Myambutol 400mg']
      }
    ]
  },
  {
    id: 'isoniazid',
    genericName: 'Isoniazid (H) / INH Prophylaxis',
    banglaName: 'আইসোনিয়াজিড (টিবি প্রতিরোধ ও চিকিৎসা)',
    category: 'antitubercular',
    categoryLabel: 'Anti-TB Medications',
    popularBDBrands: ['Isoniazid', 'Tibinide', 'Nidapid'],
    manufacturerNotes: 'Square, Beximco',
    indication: 'TPT (TB Preventive Treatment) for child contacts < 5 years exposed to smear-positive pulmonary TB; single-agent component of TB regimen',
    doseType: 'per_kg_per_day',
    defaultDoseMg: 10.0,
    minDoseMg: 7.0,
    maxDoseMg: 15.0,
    doseUnit: 'mg/kg/day',
    frequency: 'TB Prophylaxis (TPT): 10 mg/kg once daily for 6 months',
    frequencyTimesPerDay: 1,
    banglaSchedule: 'টিবি প্রতিরোধে (TPT): ১০ মিগ্রা/কেজি প্রতিদিন সকালে ১ বার খালি পেটে টানা ৬ মাস',
    englishSchedule: '10 mg/kg (range 7-15 mg/kg, max 300 mg) once daily on an empty stomach for 6 months',
    standardDurationDays: '6 months for prophylaxis',
    maxSingleDoseMg: 300,
    maxDailyDoseMg: 300,
    neonatalSafety: 'safe',
    ageMinMonths: 0,
    warnings: [
      'Rule out active TB before starting TPT (screen for cough, fever, weight loss, lethargy).',
      'Give Pyridoxine (Vitamin B6) 5 to 10 mg/day concurrently to prevent peripheral neuropathy, especially in malnourished or breastfed infants.'
    ],
    clinicalTips: [
      'NTP Bangladesh protocol: ALL household child contacts < 5 years of an adult pulmonary TB patient MUST receive 6 months of Isoniazid Preventive Therapy (IPT) after ruling out active disease.'
    ],
    banglaPrescriptionTemplate: 'পরিবারে টিবি রোগী থাকলে ৫ বছরের কম বয়সী শিশুকে টিবি প্রতিরোধে টানা ৬ মাস খাওয়াতে হবে।',
    formulations: [
      {
        name: 'Tablet 100 mg (Pediatric)',
        formType: 'tablet',
        mgPerUnit: 100,
        unitLabel: 'tablet',
        bdBrands: ['Isoniazid 100mg Tab', 'Tibinide 100mg']
      },
      {
        name: 'Tablet 300 mg',
        formType: 'tablet',
        mgPerUnit: 300,
        unitLabel: 'tablet',
        bdBrands: ['Isoniazid 300mg Tab']
      }
    ]
  }
];

export const THERAPEUTIC_CATEGORIES: { id: string; label: string; count?: number }[] = [
  { id: 'all', label: 'All Medications' },
  { id: 'antipyretic_analgesic', label: 'Fever & Pain' },
  { id: 'antibiotics', label: 'Antibiotics' },
  { id: 'antimalarial', label: 'Antimalarials' },
  { id: 'antitubercular', label: 'Anti-TB (NTP BD)' },
  { id: 'respiratory', label: 'Respiratory & Asthma' },
  { id: 'antihistamine', label: 'Antihistamines & Allergy' },
  { id: 'gastrointestinal', label: 'GI & Diarrhea' },
  { id: 'anticonvulsant_emergency', label: 'Emergency & Resuscitation' },
  { id: 'electrolytes_emergency', label: 'Electrolyte Correction' },
  { id: 'corticosteroids', label: 'Steroids' },
  { id: 'cardiovascular', label: 'Cardiovascular & Diuretics' },
  { id: 'vitamins_minerals', label: 'Vitamins & Minerals' },
  { id: 'ophthalmic_topical', label: 'Eye Drops & ENT' }
];

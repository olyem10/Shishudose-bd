import { ClinicalGuideline } from '../types/pediatric';

export const BANGLADESH_CLINICAL_GUIDELINES: ClinicalGuideline[] = [
  {
    id: 'icddrb-diarrhea',
    title: 'ICDDR,B & WHO Diarrhea & Dehydration Protocol',
    banglaTitle: 'আইসিডিডিআর,বি ও ডব্লিউএইচও ডায়রিয়া প্রোটোকল',
    category: 'Gastroenterology',
    summary: 'Standardized Bangladesh protocol for assessment and management of acute watery diarrhea, dehydration (Plan A, B, C), dysentery, and mandatory zinc therapy.',
    badge: 'ICDDR,B National Protocol',
    sections: [
      {
        heading: '1. Dehydration Assessment Triage',
        content: [
          'Examine the child for 4 key clinical signs: General condition, Eyes, Ability to drink, and Skin pinch.',
          'No Dehydration: Well, alert, normal eyes, drinks normally, skin pinch goes back immediately. -> Follow Plan A.',
          'Some Dehydration: Restless, irritable, sunken eyes, drinks eagerly/thirsty, skin pinch goes back slowly (<2 seconds). Two or more signs present. -> Follow Plan B.',
          'Severe Dehydration: Lethargic or unconscious, sunken eyes, unable to drink or drinks poorly, skin pinch goes back very slowly (>2 seconds). Two or more signs present. -> Follow Plan C (Emergency IV).'
        ],
        callout: {
          type: 'warning',
          text: 'In Severe Dehydration, prioritize immediate IV access with Cholera Saline (ICDDR,B) or Ringer’s Lactate. If IV is not available, insert Nasogastric (NG) tube and start ORS 20 ml/kg/hr while transferring.'
        }
      },
      {
        heading: '2. Plan A: Home Treatment (Prevent Dehydration)',
        content: [
          'Give extra fluids: Oral Rehydration Salt (ORS) solution, labon-gur sharbat, chira-pani, rice kanji, coconut water, or clean water.',
          'ORS replacement after each loose stool: Age < 2 years: 50–100 ml (1/4 to 1/2 large cup); Age 2–10 years: 100–200 ml (1/2 to 1 cup); Older: as much as wanted.',
          'Mandatory Zinc Supplementation for 10-14 days: Age < 6 months: 10 mg/day; Age >= 6 months: 20 mg/day.',
          'Continue regular feeding and frequent breastfeeding throughout the illness. Do not dilute milk.'
        ]
      },
      {
        heading: '3. Plan B: Treatment of Some Dehydration (Oral Rehydration)',
        content: [
          'Approximate ORS volume (ml) = Weight in kg × 75 ml, administered over 4 hours.',
          'Give by clean cup and spoon. For infants, give a teaspoon every 1-2 minutes.',
          'If the child vomits, wait 10 minutes, then continue ORS more slowly (one spoonful every 2-3 minutes). A single dose of Ondansetron (0.15 mg/kg) may be given if vomiting is intractable.',
          'Reassess after 4 hours: If hydrated -> switch to Plan A. If still some dehydration -> repeat Plan B for 4 more hours. If severe -> switch to Plan C.'
        ],
        tableData: {
          headers: ['Weight (kg)', 'Age Guide', 'ORS Volume in 4 Hours (ml)'],
          rows: [
            ['< 5 kg', '< 4 months', '200 – 400 ml'],
            ['5 – 7.9 kg', '4 – 11 months', '400 – 600 ml'],
            ['8 – 10.9 kg', '12 – 23 months', '600 – 800 ml'],
            ['11 – 15.9 kg', '2 – 4 years', '800 – 1200 ml'],
            ['16 – 29.9 kg', '5 – 14 years', '1200 – 2200 ml']
          ]
        }
      },
      {
        heading: '4. Plan C: Severe Dehydration (Rapid IV Rehydration)',
        content: [
          'Solution of choice: Cholera Saline (ICDDR,B formula) or Ringer’s Lactate (Hartmann’s solution). If unavailable, Normal Saline (0.9% NaCl).',
          'Total IV Fluid Volume = 100 ml/kg, given in two phases:',
          'Infants (< 12 months): 30 ml/kg in 1 hour -> then 70 ml/kg over 5 hours (Total 6 hours).',
          'Children (>= 12 months): 30 ml/kg in 30 minutes -> then 70 ml/kg over 2.5 hours (Total 3 hours).',
          'Also give ORS (5 ml/kg/hr) as soon as child can drink, usually after 3-4 hours (infants) or 1-2 hours (children).'
        ],
        callout: {
          type: 'alert',
          text: 'Check radial pulse frequently. If radial pulse is still weak or undetectable at the end of the first 30 ml/kg, repeat the 30 ml/kg bolus rapidly.'
        }
      },
      {
        heading: '5. Dysentery (Blood in Stools)',
        content: [
          'Bloody loose stools indicate invasive Shigellosis or Campylobacter.',
          'First-line antibiotic in Bangladesh (ICDDR,B & WHO): Oral Ciprofloxacin (15 mg/kg BID for 3 days).',
          'Alternative if resistant or unresponsive after 48 hours: Oral Azithromycin (10-20 mg/kg OD for 3-5 days) or IV Ceftriaxone (50-75 mg/kg OD for 3 days).',
          'NEVER give antimotility agents (e.g. Loperamide) or anticholinergics in children.'
        ]
      }
    ],
    references: [
      'ICDDR,B Clinical Protocol for Management of Diarrhoeal Diseases in Children (Dhaka)',
      'WHO The Treatment of Diarrhoea: A manual for physicians and other senior health workers (4th Rev)'
    ]
  },
  {
    id: 'imci-pneumonia',
    title: 'WHO IMCI Acute Respiratory Infections & Pneumonia',
    banglaName: 'ডব্লিউএইচও আইএমসিআই নিউমোনিয়া প্রোটোকল',
    category: 'Pulmonology',
    summary: 'Age-specific fast breathing thresholds, chest indrawing triage, high-dose oral Amoxicillin guidelines, and danger sign identification for Bangladesh.',
    badge: 'WHO IMCI Guidelines',
    sections: [
      {
        heading: '1. Fast Breathing Diagnostic Cut-Offs',
        content: [
          'Count the respiratory rate for 1 FULL MINUTE when the child is calm and not crying.',
          'Age < 2 months: >= 60 breaths per minute (Fast Breathing / Sepsis sign).',
          'Age 2 – 11 months: >= 50 breaths per minute (Fast Breathing).',
          'Age 12 – 59 months: >= 40 breaths per minute (Fast Breathing).'
        ],
        tableData: {
          headers: ['Age Group', 'Normal RR', 'Fast Breathing Threshold'],
          rows: [
            ['< 2 Months', '30 – 50 bpm', '≥ 60 breaths / min'],
            ['2 – 11 Months', '25 – 40 bpm', '≥ 50 breaths / min'],
            ['12 – 59 Months', '20 – 35 bpm', '≥ 40 breaths / min'],
            ['≥ 5 Years', '15 – 25 bpm', '≥ 30 breaths / min']
          ]
        }
      },
      {
        heading: '2. IMCI Clinical Classification',
        content: [
          'NON-SEVERE PNEUMONIA: Fast breathing, NO lower chest indrawing, NO general danger signs. -> Outpatient high-dose oral Amoxicillin.',
          'SEVERE PNEUMONIA: Fast breathing with Lower Chest Wall Indrawing (subcostal retraction), or nasal flaring/grunting. -> Admit to hospital, oxygen if SpO2 < 92%, parenteral antibiotics (Ampicillin + Gentamicin or IV Ceftriaxone).',
          'VERY SEVERE PNEUMONIA / DANGER SIGNS: Stridor at rest, unable to drink/breastfeed, persistent vomiting, convulsions, lethargy or unconsciousness, cyanosis, severe malnutrition. -> Urgent resuscitation and referral.'
        ]
      },
      {
        heading: '3. Antibiotic Regimens',
        content: [
          'First-line Outpatient (WHO updated): Oral Amoxicillin high-dose 80–90 mg/kg/day divided into 2 doses (every 12 hours) for 5 days.',
          'Alternative if allergic to Penicillin: Oral Azithromycin (10 mg/kg once daily for 3-5 days) or Cefuroxime Axetil (30 mg/kg/day BID).',
          'Severe Inpatient: IV Ampicillin (50 mg/kg Q6H) + IV Gentamicin (7.5 mg/kg OD) for 5-7 days; OR IV Ceftriaxone (50-80 mg/kg OD).'
        ],
        callout: {
          type: 'info',
          text: 'Fever and fast breathing should improve within 48-72 hours of Amoxicillin. If worsening, assess for empyema, pneumothorax, or resistant atypical pathogens.'
        }
      }
    ],
    references: [
      'WHO IMCI Chart Booklet - Bangladesh Adaptation (DGHS & BPA)',
      'Revised WHO Guidelines on the Management of Childhood Pneumonia'
    ]
  },
  {
    id: 'dengue-pediatric',
    title: 'Pediatric Dengue Clinical Management Protocol',
    banglaName: 'জাতীয় পেডিয়াট্রিক ডেঙ্গু প্রোটোকল',
    category: 'Infectious Disease',
    summary: 'Bangladesh National Dengue Guidelines: Phase identification, critical plasma leakage detection, fluid maintenance and deficit calculation, and warning signs.',
    badge: 'National Dengue Guidelines BD',
    sections: [
      {
        heading: '1. Disease Phases & Timeline',
        content: [
          'Febrile Phase (Days 1–3 to 5): High abrupt fever, flushed face, headache, retro-orbital pain, myalgia, vomiting. Positive tourniquet test.',
          'Critical Phase (Days 3–7, coincides with defervescence / temperature dropping to 37.5-38°C): Risk of PLASMA LEAKAGE into pleural and peritoneal cavities lasting 24 to 48 hours. Risk of Dengue Shock Syndrome (DSS).',
          'Convalescent / Recovery Phase: Plasma reabsorption, hemodynamic stabilization, return of appetite, convalescent rash with islands of white in a sea of red, bradycardia.'
        ],
        callout: {
          type: 'alert',
          text: 'DANGER ZONE: The most critical period is NOT the high fever days, but the 24-48 hours around when fever SUBSIDES (Days 4 to 6). Monitor Hematocrit (HCT) and vital signs closely.'
        }
      },
      {
        heading: '2. Warning Signs (Indications for Hospital Admission)',
        content: [
          'Persistent vomiting (>= 3 episodes in 12 hours) or inability to retain fluids.',
          'Severe abdominal pain or tenderness (indicates plasma leakage / hepatitis).',
          'Lethargy, restlessness, or sudden behavioral change.',
          'Mucosal bleeding (epistaxis, gum bleed, melena, hematemesis).',
          'Hepatomegaly > 2 cm below costal margin.',
          'Clinical fluid accumulation: pleural effusion, ascites, puffy eyelids.',
          'Laboratory: Progressive increase in Hematocrit (HCT) >= 20% alongside rapid platelet drop (< 100,000/μL).'
        ]
      },
      {
        heading: '3. Fluid Therapy in Dengue with Warning Signs',
        content: [
          'Fluid quota for Critical Phase (48 hours) = Maintenance (Holliday-Segar) + 5% Deficit.',
          'Preferred fluid: Normal Saline (0.9% NaCl) or Ringer’s Lactate.',
          'Step-down titration based on urine output (> 1 ml/kg/hr) and HCT:',
          'Start at 5–7 ml/kg/hr for 1–2 hours -> reduce to 3–5 ml/kg/hr for 2–4 hours -> reduce to 2–3 ml/kg/hr if vitals and HCT stable.',
          'NEVER administer boluses without evidence of shock or hypoperfusion. Overhydration leads to pulmonary edema and death in convalescent phase.'
        ],
        tableData: {
          headers: ['Weight (kg)', 'Holliday-Segar Maintenance Rate', 'Dengue 5-7 ml/kg/hr Rate'],
          rows: [
            ['5 kg', '20 ml / hr', '25 – 35 ml / hr'],
            ['10 kg', '40 ml / hr', '50 – 70 ml / hr'],
            ['15 kg', '50 ml / hr', '75 – 105 ml / hr'],
            ['20 kg', '60 ml / hr', '100 – 140 ml / hr'],
            ['30 kg', '70 ml / hr', '150 – 210 ml / hr']
          ]
        }
      },
      {
        heading: '4. Critical Medications Do’s and Don’ts',
        content: [
          'Paracetamol ONLY for fever: 10–15 mg/kg/dose Q4-6H (Max 60 mg/kg/day).',
          'ABSOLUTELY CONTRAINDICATED: Ibuprofen, Aspirin, Mefenamic Acid, Diclofenac, or any NSAID (causes fatal gastrointestinal hemorrhage and accelerates platelet destruction).',
          'AVOID Intramuscular (IM) injections (causes massive hematoma).',
          'Do NOT give prophylactic platelet transfusions solely based on platelet count. Transfuse platelets only in presence of active severe bleeding.'
        ]
      }
    ],
    references: [
      'National Guidelines for Clinical Management of Dengue Syndrome (DGHS, Mohakhali, Dhaka)',
      'WHO Comprehensive Guidelines for Prevention and Control of Dengue and Dengue Haemorrhagic Fever'
    ]
  },
  {
    id: 'asthma-bpa',
    title: 'Acute Severe Asthma & Wheeze Management',
    banglaName: 'তীব্র হাঁপানি ও শ্বাসকষ্ট প্রোটোকল (বিপিএ)',
    category: 'Pulmonology',
    summary: 'Bangladesh Paediatric Association (BPA) protocol for acute wheezing: nebulization cycle, systemic steroids, magnesium sulphate, and spacer discharge.',
    badge: 'BPA Asthma Guidelines',
    sections: [
      {
        heading: '1. Severity Triage',
        content: [
          'Mild: Breathless walking, speaks in sentences, alert, SpO2 > 94%.',
          'Moderate: Breathless talking, speaks in phrases, accessory muscle use, SpO2 91–94%, wheeze loud.',
          'Severe: Breathless at rest, speaks in words only, marked sternal/intercostal retraction, SpO2 < 91%, agitated.',
          'Life-Threatening: Silent chest (no wheeze due to minimal air entry), poor respiratory effort, cyanosis, exhaustion, drowsiness or confusion.'
        ]
      },
      {
        heading: '2. Immediate Emergency Protocol (First 1 Hour)',
        content: [
          'High-flow Oxygen: Target SpO2 94–98%.',
          'Nebulization with Salbutamol (5 mg/ml): Age < 5 yr: 0.5 ml (2.5 mg) in 2.5 ml NS; Age >= 5 yr: 1.0 ml (5 mg) in 2.5 ml NS. Repeat every 20 minutes for 3 doses.',
          'Add Ipratropium Bromide (250 mcg/ml): 1 ml (250 mcg) added to Salbutamol nebulization for first hour in moderate/severe attacks.',
          'Systemic Corticosteroids: Oral Prednisolone (1–2 mg/kg stat, max 40-60 mg) OR IV Hydrocortisone (4 mg/kg stat) if vomiting or severely dyspneic.'
        ],
        callout: {
          type: 'warning',
          text: 'If life-threatening or unresponsive to initial 3 nebulizations, add IV Magnesium Sulphate (50% solution: 0.1 ml/kg = 50 mg/kg, max 2 g) infused over 20 minutes in 5% Dextrose.'
        }
      },
      {
        heading: '3. Post-Crisis Maintenance & Discharge Plan',
        content: [
          'Space Salbutamol nebulization or MDI to every 1-2 hours, then Q4H as tolerated.',
          'Continue Oral Prednisolone 1–2 mg/kg/day (morning dose) for 3 to 5 days (no tapering required).',
          'Transition to MDI with Spacer (e.g. Babyhaler / AeroChamber): 2–4 puffs Q4H PRN.',
          'Review inhaler technique and prescribe daily Inhaled Corticosteroid (Budesonide / Fluticasone) or Montelukast if recurrent wheeze.'
        ]
      }
    ],
    references: [
      'Bangladesh Paediatric Association (BPA) Pediatric Asthma Guidelines',
      'Global Initiative for Asthma (GINA) Pediatric Update'
    ]
  },
  {
    id: 'status-epilepticus',
    title: 'Pediatric Febrile Convulsions & Status Epilepticus',
    banglaName: 'শিশুর খিঁচুনি ও স্ট্যাটাস এপিলেপ্টিকাস প্রোটোকল',
    category: 'Neurology',
    summary: 'Step-by-step algorithm: emergency airway, rescue Midazolam / Diazepam, blood sugar check, second-line Phenytoin / Phenobarbital, and hospital admission.',
    badge: 'Pediatric Emergency Protocol',
    sections: [
      {
        heading: '1. Step 1: 0 – 5 Minutes (Airway & Supportive Care)',
        content: [
          'Position: Place child in lateral recovery position to maintain airway and prevent aspiration.',
          'Clear secretions, suction gently if needed. High-flow oxygen via non-rebreather mask.',
          'Do NOT insert objects, fingers, or spoons into the child’s mouth.',
          'Check bedside Blood Glucose immediately. If Hypoglycemia (< 2.6 mmol/L in neonate, < 3.0 mmol/L in child): Give 10% Dextrose 2 ml/kg IV bolus.'
        ]
      },
      {
        heading: '2. Step 2: 5 – 10 Minutes (First-line Benzodiazepine Rescue)',
        content: [
          'BUCCAL MIDAZOLAM (Preferred First-Line): 0.2–0.3 mg/kg into cheek pouch (Max 10 mg). Fast onset, no IV line needed.',
          'Alternative: RECTAL DIAZEPAM: 0.5 mg/kg (draw up from IV ampoule with syringe without needle, insert into rectum, squeeze, hold buttocks 2 min).',
          'If IV access is already established: IV LORAZEPAM (0.1 mg/kg) or IV DIAZEPAM (0.2–0.3 mg/kg slowly over 2-3 minutes).',
          'If seizure continues after 5 minutes of first dose: Repeat ONE dose of Benzodiazepine.'
        ],
        callout: {
          type: 'alert',
          text: 'Be prepared for respiratory depression. Have Bag-Valve-Mask (Ambu bag) and suction ready after administering Benzodiazepines.'
        }
      },
      {
        heading: '3. Step 3: 15 – 30 Minutes (Established Status Epilepticus)',
        content: [
          'Neonates (< 28 days): IV PHENOBARBITAL loading dose 20 mg/kg diluted in Normal Saline infused slowly over 20 minutes.',
          'Infants & Children (> 1 month): IV PHENYTOIN loading dose 20 mg/kg in Normal Saline over 20–30 minutes (cardiac monitoring required); OR IV LEVETIRACETAM (Keppra) 40–60 mg/kg over 10 minutes.',
          'If seizure persists beyond 30-40 minutes: Transfer immediately to PICU for general anesthesia (Midazolam infusion, Propofol, or Thiopental).'
        ]
      },
      {
        heading: '4. Febrile Convulsion Family Counseling',
        content: [
          'Reassure parents: Simple febrile seizures last < 15 minutes, are generalized, do not recur within 24 hours, and DO NOT cause brain damage.',
          'Antipyretics (Paracetamol) provide comfort, but evidence shows they do not prevent future febrile seizures.',
          'Teach parents how to position child laterally and when to use home rescue Rectal Diazepam or Buccal Midazolam if seizure lasts > 5 minutes.'
        ]
      }
    ],
    references: [
      'Advanced Paediatric Life Support (APLS) Status Epilepticus Algorithm',
      'Indian Academy of Pediatrics & BPA Guidelines on Management of Febrile Seizures'
    ]
  },
  {
    id: 'sam-malnutrition',
    title: 'Severe Acute Malnutrition (SAM) ICDDR,B 10 Steps',
    banglaName: 'তীব্র অপুষ্টি ব্যবস্থাপনা (আইসিডিডিআর,বি ১০টি ধাপ)',
    category: 'Nutrition',
    summary: 'ICDDR,B protocols for children with SAM: F-75 initiation, ReSoMal caution, hypoglycemia and hypothermia prevention, and avoiding rapid IV fluids.',
    badge: 'ICDDR,B Nutrition Protocol',
    sections: [
      {
        heading: '1. Diagnostic Criteria for SAM',
        content: [
          'Mid-Upper Arm Circumference (MUAC) < 115 mm (Red zone on Shakir tape) in children 6–59 months.',
          'Weight-for-Height Z-score (WHZ) < -3 SD on WHO growth charts.',
          'Bilateral pitting edema of nutritional origin (Kwashiorkor).'
        ]
      },
      {
        heading: '2. The 10 Essential Steps of SAM Management',
        content: [
          '1. Treat/Prevent Hypoglycemia: Give 50 ml 10% Dextrose or 10% sucrose orally/NG immediately. Feed F-75 every 2 hours day and night.',
          '2. Treat/Prevent Hypothermia: Keep child warm with Kangaroo Mother Care, clothes, blankets (room temp 28–32°C).',
          '3. Treat/Prevent Dehydration: DO NOT use standard ORS (sodium too high). Use ReSoMal (Rehydration Solution for Malnutrition: 45 mmol/L Na, high potassium) 5 ml/kg every 30 min for 2 hours, then 5-10 ml/kg/hr for 4-10 hours. AVOID RAPID IV FLUIDS (risk of congestive heart failure).',
          '4. Correct Electrolyte Imbalance: Extra potassium (3-4 mmol/kg/day) and magnesium (0.4-0.6 mmol/kg/day). Low sodium.',
          '5. Treat/Prevent Infections: SAM children do not mount a high fever. Give broad-spectrum antibiotic to ALL SAM cases: Oral Amoxicillin (50 mg/kg/day) or IV Ampicillin + Gentamicin for 7 days.',
          '6. Correct Micronutrient Deficiencies: Vitamin A high-dose, Zinc (2 mg/kg/day), Folic acid (5 mg Day 1 then 1 mg/day). DO NOT GIVE IRON in initial stabilization phase (causes free radical toxicity).',
          '7. Start Cautious Feeding (F-75): 100 kcal/kg/day, 1-1.5 g protein/kg/day. 130 ml/kg/day of F-75 divided into 8 or 12 feeds.',
          '8. Catch-up Growth (F-100 / RUTF): Once appetite returns and edema subsides (usually Day 3-7), switch to F-100 or Plumpy’Nut (RUTF) with unrestricted feeding.',
          '9. Provide Sensory Stimulation and Emotional Support.',
          '10. Prepare for Discharge and Follow-up.'
        ],
        callout: {
          type: 'warning',
          text: 'CARDINAL RULE: Never give rapid IV fluid boluses to a malnourished child unless in frank shock. Their myocardium is atrophic; volume overload causes fatal acute pulmonary edema.'
        }
      }
    ],
    references: [
      'ICDDR,B Management of Severe Acute Malnutrition Guidelines (Mohakhali)',
      'WHO Guideline: Updates on the Management of Severe Acute Malnutrition in Infants and Children'
    ]
  },
  {
    id: 'neonatal-sepsis',
    title: 'Neonatal Sepsis & Fever in Infant < 2 Months',
    banglaName: 'নবজাতকের সেপসিস ও তরুণ শিশুর জ্বর ব্যবস্থাপনা',
    category: 'Neonatology',
    summary: 'Empirical parenteral antibiotic regimens (Ampicillin + Gentamicin / Cefotaxime), danger signs, lumbar puncture indications, and fluid management.',
    badge: 'Neonatal Protocol',
    sections: [
      {
        heading: '1. Clinical Danger Signs (Young Infant < 2 Months)',
        content: [
          'History of difficulty feeding / refuses to suckle.',
          'Convulsions / fits or abnormal posturing.',
          'Fast breathing (>= 60 breaths/min) or Apnea (pauses in breathing > 20 seconds).',
          'Severe chest indrawing or grunting.',
          'High temperature (> 37.5°C) or Hypothermia (< 35.5°C).',
          'Movement only when stimulated or no movement at all (lethargy/floppiness).',
          'Umbilicus red or draining pus, extensive skin pustules, or severe jaundice (palms and soles yellow).'
        ]
      },
      {
        heading: '2. First-Line Antibiotic Regimens',
        content: [
          'Early-Onset Sepsis (< 72 hours of life) or Community-Acquired:',
          'IV AMPICILLIN (50 mg/kg Q12H if < 7 days, Q8H if >= 7 days) + IV GENTAMICIN (5 mg/kg OD every 24 hours). Infuse Gentamicin slowly over 30-60 min.',
          'Late-Onset Sepsis / Suspected Meningitis:',
          'IV CEFOTAXIME (50 mg/kg Q8H if < 7 days, Q6H if >= 7 days) + IV AMPICILLIN (100 mg/kg Q8H/Q6H).',
          'STRICT WARNING: Do NOT use Ceftriaxone in neonates (precipitates with calcium and causes severe hyperbilirubinemia/kernicterus). Cefotaxime is safe.'
        ],
        callout: {
          type: 'alert',
          text: 'Any infant under 28 days with a fever >= 38.0°C requires a full septic workup (Blood culture, CBC with differential, CRP, Urine culture, Lumbar Puncture) and immediate parenteral antibiotics.'
        }
      }
    ],
    references: [
      'National Neonatal Health Strategy and Guidelines (Directorate General of Health Services Bangladesh)',
      'WHO Pocket Book of Hospital Care for Children (Management of Young Infants 0-2 Months)'
    ]
  },
  {
    id: 'emergency-crash-card',
    title: 'Pediatric Resuscitation & Emergency Quick Reference',
    banglaName: 'শিশুর জরুরি পুনরুজ্জীবন ও দ্রুত রেফারেন্স চার্ট',
    category: 'Emergency & Critical Care',
    summary: 'APLS/PALS rapid formulas: weight estimation, Endotracheal tube size and depth, Defibrillation joules, Adrenaline, and fluid bolus guidelines.',
    badge: 'APLS / PALS Emergency',
    sections: [
      {
        heading: '1. Weight Estimation Formulas (When scale is unavailable)',
        content: [
          'Infant < 12 months: Weight (kg) = (Age in months + 9) / 2',
          'Child 1 – 5 years: Weight (kg) = (Age in years + 4) × 2',
          'Child 6 – 12 years: Weight (kg) = (Age in years × 3) + 7',
          'Alternatively: 50th centile WHO benchmarks: 1 yr = 10 kg, 3 yr = 15 kg, 5 yr = 18 kg, 7 yr = 23 kg, 10 yr = 30 kg.'
        ]
      },
      {
        heading: '2. Airway & Endotracheal Tube (ETT) Sizing',
        content: [
          'Uncuffed ETT Size (Internal Diameter in mm) = (Age in years / 4) + 4',
          'Cuffed ETT Size (mm) = (Age in years / 4) + 3.5',
          'Depth of Insertion at Teeth / Lip (cm) = ETT size × 3  (or Age / 2 + 12 cm)',
          'Chest Compression-to-Ventilation Ratio: 15:2 for two healthcare rescuers (30:2 if single rescuer). Neonates: 3:1 ratio.'
        ],
        tableData: {
          headers: ['Age', 'Weight Guide', 'ETT Size (Uncuffed)', 'ETT Depth at Lip'],
          rows: [
            ['Neonate (< 1 kg)', '< 1 kg', '2.5 mm', '6 – 7 cm'],
            ['Term Neonate (3-4 kg)', '3.5 kg', '3.0 – 3.5 mm', '8.5 – 9.5 cm'],
            ['6 Months', '7 kg', '3.5 – 4.0 mm', '10 – 10.5 cm'],
            ['1 Year', '10 kg', '4.0 mm', '11 – 12 cm'],
            ['2 Years', '12 kg', '4.5 mm', '12 – 13 cm'],
            ['4 Years', '16 kg', '5.0 mm', '14 cm'],
            ['6 Years', '20 kg', '5.5 mm', '15 cm'],
            ['8 Years', '25 kg', '6.0 mm', '16 cm'],
            ['10 Years', '30 kg', '6.5 mm', '17 cm']
          ]
        }
      },
      {
        heading: '3. Resuscitation Drugs & Energy Dosages',
        content: [
          'CARDIAC ARREST (PALS):',
          'Adrenaline (Epinephrine) IV/IO: 0.01 mg/kg (0.1 ml/kg of 1:10,000 dilution) every 3-5 minutes.',
          'Defibrillation (VF / Pulseless VT): Initial shock 2 Joules/kg. Second and subsequent shocks: 4 Joules/kg.',
          'FLUID RESUSCITATION IN HYPOVOLEMIC SHOCK: 10–20 ml/kg of Normal Saline (0.9% NaCl) or Ringer’s Lactate over 10-20 minutes. Reassess liver margin and lungs for crackles before repeating.',
          'ACUTE SYMPTOMATIC HYPOGLYCEMIA: 10% Dextrose 2 ml/kg IV slow push over 2-3 minutes.',
          'BRADYCARDIA WITH POOR PERFUSION: Oxygen + ventilation first. If HR < 60 bpm after ventilation, start chest compressions and give Adrenaline 0.01 mg/kg. Atropine: 0.02 mg/kg (minimum 0.1 mg, max 0.5 mg) for vagal induced bradycardia.'
        ]
      }
    ],
    references: [
      'American Heart Association (AHA) Pediatric Advanced Life Support (PALS) Provider Manual',
      'Advanced Paediatric Life Support (APLS) UK Guidelines'
    ]
  },
  {
    id: 'pediatric-blood-transfusion',
    title: 'Pediatric Blood & Component Transfusion Protocols',
    banglaTitle: 'শিশু রক্ত ও কম্পোনেন্ট ট্রান্সফিউশন গাইডলাইন',
    category: 'Hematology',
    summary: 'Standardized guidelines for pediatric Packed Red Blood Cells (PRBC), FFP, Platelets, Cryoprecipitate, and Exchange Transfusion thresholds, rate calculations, and acute reaction protocols (BPA & WHO standards).',
    badge: 'BPA & WHO Hematology Protocol',
    sections: [
      {
        heading: '1. Packed Red Blood Cells (PRBC) Transfusion Triggers',
        content: [
          'Stable hospitalized children: Transfuse when Hemoglobin (Hb) < 7.0 g/dL (Target post-transfusion Hb: 9.0–10.0 g/dL).',
          'Children with Septic Shock or Hypoxemia: Transfuse when Hb < 8.0–10.0 g/dL to optimize systemic oxygen delivery.',
          'Cyanotic Congenital Heart Disease: Maintain Hb >= 10.0–12.0 g/dL to prevent hypoxic spells.',
          'Severe Acute Malnutrition (SAM): Transfuse ONLY if severe anemia with signs of heart failure or Hb < 4.0 g/dL (give 10 ml/kg of Whole Blood or 5-7 ml/kg of PRBC slowly over 3-4 hours with Furosemide 1 mg/kg IV).'
        ],
        callout: {
          type: 'warning',
          text: 'In severe anemia (Hb < 5 g/dL), rapid transfusion causes acute pulmonary edema and death. Infuse at a rate of 2 to 3 ml/kg/hr over 4 hours, and give Furosemide (Lasix) 1 mg/kg IV midway.'
        }
      },
      {
        heading: '2. Calculation Formulas & Component Dosing',
        content: [
          'PRBC Volume (ml) = Weight (kg) × Desired Hb Rise (g/dL) × 4 (or 10 to 15 ml/kg rule of thumb).',
          'Whole Blood Volume (ml) = Weight (kg) × Desired Hb Rise (g/dL) × 6 (or 20 ml/kg).',
          'Platelet Transfusion Dose: 10 ml/kg of Random Donor Platelet (RDP) or 1 unit per 10 kg body weight (expected count rise: 30,000 to 50,000/μL). Infuse rapidly over 20-30 minutes.',
          'Fresh Frozen Plasma (FFP): 10 to 15 ml/kg for coagulopathy with active bleeding (INR > 1.5, liver failure, DIC). Infuse over 1-2 hours.',
          'Cryoprecipitate: 5 to 10 ml/kg or 1 unit per 5-10 kg body weight for hypofibrinogenemia (< 100 mg/dL). Infuse over 15-30 minutes.',
          'Exchange Transfusion in Neonatal Hyperbilirubinemia: Term: 160 ml/kg, Preterm: 180 ml/kg. Cycle volume: 5 ml/kg. Give 1 ml of 10% Calcium Gluconate IV slow flush per 100 ml exchanged.'
        ],
        tableData: {
          headers: ['Blood Component', 'Standard Pediatric Dose', 'Infusion Duration', 'Expected Response'],
          rows: [
            ['PRBC', '10 – 15 ml/kg', '2 to 4 hours (Max 4 hr)', 'Rise of 2 – 3 g/dL in Hb'],
            ['Whole Blood', '20 ml/kg', '3 to 4 hours', 'Rise of 2 – 3 g/dL in Hb'],
            ['Platelets (RDP)', '10 ml/kg (or 1 unit / 10 kg)', '20 to 30 minutes', 'Rise of 30,000 – 50,000 /μL'],
            ['FFP', '10 – 15 ml/kg', '1 to 2 hours', 'Increases factor levels ~20%'],
            ['Cryoprecipitate', '5 – 10 ml/kg (or 1 unit / 5-10 kg)', '15 to 30 minutes', 'Increases fibrinogen 50-100 mg/dL'],
            ['Exchange Transfusion', '160 – 180 ml/kg (Double volume)', '1.5 to 2 hours', 'Removes ~85% of circulating RBCs']
          ]
        }
      },
      {
        heading: '3. Acute Transfusion Reaction Management Protocol',
        content: [
          'Signs of Acute Reaction: Sudden fever (>1°C rise), rigors, urticaria, bronchospasm, tachycardia, hypotension, dark red urine (hemoglobinuria).',
          'IMMEDIATE ACTION: Stop the transfusion immediately. Disconnect the blood administration set. Keep IV access open with sterile Normal Saline.',
          'Assess Airway, Breathing, Circulation. Administer high-flow Oxygen.',
          'Emergency Medications: Hydrocortisone 4 mg/kg IV and Chlorpheniramine 0.1 mg/kg IV. If anaphylaxis / stridor: Adrenaline 1:1,000 IM (0.01 ml/kg) in the anterolateral thigh.',
          'Clerical & Laboratory Investigation: Re-check blood bag label against patient ID band. Send the remaining blood pack with IV tubing, post-transfusion EDTA tube, and first voided urine to the blood bank for repeat grouping, cross-match, and hemolysis check.'
        ]
      }
    ],
    references: [
      'Bangladesh Paediatric Association (BPA) Clinical Management Guidelines',
      'World Health Organization (WHO) Pocket Book of Hospital Care for Children: Chapter 10 (Blood Transfusion)'
    ]
  },
  {
    id: 'pediatric-tb-ntp',
    title: 'National Tuberculosis Control Programme (NTP) Pediatric TB Protocol',
    banglaTitle: 'শিশু যক্ষ্মা (টিবি) জাতীয় চিকিৎসা গাইডলাইন',
    category: 'Infectious Disease',
    summary: 'Standardized national protocol for diagnosis, child-friendly dispersible Fixed-Dose Combinations (FDC), treatment regimens (2HRZ/4HR), and contact management (TPT).',
    badge: 'NTP DGHS Bangladesh & WHO',
    sections: [
      {
        heading: '1. Diagnostic Criteria & Triage in Children',
        content: [
          'Suspect pediatric TB if a child presents with: Persistent unremitting cough > 2 weeks not responding to standard antibiotics; Unexplained fever > 2 weeks; Documented weight loss or failure to thrive (crossing growth percentiles downwards); Fatigue, reduced playfulness, or lethargy.',
          'Key Epidemiological Triad: Close household contact with an adult pulmonary TB patient within the past 12 months is the single strongest clinical risk factor.',
          'Investigations: GeneXpert MTB/RIF on gastric aspirate, induced sputum, or stool; Chest X-ray (persistent hilar lymphadenopathy, consolidation, miliary pattern); Tuberculin Skin Test (Mantoux/TST: >= 10 mm induration is positive, >= 5 mm in HIV or severe malnutrition).'
        ]
      },
      {
        heading: '2. Child-Friendly Dispersible FDC Regimens & Weight Bands',
        content: [
          'Intensive Phase (2 Months — 2HRZ): Dispersible tablets of Rifampicin 75 mg + Isoniazid 50 mg + Pyrazinamide 150 mg.',
          'Continuation Phase (4 Months — 4HR): Dispersible tablets of Rifampicin 75 mg + Isoniazid 50 mg.',
          'Add Ethambutol (20 mg/kg/day) to the intensive phase for extensive pulmonary TB, cavitary disease, TB Meningitis, or HIV co-infection.',
          'Tablets dissolve in a spoon of clean water in 10-15 seconds. Give once daily in the morning on an empty stomach (30 min before breakfast).'
        ],
        tableData: {
          headers: ['Weight Band', 'Intensive Phase (2HRZ) Daily', 'Continuation Phase (4HR) Daily'],
          rows: [
            ['4 – 7 kg', '1 Tablet / day', '1 Tablet / day'],
            ['8 – 11 kg', '2 Tablets / day', '2 Tablets / day'],
            ['12 – 15 kg', '3 Tablets / day', '3 Tablets / day'],
            ['16 – 24 kg', '4 Tablets / day', '4 Tablets / day'],
            ['>= 25 kg', 'Use adult FDC (RHZE)', 'Use adult FDC (RH)']
          ]
        }
      },
      {
        heading: '3. Special Situations: TB Meningitis & Contact Management (TPT)',
        content: [
          'TB Meningitis & Spinal TB (Pott’s disease): Total 12 months treatment (2 months 2HRZE + 10 months 10HR) + Prednisolone (2 mg/kg/day for 4 weeks, then tapered over 2-4 weeks).',
          'TB Preventive Treatment (TPT / IPT): ALL child contacts < 5 years of an infectious pulmonary TB case MUST receive Isoniazid (10 mg/kg/day, max 300 mg) once daily for 6 months after ruling out active TB.',
          'Pyridoxine (Vitamin B6): Give 5 to 10 mg/day concurrently to prevent INH-induced peripheral neuropathy in malnourished or exclusively breastfed infants.'
        ]
      }
    ],
    references: [
      'National Guidelines for the Management of Tuberculosis in Children (3rd Edition, NTP Bangladesh)',
      'WHO Operational Handbook on Tuberculosis: Module 5 (Management of TB in Children and Adolescents)'
    ]
  },
  {
    id: 'national-malaria-guideline',
    title: 'National Malaria Treatment Guidelines (DGDA & WHO Bangladesh)',
    banglaTitle: 'জাতীয় ম্যালেরিয়া চিকিৎসা গাইডলাইন',
    category: 'Infectious Disease',
    summary: 'Protocol for management of uncomplicated and severe / cerebral malaria in endemic districts of Bangladesh (Chittagong Hill Tracts, Cox’s Bazar, Netrokona, Sylhet).',
    badge: 'National Malaria Protocol BD',
    sections: [
      {
        heading: '1. Uncomplicated P. falciparum: Artemether-Lumefantrine (ACT)',
        content: [
          'First-line regimen: Artemether 20 mg + Lumefantrine 120 mg dispersible tablets (Coartem / Lumart).',
          'Administer 6 doses over 3 days (Hour 0, 8, 24, 36, 48, and 60).',
          'Always give with milk or fatty food to ensure therapeutic absorption of Lumefantrine.',
          'Dose by weight: 5–14 kg: 1 tab BID; 15–24 kg: 2 tabs BID; 25–34 kg: 3 tabs BID; >= 35 kg: 4 tabs BID.'
        ]
      },
      {
        heading: '2. Severe / Cerebral Malaria: Artesunate IV (Life-Saving)',
        content: [
          'Drug of Choice: Parenteral Artesunate IV (60 mg vial). Superior to Quinine with significantly lower mortality.',
          'Dosing: Children < 20 kg: 3.0 mg/kg/dose; Children >= 20 kg: 2.4 mg/kg/dose.',
          'Schedule: Give at 0, 12, and 24 hours (minimum 3 parenteral doses), then once daily until the child can swallow.',
          'Once patient tolerates oral medication: Complete a full 3-day course of Artemether-Lumefantrine (ACT).'
        ]
      },
      {
        heading: '3. Plasmodium vivax & Radical Cure Protocol',
        content: [
          'Acute Blood Schizonticide: Chloroquine 25 mg base/kg over 3 days (Day 1: 10 mg/kg, Day 2: 10 mg/kg, Day 3: 5 mg/kg).',
          'Radical Cure of Liver Hypnozoites: Primaquine 0.25 to 0.5 mg/kg/day once daily for 14 consecutive days after food.',
          'MANDATORY G6PD TEST: Always screen for G6PD deficiency prior to Primaquine to prevent catastrophic acute intravascular hemolysis.'
        ]
      }
    ],
    references: [
      'National Malaria Treatment Guidelines (Communicable Disease Control - CDC, DGHS Bangladesh)',
      'WHO Guidelines for Malaria (Pediatric Treatment Recommendations)'
    ]
  },
  {
    id: 'pediatric-electrolyte-emergencies',
    title: 'Pediatric Electrolyte Emergencies & Safe Rate Limits',
    banglaTitle: 'শিশু জরুরি ইলেক্ট্রোলাইট কারেকশন ও নিরাপত্তা সীমা',
    category: 'Emergency & Critical Care',
    summary: 'Evidence-based protocols for rapid stabilization and safe correction of hyponatremic seizures, hyperkalemia, hypokalemia, and hypernatremic dehydration without osmotic demyelination.',
    badge: 'PALS & Pediatric Nephrology',
    sections: [
      {
        heading: '1. Hyponatremic Seizures & Osmotic Demyelination Limits',
        content: [
          'Emergency Seizure Arrest: 3% Hypertonic Saline (3% NaCl) 3 ml/kg IV slow infusion over 10-20 minutes. Raises serum Na by 2.5–3 mEq/L, reversing cerebral edema.',
          'Total Sodium Deficit Formula: Na Deficit (mEq) = 0.6 × Weight (kg) × (Target Na - Current Na).',
          'ABSOLUTE SAFETY SPEED LIMIT: Do NOT exceed 10 to 12 mEq/L rise in 24 hours (and < 18 mEq/L in 48 hours). Hourly rise must not exceed 0.5 mEq/L/hr.',
          'Danger of Rapid Correction: Over-rapid sodium elevation causes fatal Central Pontine Myelinolysis (Osmotic Demyelination Syndrome).'
        ]
      },
      {
        heading: '2. Hyperkalemia (K+ > 6.0 mEq/L): 3-Step Emergency Protocol',
        content: [
          'Step 1 (Myocardial Membrane Stabilization): 10% Calcium Gluconate 1.0 ml/kg (100 mg/kg) IV slow push over 5-10 minutes with continuous ECG monitoring. Protects heart within 1-3 minutes.',
          'Step 2 (Intracellular Shift): Regular Insulin 0.1 U/kg + 25% Dextrose 2 ml/kg (or 10% Dextrose 5 ml/kg) IV over 30 min; Salbutamol nebulization (2.5–5 mg); Sodium Bicarbonate 8.4% (1-2 ml/kg IV over 10 min).',
          'Step 3 (Elimination): Furosemide 1 mg/kg IV; Calcium/Sodium Polystyrene Sulfonate (Kalimate) 1 g/kg PO/PR.'
        ]
      },
      {
        heading: '3. Hypokalemia (K+ < 3.5 mEq/L) IV Safety Rules',
        content: [
          'DEADLY DANGER: NEVER give undiluted Potassium Chloride (KCl) as an IV bolus (causes instant cardiac arrest).',
          'Peripheral Line Limit: Maximum concentration 40 mEq/L (20 mEq in 500 ml bottle). Central line limit: 60-80 mEq/L.',
          'Maximum Infusion Rate: 0.3 to 0.5 mEq/kg/hour with continuous cardiac monitoring.',
          'Urine Output Prerequisite: Never give IV potassium without verified adequate urine output (> 1 ml/kg/hr).'
        ]
      }
    ],
    references: [
      'PALS Provider Manual: Electrolyte Disturbances and Arrhythmias',
      'The Harriet Lane Handbook: Fluids and Electrolytes Chapter'
    ]
  }
];

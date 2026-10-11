import React, { useState, useMemo, useEffect } from 'react';
import { 
  PatientProfile 
} from '../types/pediatric';
import {
  ChildGender,
  GrowthMetricType,
  GrowthRecord,
  WHO_WFA_BOYS,
  WHO_WFA_GIRLS,
  WHO_LHFA_BOYS,
  WHO_LHFA_GIRLS,
  WHO_WFH_BOYS,
  WHO_WFH_GIRLS,
  WHO_BFA_BOYS,
  WHO_BFA_GIRLS,
  interpolatePercentiles,
  assessGrowth,
  IYCF_GUIDELINES
} from '../data/whoGrowthData';
import { 
  TrendingUp, 
  Scale, 
  Ruler, 
  Activity, 
  Calendar, 
  Plus, 
  Trash2, 
  Printer, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  RefreshCw,
  Sparkles,
  HeartPulse
} from 'lucide-react';

interface GrowthMonitoringProps {
  patient: PatientProfile;
  onUpdatePatient?: (updated: PatientProfile) => void;
}

export const GrowthMonitoring: React.FC<GrowthMonitoringProps> = ({ 
  patient, 
  onUpdatePatient 
}) => {
  // Current view parameters
  const [metric, setMetric] = useState<GrowthMetricType>('wfa');
  const [gender, setGender] = useState<ChildGender>(patient.gender || 'male');
  const [ageRange, setAgeRange] = useState<'24m' | '60m' | '120m'>('60m');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // New visit modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVisitAgeMonths, setNewVisitAgeMonths] = useState<number>(patient.ageYears * 12 + patient.ageMonths);
  const [newVisitWeight, setNewVisitWeight] = useState<number>(patient.weightKg);
  const [newVisitHeight, setNewVisitHeight] = useState<number>(patient.heightCm || 75);
  const [newVisitDate, setNewVisitDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newVisitNote, setNewVisitNote] = useState<string>('রুটিন চেকআপ (Routine Checkup)');

  // Hover state for interactive chart tooltip
  const [hoveredX, setHoveredX] = useState<number | null>(null);

  // Longitudinal visits storage
  const [records, setRecords] = useState<GrowthRecord[]>(() => {
    try {
      const saved = localStorage.getItem('shishudose_growth_records');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default sample longitudinal points for demonstration
    const currentTotalMonths = patient.ageYears * 12 + patient.ageMonths;
    return [
      {
        id: 'rec-birth',
        date: 'Birth',
        ageMonths: 0,
        weightKg: gender === 'male' ? 3.3 : 3.2,
        heightCm: 50,
        note: 'জন্মের সময় ওজন (At Birth)'
      },
      {
        id: 'rec-6m',
        date: '6 Months',
        ageMonths: 6,
        weightKg: gender === 'male' ? 7.8 : 7.2,
        heightCm: 67,
        note: 'ইপিআই ৬ মাস ও উইনিং শুরু (Weaning Started)'
      },
      {
        id: 'rec-current',
        date: 'Current Visit',
        ageMonths: Math.max(1, currentTotalMonths),
        weightKg: patient.weightKg,
        heightCm: patient.heightCm || (currentTotalMonths <= 12 ? 74 : 85),
        note: 'বর্তমান ভিজিট (Active Patient)'
      }
    ];
  });

  // Save visits to local storage
  useEffect(() => {
    try {
      localStorage.setItem('shishudose_growth_records', JSON.stringify(records));
    } catch {
      // ignore
    }
  }, [records]);

  // Keep gender synchronized if changed in parent
  useEffect(() => {
    if (patient.gender && patient.gender !== gender) {
      setGender(patient.gender);
    }
  }, [patient.gender]);

  const totalAgeMonths = patient.ageYears * 12 + patient.ageMonths;
  const currentHeight = patient.heightCm || (totalAgeMonths <= 6 ? 65 : totalAgeMonths <= 12 ? 75 : totalAgeMonths <= 24 ? 86 : 100);
  
  // Current child's BMI = weight / (height_in_m)^2
  const currentBmi = useMemo(() => {
    const heightM = currentHeight / 100;
    return Math.round((patient.weightKg / (heightM * heightM)) * 10) / 10;
  }, [patient.weightKg, currentHeight]);

  // Metric value for current patient
  const currentMetricValue = useMemo(() => {
    switch (metric) {
      case 'wfa': return patient.weightKg;
      case 'hfa': return currentHeight;
      case 'wfh': return patient.weightKg;
      case 'bfa': return currentBmi;
    }
  }, [metric, patient.weightKg, currentHeight, currentBmi]);

  // Active lookup X value (Age in months or Height in cm for WFH)
  const currentXValue = metric === 'wfh' ? currentHeight : totalAgeMonths;

  // Active dataset table
  const activeTable = useMemo(() => {
    if (metric === 'wfa') {
      return gender === 'male' ? WHO_WFA_BOYS : WHO_WFA_GIRLS;
    }
    if (metric === 'hfa') {
      return gender === 'male' ? WHO_LHFA_BOYS : WHO_LHFA_GIRLS;
    }
    if (metric === 'wfh') {
      return gender === 'male' ? WHO_WFH_BOYS : WHO_WFH_GIRLS;
    }
    return gender === 'male' ? WHO_BFA_BOYS : WHO_BFA_GIRLS;
  }, [metric, gender]);

  // Filter dataset by ageRange
  const filteredTable = useMemo(() => {
    if (metric === 'wfh') return activeTable; // Height-based, 45 to 120cm
    const maxMonths = ageRange === '24m' ? 24 : ageRange === '60m' ? 60 : 120;
    return activeTable.filter((pt) => pt.x <= maxMonths);
  }, [activeTable, ageRange, metric]);

  // Comprehensive Clinical Assessment
  const assessment = useMemo(() => {
    return assessGrowth(
      metric, 
      currentMetricValue, 
      totalAgeMonths, 
      gender, 
      patient.heightCm
    );
  }, [metric, currentMetricValue, totalAgeMonths, gender, patient.heightCm]);

  // Also assess other key metrics for complete scorecard
  const wfaAssessment = useMemo(() => assessGrowth('wfa', patient.weightKg, totalAgeMonths, gender), [patient.weightKg, totalAgeMonths, gender]);
  const hfaAssessment = useMemo(() => assessGrowth('hfa', currentHeight, totalAgeMonths, gender), [currentHeight, totalAgeMonths, gender]);
  const wfhAssessment = useMemo(() => assessGrowth('wfh', patient.weightKg, totalAgeMonths, gender, currentHeight), [patient.weightKg, totalAgeMonths, gender, currentHeight]);

  // Growth velocity calculation between the last two recorded visits
  const velocityInfo = useMemo(() => {
    const sorted = [...records].sort((a, b) => a.ageMonths - b.ageMonths);
    if (sorted.length < 2) return null;
    const prev = sorted[sorted.length - 2];
    const curr = sorted[sorted.length - 1];
    const monthDiff = curr.ageMonths - prev.ageMonths;
    if (monthDiff <= 0) return null;
    const weightGainGrams = Math.round((curr.weightKg - prev.weightKg) * 1000);
    const gainPerMonthGrams = Math.round(weightGainGrams / monthDiff);
    
    return {
      prevAge: prev.ageMonths,
      currAge: curr.ageMonths,
      monthDiff,
      weightGainGrams,
      gainPerMonthGrams,
      isFaltering: gainPerMonthGrams < (curr.ageMonths <= 6 ? 500 : curr.ageMonths <= 12 ? 250 : 100)
    };
  }, [records]);

  // Add a visit record
  const handleAddVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: GrowthRecord = {
      id: 'rec-' + Date.now(),
      date: newVisitDate,
      ageMonths: Number(newVisitAgeMonths),
      weightKg: Number(newVisitWeight),
      heightCm: Number(newVisitHeight),
      note: newVisitNote
    };
    setRecords((prev) => [...prev, newRecord].sort((a, b) => a.ageMonths - b.ageMonths));
    setShowAddModal(false);
  };

  // Delete a visit record
  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // Sync with current patient bar button
  const handleSyncFromCurrent = () => {
    const months = patient.ageYears * 12 + patient.ageMonths;
    const exists = records.some((r) => r.ageMonths === months && Math.abs(r.weightKg - patient.weightKg) < 0.1);
    if (!exists) {
      const newRec: GrowthRecord = {
        id: 'rec-' + Date.now(),
        date: new Date().toLocaleDateString('bn-BD'),
        ageMonths: months,
        weightKg: patient.weightKg,
        heightCm: patient.heightCm || currentHeight,
        note: 'ক্লিনিকাল ভিজিট (Patient Bar Sync)'
      };
      setRecords((prev) => [...prev, newRec].sort((a, b) => a.ageMonths - b.ageMonths));
    }
  };

  // Copy clinical summary to clipboard
  const handleCopySummary = () => {
    const summary = `[WHO Pediatric Growth Assessment]
Patient: ${gender === 'male' ? 'Boy (ছেলে)' : 'Girl (মেয়ে)'}, Age: ${patient.ageYears}y ${patient.ageMonths}m (${totalAgeMonths} months)
Weight: ${patient.weightKg} kg (WFA Z-Score: ${wfaAssessment.zScore} SD, ${wfaAssessment.percentile}th Centile - ${wfaAssessment.statusLabelBn})
Height: ${currentHeight} cm (HFA Z-Score: ${hfaAssessment.zScore} SD, ${hfaAssessment.percentile}th Centile - ${hfaAssessment.statusLabelBn})
Weight-for-Height: ${wfhAssessment.zScore} SD (${wfhAssessment.statusLabelBn})
Clinical Interpretation: ${assessment.clinicalMeaning}
Guideline Note: Grounded in WHO Child Growth Standards & Bangladesh National IYCF Protocols.`;

    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Print growth chart and report
  const handlePrint = () => {
    window.print();
  };

  // -------------------------------------------------------------------------
  // SVG Chart Dimensions & Math Scales
  // -------------------------------------------------------------------------
  const svgWidth = 840;
  const svgHeight = 460;
  const padding = { top: 35, right: 65, bottom: 45, left: 60 };

  const chartW = svgWidth - padding.left - padding.right;
  const chartH = svgHeight - padding.top - padding.bottom;

  // X-Range (Months or Height cm)
  const minX = metric === 'wfh' ? 45 : 0;
  const maxX = useMemo(() => {
    if (metric === 'wfh') return 120;
    if (ageRange === '24m') return 24;
    if (ageRange === '60m') return 60;
    return 120;
  }, [metric, ageRange]);

  // Y-Range (Weight in kg, Height in cm, or BMI)
  const { minY, maxY, yUnit, yLabel } = useMemo(() => {
    if (metric === 'wfa') {
      const maxYVal = ageRange === '24m' ? 18 : ageRange === '60m' ? 30 : 60;
      return { minY: 1, maxY: maxYVal, yUnit: 'kg', yLabel: 'ওজন / Weight (kg)' };
    }
    if (metric === 'hfa') {
      const maxYVal = ageRange === '24m' ? 100 : ageRange === '60m' ? 125 : 165;
      return { minY: 40, maxY: maxYVal, yUnit: 'cm', yLabel: 'উচ্চতা / Height (cm)' };
    }
    if (metric === 'wfh') {
      return { minY: 1.5, maxY: 35, yUnit: 'kg', yLabel: 'ওজন / Weight (kg)' };
    }
    // bfa
    return { minY: 10, maxY: 26, yUnit: 'kg/m²', yLabel: 'বিএমআই / BMI (kg/m²)' };
  }, [metric, ageRange]);

  // Coordinate transforms
  const scaleX = (x: number) => padding.left + ((x - minX) / (maxX - minX)) * chartW;
  const scaleY = (y: number) => padding.top + chartH - ((y - minY) / (maxY - minY)) * chartH;

  // Generate SVG path for a percentile key
  const generatePath = (key: 'p3' | 'p15' | 'p50' | 'p85' | 'p97' | 'sdNeg3' | 'sdPos3') => {
    const pts = filteredTable.map((pt) => `${scaleX(pt.x)},${scaleY(pt[key])}`);
    return `M ${pts.join(' L ')}`;
  };

  // Generate SVG shaded area path between two percentiles
  const generateAreaPath = (
    keyLower: 'p3' | 'p15' | 'sdNeg3', 
    keyUpper: 'p3' | 'p15' | 'p85' | 'p97'
  ) => {
    const forward = filteredTable.map((pt) => `${scaleX(pt.x)},${scaleY(pt[keyUpper])}`);
    const backward = [...filteredTable].reverse().map((pt) => `${scaleX(pt.x)},${scaleY(pt[keyLower])}`);
    return `M ${forward.join(' L ')} L ${backward.join(' L ')} Z`;
  };

  // Filtered child visit records for plotting
  const plottedPoints = useMemo(() => {
    return records
      .filter((r) => {
        if (metric === 'wfh') return r.heightCm !== undefined && r.heightCm >= minX && r.heightCm <= maxX;
        return r.ageMonths >= minX && r.ageMonths <= maxX;
      })
      .map((r) => {
        let yVal = r.weightKg;
        let xVal = r.ageMonths;
        if (metric === 'hfa') yVal = r.heightCm || 0;
        if (metric === 'wfh') {
          xVal = r.heightCm || 0;
          yVal = r.weightKg;
        }
        if (metric === 'bfa') {
          const hm = (r.heightCm || 75) / 100;
          yVal = Math.round((r.weightKg / (hm * hm)) * 10) / 10;
        }
        return {
          id: r.id,
          x: xVal,
          y: yVal,
          date: r.date,
          ageMonths: r.ageMonths,
          note: r.note,
          weightKg: r.weightKg,
          heightCm: r.heightCm,
          px: scaleX(xVal),
          py: scaleY(yVal)
        };
      });
  }, [records, metric, minX, maxX]);

  // Current active patient marker
  const currentMarker = useMemo(() => {
    const px = scaleX(currentXValue);
    const py = scaleY(currentMetricValue);
    const clampedPx = Math.max(padding.left, Math.min(padding.left + chartW, px));
    const clampedPy = Math.max(padding.top, Math.min(padding.top + chartH, py));
    return { px: clampedPx, py: clampedPy };
  }, [currentXValue, currentMetricValue, chartW, chartH]);

  // Hover lookup at cursor
  const hoverStats = useMemo(() => {
    if (hoveredX === null) return null;
    const inter = interpolatePercentiles(activeTable, hoveredX);
    return inter;
  }, [hoveredX, activeTable]);

  // Age-appropriate IYCF guideline for this child
  const relevantGuideline = useMemo(() => {
    if (totalAgeMonths < 6) return IYCF_GUIDELINES[0];
    if (totalAgeMonths < 9) return IYCF_GUIDELINES[1];
    if (totalAgeMonths < 12) return IYCF_GUIDELINES[2];
    if (totalAgeMonths < 24) return IYCF_GUIDELINES[3];
    return IYCF_GUIDELINES[4];
  }, [totalAgeMonths]);

  // Theme colors based on gender
  const isBoy = gender === 'male';
  const theme = {
    primaryText: isBoy ? 'text-sky-950' : 'text-rose-950',
    primaryBorder: isBoy ? 'border-sky-300' : 'border-rose-300',
    primaryBg: isBoy ? 'bg-sky-50' : 'bg-rose-50',
    accentDot: isBoy ? '#0284c7' : '#e11d48',
    curveMedian: '#16a34a', // Standard WHO green for 50th centile
    normalBandFill: isBoy ? '#e0f2fe' : '#ffe4e6',
    borderBandFill: '#fef3c7',
    dangerBandFill: '#fee2e2'
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* ------------------------------------------------------------------- */}
      {/* TOP HEADER CONTROLS: METRICS, GENDER, CONTROLS */}
      {/* ------------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Title & Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl ${isBoy ? 'bg-sky-100 text-sky-800' : 'bg-rose-100 text-rose-800'}`}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>WHO Pediatric Growth Standard Monitoring</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    WHO ২০০৬ চার্ট
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  বিশ্ব স্বাস্থ্য সংস্থা (WHO) বৃদ্ধির মানদণ্ড ও বাংলাদেশ IYCF প্রটোকল ভিত্তিক শিশু বিকাশ ও অপুষ্টি স্ক্রীনিং
                </p>
              </div>
            </div>
          </div>

          {/* Gender & Action Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Gender Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setGender('male');
                  if (onUpdatePatient) onUpdatePatient({ ...patient, gender: 'male' });
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isBoy 
                    ? 'bg-sky-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>👦 ছেলে (Boy)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setGender('female');
                  if (onUpdatePatient) onUpdatePatient({ ...patient, gender: 'female' });
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !isBoy 
                    ? 'bg-rose-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>👧 মেয়ে (Girl)</span>
              </button>
            </div>

            {/* Quick Sync Button */}
            <button
              onClick={handleSyncFromCurrent}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors border border-slate-200 cursor-pointer"
              title="বর্তমান পেশেন্ট বারের ওজন ও বয়স গ্রোথ ট্র্যাকে রেকর্ড করুন"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
              <span>পেশেন্ট সিঙ্ক (Sync)</span>
            </button>

            {/* Copy Clinical Summary Button */}
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold transition-colors border border-sky-200 cursor-pointer"
              title="প্রেসক্রিপশনে কপি করার জন্য সংক্ষিপ্ত গ্রোথ রিপোর্ট কপি করুন"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>কপি সামারি</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              title="গ্রোথ চার্ট ও ক্লিনিকাল রিপোর্ট প্রিন্ট করুন"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* METRIC SELECTOR TABS & AGE RESOLUTION */}
        {/* ----------------------------------------------------------------- */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* 4 Core Growth Metrics */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setMetric('wfa')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                metric === 'wfa'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-sky-600" />
              <span>Weight-for-Age (ওজন/বয়স)</span>
            </button>

            <button
              type="button"
              onClick={() => setMetric('hfa')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                metric === 'hfa'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-emerald-600" />
              <span>Height-for-Age (উচ্চতা/বয়স)</span>
            </button>

            <button
              type="button"
              onClick={() => setMetric('wfh')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                metric === 'wfh'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Severe Acute Malnutrition (SAM) & MAM screening"
            >
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              <span>Weight-for-Height (SAM/MAM)</span>
            </button>

            <button
              type="button"
              onClick={() => setMetric('bfa')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                metric === 'bfa'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-purple-600" />
              <span>BMI-for-Age (বিএমআই)</span>
            </button>
          </div>

          {/* Age Span Switcher (Not applicable to WFH) */}
          {metric !== 'wfh' && (
            <div className="flex items-center gap-1 self-end md:self-center text-xs">
              <span className="text-slate-500 font-medium mr-1 text-[11px]">সময়সীমা:</span>
              <button
                type="button"
                onClick={() => setAgeRange('24m')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  ageRange === '24m'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ০-২ বছর (Infant)
              </button>
              <button
                type="button"
                onClick={() => setAgeRange('60m')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  ageRange === '60m'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ০-৫ বছর (WHO Under-5)
              </button>
              <button
                type="button"
                onClick={() => setAgeRange('120m')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  ageRange === '120m'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ৫-১০ বছর (Pediatric)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* CLINICAL SCORECARD CARDS: IMMEDIATE DIAGNOSIS AT A GLANCE */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        
        {/* Card 1: Active Metric Assessment */}
        <div className={`p-4 rounded-2xl border ${
          assessment.status === 'severely_low' 
            ? 'bg-rose-50 border-rose-300 text-rose-950'
            : assessment.status === 'low'
            ? 'bg-amber-50 border-amber-300 text-amber-950'
            : assessment.status === 'severely_high'
            ? 'bg-purple-50 border-purple-300 text-purple-950'
            : 'bg-emerald-50 border-emerald-300 text-emerald-950'
        } shadow-xs`}>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider opacity-75">
              {metric.toUpperCase()} ডায়াগনোসিস
            </span>
            {assessment.status === 'normal' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
          </div>
          <div className="mt-2">
            <div className="text-lg font-black leading-tight">
              {assessment.statusLabelBn}
            </div>
            <div className="text-xs font-mono font-bold mt-1 opacity-90">
              {assessment.statusLabelEn}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold">
            <span>Z-Score: <strong className="text-sm font-black">{assessment.zScore > 0 ? `+${assessment.zScore}` : assessment.zScore} SD</strong></span>
            <span>পার্সেন্টাইল: <strong>{assessment.percentile}%</strong></span>
          </div>
        </div>

        {/* Card 2: Weight-for-Age Overview */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>ওজন (Weight-for-Age)</span>
              <span className="font-mono text-slate-900 font-bold">{patient.weightKg} kg</span>
            </div>
            <div className="mt-2 text-sm font-bold text-slate-800">
              {wfaAssessment.statusLabelBn}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              স্বাভাবিক মিডিয়ান: <strong className="text-slate-700 font-mono">{(WHO_WFA_BOYS[0]?.p50 || 10).toFixed(1)} kg</strong>
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>Z: <strong className="font-mono">{wfaAssessment.zScore} SD</strong></span>
            <span>{wfaAssessment.percentile}th Centile</span>
          </div>
        </div>

        {/* Card 3: Height-for-Age / Stunting Overview */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>উচ্চতা (Height-for-Age)</span>
              <span className="font-mono text-slate-900 font-bold">{currentHeight} cm</span>
            </div>
            <div className="mt-2 text-sm font-bold text-slate-800">
              {hfaAssessment.statusLabelBn}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              স্টান্টিং বা খর্বকায়তা যাচাই
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>Z: <strong className="font-mono">{hfaAssessment.zScore} SD</strong></span>
            <span>{hfaAssessment.percentile}th Centile</span>
          </div>
        </div>

        {/* Card 4: WFH Acute Malnutrition SAM/MAM Overview */}
        <div className={`p-4 rounded-2xl border ${
          wfhAssessment.status === 'severely_low' 
            ? 'bg-rose-100/80 border-rose-300 text-rose-900' 
            : 'bg-white border-slate-200'
        } shadow-xs flex flex-col justify-between`}>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>তীব্র অপুষ্টি স্ক্রীনিং (SAM/MAM)</span>
              <Activity className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div className="mt-2 text-sm font-bold text-slate-800">
              {wfhAssessment.statusLabelBn}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {wfhAssessment.zScore < -3 
                ? '⚠️ জরুরি মেডিকেল রেফারেল ও RUTF প্রয়োজন' 
                : 'তীব্র অপচয় (Wasting) নেই'}
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>Z: <strong className="font-mono">{wfhAssessment.zScore} SD</strong></span>
            <span className="font-semibold text-slate-700">WHO IMCI</span>
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------------- */}
      {/* MAIN DATA VISUALIZATION: WHO GROWTH CURVES CHART */}
      {/* ------------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-4">
        
        {/* Chart Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span>
                {metric === 'wfa' && `Weight-for-age percentiles (${isBoy ? 'Boys' : 'Girls'}, 0-${maxX} Months)`}
                {metric === 'hfa' && `Length/height-for-age percentiles (${isBoy ? 'Boys' : 'Girls'}, 0-${maxX} Months)`}
                {metric === 'wfh' && `Weight-for-length/height percentiles (${isBoy ? 'Boys' : 'Girls'}, 45-120 cm)`}
                {metric === 'bfa' && `BMI-for-age percentiles (${isBoy ? 'Boys' : 'Girls'}, 0-${maxX} Months)`}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              সবুজ দাগ = ৫০তম মিডিয়ান (P50); হালকা নীল/গোলাপি ব্যান্ড = স্বাভাবিক অঞ্চল (P15 - P85); হলুদ = সতর্কতা; লাল দাগ = -৩ SD (মারাত্মক অপুষ্টি/খর্বকায়তা)
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-emerald-600 rounded-sm"></span>
              <span className="font-semibold">মিডিয়ান (P50)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-2 bg-sky-200 border border-sky-300 rounded-xs"></span>
              <span>স্বাভাবিক রেঞ্জ (P15-P85)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 border-t-2 border-dashed border-rose-500"></span>
              <span className="text-rose-600 font-bold">-৩ SD (বিপদ রেখা)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-2 ring-indigo-200"></span>
              <span className="font-bold text-indigo-700">শিশুর প্লটেড পয়েন্ট</span>
            </div>
          </div>
        </div>

        {/* SVG Canvas Container */}
        <div className="relative w-full overflow-x-auto select-none bg-slate-50/60 rounded-xl border border-slate-200/80 p-1">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto min-w-[650px] overflow-visible"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const scale = svgWidth / rect.width;
              const mouseSvgX = (e.clientX - rect.left) * scale;
              const val = minX + ((mouseSvgX - padding.left) / chartW) * (maxX - minX);
              if (val >= minX && val <= maxX) {
                setHoveredX(Math.round(val * 10) / 10);
              }
            }}
            onMouseLeave={() => setHoveredX(null)}
          >
            <defs>
              {/* Shading Gradients */}
              <linearGradient id="normalBandGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isBoy ? '#e0f2fe' : '#ffe4e6'} stopOpacity="0.85" />
                <stop offset="100%" stopColor={isBoy ? '#bae6fd' : '#fecdd3'} stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="dangerBandGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fee2e2" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#fecaca" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Gridlines - Background */}
            <g className="grid-lines" stroke="#e2e8f0" strokeWidth="1">
              {/* Horizontal Gridlines (Y ticks) */}
              {Array.from({ length: 9 }).map((_, i) => {
                const yVal = minY + (i / 8) * (maxY - minY);
                const py = scaleY(yVal);
                return (
                  <g key={`y-${i}`}>
                    <line x1={padding.left} y1={py} x2={padding.left + chartW} y2={py} strokeDasharray="3 3" />
                    <text
                      x={padding.left - 10}
                      y={py + 4}
                      textAnchor="end"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#64748b"
                      className="font-mono"
                    >
                      {Math.round(yVal * 10) / 10}
                    </text>
                  </g>
                );
              })}

              {/* Vertical Gridlines (X ticks) */}
              {Array.from({ length: 9 }).map((_, i) => {
                const xVal = minX + (i / 8) * (maxX - minX);
                const px = scaleX(xVal);
                return (
                  <g key={`x-${i}`}>
                    <line x1={px} y1={padding.top} x2={px} y2={padding.top + chartH} strokeDasharray="3 3" />
                    <text
                      x={px}
                      y={padding.top + chartH + 18}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#64748b"
                      className="font-mono"
                    >
                      {Math.round(xVal)}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Axis Labels */}
            <text
              x={padding.left + chartW / 2}
              y={padding.top + chartH + 36}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#334155"
            >
              {metric === 'wfh' ? 'উচ্চতা / Length or Height (cm)' : 'বয়স / Age (Months)'}
            </text>

            <text
              transform={`rotate(-90)`}
              x={-(padding.top + chartH / 2)}
              y={padding.left - 40}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#334155"
            >
              {yLabel}
            </text>

            {/* Shaded Normal Band (15th to 85th percentile) */}
            <path
              d={generateAreaPath('p15', 'p85')}
              fill="url(#normalBandGrad)"
              className="transition-all"
            />

            {/* Shaded Danger Zone (< -3 SD) */}
            <path
              d={generateAreaPath('sdNeg3', 'p3')}
              fill="url(#dangerBandGrad)"
              className="transition-all"
            />

            {/* Percentile Curves */}
            {/* +3 SD Curve */}
            <path
              d={generatePath('sdPos3')}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            {/* 97th Percentile (+2 SD) */}
            <path
              d={generatePath('p97')}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
            />
            {/* 85th Percentile (+1 SD) */}
            <path
              d={generatePath('p85')}
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
            {/* 50th Percentile (WHO Median) */}
            <path
              d={generatePath('p50')}
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
            />
            {/* 15th Percentile (-1 SD) */}
            <path
              d={generatePath('p15')}
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
            {/* 3rd Percentile (-2 SD) */}
            <path
              d={generatePath('p3')}
              fill="none"
              stroke="#f97316"
              strokeWidth="1.8"
            />
            {/* -3 SD Curve (Severe Malnutrition Red Alert) */}
            <path
              d={generatePath('sdNeg3')}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5 3"
            />

            {/* Curve End Labels */}
            {filteredTable.length > 0 && (() => {
              const last = filteredTable[filteredTable.length - 1];
              return (
                <g className="curve-labels" fontSize="9" fontWeight="bold">
                  <text x={scaleX(last.x) + 6} y={scaleY(last.sdPos3) + 3} fill="#64748b">+3 SD</text>
                  <text x={scaleX(last.x) + 6} y={scaleY(last.p97) + 3} fill="#d97706">97th</text>
                  <text x={scaleX(last.x) + 6} y={scaleY(last.p85) + 3} fill="#0284c7">85th</text>
                  <text x={scaleX(last.x) + 6} y={scaleY(last.p50) + 3} fill="#16a34a" fontWeight="bolder">50th (Med)</text>
                  <text x={scaleX(last.x) + 6} y={scaleY(last.p15) + 3} fill="#0284c7">15th</text>
                  <text x={scaleX(last.x) + 6} y={scaleY(last.p3) + 3} fill="#ea580c">3rd (-2SD)</text>
                  <text x={scaleX(last.x) + 6} y={scaleY(last.sdNeg3) + 3} fill="#dc2626" fontWeight="bolder">-3 SD</text>
                </g>
              );
            })()}

            {/* Child Trajectory Connecting Line (Multi-visit growth line) */}
            {plottedPoints.length > 1 && (
              <polyline
                points={plottedPoints.map((pt) => `${pt.px},${pt.py}`).join(' ')}
                fill="none"
                stroke="#4338ca"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            )}

            {/* Plotted Child Visit Points */}
            {plottedPoints.map((pt) => (
              <g key={pt.id} className="cursor-pointer group">
                <circle
                  cx={pt.px}
                  cy={pt.py}
                  r="6"
                  fill="#4338ca"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all hover:scale-125"
                />
                <circle
                  cx={pt.px}
                  cy={pt.py}
                  r="10"
                  fill="none"
                  stroke="#4338ca"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                <title>{`${pt.date}: ${pt.y} ${yUnit} at ${pt.ageMonths} mo`}</title>
              </g>
            ))}

            {/* Current Active Patient Highlight Pulsing Marker */}
            <g className="current-child-marker">
              <circle
                cx={currentMarker.px}
                cy={currentMarker.py}
                r="14"
                fill={theme.accentDot}
                opacity="0.25"
                className="animate-ping"
              />
              <circle
                cx={currentMarker.px}
                cy={currentMarker.py}
                r="7"
                fill={theme.accentDot}
                stroke="#ffffff"
                strokeWidth="2.5"
                className="shadow-md"
              />
              <text
                x={currentMarker.px}
                y={currentMarker.py - 12}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bolder"
                fill="#0f172a"
                className="bg-white/80"
              >
                {currentMetricValue} {yUnit}
              </text>
            </g>

            {/* Interactive Hover Guide & Tooltip Line */}
            {hoveredX !== null && hoverStats && (
              <g className="hover-guide">
                <line
                  x1={scaleX(hoveredX)}
                  y1={padding.top}
                  x2={scaleX(hoveredX)}
                  y2={padding.top + chartH}
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={scaleX(hoveredX)}
                  cy={scaleY(hoverStats.p50)}
                  r="4"
                  fill="#16a34a"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Dynamic Tooltip / Coordinate Readout */}
        <div className="bg-slate-100/90 rounded-xl p-3 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-700 shrink-0" />
            <span className="text-slate-700">
              {hoveredX !== null && hoverStats ? (
                <>
                  কার্সর পজিশন: <strong className="text-slate-900 font-mono">{hoveredX} {metric === 'wfh' ? 'cm' : 'মাস'}</strong> | 
                  মিডিয়ান (P50): <strong className="text-emerald-700 font-mono">{hoverStats.p50} {yUnit}</strong> | 
                  ৩য় পার্সেন্টাইল: <strong className="text-amber-700 font-mono">{hoverStats.p3} {yUnit}</strong> | 
                  ৯৭তম পার্সেন্টাইল: <strong className="text-sky-800 font-mono">{hoverStats.p97} {yUnit}</strong>
                </>
              ) : (
                <span>চার্টের উপর মাউস বা আঙুল রাখুন নির্দিষ্ট মাসের WHO বৃদ্ধির মানদণ্ড দেখার জন্য।</span>
              )}
            </span>
          </div>

          <div className="font-mono text-[11px] text-slate-500">
            Current Point: ({currentXValue} {metric === 'wfh' ? 'cm' : 'mo'}, {currentMetricValue} {yUnit})
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------------- */}
      {/* LONGITUDINAL VISITS TRACKER & GROWTH VELOCITY */}
      {/* ------------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>শিশুর নিয়মিত ভিজিট হিস্ট্রি ও গ্রোথ ভেলোসিটি (Longitudinal Growth Diary)</span>
            </h3>
            <p className="text-xs text-slate-500">
              ধারাবাহিক বৃদ্ধি পরীক্ষা (গ্রোথ ট্র্যাকিং) শিশুর অপুষ্টি বা বৃদ্ধি স্থবিরতা (Growth Faltering) দ্রুত সনাক্ত করে
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন ভিজিট যোগ করুন (Add Record)</span>
          </button>
        </div>

        {/* Growth Velocity Alert Banner if applicable */}
        {velocityInfo && (
          <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
            velocityInfo.isFaltering 
              ? 'bg-amber-50 border-amber-300 text-amber-900' 
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}>
            <div className="flex items-center gap-2">
              {velocityInfo.isFaltering ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <span>
                <strong>গ্রোথ ভেলোসিটি রেট:</strong> গত {velocityInfo.monthDiff} মাসে মোট ওজন বৃদ্ধি হয়েছে {velocityInfo.weightGainGrams} গ্রাম (গড়ে {velocityInfo.gainPerMonthGrams} গ্রাম/মাস)।
                {velocityInfo.isFaltering 
                  ? ' ⚠️ সতর্কতা: শিশুর ওজন বৃদ্ধির হার স্বাভাবিকের চেয়ে ধীর বা সমতল (Growth Faltering)! খাদ্য ও পুষ্টি পরীক্ষা করুন।' 
                  : ' ✓ চমৎকার! বৃদ্ধির হার সন্তোষজনক ও ঊর্ধ্বমুখী।'}
              </span>
            </div>
          </div>
        )}

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">তারিখ / ভিজিট</th>
                <th className="py-2.5 px-3">বয়স (মাস)</th>
                <th className="py-2.5 px-3">ওজন (Weight)</th>
                <th className="py-2.5 px-3">উচ্চতা (Height)</th>
                <th className="py-2.5 px-3">WFA Z-Score</th>
                <th className="py-2.5 px-3">মন্তব্য / ক্লিনিকাল নোট</th>
                <th className="py-2.5 px-3 text-right">একশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {records.map((rec) => {
                const recZ = assessGrowth('wfa', rec.weightKg, rec.ageMonths, gender).zScore;
                return (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-slate-900">{rec.date}</td>
                    <td className="py-2 px-3 font-mono">{rec.ageMonths} mo</td>
                    <td className="py-2 px-3 font-mono font-bold text-slate-900">{rec.weightKg} kg</td>
                    <td className="py-2 px-3 font-mono">{rec.heightCm ? `${rec.heightCm} cm` : '—'}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                        recZ < -3 ? 'bg-rose-100 text-rose-800' : recZ < -2 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {recZ} SD
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-500">{rec.note || '—'}</td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => handleDeleteRecord(rec.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                        title="ডিলিট করুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* ------------------------------------------------------------------- */}
      {/* BANGLADESH CLINICAL ACTION GUIDELINE & FEEDING PROTOCOLS */}
      {/* ------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Box A: Clinical Nutrition Advice for Current Status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>ক্লিনিকাল অ্যাকশন ও চিকিৎসা প্রটোকল (Pediatric Protocol)</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-600">
              <strong>বর্তমান অবস্থা:</strong> {assessment.statusLabelBn} ({assessment.clinicalMeaning})
            </p>

            <div className="space-y-1.5 pt-1">
              {assessment.clinicalRecommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 p-3 bg-sky-50 rounded-xl border border-sky-100 text-[11px] text-sky-900 space-y-1">
              <strong>বাংলাদেশ জাতীয় পুষ্টি প্রটোকল রিমাইন্ডার:</strong>
              <p>• ৬ মাস পর্যন্ত শুধুমাত্র মায়ের বুকের দুধ (পানিও নিষিদ্ধ)।</p>
              <p>• ৬ মাস পূর্ণ হলে ঘরের তৈরি ঘন খিচুড়ি (তেল, ডাল, শাকসবজি ও ডিম/মাছ) দিয়ে সম্পূরক খাবার শুরু করতে হবে।</p>
              <p>• ডায়রিয়ার পর অন্তত ২ সপ্তাহ জিংক সিরাপ (২০ মিগ্রা/দিন) দিতে হবে যা ওজন ফিরিয়ে আনতে সাহায্য করে।</p>
            </div>
          </div>
        </div>

        {/* Box B: Age-specific IYCF Milestones & Red Flags */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-900 font-bold text-sm border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>বয়স উপযোগী খাদ্য ও বিকাশ মাইলফলক ({relevantGuideline.ageRangeBn})</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">{totalAgeMonths} মাস বয়স</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <strong className="text-slate-800">খাবার পরামর্শ (Feeding Advice):</strong>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {relevantGuideline.feedingAdviceBn}
              </p>
            </div>

            <div className="space-y-1">
              <strong className="text-slate-800">বিকাশ মাইলফলক (Developmental Milestones):</strong>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {relevantGuideline.milestonesBn}
              </p>
            </div>

            <div className="space-y-1">
              <strong className="text-rose-700 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>বিপদ চিহ্ন (Danger Signs & Red Flags):</span>
              </strong>
              <p className="text-rose-800 leading-relaxed bg-rose-50/70 p-2.5 rounded-lg border border-rose-200">
                {relevantGuideline.redFlagsBn}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: ADD RECORD MODAL */}
      {/* ------------------------------------------------------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>নতুন গ্রোথ রেকর্ড যোগ করুন</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddVisit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">তারিখ / ভিজিটের বিবরণ:</label>
                <input
                  type="text"
                  required
                  value={newVisitDate}
                  onChange={(e) => setNewVisitDate(e.target.value)}
                  placeholder="e.g. 2026-10-15 or 9 Months"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">বয়স (মাসে / Age in Months):</label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    required
                    value={newVisitAgeMonths}
                    onChange={(e) => setNewVisitAgeMonths(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">ওজন (কেজি / Weight in kg):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="80"
                    required
                    value={newVisitWeight}
                    onChange={(e) => setNewVisitWeight(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">উচ্চতা (সেমি / Height in cm, ঐচ্ছিক):</label>
                <input
                  type="number"
                  step="0.5"
                  min="30"
                  max="180"
                  value={newVisitHeight}
                  onChange={(e) => setNewVisitHeight(parseFloat(e.target.value) || 75)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">মন্তব্য (Clinical Notes):</label>
                <input
                  type="text"
                  value={newVisitNote}
                  onChange={(e) => setNewVisitNote(e.target.value)}
                  placeholder="e.g. রুটিন ইপিআই ভিজিট, ডায়রিয়ার পর ফলোআপ"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  সংরক্ষণ করুন (Save)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

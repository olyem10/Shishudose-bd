// WHO Child Growth Standards (0 to 60 months, extended to 120 months)
// Based on World Health Organization Child Growth Standards & Bangladesh IYCF Guidelines

export type ChildGender = 'male' | 'female';
export type GrowthMetricType = 'wfa' | 'hfa' | 'wfh' | 'bfa';

export interface PercentilePoint {
  x: number; // Month or Height in cm
  p3: number;
  p15: number;
  p50: number; // Median
  p85: number;
  p97: number;
  sdNeg3: number; // -3 SD
  sdPos3: number; // +3 SD
}

export interface GrowthRecord {
  id: string;
  date: string;
  ageMonths: number;
  weightKg: number;
  heightCm?: number;
  headCircumferenceCm?: number;
  note?: string;
}

export interface GrowthAssessment {
  metric: GrowthMetricType;
  childValue: number;
  ageMonths: number;
  gender: ChildGender;
  zScore: number;
  percentile: number;
  status: 'severely_low' | 'low' | 'normal' | 'high' | 'severely_high';
  statusLabelEn: string;
  statusLabelBn: string;
  clinicalMeaning: string;
  clinicalRecommendations: string[];
}

// ---------------------------------------------------------------------------
// 1. WHO WEIGHT-FOR-AGE (WFA) - 0 to 120 MONTHS
// ---------------------------------------------------------------------------
export const WHO_WFA_BOYS: PercentilePoint[] = [
  { x: 0, sdNeg3: 2.1, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4, sdPos3: 5.0 },
  { x: 1, sdNeg3: 2.9, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8, sdPos3: 6.6 },
  { x: 2, sdNeg3: 3.8, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1, sdPos3: 8.0 },
  { x: 3, sdNeg3: 4.4, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0, sdPos3: 9.0 },
  { x: 4, sdNeg3: 4.9, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.7, sdPos3: 9.7 },
  { x: 5, sdNeg3: 5.3, p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.3, sdPos3: 10.4 },
  { x: 6, sdNeg3: 5.7, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8, sdPos3: 10.9 },
  { x: 7, sdNeg3: 5.9, p3: 6.7, p15: 7.4, p50: 8.3, p85: 9.2, p97: 10.3, sdPos3: 11.4 },
  { x: 8, sdNeg3: 6.2, p3: 6.9, p15: 7.7, p50: 8.6, p85: 9.6, p97: 10.7, sdPos3: 11.9 },
  { x: 9, sdNeg3: 6.4, p3: 7.2, p15: 8.0, p50: 8.9, p85: 9.9, p97: 11.0, sdPos3: 12.3 },
  { x: 10, sdNeg3: 6.6, p3: 7.4, p15: 8.2, p50: 9.2, p85: 10.2, p97: 11.4, sdPos3: 12.7 },
  { x: 11, sdNeg3: 6.8, p3: 7.6, p15: 8.4, p50: 9.4, p85: 10.5, p97: 11.7, sdPos3: 13.0 },
  { x: 12, sdNeg3: 6.9, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0, sdPos3: 13.3 },
  { x: 15, sdNeg3: 7.4, p3: 8.3, p15: 9.2, p50: 10.3, p85: 11.5, p97: 12.8, sdPos3: 14.3 },
  { x: 18, sdNeg3: 7.8, p3: 8.8, p15: 9.7, p50: 10.9, p85: 12.2, p97: 13.7, sdPos3: 15.3 },
  { x: 21, sdNeg3: 8.2, p3: 9.2, p15: 10.2, p50: 11.5, p85: 12.9, p97: 14.5, sdPos3: 16.2 },
  { x: 24, sdNeg3: 8.6, p3: 9.7, p15: 10.8, p50: 12.2, p85: 13.6, p97: 15.3, sdPos3: 17.1 },
  { x: 30, sdNeg3: 9.4, p3: 10.5, p15: 11.8, p50: 13.3, p85: 14.9, p97: 16.9, sdPos3: 18.9 },
  { x: 36, sdNeg3: 10.0, p3: 11.3, p15: 12.7, p50: 14.3, p85: 16.2, p97: 18.3, sdPos3: 20.7 },
  { x: 42, sdNeg3: 10.6, p3: 12.0, p15: 13.6, p50: 15.3, p85: 17.4, p97: 19.7, sdPos3: 22.4 },
  { x: 48, sdNeg3: 11.2, p3: 12.7, p15: 14.4, p50: 16.3, p85: 18.6, p97: 21.2, sdPos3: 24.2 },
  { x: 54, sdNeg3: 11.8, p3: 13.4, p15: 15.2, p50: 17.3, p85: 19.8, p97: 22.7, sdPos3: 26.0 },
  { x: 60, sdNeg3: 12.4, p3: 14.1, p15: 16.0, p50: 18.3, p85: 21.0, p97: 24.2, sdPos3: 27.9 },
  { x: 72, sdNeg3: 13.7, p3: 15.6, p15: 17.8, p50: 20.5, p85: 23.7, p97: 27.5, sdPos3: 31.9 },
  { x: 84, sdNeg3: 15.1, p3: 17.3, p15: 19.8, p50: 22.9, p85: 26.7, p97: 31.2, sdPos3: 36.4 },
  { x: 96, sdNeg3: 16.7, p3: 19.1, p15: 22.0, p50: 25.6, p85: 30.1, p97: 35.4, sdPos3: 41.5 },
  { x: 108, sdNeg3: 18.5, p3: 21.2, p15: 24.4, p50: 28.6, p85: 33.9, p97: 40.2, sdPos3: 47.4 },
  { x: 120, sdNeg3: 20.4, p3: 23.5, p15: 27.2, p50: 32.0, p85: 38.2, p97: 45.7, sdPos3: 54.2 }
];

export const WHO_WFA_GIRLS: PercentilePoint[] = [
  { x: 0, sdNeg3: 2.0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2, sdPos3: 4.8 },
  { x: 1, sdNeg3: 2.7, p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.5, sdPos3: 6.2 },
  { x: 2, sdNeg3: 3.4, p3: 3.9, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.6, sdPos3: 7.5 },
  { x: 3, sdNeg3: 4.0, p3: 4.5, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.5, sdPos3: 8.5 },
  { x: 4, sdNeg3: 4.4, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.3, p97: 8.2, sdPos3: 9.3 },
  { x: 5, sdNeg3: 4.8, p3: 5.4, p15: 6.1, p50: 6.9, p85: 7.8, p97: 8.8, sdPos3: 10.0 },
  { x: 6, sdNeg3: 5.1, p3: 5.7, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3, sdPos3: 10.6 },
  { x: 7, sdNeg3: 5.3, p3: 6.0, p15: 6.8, p50: 7.6, p85: 8.6, p97: 9.8, sdPos3: 11.1 },
  { x: 8, sdNeg3: 5.6, p3: 6.3, p15: 7.0, p50: 7.9, p85: 9.0, p97: 10.2, sdPos3: 11.6 },
  { x: 9, sdNeg3: 5.8, p3: 6.5, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.5, sdPos3: 12.0 },
  { x: 10, sdNeg3: 5.9, p3: 6.7, p15: 7.5, p50: 8.5, p85: 9.6, p97: 10.9, sdPos3: 12.4 },
  { x: 11, sdNeg3: 6.1, p3: 6.9, p15: 7.7, p50: 8.7, p85: 9.9, p97: 11.2, sdPos3: 12.8 },
  { x: 12, sdNeg3: 6.3, p3: 7.0, p15: 7.9, p50: 8.9, p85: 10.1, p97: 11.5, sdPos3: 13.1 },
  { x: 15, sdNeg3: 6.7, p3: 7.6, p15: 8.5, p50: 9.6, p85: 10.9, p97: 12.4, sdPos3: 14.1 },
  { x: 18, sdNeg3: 7.2, p3: 8.1, p15: 9.1, p50: 10.2, p85: 11.6, p97: 13.2, sdPos3: 15.0 },
  { x: 21, sdNeg3: 7.6, p3: 8.6, p15: 9.6, p50: 10.9, p85: 12.4, p97: 14.0, sdPos3: 16.0 },
  { x: 24, sdNeg3: 8.1, p3: 9.0, p15: 10.2, p50: 11.5, p85: 13.0, p97: 14.8, sdPos3: 16.9 },
  { x: 30, sdNeg3: 8.9, p3: 10.0, p15: 11.2, p50: 12.7, p85: 14.4, p97: 16.5, sdPos3: 18.9 },
  { x: 36, sdNeg3: 9.6, p3: 10.8, p15: 12.2, p50: 13.9, p85: 15.8, p97: 18.1, sdPos3: 20.9 },
  { x: 42, sdNeg3: 10.2, p3: 11.6, p15: 13.1, p50: 15.0, p85: 17.2, p97: 19.8, sdPos3: 22.9 },
  { x: 48, sdNeg3: 10.8, p3: 12.3, p15: 14.0, p50: 16.1, p85: 18.5, p97: 21.5, sdPos3: 25.0 },
  { x: 54, sdNeg3: 11.4, p3: 13.0, p15: 14.9, p50: 17.2, p85: 19.9, p97: 23.2, sdPos3: 27.2 },
  { x: 60, sdNeg3: 12.1, p3: 13.7, p15: 15.8, p50: 18.2, p85: 21.2, p97: 24.9, sdPos3: 29.5 },
  { x: 72, sdNeg3: 13.5, p3: 15.3, p15: 17.7, p50: 20.5, p85: 24.2, p97: 28.7, sdPos3: 34.4 },
  { x: 84, sdNeg3: 14.9, p3: 17.0, p15: 19.7, p50: 23.1, p85: 27.5, p97: 33.1, sdPos3: 40.2 },
  { x: 96, sdNeg3: 16.5, p3: 18.9, p15: 22.0, p50: 26.0, p85: 31.4, p97: 38.3, sdPos3: 47.1 },
  { x: 108, sdNeg3: 18.3, p3: 21.0, p15: 24.6, p50: 29.4, p85: 35.8, p97: 44.3, sdPos3: 54.8 },
  { x: 120, sdNeg3: 20.2, p3: 23.4, p15: 27.6, p50: 33.3, p85: 41.0, p97: 51.0, sdPos3: 63.3 }
];

// ---------------------------------------------------------------------------
// 2. WHO LENGTH/HEIGHT-FOR-AGE (LHFA) - 0 to 120 MONTHS (in cm)
// ---------------------------------------------------------------------------
export const WHO_LHFA_BOYS: PercentilePoint[] = [
  { x: 0, sdNeg3: 44.2, p3: 46.1, p15: 48.0, p50: 49.9, p85: 51.8, p97: 53.7, sdPos3: 55.6 },
  { x: 1, sdNeg3: 48.9, p3: 50.8, p15: 52.8, p50: 54.7, p85: 56.7, p97: 58.6, sdPos3: 60.6 },
  { x: 2, sdNeg3: 52.4, p3: 54.4, p15: 56.4, p50: 58.4, p85: 60.4, p97: 62.4, sdPos3: 64.4 },
  { x: 3, sdNeg3: 55.3, p3: 57.3, p15: 59.4, p50: 61.4, p85: 63.5, p97: 65.5, sdPos3: 67.6 },
  { x: 4, sdNeg3: 57.6, p3: 59.7, p15: 61.8, p50: 63.9, p85: 66.0, p97: 68.0, sdPos3: 70.1 },
  { x: 5, sdNeg3: 59.6, p3: 61.7, p15: 63.8, p50: 65.9, p85: 68.0, p97: 70.1, sdPos3: 72.2 },
  { x: 6, sdNeg3: 61.2, p3: 63.3, p15: 65.5, p50: 67.6, p85: 69.8, p97: 71.9, sdPos3: 74.0 },
  { x: 7, sdNeg3: 62.7, p3: 64.8, p15: 67.0, p50: 69.2, p85: 71.3, p97: 73.5, sdPos3: 75.7 },
  { x: 8, sdNeg3: 64.0, p3: 66.2, p15: 68.4, p50: 70.6, p85: 72.8, p97: 75.0, sdPos3: 77.2 },
  { x: 9, sdNeg3: 65.2, p3: 67.5, p15: 69.7, p50: 72.0, p85: 74.2, p97: 76.5, sdPos3: 78.7 },
  { x: 10, sdNeg3: 66.4, p3: 68.7, p15: 71.0, p50: 73.3, p85: 75.6, p97: 77.9, sdPos3: 80.1 },
  { x: 11, sdNeg3: 67.6, p3: 69.9, p15: 72.2, p50: 74.5, p85: 76.9, p97: 79.2, sdPos3: 81.5 },
  { x: 12, sdNeg3: 68.6, p3: 71.0, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.5, sdPos3: 82.9 },
  { x: 15, sdNeg3: 71.6, p3: 74.1, p15: 76.6, p50: 79.1, p85: 81.7, p97: 84.2, sdPos3: 86.7 },
  { x: 18, sdNeg3: 74.2, p3: 76.9, p15: 79.6, p50: 82.3, p85: 85.0, p97: 87.7, sdPos3: 90.4 },
  { x: 21, sdNeg3: 76.5, p3: 79.4, p15: 82.3, p50: 85.1, p85: 88.0, p97: 90.9, sdPos3: 93.8 },
  { x: 24, sdNeg3: 78.7, p3: 81.7, p15: 84.8, p50: 87.8, p85: 90.9, p97: 93.9, sdPos3: 97.0 },
  { x: 30, sdNeg3: 83.0, p3: 86.2, p15: 89.5, p50: 92.8, p85: 96.1, p97: 99.4, sdPos3: 102.7 },
  { x: 36, sdNeg3: 86.5, p3: 89.9, p15: 93.5, p50: 96.1, p85: 99.8, p97: 103.5, sdPos3: 107.2 },
  { x: 42, sdNeg3: 89.7, p3: 93.3, p15: 97.0, p50: 100.0, p85: 103.8, p97: 107.7, sdPos3: 111.7 },
  { x: 48, sdNeg3: 92.5, p3: 96.3, p15: 100.2, p50: 103.3, p85: 107.5, p97: 111.7, sdPos3: 115.9 },
  { x: 54, sdNeg3: 95.1, p3: 99.1, p15: 103.2, p50: 106.7, p85: 111.1, p97: 115.5, sdPos3: 120.0 },
  { x: 60, sdNeg3: 98.7, p3: 102.7, p15: 106.9, p50: 110.0, p85: 114.7, p97: 119.2, sdPos3: 123.9 },
  { x: 72, sdNeg3: 105.1, p3: 109.5, p15: 114.1, p50: 116.0, p85: 121.2, p97: 126.1, sdPos3: 131.2 },
  { x: 84, sdNeg3: 111.2, p3: 116.0, p15: 121.0, p50: 121.7, p85: 127.3, p97: 132.7, sdPos3: 138.2 },
  { x: 96, sdNeg3: 117.0, p3: 122.2, p15: 127.6, p50: 127.3, p85: 133.4, p97: 139.1, sdPos3: 145.1 },
  { x: 108, sdNeg3: 122.5, p3: 128.1, p15: 133.9, p50: 132.6, p85: 139.2, p97: 145.3, sdPos3: 151.7 },
  { x: 120, sdNeg3: 127.8, p3: 133.8, p15: 140.0, p50: 138.4, p85: 145.4, p97: 152.0, sdPos3: 159.0 }
];

export const WHO_LHFA_GIRLS: PercentilePoint[] = [
  { x: 0, sdNeg3: 43.6, p3: 45.4, p15: 47.3, p50: 49.1, p85: 51.0, p97: 52.9, sdPos3: 54.7 },
  { x: 1, sdNeg3: 47.8, p3: 49.8, p15: 51.7, p50: 53.7, p85: 55.6, p97: 57.6, sdPos3: 59.5 },
  { x: 2, sdNeg3: 51.0, p3: 53.0, p15: 55.0, p50: 57.1, p85: 59.1, p97: 61.1, sdPos3: 63.2 },
  { x: 3, sdNeg3: 53.5, p3: 55.6, p15: 57.7, p50: 59.8, p85: 61.9, p97: 64.0, sdPos3: 66.1 },
  { x: 4, sdNeg3: 55.6, p3: 57.8, p15: 60.0, p50: 62.1, p85: 64.3, p97: 66.4, sdPos3: 68.6 },
  { x: 5, sdNeg3: 57.4, p3: 59.6, p15: 61.9, p50: 64.0, p85: 66.2, p97: 68.5, sdPos3: 70.7 },
  { x: 6, sdNeg3: 58.9, p3: 61.2, p15: 63.5, p50: 65.7, p85: 68.0, p97: 70.3, sdPos3: 72.5 },
  { x: 7, sdNeg3: 60.3, p3: 62.7, p15: 65.0, p50: 67.3, p85: 69.6, p97: 71.9, sdPos3: 74.2 },
  { x: 8, sdNeg3: 61.7, p3: 64.0, p15: 66.4, p50: 68.7, p85: 71.1, p97: 73.5, sdPos3: 75.8 },
  { x: 9, sdNeg3: 62.9, p3: 65.3, p15: 67.7, p50: 70.1, p85: 72.6, p97: 75.0, sdPos3: 77.4 },
  { x: 10, sdNeg3: 64.1, p3: 66.5, p15: 69.0, p50: 71.5, p85: 73.9, p97: 76.4, sdPos3: 78.9 },
  { x: 11, sdNeg3: 65.2, p3: 67.7, p15: 70.3, p50: 72.8, p85: 75.3, p97: 77.8, sdPos3: 80.3 },
  { x: 12, sdNeg3: 66.3, p3: 68.9, p15: 71.4, p50: 74.0, p85: 76.6, p97: 79.2, sdPos3: 81.7 },
  { x: 15, sdNeg3: 69.5, p3: 72.2, p15: 74.8, p50: 77.5, p85: 80.2, p97: 83.0, sdPos3: 85.6 },
  { x: 18, sdNeg3: 72.4, p3: 75.1, p15: 77.9, p50: 80.7, p85: 83.6, p97: 86.5, sdPos3: 89.3 },
  { x: 21, sdNeg3: 74.9, p3: 77.8, p15: 80.7, p50: 83.7, p85: 86.7, p97: 89.8, sdPos3: 92.7 },
  { x: 24, sdNeg3: 77.2, p3: 80.3, p15: 83.3, p50: 86.4, p85: 89.6, p97: 92.9, sdPos3: 96.0 },
  { x: 30, sdNeg3: 81.6, p3: 84.8, p15: 88.0, p50: 91.4, p85: 94.8, p97: 98.3, sdPos3: 101.8 },
  { x: 36, sdNeg3: 85.0, p3: 88.5, p15: 92.0, p50: 95.1, p85: 98.9, p97: 102.7, sdPos3: 106.5 },
  { x: 42, sdNeg3: 88.0, p3: 91.9, p15: 95.7, p50: 99.0, p85: 103.0, p97: 107.0, sdPos3: 111.0 },
  { x: 48, sdNeg3: 90.7, p3: 94.9, p15: 99.0, p50: 102.7, p85: 106.8, p97: 111.0, sdPos3: 115.2 },
  { x: 54, sdNeg3: 93.3, p3: 97.7, p15: 102.1, p50: 106.2, p85: 110.5, p97: 115.0, sdPos3: 119.5 },
  { x: 60, sdNeg3: 95.8, p3: 100.5, p15: 105.1, p50: 109.4, p85: 114.0, p97: 118.6, sdPos3: 123.2 },
  { x: 72, sdNeg3: 102.5, p3: 107.6, p15: 112.4, p50: 115.5, p85: 120.6, p97: 125.7, sdPos3: 130.8 },
  { x: 84, sdNeg3: 108.8, p3: 114.4, p15: 119.5, p50: 121.1, p85: 126.7, p97: 132.3, sdPos3: 138.0 },
  { x: 96, sdNeg3: 114.7, p3: 120.8, p15: 126.3, p50: 126.8, p85: 133.0, p97: 139.0, sdPos3: 145.2 },
  { x: 108, sdNeg3: 120.3, p3: 127.0, p15: 133.0, p50: 132.2, p85: 139.1, p97: 145.6, sdPos3: 152.3 },
  { x: 120, sdNeg3: 125.8, p3: 133.0, p15: 139.5, p50: 138.6, p85: 146.0, p97: 153.2, sdPos3: 160.5 }
];

// ---------------------------------------------------------------------------
// 3. WHO WEIGHT-FOR-LENGTH/HEIGHT (WFH) - 45 cm to 115 cm (SAM & MAM Screening)
// ---------------------------------------------------------------------------
export const WHO_WFH_BOYS: PercentilePoint[] = [
  { x: 45, sdNeg3: 1.9, p3: 2.1, p15: 2.3, p50: 2.5, p85: 2.8, p97: 3.0, sdPos3: 3.3 },
  { x: 50, sdNeg3: 2.6, p3: 2.8, p15: 3.1, p50: 3.4, p85: 3.7, p97: 4.1, sdPos3: 4.4 },
  { x: 55, sdNeg3: 3.6, p3: 3.9, p15: 4.2, p50: 4.6, p85: 5.0, p97: 5.4, sdPos3: 5.9 },
  { x: 60, sdNeg3: 4.7, p3: 5.1, p15: 5.5, p50: 6.0, p85: 6.6, p97: 7.1, sdPos3: 7.7 },
  { x: 65, sdNeg3: 5.9, p3: 6.4, p15: 6.9, p50: 7.5, p85: 8.2, p97: 8.8, sdPos3: 9.6 },
  { x: 70, sdNeg3: 6.9, p3: 7.5, p15: 8.0, p50: 8.7, p85: 9.5, p97: 10.3, sdPos3: 11.2 },
  { x: 75, sdNeg3: 7.8, p3: 8.4, p15: 9.0, p50: 9.8, p85: 10.7, p97: 11.6, sdPos3: 12.6 },
  { x: 80, sdNeg3: 8.6, p3: 9.3, p15: 10.0, p50: 10.8, p85: 11.8, p97: 12.8, sdPos3: 13.9 },
  { x: 85, sdNeg3: 9.4, p3: 10.2, p15: 10.9, p50: 11.8, p85: 12.9, p97: 14.0, sdPos3: 15.2 },
  { x: 90, sdNeg3: 10.4, p3: 11.2, p15: 12.0, p50: 13.0, p85: 14.1, p97: 15.3, sdPos3: 16.7 },
  { x: 95, sdNeg3: 11.4, p3: 12.2, p15: 13.1, p50: 14.2, p85: 15.5, p97: 16.9, sdPos3: 18.5 },
  { x: 100, sdNeg3: 12.4, p3: 13.3, p15: 14.3, p50: 15.6, p85: 17.1, p97: 18.7, sdPos3: 20.6 },
  { x: 105, sdNeg3: 13.5, p3: 14.5, p15: 15.7, p50: 17.1, p85: 18.9, p97: 20.7, sdPos3: 22.9 },
  { x: 110, sdNeg3: 14.7, p3: 15.8, p15: 17.2, p50: 18.8, p85: 20.8, p97: 23.0, sdPos3: 25.5 },
  { x: 115, sdNeg3: 16.0, p3: 17.3, p15: 18.8, p50: 20.7, p85: 23.0, p97: 25.6, sdPos3: 28.5 },
  { x: 120, sdNeg3: 17.5, p3: 19.0, p15: 20.7, p50: 22.8, p85: 25.5, p97: 28.5, sdPos3: 31.9 }
];

export const WHO_WFH_GIRLS: PercentilePoint[] = [
  { x: 45, sdNeg3: 1.9, p3: 2.1, p15: 2.3, p50: 2.5, p85: 2.8, p97: 3.0, sdPos3: 3.3 },
  { x: 50, sdNeg3: 2.6, p3: 2.8, p15: 3.0, p50: 3.4, p85: 3.7, p97: 4.0, sdPos3: 4.4 },
  { x: 55, sdNeg3: 3.5, p3: 3.8, p15: 4.1, p50: 4.5, p85: 4.9, p97: 5.3, sdPos3: 5.8 },
  { x: 60, sdNeg3: 4.5, p3: 4.9, p15: 5.3, p50: 5.8, p85: 6.4, p97: 7.0, sdPos3: 7.6 },
  { x: 65, sdNeg3: 5.6, p3: 6.1, p15: 6.6, p50: 7.2, p85: 7.9, p97: 8.6, sdPos3: 9.4 },
  { x: 70, sdNeg3: 6.5, p3: 7.1, p15: 7.7, p50: 8.4, p85: 9.2, p97: 10.0, sdPos3: 10.9 },
  { x: 75, sdNeg3: 7.4, p3: 8.0, p15: 8.7, p50: 9.5, p85: 10.4, p97: 11.3, sdPos3: 12.3 },
  { x: 80, sdNeg3: 8.2, p3: 8.9, p15: 9.6, p50: 10.5, p85: 11.5, p97: 12.5, sdPos3: 13.7 },
  { x: 85, sdNeg3: 9.1, p3: 9.8, p15: 10.6, p50: 11.5, p85: 12.6, p97: 13.8, sdPos3: 15.2 },
  { x: 90, sdNeg3: 10.0, p3: 10.8, p15: 11.7, p50: 12.7, p85: 13.9, p97: 15.2, sdPos3: 16.8 },
  { x: 95, sdNeg3: 11.0, p3: 11.8, p15: 12.8, p50: 13.9, p85: 15.3, p97: 16.8, sdPos3: 18.6 },
  { x: 100, sdNeg3: 12.0, p3: 12.9, p15: 14.0, p50: 15.3, p85: 16.9, p97: 18.7, sdPos3: 20.8 },
  { x: 105, sdNeg3: 13.1, p3: 14.1, p15: 15.4, p50: 16.9, p85: 18.7, p97: 20.8, sdPos3: 23.3 },
  { x: 110, sdNeg3: 14.3, p3: 15.5, p15: 16.9, p50: 18.6, p85: 20.7, p97: 23.2, sdPos3: 26.2 },
  { x: 115, sdNeg3: 15.7, p3: 17.0, p15: 18.7, p50: 20.7, p85: 23.1, p97: 26.1, sdPos3: 29.7 },
  { x: 120, sdNeg3: 17.2, p3: 18.8, p15: 20.7, p50: 23.0, p85: 25.9, p97: 29.4, sdPos3: 33.7 }
];

// ---------------------------------------------------------------------------
// 4. WHO BMI-FOR-AGE (BFA) - 0 to 120 MONTHS (kg/m²)
// ---------------------------------------------------------------------------
export const WHO_BFA_BOYS: PercentilePoint[] = [
  { x: 0, sdNeg3: 11.1, p3: 12.2, p15: 12.9, p50: 13.4, p85: 14.3, p97: 15.3, sdPos3: 16.3 },
  { x: 3, sdNeg3: 14.2, p3: 15.1, p15: 16.0, p50: 16.8, p85: 17.8, p97: 18.8, sdPos3: 19.8 },
  { x: 6, sdNeg3: 14.5, p3: 15.5, p15: 16.4, p50: 17.3, p85: 18.3, p97: 19.4, sdPos3: 20.4 },
  { x: 12, sdNeg3: 14.1, p3: 15.0, p15: 15.9, p50: 16.8, p85: 17.8, p97: 18.9, sdPos3: 19.9 },
  { x: 24, sdNeg3: 13.4, p3: 14.3, p15: 15.1, p50: 16.0, p85: 17.0, p97: 18.1, sdPos3: 19.1 },
  { x: 36, sdNeg3: 13.0, p3: 13.8, p15: 14.6, p50: 15.5, p85: 16.5, p97: 17.6, sdPos3: 18.7 },
  { x: 48, sdNeg3: 12.7, p3: 13.5, p15: 14.3, p50: 15.3, p85: 16.3, p97: 17.5, sdPos3: 18.6 },
  { x: 60, sdNeg3: 12.4, p3: 13.3, p15: 14.2, p50: 15.2, p85: 16.4, p97: 17.7, sdPos3: 19.0 },
  { x: 72, sdNeg3: 12.3, p3: 13.2, p15: 14.1, p50: 15.3, p85: 16.6, p97: 18.1, sdPos3: 19.7 },
  { x: 84, sdNeg3: 12.3, p3: 13.2, p15: 14.2, p50: 15.5, p85: 17.0, p97: 18.8, sdPos3: 20.6 },
  { x: 96, sdNeg3: 12.4, p3: 13.3, p15: 14.4, p50: 15.8, p85: 17.6, p97: 19.6, sdPos3: 21.8 },
  { x: 108, sdNeg3: 12.5, p3: 13.5, p15: 14.7, p50: 16.2, p85: 18.3, p97: 20.6, sdPos3: 23.2 },
  { x: 120, sdNeg3: 12.7, p3: 13.7, p15: 15.1, p50: 16.8, p85: 19.1, p97: 21.8, sdPos3: 24.8 }
];

export const WHO_BFA_GIRLS: PercentilePoint[] = [
  { x: 0, sdNeg3: 10.9, p3: 12.0, p15: 12.7, p50: 13.3, p85: 14.1, p97: 15.1, sdPos3: 16.1 },
  { x: 3, sdNeg3: 13.7, p3: 14.7, p15: 15.6, p50: 16.4, p85: 17.4, p97: 18.4, sdPos3: 19.4 },
  { x: 6, sdNeg3: 14.1, p3: 15.1, p15: 16.0, p50: 16.9, p85: 17.9, p97: 19.0, sdPos3: 20.0 },
  { x: 12, sdNeg3: 13.7, p3: 14.6, p15: 15.5, p50: 16.4, p85: 17.4, p97: 18.5, sdPos3: 19.5 },
  { x: 24, sdNeg3: 13.0, p3: 13.9, p15: 14.8, p50: 15.7, p85: 16.7, p97: 17.8, sdPos3: 18.9 },
  { x: 36, sdNeg3: 12.6, p3: 13.5, p15: 14.4, p50: 15.3, p85: 16.3, p97: 17.4, sdPos3: 18.5 },
  { x: 48, sdNeg3: 12.3, p3: 13.2, p15: 14.1, p50: 15.1, p85: 16.2, p97: 17.4, sdPos3: 18.6 },
  { x: 60, sdNeg3: 12.1, p3: 13.0, p15: 14.0, p50: 15.0, p85: 16.3, p97: 17.7, sdPos3: 19.1 },
  { x: 72, sdNeg3: 12.0, p3: 12.9, p15: 13.9, p50: 15.1, p85: 16.6, p97: 18.2, sdPos3: 20.0 },
  { x: 84, sdNeg3: 12.0, p3: 13.0, p15: 14.1, p50: 15.4, p85: 17.1, p97: 19.0, sdPos3: 21.1 },
  { x: 96, sdNeg3: 12.1, p3: 13.2, p15: 14.4, p50: 15.8, p85: 17.8, p97: 20.0, sdPos3: 22.5 },
  { x: 108, sdNeg3: 12.3, p3: 13.5, p15: 14.8, p50: 16.4, p85: 18.7, p97: 21.2, sdPos3: 24.2 },
  { x: 120, sdNeg3: 12.5, p3: 13.9, p15: 15.4, p50: 17.1, p85: 19.7, p97: 22.6, sdPos3: 26.1 }
];

// ---------------------------------------------------------------------------
// HELPER: Linear Interpolation for exact curve evaluation
// ---------------------------------------------------------------------------
export function interpolatePercentiles(
  table: PercentilePoint[],
  xVal: number
): PercentilePoint {
  if (table.length === 0) {
    return { x: xVal, sdNeg3: 0, p3: 0, p15: 0, p50: 0, p85: 0, p97: 0, sdPos3: 0 };
  }
  if (xVal <= table[0].x) return table[0];
  if (xVal >= table[table.length - 1].x) return table[table.length - 1];

  let i = 0;
  while (i < table.length - 1 && table[i + 1].x < xVal) {
    i++;
  }

  const p0 = table[i];
  const p1 = table[i + 1];
  const t = (xVal - p0.x) / (p1.x - p0.x);

  const lerp = (a: number, b: number) => Math.round((a + (b - a) * t) * 100) / 100;

  return {
    x: xVal,
    sdNeg3: lerp(p0.sdNeg3, p1.sdNeg3),
    p3: lerp(p0.p3, p1.p3),
    p15: lerp(p0.p15, p1.p15),
    p50: lerp(p0.p50, p1.p50),
    p85: lerp(p0.p85, p1.p85),
    p97: lerp(p0.p97, p1.p97),
    sdPos3: lerp(p0.sdPos3, p1.sdPos3)
  };
}

// ---------------------------------------------------------------------------
// CALCULATE Z-SCORE & PERCENTILE FROM VALUE
// ---------------------------------------------------------------------------
export function calculateZScore(
  childVal: number,
  interpolated: PercentilePoint
): { zScore: number; percentile: number } {
  const median = interpolated.p50;
  let zScore = 0;

  if (childVal >= median) {
    // Above median: use SD from p50 to p97 (+2 SD approx)
    const upperSD = (interpolated.p97 - median) / 1.8808;
    zScore = upperSD > 0 ? (childVal - median) / upperSD : 0;
  } else {
    // Below median: use SD from p50 to p3 (-2 SD approx)
    const lowerSD = (median - interpolated.p3) / 1.8808;
    zScore = lowerSD > 0 ? (childVal - median) / lowerSD : 0;
  }

  zScore = Math.round(zScore * 100) / 100;

  // Standard Normal CDF approximation to get percentile
  const percentile = Math.min(99.9, Math.max(0.1, Math.round(normalCdf(zScore) * 1000) / 10));

  return { zScore, percentile };
}

// Approximation of standard normal CDF
function normalCdf(z: number): number {
  const b1 = 0.31938153;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;

  if (z >= 0.0) {
    const t = 1.0 / (1.0 + p * z);
    return 1.0 - c * Math.exp((-z * z) / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  } else {
    const t = 1.0 / (1.0 - p * z);
    return c * Math.exp((-z * z) / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  }
}

// ---------------------------------------------------------------------------
// CLINICAL INTERPRETATION GENERATOR FOR BANGLADESH CLINICAL PRACTICE
// ---------------------------------------------------------------------------
export function assessGrowth(
  metric: GrowthMetricType,
  childVal: number,
  ageMonths: number,
  gender: ChildGender,
  heightCm?: number
): GrowthAssessment {
  let table: PercentilePoint[];

  if (metric === 'wfa') {
    table = gender === 'male' ? WHO_WFA_BOYS : WHO_WFA_GIRLS;
  } else if (metric === 'hfa') {
    table = gender === 'male' ? WHO_LHFA_BOYS : WHO_LHFA_GIRLS;
  } else if (metric === 'wfh') {
    table = gender === 'male' ? WHO_WFH_BOYS : WHO_WFH_GIRLS;
  } else {
    table = gender === 'male' ? WHO_BFA_BOYS : WHO_BFA_GIRLS;
  }

  // Lookup point (x is age in months or height in cm for wfh)
  const xLookup = metric === 'wfh' ? (heightCm || 70) : ageMonths;
  const interpolated = interpolatePercentiles(table, xLookup);
  const { zScore, percentile } = calculateZScore(childVal, interpolated);

  let status: GrowthAssessment['status'] = 'normal';
  let statusLabelEn = 'Normal Growth';
  let statusLabelBn = 'স্বাভাবিক বৃদ্ধি';
  let clinicalMeaning = '';
  const clinicalRecommendations: string[] = [];

  if (metric === 'wfa') {
    // Weight-for-Age (Underweight screening)
    if (zScore < -3) {
      status = 'severely_low';
      statusLabelEn = 'Severely Underweight (WHO < -3 SD)';
      statusLabelBn = 'মারাত্মক স্বল্প ওজন (Severely Underweight)';
      clinicalMeaning = 'Child is significantly below WHO median. Indicates severe acute or chronic undernutrition.';
      clinicalRecommendations.push('তাত্ক্ষণিক মেডিকেল মূল্যায়ন ও SAM স্ক্রীনিং (Screen for Severe Acute Malnutrition).');
      clinicalRecommendations.push('বাইপ্যাডেল পিটিং ইডিমা (Pedal Edema) ও ক্ষুধা পরীক্ষা (Appetite Test) সম্পন্ন করুন।');
      clinicalRecommendations.push('উচ্চ ক্যালরি ও প্রোটিন সমৃদ্ধ খাবার (RUTF / Khichuri with oil & egg) এবং জিংক ২০ মিলিগ্রাম ১৪ দিন দিন।');
    } else if (zScore < -2) {
      status = 'low';
      statusLabelEn = 'Underweight (WHO -3 to -2 SD)';
      statusLabelBn = 'স্বল্প ওজন (Underweight)';
      clinicalMeaning = 'Weight is below the 3rd percentile. Child requires targeted dietary counselling and growth faltering monitoring.';
      clinicalRecommendations.push('উন্নত পুষ্টিকর পারিবারিক খাবার ও ঘন খিচুড়ি (তেল, ডাল ও ডিম সহযোগে) দিনে ৩-৪ বার দিন।');
      clinicalRecommendations.push('বয়স ৬ মাসের কম হলে এক্সক্লুসিভ ব্রেস্টফিডিং নিশ্চিত করুন।');
      clinicalRecommendations.push('কৃমিনাশক (Albendazole 400mg বা 200mg if 1-2yr) এবং ভিটামিন এ ক্যাপসুল হিস্ট্রি চেক করুন।');
    } else if (zScore > 2) {
      status = 'severely_high';
      statusLabelEn = 'Overweight / High Weight (WHO > +2 SD)';
      statusLabelBn = 'অতিরিক্ত ওজন (Overweight)';
      clinicalMeaning = 'Weight is above the 97th percentile. Assess for excessive caloric density or endocrine etiologies.';
      clinicalRecommendations.push('চিনিযুক্ত কোমল পানীয়, মিষ্টি জুস ও অতিরিক্ত ফাস্টফুড পরিহারের পরামর্শ দিন।');
      clinicalRecommendations.push('দৈনিক বয়সোপযোগী শারীরিক সক্রিয়তা ও খেলাধুলা নিশ্চিত করতে বলুন।');
    } else {
      status = 'normal';
      statusLabelEn = 'Normal Weight (WHO -2 to +2 SD)';
      statusLabelBn = 'স্বাভাবিক ওজন (Normal Weight)';
      clinicalMeaning = 'Child is growing within healthy WHO international standard range (3rd to 97th centile).';
      clinicalRecommendations.push('বয়সোচিত সুষম খাদ্য ও পরিচ্ছন্ন পানি পানের অভ্যাস অব্যাহত রাখুন।');
      clinicalRecommendations.push('নিয়মিত মাসিক বা দ্বি-মাসিক ইপিআই/ক্লিনিক ভিজিটে ওজন পরিমাপের পরামর্শ দিন।');
    }
  } else if (metric === 'hfa') {
    // Height-for-Age (Stunting screening)
    if (zScore < -3) {
      status = 'severely_low';
      statusLabelEn = 'Severely Stunted (WHO < -3 SD)';
      statusLabelBn = 'মারাত্মক খর্বকায় (Severely Stunted)';
      clinicalMeaning = 'Severe chronic nutritional deprivation or recurrent illnesses affecting skeletal linear growth.';
      clinicalRecommendations.push('দীর্ঘমেয়াদী প্রোটিন, মাইক্রোনিউট্রিয়েন্ট (জিংক, আয়রন, ক্যালসিয়াম) ও থাইরয়েড হিস্ট্রি মূল্যায়ন করুন।');
      clinicalRecommendations.push('ডায়রিয়া ও কৃমির সংক্রমণ প্রতিকারে জোর দিন।');
    } else if (zScore < -2) {
      status = 'low';
      statusLabelEn = 'Stunted (WHO -3 to -2 SD)';
      statusLabelBn = 'খর্বকায় (Stunted)';
      clinicalMeaning = 'Linear growth faltering (3rd percentile below standard). Indicates chronic undernutrition.';
      clinicalRecommendations.push('প্রাণিজ প্রোটিন (দুধ, ডিম, মাছ, মাংস) এবং জিংক সমৃদ্ধ খাবার বাড়ানো প্রয়োজন।');
    } else {
      status = 'normal';
      statusLabelEn = 'Normal Stature / Height';
      statusLabelBn = 'স্বাভাবিক উচ্চতা (Normal Height)';
      clinicalMeaning = 'Height is along healthy WHO biological genetic potential.';
      clinicalRecommendations.push('সুষম খাদ্য এবং পর্যাপ্ত শারীরিক বিকাশ ও খেলার সুযোগ নিশ্চিত রাখুন।');
    }
  } else if (metric === 'wfh') {
    // Weight-for-Height (Wasting SAM/MAM)
    if (zScore < -3) {
      status = 'severely_low';
      statusLabelEn = 'Severe Acute Malnutrition / SAM (WHO < -3 SD)';
      statusLabelBn = 'মারাত্মক তীব্র অপুষ্টি (SAM - Severe Wasting)';
      clinicalMeaning = 'Critical medical emergency in pediatric IMCI! Extreme wasting with high risk of mortality without immediate intervention.';
      clinicalRecommendations.push('উভয় পায়ে পানি (Bilateral pedal edema) আছে কিনা পরীক্ষা করুন।');
      clinicalRecommendations.push('ক্ষুধা পরীক্ষা ইতিবাচক ও জটিলতামুক্ত হলে কমিউনিটি বেইজড RUTF (Ready to Use Therapeutic Food) শুরু করুন।');
      clinicalRecommendations.push('জটিলতা থাকলে (Hypoglycemia, Hypothermia, Lethargy) নিকটস্থ অপুষ্টি পুনর্বাসন কেন্দ্রে (ICDDR,B / NRC / Upazila SAC) রেফার করুন।');
    } else if (zScore < -2) {
      status = 'low';
      statusLabelEn = 'Moderate Acute Malnutrition / MAM (WHO -3 to -2 SD)';
      statusLabelBn = 'মাঝারি অপুষ্টি (MAM - Moderate Wasting)';
      clinicalMeaning = 'Child is wasted (below 3rd percentile for current height). High risk of deteriorating into SAM.';
      clinicalRecommendations.push('ঘন ক্যালোরিযুক্ত খাবার (Pushti packet / সুজি-খিচুড়ি) এবং জিংক সাপ্লিমেন্টেশন দিন।');
      clinicalRecommendations.push('প্রতি ২ সপ্তাহ পর পর ফলো-আপ নিশ্চিত করুন।');
    } else if (zScore > 3) {
      status = 'severely_high';
      statusLabelEn = 'Obese (WHO > +3 SD)';
      statusLabelBn = 'স্থূলতা (Obese)';
      clinicalMeaning = 'High adiposity for height. Long term cardiometabolic risk.';
      clinicalRecommendations.push('পারিবারিক জীবনধারা ও খাদ্যাভ্যাস পরিবর্তন জরুরি।');
    } else if (zScore > 2) {
      status = 'high';
      statusLabelEn = 'Overweight (WHO +2 to +3 SD)';
      statusLabelBn = 'অতিরিক্ত ওজন (Overweight)';
      clinicalMeaning = 'Weight is disproportionately high for length/height.';
      clinicalRecommendations.push('চিনিযুক্ত খাবার ও স্ক্রিন টাইম কমিয়ে আউটডোর খেলাধুলা বাড়ান।');
    } else {
      status = 'normal';
      statusLabelEn = 'Normal Weight-for-Height (Well Nourished)';
      statusLabelBn = 'উচ্চতা অনুযায়ী স্বাভাবিক ওজন (পুষ্টিকর)';
      clinicalMeaning = 'Optimal weight-height proportion. No acute wasting.';
      clinicalRecommendations.push('স্বাভাবিক সুষম পুষ্টিকর খাদ্যাভ্যাস চালিয়ে যান।');
    }
  } else {
    // BMI-for-Age
    if (zScore < -3) {
      status = 'severely_low';
      statusLabelEn = 'Severe Thinness';
      statusLabelBn = 'মারাত্মক কৃশতা (Severe Thinness)';
      clinicalMeaning = 'BMI is critically low for age.';
      clinicalRecommendations.push('SAM স্ক্রিনিং ও উচ্চ ক্যালরিযুক্ত সম্পূরক খাদ্য প্রয়োজন।');
    } else if (zScore < -2) {
      status = 'low';
      statusLabelEn = 'Thinness';
      statusLabelBn = 'কৃশতা / কম বিএমআই (Thinness)';
      clinicalMeaning = 'BMI is below healthy percentile.';
      clinicalRecommendations.push('খাবারের ফ্রিকোয়েন্সি ও ক্যালোরির ঘনত্ব বাড়ান।');
    } else if (zScore > 2) {
      status = 'severely_high';
      statusLabelEn = 'Obese / High BMI';
      statusLabelBn = 'স্থূলতা / উচ্চ বিএমআই (Obesity)';
      clinicalMeaning = 'High BMI-for-age indicates childhood obesity.';
      clinicalRecommendations.push('ডায়েটিশিয়ান কাউন্সিলিং ও সক্রিয় জীবনধারা আবশ্যক।');
    } else if (zScore > 1) {
      status = 'high';
      statusLabelEn = 'Overweight (Risk of Obesity)';
      statusLabelBn = 'অতিরিক্ত ওজন (ঝুঁকিপূর্ণ)';
      clinicalMeaning = 'Child is trending above 85th percentile.';
      clinicalRecommendations.push('সুষম পুষ্টি ও নিয়মিত ব্যায়ামে জোর দিন।');
    } else {
      status = 'normal';
      statusLabelEn = 'Healthy BMI';
      statusLabelBn = 'সুস্থ স্বাভাবিক বিএমআই';
      clinicalMeaning = 'Normal body mass index for age.';
      clinicalRecommendations.push('বর্তমান পুষ্টিকর খাদ্য বজায় রাখুন।');
    }
  }

  return {
    metric,
    childValue: childVal,
    ageMonths,
    gender,
    zScore,
    percentile,
    status,
    statusLabelEn,
    statusLabelBn,
    clinicalMeaning,
    clinicalRecommendations
  };
}

// ---------------------------------------------------------------------------
// BANGLADESH IYCF AGE-SPECIFIC FEEDING & MILESTONE TIPS
// ---------------------------------------------------------------------------
export interface FeedingGuideline {
  ageRange: string;
  ageRangeBn: string;
  milestonesBn: string;
  feedingAdviceBn: string;
  redFlagsBn: string;
}

export const IYCF_GUIDELINES: FeedingGuideline[] = [
  {
    ageRange: '0 - 6 Months',
    ageRangeBn: '০ থেকে ৬ মাস',
    milestonesBn: 'মাথা শক্ত করা, হাসির জবাবে হাসা, মুখের দিকে তাকানো, হাত মুখে নেওয়া।',
    feedingAdviceBn: 'শুধুমাত্র মায়ের বুকের দুধ (Exclusive Breastfeeding)। পানি, মধু, বা ফর্মুলা একদম নয়। দিনে-রাতে অন্তত ৮-১২ বার চাহিদা মাফিক বুকের দুধ খাওয়ান।',
    redFlagsBn: 'যদি শিশু মায়ের দুধ টানতে না পারে, নিস্তেজ হয়ে পড়ে বা দিনে ৬ বারের কম প্রস্রাব করে তবে দ্রুত চিকিৎসককে দেখান।'
  },
  {
    ageRange: '6 - 8 Months',
    ageRangeBn: '৬ থেকে ৮ মাস',
    milestonesBn: 'অন্যের সাহায্য ছাড়া বসা, খেলনা এক হাত থেকে অন্য হাতে নেওয়া, বা-বা বা দা-দা শব্দ করা।',
    feedingAdviceBn: 'বুকের দুধের পাশাপাশি ঘন নরম খিচুড়ি (চাল, ডাল, তেল, সবজি, ডিমের কুসুম) দিনে ২-৩ বার শুরু করুন। প্রথমে অল্প দিয়ে শুরু করে আস্তে আস্তে বাটি ভর্তি করুন।',
    redFlagsBn: 'ঘন খিচুড়ি খেতে অনীহা, বমি করা, বা ওজন না বাড়লে খাবারের তেল ও স্বাদ পরিবর্তন করে বারবার ট্রাই করুন।'
  },
  {
    ageRange: '9 - 11 Months',
    ageRangeBn: '৯ থেকে ১১ মাস',
    milestonesBn: 'কোনো কিছু ধরে দাঁড়ানো, হাততালি দেওয়া, ছোট জিনিস আঙুল দিয়ে ধরা (Pincer grasp)।',
    feedingAdviceBn: 'বুকের দুধ চলবে। দিনে ৩ বার পারিবারিক খিচুড়ি/মাছ/ডিম/কলা এবং ১-২ বার পুষ্টিকর নাস্তা (আম, কলা, নরম ফল) দিন। শিশু নিজ হাতে খাবার ধরার চেষ্টা করবে।',
    redFlagsBn: 'যদি খাবার চিবিয়ে না খেয়ে শুধু তরল চায় তবে ধীরে ধীরে দানাদার খাবারের পরিমাণ বাড়াতে হবে।'
  },
  {
    ageRange: '12 - 23 Months',
    ageRangeBn: '১২ থেকে ২৩ মাস (১ থেকে ২ বছর)',
    milestonesBn: 'সহায়তা ছাড়া হাঁটা, ৩-৫টি অর্থপূর্ণ শব্দ বলা, নিজের চামচ ধরার চেষ্টা।',
    feedingAdviceBn: 'বুকের দুধ ২ বছর পর্যন্ত চলবে। পরিবারের সাধারণ পুষ্টিকর খাবার দিনে ৩-৪ বার এবং স্বাস্থ্যকর নাস্তা ২ বার দিন। দিনে অন্তত ১টি ডিম ও পর্যাপ্ত পানি দিন।',
    redFlagsBn: 'গ্রোথ ফ্যাল্টারিং (ওজন কমে যাওয়া বা এক জায়গায় আটকে থাকা), রক্তশূন্যতা বা ডায়রিয়ার লক্ষণ দেখা দিলে সতর্ক হোন।'
  },
  {
    ageRange: '2 - 5 Years',
    ageRangeBn: '২ থেকে ৫ বছর',
    milestonesBn: 'দৌড়ানো, সিঁড়ি দিয়ে ওঠা, ছোট বাক্য বলা, নিজে নিজে খাওয়া।',
    feedingAdviceBn: 'পরিবারের সকলের সাথে ৩ বেলা পুষ্টিকর প্রধান খাবার এবং ২ বেলা ফল/দুধ/ডিম নাস্তা হিসেবে দিন। কৃত্রিম চিপস, চকোলেট ও জুস বন্ধ রাখুন।',
    redFlagsBn: 'খাবারে চরম অনীহা, অতিরিক্ত ক্লান্তি বা সমবয়সীদের তুলনায় অস্বাভাবিক খর্বকায় দেখা দিলে থাইরয়েড বা পুষ্টির অভাব মূল্যায়ন করুন।'
  }
];

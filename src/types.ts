export type PageType = 
  | 'home'
  | 'tools'
  | 'bmicalc'
  | 'caloriecalc'
  | 'watercalc'
  | 'idealweightcalc'
  | 'trackers'
  | 'weighttracker'
  | 'sleeptracker'
  | 'medreminder'
  | 'articles'
  | 'article-detail'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'disclaimer';

export type UnitSystem = 'metric' | 'imperial';

// BMI Types
export interface BMIResult {
  bmi: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity Class 1' | 'Obesity Class 2' | 'Severe Obesity';
  color: string;
  minHealthyWeight: number;
  maxHealthyWeight: number;
  ponderalIndex: number;
  bmiPrime: number;
  advice: string[];
}

// Calorie Types
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type GoalType = 'lose_fast' | 'lose_gradual' | 'maintain' | 'gain_gradual' | 'gain_fast';

export interface CalorieResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  waterLiters: number;
}

// Water Calculator Types
export interface WaterResult {
  dailyLiters: number;
  dailyOunces: number;
  glassesCount: number; // 250ml / 8oz glasses
  hourlySchedule: { time: string; targetOz: number; targetMl: number }[];
  tips: string[];
}

// Ideal Weight Calculator Types
export interface IdealWeightResult {
  hamwi: number;
  devine: number;
  robinson: number;
  miller: number;
  average: number;
  bmiBasedRange: { min: number; max: number };
}

// Tracker Types
export interface WeightLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  weightKg: number;
  weightLbs: number;
  notes?: string;
  bodyFatPercentage?: number;
}

export interface SleepLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  bedtime: string; // HH:mm
  wakeTime: string; // HH:mm
  durationHours: number;
  qualityScore: number; // 1 to 5 stars
  factors: string[]; // e.g., ['Caffeine', 'Screen Time', 'Exercised', 'Late Meal']
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  unit: string; // mg, ml, tablet, capsule, drops
  timesPerDay: number;
  scheduledTimes: string[]; // ['08:00', '20:00']
  instructions?: string; // e.g., 'Take with meals'
  refillCount?: number;
  active: boolean;
}

export interface MedicationLogEntry {
  id: string;
  medicationId: string;
  medicationName: string;
  takenAt: string; // ISO string or format
  date: string; // YYYY-MM-DD
  scheduledTime: string;
  status: 'taken' | 'skipped' | 'late';
}

// Article Types
export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Nutrition' | 'Fitness' | 'Weight Management' | 'Sleep & Wellness' | 'Preventive Care';
  summary: string;
  readTimeMinutes: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  featured?: boolean;
  metaKeywords: string[];
  content: {
    heading: string;
    paragraphs: string[];
    keyTakeaways?: string[];
  }[];
}

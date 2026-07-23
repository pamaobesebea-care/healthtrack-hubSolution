import { 
  BMIResult, 
  CalorieResult, 
  WaterResult, 
  IdealWeightResult, 
  UnitSystem, 
  ActivityLevel, 
  GoalType 
} from '../types';

/**
 * Calculates BMI and healthy weight boundaries
 */
export function calculateBMI(
  weightKg: number, 
  heightCm: number, 
  unit: UnitSystem = 'metric'
): BMIResult {
  if (heightCm <= 0 || weightKg <= 0) {
    return {
      bmi: 0,
      category: 'Normal weight',
      color: '#0d9488',
      minHealthyWeight: 0,
      maxHealthyWeight: 0,
      ponderalIndex: 0,
      bmiPrime: 0,
      advice: []
    };
  }

  const heightMeters = heightCm / 100;
  const bmiRaw = weightKg / (heightMeters * heightMeters);
  const bmi = Math.round(bmiRaw * 10) / 10;

  // Ponderal index (kg/m^3)
  const ponderalIndex = Math.round((weightKg / Math.pow(heightMeters, 3)) * 10) / 10;
  // BMI Prime (ratio relative to 25)
  const bmiPrime = Math.round((bmiRaw / 25) * 100) / 100;

  // Healthy weight range for BMI 18.5 - 24.9
  const minHealthyWeight = Math.round(18.5 * heightMeters * heightMeters * 10) / 10;
  const maxHealthyWeight = Math.round(24.9 * heightMeters * heightMeters * 10) / 10;

  let category: BMIResult['category'] = 'Normal weight';
  let color = '#10b981'; // Green
  let advice: string[] = [];

  if (bmiRaw < 18.5) {
    category = 'Underweight';
    color = '#0284c7'; // Sky blue
    advice = [
      'Focus on nutrient-dense meals rich in healthy fats, lean protein, and complex carbohydrates.',
      'Incorporate strength training to build healthy muscle mass.',
      'Consult a dietitian or medical physician if experiencing unintentional weight loss.'
    ];
  } else if (bmiRaw >= 18.5 && bmiRaw < 25) {
    category = 'Normal weight';
    color = '#0d9488'; // Teal
    advice = [
      'Great job! Maintain your balanced diet rich in whole foods and fiber.',
      'Aim for 150 minutes of moderate cardiovascular activity weekly.',
      'Ensure adequate daily sleep and hydration to sustain energy levels.'
    ];
  } else if (bmiRaw >= 25 && bmiRaw < 30) {
    category = 'Overweight';
    color = '#f59e0b'; // Amber
    advice = [
      'Aim for a slight caloric deficit (300–500 kcal/day) for gradual weight reduction.',
      'Increase daily non-exercise physical activity (e.g., walking 8,000–10,000 steps).',
      'Swap refined sugars and processed snacks for whole fruits, vegetables, and high-protein foods.'
    ];
  } else if (bmiRaw >= 30 && bmiRaw < 35) {
    category = 'Obesity Class 1';
    color = '#f97316'; // Orange
    advice = [
      'Consult a physician or certified dietitian for a structured, personalized wellness plan.',
      'Focus on lifestyle consistency rather than quick-fix diets.',
      'Monitor blood pressure, blood glucose, and lipid panels periodically.'
    ];
  } else if (bmiRaw >= 35 && bmiRaw < 40) {
    category = 'Obesity Class 2';
    color = '#ef4444'; // Red
    advice = [
      'Seek clinical medical guidance for tailored lifestyle and behavioral modifications.',
      'Prioritize low-impact aerobic exercises like swimming or cycling to protect joint health.',
      'Emphasize portion control and tracking daily caloric intake.'
    ];
  } else {
    category = 'Severe Obesity';
    color = '#991b1b'; // Dark Red
    advice = [
      'Comprehensive clinical medical assessment is strongly recommended.',
      'Discuss multi-disciplinary options including nutrition therapy and medical supervision.',
      'Take incremental daily steps toward sustainable lifestyle enhancement.'
    ];
  }

  return {
    bmi,
    category,
    color,
    minHealthyWeight,
    maxHealthyWeight,
    ponderalIndex,
    bmiPrime,
    advice
  };
}

/**
 * Calculates Caloric needs via Mifflin-St Jeor Equation
 */
export function calculateCalories(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
  activity: ActivityLevel,
  goal: GoalType
): CalorieResult {
  if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
    return { bmr: 0, tdee: 0, targetCalories: 0, proteinGrams: 0, carbGrams: 0, fatGrams: 0, waterLiters: 0 };
  }

  // Mifflin-St Jeor BMR equation
  // Male: 10*weight(kg) + 6.25*height(cm) - 5*age + 5
  // Female: 10*weight(kg) + 6.25*height(cm) - 5*age - 161
  const baseBmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  const bmr = gender === 'male' ? Math.round(baseBmr + 5) : Math.round(baseBmr - 161);

  // Activity multipliers
  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.2));

  // Target calories based on goal
  let goalAdjustment = 0;
  if (goal === 'lose_fast') goalAdjustment = -750; // ~0.75 kg/week
  else if (goal === 'lose_gradual') goalAdjustment = -350; // ~0.35 kg/week
  else if (goal === 'maintain') goalAdjustment = 0;
  else if (goal === 'gain_gradual') goalAdjustment = 350;
  else if (goal === 'gain_fast') goalAdjustment = 650;

  const targetCalories = Math.max(1200, Math.round(tdee + goalAdjustment));

  // Macronutrient breakdown (40% Carbs, 30% Protein, 30% Fat)
  const proteinGrams = Math.round((targetCalories * 0.30) / 4);
  const carbGrams = Math.round((targetCalories * 0.40) / 4);
  const fatGrams = Math.round((targetCalories * 0.30) / 9);

  // General fluid estimate (35 ml per kg body weight)
  const waterLiters = Math.round((weightKg * 0.035) * 10) / 10;

  return {
    bmr,
    tdee,
    targetCalories,
    proteinGrams,
    carbGrams,
    fatGrams,
    waterLiters
  };
}

/**
 * Calculates Water Hydration Needs based on Weight, Exercise, and Climate
 */
export function calculateWater(
  weightKg: number,
  exerciseMinutes: number = 0,
  climate: 'temperate' | 'hot' | 'humid' = 'temperate'
): WaterResult {
  if (weightKg <= 0) {
    return {
      dailyLiters: 0,
      dailyOunces: 0,
      glassesCount: 0,
      hourlySchedule: [],
      tips: []
    };
  }

  // Base requirement: ~33ml per kg
  let baseMl = weightKg * 33;

  // Exercise factor: add ~350ml per 15 minutes of exercise
  const exerciseMl = (exerciseMinutes / 15) * 350;

  // Climate adjustment factor
  let climateMultiplier = 1.0;
  if (climate === 'hot') climateMultiplier = 1.15;
  if (climate === 'humid') climateMultiplier = 1.20;

  const totalMl = (baseMl + exerciseMl) * climateMultiplier;
  const dailyLiters = Math.round((totalMl / 1000) * 10) / 10;
  const dailyOunces = Math.round(totalMl / 29.5735); // 1 fl oz = ~29.57 ml
  const glassesCount = Math.ceil(totalMl / 250); // 250 ml glass

  // Hourly schedule between 7 AM and 10 PM (15 hours)
  const hourlySchedule = [
    { time: '07:00 AM', targetMl: 350, targetOz: 12 },
    { time: '09:00 AM', targetMl: 250, targetOz: 8 },
    { time: '11:00 AM', targetMl: 250, targetOz: 8 },
    { time: '01:00 PM', targetMl: 350, targetOz: 12 },
    { time: '03:00 PM', targetMl: 250, targetOz: 8 },
    { time: '05:00 PM', targetMl: 250, targetOz: 8 },
    { time: '07:00 PM', targetMl: 350, targetOz: 12 },
    { time: '09:00 PM', targetMl: 200, targetOz: 7 }
  ];

  const tips = [
    'Drink a 250ml glass of water immediately after waking up to kickstart metabolism.',
    'Keep a reusable stainless steel water bottle at your desk or in your bag.',
    'Increase fluid intake during intense cardiovascular workouts or hot weather.',
    'Incorporate water-rich foods like cucumber, watermelon, oranges, and spinach into your meals.',
    'Monitor urine color: pale yellow or straw-colored indicates healthy hydration.'
  ];

  return {
    dailyLiters,
    dailyOunces,
    glassesCount,
    hourlySchedule,
    tips
  };
}

/**
 * Calculates Ideal Weight using 4 Recognized Medical Formulas
 */
export function calculateIdealWeight(
  heightCm: number,
  gender: 'male' | 'female'
): IdealWeightResult {
  if (heightCm <= 0) {
    return {
      hamwi: 0,
      devine: 0,
      robinson: 0,
      miller: 0,
      average: 0,
      bmiBasedRange: { min: 0, max: 0 }
    };
  }

  // Convert height to inches above 5 feet (60 inches)
  const totalInches = heightCm / 2.54;
  const inchesOver60 = Math.max(0, totalInches - 60);

  let devine = 0;
  let robinson = 0;
  let miller = 0;
  let hamwi = 0;

  if (gender === 'male') {
    devine = 50 + (2.3 * inchesOver60);
    robinson = 52 + (1.9 * inchesOver60);
    miller = 56.2 + (1.41 * inchesOver60);
    hamwi = 48 + (2.7 * inchesOver60);
  } else {
    devine = 45.5 + (2.3 * inchesOver60);
    robinson = 49 + (1.7 * inchesOver60);
    miller = 53.1 + (1.36 * inchesOver60);
    hamwi = 45.5 + (2.2 * inchesOver60);
  }

  devine = Math.round(devine * 10) / 10;
  robinson = Math.round(robinson * 10) / 10;
  miller = Math.round(miller * 10) / 10;
  hamwi = Math.round(hamwi * 10) / 10;

  const average = Math.round(((devine + robinson + miller + hamwi) / 4) * 10) / 10;

  // Normal BMI range 18.5 - 24.9
  const heightMeters = heightCm / 100;
  const minBmiWeight = Math.round(18.5 * heightMeters * heightMeters * 10) / 10;
  const maxBmiWeight = Math.round(24.9 * heightMeters * heightMeters * 10) / 10;

  return {
    hamwi,
    devine,
    robinson,
    miller,
    average,
    bmiBasedRange: { min: minBmiWeight, max: maxBmiWeight }
  };
}

/**
 * Converts kg to lbs
 */
export function kgToLbs(kg: number): number {
  return Math.round((kg * 2.20462) * 10) / 10;
}

/**
 * Converts lbs to kg
 */
export function lbsToKg(lbs: number): number {
  return Math.round((lbs / 2.20462) * 10) / 10;
}

/**
 * Converts cm to feet and inches string (e.g. 175cm -> "5'9\"")
 */
export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = Math.round(cm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
}

/**
 * Converts feet and inches to cm
 */
export function feetInchesToCm(feet: number, inches: number): number {
  return Math.round(((feet * 12) + inches) * 2.54);
}

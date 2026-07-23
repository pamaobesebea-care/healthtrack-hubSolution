import React, { useState } from 'react';
import { 
  Flame, 
  RotateCcw, 
  Printer, 
  Activity, 
  Dumbbell, 
  Apple, 
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Target
} from 'lucide-react';
import { UnitSystem, ActivityLevel, GoalType, CalorieResult } from '../../types';
import { calculateCalories, kgToLbs, lbsToKg, cmToFeetInches, feetInchesToCm } from '../../utils/healthCalculators';

export const CalorieCalculator: React.FC = () => {
  const [unit, setUnit] = useState<UnitSystem>('metric');
  
  // Demographics
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);

  // Measurements
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(175);

  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);

  // Activity & Goal
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<GoalType>('lose_gradual');

  // Switch Unit
  const handleUnitToggle = (newUnit: UnitSystem) => {
    if (newUnit === 'imperial') {
      setWeightLbs(kgToLbs(weightKg));
      const { feet, inches } = cmToFeetInches(heightCm);
      setHeightFeet(feet);
      setHeightInches(inches);
    } else {
      setWeightKg(lbsToKg(weightLbs));
      setHeightCm(feetInchesToCm(heightFeet, heightInches));
    }
    setUnit(newUnit);
  };

  const finalWeightKg = unit === 'metric' ? weightKg : lbsToKg(weightLbs);
  const finalHeightCm = unit === 'metric' ? heightCm : feetInchesToCm(heightFeet, heightInches);

  const result: CalorieResult = calculateCalories(
    finalWeightKg, 
    finalHeightCm, 
    age, 
    gender, 
    activity, 
    goal
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-sky-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <Flame className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-teal-200">
            <Activity className="w-3.5 h-3.5 text-teal-300" />
            <span>Mifflin-St Jeor Energy Expenditure Model</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Calorie Calculator (BMR & TDEE)</h1>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            Determine your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Discover target daily calorie deficits and macro splits tailored for weight loss, maintenance, or muscle gain.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-teal-600" />
              Body Parameters
            </h2>

            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => handleUnitToggle('metric')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  unit === 'metric' ? 'bg-white text-teal-700 shadow-xs font-bold' : 'text-slate-500'
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => handleUnitToggle('imperial')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  unit === 'imperial' ? 'bg-white text-teal-700 shadow-xs font-bold' : 'text-slate-500'
                }`}
              >
                Imperial
              </button>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Gender & Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      gender === 'male' ? 'bg-teal-50 border-teal-300 text-teal-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      gender === 'female' ? 'bg-teal-50 border-teal-300 text-teal-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Age</label>
                <input
                  type="number"
                  min="15"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm focus:bg-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Height</label>
              {unit === 'metric' ? (
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm"
                />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    placeholder="Feet"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
                  />
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    placeholder="Inches"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
                  />
                </div>
              )}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Weight</label>
              {unit === 'metric' ? (
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm"
                />
              ) : (
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm"
                />
              )}
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Daily Physical Activity</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-xs focus:bg-white focus:outline-none"
              >
                <option value="sedentary">Sedentary (Little or no workout / desk job)</option>
                <option value="light">Light Activity (Exercise 1–3 days/week)</option>
                <option value="moderate">Moderate Activity (Exercise 3–5 days/week)</option>
                <option value="active">Active (Heavy exercise 6–7 days/week)</option>
                <option value="very_active">Very Active (Physical job + intense daily training)</option>
              </select>
            </div>

            {/* Fitness Goal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Primary Fitness Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as GoalType)}
                className="w-full px-3 py-2.5 bg-teal-50 border border-teal-200 rounded-xl text-teal-950 font-bold text-xs focus:bg-white focus:outline-none"
              >
                <option value="lose_fast">Fast Fat Loss (-750 kcal/day ~0.75 kg/wk)</option>
                <option value="lose_gradual">Gradual Fat Loss (-350 kcal/day ~0.35 kg/wk)</option>
                <option value="maintain">Maintain Current Weight (0 kcal adjustment)</option>
                <option value="gain_gradual">Gradual Lean Bulk (+350 kcal/day)</option>
                <option value="gain_fast">Fast Muscle Gain (+650 kcal/day)</option>
              </select>
            </div>

          </div>

          <button
            onClick={handlePrint}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Calorie & Macro Report
          </button>

        </div>

        {/* Results Card */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Primary Target Calorie Banner */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-100">Recommended Daily Intake</div>
                <div className="text-4xl sm:text-5xl font-black mt-1 tracking-tight">
                  {result.targetCalories.toLocaleString()} <span className="text-lg font-normal text-teal-200">kcal/day</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs text-teal-50 font-medium max-w-xs text-center sm:text-right">
                Designed to achieve <strong className="text-white uppercase">{goal.replace('_', ' ')}</strong> safely while preserving metabolic rate.
              </div>
            </div>

            {/* BMR & TDEE Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-xs font-bold uppercase text-slate-400">BMR (Basal Metabolic Rate)</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{result.bmr.toLocaleString()} <span className="text-xs text-slate-500 font-normal">kcal</span></div>
                <p className="text-[11px] text-slate-500 mt-1">Calories burned at complete rest to keep organs functioning.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-xs font-bold uppercase text-slate-400">TDEE (Total Daily Energy Expenditure)</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{result.tdee.toLocaleString()} <span className="text-xs text-slate-500 font-normal">kcal</span></div>
                <p className="text-[11px] text-slate-500 mt-1">Total daily burn including physical movement & exercise.</p>
              </div>

            </div>

            {/* Macronutrient Split */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Apple className="w-4 h-4 text-emerald-600" />
                  Target Daily Macronutrients
                </span>
                <span className="text-xs text-slate-400 font-normal">(40% Carb / 30% Protein / 30% Fat)</span>
              </h3>

              <div className="grid grid-cols-3 gap-3 text-center">
                
                {/* Protein */}
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3">
                  <div className="text-xs font-bold text-sky-800 uppercase">Protein</div>
                  <div className="text-xl font-black text-sky-950 mt-1">{result.proteinGrams}g</div>
                  <div className="text-[10px] text-sky-600 font-medium">~{result.proteinGrams * 4} kcal</div>
                </div>

                {/* Carbohydrates */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <div className="text-xs font-bold text-amber-800 uppercase">Carbs</div>
                  <div className="text-xl font-black text-amber-950 mt-1">{result.carbGrams}g</div>
                  <div className="text-[10px] text-amber-600 font-medium">~{result.carbGrams * 4} kcal</div>
                </div>

                {/* Healthy Fats */}
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
                  <div className="text-xs font-bold text-teal-800 uppercase">Fats</div>
                  <div className="text-xl font-black text-teal-950 mt-1">{result.fatGrams}g</div>
                  <div className="text-[10px] text-teal-600 font-medium">~{result.fatGrams * 9} kcal</div>
                </div>

              </div>
            </div>

            {/* Hydration bonus note */}
            <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-4 flex items-center gap-3 text-xs text-sky-900">
              <CheckCircle className="w-5 h-5 text-sky-600 shrink-0" />
              <span>
                Based on your body weight, aim for at least <strong>{result.waterLiters} Liters</strong> of hydration daily to support metabolic enzymatic reactions.
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

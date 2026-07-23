import React, { useState } from 'react';
import { 
  Calculator, 
  RotateCcw, 
  Printer, 
  Sparkles, 
  Info, 
  CheckCircle, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { UnitSystem, BMIResult, PageType } from '../../types';
import { calculateBMI, kgToLbs, lbsToKg, cmToFeetInches, feetInchesToCm } from '../../utils/healthCalculators';

interface BMICalculatorProps {
  onNavigate?: (page: PageType) => void;
}

export const BMICalculator: React.FC<BMICalculatorProps> = ({ onNavigate }) => {
  const [unit, setUnit] = useState<UnitSystem>('metric');
  
  // Metric Inputs
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);

  // Imperial Inputs
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);

  // Demographics
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Handle unit change
  const handleUnitToggle = (newUnit: UnitSystem) => {
    if (newUnit === 'imperial') {
      const lbs = kgToLbs(weightKg);
      const { feet, inches } = cmToFeetInches(heightCm);
      setWeightLbs(lbs);
      setHeightFeet(feet);
      setHeightInches(inches);
    } else {
      const kg = lbsToKg(weightLbs);
      const cm = feetInchesToCm(heightFeet, heightInches);
      setWeightKg(kg);
      setHeightCm(cm);
    }
    setUnit(newUnit);
  };

  // Compute final values in metric
  const finalWeightKg = unit === 'metric' ? weightKg : lbsToKg(weightLbs);
  const finalHeightCm = unit === 'metric' ? heightCm : feetInchesToCm(heightFeet, heightInches);

  const result: BMIResult = calculateBMI(finalWeightKg, finalHeightCm, unit);

  // Print handle
  const handlePrint = () => {
    window.print();
  };

  // Reset
  const handleReset = () => {
    setWeightKg(70);
    setHeightCm(175);
    setWeightLbs(154);
    setHeightFeet(5);
    setHeightInches(9);
    setAge(30);
  };

  // Gauge needle position percentage (for BMI between 15 and 40)
  const needlePercent = Math.min(100, Math.max(0, ((result.bmi - 15) / 25) * 100));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-teal-800 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <Calculator className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>WHO & Clinical Standard Formula</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">BMI Calculator</h1>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            Calculate your Body Mass Index (BMI), identify healthy weight parameters, and discover tailored clinical advice based on World Health Organization guidelines.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Controls Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-600" />
              Your Measurements
            </h2>
            
            {/* Unit System Switcher */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => handleUnitToggle('metric')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  unit === 'metric' ? 'bg-white text-sky-700 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Metric (kg/cm)
              </button>
              <button
                onClick={() => handleUnitToggle('imperial')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  unit === 'imperial' ? 'bg-white text-sky-700 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Imperial (lbs/in)
              </button>
            </div>
          </div>

          {/* Form Controls */}
          <div className="space-y-5">
            
            {/* Gender & Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      gender === 'male' ? 'bg-sky-50 border-sky-300 text-sky-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2 text-xs font-bold rounded-xl border transition ${
                      gender === 'female' ? 'bg-sky-50 border-sky-300 text-sky-800' : 'bg-slate-50 border-slate-200 text-slate-600'
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
                  min="10"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-sm focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Height Controls */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Height {unit === 'metric' ? '(cm)' : '(ft & in)'}
              </label>

              {unit === 'metric' ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    min="50"
                    max="250"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-base focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Feet</span>
                    <input
                      type="number"
                      min="3"
                      max="8"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Inches</span>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Weight Controls */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>

              {unit === 'metric' ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    min="20"
                    max="300"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-base focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="30"
                    max="180"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="number"
                    min="50"
                    max="600"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-base focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="70"
                    max="350"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>
              )}
            </div>

          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ml-auto"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Report
            </button>
          </div>

        </div>

        {/* BMI Results & Visual Gauge Card */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Calculated Score</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-5xl font-black text-slate-900 tracking-tight">{result.bmi}</span>
                  <span className="text-sm font-semibold text-slate-500">kg/m²</span>
                </div>
              </div>

              {/* Category Pill */}
              <div 
                className="px-4 py-2 rounded-2xl font-bold text-sm shadow-xs flex items-center gap-2"
                style={{ backgroundColor: `${result.color}15`, color: result.color }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: result.color }}></span>
                {result.category}
              </div>
            </div>

            {/* Visual Gauge Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span>BMI Spectrum</span>
                <span>Normal: 18.5 – 24.9</span>
              </div>

              {/* Multi-gradient Bar */}
              <div className="relative h-4 rounded-full overflow-hidden bg-slate-100 flex">
                <div className="w-[14%] bg-sky-400" title="Underweight (<18.5)"></div>
                <div className="w-[26%] bg-emerald-500" title="Normal (18.5-24.9)"></div>
                <div className="w-[20%] bg-amber-400" title="Overweight (25-29.9)"></div>
                <div className="w-[20%] bg-orange-500" title="Obese Class 1 (30-34.9)"></div>
                <div className="w-[20%] bg-rose-600" title="Severe Obese (35+)"></div>

                {/* Needle Indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-slate-900 shadow-md transition-all duration-300"
                  style={{ left: `${needlePercent}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 rounded-xs"></div>
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                <span>15</span>
                <span>18.5</span>
                <span>25.0</span>
                <span>30.0</span>
                <span>35.0</span>
                <span>40+</span>
              </div>
            </div>

            {/* Healthy Weight Target Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Healthy Weight Range</div>
                <div className="text-base font-bold text-slate-800 mt-1">
                  {unit === 'metric' 
                    ? `${result.minHealthyWeight} – ${result.maxHealthyWeight} kg`
                    : `${kgToLbs(result.minHealthyWeight)} – ${kgToLbs(result.maxHealthyWeight)} lbs`}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Ponderal Index</div>
                <div className="text-base font-bold text-slate-800 mt-1">{result.ponderalIndex} kg/m³</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">BMI Prime</div>
                <div className="text-base font-bold text-slate-800 mt-1">{result.bmiPrime}</div>
              </div>

            </div>

            {/* Clinical Guidance Recommendations */}
            <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-teal-950 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                Clinical Health & Lifestyle Action Plan
              </h3>
              <ul className="space-y-2 text-xs text-teal-900">
                {result.advice.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shortcut to Weight Tracker */}
            {onNavigate && (
              <div className="pt-2 flex items-center justify-between bg-sky-50 p-4 rounded-xl border border-sky-100">
                <div className="text-xs text-sky-900">
                  <strong>Track your weight progress over time:</strong> Use our interactive graph logger.
                </div>
                <button
                  onClick={() => onNavigate('weighttracker')}
                  className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition"
                >
                  <span>Weight Tracker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

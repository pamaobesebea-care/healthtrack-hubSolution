import React, { useState } from 'react';
import { 
  Scale, 
  Printer, 
  CheckCircle, 
  Sparkles, 
  Info,
  TrendingUp
} from 'lucide-react';
import { UnitSystem } from '../../types';
import { calculateIdealWeight, cmToFeetInches, feetInchesToCm, kgToLbs } from '../../utils/healthCalculators';

export const IdealWeightCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<UnitSystem>('metric');

  const [heightCm, setHeightCm] = useState<number>(175);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);

  const handleUnitToggle = (newUnit: UnitSystem) => {
    if (newUnit === 'imperial') {
      const { feet, inches } = cmToFeetInches(heightCm);
      setHeightFeet(feet);
      setHeightInches(inches);
    } else {
      setHeightCm(feetInchesToCm(heightFeet, heightInches));
    }
    setUnit(newUnit);
  };

  const finalHeightCm = unit === 'metric' ? heightCm : feetInchesToCm(heightFeet, heightInches);

  const result = calculateIdealWeight(finalHeightCm, gender);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 via-sky-800 to-teal-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <Scale className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Devine, Robinson, Miller & Hamwi Clinical Formulas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ideal Weight Calculator</h1>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            Compare four renowned clinical medical equations to determine your optimal healthy weight range based on height and biological frame.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-600" />
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
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Height</label>
              {unit === 'metric' ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-base"
                  />
                  <input
                    type="range"
                    min="130"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>
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
          </div>

          <button
            onClick={() => window.print()}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Ideal Weight Summary
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Average Ideal Weight */}
            <div className="bg-gradient-to-br from-teal-600 to-sky-700 text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-100">Clinical Average Target</div>
                <div className="text-4xl sm:text-5xl font-black mt-1 tracking-tight">
                  {unit === 'metric' ? `${result.average} kg` : `${kgToLbs(result.average)} lbs`}
                </div>
                <div className="text-xs text-teal-100 mt-1">Mean of Devine, Robinson, Miller & Hamwi</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl text-right">
                <div className="text-xs text-teal-200 uppercase font-semibold">BMI Healthy Range</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {unit === 'metric'
                    ? `${result.bmiBasedRange.min} – ${result.bmiBasedRange.max} kg`
                    : `${kgToLbs(result.bmiBasedRange.min)} – ${kgToLbs(result.bmiBasedRange.max)} lbs`}
                </div>
              </div>
            </div>

            {/* Formula Breakdown Table */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Clinical Formula Comparison</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-teal-800 uppercase">Devine Formula (1974)</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {unit === 'metric' ? `${result.devine} kg` : `${kgToLbs(result.devine)} lbs`}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Widely used for clinical medication dosing.</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-teal-800 uppercase">Robinson Formula (1983)</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {unit === 'metric' ? `${result.robinson} kg` : `${kgToLbs(result.robinson)} lbs`}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Modification based on Metropolitan Life data.</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-teal-800 uppercase">Miller Formula (1983)</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {unit === 'metric' ? `${result.miller} kg` : `${kgToLbs(result.miller)} lbs`}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Refined equation for shorter stature ranges.</div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-teal-800 uppercase">Hamwi Formula (1964)</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {unit === 'metric' ? `${result.hamwi} kg` : `${kgToLbs(result.hamwi)} lbs`}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Classic diabetes & nutritional benchmark.</div>
                </div>

              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-xs text-teal-900 space-y-1">
              <div className="font-bold text-teal-950 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-teal-600" /> Note on Body Frame Variance
              </div>
              <p>
                Ideal body weight formulas provide an estimated target. Individuals with large bone structures or high muscle mass can naturally sit above these targets without health risks.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

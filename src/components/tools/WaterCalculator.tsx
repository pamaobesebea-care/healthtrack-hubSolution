import React, { useState } from 'react';
import { 
  Droplet, 
  Sun, 
  Dumbbell, 
  CheckCircle, 
  RotateCcw, 
  Printer, 
  Clock,
  Check
} from 'lucide-react';
import { calculateWater } from '../../utils/healthCalculators';

export const WaterCalculator: React.FC = () => {
  const [weightKg, setWeightKg] = useState<number>(70);
  const [exerciseMinutes, setExerciseMinutes] = useState<number>(30);
  const [climate, setClimate] = useState<'temperate' | 'hot' | 'humid'>('temperate');

  // Interactive Glass Tracker state for the day
  const [drunkGlasses, setDrunkGlasses] = useState<number>(2);

  const result = calculateWater(weightKg, exerciseMinutes, climate);

  const toggleGlass = (index: number) => {
    if (drunkGlasses === index + 1) {
      setDrunkGlasses(index);
    } else {
      setDrunkGlasses(index + 1);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-800 via-sky-700 to-teal-700 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <Droplet className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-sky-200">
            <Droplet className="w-3.5 h-3.5 text-sky-300" />
            <span>Hydration & Renal Balance Standard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Water Intake Calculator</h1>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            Calculate your personalized daily fluid intake requirement based on body weight, workout intensity, and ambient climate conditions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Droplet className="w-5 h-5 text-sky-600" />
            Hydration Parameters
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Body Weight (kg)
              </label>
              <input
                type="number"
                min="30"
                max="250"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-base focus:bg-white focus:outline-none focus:border-sky-500"
              />
              <input
                type="range"
                min="40"
                max="150"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full mt-2 accent-sky-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Dumbbell className="w-4 h-4 text-slate-500" />
                Daily Exercise (Minutes)
              </label>
              <input
                type="number"
                min="0"
                max="300"
                value={exerciseMinutes}
                onChange={(e) => setExerciseMinutes(Number(e.target.value))}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sun className="w-4 h-4 text-amber-500" />
                Environment Climate
              </label>
              <select
                value={climate}
                onChange={(e) => setClimate(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold text-xs"
              >
                <option value="temperate">Temperate / Air Conditioned (Standard)</option>
                <option value="hot">Hot Weather (+15% Fluid Needs)</option>
                <option value="humid">Hot & Humid (+20% Fluid Needs)</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Hydration Plan
          </button>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Target Card */}
            <div className="bg-gradient-to-br from-sky-500 to-sky-700 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-sky-100">Daily Water Target</div>
                <div className="text-4xl sm:text-5xl font-black mt-1 tracking-tight">
                  {result.dailyLiters} <span className="text-lg font-normal text-sky-200">Liters</span>
                </div>
                <div className="text-xs text-sky-200 mt-1">({result.dailyOunces} fl oz / ~{result.glassesCount} glasses)</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl text-center">
                <div className="text-2xl font-bold">{drunkGlasses} / {result.glassesCount}</div>
                <div className="text-[11px] text-sky-200 font-medium uppercase">Glasses Today</div>
              </div>
            </div>

            {/* Glass Visual Logger */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-sm">Interactive Glass Log (250ml / 8oz)</h3>
                <button
                  onClick={() => setDrunkGlasses(0)}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {Array.from({ length: result.glassesCount }).map((_, idx) => {
                  const isDrunk = idx < drunkGlasses;
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleGlass(idx)}
                      className={`h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                        isDrunk 
                          ? 'bg-sky-500 border-sky-600 text-white shadow-md scale-105' 
                          : 'bg-slate-50 border-slate-200 text-slate-300 hover:border-sky-300 hover:text-sky-400'
                      }`}
                    >
                      <Droplet className={`w-5 h-5 ${isDrunk ? 'fill-white' : ''}`} />
                      <span className="text-[10px] font-mono mt-1">{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hourly Schedule */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-600" />
                Suggested Hourly Hydration Routine
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {result.hourlySchedule.map((slot, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                    <div className="font-semibold text-slate-900">{slot.time}</div>
                    <div className="text-[11px] text-sky-700 font-bold mt-0.5">{slot.targetMl} ml ({slot.targetOz} oz)</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Tips */}
            <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-4 space-y-2 text-xs text-sky-900">
              <div className="font-bold text-sky-950 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-sky-600" />
                Hydration Best Practices
              </div>
              <ul className="space-y-1 list-disc list-inside">
                {result.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

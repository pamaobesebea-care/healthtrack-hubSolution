import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Plus, 
  Trash2, 
  Star, 
  Clock, 
  CheckCircle, 
  Sparkles,
  Award
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { SleepLogEntry } from '../../types';
import { getSleepLogs, saveSleepLog, deleteSleepLog } from '../../utils/storage';

export const SleepTracker: React.FC = () => {
  const [logs, setLogs] = useState<SleepLogEntry[]>([]);

  // Form State
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bedtime, setBedtime] = useState<string>('22:30');
  const [wakeTime, setWakeTime] = useState<string>('06:30');
  const [qualityScore, setQualityScore] = useState<number>(4);
  const [selectedFactors, setSelectedFactors] = useState<string[]>(['Exercised']);
  const [notes, setNotes] = useState<string>('');

  const factorOptions = [
    'Exercised',
    'Caffeine',
    'Screen Time',
    'Alcohol',
    'Stress',
    'Late Meal',
    'Warm Bath',
    'Meditation'
  ];

  useEffect(() => {
    setLogs(getSleepLogs());
  }, []);

  // Calculate sleep duration from bedtime to wake time
  const calculateHours = (start: string, end: string): number => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    let startMins = startH * 60 + startM;
    let endMins = endH * 60 + endM;
    if (endMins <= startMins) endMins += 24 * 60; // next day
    return Math.round(((endMins - startMins) / 60) * 10) / 10;
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const durationHours = calculateHours(bedtime, wakeTime);

    const updated = saveSleepLog({
      date,
      bedtime,
      wakeTime,
      durationHours,
      qualityScore,
      factors: selectedFactors,
      notes: notes || undefined
    });

    setLogs(updated);
    setNotes('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this sleep log?')) {
      const updated = deleteSleepLog(id);
      setLogs(updated);
    }
  };

  const toggleFactor = (f: string) => {
    if (selectedFactors.includes(f)) {
      setSelectedFactors(selectedFactors.filter(item => item !== f));
    } else {
      setSelectedFactors([...selectedFactors, f]);
    }
  };

  // Stats calculation
  const totalHours = logs.reduce((acc, curr) => acc + curr.durationHours, 0);
  const avgHours = logs.length > 0 ? Math.round((totalHours / logs.length) * 10) / 10 : 0;
  const avgQuality = logs.length > 0 ? Math.round((logs.reduce((acc, curr) => acc + curr.qualityScore, 0) / logs.length) * 10) / 10 : 0;
  
  // Sleep Debt relative to 8 hour target over logs length
  const targetTotal = logs.length * 8;
  const sleepDebt = Math.round((targetTotal - totalHours) * 10) / 10;

  const chartData = [...logs].reverse().map(l => ({
    date: l.date.slice(5),
    duration: l.durationHours,
    quality: l.qualityScore
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <Moon className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-sky-200">
            <Moon className="w-3.5 h-3.5 text-sky-300" />
            <span>Circadian Rhythm & Sleep Quality Tracker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sleep Tracker</h1>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            Monitor bedtime routines, calculate total hours slept, evaluate sleep debt, and log key factors influencing your rest quality.
          </p>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Sleep Duration</div>
          <div className="text-3xl font-black text-sky-900 mt-1">
            {avgHours} <span className="text-sm font-semibold text-slate-500">hours / night</span>
          </div>
          <div className="text-xs text-sky-600 font-medium mt-1">
            {avgHours >= 7 ? '✓ Within recommended 7–9h window' : '⚠️ Below optimal range'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Quality Rating</div>
          <div className="text-3xl font-black text-amber-500 mt-1 flex items-center gap-1">
            <span>{avgQuality}</span>
            <span className="text-sm text-slate-400">/ 5</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400 ml-1" />
          </div>
          <div className="text-xs text-slate-500 mt-1">Subjective Recovery Score</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cumulative Sleep Debt</div>
          <div className={`text-3xl font-black mt-1 ${sleepDebt <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {sleepDebt <= 0 ? '0 hrs' : `${sleepDebt} hrs`}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {sleepDebt <= 0 ? 'Fully restored sleep balance!' : 'Deficit relative to 8h/night target'}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recharts Bar Chart & Log List */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Moon className="w-5 h-5 text-sky-600" />
              Sleep Duration History
            </h2>
            <span className="text-xs text-slate-400 font-medium">8 Hours Target</span>
          </div>

          <div className="h-64 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                  <YAxis domain={[0, 12]} stroke="#94a3b8" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any) => [`${val} hours`, 'Duration']}
                  />
                  <Bar dataKey="duration" fill="#0284c7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                No sleep entries logged yet.
              </div>
            )}
          </div>

          {/* Table */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Sleep Journal Entries</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-100">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Times</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Quality</th>
                    <th className="p-3">Factors</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-semibold text-slate-900">{log.date}</td>
                      <td className="p-3 text-slate-500">{log.bedtime} – {log.wakeTime}</td>
                      <td className="p-3 font-bold text-sky-800">{log.durationHours} hrs</td>
                      <td className="p-3 text-amber-500 font-bold flex items-center gap-1">
                        {log.qualityScore} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      </td>
                      <td className="p-3 text-slate-500">
                        <div className="flex flex-wrap gap-1">
                          {log.factors.map(f => (
                            <span key={f} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px]">
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Add Sleep Form */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Plus className="w-5 h-5 text-sky-600" />
            Log Night's Rest
          </h2>

          <form onSubmit={handleAddLog} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-sky-600" /> Bedtime
                </label>
                <input
                  type="time"
                  required
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> Wake Time
                </label>
                <input
                  type="time"
                  required
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Sleep Quality (1 to 5 Stars)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setQualityScore(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star className={`w-6 h-6 ${star <= qualityScore ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Influencing Lifestyle Factors
              </label>
              <div className="flex flex-wrap gap-1.5">
                {factorOptions.map(f => {
                  const active = selectedFactors.includes(f);
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggleFactor(f)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                        active ? 'bg-sky-600 border-sky-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Notes</label>
              <textarea
                rows={2}
                placeholder="Uninterrupted sleep, vivid dreams..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Save Sleep Journal Entry
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

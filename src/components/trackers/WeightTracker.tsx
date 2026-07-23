import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Target, 
  Calendar, 
  Scale, 
  TrendingDown, 
  CheckCircle, 
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { WeightLogEntry } from '../../types';
import { 
  getWeightLogs, 
  saveWeightLog, 
  deleteWeightLog, 
  exportAllUserData, 
  importUserData 
} from '../../utils/storage';
import { kgToLbs, lbsToKg } from '../../utils/healthCalculators';

export const WeightTracker: React.FC = () => {
  const [logs, setLogs] = useState<WeightLogEntry[]>([]);
  const [targetWeight, setTargetWeight] = useState<number>(72); // kg
  
  // New Log Form State
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [inputWeight, setInputWeight] = useState<number>(75);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [inputFat, setInputFat] = useState<string>('');
  const [inputNotes, setInputNotes] = useState<string>('');

  useEffect(() => {
    setLogs(getWeightLogs());
  }, []);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputWeight || inputWeight <= 0) return;

    const weightKg = unit === 'kg' ? inputWeight : lbsToKg(inputWeight);
    const weightLbs = unit === 'lbs' ? inputWeight : kgToLbs(inputWeight);

    const updated = saveWeightLog({
      date: inputDate,
      weightKg,
      weightLbs,
      bodyFatPercentage: inputFat ? Number(inputFat) : undefined,
      notes: inputNotes || undefined
    });

    setLogs(updated);
    setInputNotes('');
    setInputFat('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this weight log entry?')) {
      const updated = deleteWeightLog(id);
      setLogs(updated);
    }
  };

  // Prepare data for Recharts (sorted ascending by date)
  const chartData = [...logs].reverse().map(item => ({
    date: item.date.slice(5), // MM-DD
    fullDate: item.date,
    weight: unit === 'kg' ? item.weightKg : item.weightLbs,
    notes: item.notes
  }));

  const latestWeight = logs.length > 0 ? (unit === 'kg' ? logs[0].weightKg : logs[0].weightLbs) : 0;
  const initialWeight = logs.length > 0 ? (unit === 'kg' ? logs[logs.length - 1].weightKg : logs[logs.length - 1].weightLbs) : 0;
  const targetConverted = unit === 'kg' ? targetWeight : kgToLbs(targetWeight);

  const weightChange = Math.round((latestWeight - initialWeight) * 10) / 10;
  const distanceToTarget = Math.round(Math.abs(latestWeight - targetConverted) * 10) / 10;

  // Export JSON
  const handleExportData = () => {
    const jsonStr = exportAllUserData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthTrack_Hub_Data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Import JSON
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importUserData(content)) {
        alert('Weight & health logs imported successfully!');
        setLogs(getWeightLogs());
      } else {
        alert('Failed to parse file. Please select a valid HealthTrack Hub JSON export.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Tracker Header */}
      <div className="bg-gradient-to-r from-teal-900 via-sky-800 to-sky-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <Scale className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-teal-200">
            <Activity className="w-3.5 h-3.5 text-teal-300" />
            <span>Private Local Storage Persistence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Weight Tracker</h1>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            Log date-stamped weight entries, define target weight goals, monitor long-term trends via interactive charts, and export your data safely anytime.
          </p>
        </div>
      </div>

      {/* Target & Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Weight</div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {latestWeight} <span className="text-sm font-semibold text-slate-500">{unit}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Latest Logged Entry</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Weight Goal</div>
          <div className="text-3xl font-black text-teal-700 mt-1 flex items-center justify-between">
            <span>{targetConverted} <span className="text-sm font-semibold text-teal-600">{unit}</span></span>
            <Target className="w-5 h-5 text-teal-500 shrink-0" />
          </div>
          <div className="text-xs text-teal-600 font-medium mt-1">
            {distanceToTarget === 0 ? '🎉 Goal Reached!' : `${distanceToTarget} ${unit} to target`}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Weight Change</div>
          <div className={`text-3xl font-black mt-1 ${weightChange <= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {weightChange > 0 ? `+${weightChange}` : weightChange} <span className="text-sm font-semibold text-slate-500">{unit}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Since First Logged Entry</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data Controls</div>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleExportData}
              className="flex-1 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition border border-sky-200"
              title="Export all health data to JSON file"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <label className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer border border-slate-200">
              <Upload className="w-3.5 h-3.5" />
              Import
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>
          </div>
        </div>

      </div>

      {/* Main Grid: Chart & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recharts Progress Graph */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              Weight Trend Progress Chart
            </h2>

            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => setUnit('kg')}
                className={`px-3 py-1 rounded-lg transition ${unit === 'kg' ? 'bg-white text-teal-700 shadow-xs font-bold' : 'text-slate-500'}`}
              >
                kg
              </button>
              <button
                onClick={() => setUnit('lbs')}
                className={`px-3 py-1 rounded-lg transition ${unit === 'lbs' ? 'bg-white text-teal-700 shadow-xs font-bold' : 'text-slate-500'}`}
              >
                lbs
              </button>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                  <YAxis domain={['auto', 'auto']} stroke="#94a3b8" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#ffffff', fontSize: '12px' }}
                    itemStyle={{ color: '#2dd4bf' }}
                    formatter={(value: any) => [`${value} ${unit}`, 'Weight']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#0d9488" 
                    strokeWidth={3} 
                    dot={{ fill: '#0d9488', r: 5 }}
                    activeDot={{ r: 8, fill: '#0284c7' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                No logs recorded yet. Add your first log entry on the right!
              </div>
            )}
          </div>

          {/* History Table */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Weight Log History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-100">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Weight</th>
                    <th className="p-3">Body Fat</th>
                    <th className="p-3">Notes</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-semibold text-slate-900">{log.date}</td>
                      <td className="p-3 font-bold text-teal-800">
                        {unit === 'kg' ? `${log.weightKg} kg` : `${log.weightLbs} lbs`}
                      </td>
                      <td className="p-3 text-slate-500">
                        {log.bodyFatPercentage ? `${log.bodyFatPercentage}%` : '-'}
                      </td>
                      <td className="p-3 text-slate-500 max-w-xs truncate">
                        {log.notes || '-'}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                          title="Delete entry"
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

        {/* Add Log Form */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Plus className="w-5 h-5 text-teal-600" />
            Add New Weight Log
          </h2>

          <form onSubmit={handleAddLog} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="date"
                required
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm text-slate-800 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Weight ({unit})
              </label>
              <input
                type="number"
                step="0.1"
                required
                min="20"
                max="500"
                value={inputWeight}
                onChange={(e) => setInputWeight(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-lg text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Body Fat % <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 18.5"
                value={inputFat}
                onChange={(e) => setInputFat(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Notes / Context
              </label>
              <textarea
                rows={2}
                placeholder="e.g., Morning weigh-in, post workout..."
                value={inputNotes}
                onChange={(e) => setInputNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Save Weight Entry
            </button>
          </form>

          {/* Goal adjustment */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Set Target Weight Goal (kg)
            </label>
            <input
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
            />
          </div>
        </div>

      </div>

    </div>
  );
};

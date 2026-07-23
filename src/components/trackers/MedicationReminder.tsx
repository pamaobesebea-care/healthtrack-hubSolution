import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  Plus, 
  Check, 
  X, 
  Clock, 
  Bell, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Volume2
} from 'lucide-react';
import { Medication, MedicationLogEntry } from '../../types';
import { 
  getMedications, 
  saveMedication, 
  deleteMedication, 
  toggleMedicationActive, 
  getMedLogs, 
  recordMedIntake 
} from '../../utils/storage';

export const MedicationReminder: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [logs, setLogs] = useState<MedicationLogEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('1');
  const [unit, setUnit] = useState('tablet');
  const [time1, setTime1] = useState('08:00');
  const [time2, setTime2] = useState('20:00');
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [instructions, setInstructions] = useState('Take with meals & water');

  useEffect(() => {
    setMedications(getMedications());
    setLogs(getMedLogs());
  }, []);

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const scheduledTimes = timesPerDay === 1 ? [time1] : [time1, time2];

    const updated = saveMedication({
      name,
      dosage,
      unit,
      timesPerDay,
      scheduledTimes,
      instructions,
      active: true
    });

    setMedications(updated);
    setName('');
    setShowAddModal(false);
  };

  const handleDeleteMed = (id: string) => {
    if (confirm('Delete this medication from schedule?')) {
      const updated = deleteMedication(id);
      setMedications(updated);
    }
  };

  const handleToggleActive = (id: string) => {
    const updated = toggleMedicationActive(id);
    setMedications(updated);
  };

  // Mark dosage taken for today
  const handleMarkIntake = (med: Medication, scheduledTime: string, status: 'taken' | 'skipped') => {
    const updatedLogs = recordMedIntake(med.id, med.name, scheduledTime, status);
    setLogs(updatedLogs);
  };

  // Check if a specific scheduled dose was logged today
  const today = new Date().toISOString().split('T')[0];

  const isDoseLoggedToday = (medId: string, scheduledTime: string) => {
    return logs.find(l => l.medicationId === medId && l.scheduledTime === scheduledTime && l.date === today);
  };

  // Test sound alert
  const playAlertSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.log('Audio test error:', e);
    }
  };

  const takenCountToday = logs.filter(l => l.date === today && l.status === 'taken').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-sky-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <Pill className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-emerald-200">
            <Bell className="w-3.5 h-3.5 text-emerald-300" />
            <span>Prescription Safety & Adherence System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Medication Reminder</h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Organize prescriptions, set daily dose alarm schedules, log completed intake, and maintain strict medication safety adherence.
          </p>
        </div>
      </div>

      {/* Top Bar with Add Button & Audio Test */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-base">Today's Adherence: {takenCountToday} Doses Logged</div>
            <div className="text-xs text-slate-500">
              Keep your medication concentration steady by taking doses at scheduled hours.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={playAlertSound}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            title="Test reminder chime sound"
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            Test Reminder Chime
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Medication
          </button>
        </div>
      </div>

      {/* Main Grid: Daily Pill Checklist & Active Medications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Today's Pill Schedule Checklist */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Clock className="w-5 h-5 text-emerald-600" />
            Today's Scheduled Doses ({today})
          </h2>

          <div className="space-y-3">
            {medications.filter(m => m.active).map(med => (
              <div key={med.id} className="border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-emerald-200 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{med.name}</div>
                      <div className="text-xs text-slate-500">{med.dosage} {med.unit} • {med.instructions}</div>
                    </div>
                  </div>
                </div>

                {/* Scheduled Times */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {med.scheduledTimes.map(st => {
                    const logged = isDoseLoggedToday(med.id, st);
                    return (
                      <div 
                        key={st}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs transition ${
                          logged?.status === 'taken' 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                            : logged?.status === 'skipped'
                            ? 'bg-slate-100 border-slate-300 text-slate-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <div>
                            <div className="font-bold">{st} Dose</div>
                            {logged && (
                              <div className="text-[10px] text-emerald-700">
                                {logged.status === 'taken' ? `✓ Taken at ${logged.takenAt}` : 'Skipped'}
                              </div>
                            )}
                          </div>
                        </div>

                        {!logged ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleMarkIntake(med, st, 'taken')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1 transition"
                            >
                              <Check className="w-3.5 h-3.5" /> Taken
                            </button>
                            <button
                              onClick={() => handleMarkIntake(med, st, 'skipped')}
                              className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition"
                            >
                              Skip
                            </button>
                          </div>
                        ) : (
                          <span className="font-bold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-white border border-emerald-200">
                            Logged
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {medications.filter(m => m.active).length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Pill className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1" />
                <p className="font-medium">No active medications scheduled.</p>
                <p className="text-xs mt-1">Click "Add Medication" above to create your schedule.</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Medication List */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-teal-600" />
              Active Medication List
            </span>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
              {medications.length} Saved
            </span>
          </h2>

          <div className="space-y-3">
            {medications.map(m => (
              <div key={m.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{m.name}</div>
                  <div className="text-slate-500">{m.dosage} {m.unit} • {m.timesPerDay}x daily</div>
                  <div className="text-slate-400 font-mono text-[11px]">{m.scheduledTimes.join(', ')}</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleActive(m.id)}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      m.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {m.active ? 'Active' : 'Paused'}
                  </button>
                  <button
                    onClick={() => handleDeleteMed(m.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Pill className="w-5 h-5 text-emerald-600" />
                Add Medication Schedule
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Medication Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Lisinopril, Metformin, Multivitamin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Dosage Amount</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 or 500"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                  >
                    <option value="mg">mg</option>
                    <option value="tablet">tablet</option>
                    <option value="capsule">capsule</option>
                    <option value="ml">ml</option>
                    <option value="drops">drops</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Frequency</label>
                <select
                  value={timesPerDay}
                  onChange={(e) => setTimesPerDay(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                >
                  <option value={1}>Once Daily</option>
                  <option value={2}>Twice Daily</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Dose Time 1</label>
                  <input
                    type="time"
                    value={time1}
                    onChange={(e) => setTime1(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                  />
                </div>

                {timesPerDay === 2 && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Dose Time 2</label>
                    <input
                      type="time"
                      value={time2}
                      onChange={(e) => setTime2(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Special Instructions</label>
                <input
                  type="text"
                  placeholder="Take with food, full glass of water..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

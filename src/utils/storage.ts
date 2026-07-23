import { WeightLogEntry, SleepLogEntry, Medication, MedicationLogEntry } from '../types';

const STORAGE_KEYS = {
  WEIGHT_LOGS: 'healthtrack_weight_logs',
  SLEEP_LOGS: 'healthtrack_sleep_logs',
  MEDICATIONS: 'healthtrack_medications',
  MED_LOGS: 'healthtrack_med_logs',
  USER_PROFILE: 'healthtrack_user_profile',
  AD_PREVIEW: 'healthtrack_ad_preview'
};

// Initial default weight logs for demonstration
const INITIAL_WEIGHT_LOGS: WeightLogEntry[] = [
  { id: 'w1', date: '2026-07-15', weightKg: 78.5, weightLbs: 173.1, notes: 'Morning weight after 8h sleep' },
  { id: 'w2', date: '2026-07-17', weightKg: 78.1, weightLbs: 172.2, notes: 'Post workout weigh-in' },
  { id: 'w3', date: '2026-07-19', weightKg: 77.8, weightLbs: 171.5, notes: 'Maintained caloric target' },
  { id: 'w4', date: '2026-07-21', weightKg: 77.4, weightLbs: 170.6, notes: 'Hydrated & felt energized' },
  { id: 'w5', date: '2026-07-22', weightKg: 77.0, weightLbs: 169.8, notes: 'Goal milestone reached!' }
];

// Initial default sleep logs
const INITIAL_SLEEP_LOGS: SleepLogEntry[] = [
  { id: 's1', date: '2026-07-18', bedtime: '22:30', wakeTime: '06:30', durationHours: 8.0, qualityScore: 5, factors: ['Exercised', 'No Screen Time'], notes: 'Restful uninterrupted sleep' },
  { id: 's2', date: '2026-07-19', bedtime: '23:15', wakeTime: '06:45', durationHours: 7.5, qualityScore: 4, factors: ['Exercised'], notes: 'Woke up briefly at 3 AM' },
  { id: 's3', date: '2026-07-20', bedtime: '23:45', wakeTime: '06:15', durationHours: 6.5, qualityScore: 3, factors: ['Caffeine', 'Screen Time'], notes: 'Late night caffeine affected falling asleep' },
  { id: 's4', date: '2026-07-21', bedtime: '22:15', wakeTime: '06:45', durationHours: 8.5, qualityScore: 5, factors: ['Exercised', 'Meditation'], notes: 'Felt extremely refreshed' },
  { id: 's5', date: '2026-07-22', bedtime: '22:45', wakeTime: '06:45', durationHours: 8.0, qualityScore: 4, factors: ['Warm Bath'], notes: 'Solid restful slumber' }
];

// Initial default medications
const INITIAL_MEDICATIONS: Medication[] = [
  { id: 'm1', name: 'Multivitamin Complex', dosage: '1', unit: 'tablet', timesPerDay: 1, scheduledTimes: ['08:00'], instructions: 'Take with morning breakfast & water', active: true },
  { id: 'm2', name: 'Omega-3 Fish Oil', dosage: '1000', unit: 'mg', timesPerDay: 2, scheduledTimes: ['08:00', '20:00'], instructions: 'Take with food to increase absorption', active: true },
  { id: 'm3', name: 'Vitamin D3', dosage: '2000', unit: 'IU', timesPerDay: 1, scheduledTimes: ['12:00'], instructions: 'Take with lunch', active: true }
];

// Helper to safely load from local storage
export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

// Helper to safely set item
export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
}

// Weight Logs
export function getWeightLogs(): WeightLogEntry[] {
  return getItem<WeightLogEntry[]>(STORAGE_KEYS.WEIGHT_LOGS, INITIAL_WEIGHT_LOGS);
}

export function saveWeightLog(entry: Omit<WeightLogEntry, 'id'>): WeightLogEntry[] {
  const current = getWeightLogs();
  const newEntry: WeightLogEntry = {
    ...entry,
    id: 'w_' + Date.now()
  };
  const updated = [newEntry, ...current].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  setItem(STORAGE_KEYS.WEIGHT_LOGS, updated);
  return updated;
}

export function deleteWeightLog(id: string): WeightLogEntry[] {
  const updated = getWeightLogs().filter(item => item.id !== id);
  setItem(STORAGE_KEYS.WEIGHT_LOGS, updated);
  return updated;
}

// Sleep Logs
export function getSleepLogs(): SleepLogEntry[] {
  return getItem<SleepLogEntry[]>(STORAGE_KEYS.SLEEP_LOGS, INITIAL_SLEEP_LOGS);
}

export function saveSleepLog(entry: Omit<SleepLogEntry, 'id'>): SleepLogEntry[] {
  const current = getSleepLogs();
  const newEntry: SleepLogEntry = {
    ...entry,
    id: 's_' + Date.now()
  };
  const updated = [newEntry, ...current].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  setItem(STORAGE_KEYS.SLEEP_LOGS, updated);
  return updated;
}

export function deleteSleepLog(id: string): SleepLogEntry[] {
  const updated = getSleepLogs().filter(item => item.id !== id);
  setItem(STORAGE_KEYS.SLEEP_LOGS, updated);
  return updated;
}

// Medications
export function getMedications(): Medication[] {
  return getItem<Medication[]>(STORAGE_KEYS.MEDICATIONS, INITIAL_MEDICATIONS);
}

export function saveMedication(med: Omit<Medication, 'id'>): Medication[] {
  const current = getMedications();
  const newMed: Medication = {
    ...med,
    id: 'm_' + Date.now()
  };
  const updated = [...current, newMed];
  setItem(STORAGE_KEYS.MEDICATIONS, updated);
  return updated;
}

export function deleteMedication(id: string): Medication[] {
  const updated = getMedications().filter(m => m.id !== id);
  setItem(STORAGE_KEYS.MEDICATIONS, updated);
  return updated;
}

export function toggleMedicationActive(id: string): Medication[] {
  const updated = getMedications().map(m => m.id === id ? { ...m, active: !m.active } : m);
  setItem(STORAGE_KEYS.MEDICATIONS, updated);
  return updated;
}

// Medication Intake Logs
export function getMedLogs(): MedicationLogEntry[] {
  return getItem<MedicationLogEntry[]>(STORAGE_KEYS.MED_LOGS, []);
}

export function recordMedIntake(medicationId: string, medicationName: string, scheduledTime: string, status: 'taken' | 'skipped' | 'late'): MedicationLogEntry[] {
  const today = new Date().toISOString().split('T')[0];
  const current = getMedLogs();
  const newLog: MedicationLogEntry = {
    id: 'ml_' + Date.now(),
    medicationId,
    medicationName,
    scheduledTime,
    takenAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: today,
    status
  };
  const updated = [newLog, ...current];
  setItem(STORAGE_KEYS.MED_LOGS, updated);
  return updated;
}

// Ad Preview preference
export function getAdPreviewEnabled(): boolean {
  return getItem<boolean>(STORAGE_KEYS.AD_PREVIEW, true);
}

export function setAdPreviewEnabled(enabled: boolean): void {
  setItem(STORAGE_KEYS.AD_PREVIEW, enabled);
}

// Export All Data as JSON
export function exportAllUserData(): string {
  const data = {
    exportDate: new Date().toISOString(),
    weightLogs: getWeightLogs(),
    sleepLogs: getSleepLogs(),
    medications: getMedications(),
    medicationLogs: getMedLogs()
  };
  return JSON.stringify(data, null, 2);
}

// Import All Data
export function importUserData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.weightLogs) setItem(STORAGE_KEYS.WEIGHT_LOGS, data.weightLogs);
    if (data.sleepLogs) setItem(STORAGE_KEYS.SLEEP_LOGS, data.sleepLogs);
    if (data.medications) setItem(STORAGE_KEYS.MEDICATIONS, data.medications);
    if (data.medicationLogs) setItem(STORAGE_KEYS.MED_LOGS, data.medicationLogs);
    return true;
  } catch (e) {
    console.error('Failed to import data', e);
    return false;
  }
}

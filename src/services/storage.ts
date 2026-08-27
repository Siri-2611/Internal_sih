import { TranslationRecord, FeedbackReport, OfflineStatus } from '../types';
import { INITIAL_DATASET } from '../data/dataset';

const STORAGE_KEYS = {
  DATASET: 'palash_dataset_v1',
  FEEDBACK: 'palash_feedback_reports_v1',
  OFFLINE_SIMULATED: 'palash_offline_simulated',
  LAST_SYNC: 'palash_last_sync_timestamp',
  BENCHMARKS: 'palash_benchmark_logs'
};

export class StorageService {
  public static getDataset(): TranslationRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DATASET);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error reading dataset, falling back to initial:', e);
    }
    // initialize
    this.saveDataset(INITIAL_DATASET);
    return INITIAL_DATASET;
  }

  public static saveDataset(records: TranslationRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DATASET, JSON.stringify(records));
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, Date.now().toString());
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }

  public static updateRecord(record: TranslationRecord): void {
    const records = this.getDataset();
    const idx = records.findIndex(r => r.id === record.id);
    if (idx >= 0) {
      records[idx] = record;
    } else {
      records.push(record);
    }
    this.saveDataset(records);
  }

  public static getFeedbackReports(): FeedbackReport[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage feedback read error:', e);
    }
    return [
      {
        id: "FB-001",
        record_id: "FLN-SAN-001",
        hindi_text: "बच्चों, इन वस्तुओं को गिनो।",
        santhali_text: "Babumay ko, nowa jinis ko lekhaye pe.",
        reason: "Wrong dialect",
        suggested_correction: "Santhal Pargana variant: 'Gidra ko, nowa jinis ko lekha pe'",
        teacher_notes: "Very natural for southern dialect, acceptable alternative noted.",
        timestamp: Date.now() - 86400000 * 2,
        status: "reviewed"
      }
    ];
  }

  public static saveFeedbackReport(report: Omit<FeedbackReport, 'id' | 'timestamp' | 'status'>): FeedbackReport {
    const reports = this.getFeedbackReports();
    const newReport: FeedbackReport = {
      ...report,
      id: `FB-${Date.now().toString().slice(-5)}`,
      timestamp: Date.now(),
      status: 'pending'
    };
    reports.unshift(newReport);
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(reports));
    } catch (e) {
      console.error('Failed to save feedback report:', e);
    }
    return newReport;
  }

  public static isOfflineSimulated(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.OFFLINE_SIMULATED) === 'true';
    } catch (e) {
      return false;
    }
  }

  public static setOfflineSimulated(val: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_SIMULATED, val ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to set offline simulation:', e);
    }
  }

  public static getOfflineStatus(): OfflineStatus {
    const isOfflineSimulated = this.isOfflineSimulated();
    const isBrowserOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const dataset = this.getDataset();
    const lastSync = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || `${Date.now()}`, 10);

    return {
      isOfflineModeSimulated: isOfflineSimulated,
      isBrowserOnline: !isOfflineSimulated && isBrowserOnline,
      recordsCachedCount: dataset.length,
      lessonsCachedCount: 4,
      flashcardsCachedCount: 24,
      lastSyncTimestamp: lastSync,
      localDatabaseHealthy: true
    };
  }
}

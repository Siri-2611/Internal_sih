import { TranslationRecord, TranslationResponse } from '../types';
import { StorageService } from './storage';

export class AIPipelineService {
  /**
   * Normalize Hindi text: clean extra spaces, punctuation, standard full stop (।).
   */
  public static normalizeHindi(text: string): string {
    if (!text) return '';
    return text
      .trim()
      .replace(/[।.,!?।]/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  /**
   * Detect intent based on keywords and grammatical patterns.
   */
  public static detectIntent(normalized: string): string {
    if (normalized.includes('गिन') || normalized.includes('कितन') || normalized.includes('वस्तु')) {
      return 'COUNT_OBJECTS';
    }
    if (normalized.includes('बैठ')) {
      return normalized.includes('सब') ? 'SIT_DOWN_ALL' : 'SIT_DOWN';
    }
    if (normalized.includes('खड़े') || normalized.includes('खड़ा')) {
      return 'STAND_UP';
    }
    if (normalized.includes('सुन') || normalized.includes('ध्यान')) {
      return 'LISTEN_CAREFULLY';
    }
    if (normalized.includes('किताब') || normalized.includes('पुस्तक') || normalized.includes('खोल')) {
      return 'OPEN_BOOK';
    }
    if (normalized.includes('बोर्ड') || normalized.includes('श्यामपट्ट')) {
      return 'LOOK_AT_BOARD';
    }
    if (normalized.includes('चित्र') || normalized.includes('तस्वीर')) {
      return 'LOOK_AT_PICTURE';
    }
    if (normalized.includes('संख्या') || normalized.includes('लिख')) {
      return 'WRITE_NUMBER';
    }
    if (normalized.includes('शब्द') || normalized.includes('पढ़')) {
      return 'READ_WORD';
    }
    if (normalized.includes('उत्तर')) {
      return 'SHOW_ANSWER';
    }
    if (normalized.includes('हाथ') && normalized.includes('उठा')) {
      return 'RAISE_HAND';
    }
    if (normalized.includes('अच्छा') || normalized.includes('शाबाश') || normalized.includes('बढ़िया')) {
      return 'PRAISE_GOOD';
    }
    if (normalized.includes('कोशिश') || normalized.includes('दोबारा') || normalized.includes('फिर')) {
      return 'TRY_AGAIN';
    }
    if (normalized.includes('नमस्ते') || normalized.includes('जोहार') || normalized.includes('प्रणाम')) {
      return 'GREETING';
    }
    if (normalized.includes('बड़ा') || normalized.includes('बड़ा है')) {
      return 'WHICH_IS_BIGGER';
    }
    if (normalized.includes('छोटा') || normalized.includes('छोटा है')) {
      return 'WHICH_IS_SMALLER';
    }
    if (normalized.includes('पानी') || normalized.includes('पियो')) {
      return 'DRINK_WATER';
    }
    if (normalized.includes('हाथ') && (normalized.includes('धो') || normalized.includes('साफ'))) {
      return 'WASH_HANDS';
    }
    if (normalized.includes('खेल') || normalized.includes('खेलो')) {
      return 'LETS_PLAY';
    }
    if (normalized.includes('ताली')) {
      return 'CLAP_HANDS';
    }
    if (normalized.includes('चुप') || normalized.includes('शांत')) {
      return 'BE_QUIET';
    }
    if (normalized.includes('जोड़') || normalized.includes('मिला')) {
      return 'ADD_NUMBERS';
    }
    if (normalized.includes('घटा') || normalized.includes('निकाल')) {
      return 'SUBTRACT_NUMBERS';
    }
    if (normalized.includes('स्लेट')) {
      return 'WRITE_ON_SLATE';
    }
    if (normalized.includes('लाइन') || normalized.includes('कतार')) {
      return 'MAKE_LINE';
    }
    return 'GENERAL_CLASSROOM';
  }

  /**
   * Execute Hybrid Pipeline:
   * 1. Normalize
   * 2. Intent Detection
   * 3. Exact match in local dataset
   * 4. Semantic / token similarity in local dataset
   * 5. Fallback or AI generation indicator
   */
  public static async translate(hindiText: string): Promise<TranslationResponse> {
    const startTime = performance.now();
    const normalized = this.normalizeHindi(hindiText);
    const intent = this.detectIntent(normalized);
    const dataset = StorageService.getDataset();

    // 1. Check for exact normalized match
    const exactMatch = dataset.find(r => this.normalizeHindi(r.hindi) === normalized);
    if (exactMatch) {
      const elapsed = Math.round(performance.now() - startTime);
      return {
        query_hindi: hindiText,
        record: exactMatch,
        santhali: exactMatch.santhali,
        santhali_script: exactMatch.santhali_script,
        santhali_phonetic: exactMatch.santhali_phonetic,
        verified: exactMatch.verified,
        confidence: exactMatch.confidence,
        source: exactMatch.source,
        notes: exactMatch.notes,
        intent: exactMatch.intent,
        match_type: 'exact_dataset',
        latency: {
          stt_ms: 0,
          translation_ms: elapsed,
          tts_ms: 0,
          total_ms: elapsed
        }
      };
    }

    // 2. Intent-based retrieval
    if (intent !== 'GENERAL_CLASSROOM') {
      const intentMatch = dataset.find(r => r.intent === intent);
      if (intentMatch) {
        const elapsed = Math.round(performance.now() - startTime);
        return {
          query_hindi: hindiText,
          record: intentMatch,
          santhali: intentMatch.santhali,
          santhali_script: intentMatch.santhali_script,
          santhali_phonetic: intentMatch.santhali_phonetic,
          verified: intentMatch.verified,
          confidence: 'high',
          source: intentMatch.source,
          notes: `Matched via classroom intent [${intent}]: ${intentMatch.notes}`,
          intent: intentMatch.intent,
          match_type: 'intent_retrieval',
          latency: {
            stt_ms: 0,
            translation_ms: elapsed,
            tts_ms: 0,
            total_ms: elapsed
          }
        };
      }
    }

    // 3. Token similarity / substring search
    const queryTokens = normalized.split(' ').filter(t => t.length > 1);
    let bestScore = 0;
    let bestRecord: TranslationRecord | null = null;

    for (const record of dataset) {
      const recTokens = this.normalizeHindi(record.hindi).split(' ').filter(t => t.length > 1);
      let matchCount = 0;
      for (const qt of queryTokens) {
        if (recTokens.some(rt => rt.includes(qt) || qt.includes(rt))) {
          matchCount++;
        }
      }
      const score = matchCount / Math.max(queryTokens.length, recTokens.length, 1);
      if (score > bestScore) {
        bestScore = score;
        bestRecord = record;
      }
    }

    if (bestRecord && bestScore >= 0.4) {
      const elapsed = Math.round(performance.now() - startTime);
      return {
        query_hindi: hindiText,
        record: bestRecord,
        santhali: bestRecord.santhali,
        santhali_script: bestRecord.santhali_script,
        santhali_phonetic: bestRecord.santhali_phonetic,
        verified: true,
        confidence: bestScore > 0.7 ? 'high' : 'medium',
        source: bestRecord.source,
        notes: `Semantic match (${Math.round(bestScore * 100)}% similarity) from verified FLN corpus.`,
        intent: bestRecord.intent,
        match_type: 'semantic_search',
        latency: {
          stt_ms: 0,
          translation_ms: elapsed,
          tts_ms: 0,
          total_ms: elapsed
        }
      };
    }

    // 4. If offline mode or no internet available, do not hallucinate
    const offlineStatus = StorageService.getOfflineStatus();
    if (offlineStatus.isOfflineModeSimulated || !offlineStatus.isBrowserOnline) {
      const elapsed = Math.round(performance.now() - startTime);
      return {
        query_hindi: hindiText,
        santhali: "No validated translation available in offline database.",
        santhali_script: "ᱵᱟᱝ ᱧᱟᱢ ᱞᱮᱱᱟ",
        santhali_phonetic: "बंग ञाम लेना (उपलब्ध नहीं)",
        verified: false,
        confidence: "low",
        source: "Offline Dataset Search",
        notes: "No verified record in local storage. BhashaMitra does not hallucinate tribal translations.",
        intent: "UNKNOWN",
        match_type: 'not_found',
        latency: {
          stt_ms: 0,
          translation_ms: elapsed,
          tts_ms: 0,
          total_ms: elapsed
        }
      };
    }

    // 5. Try server-side translation with explicit validation warning
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hindi: hindiText })
      });
      if (response.ok) {
        const data = await response.json();
        const elapsed = Math.round(performance.now() - startTime);
        return {
          ...data,
          latency: {
            stt_ms: 0,
            translation_ms: elapsed,
            tts_ms: 0,
            total_ms: elapsed
          }
        };
      }
    } catch (e) {
      console.warn('Backend translation failed or offline:', e);
    }

    const elapsed = Math.round(performance.now() - startTime);
    return {
      query_hindi: hindiText,
      santhali: "No validated translation available.",
      santhali_script: "ᱵᱟᱝ ᱧᱟᱢ ᱞᱮᱱᱟ",
      santhali_phonetic: "बंग ञाम लेना",
      verified: false,
      confidence: "low",
      source: "AI Verification System",
      notes: "Translation should be validated by a native Santhali speaker before classroom use.",
      intent: intent,
      match_type: 'not_found',
      latency: {
        stt_ms: 0,
        translation_ms: elapsed,
        tts_ms: 0,
        total_ms: elapsed
      }
    };
  }
}

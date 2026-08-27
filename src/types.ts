export type LanguageCode = 'santhali' | 'ho' | 'mundari';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  scriptNative: string;
  status: 'active' | 'coming_soon';
  dialect: string;
  region: string;
}

export interface LatencyMetrics {
  stt_ms: number;
  translation_ms: number;
  tts_ms: number;
  total_ms: number;
}

export interface TranslationRecord {
  id: string;
  hindi: string;
  santhali: string;
  santhali_script: string;
  santhali_phonetic: string;
  category: string;
  subcategory?: string;
  class: string;
  subject: string;
  topic?: string;
  learning_outcome?: string;
  example_usage?: string;
  source: string;
  verified: boolean;
  confidence: 'high' | 'medium' | 'low';
  notes: string;
  intent?: string;
  sentence_type?: string;
  audio_available?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  nipun_outcome_id?: string;
}

export interface TranslationResponse {
  query_hindi: string;
  record?: TranslationRecord;
  santhali: string;
  santhali_script: string;
  santhali_phonetic: string;
  verified: boolean;
  confidence: 'high' | 'medium' | 'low';
  source: string;
  notes: string;
  intent: string;
  match_type: 'exact_dataset' | 'intent_retrieval' | 'semantic_search' | 'ai_generated' | 'not_found';
  latency: {
    stt_ms: number;
    translation_ms: number;
    tts_ms: number;
    total_ms: number;
  };
}

export interface FLNLesson {
  id: string;
  title: string;
  subject: 'Mathematics' | 'Language';
  topic: string;
  class: string;
  icon: string;
  learning_outcome: string;
  nipun_outcome_id: string;
  teacher_script_hindi: string;
  santhali_translation: string;
  santhali_script: string;
  santhali_phonetic: string;
  activity_type: 'counting' | 'matching' | 'phonics' | 'shapes_colors' | 'comparison';
  activity: {
    title: string;
    prompt_hindi: string;
    prompt_santhali: string;
    items_visual: string[];
    question_hindi: string;
    question_santhali: string;
    options: { id: string; label_hindi: string; label_santhali: string; isCorrect: boolean }[];
    explanation_hindi: string;
    explanation_santhali: string;
  };
  practice_exercises: {
    id: string;
    hindi: string;
    santhali: string;
    santhali_script: string;
    visual?: string;
  }[];
  assessment: {
    question_hindi: string;
    question_santhali: string;
    options: { id: string; text_hindi: string; text_santhali: string; isCorrect: boolean }[];
    hint: string;
  };
}

export interface WorksheetQuestion {
  id: string;
  number: number;
  type: 'counting' | 'matching' | 'circle_correct' | 'fill_in_num' | 'shape_color';
  visual_emojis: string[];
  question_hindi: string;
  question_santhali: string;
  question_olchiki: string;
  options?: string[];
  answer_blank_type: 'line' | 'box' | 'multiple_choice';
  correct_answer: string;
}

export interface WorksheetData {
  title: string;
  class: string;
  subject: string;
  topic: string;
  date: string;
  school_name_placeholder: string;
  teacher_name_placeholder: string;
  student_name_placeholder: string;
  instructions_bilingual: {
    hindi: string;
    santhali: string;
    olchiki: string;
  };
  questions: WorksheetQuestion[];
  nipun_fln_tag: string;
}

export interface FlashcardItem {
  id: string;
  category: 'Numbers' | 'Animals' | 'Colors' | 'Shapes' | 'School Objects' | 'Everyday Objects';
  hindi: string;
  santhali: string;
  santhali_script: string;
  santhali_phonetic: string;
  icon_or_emoji: string;
  color_theme: string;
  example_sentence_hindi?: string;
  example_sentence_santhali?: string;
}

export interface AssessmentQuestion {
  id: string;
  category: string;
  type: 'counting' | 'mcq' | 'shapes' | 'colors' | 'comparison';
  question_hindi: string;
  question_santhali: string;
  santhali_script: string;
  visual_items?: string[];
  options: {
    id: string;
    text_hindi: string;
    text_santhali: string;
    text_olchiki?: string;
    visual?: string;
    isCorrect: boolean;
  }[];
  explanation_hindi: string;
  explanation_santhali: string;
}

export interface FeedbackReport {
  id: string;
  record_id?: string;
  hindi_text: string;
  santhali_text: string;
  reason: 'Incorrect' | 'Unnatural' | 'Wrong dialect' | 'Wrong meaning' | 'Audio pronunciation issue' | 'Other';
  suggested_correction?: string;
  teacher_notes?: string;
  timestamp: number;
  status: 'pending' | 'reviewed' | 'resolved' | 'approved' | 'rejected';
}

export interface OfflineStatus {
  isOfflineModeSimulated: boolean;
  isBrowserOnline: boolean;
  recordsCachedCount: number;
  lessonsCachedCount: number;
  flashcardsCachedCount: number;
  lastSyncTimestamp: number;
  localDatabaseHealthy: boolean;
}

export interface BenchmarkMeasurement {
  id: string;
  phrase_hindi: string;
  stt_ms: number;
  retrieval_ms: number;
  tts_ms: number;
  total_ms: number;
  match_type: string;
  confidence: string;
  verified: boolean;
  timestamp: number;
}

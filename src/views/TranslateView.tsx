import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MessageSquare,
  Sparkles,
  Volume2,
  Flag,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  Send,
  HelpCircle,
  RefreshCw,
  Share2,
  Mic,
  Square
} from 'lucide-react';
import { AIPipelineService } from '../services/aiPipeline';
import { SpeechService } from '../services/speech';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { ReportFeedbackModal } from '../components/ReportFeedbackModal';
import { TranslationResponse } from '../types';
import { StorageService } from '../services/storage';

export const TranslateView: React.FC = () => {
  const [inputText, setInputText] = useState('बच्चों, इन वस्तुओं को गिनो।');
  const [result, setResult] = useState<TranslationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [recentQueries, setRecentQueries] = useState<string[]>([
    "बच्चों, इन वस्तुओं को गिनो।",
    "सब लोग बैठ जाओ।",
    "अपनी किताब खोलो।",
    "बहुत अच्छा!",
    "संख्या लिखो।"
  ]);

  const cleanupSessionRef = useRef<(() => void) | null>(null);
  const inputTextRef = useRef(inputText);

  useEffect(() => {
    inputTextRef.current = inputText;
  }, [inputText]);

  useEffect(() => {
    return () => {
      if (cleanupSessionRef.current) {
        cleanupSessionRef.current();
      }
    };
  }, []);

  const handleToggleMic = () => {
    if (isListening) {
      SpeechService.stopActiveRecognition();
      setIsListening(false);
      const textToTranslate = inputTextRef.current.trim();
      if (textToTranslate) {
        handleTranslate(textToTranslate);
      }
    } else {
      setIsListening(true);
      const stopFn = SpeechService.startSpeechSession({
        onInterim: (liveText) => {
          setInputText(liveText);
        },
        onFinal: (res) => {
          setIsListening(false);
          setInputText(res.transcript);
          cleanupSessionRef.current = null;
          handleTranslate(res.transcript);
        },
        onError: (err) => {
          setIsListening(false);
          cleanupSessionRef.current = null;
          console.warn('Speech error:', err);
        },
        onEnd: () => {
          setIsListening(false);
          cleanupSessionRef.current = null;
        }
      });
      cleanupSessionRef.current = stopFn;
    }
  };

  const quickSamples = [
    { label: "Count Objects", hindi: "बच्चों, इन वस्तुओं को गिनो।" },
    { label: "Sit Down All", hindi: "सब लोग बैठ जाओ।" },
    { label: "Open Book", hindi: "अपनी किताब खोलो।" },
    { label: "Listen Carefully", hindi: "ध्यान से सुनो।" },
    { label: "Write Number", hindi: "संख्या लिखो।" },
    { label: "Praise Child", hindi: "बहुत अच्छा!" },
    { label: "Which is Bigger?", hindi: "कौन बड़ा है?" },
    { label: "Wash Hands", hindi: "हाथ धो लो।" }
  ];

  const handleTranslate = async (textToTranslate?: string) => {
    const text = (textToTranslate || inputText).trim();
    if (!text) return;

    setIsLoading(true);
    try {
      const response = await AIPipelineService.translate(text);
      setResult(response);

      if (!recentQueries.includes(text)) {
        setRecentQueries([text, ...recentQueries.slice(0, 4)]);
      }
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Perform initial translation on mount
  React.useEffect(() => {
    handleTranslate('बच्चों, इन वस्तुओं को गिनो।');
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F27D26]/10 text-[#F27D26] text-xs font-bold mb-2 border border-[#F27D26]/20">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>FLN Multilingual Bridge</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436]">
          Hindi to Santhali Classroom Translation
        </h1>
        <p className="text-[#747D8C] text-sm mt-1">
          Type or select classroom instructions to receive verified Ol Chiki script, Romanization, and audio.
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E0E2D9] space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#747D8C]">
          Teacher Hindi Instruction
        </label>

        <div className="relative">
          <textarea
            id="translate-hindi-input"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type Hindi classroom instruction here (e.g., बच्चों, इन वस्तुओं को गिनो)..."
            className="w-full p-4 rounded-2xl bg-[#FDFCF8] border border-[#E0E2D9] focus:ring-2 focus:ring-[#F27D26] focus:border-[#F27D26] text-[#2D3436] text-base md:text-lg font-medium resize-none transition-all placeholder:text-[#747D8C]/60"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleTranslate();
              }
            }}
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button
              id="translate-mic-btn"
              type="button"
              onClick={handleToggleMic}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 inline-flex items-center gap-1.5 cursor-pointer ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse shadow-md ring-2 ring-rose-400'
                  : 'bg-[#FDFCF8] hover:bg-stone-100 text-[#2D3436] border border-[#E0E2D9]'
              }`}
              title={isListening ? "Click to Stop (बोलना समाप्त करें)" : "Click to Speak Hindi"}
            >
              {isListening ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stop Speaking</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-[#F27D26]" />
                  <span>Speak</span>
                </>
              )}
            </button>

            <button
              id="translate-submit-btn"
              type="button"
              onClick={() => handleTranslate()}
              disabled={isLoading || !inputText.trim()}
              className="px-5 py-2.5 bg-[#F27D26] hover:bg-[#E06C17] disabled:opacity-50 text-white font-bold rounded-xl shadow-xs transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer text-sm"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Translating...' : 'Translate'}</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div className="space-y-1.5 pt-2">
          <span className="text-xs font-bold text-[#747D8C] block">Class 1 Rapid Classroom Prompts:</span>
          <div className="flex flex-wrap gap-2">
            {quickSamples.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(s.hindi);
                  handleTranslate(s.hindi);
                }}
                className="px-3 py-1.5 bg-[#FDFCF8] hover:bg-stone-100 text-[#2D3436] border border-[#E0E2D9] rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Translation Result Card */}
      {result && (
        <div
          id="translation-result-card"
          className="bg-white rounded-3xl shadow-xs border border-[#E0E2D9] overflow-hidden space-y-0"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 bg-[#FDFCF8] border-b border-[#E0E2D9] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#747D8C] uppercase tracking-wider">
                Intent:
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-[#F27D26]/10 text-[#F27D26] font-mono text-xs font-bold border border-[#F27D26]/20">
                {result.intent || 'GENERAL_CLASSROOM'}
              </span>
              <span className="text-[#E0E2D9] text-xs">•</span>
              <span className="text-xs text-[#747D8C] font-medium">
                Method: <span className="font-semibold text-[#2D3436]">{result.match_type}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {result.verified ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified FLN Curriculum
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  AI-generated — requires validation
                </span>
              )}

              <button
                type="button"
                onClick={() => setFeedbackOpen(true)}
                className="p-1.5 text-[#747D8C] hover:text-[#2D3436] rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                title="Report issue with this translation"
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Ol Chiki Display */}
            <div className="p-6 bg-[#2D3436] text-white rounded-2xl space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-bold text-[#F27D26] uppercase tracking-wider">
                <span>Ol Chiki Script (Santali / ᱚᱞ ᱪᱤᱠᱤ)</span>
                <span className="text-[11px] text-stone-400 font-mono">Unicode Standard</span>
              </div>

              <div
                id="ol-chiki-output-text"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide leading-relaxed py-2 select-all"
              >
                {result.santhali_script}
              </div>
            </div>

            {/* Romanized and Phonetic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#E0E2D9] space-y-1">
                <span className="text-xs font-bold text-[#747D8C] uppercase tracking-wider block">
                  Romanized Santhali
                </span>
                <p className="text-lg font-bold text-[#2D3436] select-all">
                  {result.santhali}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#E0E2D9] space-y-1">
                <span className="text-xs font-bold text-[#747D8C] uppercase tracking-wider block">
                  Devanagari Pronunciation Guide (फ्रोनेटिक)
                </span>
                <p className="text-lg font-bold text-[#F27D26] select-all">
                  {result.santhali_phonetic || result.santhali}
                </p>
              </div>
            </div>

            {/* Pedagogical Notes / Outcome Link */}
            <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#E0E2D9] text-xs text-[#2D3436] space-y-1">
              <div className="font-bold text-[#2D3436] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#F27D26]" />
                <span>Classroom Context &amp; Pedagogical Usage:</span>
              </div>
              <p className="leading-relaxed text-[#747D8C]">
                {result.notes || "Standard imperative instruction for primary grade tribal learners."}
              </p>
              {result.source && (
                <div className="text-[11px] text-[#747D8C] pt-1">
                  Source: <span className="font-semibold text-[#2D3436]">{result.source}</span>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E0E2D9]">
              <div className="flex items-center gap-3">
                <AudioPlayerButton
                  textToSpeak={result.santhali_phonetic || result.santhali}
                  phoneticText={result.santhali_phonetic}
                  size="lg"
                  label="Play Santhali Audio"
                  id="play-translation-audio-btn"
                />

                <span className="text-xs text-[#747D8C] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#747D8C]" />
                  Latency: <span className="font-mono font-bold text-[#2D3436]">{result.latency?.translation_ms || 4}ms</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setFeedbackOpen(true)}
                className="text-xs font-semibold text-[#747D8C] hover:text-[#2D3436] inline-flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-stone-100 cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5" />
                Report Dialect Variation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {result && (
        <ReportFeedbackModal
          isOpen={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
          hindiText={result.query_hindi}
          santhaliText={result.santhali}
          recordId={result.record?.id}
        />
      )}
    </div>
  );
};

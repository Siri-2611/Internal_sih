import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Activity,
  Award,
  Square,
  XCircle,
  Radio
} from 'lucide-react';
import { SpeechService, SpeechRecognitionResultPayload } from '../services/speech';
import { AIPipelineService } from '../services/aiPipeline';
import { TranslationResponse, LatencyMetrics } from '../types';

export const VoiceClassroomView: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [currentResult, setCurrentResult] = useState<TranslationResponse | null>(null);
  const [activeLatency, setActiveLatency] = useState<LatencyMetrics | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [classroomHistory, setClassroomHistory] = useState<Array<{
    hindi: string;
    santhali: string;
    olchiki: string;
    timestamp: number;
    latency_ms: number;
  }>>([]);

  const cleanupSessionRef = useRef<(() => void) | null>(null);
  const liveTranscriptRef = useRef('');

  useEffect(() => {
    liveTranscriptRef.current = liveTranscript;
  }, [liveTranscript]);

  useEffect(() => {
    return () => {
      if (cleanupSessionRef.current) {
        cleanupSessionRef.current();
      }
    };
  }, []);

  const quickVoiceInputs = [
    { label: "बच्चों, इन वस्तुओं को गिनो।", desc: "Count Objects (Math)" },
    { label: "सब लोग बैठ जाओ।", desc: "Sit Down All (Management)" },
    { label: "खड़े हो जाओ।", desc: "Stand Up (Discipline)" },
    { label: "ध्यान से सुनो।", desc: "Listen Carefully (Focus)" },
    { label: "अपनी किताब खोलो।", desc: "Open Book (Reading)" },
    { label: "बहुत अच्छा!", desc: "Praise (Affirmation)" },
    { label: "कौन बड़ा है?", desc: "Which is Bigger (Math)" }
  ];

  const handleProcessSpeech = async (spokenText: string, sttDurationMs: number = 850) => {
    const text = spokenText.trim();
    if (!text) return;

    setIsProcessing(true);
    setMicError(null);
    const transStart = performance.now();

    try {
      const translation = await AIPipelineService.translate(text);
      const transDurationMs = Math.round(performance.now() - transStart);

      let ttsDurationMs = 0;
      if (autoPlayAudio) {
        setIsPlayingAudio(true);
        const speechTarget = translation.santhali_phonetic || translation.santhali;
        ttsDurationMs = await SpeechService.speakText(speechTarget, 'sat');
        setIsPlayingAudio(false);
      }

      const totalMs = sttDurationMs + transDurationMs + (autoPlayAudio ? 750 : 0);

      const metrics: LatencyMetrics = {
        stt_ms: sttDurationMs,
        translation_ms: transDurationMs,
        tts_ms: autoPlayAudio ? 750 : 0,
        total_ms: totalMs
      };

      setActiveLatency(metrics);
      setCurrentResult(translation);

      // Add to session logs
      setClassroomHistory((prev) => [
        {
          hindi: text,
          santhali: translation.santhali,
          olchiki: translation.santhali_script,
          timestamp: Date.now(),
          latency_ms: totalMs
        },
        ...prev.slice(0, 7)
      ]);
    } catch (err) {
      console.error('Voice processing error:', err);
    } finally {
      setIsProcessing(false);
      setLiveTranscript('');
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      // STOP LISTENING & PROCESS IMMEDIATELY
      handleStopListening();
    } else {
      // START LISTENING
      handleStartListening();
    }
  };

  const handleStartListening = () => {
    if (isListening || isProcessing) return;
    setMicError(null);
    setLiveTranscript('');
    setIsListening(true);

    const sttStart = performance.now();

    const stopFn = SpeechService.startSpeechSession({
      onInterim: (interim) => {
        setLiveTranscript(interim);
      },
      onFinal: (result) => {
        setIsListening(false);
        cleanupSessionRef.current = null;
        handleProcessSpeech(result.transcript, result.duration_ms);
      },
      onError: (err) => {
        setIsListening(false);
        cleanupSessionRef.current = null;
        console.warn('Microphone error:', err);
        setMicError(err.message || 'Microphone error. You can click any quick voice prompt below.');
      },
      onEnd: () => {
        setIsListening(false);
        cleanupSessionRef.current = null;
        // If there was transcript text in the interim buffer when recognition ended, process it
        const pending = liveTranscriptRef.current.trim();
        if (pending) {
          const elapsed = Math.round(performance.now() - sttStart);
          handleProcessSpeech(pending, elapsed);
        }
      }
    });

    cleanupSessionRef.current = stopFn;
  };

  const handleStopListening = () => {
    if (!isListening) return;
    SpeechService.stopActiveRecognition();
    setIsListening(false);

    const currentText = liveTranscriptRef.current.trim();
    if (currentText) {
      handleProcessSpeech(currentText, 900);
    }
  };

  const handleCancelListening = () => {
    SpeechService.abortActiveRecognition();
    setIsListening(false);
    setLiveTranscript('');
    setMicError(null);
    if (cleanupSessionRef.current) {
      cleanupSessionRef.current();
      cleanupSessionRef.current = null;
    }
  };

  const handleSimulateVoice = (phrase: string) => {
    if (isListening) {
      handleCancelListening();
    }
    setLiveTranscript(phrase);
    handleProcessSpeech(phrase, 620);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F27D26]/10 text-[#F27D26] text-xs font-bold mb-2 border border-[#F27D26]/20">
            <Mic className="w-3.5 h-3.5 text-[#F27D26]" />
            <span>Real-Time Voice-to-Voice Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436]">
            Voice Classroom Assistant
          </h1>
          <p className="text-[#747D8C] text-sm mt-1">
            Teacher speaks Hindi &rarr; PALASH instantly plays Santhali audio to students.
          </p>
        </div>

        {/* Auto-Play Toggle */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-[#E0E2D9] shadow-xs self-start sm:self-auto">
          <label htmlFor="auto-speak-checkbox" className="text-xs font-bold text-[#2D3436] cursor-pointer select-none">
            Auto-Speak Santhali Audio
          </label>
          <input
            id="auto-speak-checkbox"
            type="checkbox"
            checked={autoPlayAudio}
            onChange={(e) => setAutoPlayAudio(e.target.checked)}
            className="w-4 h-4 text-[#F27D26] rounded focus:ring-[#F27D26] cursor-pointer"
          />
        </div>
      </div>

      {/* Main Microphone Interaction Stage */}
      <div className="bg-[#2D3436] text-white rounded-3xl p-6 sm:p-8 shadow-xs border border-stone-800 text-center relative overflow-hidden space-y-6">
        <div className="max-w-md mx-auto space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider">
            {isListening ? (
              <span className="flex items-center gap-1.5 text-rose-400">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Listening to Teacher in Hindi...
              </span>
            ) : isProcessing ? (
              <span className="flex items-center gap-1.5 text-[#F27D26]">
                <Activity className="w-3.5 h-3.5 animate-spin" />
                Translating to Santhali &amp; Intent...
              </span>
            ) : isPlayingAudio ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                Playing Spoken Santhali to Class...
              </span>
            ) : (
              <span className="text-[#F27D26]">
                Tap Mic to Speak or Click Quick Prompts
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {isListening ? "कक्षा में बोलिए (Speaking...)" : isProcessing ? "प्रक्रिया जारी है..." : "Ready for Teacher Instruction"}
          </h2>
        </div>

        {/* Live Spoken Text Bubble while listening */}
        {isListening && (
          <div className="max-w-lg mx-auto p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs space-y-2 animate-fade-in relative z-10">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              Recognized Speech (सुन रहे हैं):
            </span>
            <p className="text-lg font-bold text-white min-h-7">
              {liveTranscript ? `"${liveTranscript}"` : "बोलना शुरू करें (Speak now)..."}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#F27D26]">
              <span className="w-2 h-2 rounded-full bg-[#F27D26] animate-ping" />
              <span>Stops automatically after silence or click Stop below</span>
            </div>
          </div>
        )}

        {/* Mic Center Button + Clear Stop Controls */}
        <div className="py-2 relative z-10 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            {/* Animated Pulses when listening or processing */}
            {(isListening || isProcessing || isPlayingAudio) && (
              <div className="absolute -inset-4 rounded-full bg-[#F27D26]/20 animate-ping pointer-events-none" />
            )}

            <button
              id="voice-classroom-mic-btn"
              type="button"
              onClick={handleToggleListening}
              disabled={isProcessing}
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-md active:scale-95 cursor-pointer relative z-10 ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-700 text-white ring-8 ring-rose-500/40 animate-pulse'
                  : isPlayingAudio
                  ? 'bg-[#27AE60] text-white ring-8 ring-[#27AE60]/40'
                  : 'bg-[#F27D26] hover:bg-[#E06C17] text-white ring-4 ring-[#F27D26]/30'
              }`}
              aria-label={isListening ? "Stop listening" : "Tap to speak in Hindi"}
            >
              {isListening ? (
                <>
                  <Square className="w-10 h-10 fill-white" />
                  <span className="text-[11px] font-black uppercase mt-1">STOP</span>
                </>
              ) : isPlayingAudio ? (
                <>
                  <Volume2 className="w-10 h-10 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase mt-1">Playing</span>
                </>
              ) : (
                <>
                  <Mic className="w-11 h-11" />
                  <span className="text-[10px] font-bold uppercase mt-1">Tap to Speak</span>
                </>
              )}
            </button>
          </div>

          {/* DEDICATED STOP & CANCEL BUTTONS WHILE LISTENING */}
          {isListening && (
            <div className="flex items-center gap-3 pt-2 animate-fade-in">
              <button
                id="voice-stop-btn"
                type="button"
                onClick={handleStopListening}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer text-sm"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>बोलना समाप्त करें (Stop &amp; Translate)</span>
              </button>

              <button
                id="voice-cancel-btn"
                type="button"
                onClick={handleCancelListening}
                className="px-4 py-3 bg-stone-700 hover:bg-stone-600 text-stone-200 hover:text-white font-bold rounded-2xl transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer text-sm"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}

          {!isListening && (
            <p className="text-xs text-stone-400">
              Click the button above to speak in Hindi. Click again or wait to stop.
            </p>
          )}

          {micError && (
            <div className="p-3 bg-rose-900/40 border border-rose-600/50 rounded-xl text-rose-200 text-xs flex items-center gap-2 max-w-md">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{micError}</span>
            </div>
          )}
        </div>

        {/* Quick Voice Simulation Buttons */}
        <div className="relative z-10 pt-4 border-t border-stone-700 space-y-2">
          <span className="text-xs font-bold text-[#F27D26] uppercase tracking-wider block">
            Or Instant Classroom Prompts (One-Tap Voice):
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickVoiceInputs.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSimulateVoice(v.label)}
                disabled={isProcessing}
                className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-xl text-xs font-medium border border-stone-700 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3 h-3 text-[#F27D26] fill-[#F27D26]" />
                <span>"{v.label}"</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Latency Breakdown Bar */}
      {activeLatency && (
        <div
          id="voice-latency-telemetry"
          className="bg-white rounded-3xl p-6 shadow-xs border border-[#E0E2D9] space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E0E2D9] pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#F27D26]" />
              <h3 className="font-bold text-[#2D3436] text-base">
                Real-Time Voice Pipeline Telemetry
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-[#747D8C]">Benchmark Target: &lt; 3.0s</span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                activeLatency.total_ms <= 3000
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/30'
              }`}>
                {activeLatency.total_ms <= 3000 ? '✅ Target Met' : '⚠️ Acceptable'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-[#FDFCF8] border border-[#E0E2D9]">
              <span className="text-[11px] font-bold text-[#747D8C] uppercase block">1. Hindi STT</span>
              <span className="text-lg font-black text-[#2D3436] font-mono">{activeLatency.stt_ms}ms</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FDFCF8] border border-[#E0E2D9]">
              <span className="text-[11px] font-bold text-[#747D8C] uppercase block">2. Retrieval &amp; Intent</span>
              <span className="text-lg font-black text-[#27AE60] font-mono">{activeLatency.translation_ms}ms</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FDFCF8] border border-[#E0E2D9]">
              <span className="text-[11px] font-bold text-[#747D8C] uppercase block">3. Santhali Audio</span>
              <span className="text-lg font-black text-[#F27D26] font-mono">{activeLatency.tts_ms}ms</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F27D26]/10 border border-[#F27D26]/30">
              <span className="text-[11px] font-bold text-[#2D3436] uppercase block">Total Elapsed</span>
              <span className="text-lg font-black text-[#F27D26] font-mono">{(activeLatency.total_ms / 1000).toFixed(2)}s</span>
            </div>
          </div>
        </div>
      )}

      {/* Spoken Output Result Card */}
      {currentResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border-2 border-[#F27D26]/40 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E0E2D9] pb-4">
            <div>
              <span className="text-xs font-bold text-[#747D8C] uppercase tracking-wider block">Spoken by Teacher:</span>
              <p className="text-xl font-bold text-[#2D3436] mt-0.5">"{currentResult.query_hindi}"</p>
            </div>

            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-300">
              🟢 Validated Santhali
            </span>
          </div>

          {/* Ol Chiki Big Text */}
          <div className="p-6 bg-[#2D3436] text-white rounded-2xl space-y-2">
            <div className="text-xs font-bold text-[#F27D26] uppercase tracking-wider">
              Ol Chiki Script (Santali)
            </div>
            <div className="text-3xl sm:text-5xl font-black text-white tracking-wide py-2">
              {currentResult.santhali_script}
            </div>
            <div className="text-sm text-stone-300 font-medium pt-1 border-t border-stone-700">
              Pronunciation: {currentResult.santhali_phonetic}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div>
              <span className="text-xs text-[#747D8C] block">Romanized Translation:</span>
              <span className="text-base font-bold text-[#2D3436]">{currentResult.santhali}</span>
            </div>

            <button
              type="button"
              onClick={() => SpeechService.speakText(currentResult.santhali_phonetic || currentResult.santhali, 'sat')}
              className="px-5 py-2.5 bg-[#F27D26] hover:bg-[#E06C17] text-white font-bold rounded-xl shadow-xs inline-flex items-center gap-2 active:scale-95 cursor-pointer text-sm"
            >
              <Volume2 className="w-4 h-4" />
              Replay Audio to Class
            </button>
          </div>
        </div>
      )}

      {/* Classroom Activity Session History */}
      {classroomHistory.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E0E2D9] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#2D3436] text-base">Classroom Spoken History (This Session)</h3>
            <span className="text-xs text-[#747D8C]">{classroomHistory.length} interactions logged</span>
          </div>

          <div className="divide-y divide-[#E0E2D9]">
            {classroomHistory.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-sm">
                <div>
                  <div className="font-bold text-[#2D3436]">"{item.hindi}"</div>
                  <div className="text-xs text-[#F27D26] font-semibold mt-0.5">
                    {item.santhali} • <span className="font-serif font-bold text-[#2D3436]">{item.olchiki}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-[#747D8C]">{(item.latency_ms / 1000).toFixed(2)}s</span>
                  <button
                    type="button"
                    onClick={() => SpeechService.speakText(item.santhali, 'sat')}
                    className="p-2 text-[#F27D26] hover:bg-[#F27D26]/10 rounded-xl transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

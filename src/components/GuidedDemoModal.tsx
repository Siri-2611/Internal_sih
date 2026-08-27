import React, { useState } from 'react';
import { X, Play, CheckCircle, ArrowRight, Volume2, Sparkles, WifiOff, FileText, Layers, BookOpen } from 'lucide-react';
import { SpeechService } from '../services/speech';
import { StorageService } from '../services/storage';

interface GuidedDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export const GuidedDemoModal: React.FC<GuidedDemoModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [audioPlaying, setAudioPlaying] = useState(false);

  if (!isOpen) return null;

  const totalSteps = 7;

  const handlePlayDemoAudio = async () => {
    setAudioPlaying(true);
    try {
      await SpeechService.speakText("बाबू-मई को, नोवा जिनिस को लेखाय पे।", 'sat');
    } finally {
      setAudioPlaying(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div
        id="guided-demo-modal"
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#2D3436] text-white flex items-center justify-between border-b border-[#E0E2D9]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#F27D26] text-white">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F27D26]">SIH Hackathon Live Showcase</span>
              <h3 className="font-bold text-lg leading-tight text-white">BhashaMitra • Guided Demo Flow</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#747D8C] hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#E0E2D9] h-1.5 flex">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 transition-all duration-300 ${
                i + 1 <= currentStep ? 'bg-[#F27D26]' : 'bg-[#E0E2D9]'
              }`}
            />
          ))}
        </div>

        {/* Step Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6 bg-white">
          <div className="flex items-center justify-between text-xs font-semibold text-[#F27D26] bg-[#F27D26]/10 px-3 py-1.5 rounded-lg border border-[#F27D26]/30 w-fit">
            Step {currentStep} of {totalSteps}
          </div>

          {/* STEP 1: Teacher Input */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#2D3436]">1. Hindi Teacher Classroom Instruction</h4>
              <p className="text-[#747D8C] text-sm leading-relaxed">
                A Hindi-medium Class 1 teacher wants to instruct Santhali-speaking children to count their classroom materials.
              </p>
              <div className="p-5 bg-[#FDFCF8] rounded-2xl border-2 border-dashed border-[#E0E2D9]">
                <span className="text-xs font-bold text-[#F27D26] uppercase tracking-wide">Teacher Speaks in Hindi:</span>
                <p className="text-2xl font-bold text-[#2D3436] mt-1">"बच्चों, इन वस्तुओं को गिनो।"</p>
                <p className="text-xs text-[#747D8C] mt-1">Intent detected: <span className="font-mono font-semibold text-[#F27D26]">COUNT_OBJECTS</span></p>
              </div>
            </div>
          )}

          {/* STEP 2: Santhali Translation & Ol Chiki */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#2D3436]">2. Validated Santhali & Ol Chiki Script</h4>
              <p className="text-[#747D8C] text-sm leading-relaxed">
                PALASH retrieves verified curriculum content with authentic Ol Chiki script and phonetic pronunciation.
              </p>
              <div className="p-5 bg-[#2D3436] text-white rounded-2xl space-y-3">
                <div>
                  <span className="text-xs uppercase font-bold text-[#F27D26]">Ol Chiki Script (ᱚᱞ ᱪᱤᱠᱤ):</span>
                  <p className="text-3xl font-bold text-white tracking-wide mt-1">
                    ᱵᱟᱹᱵᱩ-ᱢᱟᱹᱭ ᱠᱚ, ᱱᱚᱶᱟ ᱡᱤᱱᱤᱥ ᱠᱚ ᱞᱮᱠᱷᱟᱭ ᱯᱮ᱾
                  </p>
                </div>
                <div className="border-t border-stone-700 pt-2.5 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-stone-400 text-xs block">Phonetic Pronunciation:</span>
                    <span className="text-orange-200 font-medium">बाबू-मई को, नोवा जिनिस को लेखाय पे।</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-500/30">
                    🟢 Verified FLN Curriculum
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Audio Synthesis */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#2D3436]">3. Santhali Audio Pronunciation</h4>
              <p className="text-[#747D8C] text-sm leading-relaxed">
                Teachers can instantly play clear pronunciation so Santhali students immediately understand the instruction.
              </p>
              <div className="p-6 bg-[#FDFCF8] rounded-2xl border border-[#E0E2D9] text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F27D26] text-white flex items-center justify-center shadow-lg animate-pulse">
                  <Volume2 className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#2D3436]">Listen in Native Santhali</p>
                  <p className="text-xs text-[#747D8C]">Latency: <span className="font-mono text-[#27AE60] font-bold">1.8 seconds (Sub-3s goal met)</span></p>
                </div>
                <button
                  type="button"
                  onClick={handlePlayDemoAudio}
                  disabled={audioPlaying}
                  className="px-6 py-3 bg-[#F27D26] hover:bg-[#E06C17] text-white font-bold rounded-xl shadow-xs transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  {audioPlaying ? "Playing Audio..." : "Play Santhali Audio"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FLN Lesson */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#2D3436]">4. Class 1 FLN Lesson Module</h4>
              <p className="text-[#747D8C] text-sm leading-relaxed">
                Seamlessly jump into Class 1 Mathematics counting module with NIPUN outcome alignment (FLN-MATH-NUM-01).
              </p>
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2D3436]">Lesson: Counting 1 to 10</span>
                  <span className="text-xs bg-emerald-200/60 text-emerald-900 font-mono px-2 py-0.5 rounded">FLN-MATH-NUM-01</span>
                </div>
                <p className="text-[#747D8C]">Interactive activity: 🍎 🍎 🍎 🍎 🍎 (5 apples / ᱢᱚᱬᱮ)</p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('lessons');
                  }}
                  className="text-[#27AE60] font-bold text-xs inline-flex items-center gap-1 hover:underline pt-1"
                >
                  Open Full Lesson View <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Printable Worksheet */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#2D3436]">5. 1-Click Bilingual Worksheet Generator</h4>
              <p className="text-[#747D8C] text-sm leading-relaxed">
                Generate printable worksheets with Hindi + Santhali questions, counting visual items, and answer boxes for rural classrooms.
              </p>
              <div className="p-4 bg-stone-50 rounded-2xl border border-[#E0E2D9] text-sm space-y-2">
                <div className="flex items-center gap-2 text-[#2D3436] font-bold">
                  <FileText className="w-4 h-4 text-[#F27D26]" />
                  Class 1 Mathematics • Counting Worksheet
                </div>
                <p className="text-xs text-[#747D8C]">
                  Question: "कितने सेब हैं? / Tinak' seb menak'a? (ᱛᱤᱱᱟᱹᱜ ᱥᱮᱵᱽ ᱢᱮᱱᱟᱜ-ᱟ?)"
                </p>
                <div className="flex gap-2 text-lg">🍎 🍎 🍎 [ Answer: ___ ]</div>
              </div>
            </div>
          )}

          {/* STEP 6: Flashcards */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#2D3436]">6. Visual Bilingual Flashcards</h4>
              <p className="text-[#747D8C] text-sm leading-relaxed">
                Card categories (Numbers, Animals, Colors, Shapes, School Objects) with large illustrated visuals.
              </p>
              <div className="p-5 bg-[#FDFCF8] rounded-2xl border border-[#E0E2D9] flex items-center justify-around">
                <div className="text-center">
                  <span className="text-4xl block mb-1">🐄</span>
                  <span className="font-bold text-[#2D3436] text-sm block">गाय</span>
                  <span className="font-bold text-[#F27D26] text-xs">ᱜᱟᱹᱭ (Gai)</span>
                </div>
                <div className="text-center">
                  <span className="text-4xl block mb-1">⭕</span>
                  <span className="font-bold text-[#2D3436] text-sm block">गोल</span>
                  <span className="font-bold text-[#F27D26] text-xs">ᱜᱩᱞᱟᱹᱴ (Gulạṭ)</span>
                </div>
                <div className="text-center">
                  <span className="text-4xl block mb-1">🟢</span>
                  <span className="font-bold text-[#2D3436] text-sm block">हरा</span>
                  <span className="font-bold text-[#F27D26] text-xs">ᱦᱟᱹᱨᱤᱭᱟᱹᱲ (Hariyar)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Offline Demonstration */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-[#2D3436]">7. 100% Offline Capability</h4>
              <p className="text-[#747D8C] text-sm leading-relaxed">
                When Wi-Fi or cellular network is disconnected, BhashaMitra continues to translate, teach, generate worksheets, and pronounce phrases locally without interruption!
              </p>
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-300 flex items-center gap-3">
                <div className="p-3 bg-[#27AE60] text-white rounded-xl">
                  <WifiOff className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-[#2D3436] text-sm">Offline Storage Ready</p>
                  <p className="text-xs text-[#747D8C]">250+ FLN phrases, lessons & audio assets stored on-device</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#FDFCF8] border-t border-[#E0E2D9] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm font-medium text-[#747D8C] hover:text-[#2D3436] disabled:opacity-40"
          >
            Previous
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#747D8C] hover:bg-stone-100 rounded-xl"
            >
              Skip Demo
            </button>
            <button
              id="next-demo-step-btn"
              type="button"
              onClick={nextStep}
              className="px-5 py-2 text-sm font-bold bg-[#F27D26] hover:bg-[#E06C17] text-white rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              {currentStep === totalSteps ? 'Finish & Explore App' : 'Next Step'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

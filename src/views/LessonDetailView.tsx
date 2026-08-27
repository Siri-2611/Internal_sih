import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Award,
  RefreshCw
} from 'lucide-react';
import { FLNLesson } from '../types';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { SpeechService } from '../services/speech';

interface LessonDetailViewProps {
  lesson: FLNLesson;
  onBack: () => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({ lesson, onBack }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showActivityExplanation, setShowActivityExplanation] = useState(false);
  const [assessmentSelected, setAssessmentSelected] = useState<string | null>(null);
  const [assessmentChecked, setAssessmentChecked] = useState(false);

  const handleSelectOption = (optId: string, isCorrect: boolean) => {
    setSelectedOptionId(optId);
    setShowActivityExplanation(true);
    if (isCorrect) {
      SpeechService.playAcousticChime('success');
    } else {
      SpeechService.playAcousticChime('click');
    }
  };

  const handleAssessmentSubmit = (optId: string) => {
    setAssessmentSelected(optId);
    setAssessmentChecked(true);
    const opt = lesson.assessment?.options.find(o => o.id === optId);
    if (opt?.isCorrect) {
      SpeechService.playAcousticChime('success');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#E0E2D9] text-[#2D3436] hover:bg-stone-50 text-sm font-semibold shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Lessons</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#F27D26]/10 text-[#F27D26] font-bold px-3 py-1 rounded-full border border-[#F27D26]/20">
            {lesson.class} • {lesson.subject}
          </span>
          <span className="text-xs bg-emerald-50 text-emerald-900 font-mono font-bold px-3 py-1 rounded-full border border-emerald-300">
            {lesson.nipun_outcome_id}
          </span>
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-[#2D3436] text-white rounded-3xl p-6 sm:p-8 shadow-xs border border-stone-800 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{lesson.icon}</span>
          <div>
            <span className="text-xs font-bold text-[#F27D26] uppercase tracking-wider">
              FLN Foundational Lesson
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lesson.title}
            </h1>
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <span className="font-bold text-white block mb-0.5">🎯 NIPUN Learning Outcome:</span>
          {lesson.learning_outcome}
        </div>
      </div>

      {/* 1. Teacher Script & Spoken Santhali */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#E0E2D9] space-y-6">
        <div className="flex items-center gap-2.5 border-b border-[#E0E2D9] pb-3">
          <BookOpen className="w-5 h-5 text-[#F27D26]" />
          <h2 className="text-lg font-bold text-[#2D3436]">1. Teacher Instruction &amp; Santhali Speech</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-[#FDFCF8] rounded-2xl border border-[#E0E2D9]">
            <span className="text-xs font-bold text-[#747D8C] uppercase tracking-wide block">
              Teacher Speaks (Hindi):
            </span>
            <p className="text-lg font-bold text-[#2D3436] mt-1">
              "{lesson.teacher_script_hindi}"
            </p>
          </div>

          <div className="p-6 bg-[#2D3436] text-white rounded-2xl space-y-3">
            <span className="text-xs font-bold text-[#F27D26] uppercase tracking-wide block">
              Santhali Ol Chiki Script (Santali / ᱚᱞ ᱪᱤᱠᱤ):
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide leading-relaxed">
              {lesson.santhali_script}
            </p>

            <div className="pt-3 border-t border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-stone-400 block">Phonetic Pronunciation:</span>
                <span className="text-[#F27D26] font-medium text-sm">{lesson.santhali_phonetic}</span>
              </div>

              <AudioPlayerButton
                textToSpeak={lesson.santhali_phonetic || lesson.santhali_translation}
                phoneticText={lesson.santhali_phonetic}
                size="md"
                label="Play Audio to Class"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Classroom Activity */}
      {lesson.activity && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border-2 border-[#F27D26] space-y-6">
          <div className="flex items-center justify-between border-b border-[#E0E2D9] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F27D26]" />
              <h2 className="text-lg font-bold text-[#2D3436]">2. Interactive Activity: {lesson.activity.title}</h2>
            </div>
            <span className="text-xs bg-[#F27D26]/10 text-[#F27D26] font-bold px-2.5 py-1 rounded-full border border-[#F27D26]/20">
              Class Participation
            </span>
          </div>

          {/* Visual Display */}
          <div className="p-6 bg-[#FDFCF8] rounded-2xl border border-[#E0E2D9] text-center space-y-4">
            <div className="text-xs font-bold text-[#F27D26]">
              {lesson.activity.prompt_hindi}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 py-3 text-4xl sm:text-5xl select-none">
              {lesson.activity.items_visual.map((item, i) => (
                <span key={i} className="animate-fade-in hover:scale-110 transition-transform">
                  {item}
                </span>
              ))}
            </div>

            <div className="text-base sm:text-lg font-bold text-[#2D3436]">
              {lesson.activity.question_hindi}
            </div>
            <div className="text-xs text-[#F27D26] font-semibold font-serif">
              {lesson.activity.question_santhali}
            </div>
          </div>

          {/* Activity Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.activity.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                  className={`p-4 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400'
                        : 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400'
                      : 'bg-[#FDFCF8] border-[#E0E2D9] hover:border-[#F27D26] text-[#2D3436] hover:bg-stone-50'
                  }`}
                >
                  <div>
                    <div className="text-base">{opt.label_hindi}</div>
                    <div className="text-xs text-[#F27D26] font-serif font-normal">{opt.label_santhali}</div>
                  </div>
                  {isSelected && (
                    opt.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                    )
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showActivityExplanation && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1 animate-fade-in">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Teacher Explanation &amp; Resolution:</span>
              </div>
              <p>{lesson.activity.explanation_hindi}</p>
              <p className="text-emerald-900 font-serif italic">{lesson.activity.explanation_santhali}</p>
            </div>
          )}
        </div>
      )}

      {/* 3. Practice & Slate Exercises */}
      {lesson.practice_exercises && lesson.practice_exercises.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#E0E2D9] space-y-4">
          <h2 className="text-lg font-bold text-[#2D3436]">3. Slate &amp; Notebook Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lesson.practice_exercises.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#E0E2D9] space-y-2 flex flex-col justify-between">
                <div>
                  {p.visual && <div className="text-2xl mb-1">{p.visual}</div>}
                  <div className="text-sm font-bold text-[#2D3436]">{p.hindi}</div>
                  <div className="text-xs text-[#F27D26] font-medium">{p.santhali}</div>
                  <div className="text-base font-bold text-[#2D3436] font-serif mt-1">{p.santhali_script}</div>
                </div>
                <div className="pt-2 flex justify-end">
                  <AudioPlayerButton textToSpeak={p.santhali} size="sm" label="Play" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Quick Assessment */}
      {lesson.assessment && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#E0E2D9] space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F27D26]" />
            <h2 className="text-lg font-bold text-[#2D3436]">4. Quick Assessment Check</h2>
          </div>

          <div className="p-4 bg-[#FDFCF8] rounded-2xl border border-[#E0E2D9] space-y-1">
            <p className="font-bold text-[#2D3436]">{lesson.assessment.question_hindi}</p>
            <p className="text-xs text-[#F27D26] font-serif">{lesson.assessment.question_santhali}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lesson.assessment.options.map((opt) => {
              const isSelected = assessmentSelected === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleAssessmentSubmit(opt.id)}
                  className={`p-3.5 rounded-2xl border text-center font-bold text-sm transition-all cursor-pointer ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-extrabold ring-2 ring-emerald-400'
                        : 'bg-rose-50 border-rose-500 text-rose-950 font-extrabold ring-2 ring-rose-400'
                      : 'bg-[#FDFCF8] border-[#E0E2D9] hover:border-[#F27D26] text-[#2D3436]'
                  }`}
                >
                  <div>{opt.text_hindi}</div>
                  <div className="text-xs text-[#F27D26] font-serif font-normal">{opt.text_santhali}</div>
                </button>
              );
            })}
          </div>

          {assessmentChecked && lesson.assessment.hint && (
            <div className="text-xs text-[#747D8C] p-3 bg-[#FDFCF8] rounded-xl border border-[#E0E2D9]">
              💡 <span className="font-semibold">Pedagogical Hint:</span> {lesson.assessment.hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

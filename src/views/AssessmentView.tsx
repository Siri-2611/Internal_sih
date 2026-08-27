import React, { useState } from 'react';
import {
  CheckSquare,
  Volume2,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { INITIAL_ASSESSMENT_QUESTIONS } from '../data/assessments';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { SpeechService } from '../services/speech';

export const AssessmentView: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = INITIAL_ASSESSMENT_QUESTIONS[currentIdx];
  const totalQuestions = INITIAL_ASSESSMENT_QUESTIONS.length;

  const handleSelectOption = (optId: string, isCorrect: boolean) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optId
    }));
    setShowExplanation(true);

    if (isCorrect) {
      SpeechService.playAcousticChime('success');
    } else {
      SpeechService.playAcousticChime('click');
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setShowExplanation(false);
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    INITIAL_ASSESSMENT_QUESTIONS.forEach(q => {
      const selectedId = selectedAnswers[q.id];
      const opt = q.options.find(o => o.id === selectedId);
      if (opt?.isCorrect) {
        score++;
      }
    });
    return score;
  };

  const finalScore = calculateScore();
  const percentage = Math.round((finalScore / totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F27D26]/10 text-[#F27D26] text-xs font-bold mb-2 border border-[#F27D26]/20">
            <CheckSquare className="w-3.5 h-3.5 text-[#F27D26]" />
            <span>Class 1 FLN Diagnostic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436]">
            Mother-Tongue Student Assessment
          </h1>
          <p className="text-[#747D8C] text-sm mt-1">
            Evaluate student counting, shape discrimination, and vocabulary retention with audio support.
          </p>
        </div>

        {!isCompleted && (
          <div className="text-xs font-bold text-[#747D8C] bg-white px-3.5 py-2 rounded-xl border border-[#E0E2D9] shadow-xs self-start sm:self-auto">
            Question {currentIdx + 1} of {totalQuestions}
          </div>
        )}
      </div>

      {!isCompleted ? (
        /* Active Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#E0E2D9] space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#F27D26] h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Stem */}
          <div className="p-6 bg-[#FDFCF8] rounded-2xl border border-[#E0E2D9] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20">
                {currentQ.category}
              </span>
              <AudioPlayerButton
                textToSpeak={currentQ.question_santhali}
                size="sm"
                label="Listen Question"
              />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#2D3436]">
              {currentQ.question_hindi}
            </h3>

            <div className="text-sm font-semibold text-[#F27D26] font-serif">
              {currentQ.santhali_script}
            </div>

            {/* Visual Items Container */}
            {currentQ.visual_items && currentQ.visual_items.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-4 py-4 text-4xl sm:text-5xl select-none">
                {currentQ.visual_items.map((v, i) => (
                  <span key={i} className="animate-fade-in">{v}</span>
                ))}
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                  className={`p-4 rounded-2xl border-2 text-left font-bold transition-all cursor-pointer flex flex-col justify-between min-h-24 ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400'
                        : 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400'
                      : 'bg-[#FDFCF8] border-[#E0E2D9] hover:border-[#F27D26] text-[#2D3436] hover:bg-stone-50'
                  }`}
                >
                  <div className="text-sm sm:text-base">{opt.text_hindi}</div>
                  <div className="text-xs text-[#F27D26] font-serif mt-1 font-semibold">
                    {opt.text_santhali} {opt.text_olchiki ? `(${opt.text_olchiki})` : ''}
                  </div>
                  {isSelected && (
                    <div className="mt-2 flex justify-end">
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1 animate-fade-in">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Explanation &amp; Correct Answer:</span>
              </div>
              <p>{currentQ.explanation_hindi}</p>
              <p className="text-emerald-900 font-serif italic">{currentQ.explanation_santhali}</p>
            </div>
          )}

          {/* Navigation Action */}
          <div className="pt-4 border-t border-[#E0E2D9] flex justify-end">
            <button
              id="assessment-next-btn"
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswers[currentQ.id]}
              className="px-6 py-2.5 bg-[#F27D26] hover:bg-[#E06C17] disabled:opacity-40 text-white font-bold rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer text-sm"
            >
              <span>{currentIdx === totalQuestions - 1 ? 'Finish Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Completed Score Report Card */
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xs border border-[#E0E2D9] text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#F27D26]/10 text-[#F27D26] flex items-center justify-center border border-[#F27D26]/20">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436]">
              Assessment Completed!
            </h2>
            <p className="text-sm text-[#747D8C]">
              Class 1 Foundational Literacy &amp; Numeracy (FLN) Diagnostic Results
            </p>
          </div>

          <div className="p-6 bg-[#FDFCF8] rounded-2xl max-w-sm mx-auto border border-[#E0E2D9] space-y-2">
            <div className="text-4xl font-black text-[#2D3436] font-mono">
              {finalScore} / {totalQuestions}
            </div>
            <div className="text-sm font-bold text-[#F27D26]">
              {percentage >= 80 ? '🌟 Mastery Achieved (Aḍi napay!)' : percentage >= 60 ? '👍 Good Progress (Kuṛumuṭu)' : '🔄 Needs Reinforcement'}
            </div>
          </div>

          <div className="text-xs text-[#747D8C] max-w-md mx-auto leading-relaxed">
            Recommendations: Focus on concrete counting items and Ol Chiki script flashcards during daily circle time.
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#2D3436] font-semibold rounded-xl text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

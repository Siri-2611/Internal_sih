import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Award,
  Layers,
  Zap
} from 'lucide-react';
import { INITIAL_LESSONS } from '../data/lessons';
import { LessonDetailView } from './LessonDetailView';
import { FLNLesson } from '../types';

export const LessonsView: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<FLNLesson | null>(null);

  if (activeLesson) {
    return <LessonDetailView lesson={activeLesson} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F27D26]/10 text-[#F27D26] text-xs font-bold mb-2 border border-[#F27D26]/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Class 1 Curriculum</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436]">
          FLN Interactive Lesson Modules
        </h1>
        <p className="text-[#747D8C] text-sm mt-1">
          NIPUN Bharat aligned bilingual lessons designed specifically for Hindi teachers in Santhali classrooms.
        </p>
      </div>

      {/* Lesson Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            id={`lesson-card-${lesson.id}`}
            onClick={() => setActiveLesson(lesson)}
            className="bg-white rounded-3xl p-6 shadow-xs hover:shadow-md border border-[#E0E2D9] hover:border-[#F27D26]/60 transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#F27D26]/10 border border-[#F27D26]/20 flex items-center justify-center text-3xl shadow-xs group-hover:scale-105 transition-transform">
                  {lesson.icon}
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 block mb-1">
                    {lesson.nipun_outcome_id}
                  </span>
                  <span className="text-xs text-[#747D8C] font-semibold">
                    {lesson.subject} • {lesson.topic}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#2D3436] group-hover:text-[#F27D26] transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs text-[#747D8C] mt-1 leading-relaxed">
                  {lesson.learning_outcome}
                </p>
              </div>

              {/* Sample Translation Preview */}
              <div className="p-3.5 rounded-2xl bg-[#FDFCF8] border border-[#E0E2D9] space-y-1">
                <span className="text-[11px] font-bold text-[#747D8C] uppercase tracking-wide block">
                  Teacher Key Script:
                </span>
                <p className="text-xs font-bold text-[#2D3436] line-clamp-1">
                  "{lesson.teacher_script_hindi}"
                </p>
                <p className="text-xs font-serif font-bold text-[#F27D26] line-clamp-1">
                  {lesson.santhali_script}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E0E2D9] flex items-center justify-between text-xs font-bold text-[#F27D26] group-hover:text-[#E06C17]">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#F27D26]" />
                Open Interactive Lesson
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

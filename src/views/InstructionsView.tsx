import React, { useState } from 'react';
import {
  Volume2,
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen,
  Flag
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { ReportFeedbackModal } from '../components/ReportFeedbackModal';
import { TranslationRecord } from '../types';

export const InstructionsView: React.FC = () => {
  const dataset = StorageService.getDataset();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackRecord, setFeedbackRecord] = useState<TranslationRecord | null>(null);

  const categories = [
    'All',
    'Classroom management',
    'Counting',
    'Mathematics',
    'Listening',
    'Reading',
    'Writing',
    'Praise',
    'Correction',
    'Greeting',
    'Activity',
    'Assessment'
  ];

  const filtered = dataset.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.hindi.toLowerCase().includes(query) ||
      item.santhali.toLowerCase().includes(query) ||
      item.santhali_script.toLowerCase().includes(query) ||
      item.intent?.toLowerCase().includes(query) ||
      item.topic?.toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F27D26]/10 text-[#F27D26] text-xs font-bold mb-2 border border-[#F27D26]/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Class 1 Routine Library</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436]">
          Teacher Classroom Instructions
        </h1>
        <p className="text-[#747D8C] text-sm mt-1">
          Curated &amp; verified Santhali phrases for everyday primary grade teaching in Jharkhand schools.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E0E2D9] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#747D8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Hindi, Santhali, Ol Chiki or Topic (e.g. गिनो, बैठो, किताब)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FDFCF8] border border-[#E0E2D9] rounded-xl text-sm focus:ring-2 focus:ring-[#F27D26] focus:border-[#F27D26] text-[#2D3436]"
            />
          </div>

          <div className="text-xs text-[#747D8C] font-semibold self-end sm:self-center">
            Showing {filtered.length} of {dataset.length} verified instructions
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#F27D26] text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-[#2D3436]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 shadow-xs hover:shadow-md border border-[#E0E2D9] hover:border-[#F27D26]/60 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20">
                  {item.category}
                </span>
                <span className="text-[10px] text-[#27AE60] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>

              {/* Hindi Phrase */}
              <div className="text-base font-bold text-[#2D3436]">
                "{item.hindi}"
              </div>

              {/* Santhali Roman */}
              <div className="text-sm font-semibold text-[#F27D26]">
                {item.santhali}
              </div>

              {/* Ol Chiki Script */}
              <div className="text-xl font-bold text-[#2D3436] tracking-wide font-serif pt-1">
                {item.santhali_script}
              </div>

              {/* Phonetic Pronunciation */}
              <div className="text-xs text-[#747D8C] italic">
                उच्चारण: {item.santhali_phonetic}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#E0E2D9] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#747D8C]">
                {item.intent || 'INSTRUCTION'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackRecord(item)}
                  className="p-1.5 text-[#747D8C] hover:text-[#F27D26] rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                  title="Report dialect or pronunciation issue"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>

                <AudioPlayerButton
                  textToSpeak={item.santhali_phonetic || item.santhali}
                  phoneticText={item.santhali_phonetic}
                  label="Play"
                  size="sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {feedbackRecord && (
        <ReportFeedbackModal
          isOpen={!!feedbackRecord}
          onClose={() => setFeedbackRecord(null)}
          hindiText={feedbackRecord.hindi}
          santhaliText={feedbackRecord.santhali}
          recordId={feedbackRecord.id}
        />
      )}
    </div>
  );
};

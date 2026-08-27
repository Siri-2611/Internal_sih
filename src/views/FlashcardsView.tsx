import React, { useState } from 'react';
import {
  Layers,
  Volume2,
  RotateCw,
  Search,
  Filter,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { INITIAL_FLASHCARDS } from '../data/flashcards';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { FlashcardItem } from '../types';

export const FlashcardsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Numbers', 'Animals', 'Colors', 'Shapes', 'School Objects', 'Everyday Objects'];

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filtered = INITIAL_FLASHCARDS.filter(card => {
    const matchesCat = selectedCategory === 'All' || card.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      card.hindi.toLowerCase().includes(q) ||
      card.santhali.toLowerCase().includes(q) ||
      card.santhali_script.toLowerCase().includes(q) ||
      card.santhali_phonetic.toLowerCase().includes(q);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F27D26]/10 text-[#F27D26] text-xs font-bold mb-2 border border-[#F27D26]/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Vocabulary Cards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436]">
            Illustrated Bilingual Flashcards
          </h1>
          <p className="text-[#747D8C] text-sm mt-1">
            Tap any card to flip between Hindi and Santhali Ol Chiki with audio pronunciation.
          </p>
        </div>

        <div className="text-xs font-semibold text-[#747D8C] bg-white px-3 py-2 rounded-xl border border-[#E0E2D9] shadow-xs self-start sm:self-auto">
          {filtered.length} Flashcards Available
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E0E2D9] space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#747D8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flashcards (e.g. गाय, लाल, सेब, गोल, 1, 2)..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FDFCF8] border border-[#E0E2D9] rounded-xl text-sm focus:ring-2 focus:ring-[#F27D26] focus:border-[#F27D26] text-[#2D3436]"
          />
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className={`rounded-3xl p-6 shadow-xs hover:shadow-md border transition-all cursor-pointer select-none flex flex-col justify-between min-h-64 group relative overflow-hidden ${
                isFlipped
                  ? 'bg-[#2D3436] text-white border-[#F27D26]'
                  : 'bg-white text-[#2D3436] border-[#E0E2D9] hover:border-[#F27D26]/60'
              }`}
            >
              {/* Top Tag & Flip Hint */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  isFlipped
                    ? 'bg-[#F27D26]/20 text-[#F27D26] border border-[#F27D26]/30'
                    : 'bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20'
                }`}>
                  {card.category}
                </span>

                <span className="text-xs text-[#747D8C] flex items-center gap-1 opacity-70 group-hover:opacity-100">
                  <RotateCw className="w-3.5 h-3.5" />
                  {isFlipped ? 'Show Hindi' : 'Tap to Flip'}
                </span>
              </div>

              {/* Card Center Visual */}
              {!isFlipped ? (
                /* FRONT VIEW (Hindi + Big Visual) */
                <div className="text-center py-4 space-y-2">
                  <div className="text-6xl my-2 transform group-hover:scale-110 transition-transform">
                    {card.icon_or_emoji}
                  </div>
                  <h3 className="text-2xl font-black text-[#2D3436] tracking-tight">
                    {card.hindi}
                  </h3>
                  {card.example_sentence_hindi && (
                    <p className="text-xs text-[#747D8C] italic">
                      "{card.example_sentence_hindi}"
                    </p>
                  )}
                </div>
              ) : (
                /* BACK VIEW (Santhali Ol Chiki + Phonetics) */
                <div className="text-center py-4 space-y-3 animate-fade-in">
                  <span className="text-xs font-bold text-[#F27D26] uppercase tracking-wider block">
                    Santhali / ᱚᱞ ᱪᱤᱠᱤ
                  </span>
                  <div className="text-4xl font-extrabold text-white tracking-wide font-serif">
                    {card.santhali_script}
                  </div>
                  <div className="text-lg font-bold text-stone-200">
                    {card.santhali}
                  </div>
                  <div className="text-xs text-stone-400">
                    उच्चारण: <span className="text-stone-200 font-semibold">{card.santhali_phonetic}</span>
                  </div>
                  {card.example_sentence_santhali && (
                    <p className="text-xs text-[#F27D26] italic pt-1 border-t border-stone-700">
                      "{card.example_sentence_santhali}"
                    </p>
                  )}
                </div>
              )}

              {/* Bottom Audio Action */}
              <div className="pt-3 border-t border-[#E0E2D9]/40 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                <span className="text-[11px] font-mono text-[#747D8C]">
                  {card.id}
                </span>

                <AudioPlayerButton
                  textToSpeak={card.santhali_phonetic || card.santhali}
                  phoneticText={card.santhali_phonetic}
                  label="Play Audio"
                  size="sm"
                  className={isFlipped ? 'bg-[#F27D26] text-white hover:bg-[#E06C17]' : ''}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

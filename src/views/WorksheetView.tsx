import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Sparkles,
  Download,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Award
} from 'lucide-react';

interface WorksheetQuestion {
  id: number;
  hindi_prompt: string;
  santhali_prompt: string;
  olchiki_prompt: string;
  visual_emojis: string[];
  expected_answer: string;
}

export const WorksheetView: React.FC = () => {
  const [topic, setTopic] = useState<'counting' | 'addition' | 'shapes' | 'animals'>('counting');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [worksheetTitle, setWorksheetTitle] = useState('कक्षा 1 • गणित कार्यपत्रक (Class 1 Math Worksheet)');
  const [studentName, setStudentName] = useState('');

  const generateQuestions = (): WorksheetQuestion[] => {
    if (topic === 'counting') {
      const items = [
        { name: 'Apple / Seb', emojis: ['🍎', '🍎', '🍎'], count: '3', santhali: 'ᱯᱮ (Pe)' },
        { name: 'Star / Ipil', emojis: ['⭐️', '⭐️', '⭐️', '⭐️', '⭐️'], count: '5', santhali: 'ᱢᱚᱬᱮ (Mōṛē)' },
        { name: 'Mango / Uli', emojis: ['🥭', '🥭'], count: '2', santhali: 'ᱵᱟᱨ (Bar)' },
        { name: 'Bird / Cheṇe', emojis: ['🐦', '🐦', '🐦', '🐦'], count: '4', santhali: 'ᱯᱩᱱ (Pun)' },
        { name: 'Flower / Baha', emojis: ['🌸', '🌸', '🌸', '🌸', '🌸', '🌸'], count: '6', santhali: 'ᱛᱩᱨᱩᱭ (Turui)' },
        { name: 'Leaf / Sakam', emojis: ['🍃'], count: '1', santhali: 'ᱢᱤᱫ (Mit\')' }
      ];

      return items.slice(0, questionCount).map((item, idx) => ({
        id: idx + 1,
        hindi_prompt: `गिनो और सही संख्या लिखो (${item.name}):`,
        santhali_prompt: `Lekhaye me ar ol me:`,
        olchiki_prompt: `ᱞᱮᱠᱷᱟᱭ ᱢᱮ ᱟᱨ ᱚᱞ ᱢᱮ:`,
        visual_emojis: item.emojis,
        expected_answer: `${item.count} / ${item.santhali}`
      }));
    }

    if (topic === 'addition') {
      const items = [
        { e1: ['🍎', '🍎'], e2: ['🍎'], ans: '3 (2 + 1 = 3)' },
        { e1: ['⭐️', '⭐️'], e2: ['⭐️', '⭐️'], ans: '4 (2 + 2 = 4)' },
        { e1: ['🥭', '🥭', '🥭'], e2: ['🥭', '🥭'], ans: '5 (3 + 2 = 5)' },
        { e1: ['🌸'], e2: ['🌸', '🌸'], ans: '3 (1 + 2 = 3)' }
      ];

      return items.slice(0, questionCount).map((item, idx) => ({
        id: idx + 1,
        hindi_prompt: `जोड़ो और कुल संख्या लिखो:`,
        santhali_prompt: `Mesaye me ar mot ol me:`,
        olchiki_prompt: `ᱢᱮᱥᱟᱭ ᱢᱮ ᱟᱨ ᱢᱚᱴ ᱚᱞ ᱢᱮ:`,
        visual_emojis: [...item.e1, '➕', ...item.e2],
        expected_answer: item.ans
      }));
    }

    if (topic === 'shapes') {
      const items = [
        { promptH: 'गोल (Gulạṭ ⭕) आकार के नीचे सही (✓) का निशान लगाओ:', promptO: 'ᱜᱩᱞᱟᱹᱴ ᱪᱤᱛᱟᱹᱨ ᱞᱟᱛᱟᱨ ᱨᱮ ✓ ᱪᱤᱱᱦᱟᱹᱣ ᱢᱮ:', emojis: ['⭕', '🔺', '⬛'], ans: '⭕' },
        { promptH: 'त्रिकोण (Pe-kona 🔺) आकार को पहचानो:', promptO: 'ᱯᱮ-ᱠᱳᱬᱟ ᱪᱤᱛᱟᱹᱨ ᱪᱤᱱᱦᱟᱹᱣ ᱢᱮ:', emojis: ['⬛', '🔺', '⭕'], ans: '🔺' },
        { promptH: 'चौकोर (Pun-kona ⬛) आकार को पहचानो:', promptO: 'ᱯᱩᱱ-ᱠᱳᱬᱟ ᱪᱤᱛᱟᱹᱨ ᱪᱤᱱᱦᱟᱹᱣ ᱢᱮ:', emojis: ['🔺', '⭕', '⬛'], ans: '⬛' }
      ];

      return items.slice(0, questionCount).map((item, idx) => ({
        id: idx + 1,
        hindi_prompt: item.promptH,
        santhali_prompt: 'Shape chinhav me:',
        olchiki_prompt: item.promptO,
        visual_emojis: item.emojis,
        expected_answer: item.ans
      }));
    }

    // Animals
    const animalItems = [
      { promptH: 'गाय (Gai 🐄) को पहचानो:', promptO: 'ᱜᱟᱹᱭ ᱪᱤᱱᱦᱟᱹᱣ ᱢᱮ:', emojis: ['🐄', '🐕', '🐐'], ans: '🐄 (Gai)' },
      { promptH: 'चिड़िया (Cheṇe 🐦) को पहचानो:', promptO: 'ᱪᱮᱬᱮ ᱪᱤᱱᱦᱟᱹᱣ ᱢᱮ:', emojis: ['🐘', '🐦', '🐱'], ans: '🐦 (Cheṇe)' },
      { promptH: 'बकरी (Merom 🐐) को पहचानो:', promptO: 'ᱢᱮᱨᱚᱢ ᱪᱤᱱᱦᱟᱹᱣ ᱢᱮ:', emojis: ['🐐', '🐄', '🐕'], ans: '🐐 (Merom)' }
    ];

    return animalItems.slice(0, questionCount).map((item, idx) => ({
      id: idx + 1,
      hindi_prompt: item.promptH,
      santhali_prompt: 'Jinis chinhav me:',
      olchiki_prompt: item.promptO,
      visual_emojis: item.emojis,
      expected_answer: item.ans
    }));
  };

  const questions = generateQuestions();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      {/* Configuration Header (Hidden on Print) */}
      <div className="print:hidden space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F27D26]/10 text-[#F27D26] text-xs font-bold mb-2 border border-[#F27D26]/20">
            <FileText className="w-3.5 h-3.5" />
            <span>Classroom Resource Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436]">
            Bilingual Worksheet Generator
          </h1>
          <p className="text-[#747D8C] text-sm mt-1">
            Instantly create printable bilingual Hindi + Santhali worksheets for slate or printout.
          </p>
        </div>

        {/* Generator Controls Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#E0E2D9] space-y-4">
          <div className="flex items-center gap-2 text-[#2D3436] font-bold text-sm">
            <Sliders className="w-4 h-4 text-[#F27D26]" />
            Worksheet Settings
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#747D8C] mb-1">
                Curriculum Topic
              </label>
              <select
                id="worksheet-topic-select"
                value={topic}
                onChange={(e: any) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FDFCF8] border border-[#E0E2D9] rounded-xl text-sm font-medium text-[#2D3436] focus:ring-2 focus:ring-[#F27D26] focus:border-[#F27D26]"
              >
                <option value="counting">1. Counting 1 to 10 (गिनती)</option>
                <option value="addition">2. Single Digit Addition (जोड़)</option>
                <option value="shapes">3. 2D Shapes (मूल आकार)</option>
                <option value="animals">4. Animals &amp; Nature (पशु-पक्षी)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#747D8C] mb-1">
                Number of Questions
              </label>
              <select
                id="worksheet-count-select"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 bg-[#FDFCF8] border border-[#E0E2D9] rounded-xl text-sm font-medium text-[#2D3436] focus:ring-2 focus:ring-[#F27D26] focus:border-[#F27D26]"
              >
                <option value="3">3 Questions (Quick Daily Slate)</option>
                <option value="4">4 Questions (Standard Review)</option>
                <option value="5">5 Questions (Complete Practice)</option>
                <option value="6">6 Questions (Extended FLN Test)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                id="print-worksheet-btn"
                type="button"
                onClick={handlePrint}
                className="w-full px-5 py-2.5 bg-[#F27D26] hover:bg-[#E06C17] text-white font-bold rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Paper Canvas */}
      <div
        id="printable-worksheet-canvas"
        className="bg-white rounded-3xl p-8 sm:p-12 shadow-xs border border-[#E0E2D9] print:shadow-none print:border-none print:p-0 space-y-8"
      >
        {/* Worksheet Header */}
        <div className="border-b-2 border-[#2D3436] pb-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#2D3436] tracking-tight">
                {worksheetTitle}
              </h2>
              <p className="text-xs font-semibold text-[#747D8C]">
                Primary School MTB-MLE • Jharkhand FLN Learning Standard
              </p>
            </div>

            <div className="text-right text-xs text-[#747D8C]">
              <span className="font-bold text-[#F27D26]">Script: Ol Chiki (Santali)</span>
            </div>
          </div>

          {/* Student details fill-in line */}
          <div className="grid grid-cols-3 gap-4 pt-2 text-xs font-bold text-[#2D3436] border-t border-[#E0E2D9]">
            <div>
              नाम (Name / ᱧᱩᱛᱩᱢ): <span className="underline decoration-dotted font-normal">____________________</span>
            </div>
            <div>
              रोल नं (Roll No): <span className="underline decoration-dotted font-normal">________</span>
            </div>
            <div className="text-right">
              दिनांक (Date): <span className="underline decoration-dotted font-normal">____ / ____ / 2026</span>
            </div>
          </div>
        </div>

        {/* Instructions Box */}
        <div className="p-4 rounded-xl bg-[#FDFCF8] border border-[#E0E2D9] text-xs text-[#2D3436] space-y-1">
          <div className="font-bold text-[#2D3436]">
            निर्देश / Disa (Instructions):
          </div>
          <p>
            1. चित्रों को ध्यान से गिनो या पहचानो। (Chitra ko dhian kate lekhaye pe.)
          </p>
          <p className="font-serif font-bold text-[#2D3436]">
            2. ᱱᱚᱶᱟ ᱡᱤᱱᱤᱥ ᱠᱚ ᱞᱮᱠᱷᱟᱭ ᱢᱮ ᱟᱨ ᱥᱟᱹᱦᱤ ᱮᱞ ᱚᱞ ᱢᱮ᱾ (Lekhaye me ar ol me.)
          </p>
        </div>

        {/* Question Items Grid */}
        <div className="space-y-6">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl border border-[#E0E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2D3436] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {q.id}
                  </span>
                  <div>
                    <p className="font-bold text-[#2D3436] text-sm">{q.hindi_prompt}</p>
                    <p className="font-serif font-bold text-[#F27D26] text-sm">{q.olchiki_prompt}</p>
                  </div>
                </div>

                {/* Emojis array */}
                <div className="pl-8 flex flex-wrap items-center gap-2 text-3xl py-2 select-none">
                  {q.visual_emojis.map((emoji, i) => (
                    <span key={i} className="p-1">
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>

              {/* Student Answer Box */}
              <div className="sm:text-right shrink-0">
                <div className="inline-block p-3 sm:p-4 rounded-xl border-2 border-dashed border-[#E0E2D9] bg-[#FDFCF8] min-w-32 text-center">
                  <span className="text-[10px] uppercase font-bold text-[#747D8C] block mb-1">
                    उत्तर (Answer / ᱩᱛᱟᱹᱨ)
                  </span>
                  <div className="h-8 flex items-center justify-center font-bold text-[#747D8C] text-sm">
                    [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teacher Feedback Footer */}
        <div className="pt-8 border-t border-[#E0E2D9] flex justify-between items-center text-xs text-[#747D8C]">
          <div>
            शिक्षक हस्ताक्षर (Teacher Sign): ____________________
          </div>
          <div>
            अंक / ग्रेड (Score): _____ / {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

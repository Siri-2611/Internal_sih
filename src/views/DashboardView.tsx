import React, { useState } from 'react';
import {
  Mic,
  MessageSquare,
  BookOpen,
  FileText,
  Layers,
  CheckSquare,
  Volume2,
  HardDrive,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Compass,
  CheckCircle2,
  Award,
  Zap,
  Globe
} from 'lucide-react';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { StorageService } from '../services/storage';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
  onOpenDemo: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onOpenDemo }) => {
  const offlineStatus = StorageService.getOfflineStatus();
  const [selectedQuickPhrase, setSelectedQuickPhrase] = useState<any>(null);

  const quickPhrases = [
    {
      hindi: "नमस्ते / जोहार।",
      santhali: "Johar.",
      olchiki: "ᱡᱚᱦᱟᱨ᱾",
      phonetic: "जोहार।",
      category: "Greeting"
    },
    {
      hindi: "सब लोग बैठ जाओ।",
      santhali: "Joto hoṛ duṛup' pe.",
      olchiki: "ᱡᱚᱛᱚ ᱦᱚᱲ ᱫᱩᱲᱩᱵ ᱯᱮ᱾",
      phonetic: "जोतो होड़ दुड़ुब पे।",
      category: "Management"
    },
    {
      hindi: "बच्चों, इन वस्तुओं को गिनो।",
      santhali: "Babumay ko, nowa jinis ko lekhaye pe.",
      olchiki: "ᱵᱟᱹᱵᱩ-ᱢᱟᱹᱭ ᱠᱚ, ᱱᱚᱶᱟ ᱡᱤᱱᱤᱥ ᱠᱚ ᱞᱮᱠᱷᱟᱭ ᱯᱮ᱾",
      phonetic: "बाबू-मई को, नोवा जिनिस को लेखाय पे।",
      category: "Counting"
    },
    {
      hindi: "ध्यान से सुनो।",
      santhali: "Dhian kate anjom me.",
      olchiki: "ᱫᱷᱤᱭᱟᱱ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ᱾",
      phonetic: "धियान काते आंजोम मे।",
      category: "Attention"
    },
    {
      hindi: "अपनी किताब खोलो।",
      santhali: "Apnarag potob jhir me.",
      olchiki: "ᱟᱯᱱᱟᱨᱟᱜ ᱯᱚᱛᱚᱵ ᱡᱷᱤᱡ ᱢᱮ᱾",
      phonetic: "आपनाराग पोतोब झिज मे।",
      category: "Reading"
    },
    {
      hindi: "बहुत अच्छा!",
      santhali: "Aḍi napay!",
      olchiki: "ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ!",
      phonetic: "आड़ी नापाय!",
      category: "Praise"
    }
  ];

  const primaryModules = [
    {
      id: 'voice',
      title: 'Voice Classroom Assistant',
      desc: 'Speak naturally in Hindi. Instant spoken Santhali audio playback in < 2 seconds.',
      icon: Mic,
      tag: 'Real-Time Voice',
      badgeColor: 'bg-[#F27D26]/10 text-[#F27D26] border-[#F27D26]/30',
      iconBg: 'bg-[#F27D26] text-white'
    },
    {
      id: 'translate',
      title: 'FLN Translation & Intent Engine',
      desc: 'Type Hindi classroom instructions with verified Ol Chiki script and phonetic pronunciation.',
      icon: MessageSquare,
      tag: 'Curriculum-Matched',
      badgeColor: 'bg-stone-100 text-[#2D3436] border-[#E0E2D9]',
      iconBg: 'bg-[#2D3436] text-white'
    },
    {
      id: 'lessons',
      title: 'Class 1 FLN Interactive Lessons',
      desc: 'Curriculum aligned with NIPUN Bharat: Numbers 1-10, Shapes, Comparison & Greetings.',
      icon: BookOpen,
      tag: 'NIPUN Bharat Aligned',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      iconBg: 'bg-[#27AE60] text-white'
    },
    {
      id: 'worksheet',
      title: 'Bilingual Worksheet Generator',
      desc: '1-Click printable worksheets with visual counting grids and Santhali instructions for print/slate.',
      icon: FileText,
      tag: 'Instant Printable',
      badgeColor: 'bg-stone-100 text-[#2D3436] border-[#E0E2D9]',
      iconBg: 'bg-stone-700 text-white'
    },
    {
      id: 'flashcards',
      title: 'Illustrated Flashcards',
      desc: '36+ visual vocabulary flashcards: Numbers, Animals, Colors, Shapes, and School Objects.',
      icon: Layers,
      tag: 'Visual Audio',
      badgeColor: 'bg-[#F27D26]/10 text-[#F27D26] border-[#F27D26]/30',
      iconBg: 'bg-[#F27D26] text-white'
    },
    {
      id: 'assessment',
      title: 'Oral & Visual Assessment',
      desc: 'Evaluate student counting, shape discrimination, and vocabulary retention with audio prompts.',
      icon: CheckSquare,
      tag: 'FLN Diagnostic',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      iconBg: 'bg-[#27AE60] text-white'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden bg-[#2D3436] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#E0E2D9]/20">
        <div className="absolute -right-8 -bottom-8 opacity-10 text-white select-none pointer-events-none font-black text-9xl">
          ᱚᱞ
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#F27D26] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
            <span className="text-stone-200">Mother-Tongue Multilingual Education (MTB-MLE)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Bridging Hindi-Medium Teachers &amp; Santhali-Speaking Children
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            BhashaMitra empowers teachers with instant, curriculum-validated Santhali translations, authentic Ol Chiki script (ᱚᱞ ᱪᱤᱠᱤ), and high-clarity voice audio designed for low-connectivity rural classrooms.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="dashboard-start-voice-btn"
              type="button"
              onClick={() => onNavigate('voice')}
              className="px-5 py-2.5 rounded-xl bg-[#F27D26] text-white hover:bg-[#E06C17] font-bold text-sm shadow-xs transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <Mic className="w-4 h-4 text-white" />
              Launch Voice Classroom
            </button>

            <button
              id="dashboard-open-demo-btn"
              type="button"
              onClick={onOpenDemo}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F27D26]" />
              Run 7-Step Judge Demo Flow
            </button>

            <button
              type="button"
              onClick={() => onNavigate('lessons')}
              className="px-4 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-stone-300 hover:text-white font-medium text-sm transition-all inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              Explore Lessons
            </button>
          </div>
        </div>
      </div>

      {/* Quick Classroom Instructions Bar (Instant Teacher Taps) */}
      <section className="bg-white rounded-3xl p-6 shadow-xs border border-[#E0E2D9] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#F27D26]/10 text-[#F27D26]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#2D3436]">Instant Classroom Instructions</h2>
              <p className="text-xs text-[#747D8C]">Tap any phrase for instant Santhali pronunciation in class</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('instructions')}
            className="text-xs font-bold text-[#F27D26] hover:text-[#E06C17] inline-flex items-center gap-1 transition-colors"
          >
            View All 35+ Phrases <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickPhrases.map((p, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#FDFCF8] hover:bg-stone-50 border border-[#E0E2D9] transition-all flex flex-col justify-between space-y-2 group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#747D8C] font-semibold mb-1">
                  <span className="bg-stone-100 text-[#2D3436] px-1.5 py-0.5 rounded border border-[#E0E2D9]">
                    {p.category}
                  </span>
                  <span className="font-mono text-[#F27D26]">Ol Chiki</span>
                </div>
                <div className="font-bold text-[#2D3436] text-sm">{p.hindi}</div>
                <div className="text-[#F27D26] font-medium text-sm mt-0.5">{p.santhali}</div>
                <div className="text-base font-bold text-[#2D3436] tracking-wide mt-1 font-serif">
                  {p.olchiki}
                </div>
                <div className="text-xs text-[#747D8C] italic">
                  Pronunciation: {p.phonetic}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E0E2D9] flex items-center justify-end">
                <AudioPlayerButton
                  textToSpeak={p.phonetic}
                  phoneticText={p.phonetic}
                  label="Speak"
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Primary Modules Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#2D3436]">Classroom Modules &amp; Teaching Tools</h2>
          <p className="text-xs text-[#747D8C]">Everything needed to conduct Class 1 Foundational Literacy &amp; Numeracy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {primaryModules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                id={`module-card-${m.id}`}
                onClick={() => onNavigate(m.id)}
                className="bg-white rounded-3xl p-6 shadow-xs hover:shadow-md border border-[#E0E2D9] hover:border-[#F27D26]/50 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl ${m.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${m.badgeColor}`}>
                      {m.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#2D3436] group-hover:text-[#F27D26] transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-[#747D8C] text-xs leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E0E2D9] flex items-center justify-between text-xs font-bold text-[#F27D26] group-hover:text-[#E06C17]">
                  <span>Open Module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* System Highlights & SIH Evaluation Alignment Banner */}
      <section className="bg-[#2D3436] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#E0E2D9]/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-700 pb-4">
          <div>
            <span className="text-xs uppercase font-bold text-[#F27D26] tracking-wider">Evaluation Ready Architecture</span>
            <h3 className="text-xl font-bold text-white mt-0.5">BhashaMitra • Technical &amp; Pedagogical Pillars</h3>
          </div>
          <button
            onClick={() => onNavigate('benchmark')}
            className="text-xs px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-semibold border border-stone-700 self-start sm:self-auto transition-colors"
          >
            View Live Benchmark Telemetry →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-2">
            <div className="flex items-center gap-2 text-[#27AE60] font-bold text-sm">
              <HardDrive className="w-4 h-4" />
              100% Offline-First
            </div>
            <p className="text-stone-300">
              Zero network requirement after first load. Pre-caches 250+ FLN curriculum records in local storage for remote tribal village schools.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-2">
            <div className="flex items-center gap-2 text-[#F27D26] font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              Human-in-the-Loop
            </div>
            <p className="text-stone-300">
              No hallucinated translations. AI drafts are explicitly labeled and routed to the native linguist validation queue.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <Zap className="w-4 h-4" />
              Sub-2s Voice Latency
            </div>
            <p className="text-stone-300">
              Instant local intent detection and speech synthesis engineered for natural conversational pacing in active primary classrooms.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-2">
            <div className="flex items-center gap-2 text-orange-300 font-bold text-sm">
              <Globe className="w-4 h-4" />
              Multi-Tribal Scalability
            </div>
            <p className="text-stone-300">
              Modular architecture currently active for Santhali (Ol Chiki) with plug-and-play schemas for Ho and Mundari languages.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

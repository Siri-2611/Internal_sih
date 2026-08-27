import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GuidedDemoModal } from './components/GuidedDemoModal';
import { DashboardView } from './views/DashboardView';
import { TranslateView } from './views/TranslateView';
import { VoiceClassroomView } from './views/VoiceClassroomView';
import { InstructionsView } from './views/InstructionsView';
import { LessonsView } from './views/LessonsView';
import { WorksheetView } from './views/WorksheetView';
import { FlashcardsView } from './views/FlashcardsView';
import { AssessmentView } from './views/AssessmentView';
import { OfflineCenterView } from './views/OfflineCenterView';
import { ValidationAdminView } from './views/ValidationAdminView';
import { BenchmarkView } from './views/BenchmarkView';
import { Sparkles, Heart, Globe, HardDrive } from 'lucide-react';
import { StorageService } from './services/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('santhali');

  // Initialize dataset in local storage on first mount
  useEffect(() => {
    StorageService.getDataset();
  }, []);

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onNavigate={setCurrentView} onOpenDemo={() => setIsDemoModalOpen(true)} />;
      case 'translate':
        return <TranslateView />;
      case 'voice':
        return <VoiceClassroomView />;
      case 'instructions':
        return <InstructionsView />;
      case 'lessons':
        return <LessonsView />;
      case 'worksheet':
        return <WorksheetView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'assessment':
        return <AssessmentView />;
      case 'offline':
        return <OfflineCenterView />;
      case 'validation':
        return <ValidationAdminView />;
      case 'benchmark':
        return <BenchmarkView />;
      default:
        return <DashboardView onNavigate={setCurrentView} onOpenDemo={() => setIsDemoModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] text-[#2D3436] font-sans selection:bg-[#F27D26]/20 selection:text-[#2D3436]">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />

      {/* Main Content View */}
      <main className="flex-1 pb-16">
        {renderActiveView()}
      </main>

      {/* Guided 7-Step Demo Modal for Judges */}
      <GuidedDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigate={setCurrentView}
      />

      {/* Global Footer */}
      <footer className="bg-white border-t border-[#E0E2D9] py-8 px-4 sm:px-6 lg:px-8 text-xs text-[#747D8C] print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#F27D26] text-white flex items-center justify-center font-bold text-xs font-serif">
              ᱯ
            </div>
            <div>
              <span className="font-extrabold text-[#2D3436] text-sm">BhashaMitra</span>
              <span className="text-[#747D8C] ml-1.5">• Mother-Tongue Multilingual Education (MTB-MLE)</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#747D8C] font-medium">
            <button onClick={() => setCurrentView('offline')} className="hover:text-[#F27D26] transition-colors">
              Offline Center
            </button>
            <span>•</span>
            <button onClick={() => setCurrentView('validation')} className="hover:text-[#F27D26] transition-colors">
              Linguistic Validation
            </button>
            <span>•</span>
            <button onClick={() => setCurrentView('benchmark')} className="hover:text-[#F27D26] transition-colors">
              Telemetry
            </button>
            <span>•</span>
            <button onClick={() => setIsDemoModalOpen(true)} className="text-[#F27D26] font-bold hover:underline">
              Judge Demo Flow
            </button>
          </div>

          <div className="text-[#747D8C]/80 text-[11px]">
            Class 1 Foundational Literacy &amp; Numeracy (FLN) • Ol Chiki Standard
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Wifi,
  WifiOff,
  Globe,
  Menu,
  X,
  Volume2,
  Home,
  MessageSquare,
  Mic,
  BookOpen,
  FileText,
  Layers,
  CheckSquare,
  ShieldCheck,
  BarChart2,
  HardDrive
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { LanguageOption } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenDemo: () => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenDemo,
  selectedLanguage,
  onSelectLanguage
}) => {
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    setIsOfflineSimulated(StorageService.isOfflineSimulated());
  }, []);

  const toggleOfflineSimulation = () => {
    const nextVal = !isOfflineSimulated;
    setIsOfflineSimulated(nextVal);
    StorageService.setOfflineSimulated(nextVal);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'translate', label: 'Translate', icon: MessageSquare },
    { id: 'voice', label: 'Voice Classroom', icon: Mic, highlight: true },
    { id: 'instructions', label: 'Class Instructions', icon: Volume2 },
    { id: 'lessons', label: 'FLN Lessons', icon: BookOpen },
    { id: 'worksheet', label: 'Worksheets', icon: FileText },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'assessment', label: 'Assessment', icon: CheckSquare },
    { id: 'offline', label: 'Offline Center', icon: HardDrive },
    { id: 'validation', label: 'Validation', icon: ShieldCheck },
    { id: 'benchmark', label: 'Benchmark', icon: BarChart2 },
  ];

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E2D9] shadow-xs">
      {/* Top Banner for Class & MTB-MLE Context */}
      <div className="bg-[#2D3436] text-[#FDFCF8] px-4 py-1.5 text-xs flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-[#F27D26] px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-white">
            NIPUN FLN Class 1
          </span>
          <span className="truncate text-stone-200">
            Mother-Tongue Multilingual Education (MTB-MLE) Bridge • Jharkhand Tribal Education
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Offline Switch for SIH Judges */}
          <button
            type="button"
            onClick={toggleOfflineSimulation}
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
              isOfflineSimulated
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-[#27AE60] hover:bg-[#219653] text-white'
            }`}
            title="Click to toggle offline mode simulation to verify zero-network operation"
          >
            {isOfflineSimulated ? (
              <>
                <WifiOff className="w-3 h-3" />
                <span>Simulated: OFFLINE</span>
              </>
            ) : (
              <>
                <Wifi className="w-3 h-3" />
                <span>100% Offline Ready</span>
              </>
            )}
          </button>

          {/* Guided Demo Button */}
          <button
            id="navbar-guided-demo-btn"
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F27D26] hover:bg-[#E06C17] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-orange-200" />
            <span>Judge Demo Flow</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F27D26] flex items-center justify-center text-white font-black text-xl shadow-sm border border-orange-400/40">
              ᱯ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#2D3436]">
                  Bhasha<span className="text-[#F27D26]">Mitra</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-[#2D3436] border border-[#E0E2D9]">
                  ᱚᱞ ᱪᱤᱠᱤ
                </span>
              </div>
              <p className="text-[11px] text-[#747D8C] font-medium leading-none">
                Mother-Tongue AI Assistant for Tribal Classrooms
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#F27D26]/10 text-[#F27D26] shadow-xs border border-[#F27D26]/30'
                      : item.highlight
                      ? 'bg-stone-100 text-[#2D3436] hover:bg-stone-200/80 border border-[#E0E2D9]'
                      : 'text-[#747D8C] hover:text-[#2D3436] hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F27D26]' : 'text-[#747D8C]'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Language Selector & Mobile Trigger */}
          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-[#E0E2D9] text-[#2D3436] text-xs font-bold transition-all shadow-xs"
              >
                <Globe className="w-3.5 h-3.5 text-[#F27D26]" />
                <span className="hidden sm:inline">{currentLangObj.nativeName}</span>
                <span className="sm:hidden">{currentLangObj.name}</span>
                <span className="text-[10px] bg-stone-100 text-[#2D3436] font-mono px-1 rounded border border-[#E0E2D9]">
                  {currentLangObj.script}
                </span>
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E0E2D9] py-2 z-50 animate-fade-in"
                >
                  <div className="px-3 py-1.5 border-b border-[#E0E2D9] text-[11px] font-bold text-[#747D8C] uppercase tracking-wider">
                    Tribal Mother-Tongue Languages
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-stone-50 transition-colors ${
                        selectedLanguage === lang.code ? 'bg-[#F27D26]/10 font-bold text-[#F27D26]' : 'text-[#2D3436]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#2D3436] flex items-center gap-2">
                          {lang.name}
                          <span className="text-xs text-[#747D8C] font-normal">({lang.nativeName})</span>
                        </div>
                        <div className="text-xs text-[#747D8C]">
                          Script: <span className="font-semibold text-[#2D3436]">{lang.script}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          lang.status === 'active'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {lang.status === 'active' ? 'Active' : 'Preview'}
                      </span>
                    </button>
                  ))}
                  <div className="p-2 bg-stone-50 border-t border-[#E0E2D9] text-[11px] text-[#747D8C] rounded-b-xl">
                    💡 Architecture designed for instant expansion to Ho & Mundari.
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#747D8C] hover:text-[#2D3436] hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E0E2D9] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/30'
                    : 'text-[#2D3436] hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F27D26]' : 'text-[#747D8C]'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

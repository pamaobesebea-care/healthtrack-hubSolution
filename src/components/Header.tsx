import React, { useState } from 'react';
import { 
  HeartPulse, 
  Calculator, 
  Activity, 
  BookOpen, 
  Info, 
  Mail, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  DollarSign
} from 'lucide-react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType, param?: string) => void;
  onOpenSearch: () => void;
  showAdPreview: boolean;
  onToggleAdPreview: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  showAdPreview,
  onToggleAdPreview
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [trackersDropdownOpen, setTrackersDropdownOpen] = useState(false);

  const isToolsActive = ['tools', 'bmicalc', 'caloriecalc', 'watercalc', 'idealweightcalc'].includes(currentPage);
  const isTrackersActive = ['trackers', 'weighttracker', 'sleeptracker', 'medreminder'].includes(currentPage);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-teal-700 transition flex items-center gap-1">
                HealthTrack <span className="text-teal-600 font-extrabold">Hub</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Free Healthcare Utilities</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold">
            
            {/* Home */}
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg transition ${
                currentPage === 'home' 
                  ? 'bg-sky-50 text-sky-700 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            {/* Health Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('tools')}
                className={`px-3 py-2 rounded-lg transition flex items-center gap-1 ${
                  isToolsActive 
                    ? 'bg-sky-50 text-sky-700 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calculator className="w-4 h-4 text-sky-600" />
                Health Tools
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                    <button
                      onClick={() => { onNavigate('bmicalc'); setToolsDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-sky-50 text-slate-700 hover:text-sky-900 transition text-xs font-medium flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">BMI Calculator</div>
                        <div className="text-[11px] text-slate-400">Body Mass Index & category</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { onNavigate('caloriecalc'); setToolsDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-sky-50 text-slate-700 hover:text-sky-900 transition text-xs font-medium flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">Calorie Calculator</div>
                        <div className="text-[11px] text-slate-400">BMR, TDEE & macro deficit</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { onNavigate('watercalc'); setToolsDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-sky-50 text-slate-700 hover:text-sky-900 transition text-xs font-medium flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">Water Intake Calculator</div>
                        <div className="text-[11px] text-slate-400">Hydration schedule targets</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { onNavigate('idealweightcalc'); setToolsDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-sky-50 text-slate-700 hover:text-sky-900 transition text-xs font-medium flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">Ideal Weight Calculator</div>
                        <div className="text-[11px] text-slate-400">Devine, Miller & Hamwi</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wellness Trackers Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setTrackersDropdownOpen(true)}
              onMouseLeave={() => setTrackersDropdownOpen(false)}
            >
              <button
                onClick={() => onNavigate('trackers')}
                className={`px-3 py-2 rounded-lg transition flex items-center gap-1 ${
                  isTrackersActive 
                    ? 'bg-teal-50 text-teal-700 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Activity className="w-4 h-4 text-teal-600" />
                Trackers
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {trackersDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                    <button
                      onClick={() => { onNavigate('weighttracker'); setTrackersDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-teal-900 transition text-xs font-medium flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">Weight Tracker</div>
                        <div className="text-[11px] text-slate-400">Target goals & trend chart</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { onNavigate('sleeptracker'); setTrackersDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-teal-900 transition text-xs font-medium flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">Sleep Tracker</div>
                        <div className="text-[11px] text-slate-400">Hours, quality & sleep debt</div>
                      </div>
                    </button>
                    <button
                      onClick={() => { onNavigate('medreminder'); setTrackersDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-teal-900 transition text-xs font-medium flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">Medication Reminder</div>
                        <div className="text-[11px] text-slate-400">Pill schedules & intake log</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Articles */}
            <button
              onClick={() => onNavigate('articles')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1 ${
                currentPage === 'articles' || currentPage === 'article-detail'
                  ? 'bg-emerald-50 text-emerald-700 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Articles
            </button>

            {/* About */}
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1 ${
                currentPage === 'about' 
                  ? 'bg-sky-50 text-sky-700 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Info className="w-4 h-4 text-slate-500" />
              About
            </button>

            {/* Contact */}
            <button
              onClick={() => onNavigate('contact')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1 ${
                currentPage === 'contact' 
                  ? 'bg-sky-50 text-sky-700 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-4 h-4 text-slate-500" />
              Contact
            </button>
          </nav>

          {/* Action Buttons: Search + Ad Toggle + Mobile Toggle */}
          <div className="flex items-center gap-2">
            
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition text-xs font-semibold border border-slate-200"
              title="Search tools & articles (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 bg-white rounded border border-slate-300 text-[10px] text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* Ad Preview Toggle (AdSense Readiness) */}
            <button
              onClick={onToggleAdPreview}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                showAdPreview 
                  ? 'bg-amber-50 text-amber-800 border-amber-200' 
                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              }`}
              title="Toggle Google AdSense banner placeholders"
            >
              <DollarSign className={`w-3.5 h-3.5 ${showAdPreview ? 'text-amber-600' : 'text-slate-400'}`} />
              <span>{showAdPreview ? 'Ads Visible' : 'Ads Hidden'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="space-y-1">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-100"
            >
              Home
            </button>

            <div className="py-1">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">Health Tools</div>
              <button
                onClick={() => { onNavigate('bmicalc'); setMobileMenuOpen(false); }}
                className="w-full text-left px-6 py-2 rounded-lg text-sm text-slate-700 hover:bg-sky-50"
              >
                BMI Calculator
              </button>
              <button
                onClick={() => { onNavigate('caloriecalc'); setMobileMenuOpen(false); }}
                className="w-full text-left px-6 py-2 rounded-lg text-sm text-slate-700 hover:bg-sky-50"
              >
                Calorie Calculator (BMR/TDEE)
              </button>
              <button
                onClick={() => { onNavigate('watercalc'); setMobileMenuOpen(false); }}
                className="w-full text-left px-6 py-2 rounded-lg text-sm text-slate-700 hover:bg-sky-50"
              >
                Water Intake Calculator
              </button>
              <button
                onClick={() => { onNavigate('idealweightcalc'); setMobileMenuOpen(false); }}
                className="w-full text-left px-6 py-2 rounded-lg text-sm text-slate-700 hover:bg-sky-50"
              >
                Ideal Weight Calculator
              </button>
            </div>

            <div className="py-1">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">Trackers</div>
              <button
                onClick={() => { onNavigate('weighttracker'); setMobileMenuOpen(false); }}
                className="w-full text-left px-6 py-2 rounded-lg text-sm text-slate-700 hover:bg-teal-50"
              >
                Weight Tracker
              </button>
              <button
                onClick={() => { onNavigate('sleeptracker'); setMobileMenuOpen(false); }}
                className="w-full text-left px-6 py-2 rounded-lg text-sm text-slate-700 hover:bg-teal-50"
              >
                Sleep Tracker
              </button>
              <button
                onClick={() => { onNavigate('medreminder'); setMobileMenuOpen(false); }}
                className="w-full text-left px-6 py-2 rounded-lg text-sm text-slate-700 hover:bg-teal-50"
              >
                Medication Reminder
              </button>
            </div>

            <button
              onClick={() => { onNavigate('articles'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-100"
            >
              Articles & Guides
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-100"
            >
              About & Mission
            </button>
            <button
              onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-800 hover:bg-slate-100"
            >
              Contact Support
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onToggleAdPreview}
              className="text-xs text-slate-500 font-medium flex items-center gap-1.5"
            >
              <DollarSign className="w-4 h-4 text-amber-500" />
              <span>AdSense Preview: {showAdPreview ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

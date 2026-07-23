import React, { useState, useEffect } from 'react';
import { Search, X, Calculator, Activity, BookOpen, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { PageType } from '../types';
import { HEALTH_ARTICLES } from '../data/articles';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageType, param?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search items list
  const toolsList = [
    { name: 'BMI Calculator', type: 'tool', page: 'bmicalc' as PageType, desc: 'Body Mass Index & weight category', icon: Calculator },
    { name: 'Calorie Calculator', type: 'tool', page: 'caloriecalc' as PageType, desc: 'BMR, TDEE & macro deficit goals', icon: Calculator },
    { name: 'Water Intake Calculator', type: 'tool', page: 'watercalc' as PageType, desc: 'Daily hydration requirements', icon: Calculator },
    { name: 'Ideal Weight Calculator', type: 'tool', page: 'idealweightcalc' as PageType, desc: 'Devine, Miller, Robinson & Hamwi formulas', icon: Calculator }
  ];

  const trackersList = [
    { name: 'Weight Tracker', type: 'tracker', page: 'weighttracker' as PageType, desc: 'Log weight, set targets & view progress graph', icon: Activity },
    { name: 'Sleep Tracker', type: 'tracker', page: 'sleeptracker' as PageType, desc: 'Track bedtime, sleep hours & sleep quality score', icon: Activity },
    { name: 'Medication Reminder', type: 'tracker', page: 'medreminder' as PageType, desc: 'Pill reminders, daily checklist & active log', icon: Activity }
  ];

  const pagesList = [
    { name: 'About HealthTrack Hub', type: 'page', page: 'about' as PageType, desc: 'Our mission & medical standards', icon: Shield },
    { name: 'Contact & Support', type: 'page', page: 'contact' as PageType, desc: 'Get in touch & view FAQs', icon: HelpCircle },
    { name: 'Privacy Policy', type: 'page', page: 'privacy' as PageType, desc: 'Data privacy & storage guidelines', icon: Shield },
    { name: 'Medical Disclaimer', type: 'page', page: 'disclaimer' as PageType, desc: 'Important medical terms & disclosures', icon: Shield }
  ];

  const searchLower = query.toLowerCase();

  const filteredTools = toolsList.filter(t => t.name.toLowerCase().includes(searchLower) || t.desc.toLowerCase().includes(searchLower));
  const filteredTrackers = trackersList.filter(t => t.name.toLowerCase().includes(searchLower) || t.desc.toLowerCase().includes(searchLower));
  const filteredArticles = HEALTH_ARTICLES.filter(a => 
    a.title.toLowerCase().includes(searchLower) || 
    a.category.toLowerCase().includes(searchLower) ||
    a.summary.toLowerCase().includes(searchLower)
  );
  const filteredPages = pagesList.filter(p => p.name.toLowerCase().includes(searchLower) || p.desc.toLowerCase().includes(searchLower));

  const handleSelect = (page: PageType, param?: string) => {
    onNavigate(page, param);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-teal-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search health tools, trackers, articles (e.g. BMI, Sleep, TDEE)..."
            className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="px-2.5 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md">
            ESC
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {/* Tools */}
          {filteredTools.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                Health Calculators
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {filteredTools.map(t => (
                  <button
                    key={t.page}
                    onClick={() => handleSelect(t.page)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-sky-50 text-left transition group border border-transparent hover:border-sky-200"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 text-sm group-hover:text-sky-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trackers */}
          {filteredTrackers.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                Wellness Trackers
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {filteredTrackers.map(t => (
                  <button
                    key={t.page}
                    onClick={() => handleSelect(t.page)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-teal-50 text-left transition group border border-transparent hover:border-teal-200"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 text-sm group-hover:text-teal-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {filteredArticles.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Health Articles
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {filteredArticles.map(a => (
                  <button
                    key={a.id}
                    onClick={() => handleSelect('article-detail', a.slug)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50 text-left transition group border border-transparent hover:border-emerald-200"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 text-sm group-hover:text-emerald-900">{a.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1">{a.summary}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pages */}
          {filteredPages.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Information & Support
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {filteredPages.map(p => (
                  <button
                    key={p.page}
                    onClick={() => handleSelect(p.page)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 text-left transition group"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredTools.length === 0 && filteredTrackers.length === 0 && filteredArticles.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-2 stroke-1 text-slate-300" />
              <p className="font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for "BMI", "Calorie", "Sleep", or "Hydration".</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 p-3 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-between">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-700 font-mono text-[10px]">ESC</kbd> to close</span>
          <span>HealthTrack Hub Search</span>
        </div>
      </div>
    </div>
  );
};

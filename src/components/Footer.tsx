import React from 'react';
import { HeartPulse, ShieldAlert, PhoneCall, CheckCircle2 } from 'lucide-react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-400 text-white flex items-center justify-center shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div className="font-bold text-xl tracking-tight text-white">
                HealthTrack <span className="text-teal-400 font-extrabold">Hub</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              HealthTrack Hub is a free, privacy-first healthcare utility portal empowering everyday individuals with accurate medical calculators, wellness tracking tools, and evidence-based health guidance.
            </p>

            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Evidence-Based Formulas (WHO, Mifflin-St Jeor, Devine)</span>
            </div>
          </div>

          {/* Quick Health Tools */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Calculators</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('bmicalc')} className="hover:text-teal-400 transition">
                  BMI Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('caloriecalc')} className="hover:text-teal-400 transition">
                  Calorie Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('watercalc')} className="hover:text-teal-400 transition">
                  Water Intake Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('idealweightcalc')} className="hover:text-teal-400 transition">
                  Ideal Weight Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Wellness Trackers */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Trackers</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('weighttracker')} className="hover:text-teal-400 transition">
                  Weight Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sleeptracker')} className="hover:text-teal-400 transition">
                  Sleep Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('medreminder')} className="hover:text-teal-400 transition">
                  Medication Reminder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('articles')} className="hover:text-teal-400 transition">
                  Health Blog & SEO Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Pages */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Organization</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-teal-400 transition">
                  About & Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-teal-400 transition">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-teal-400 transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclaimer')} className="hover:text-teal-400 transition text-amber-300">
                  Medical Disclaimer
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Emergency Resources Hotline */}
        <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-950/80 text-red-400 rounded-xl shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Emergency Medical Assistance</div>
              <div className="text-xs text-slate-400">
                If you are experiencing a life-threatening emergency, call 911 (US) or your local emergency services immediately.
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-300 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 font-mono">
            US Crisis Helpline: <span className="text-teal-400 font-bold">988</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HealthTrack Hub. All rights reserved. Free, open healthcare utilities.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300">Privacy</button>
            <button onClick={() => onNavigate('disclaimer')} className="hover:text-slate-300">Disclaimer</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300">Contact</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

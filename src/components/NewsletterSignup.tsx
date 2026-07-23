import React from 'react';
import { Mail, Clock, Sparkles, CheckCircle2, ShieldCheck, Bell } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'card' | 'banner';
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
        <Mail className="w-64 h-64 text-teal-300" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-teal-500/20 text-teal-300 backdrop-blur-md rounded-full text-xs font-bold border border-teal-500/30">
            <Clock className="w-3.5 h-3.5 text-teal-300" />
            <span>Coming Soon</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Launch In Preparation</span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            HealthTrack Hub Weekly Newsletter
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed max-w-2xl">
            We are currently building an exclusive weekly health & fitness digest. Soon, you will be able to receive evidence-based nutrition insights, clinical calculator updates, and fitness guides directly in your inbox.
          </p>
        </div>

        {/* Feature Preview List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span className="text-slate-200">Weekly Fitness & Nutrition Digests</span>
          </div>
          <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span className="text-slate-200">New Calculator Feature Alerts</span>
          </div>
          <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span className="text-slate-200">100% Free & Privacy-First</span>
          </div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-xs text-sky-200">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
          <span>Newsletter registration will open shortly. Stay tuned as we finalize our editorial schedule!</span>
        </div>
      </div>
    </div>
  );
};


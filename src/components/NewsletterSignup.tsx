import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'card' | 'banner';
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ variant = 'card' }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      // Store subscription in local storage
      try {
        localStorage.setItem('healthtrack_subscribed_email', email);
      } catch (err) {
        console.error('Storage error:', err);
      }
    }, 600);
  };

  if (subscribed) {
    return (
      <div className="bg-emerald-900/90 text-white border border-emerald-700/50 rounded-3xl p-6 sm:p-8 text-center space-y-3 animate-in fade-in duration-300 shadow-md">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold">You're Subscribed!</h3>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto leading-relaxed">
          Thank you for joining the HealthTrack Hub weekly wellness newsletter. We’ve sent a confirmation email to <span className="font-mono underline font-semibold">{email}</span>.
        </p>
        <button
          onClick={() => { setSubscribed(false); setEmail(''); }}
          className="text-xs text-emerald-300 hover:text-white underline pt-2 font-medium"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
        <Mail className="w-64 h-64 text-teal-300" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center sm:text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-teal-300 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-teal-300" />
          <span>Weekly Health & Fitness Intelligence</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Stay Ahead with Evidence-Based Health Tips
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed max-w-xl">
            Get practical fitness advice, medical calculator updates, nutrition breakdowns, and wellness guides delivered directly to your inbox every week.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="space-y-3 max-w-xl">
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:bg-white/20 focus:border-teal-400 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <span>Subscribing...</span>
              ) : (
                <>
                  <span>Join Free</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] text-sky-200/80 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>Zero spam guarantee. 100% private. Unsubscribe anytime in one click.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

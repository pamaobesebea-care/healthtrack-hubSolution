import React from 'react';
import { ShieldCheck, AlertTriangle, Lock } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'disclaimer';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  if (type === 'privacy') {
    return (
      <div className="space-y-8 max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs animate-in fade-in duration-200">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <Lock className="w-8 h-8 text-teal-600 shrink-0" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="text-xs text-slate-500">Last updated: July 2026 • HealthTrack Hub</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
          <p>
            At HealthTrack Hub, we prioritize user privacy. This Privacy Policy outlines how our website functions regarding data collection, client-side storage, and user privacy rights.
          </p>

          <h2 className="text-base font-bold text-slate-900">1. Client-Side Data Storage (LocalStorage)</h2>
          <p>
            HealthTrack Hub operates as a privacy-first web application. All health tools, weight logs, sleep tracking data, and medication schedules are saved directly inside your web browser’s LocalStorage. We do not transmit or store your personal health metrics on external web servers.
          </p>

          <h2 className="text-base font-bold text-slate-900">2. Cookies and Third-Party Advertising (Google AdSense)</h2>
          <p>
            To keep HealthTrack Hub free for users worldwide, we display non-intrusive advertisements served through Google AdSense. Google AdSense uses cookies to serve ads based on user visits to this site and other sites on the Internet.
          </p>

          <h2 className="text-base font-bold text-slate-900">3. GDPR & CCPA Compliance</h2>
          <p>
            Because we do not store personal identifiable information (PII) on central databases, you maintain complete ownership over your data. You can delete or clear your stored data at any time by clearing your browser cache or using our built-in tracker delete tools.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs animate-in fade-in duration-200">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Medical Disclaimer</h1>
          <p className="text-xs text-slate-500">Important Clinical Disclosure • HealthTrack Hub</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-950 font-medium">
          <strong>Important:</strong> The contents of HealthTrack Hub, including text, graphics, calculators, tools, and health articles, are intended strictly for educational and informational purposes only.
        </div>

        <h2 className="text-base font-bold text-slate-900">1. No Medical Advice</h2>
        <p>
          Calculations provided by our tools (BMI, BMR, TDEE, Ideal Weight, Water Intake) are mathematical estimates based on population averages. They do not constitute personalized medical diagnosis, clinical treatment, or professional medical advice.
        </p>

        <h2 className="text-base font-bold text-slate-900">2. Always Consult a Licensed Physician</h2>
        <p>
          Always seek the advice of a qualified physician, registered dietitian, or licensed medical healthcare professional with any questions regarding a medical condition, weight management regimen, or prescription medication plan.
        </p>

        <h2 className="text-base font-bold text-slate-900">3. Emergency Situations</h2>
        <p>
          If you think you may have a medical emergency, call 911 (US) or your local emergency services hotline immediately. Do not rely on digital tools or articles for emergency medical decisions.
        </p>
      </div>
    </div>
  );
};

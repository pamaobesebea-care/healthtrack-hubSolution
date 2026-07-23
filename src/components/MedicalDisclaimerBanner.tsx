import React, { useState } from 'react';
import { AlertTriangle, X, ShieldCheck } from 'lucide-react';

export const MedicalDisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-sky-900 text-sky-10 border-b border-sky-800 text-xs py-2.5 px-4 no-print transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-sky-100">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
          <p className="leading-snug">
            <strong className="text-white font-semibold">Medical Notice:</strong> HealthTrack Hub tools and content are strictly for informational and educational purposes. They do not constitute medical diagnosis, treatment, or professional clinical advice. Always consult a licensed healthcare physician for personalized medical guidance.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-sky-300 hover:text-white transition p-1 rounded hover:bg-sky-800 shrink-0"
          title="Dismiss notice"
          aria-label="Dismiss disclaimer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

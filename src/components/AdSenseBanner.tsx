import React from 'react';
import { DollarSign, Info } from 'lucide-react';

interface AdSenseBannerProps {
  type?: 'banner' | 'rectangle' | 'in-feed';
  slotId?: string;
  className?: string;
  showAdPreview?: boolean;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  type = 'banner',
  slotId = '0000000000',
  className = '',
  showAdPreview = true
}) => {
  if (!showAdPreview) return null;

  return (
    <div className={`ad-banner no-print my-6 text-center ${className}`}>
      <div className="inline-block w-full max-w-4xl bg-slate-100 border border-dashed border-slate-300 rounded-xl p-3 sm:p-4 text-slate-500 shadow-xs relative overflow-hidden group">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-400 font-medium mb-1.5 px-1">
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-teal-600" />
            Sponsored Advertisement
          </span>
          <span className="text-[10px] font-mono text-slate-400">AdSense Slot #{slotId}</span>
        </div>

        {/* Ad Placeholder Visual */}
        <div className="bg-gradient-to-r from-sky-50 via-teal-50 to-emerald-50 rounded-lg border border-sky-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-700">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
              +
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-800">
                Partner Health & Wellness Offer
              </p>
              <p className="text-xs text-slate-500">
                Explore personalized vitamin subscriptions & telehealth wellness consultations.
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition shadow-xs whitespace-nowrap">
            Learn More
          </button>
        </div>

        <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-slate-400">
          <Info className="w-3 h-3" />
          <span>Ads help keep HealthTrack Hub free for all users worldwide.</span>
        </div>
      </div>
    </div>
  );
};

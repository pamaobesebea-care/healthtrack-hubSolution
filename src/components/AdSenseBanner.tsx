import React from 'react';

interface AdSenseBannerProps {
  type?: 'banner' | 'rectangle' | 'in-feed';
  slotId?: string;
  className?: string;
  showAdPreview?: boolean;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = () => {
  return null;
};


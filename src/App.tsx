import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MedicalDisclaimerBanner } from './components/MedicalDisclaimerBanner';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Pages & Tools
import { HomePage } from './components/pages/HomePage';
import { BMICalculator } from './components/tools/BMICalculator';
import { CalorieCalculator } from './components/tools/CalorieCalculator';
import { WaterCalculator } from './components/tools/WaterCalculator';
import { IdealWeightCalculator } from './components/tools/IdealWeightCalculator';

// Trackers
import { WeightTracker } from './components/trackers/WeightTracker';
import { SleepTracker } from './components/trackers/SleepTracker';
import { MedicationReminder } from './components/trackers/MedicationReminder';

// Pages
import { ArticlesPage } from './components/pages/ArticlesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | undefined>(undefined);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleNavigate = (page: PageType, param?: string) => {
    if (page === 'article-detail' && param) {
      setSelectedArticleSlug(param);
    } else {
      setSelectedArticleSlug(undefined);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900">
      
      {/* Medical Disclaimer Announcement */}
      <MedicalDisclaimerBanner />

      {/* Main Header Bar */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Switcher */}
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={handleNavigate} 
            onOpenSearch={() => setSearchModalOpen(true)}
          />
        )}

        {(currentPage === 'tools' || currentPage === 'bmicalc') && (
          <BMICalculator onNavigate={handleNavigate} />
        )}

        {currentPage === 'caloriecalc' && (
          <CalorieCalculator />
        )}

        {currentPage === 'watercalc' && (
          <WaterCalculator />
        )}

        {currentPage === 'idealweightcalc' && (
          <IdealWeightCalculator />
        )}

        {(currentPage === 'trackers' || currentPage === 'weighttracker') && (
          <WeightTracker />
        )}

        {currentPage === 'sleeptracker' && (
          <SleepTracker />
        )}

        {currentPage === 'medreminder' && (
          <MedicationReminder />
        )}

        {(currentPage === 'articles' || currentPage === 'article-detail') && (
          <ArticlesPage 
            selectedSlug={selectedArticleSlug} 
            onNavigate={handleNavigate} 
          />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'privacy' && (
          <LegalPage type="privacy" />
        )}

        {currentPage === 'disclaimer' && (
          <LegalPage type="disclaimer" />
        )}

      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { PageType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MedicalDisclaimerBanner } from './components/MedicalDisclaimerBanner';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { getUrlForRoute, parseRouteFromPath, updatePageMeta } from './utils/router';

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
  const initialRoute = parseRouteFromPath(window.location.pathname);
  const [currentPage, setCurrentPage] = useState<PageType>(initialRoute.page);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | undefined>(initialRoute.param);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sync initial title and meta tags
  useEffect(() => {
    updatePageMeta(initialRoute.page, initialRoute.param);
  }, []);

  // Handle popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromPath(window.location.pathname);
      setCurrentPage(route.page);
      setSelectedArticleSlug(route.param);
      updatePageMeta(route.page, route.param);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((page: PageType, param?: string) => {
    const targetPath = getUrlForRoute(page, param);
    
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    if (page === 'article-detail' && param) {
      setSelectedArticleSlug(param);
    } else {
      setSelectedArticleSlug(undefined);
    }

    setCurrentPage(page);
    updatePageMeta(page, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

import { PageType } from '../types';
import { HEALTH_ARTICLES } from '../data/articles';

export interface RouteState {
  page: PageType;
  param?: string;
}

/**
 * Returns the clean, SEO-friendly canonical path for a given route
 */
export function getUrlForRoute(page: PageType, param?: string): string {
  switch (page) {
    case 'home':
      return '/';
    case 'bmicalc':
    case 'tools':
      return '/bmi-calculator';
    case 'caloriecalc':
      return '/calorie-calculator';
    case 'watercalc':
      return '/water-calculator';
    case 'idealweightcalc':
      return '/ideal-weight-calculator';
    case 'weighttracker':
    case 'trackers':
      return '/weight-tracker';
    case 'sleeptracker':
      return '/sleep-tracker';
    case 'medreminder':
      return '/medication-reminder';
    case 'articles':
      return '/articles';
    case 'article-detail':
      return param ? `/articles/${param}` : '/articles';
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    case 'privacy':
      return '/privacy';
    case 'disclaimer':
      return '/disclaimer';
    default:
      return '/';
  }
}

/**
 * Parses the current pathname and returns the matching RouteState
 */
export function parseRouteFromPath(pathname: string): RouteState {
  // Normalize path by removing trailing slash (except root)
  const path = pathname.length > 1 && pathname.endsWith('/') 
    ? pathname.slice(0, -1) 
    : pathname;

  if (path === '' || path === '/' || path === '/home') {
    return { page: 'home' };
  }

  // Calculators
  if (path === '/bmi-calculator' || path === '/bmicalc' || path === '/tools') {
    return { page: 'bmicalc' };
  }
  if (path === '/calorie-calculator' || path === '/caloriecalc') {
    return { page: 'caloriecalc' };
  }
  if (path === '/water-calculator' || path === '/watercalc') {
    return { page: 'watercalc' };
  }
  if (path === '/ideal-weight-calculator' || path === '/idealweightcalc') {
    return { page: 'idealweightcalc' };
  }

  // Trackers
  if (path === '/weight-tracker' || path === '/weighttracker' || path === '/trackers') {
    return { page: 'weighttracker' };
  }
  if (path === '/sleep-tracker' || path === '/sleeptracker') {
    return { page: 'sleeptracker' };
  }
  if (path === '/medication-reminder' || path === '/medreminder') {
    return { page: 'medreminder' };
  }

  // Articles Hub & Articles Detail
  if (path === '/articles') {
    return { page: 'articles' };
  }
  if (path.startsWith('/articles/') || path.startsWith('/article/')) {
    const slug = path.replace(/^\/(articles|article)\//, '');
    if (slug) {
      return { page: 'article-detail', param: slug };
    }
    return { page: 'articles' };
  }

  // Organization & Legal Pages
  if (path === '/about') {
    return { page: 'about' };
  }
  if (path === '/contact') {
    return { page: 'contact' };
  }
  if (path === '/privacy') {
    return { page: 'privacy' };
  }
  if (path === '/disclaimer') {
    return { page: 'disclaimer' };
  }

  // Fallback to home
  return { page: 'home' };
}

/**
 * Updates document title and meta description dynamically for SEO
 */
export function updatePageMeta(page: PageType, param?: string) {
  let title = 'HealthTrack Hub - Free Health Calculators, Trackers & Educational Guides';
  let description = 'Empowering everyday health decisions with accurate medical calculators, private daily wellness trackers, and evidence-based clinical articles.';

  switch (page) {
    case 'bmicalc':
    case 'tools':
      title = 'Free BMI Calculator - Calculate Body Mass Index & Category | HealthTrack Hub';
      description = 'Calculate your Body Mass Index (BMI), ponderal index, and WHO health weight range with our free, medically accurate BMI calculator.';
      break;
    case 'caloriecalc':
      title = 'Free Calorie Calculator - BMR, TDEE & Caloric Deficit Goals | HealthTrack Hub';
      description = 'Calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor formula for weight loss or muscle gain.';
      break;
    case 'watercalc':
      title = 'Free Water Intake Calculator - Daily Hydration Schedule | HealthTrack Hub';
      description = 'Determine your daily recommended water intake based on body mass, climate, and exercise sweat rate with an interactive hydration schedule.';
      break;
    case 'idealweightcalc':
      title = 'Free Ideal Weight Calculator - Devine, Miller & Hamwi Formulas | HealthTrack Hub';
      description = 'Compare four validated clinical ideal body weight (IBW) formulas to establish healthy target ranges for men and women.';
      break;
    case 'weighttracker':
    case 'trackers':
      title = 'Free Weight Tracker - Body Weight Log & Trend Graph | HealthTrack Hub';
      description = 'Track daily body weight entries, monitor progress toward target goals, and visualize moving average trend graphs in your browser.';
      break;
    case 'sleeptracker':
      title = 'Free Sleep Tracker - Hours, Quality Score & Sleep Debt | HealthTrack Hub';
      description = 'Log nightly sleep duration, rate sleep quality scores, identify lifestyle factors, and calculate cumulative sleep debt.';
      break;
    case 'medreminder':
      title = 'Free Medication Reminder - Daily Pill Checklist & Schedule | HealthTrack Hub';
      description = 'Set up daily prescription medication reminders, track active dosages, and log taken or skipped pills with 100% browser privacy.';
      break;
    case 'articles':
      title = 'Evidence-Based Health Articles & Clinical Guides | HealthTrack Hub';
      description = 'Read peer-reviewed health guides on nutrition, metabolic science, fitness, sleep hygiene, and medication safety.';
      break;
    case 'article-detail': {
      const art = HEALTH_ARTICLES.find(a => a.slug === param);
      if (art) {
        title = `${art.title} | HealthTrack Hub`;
        description = art.summary;
      } else {
        title = 'Health Article & Educational Guide | HealthTrack Hub';
      }
      break;
    }
    case 'about':
      title = 'About HealthTrack Hub - Mission & Educational Medical Standards';
      description = 'Learn about HealthTrack Hub’s mission to provide free, privacy-first healthcare utilities built on evidence-based medical formulas.';
      break;
    case 'contact':
      title = 'Contact Support & Help Center | HealthTrack Hub';
      description = 'Get in touch with the HealthTrack Hub support team or explore our comprehensive Help & Trust FAQ section.';
      break;
    case 'privacy':
      title = 'Privacy Policy & Data Security | HealthTrack Hub';
      description = 'Read our complete privacy policy. Learn why 100% of your health entries remain strictly stored on your local browser.';
      break;
    case 'disclaimer':
      title = 'Clinical Medical Disclaimer | HealthTrack Hub';
      description = 'Official medical disclaimer regarding educational usage, health calculators, and clinical advice boundaries.';
      break;
  }

  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);
}

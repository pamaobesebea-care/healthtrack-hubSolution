import React from 'react';
import { 
  Calculator, 
  Activity, 
  BookOpen, 
  HeartPulse, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Droplet, 
  Scale, 
  Moon, 
  Pill, 
  Search, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { PageType } from '../../types';
import { HEALTH_ARTICLES } from '../../data/articles';
import { NewsletterSignup } from '../NewsletterSignup';
import { FAQSection } from '../FAQSection';

interface HomePageProps {
  onNavigate: (page: PageType, param?: string) => void;
  onOpenSearch: () => void;
  showAdPreview?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-200">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-sky-950 to-teal-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none p-12">
          <HeartPulse className="w-96 h-96 text-teal-400" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-teal-300 border border-white/10">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>100% Free Evidence-Based Healthcare Suite</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-300 to-emerald-300">Health & Wellness</span> Intelligence Portal
          </h1>

          <p className="text-sky-100 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Empowering everyday health decisions with accurate medical calculators, private daily wellness trackers, and evidence-based clinical articles.
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('bmicalc')}
              className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg hover:scale-102 transition"
            >
              <Calculator className="w-4 h-4" />
              Launch BMI Calculator
            </button>

            <button
              onClick={() => onNavigate('caloriecalc')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold text-sm flex items-center gap-2 backdrop-blur-md transition border border-white/20"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              Calorie & TDEE Tool
            </button>

            <button
              onClick={onOpenSearch}
              className="px-4 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
            >
              <Search className="w-4 h-4 text-teal-400" />
              Search All Tools
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-sky-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>WHO & Mifflin-St Jeor Formulas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Private Browser Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>No Registration Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Suite Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-600">Calculators & Estimators</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Interactive Clinical Health Calculators
            </h2>
          </div>
          <button
            onClick={() => onNavigate('tools')}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 transition"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* BMI */}
          <div 
            onClick={() => onNavigate('bmicalc')}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-sky-300 transition cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-sky-700 transition">BMI Calculator</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Calculate Body Mass Index, healthy weight parameters, Ponderal index, and WHO category boundaries.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
              <span>Calculate BMI</span> <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Calorie */}
          <div 
            onClick={() => onNavigate('caloriecalc')}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-teal-300 transition cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition">Calorie Calculator</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Determine BMR & TDEE energy burn and set custom deficit goals with macro breakdowns.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
              <span>Calculate Calories</span> <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Water */}
          <div 
            onClick={() => onNavigate('watercalc')}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-sky-300 transition cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-sky-700 transition">Water Intake Calculator</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Calculate daily hydration goals based on weight, workout intensity, and climate environment.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
              <span>Calculate Water Goal</span> <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Ideal Weight */}
          <div 
            onClick={() => onNavigate('idealweightcalc')}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-teal-300 transition cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition">Ideal Weight Calculator</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compare 4 recognized formulas (Devine, Robinson, Miller, Hamwi) for optimal body weight.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
              <span>Calculate Ideal Weight</span> <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

        </div>
      </section>

      {/* Wellness Trackers Suite Section */}
      <section className="bg-slate-100 rounded-3xl p-8 sm:p-10 border border-slate-200 space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700">Daily Progress Monitoring</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Wellness Trackers with Local Storage
          </h2>
          <p className="text-slate-500 text-sm mt-1">Your data stays 100% private in your browser. Export or import anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Weight Tracker */}
          <div 
            onClick={() => onNavigate('weighttracker')}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Weight Tracker & Graph</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track date-stamped weight entries, set target goals, and visualize long-term progress with interactive graphs.
            </p>
          </div>

          {/* Sleep Tracker */}
          <div 
            onClick={() => onNavigate('sleeptracker')}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Moon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Sleep Tracker & Quality Journal</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Log bedtime, wake time, quality star ratings, and lifestyle factors to eliminate sleep debt.
            </p>
          </div>

          {/* Medication Reminder */}
          <div 
            onClick={() => onNavigate('medreminder')}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition cursor-pointer space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Pill className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Medication Reminder & Pill Log</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Never miss a prescription dose. Maintain an active daily pill checklist and audio reminder chimes.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Evidence-Based Health Blog</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              SEO Health Articles & Guides
            </h2>
          </div>
          <button
            onClick={() => onNavigate('articles')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HEALTH_ARTICLES.slice(0, 2).map(art => (
            <div 
              key={art.id}
              onClick={() => onNavigate('article-detail', art.slug)}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full font-bold">{art.category}</span>
                  <span>{art.readTimeMinutes} min read</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 hover:text-emerald-700 transition leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img src={art.author.avatar} alt={art.author.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="font-semibold text-slate-700">{art.author.name}</span>
                </div>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <FAQSection />

      {/* Newsletter Signup Section */}
      <NewsletterSignup />

    </div>
  );
};

import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Calculator, 
  AlertTriangle, 
  ShieldCheck, 
  Search,
  Sparkles,
  Info
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'privacy' | 'accuracy' | 'disclaimer' | 'usage';
  question: string;
  answer: string | React.ReactNode;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'data-privacy',
    category: 'privacy',
    question: 'How is my personal health data handled and stored on HealthTrack Hub?',
    answer: (
      <div className="space-y-2">
        <p>
          At HealthTrack Hub, user privacy and data sovereignty are fundamental priorities. All personal health inputs—including weight entries, sleep duration logs, medication checklists, and calculator values—are stored <strong>strictly inside your device’s browser using client-side LocalStorage</strong>.
        </p>
        <p>
          Your health data is <strong>never transmitted to, processed by, or saved on remote cloud servers</strong> unless an optional user account system is introduced in the future. You maintain complete ownership of your data and can export, import, or erase it at any time.
        </p>
      </div>
    )
  },
  {
    id: 'calculator-accuracy',
    category: 'accuracy',
    question: 'Are the health calculator results on HealthTrack Hub medically accurate?',
    answer: (
      <div className="space-y-2">
        <p>
          Our calculators provide <strong>educational and clinical estimates</strong> derived from peer-reviewed medical standards and established scientific equations:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>BMI Calculator:</strong> Uses World Health Organization (WHO) body mass index classifications.</li>
          <li><strong>Calorie & TDEE Calculator:</strong> Employs the Mifflin-St Jeor equation, widely recognized in clinical nutrition as the gold standard for basal metabolic rate (BMR).</li>
          <li><strong>Ideal Weight Calculator:</strong> Compares four validated clinical formulas (Devine, Robinson, Miller, and Hamwi).</li>
          <li><strong>Water Intake Calculator:</strong> Adjusts hydration baselines according to body mass, exercise sweat loss, and climate factors.</li>
        </ul>
        <p className="text-slate-500 italic">
          Note: These estimates are based on population statistical averages and do not substitute for individual clinical assessment by a licensed healthcare provider.
        </p>
      </div>
    )
  },
  {
    id: 'medical-disclaimer',
    category: 'disclaimer',
    question: 'What is the official Medical Disclaimer for HealthTrack Hub?',
    answer: (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Clinical Medical Disclosure & Notice</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed">
          The contents of HealthTrack Hub, including text, graphics, health calculators, wellness trackers, and articles, are created solely for <strong>informational and educational purposes</strong>. They do not constitute professional medical advice, clinical diagnosis, or treatment recommendations.
        </p>
        <p className="text-xs sm:text-sm leading-relaxed">
          Always consult a licensed physician, registered dietitian, or qualified healthcare professional before making health changes or starting a weight loss or medication regimen. <strong>In a medical emergency, call 911 (US) or local emergency services immediately.</strong>
        </p>
      </div>
    )
  },
  {
    id: 'account-requirement',
    category: 'usage',
    question: 'Do I need an account, subscription, or registration to use HealthTrack Hub?',
    answer: (
      <p>
        No. HealthTrack Hub is <strong>100% free and accessible without registration</strong>. You can instantly access all interactive calculators, daily tracking tools, and evidence-based guides without creating an account or supplying personal contact details.
      </p>
    )
  },
  {
    id: 'calorie-formulas',
    category: 'accuracy',
    question: 'How does the Calorie Calculator estimate my BMR, TDEE, and macronutrient targets?',
    answer: (
      <p>
        The Calorie Calculator first computes your <strong>Basal Metabolic Rate (BMR)</strong> using the Mifflin-St Jeor formula based on age, biological gender, height, and weight. It then applies activity level multipliers (sedentary, moderate, intense) to calculate your <strong>Total Daily Energy Expenditure (TDEE)</strong>, adjusting calorie targets and macro splits for safe weight loss, maintenance, or muscle gain goals.
      </p>
    )
  },
  {
    id: 'trust-seo',
    category: 'usage',
    question: 'How does HealthTrack Hub ensure high-quality, trustworthy health information?',
    answer: (
      <p>
        HealthTrack Hub adheres strictly to <strong>E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness)</strong> guidelines. Our tools and articles reference accredited medical organizations (e.g., WHO, CDC, NIH) and peer-reviewed journals. All guides display author profiles, clinical reference lists, and last-updated timestamps for transparent editorial standards.
      </p>
    )
  }
];

export const FAQSection: React.FC<{ defaultCategory?: string }> = () => {
  const [openId, setOpenId] = useState<string | null>('data-privacy');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'privacy' | 'accuracy' | 'disclaimer' | 'usage'>('all');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQ_DATA.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in duration-200" id="faq-section">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Help & Trust Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Transparent answers regarding data privacy, calculator formulas, clinical medical disclaimers, and platform standards.
          </p>
        </div>

        {/* Search Bar within FAQ */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl transition ${
            activeCategory === 'all' 
              ? 'bg-slate-900 text-white shadow-xs font-bold' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Questions ({FAQ_DATA.length})
        </button>
        <button
          onClick={() => setActiveCategory('privacy')}
          className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
            activeCategory === 'privacy' 
              ? 'bg-teal-700 text-white shadow-xs font-bold' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          Data Privacy
        </button>
        <button
          onClick={() => setActiveCategory('accuracy')}
          className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
            activeCategory === 'accuracy' 
              ? 'bg-sky-700 text-white shadow-xs font-bold' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          Calculator Formulas
        </button>
        <button
          onClick={() => setActiveCategory('disclaimer')}
          className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
            activeCategory === 'disclaimer' 
              ? 'bg-amber-700 text-white shadow-xs font-bold' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Medical Disclaimer
        </button>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
            No matching questions found for "{searchQuery}". Try searching for terms like "privacy", "formula", or "disclaimer".
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`border rounded-2xl transition duration-150 overflow-hidden ${
                  isOpen 
                    ? 'border-teal-300 bg-teal-50/20 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500/20 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    {faq.category === 'privacy' && <Lock className="w-4 h-4 text-teal-600 shrink-0" />}
                    {faq.category === 'accuracy' && <Calculator className="w-4 h-4 text-sky-600 shrink-0" />}
                    {faq.category === 'disclaimer' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                    {faq.category === 'usage' && <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />}
                    <span>{faq.question}</span>
                  </span>
                  <div className={`p-1.5 rounded-lg transition-transform ${isOpen ? 'bg-teal-100 text-teal-800 rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100/80 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Prominent Footer Callout */}
      <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold">100% Client-Side Privacy Guarantee</div>
            <div className="text-xs text-slate-400">Your health parameters are never sent to external servers or logged in central databases.</div>
          </div>
        </div>
      </div>

    </section>
  );
};

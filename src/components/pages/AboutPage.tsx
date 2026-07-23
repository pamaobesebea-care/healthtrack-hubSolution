import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Award, 
  CheckCircle2, 
  HeartPulse, 
  BookOpen, 
  Scale, 
  Sparkles
} from 'lucide-react';
import { FAQSection } from '../FAQSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-teal-800 text-white rounded-3xl p-8 sm:p-12 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-300" />
          <span>Our Clinical Commitment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">About HealthTrack Hub</h1>
        <p className="text-sky-100 text-base leading-relaxed">
          HealthTrack Hub is dedicated to providing free, accessible, and privacy-respecting healthcare calculators and wellness tools to individuals worldwide.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Our Core Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Democratizing clinical health tools so anyone can calculate their BMI, daily calorie requirements, ideal weight, and hydration schedule without paywalls or forced user accounts.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Evidence-Based Formulas</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All calculators implement peer-reviewed algorithms from the World Health Organization (WHO), Mifflin-St Jeor equation, and Devine/Hamwi body frame standards.
          </p>
        </div>

      </div>

      {/* Scientific Standard Details */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Scientific Standards & Equations</h2>
        
        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-xl space-y-1">
            <div className="font-bold text-slate-900">1. Body Mass Index (BMI) & Ponderal Index</div>
            <p className="text-slate-600">Calculated as Weight(kg) / Height(m)². Categories conform strictly to the World Health Organization international classification.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-1">
            <div className="font-bold text-slate-900">2. Basal Metabolic Rate (BMR)</div>
            <p className="text-slate-600">Uses the Mifflin-St Jeor equation, proven in clinical studies to be among the most accurate estimates of resting metabolic rate.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-1">
            <div className="font-bold text-slate-900">3. Ideal Body Weight Formulas</div>
            <p className="text-slate-600">Calculates and compares the Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964) equations.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />

    </div>
  );
};

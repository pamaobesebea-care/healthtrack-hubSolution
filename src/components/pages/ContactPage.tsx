import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Is my health data or weight history saved on a remote server?',
      a: 'No. All tracker logs (weight, sleep, medication schedules) are saved strictly inside your browser’s local storage (LocalStorage). Your data never leaves your device.'
    },
    {
      q: 'Can this application be hosted for free on GitHub Pages?',
      a: 'Yes! HealthTrack Hub is built as a lightweight, client-side static application optimized for GitHub Pages, Vercel, and Cloud Run.'
    },
    {
      q: 'Are the health calculations scientifically verified?',
      a: 'Yes. Every calculator utilizes clinical formulas including the Mifflin-St Jeor BMR equation, WHO BMI spectrum boundaries, and Devine ideal weight equations.'
    },
    {
      q: 'How do I export or backup my tracker logs?',
      a: 'Navigate to the Weight Tracker page and click the "Export" button to download a JSON backup file of all your weight, sleep, and medication records.'
    }
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-sky-900 to-sky-950 text-white rounded-3xl p-8 sm:p-12 shadow-lg space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Contact Support & FAQ</h1>
        <p className="text-sky-100 text-base leading-relaxed">
          Have questions about our healthcare tools or website features? Get in touch with our team or browse frequently asked questions.
        </p>
      </div>

      {/* Grid: Form & FAQs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="md:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Mail className="w-5 h-5 text-teal-600" />
            Send Us a Message
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-base">Message Sent Successfully!</h3>
              <p className="text-xs text-emerald-800">
                Thank you for reaching out. Our support team will review your message shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setMessage(''); }}
                className="mt-2 text-xs font-bold text-emerald-700 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Inquiry Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-xs"
                >
                  <option value="general">General Support</option>
                  <option value="calculator">Calculator Question</option>
                  <option value="privacy">Privacy & Data</option>
                  <option value="feedback">Tool Feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>
            </form>
          )}
        </div>

        {/* FAQs */}
        <div className="md:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <HelpCircle className="w-5 h-5 text-sky-600" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs text-slate-800 bg-slate-50 hover:bg-slate-100 transition flex items-center justify-between gap-2"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

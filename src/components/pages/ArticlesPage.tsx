import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Printer, 
  CheckCircle, 
  Sparkles, 
  User, 
  Tag, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { HEALTH_ARTICLES } from '../../data/articles';
import { HealthArticle, PageType } from '../../types';

interface ArticlesPageProps {
  selectedSlug?: string;
  onNavigate: (page: PageType, param?: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ selectedSlug, onNavigate }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Nutrition', 'Fitness', 'Weight Management', 'Sleep & Wellness', 'Preventive Care'];

  // Detail view if slug is provided
  const articleDetail = HEALTH_ARTICLES.find(a => a.slug === selectedSlug);

  if (articleDetail) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
        
        {/* Back Button */}
        <button
          onClick={() => onNavigate('articles')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition no-print"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </button>

        {/* Article Header Container */}
        <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full font-bold">
                {articleDetail.category}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {articleDetail.readTimeMinutes} min read
              </span>
              <span className="text-slate-400">• Published {articleDetail.publishedDate}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {articleDetail.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {articleDetail.summary}
            </p>
          </div>

          {/* Author Card */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={articleDetail.author.avatar}
                alt={articleDetail.author.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="font-bold text-slate-900 text-sm">{articleDetail.author.name}</div>
                <div className="text-xs text-slate-500">{articleDetail.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 no-print">
              <button
                onClick={() => window.print()}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition"
                title="Print Article"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="prose prose-slate max-w-none space-y-8 pt-4">
            {articleDetail.content.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {p}
                  </p>
                ))}

                {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                  <div className="my-4 p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-2">
                    <div className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Key Takeaways
                    </div>
                    <ul className="space-y-1 text-xs text-emerald-900 list-disc list-inside">
                      {sec.keyTakeaways.map((take, tIdx) => (
                        <li key={tIdx}>{take}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* SEO Tags */}
          <div className="pt-6 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Topic Keywords
            </div>
            <div className="flex flex-wrap gap-1.5">
              {articleDetail.metaKeywords.map(kw => (
                <span key={kw} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Cross-Link to Calculators */}
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-sky-950 text-sm">Put this health knowledge into practice</div>
              <div className="text-xs text-sky-700 mt-0.5">Use HealthTrack Hub's free calculators to monitor your metrics.</div>
            </div>
            <button
              onClick={() => onNavigate('tools')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1 shrink-0"
            >
              <span>Explore Calculators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </article>

      </div>
    );
  }

  // Articles List View
  const filteredArticles = HEALTH_ARTICLES.filter(a => {
    const matchesCat = categoryFilter === 'All' || a.category === categoryFilter;
    const matchesQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-sky-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
          <BookOpen className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Medically Reviewed Articles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Health Education & Guides</h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Evidence-based medical articles on nutrition, fitness, metabolic health, sleep hygiene, and preventive care.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, keyword, or topic..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                categoryFilter === cat 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(art => (
          <div
            key={art.id}
            onClick={() => onNavigate('article-detail', art.slug)}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full font-bold">{art.category}</span>
                <span>{art.readTimeMinutes} min read</span>
              </div>

              <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">{art.author.name}</span>
              <span className="font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}

        {filteredArticles.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1" />
            <p className="font-medium">No articles found matching "{searchQuery}".</p>
          </div>
        )}
      </div>

    </div>
  );
};

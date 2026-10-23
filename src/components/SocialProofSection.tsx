import React, { useState } from 'react';
import { SOCIAL_TESTIMONIALS } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';
import { Quote, ShieldCheck, CheckCircle2, MessageSquareQuote } from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  const [filterYear, setFilterYear] = useState<string>('all');

  const years = ['all', '2026', '2025', '2024'];

  const filteredTestimonials = filterYear === 'all'
    ? SOCIAL_TESTIMONIALS
    : SOCIAL_TESTIMONIALS.filter(t => t.year === filterYear);

  return (
    <section id="testimonials" className="py-16 md:py-24 border-b border-[#F7F5EE]/10 bg-[#071A10]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#B7F34A] mb-2 flex items-center gap-2">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              <span>Public Statements & Testimonials</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F7F5EE]">
              Verified Social Proof
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8FA895] max-w-2xl leading-relaxed">
              Attributable public endorsements, peer statements, and collaborative testimonials from university co-leads, regional event directors, and protocol core teams.
            </p>
          </div>

          {/* Interactive Year Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#0A2316] border border-[#F7F5EE]/10 rounded-lg shrink-0">
            {years.map((yr) => (
              <button
                key={yr}
                onClick={() => {
                  soundEngine.playClick();
                  setFilterYear(yr);
                }}
                className={`px-3 py-1.5 text-xs font-mono uppercase rounded-md transition-colors cursor-pointer ${
                  filterYear === yr
                    ? 'bg-[#B7F34A] text-[#071A10] font-semibold'
                    : 'text-[#8FA895] hover:text-[#F7F5EE]'
                }`}
              >
                {yr === 'all' ? 'All Statements' : yr}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#0A2316] border border-[#F7F5EE]/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#F7F5EE]/20 transition-all duration-200"
            >
              <div>
                {/* Quote Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Quote className="h-6 w-6 text-[#B7F34A]/50" />
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#8FA895]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#B7F34A]" />
                    <span>Verified</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums text-[#F7F5EE]">{t.year}</span>
                  </div>
                </div>

                {/* Quote Text */}
                <p className="font-serif italic text-base sm:text-lg text-[#F7F5EE]/90 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="mt-6 pt-4 border-t border-[#F7F5EE]/10">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#14532D] border border-[#B7F34A]/30 flex items-center justify-center text-xs font-mono font-bold text-[#B7F34A] shrink-0">
                    {t.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-sans font-semibold text-sm text-[#F7F5EE] truncate">
                      {t.author}
                    </div>
                    <div className="text-xs text-[#8FA895] truncate font-sans">
                      {t.role}, {t.organization}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-[11px] font-mono text-[#8FA895]/80 bg-[#071A10] px-2.5 py-1.5 rounded border border-[#F7F5EE]/5 truncate">
                  Context: {t.context}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

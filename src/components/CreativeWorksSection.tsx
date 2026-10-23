import React from 'react';
import { WEB2_PROJECTS } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';
import { BookOpen, Music, Camera, ExternalLink, Sparkles } from 'lucide-react';

export const CreativeWorksSection: React.FC = () => {
  return (
    <section id="creative-works" className="py-16 md:py-24 border-b border-[#F7F5EE]/10 bg-[#071A10]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#B7F34A] mb-2 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Creative Roots & Narrative</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F7F5EE]">
              Literature, Music & Essays
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8FA895] max-w-2xl leading-relaxed">
              Before leading decentralized community operations, Drapevangelist built a dedicated following through independent recording artistry, literary novels, and confessional essays.
            </p>
          </div>

          <div className="text-xs font-mono text-[#8FA895] shrink-0">
            <span>Audiomack · Substack · Fiction</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEB2_PROJECTS.map((project) => {
            const isMusic = project.id === 'audiomack-discography';
            const isBook = project.id === 'drowning-season' || project.id === 'fully-booked';
            const isGallery = project.id === 'photography-gallery';

            return (
              <div
                key={project.id}
                className="bg-[#0A2316] border border-[#F7F5EE]/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#F7F5EE]/20 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8FA895] mb-3">
                    <span className="text-[#B7F34A]">{project.tag}</span>
                    <span className="tabular-nums">{project.meta}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F5EE] tracking-tight">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#F7F5EE]/80 font-sans leading-relaxed">
                    {project.fullDescription || project.summary}
                  </p>

                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-[#F7F5EE]/5 pt-3">
                      {project.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="text-xs text-[#8FA895] flex items-start gap-2">
                          <span className="text-[#B7F34A] mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#F7F5EE]/10 flex items-center justify-between">
                  {project.stats && project.stats[0] ? (
                    <span className="text-xs font-mono text-[#8FA895]">
                      {project.stats[0].label}: <strong className="text-[#F7F5EE]">{project.stats[0].value}</strong>
                    </span>
                  ) : <span />}

                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B7F34A] hover:underline"
                    >
                      <span>{project.linkLabel || 'Explore'}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-[#8FA895]/60 italic">Documented Project</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

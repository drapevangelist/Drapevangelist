import React, { useState } from 'react';
import { CHRONOLOGICAL_CHAPTERS } from '../data/portfolioData';
import { ChronologicalChapter } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { Calendar, CheckCircle2, ChevronRight, Award, Compass, MapPin, Building2 } from 'lucide-react';

export const ChronologicalTimeline: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chapter-2-uniport');

  const selectedChapter = CHRONOLOGICAL_CHAPTERS.find(c => c.id === selectedChapterId) || CHRONOLOGICAL_CHAPTERS[0];

  const handleSelectChapter = (id: string) => {
    soundEngine.playClick();
    setSelectedChapterId(id);
  };

  return (
    <section id="timeline" className="py-16 md:py-24 border-b border-[#F7F5EE]/10 bg-[#071A10]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#B7F34A] mb-2 flex items-center gap-2">
              <Compass className="h-3.5 w-3.5" />
              <span>Documentary Timeline</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F7F5EE]">
              Chronological Journey & Roots
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8FA895] max-w-2xl leading-relaxed">
              An archival record tracking the progression from independent creative writing and recording artistry to UniPort campus leadership, statewide event coordination, and global protocol advocacy.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[#8FA895]">
            <span>5 Documented Chapters</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#F7F5EE]">2017 — 2026</span>
          </div>
        </div>

        {/* Master Two-Column Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Chapter List / Selector Rail */}
          <div className="lg:col-span-5 space-y-3">
            {CHRONOLOGICAL_CHAPTERS.map((chapter) => {
              const isSelected = chapter.id === selectedChapterId;
              return (
                <button
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter.id)}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#0E2B1B] border-[#B7F34A]/50 shadow-md ring-1 ring-[#B7F34A]/30'
                      : 'bg-[#0A2316]/70 border-[#F7F5EE]/5 hover:bg-[#0A2316] hover:border-[#F7F5EE]/15'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-[#8FA895]">
                      Chapter {chapter.chapterNumber}
                    </span>
                    <span className="font-mono text-xs text-[#B7F34A] tabular-nums">
                      {chapter.timeframe}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#F7F5EE] leading-snug">
                    {chapter.title}
                  </h3>

                  <div className="mt-2 text-xs text-[#8FA895] font-sans line-clamp-1">
                    {chapter.role}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#8FA895]/80 pt-2 border-t border-[#F7F5EE]/5">
                    <span className="flex items-center gap-1.5 truncate">
                      <Building2 className="h-3 w-3 text-[#B7F34A]" />
                      <span className="truncate">{chapter.institution}</span>
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isSelected ? 'text-[#B7F34A] translate-x-1' : 'text-[#8FA895]'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Chapter Detailed Dossier */}
          <div className="lg:col-span-7 bg-[#0A2316] border border-[#F7F5EE]/10 rounded-2xl p-7 sm:p-9 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#F7F5EE]/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#B7F34A] block">
                  Chapter {selectedChapter.chapterNumber} · {selectedChapter.era}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F5EE] mt-1">
                  {selectedChapter.title}
                </h3>
              </div>
              <div className="px-3 py-1 rounded-md bg-[#14532D]/70 border border-[#B7F34A]/30 text-xs font-mono text-[#B7F34A]">
                {selectedChapter.timeframe}
              </div>
            </div>

            {/* Role & Institution Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-[#F7F5EE]/10 text-xs sm:text-sm">
              <div>
                <span className="text-[#8FA895] block text-xs font-mono uppercase">Designation</span>
                <span className="text-[#F7F5EE] font-medium mt-0.5 block">{selectedChapter.role}</span>
              </div>
              <div>
                <span className="text-[#8FA895] block text-xs font-mono uppercase">Institution / Scope</span>
                <span className="text-[#F7F5EE] font-medium mt-0.5 block">{selectedChapter.institution}</span>
              </div>
              <div>
                <span className="text-[#8FA895] block text-xs font-mono uppercase">Geographic Hub</span>
                <span className="text-[#F7F5EE] font-medium mt-0.5 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#B7F34A]" />
                  <span>{selectedChapter.location}</span>
                </span>
              </div>
              <div>
                <span className="text-[#8FA895] block text-xs font-mono uppercase">Archive Classification</span>
                <span className="text-[#B7F34A] font-medium mt-0.5 block">{selectedChapter.badgeTag}</span>
              </div>
            </div>

            {/* Editorial Narrative Summary */}
            <div className="py-6 border-b border-[#F7F5EE]/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#8FA895] mb-2.5">
                Archival Summary
              </h4>
              <p className="text-sm sm:text-base text-[#F7F5EE]/90 leading-relaxed font-sans">
                {selectedChapter.summary}
              </p>
            </div>

            {/* Documented Milestones */}
            <div className="py-6 border-b border-[#F7F5EE]/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#8FA895] mb-3">
                Key Documented Milestones
              </h4>
              <ul className="space-y-2.5">
                {selectedChapter.milestones.map((milestone, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F5EE]/85">
                    <CheckCircle2 className="h-4 w-4 text-[#B7F34A] shrink-0 mt-0.5" />
                    <span>{milestone}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verifiable Reference Records */}
            <div className="pt-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#8FA895] mb-3">
                Connected Master Records
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedChapter.verifiableRecords.map((record, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#071A10] border border-[#F7F5EE]/15 text-xs text-[#F7F5EE] font-mono"
                  >
                    <Award className="h-3.5 w-3.5 text-[#B7F34A]" />
                    <span>{record}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

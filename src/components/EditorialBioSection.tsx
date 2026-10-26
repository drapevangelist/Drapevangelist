import React, { useState, useEffect } from 'react';
import { Compass, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';

interface EditorialBioSectionProps {
  onExploreChapters: () => void;
  onExploreProof: () => void;
}

export const EditorialBioSection: React.FC<EditorialBioSectionProps> = ({
  onExploreChapters,
  onExploreProof,
}) => {
  const [bio, setBio] = useState(() => curationStore.getLiveContent().bio);

  useEffect(() => {
    const unsub = curationStore.subscribe(() => {
      setBio(curationStore.getLiveContent().bio);
    });
    return unsub;
  }, []);

  return (
    <section id="bio" className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0A0A0A] border-t border-[#262626] relative text-[#E5E2E1]">
      <div className="max-w-6xl mx-auto">
        {/* Curatorial Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#D32F2F] font-bold">
              <span>SECTION 01</span>
              <span>//</span>
              <span>BIOGRAPHY & ROOTS</span>
            </div>
            <h2 className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-oswald uppercase font-bold tracking-tight text-[#FFFFFF] leading-[0.92]">
              Mark Chinedum Daniel
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8E9192] font-inter">
              Operating as <span className="text-[#FFFFFF] font-bold">DRAPEVANGELIST</span> — Community Operations Manager, Campus Mobilizer, and Technical Storyteller.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playClick();
                onExploreChapters();
              }}
              className="text-xs font-mono uppercase tracking-wider text-[#C4C7C7] hover:text-[#FFFFFF] flex items-center gap-1 transition-colors group cursor-pointer border border-[#262626] px-3 py-1.5 bg-[#141414]"
            >
              <span>Jump to Chapters</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D32F2F]" />
            </button>
          </div>
        </div>

        {/* Bio Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (5 cols): Curatorial Portrait & Operational Dossier */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Portrait Card */}
            <div className="relative border border-[#262626] bg-[#131313] p-4">
              <div className="aspect-[4/5] relative bg-[#0A0A0A] overflow-hidden border border-[#262626]">
                <img
                  src={bio.portraitUrl && !bio.portraitUrl.includes('lh3.googleusercontent.com/aida/') ? bio.portraitUrl : '/assets/portrait.jpg'}
                  alt="Mark Chinedum Daniel (Drapevangelist)"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/portrait.jpg';
                  }}
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#D32F2F] font-bold">DRAP EVANGELIST</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[#FFFFFF] bg-[#0A0A0A] px-2 py-0.5 border border-[#262626]">
                      <span className="w-1.5 h-1.5 bg-[#D32F2F] animate-pulse"></span>
                      Active Protocol
                    </span>
                  </div>
                  <p className="font-oswald text-xl uppercase font-bold text-[#FFFFFF] mt-1">Mark Chinedum Daniel</p>
                  <p className="text-xs text-[#757575] font-mono">ID: D-EVANGELIST-042 · Rivers State, Nigeria</p>
                </div>
              </div>

              {/* Verified Identity Tags */}
              <div className="mt-4 pt-4 border-t border-[#262626] flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-[#8E9192]">
                <div>Status: <span className="text-[#FFFFFF] font-bold">Active Operator</span></div>
                <div>Campus: <span className="text-[#FFFFFF]">UniPort</span></div>
                <div>Era: <span className="text-[#FFFFFF]">2022 — Present</span></div>
              </div>
            </div>

            {/* Persona & Movement Plates (Ambassador, Musician, Cultural Mascot) */}
            <div className="border border-[#262626] bg-[#131313] p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#D32F2F] font-bold">
                  MEDIA PLATES // THREE PILLARS
                </span>
                <span className="font-mono text-[10px] text-[#757575] uppercase">
                  VERIFIED IDENTITIES
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {/* 1. Ambassador */}
                <div className="border border-[#262626] bg-[#0A0A0A] p-2 flex flex-col group">
                  <div className="aspect-square overflow-hidden bg-[#141414] mb-2">
                    <img
                      src={bio.ambassadorImage || '/assets/portrait.jpg'}
                      alt="Mark - Global Ambassador"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/portrait.jpg';
                      }}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#D32F2F] font-bold">01. AMBASSADOR</span>
                  <span className="font-oswald text-xs uppercase text-[#FFFFFF] mt-0.5 leading-tight font-bold">PROTOCOL OPS</span>
                </div>

                {/* 2. Musician */}
                <div className="border border-[#262626] bg-[#0A0A0A] p-2 flex flex-col group">
                  <div className="aspect-square overflow-hidden bg-[#141414] mb-2">
                    <img
                      src={bio.musicianImage || '/assets/musician.jpg'}
                      alt="Mark - Recording Artist"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/musician.jpg';
                      }}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#D32F2F] font-bold">02. CREATIVE</span>
                  <span className="font-oswald text-xs uppercase text-[#FFFFFF] mt-0.5 leading-tight font-bold">SONIC ARTIST</span>
                </div>

                {/* 3. Cultural Mascot */}
                <div className="border border-[#262626] bg-[#0A0A0A] p-2 flex flex-col group">
                  <div className="aspect-square overflow-hidden bg-[#141414] mb-2">
                    <img
                      src={bio.mascotImage || '/assets/gida.jpg'}
                      alt="Mark - Community Mascot"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/gida.jpg';
                      }}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#D32F2F] font-bold">03. CULTURE</span>
                  <span className="font-oswald text-xs uppercase text-[#FFFFFF] mt-0.5 leading-tight font-bold">WEB3 AVATAR</span>
                </div>
              </div>
            </div>

            {/* Core Operational Pillars */}
            <div className="p-6 border border-[#262626] bg-[#131313] space-y-4">
              <h3 className="font-oswald text-lg uppercase font-bold text-[#FFFFFF] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D32F2F]" />
                Operational Philosophy
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#C4C7C7] font-inter leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D32F2F] font-bold font-mono">01.</span>
                  <span><strong>Grassroots Builder First:</strong> Real community happens in computer labs, university auditoriums, and hands-on wallet setup, not synthetic engagement metrics.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D32F2F] font-bold font-mono">02.</span>
                  <span><strong>Operational Accountability:</strong> Documented execution, verified logistics, transparent attendance tracking, and reproducible event blueprints.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D32F2F] font-bold font-mono">03.</span>
                  <span><strong>Cross-Disciplinary Bridge:</strong> Merging technical engineering depth with creative storytelling, literary essays, and recorded music.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (7 cols): Editorial Narrative Prose */}
          <div className="lg:col-span-7 space-y-6 text-[#C4C7C7] font-inter leading-relaxed text-base sm:text-lg">
            {/* Opening Drop-Cap Paragraph */}
            <p className="first-letter:text-6xl first-letter:font-oswald first-letter:font-bold first-letter:text-[#D32F2F] first-letter:float-left first-letter:mr-4 first-letter:mt-1 leading-relaxed">
              {bio.paragraph1}
            </p>

            <p>
              {bio.paragraph2}
            </p>

            <blockquote className="my-8 p-6 border-l-2 border-[#D32F2F] bg-[#141414] border-y border-r border-[#262626] font-inter italic text-lg sm:text-xl text-[#FFFFFF]">
              “Community is neither an algorithm nor a marketing channel. It is the sacred, disciplined work of sitting next to someone at a screen until they understand how decentralized technology can alter the trajectory of their future.”
              <footer className="mt-2 text-xs font-mono uppercase tracking-widest text-[#757575] not-italic">
                — Mark Chinedum Daniel
              </footer>
            </blockquote>

            <p>
              {bio.paragraph3}
            </p>

            <p>
              Today, Mark serves as the <strong className="text-[#FFFFFF]">Social Media and Community Operations Manager for Decred Africa</strong>, and is actively mobilizing university developer cohorts for <strong className="text-[#FFFFFF]">DevCon 2026</strong>. He has managed community operations, beta testing, and ambassador initiatives for over 70 verified organizations—including Movement Labs, Base, BoonHQ, Chipper Cash, Solana Allstars NG, and 100Pay.
            </p>

            {/* Action buttons */}
            <div className="pt-6 border-t border-[#262626] flex flex-wrap gap-4">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onExploreChapters();
                }}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#FFFFFF] text-[#0A0A0A] font-bold hover:bg-[#E5E2E1] transition-colors cursor-pointer border border-[#FFFFFF]"
              >
                Inspect Chapters (Education & Posts)
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onExploreProof();
                }}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#141414] text-[#FFFFFF] border border-[#262626] hover:border-[#8E9192] transition-colors cursor-pointer"
              >
                View Proof of Work Metrics
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

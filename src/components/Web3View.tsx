import React from 'react';
import { WEB3_STATS, WEB3_DUTIES, WEB3_ACHIEVEMENTS, WEB3_PROJECTS, SOCIAL_LINKS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { ProofOfWorkSection } from './ProofOfWorkSection';
import { 
  ExternalLink, 
  Award, 
  Users, 
  Briefcase, 
  Compass, 
  FileCheck, 
  Calendar, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  ChevronRight,
  Database,
  CheckCircle2
} from 'lucide-react';

interface Web3ViewProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Web3View: React.FC<Web3ViewProps> = ({ onSelectProject }) => {
  const scrollToDatabase = () => {
    soundEngine.playClick();
    const el = document.getElementById('proof-of-work-database');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="page-web3" className="w-full">
      {/* Hero Section */}
      <section className="max-w-[1080px] mx-auto px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14532D]/70 border border-[#B7F34A]/30 text-[#B7F34A] text-xs font-semibold uppercase tracking-wider mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B7F34A] animate-pulse" />
          <span>Web3 Operations · IRL Events · Community Leadership</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.2rem] tracking-tight leading-[1.12] text-[#F5F3E8] max-w-[840px]">
          Building community, content, and builder pipelines across the decentralized web.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#F5F3E8]/80 leading-relaxed max-w-[720px]">
          Community operations manager, IRL event coordinator, and brand evangelist with 44 verified engagements across 20+ Web3 ecosystems — Base, Movement Labs, Solana, Sui Move, Decred, Arbitrum, and Ethereum.
        </p>

        {/* Quick highlight bar & Jump Button */}
        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-[#6B8F71]">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14532D]/60 border border-[#F5F3E8]/5 text-[#F5F3E8]/90">
            <ShieldCheck className="h-3.5 w-3.5 text-[#B7F34A]" />
            40+ IRL Events Coordinated
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14532D]/60 border border-[#F5F3E8]/5 text-[#F5F3E8]/90">
            <Users className="h-3.5 w-3.5 text-[#B7F34A]" />
            70+ Onboarded into Tech &amp; Web3
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14532D]/60 border border-[#F5F3E8]/5 text-[#F5F3E8]/90">
            <Database className="h-3.5 w-3.5 text-[#B7F34A]" />
            44 Master Proof of Work Records
          </span>

          <button
            onClick={scrollToDatabase}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#B7F34A] text-[#0B2E1A] font-bold hover:bg-[#CFFF6E] transition-all cursor-pointer shadow-sm ml-auto"
          >
            <span>Explore 44 Records</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-[#F5F3E8]/8 py-16">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start">
            <div>
              <h2 className="font-display text-xs uppercase tracking-widest text-[#6B8F71] font-bold">
                About — Web3
              </h2>
            </div>

            <div>
              <p className="font-display font-semibold text-xl sm:text-2xl text-[#B7F34A] mb-4">
                Web3 Community Operations &amp; Ecosystem Growth
              </p>
              <p className="text-base sm:text-lg text-[#F5F3E8]/85 leading-relaxed max-w-[700px]">
                Drapevangelist is a dynamic Web3 community operations lead, seasoned IRL event coordinator, and technical brand evangelist. Proven track record executing large-scale campus activations, coordinating developer summits, fostering decentralized governance participation, and testing bleeding-edge DApps.
              </p>

              {/* Core Duties */}
              <div className="mt-8">
                <h3 className="font-display text-xs uppercase tracking-wider text-[#6B8F71] font-semibold mb-3.5">
                  Core Competencies &amp; Scope
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {WEB3_DUTIES.map((duty) => (
                    <span
                      key={duty}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#14532D] border border-[#F5F3E8]/10 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#F5F3E8] transition-all hover:border-[#B7F34A]/50 hover:bg-[#14532D]/80 select-none shadow-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#B7F34A]" />
                      {duty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Metrics Section */}
      <section className="border-t border-[#F5F3E8]/8 py-16">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-xs uppercase tracking-widest text-[#6B8F71] font-bold">
              Impact Metrics &amp; Achievements
            </h2>
            <span className="text-xs text-[#B7F34A] font-semibold flex items-center gap-1">
              <Award className="h-3.5 w-3.5" /> Proven Track Record
            </span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {WEB3_STATS.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl bg-[#14532D]/60 border border-[#F5F3E8]/8 p-5 sm:p-6 transition-all duration-300 hover:border-[#B7F34A]/40 hover:-translate-y-1 shadow-md"
              >
                <div className="font-display font-bold text-3xl sm:text-4xl text-[#B7F34A] tracking-tight">
                  {stat.num}
                </div>
                <div className="mt-2 text-xs sm:text-sm font-semibold text-[#F5F3E8]">
                  {stat.label}
                </div>
                {stat.desc && (
                  <p className="mt-1 text-xs text-[#6B8F71] line-clamp-2 leading-relaxed">
                    {stat.desc}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Key Achievement Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {WEB3_ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.title}
                className="flex flex-col justify-between rounded-2xl bg-[#14532D] border border-[#F5F3E8]/8 p-6 transition-all duration-200 hover:border-[#B7F34A] hover:-translate-y-1 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#B7F34A]">
                      {ach.tag}
                    </span>
                    {ach.highlightBadge && (
                      <span className="text-[10px] rounded-full bg-[#B7F34A]/15 px-2 py-0.5 font-semibold text-[#B7F34A]">
                        {ach.highlightBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#F5F3E8] mb-2 leading-snug">
                    {ach.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5F3E8]/75 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Proof of Work Database (44 Verified Records) */}
      <ProofOfWorkSection />

      {/* Selected Featured Deep Dives Section */}
      <section className="border-t border-[#F5F3E8]/8 py-16">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-xs uppercase tracking-widest text-[#6B8F71] font-bold">
                Featured Case Studies
              </h2>
              <p className="text-sm text-[#F5F3E8]/70 mt-1">
                Deep dive into selected flagship initiatives, ecosystem operations, and products
              </p>
            </div>
            <span className="text-xs text-[#6B8F71] hidden sm:inline">
              Click any project card to open full case study
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WEB3_PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectProject(project);
                }}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#14532D] border border-[#F5F3E8]/8 p-6 cursor-pointer transition-all duration-200 hover:border-[#B7F34A] hover:-translate-y-1 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B7F34A]">
                      {project.tag}
                    </span>
                    <span className="text-[11px] text-[#6B8F71] font-medium">
                      {project.meta}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#F5F3E8] group-hover:text-[#B7F34A] transition-colors mb-2.5">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#F5F3E8]/75 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F5F3E8]/5 flex items-center justify-between text-xs text-[#6B8F71] group-hover:text-[#B7F34A] transition-colors">
                  <span className="font-medium">Explore Project Breakdown</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Follow & Engage */}
      <section className="border-t border-[#F5F3E8]/8 py-16">
        <div className="max-w-[1080px] mx-auto px-6">
          <h2 className="font-display text-xs uppercase tracking-widest text-[#6B8F71] font-bold mb-6">
            Follow &amp; Engage
          </h2>

          <div className="flex flex-wrap gap-3.5">
            {SOCIAL_LINKS.web3.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#14532D] border border-[#F5F3E8]/10 px-5 py-3 text-sm font-semibold text-[#F5F3E8] hover:border-[#B7F34A] hover:text-[#B7F34A] transition-all shadow-sm"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-[#6B8F71] group-hover:text-[#B7F34A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


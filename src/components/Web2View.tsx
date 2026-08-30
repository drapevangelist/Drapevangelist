import React, { useState } from 'react';
import { WEB2_PROJECTS, SOCIAL_LINKS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { 
  Music, 
  BookOpen, 
  PenTool, 
  Camera, 
  ArrowUpRight, 
  Play, 
  Pause, 
  Sparkles,
  ExternalLink,
  Feather,
  Disc3
} from 'lucide-react';

interface Web2ViewProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Web2View: React.FC<Web2ViewProps> = ({ onSelectProject }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleMusicSampleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    const playing = soundEngine.toggle();
    setIsPlayingMusic(playing);
  };

  return (
    <div id="page-web2" className="w-full animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="max-w-[1080px] mx-auto px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14532D]/70 border border-[#B7F34A]/30 text-[#B7F34A] text-xs font-semibold uppercase tracking-wider mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B7F34A] animate-pulse" />
          <span>Web2 · Music · Writing</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.2rem] tracking-tight leading-[1.12] text-[#F5F3E8] max-w-[800px]">
          Music, words, and images — the creative side of the work.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#F5F3E8]/80 leading-relaxed max-w-[680px]">
          A music artist since 2017, running a virtual book club, writing confessional essays and fiction, and exploring photography.
        </p>

        {/* Creative Discipline Badges */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-xl bg-[#14532D]/50 border border-[#F5F3E8]/10 px-4 py-2 text-xs sm:text-sm font-semibold text-[#F5F3E8]">
            <Disc3 className="h-4 w-4 text-[#B7F34A]" />
            Independent Recording Artist
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-[#14532D]/50 border border-[#F5F3E8]/10 px-4 py-2 text-xs sm:text-sm font-semibold text-[#F5F3E8]">
            <BookOpen className="h-4 w-4 text-[#B7F34A]" />
            Novel: The Drowning Season
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-[#14532D]/50 border border-[#F5F3E8]/10 px-4 py-2 text-xs sm:text-sm font-semibold text-[#F5F3E8]">
            <Feather className="h-4 w-4 text-[#B7F34A]" />
            Fully Booked Book Club
          </span>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-[#F5F3E8]/8 py-16">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start">
            <div>
              <h2 className="font-display text-xs uppercase tracking-widest text-[#6B8F71] font-bold">
                About — Web2
              </h2>
            </div>

            <div>
              <p className="font-display font-semibold text-xl sm:text-2xl text-[#B7F34A] mb-4">
                Creative Arts, Storytelling &amp; Sound
              </p>
              <p className="text-base sm:text-lg text-[#F5F3E8]/85 leading-relaxed max-w-[680px]">
                Outside of Web3 and AI work, creative output spans music, writing, and photography. Runs a virtual book club called Fully Booked, writes confessional first-person essays and motivational prose under the Drapevangelist voice, and is working on a thriller/horror/crime novel. Also maintains an interest in photography and gallery/home décor projects.
              </p>

              {/* Creative Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="rounded-xl bg-[#14532D]/40 border border-[#F5F3E8]/8 p-4">
                  <div className="text-xs uppercase font-bold text-[#B7F34A] tracking-wider mb-1">
                    01. Sound
                  </div>
                  <div className="font-display font-bold text-sm text-[#F5F3E8]">Recording Artist</div>
                  <p className="text-xs text-[#6B8F71] mt-1">Lyrical Hip-Hop &amp; Lo-Fi instrumentation since 2017</p>
                </div>

                <div className="rounded-xl bg-[#14532D]/40 border border-[#F5F3E8]/8 p-4">
                  <div className="text-xs uppercase font-bold text-[#B7F34A] tracking-wider mb-1">
                    02. Words
                  </div>
                  <div className="font-display font-bold text-sm text-[#F5F3E8]">Fiction &amp; Essays</div>
                  <p className="text-xs text-[#6B8F71] mt-1">Novel in progress &amp; intimate Substack essays</p>
                </div>

                <div className="rounded-xl bg-[#14532D]/40 border border-[#F5F3E8]/8 p-4">
                  <div className="text-xs uppercase font-bold text-[#B7F34A] tracking-wider mb-1">
                    03. Visuals
                  </div>
                  <div className="font-display font-bold text-sm text-[#F5F3E8]">Photography &amp; Decor</div>
                  <p className="text-xs text-[#6B8F71] mt-1">Fine-art frames &amp; urban street lighting studies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="border-t border-[#F5F3E8]/8 py-16">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-xs uppercase tracking-widest text-[#6B8F71] font-bold">
              Selected Work
            </h2>
            <span className="text-xs text-[#6B8F71]">
              Click any project to view details
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WEB2_PROJECTS.map((project) => (
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
                  <span className="font-medium">Explore Project</span>
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
            {SOCIAL_LINKS.web2.map((link) => (
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

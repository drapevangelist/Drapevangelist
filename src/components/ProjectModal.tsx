import React from 'react';
import { ProjectItem } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  Tag, 
  Sparkles, 
  Music, 
  BookOpen, 
  Camera, 
  Volume2
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#061F11]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B2E1A] border border-[#B7F34A]/30 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#14532D] border border-[#F5F3E8]/10 text-[#F5F3E8]/70 hover:text-[#B7F34A] hover:border-[#B7F34A]/40 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#B7F34A] bg-[#14532D] px-3 py-1 rounded-full border border-[#B7F34A]/20">
            <Tag className="h-3 w-3" />
            {project.tag}
          </span>
          <span className="text-xs text-[#6B8F71] font-medium flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {project.meta}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F5F3E8] mb-4">
          {project.title}
        </h3>

        {/* Full Overview */}
        <p className="text-sm sm:text-base text-[#F5F3E8]/85 leading-relaxed mb-6">
          {project.fullDescription || project.summary}
        </p>

        {/* Dynamic Media / Extra Content based on project type */}
        {project.id === 'recording-artist' && (
          <div className="mb-6 rounded-2xl bg-[#14532D]/70 border border-[#B7F34A]/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#061F11] text-[#B7F34A] border border-[#B7F34A]/20">
                <Music className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#B7F34A] uppercase tracking-wider">Original Single</div>
                <div className="text-sm font-semibold text-[#F5F3E8]">"Gonna Be Better" — Drapevangelist</div>
              </div>
            </div>
            <button
              onClick={() => {
                soundEngine.toggle();
                soundEngine.playClick();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B7F34A] text-[#0B2E1A] text-xs font-bold hover:bg-[#CFFF6E] transition-all cursor-pointer shadow-md"
            >
              <Volume2 className="h-4 w-4" />
              Play / Pause Track
            </button>
          </div>
        )}

        {project.id === 'drowning-season' && (
          <div className="mb-6 rounded-2xl bg-[#14532D]/40 border border-[#F5F3E8]/10 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7F34A] mb-2">
              <BookOpen className="h-4 w-4" />
              Book Synopsis Teaser
            </div>
            <blockquote className="text-xs sm:text-sm text-[#F5F3E8]/80 italic border-l-2 border-[#B7F34A] pl-3 py-1">
              "The river was quiet until the rains broke the seal of the embankment. Some memories stay submerged for a reason..."
            </blockquote>
          </div>
        )}

        {/* Stats Grid if available */}
        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.stats.map((st) => (
              <div key={st.label} className="rounded-xl bg-[#14532D]/50 border border-[#F5F3E8]/5 p-3">
                <div className="text-[10px] uppercase font-bold text-[#6B8F71]">{st.label}</div>
                <div className="text-sm font-bold text-[#F5F3E8] mt-0.5">{st.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Highlights Checklist */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-6">
            <h4 className="font-display text-xs uppercase tracking-wider text-[#6B8F71] font-bold mb-3">
              Key Contributions &amp; Milestones
            </h4>
            <div className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F3E8]/85">
                  <CheckCircle2 className="h-4 w-4 text-[#B7F34A] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Link */}
        <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-[#F5F3E8]/10">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#F5F3E8]/80 hover:text-[#F5F3E8] transition-colors cursor-pointer"
          >
            Close
          </button>

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B7F34A] text-[#0B2E1A] text-xs sm:text-sm font-bold hover:bg-[#CFFF6E] transition-all shadow-md"
            >
              <span>{project.linkLabel || 'Open Link'}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <a
              href="mailto:drapevangelist@gmail.com"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B7F34A] text-[#0B2E1A] text-xs sm:text-sm font-bold hover:bg-[#CFFF6E] transition-all shadow-md"
            >
              <span>Inquire on Project</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Menu, X, Sparkles, SlidersHorizontal, RotateCcw, AlertTriangle, Edit3 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';
import { isEditorEnvironment } from '../utils/envUtils';
import { LiveContentEditorModal } from './LiveContentEditorModal';

interface EditorialNavbarProps {
  onOpenContact: () => void;
}

export const EditorialNavbar: React.FC<EditorialNavbarProps> = ({ onOpenContact }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditorAllowed, setIsEditorAllowed] = useState(isEditorEnvironment());
  const [isCurator, setIsCurator] = useState(curationStore.isCuratorMode());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const unsubSound = soundEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    const unsubCurator = curationStore.subscribe(() => {
      setIsCurator(curationStore.isCuratorMode());
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubSound();
      unsubCurator();
    };
  }, []);

  const toggleSound = async () => {
    soundEngine.playClick();
    const playing = await soundEngine.toggle();
    setIsPlaying(playing);
  };

  const navTo = (id: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626] shadow-2xl'
            : 'bg-[#0A0A0A] border-b border-[#262626]'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Official Crest / Logo, Wordmark & Tagline */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <img
                src="/assets/logo.jpg"
                alt="Drapevangelist Official Crest"
                className="h-9 w-9 object-cover border border-[#262626]"
              />
              <div>
                <span className="text-base sm:text-lg font-oswald uppercase font-bold tracking-wider text-[#FFFFFF] group-hover:text-[#D32F2F] transition-colors block leading-tight">
                  DRAP EVANGELIST
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#757575] block">
                  Official Archive // 2022—2026
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Editorial Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-5 text-xs uppercase tracking-wider font-medium text-[#C4C7C7]">
            <button
              onClick={() => navTo('bio')}
              className="hover:text-[#FFFFFF] transition-colors py-1 cursor-pointer"
            >
              Biography
            </button>
            <button
              onClick={() => navTo('chapters')}
              className="hover:text-[#FFFFFF] transition-colors py-1 cursor-pointer"
            >
              Chapters
            </button>
            <button
              onClick={() => navTo('proof-of-work')}
              className="hover:text-[#FFFFFF] transition-colors py-1 cursor-pointer"
            >
              Track Record
            </button>
            <button
              onClick={() => navTo('photo-mosaic')}
              className="hover:text-[#FFFFFF] transition-colors py-1 cursor-pointer"
            >
              Field Archive
            </button>
            <button
              onClick={() => navTo('visual-proofs')}
              className="hover:text-[#FFFFFF] transition-colors py-1 cursor-pointer"
            >
              Visual Proofs
            </button>
            <button
              onClick={() => navTo('ai-agent')}
              className="hover:text-[#FFFFFF] transition-colors py-1 cursor-pointer text-[#FFFFFF] font-bold flex items-center gap-1.5 border border-[#262626] px-2 py-0.5 bg-[#141414]"
            >
              <Sparkles className="w-3 h-3 text-[#D32F2F]" />
              <span>Ask AI</span>
              <span className="w-1.5 h-1.5 bg-[#D32F2F] animate-pulse"></span>
            </button>
            <button
              onClick={() => navTo('testimonials')}
              className="hover:text-[#FFFFFF] transition-colors py-1 cursor-pointer"
            >
              Endorsements
            </button>
            <button
              onClick={() => navTo('updates')}
              className="hover:text-[#FFFFFF] transition-colors py-1 cursor-pointer"
            >
              Updates
            </button>
            <button
              onClick={() => navTo('contact')}
              className="hover:text-[#FFFFFF] transition-colors py-1 cursor-pointer"
            >
              Connect
            </button>
          </nav>

          {/* Zone 3: Actions + Audio Toggle + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleSound}
              aria-label="Toggle ambient soundscape"
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#262626] text-xs font-mono text-[#8E9192] hover:text-[#FFFFFF] hover:border-[#444748] transition-colors bg-[#131313] cursor-pointer"
              title={isPlaying ? 'Pause ambient audio' : 'Play ambient audio'}
            >
              {isPlaying ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-[#D32F2F]" />
                  <span className="hidden sm:inline text-[11px] text-[#FFFFFF]">Audio On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline text-[11px]">Audio Off</span>
                </>
              )}
            </button>

            {/* Active Dispatch Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#141414] border border-[#262626] text-[11px] font-mono text-[#C4C7C7]">
              <span className="w-2 h-2 bg-[#D32F2F] animate-pulse"></span>
              <span className="uppercase text-[10px] tracking-wider text-[#FFFFFF] font-bold">Active Dispatch</span>
            </div>

            {/* AI Studio Backend Editor Controls - Hidden completely on Vercel / Live Production */}
            {isEditorAllowed && (
              <>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsEditorModalOpen(true);
                  }}
                  aria-label="Open Full Broadsheet Content & Visuals Editor"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#D32F2F]/60 text-xs font-mono text-[#FFFFFF] hover:bg-[#D32F2F]/20 bg-[#1A1112] transition-colors cursor-pointer"
                  title="Edit copy, headlines, bio, photos, and video (AI Studio Backend only)"
                >
                  <Edit3 className="h-3.5 w-3.5 text-[#D32F2F]" />
                  <span className="hidden sm:inline text-[11px] font-bold text-[#E5E2E1]">
                    Edit Content
                  </span>
                </button>

                {/* Curator / Edit Mode Toggle Button */}
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    const next = curationStore.toggleCuratorMode();
                    setIsCurator(next);
                  }}
                  aria-label="Toggle site curation mode"
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                    isCurator
                      ? 'bg-[#D32F2F] text-[#FFFFFF] border-[#D32F2F] font-bold'
                      : 'border-[#262626] text-[#8E9192] hover:text-[#FFFFFF] bg-[#131313]'
                  }`}
                  title={isCurator ? 'Exit Archival Curation Mode' : 'Toggle Site Curation Mode: delete irrelevant items & upload media'}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline text-[11px]">
                    {isCurator ? 'Curating: ON' : 'Curate Site'}
                  </span>
                </button>
              </>
            )}

            {/* Desktop Connect Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenContact();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#E5E2E1] transition-colors whitespace-nowrap cursor-pointer border border-[#FFFFFF]"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#FFFFFF] hover:text-[#D32F2F] bg-[#141414] border border-[#262626] transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Persistent Broadsheet Curation Banner when Curator Mode is Active (AI Studio Backend only) */}
      {isEditorAllowed && isCurator && (
        <div className="bg-[#141414] border-b border-[#D32F2F] py-2 px-4 sm:px-6 sticky top-16 z-30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#E5E2E1] animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D32F2F] animate-ping" />
            <span className="text-[#D32F2F] font-bold uppercase tracking-wider">
              CURATOR MODE ACTIVE:
            </span>
            <span className="hidden md:inline text-[#C4C7C7]">
              Delete irrelevant information to avoid crowding, and upload photos/videos where needed.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-2.5 py-1 bg-[#0A0A0A] hover:bg-[#20201F] text-[#8E9192] hover:text-[#FFFFFF] border border-[#262626] flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset all customized additions and unhide default items"
            >
              <RotateCcw className="w-3 h-3 text-[#D32F2F]" />
              <span>Reset Archive Defaults</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                curationStore.setCuratorMode(false);
                setIsCurator(false);
              }}
              className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-bold border border-[#FFFFFF] uppercase text-[11px] transition-colors cursor-pointer"
            >
              Finish Curating
            </button>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131313] border border-[#D32F2F] p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-2 text-[#D32F2F] font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Reset Confirmation</span>
            </div>
            <h3 className="font-oswald text-xl uppercase font-bold text-[#FFFFFF]">
              Restore Default Archive?
            </h3>
            <p className="text-xs text-[#8E9192] font-inter mt-2 leading-relaxed">
              This will restore all default photos, chapters, testimonials, and proofs while clearing hidden markers. Custom uploads will remain in your local storage.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 bg-[#0A0A0A] text-[#C4C7C7] hover:text-[#FFFFFF] border border-[#262626] text-xs font-mono uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  curationStore.resetAllCuration();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-1.5 bg-[#D32F2F] hover:bg-[#b71c1c] text-[#FFFFFF] text-xs font-mono uppercase font-bold cursor-pointer"
              >
                Yes, Restore Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer (Broadsheet Dossier Menu) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col p-6 pt-20 border-l border-[#262626] animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-[#262626]">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#D32F2F] font-bold">Archival Index</div>
              <div className="font-oswald text-2xl font-bold uppercase text-[#FFFFFF] tracking-wide">DRAP EVANGELIST</div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[#262626] bg-[#141414] text-[#FFFFFF]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center space-y-3 py-6 font-oswald text-xl uppercase tracking-wider">
            {[
              { id: 'bio', label: '01. The Journey & Biography' },
              { id: 'chapters', label: '02. Seven Chapters (Education, Certs, Events, Posts)' },
              { id: 'proof-of-work', label: '03. Proof of Work (71 Records)' },
              { id: 'photo-mosaic', label: '04. Field Archive Mosaic' },
              { id: 'visual-proofs', label: '05. Visual Proofs & Media Gallery' },
              { id: 'ai-agent', label: '06. Ask AI Archival Terminal' },
              { id: 'testimonials', label: '07. Testimonials & Endorsements' },
              { id: 'updates', label: '08. Latest Dispatches' },
              { id: 'contact', label: '09. Connect / Book Advisory' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navTo(item.id)}
                className="text-left text-[#E5E2E1] hover:text-[#D32F2F] transition-colors py-2 border-b border-[#262626] flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#757575]" />
              </button>
            ))}
          </nav>

          {isEditorAllowed && (
            <div className="pt-3 pb-2 space-y-2 border-t border-[#262626]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsEditorModalOpen(true);
                }}
                className="w-full py-2.5 px-3 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider bg-[#1A1112] text-[#FFFFFF] border border-[#D32F2F] font-bold"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#D32F2F]" />
                <span>Edit Site Copy & Visuals</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const next = curationStore.toggleCuratorMode();
                  setIsCurator(next);
                }}
                className={`w-full py-2.5 px-3 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider border font-bold ${
                  isCurator
                    ? 'bg-[#D32F2F] text-[#FFFFFF] border-[#D32F2F]'
                    : 'bg-[#141414] text-[#8E9192] border-[#262626]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{isCurator ? 'Curating: ON' : 'Toggle Curate Mode'}</span>
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-[#262626]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 text-center font-inter text-xs uppercase tracking-widest bg-[#FFFFFF] text-[#0A0A0A] font-bold cursor-pointer hover:bg-[#E5E2E1]"
            >
              Initiate Contact (drapevangelist@gmail.com)
            </button>
          </div>
        </div>
      )}

      {/* Full Broadsheet Content & Visuals Editor Modal (Mounted only when editor is allowed) */}
      {isEditorAllowed && (
        <LiveContentEditorModal
          isOpen={isEditorModalOpen}
          onClose={() => setIsEditorModalOpen(false)}
        />
      )}
    </>
  );
};

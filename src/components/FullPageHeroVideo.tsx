import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Video, ChevronDown, Check, ArrowDown, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';

interface FullPageHeroVideoProps {
  onScrollToBio: () => void;
  onOpenContact: () => void;
}

// Default high-performance video loops (tech conferences, speaking, community stages)
const PRESET_VIDEOS = [
  {
    id: 'stream-1',
    name: 'Keynote & Stage Presence',
    description: 'High-energy speaker presentation & stage lighting',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'stream-2',
    name: 'Web3 Builder Gathering',
    description: 'Ecosystem meetups and developer convergence',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'stream-3',
    name: 'Cinematic Ambient Tech Flow',
    description: 'Abstract digital architecture and data streams',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80',
  },
];

export const FullPageHeroVideo: React.FC<FullPageHeroVideoProps> = ({
  onScrollToBio,
  onOpenContact,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(() => {
    return curationStore.getCustomHeroVideo() || PRESET_VIDEOS[0].url;
  });
  const [customInputUrl, setCustomInputUrl] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Browser autoplay policy might restrict; stay muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, currentVideoUrl]);

  const togglePlay = () => {
    soundEngine.playClick();
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    soundEngine.playClick();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const applyCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl.trim()) {
      const url = customInputUrl.trim();
      setCurrentVideoUrl(url);
      curationStore.setCustomHeroVideo(url);
      setIsDrawerOpen(false);
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Video element */}
      <video
        ref={videoRef}
        src={currentVideoUrl}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-105 transition-transform duration-1000 ease-out filter grayscale contrast-125 brightness-80"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Atmospheric Broadsheet Scrim Overlays */}
      {/* 1. Base dark tint */}
      <div className="absolute inset-0 bg-[#0A0A0A]/75 backdrop-blur-[0.5px]" />
      {/* 2. Vertical editorial vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/80" />
      {/* 3. Hairline frame borders */}
      <div className="absolute inset-4 sm:inset-8 border border-[#262626] pointer-events-none z-10" />

      {/* Top Floating Editorial Utility Bar */}
      <div className="absolute top-6 sm:top-10 inset-x-6 sm:inset-x-12 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#D32F2F] animate-pulse"></span>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#E5E2E1] font-bold">
            ARCHIVAL DISPATCH // 2026 EDITION
          </span>
        </div>

        {/* Video source switcher trigger & Quick CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider text-[#C4C7C7] hover:text-[#FFFFFF] bg-[#141414]/90 hover:bg-[#20201F] border border-[#262626] transition-colors cursor-pointer"
            title="Configure Background Video Source"
          >
            <Video className="w-3.5 h-3.5 text-[#D32F2F]" />
            <span className="hidden sm:inline">Switcher</span>
          </button>

          <button
            onClick={onOpenContact}
            className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#E5E2E1] transition-colors border border-[#FFFFFF] cursor-pointer"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Hero Core Content — Exact Requested Hierarchy */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Line 1: Mark Chinedum Daniel in kicker style */}
        <p className="text-xs sm:text-sm font-inter font-bold tracking-[0.28em] uppercase text-[#C4C7C7] mb-3 sm:mb-4 select-none">
          MARK CHINEDUM DANIEL
        </p>

        {/* Line 2: DRAPEVANGELIST in monumental Oswald headline */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-oswald uppercase font-bold tracking-tight text-[#FFFFFF] leading-[0.92] select-none">
          DRAPEVANGELIST
        </h1>

        {/* Line 3: Community Operations Manager as the tagline below it */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-inter uppercase font-semibold tracking-[0.16em] text-[#E5E2E1]">
          Community Operations Manager
        </p>

        {/* Editorial Sub-narrative Kicker */}
        <p className="mt-3 text-xs sm:text-sm text-[#8E9192] max-w-xl font-inter leading-relaxed">
          Spearheading grassroots developer onboarding, regional protocol summits, and institutional Web3 community ecosystems across West Africa.
        </p>

        {/* Broadsheet Action Buttons with 0px Radius */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              soundEngine.playClick();
              onScrollToBio();
            }}
            className="flex items-center gap-2 px-6 py-3 text-xs uppercase font-bold tracking-widest text-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#E5E2E1] transition-all cursor-pointer border border-[#FFFFFF]"
          >
            <span>Read Bio & Journey</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenContact();
            }}
            className="flex items-center gap-2 px-6 py-3 text-xs uppercase font-bold tracking-widest text-[#FFFFFF] bg-[#141414] hover:bg-[#20201F] border border-[#262626] hover:border-[#8E9192] transition-all cursor-pointer"
          >
            <span>Connect Directly</span>
            <ArrowUpRight className="w-4 h-4 text-[#D32F2F]" />
          </button>
        </div>
      </div>

      {/* Bottom Bar: Video Controls & Scroll Down Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 inset-x-6 sm:inset-x-12 z-30 flex items-center justify-between pointer-events-none">
        {/* Video Playback Controls (Clickable, 0px radius) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-[#141414] hover:bg-[#20201F] border border-[#262626] text-[#E5E2E1] hover:text-[#FFFFFF] flex items-center justify-center transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={toggleMute}
            className="w-8 h-8 bg-[#141414] hover:bg-[#20201F] border border-[#262626] text-[#E5E2E1] hover:text-[#FFFFFF] flex items-center justify-center transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#757575]" /> : <Volume2 className="w-3.5 h-3.5 text-[#D32F2F]" />}
          </button>

          <span className="hidden sm:inline font-mono text-[10px] text-[#757575] ml-2 tracking-widest uppercase">
            {isMuted ? 'AUDIO MUTED' : 'LIVE AUDIO ON'}
          </span>
        </div>

        {/* Scroll down prompt */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onScrollToBio();
          }}
          className="pointer-events-auto flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#757575] hover:text-[#FFFFFF] transition-colors cursor-pointer"
        >
          <span className="hidden sm:inline">EXPLORE ARCHIVE</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#D32F2F]" />
        </button>
      </div>

      {/* Video Source Switcher Modal Drawer (Zero Radius Broadsheet Style) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131313] border border-[#262626] max-w-lg w-full p-6 text-left shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D32F2F] font-bold block">
                  HERO VIDEO CONTROLLER
                </span>
                <h3 className="font-oswald text-xl uppercase font-bold text-[#FFFFFF]">Select or Insert Loop</h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-[#757575] hover:text-[#FFFFFF] p-1 border border-[#262626] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-xs text-[#8E9192]">
                Choose one of the curated web-optimized loops or paste any MP4 video URL:
              </p>

              <div className="space-y-2">
                {PRESET_VIDEOS.map((vid) => (
                  <button
                    key={vid.id}
                    onClick={() => {
                      setCurrentVideoUrl(vid.url);
                      curationStore.setCustomHeroVideo(vid.url);
                      setIsPlaying(true);
                      setIsDrawerOpen(false);
                    }}
                    className={`w-full p-3 text-left border flex items-center justify-between transition-all cursor-pointer ${
                      currentVideoUrl === vid.url
                        ? 'border-[#D32F2F] bg-[#1C1B1B]'
                        : 'border-[#262626] bg-[#0A0A0A] hover:border-[#444748]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-oswald uppercase tracking-wider text-[#FFFFFF] font-bold">
                        {vid.name}
                      </div>
                      <div className="text-[11px] text-[#757575] mt-0.5">{vid.description}</div>
                    </div>
                    {currentVideoUrl === vid.url && (
                      <Check className="w-4 h-4 text-[#D32F2F] shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Custom URL Form */}
              <form onSubmit={applyCustomVideo} className="pt-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8E9192] mb-1.5 font-bold">
                  Custom Video URL (MP4)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/video.mp4"
                    value={customInputUrl}
                    onChange={(e) => setCustomInputUrl(e.target.value)}
                    className="flex-1 bg-[#0A0A0A] border border-[#262626] px-3 py-2 text-xs text-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:border-[#D32F2F]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FFFFFF] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider hover:bg-[#E5E2E1] transition-colors cursor-pointer"
                  >
                    Load
                  </button>
                </div>
              </form>

              {/* Direct File Upload from Device */}
              <div className="pt-2 border-t border-[#262626]">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8E9192] mb-1.5 font-bold">
                  Or Upload Video (MP4/WebM) from Device
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setCurrentVideoUrl(url);
                      curationStore.setCustomHeroVideo(url);
                      setIsPlaying(true);
                      setIsDrawerOpen(false);
                    }
                  }}
                  className="w-full text-xs text-[#FFFFFF] file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-mono file:bg-[#FFFFFF] file:text-[#0A0A0A] file:font-bold hover:file:bg-[#E5E2E1] cursor-pointer bg-[#0A0A0A] p-2 border border-[#262626]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

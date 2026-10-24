import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Video, Image as ImageIcon, ChevronDown, Check, ArrowDown, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';
import { isEditorEnvironment } from '../utils/envUtils';

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
  const [viewMode, setViewMode] = useState<'image' | 'video'>('image'); // Default to full screen user image on load
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [heroContent, setHeroContent] = useState(() => curationStore.getLiveContent().hero);
  const [isEditorAllowed] = useState(isEditorEnvironment());
  const [currentVideoUrl, setCurrentVideoUrl] = useState(() => {
    const live = curationStore.getLiveContent().hero;
    return live.videoUrl || curationStore.getCustomHeroVideo() || PRESET_VIDEOS[0].url;
  });
  const [customInputUrl, setCustomInputUrl] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // User's full-screen image fallback
  const heroImageUrl =
    heroContent.imageUrl ||
    curationStore.getLiveContent().bio.portraitUrl ||
    'https://lh3.googleusercontent.com/aida/AEtjO1VznS8ccb9Y8azNd-tdmzBuk9nfR-NWhnMZGOgOfE9ypHtzAc0crWqeqvz6n0M287VRu1Bt41BZ6IGhQjMHdLkq-9foQTzfhU_08jPfc2rOQwdgOG5ZtPou1KNCePFTixcyMw5WAyFqD9MHDHb0Xj6W301dz3wFzDUX5sT5sFKP1CBuEGaNpcEzKj932fhz2zeZHHwtYJmA-0P6jvVQAcL_EhrmeVDHqZ7LWw_pTmVeOgtutgR0pRi1xg';

  useEffect(() => {
    const unsub = curationStore.subscribe(() => {
      const live = curationStore.getLiveContent().hero;
      setHeroContent(live);
      if (live.videoUrl) {
        setCurrentVideoUrl(live.videoUrl);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (viewMode === 'video' && videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play().catch(() => {
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
  }, [isPlaying, isMuted, currentVideoUrl, viewMode]);

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
      setViewMode('video');
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[680px] flex flex-col justify-end overflow-hidden bg-[#0A0A0A]">
      {/* Visual Background: Full-Screen User Image (Default on Load) or Ambient Video */}
      {viewMode === 'image' ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={heroImageUrl}
            alt="Mark Chinedum Daniel (Drapevangelist)"
            className="w-full h-full object-cover object-top sm:object-center filter grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-1000 scale-100"
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={currentVideoUrl}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none scale-105 transition-transform duration-1000 ease-out filter grayscale contrast-125 brightness-80"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Atmospheric Scrim Overlays for Deep Contrast and Readability */}
      {/* 1. Base dark tint */}
      <div className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-[0.3px] pointer-events-none" />

      {/* 2. Top Vignette for clear navbar blending */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-transparent pointer-events-none z-10" />

      {/* 3. Deep Cinematic Bottom Gradient for bottom-left text contrast */}
      <div className="absolute bottom-0 inset-x-0 h-3/4 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 via-50% to-transparent pointer-events-none z-10" />

      {/* 4. Fine Hairline Frame Borders */}
      <div className="absolute inset-4 sm:inset-8 border border-[#262626]/70 pointer-events-none z-10" />

      {/* Top Floating Utility Ribbon */}
      <div className="absolute top-6 sm:top-10 inset-x-6 sm:inset-x-12 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 sm:gap-3 bg-[#0A0A0A]/80 px-3 py-1.5 border border-[#262626] backdrop-blur-md pointer-events-auto">
          <span className="w-2 h-2 bg-[#D32F2F] animate-pulse"></span>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#E5E2E1] font-bold">
            PORTRAIT DISPATCH // 2026 EDITION
          </span>
        </div>

        {/* View Switcher & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Subtle View Toggle: Image vs Video Reel */}
          <div className="flex items-center border border-[#262626] bg-[#141414]/90 text-xs font-mono">
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMode('image');
              }}
              className={`px-2.5 py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'image'
                  ? 'bg-[#FFFFFF] text-[#0A0A0A] font-bold'
                  : 'text-[#8E9192] hover:text-[#FFFFFF]'
              }`}
              title="Full Screen Photo View (Default)"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Photo</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMode('video');
              }}
              className={`px-2.5 py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'video'
                  ? 'bg-[#D32F2F] text-[#FFFFFF] font-bold'
                  : 'text-[#8E9192] hover:text-[#FFFFFF]'
              }`}
              title="Full Screen Ambient Video Loop"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Video Reel</span>
            </button>
          </div>

          {/* Video Switcher Config (Editor backend only) */}
          {isEditorAllowed && viewMode === 'video' && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider text-[#C4C7C7] hover:text-[#FFFFFF] bg-[#141414]/90 hover:bg-[#20201F] border border-[#262626] transition-colors cursor-pointer"
              title="Configure Background Video Stream"
            >
              <Video className="w-3.5 h-3.5 text-[#D32F2F]" />
              <span className="hidden sm:inline">Stream</span>
            </button>
          )}

          <button
            onClick={onOpenContact}
            className="px-3 sm:px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#E5E2E1] transition-colors border border-[#FFFFFF] cursor-pointer"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Hero Core Content Pinned to the Bottom Left (Exact User Specification) */}
      <div className="relative z-20 max-w-4xl px-6 sm:px-12 lg:px-16 pb-12 sm:pb-16 lg:pb-20 text-left">
        {/* Line 1: Mark Chinedum Daniel in small fonts */}
        <p className="text-xs sm:text-sm md:text-base font-inter font-bold tracking-[0.25em] uppercase text-[#C4C7C7] mb-1.5 sm:mb-2.5 flex items-center gap-2 select-none">
          <span className="inline-block w-2 h-2 bg-[#D32F2F]"></span>
          <span>{heroContent.kicker || 'Mark Chinedum Daniel'}</span>
        </p>

        {/* Line 2: DRAPEVANGELIST in bolder fonts */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-oswald uppercase font-black tracking-tight text-[#FFFFFF] leading-[0.88] select-none drop-shadow-2xl">
          {heroContent.headline || 'DRAPEVANGELIST'}
        </h1>

        {/* Line 3: Beneath, community operations manager */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-xl lg:text-2xl font-inter uppercase font-semibold tracking-[0.16em] text-[#E5E2E1] select-none">
          {heroContent.tagline || 'Community Operations Manager'}
        </p>

        {/* Editorial Sub-narrative Kicker */}
        {heroContent.subtext && (
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#8E9192] max-w-2xl font-inter leading-relaxed">
            {heroContent.subtext}
          </p>
        )}

        {/* Broadsheet Action Buttons with 0px Radius */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              soundEngine.playClick();
              onScrollToBio();
            }}
            className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs uppercase font-bold tracking-widest text-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#E5E2E1] transition-all cursor-pointer border border-[#FFFFFF]"
          >
            <span>Read Bio & Journey</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenContact();
            }}
            className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs uppercase font-bold tracking-widest text-[#FFFFFF] bg-[#141414]/90 hover:bg-[#20201F] border border-[#262626] hover:border-[#8E9192] transition-all cursor-pointer backdrop-blur-sm"
          >
            <span>Connect Directly</span>
            <ArrowUpRight className="w-4 h-4 text-[#D32F2F]" />
          </button>
        </div>
      </div>

      {/* Bottom Right Scroll Indicator */}
      <div className="hidden lg:flex absolute bottom-12 sm:bottom-16 right-8 sm:right-16 z-20 flex-col items-end gap-2 text-right">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#757575] font-bold">
          DOCUMENTARY DOSSIER
        </span>
        <button
          onClick={() => {
            soundEngine.playClick();
            onScrollToBio();
          }}
          className="flex items-center gap-2 text-xs font-mono uppercase text-[#FFFFFF] hover:text-[#D32F2F] bg-[#141414]/90 px-3.5 py-2 border border-[#262626] hover:border-[#D32F2F] backdrop-blur-md transition-colors cursor-pointer"
        >
          <span>Scroll to Inspect</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#D32F2F] animate-bounce" />
        </button>
      </div>

      {/* Optional Video Playback Controls (Only if in video mode) */}
      {viewMode === 'video' && (
        <div className="absolute bottom-6 left-6 z-30 flex items-center gap-2">
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
        </div>
      )}

      {/* Video Source Switcher Drawer (Editor Backend) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#141414] border border-[#262626] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div>
                <span className="font-mono text-xs uppercase text-[#D32F2F] tracking-widest font-bold">
                  MEDIA CONFIGURATION
                </span>
                <h3 className="font-oswald text-xl uppercase font-bold text-[#FFFFFF]">
                  Background Video Source
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 border border-[#262626] bg-[#0A0A0A] text-[#8E9192] hover:text-[#FFFFFF]"
              >
                ✕
              </button>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#757575] font-bold block">
                Select Editorial Preset
              </span>
              <div className="grid grid-cols-1 gap-2">
                {PRESET_VIDEOS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setCurrentVideoUrl(preset.url);
                      curationStore.setCustomHeroVideo(preset.url);
                      setViewMode('video');
                      setIsDrawerOpen(false);
                      setIsPlaying(true);
                    }}
                    className={`text-left p-3 border transition-colors flex items-center justify-between cursor-pointer ${
                      currentVideoUrl === preset.url
                        ? 'border-[#D32F2F] bg-[#1A1A1A]'
                        : 'border-[#262626] bg-[#0A0A0A] hover:border-[#444748]'
                    }`}
                  >
                    <div>
                      <p className="font-oswald text-sm uppercase text-[#FFFFFF] font-bold">
                        {preset.name}
                      </p>
                      <p className="text-xs text-[#8E9192] font-inter">
                        {preset.description}
                      </p>
                    </div>
                    {currentVideoUrl === preset.url && (
                      <Check className="w-4 h-4 text-[#D32F2F] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL Input */}
            <form onSubmit={applyCustomVideo} className="space-y-3 pt-2 border-t border-[#262626]">
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#757575] font-bold block">
                Or Enter Custom Video Stream URL (.mp4 / webm)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://your-domain.com/loop.mp4"
                  value={customInputUrl}
                  onChange={(e) => setCustomInputUrl(e.target.value)}
                  className="flex-1 bg-[#0A0A0A] border border-[#262626] px-3 py-2 text-xs text-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:border-[#D32F2F] font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-inter text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

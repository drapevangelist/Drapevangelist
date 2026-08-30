import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';
import { Sparkles, X, Trophy, Zap } from 'lucide-react';
import mascotImg from '../assets/images/mascot_gida_character_1788099455313.jpg';

const MASCOT_QUOTES = [
  "You caught me! ⚡",
  "GIDA Academy squad in the building! 🔥",
  "Web3 builder detected! 🚀",
  "70+ onboarded and counting! 💎",
  "Music + Code + Community = Drapevangelist!",
  "Keep exploring the vault! 🌟",
  "Building the future of decentralized tech!"
];

export const Mascot: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 40, y: 120 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const [speech, setSpeech] = useState<string | null>(null);
  const [foundCount, setFoundCount] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const timerRef = useRef<number | null>(null);
  const speechTimerRef = useRef<number | null>(null);

  const calculateRandomSpot = useCallback(() => {
    const size = window.innerWidth <= 640 ? 90 : 130;
    const margin = 20;
    const safeTop = 95; // Clear of sticky nav
    const safeBottom = 110; // Clear of audio button and bottom actions

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const maxX = Math.max(vw - size - margin, margin);
    const maxY = Math.max(vh - size - safeBottom, safeTop);

    let x = margin + Math.random() * (maxX - margin);
    let y = safeTop + Math.random() * (maxY - safeTop);

    // Keep clear of bottom-left audio button zone
    if (x < 140 && y > vh - 150) {
      x = 150 + Math.random() * (maxX - 150);
    }

    return { x, y };
  }, []);

  const triggerPeek = useCallback(() => {
    const spot = calculateRandomSpot();
    setPosition(spot);
    setIsVisible(true);

    const visibleDuration = 3200 + Math.random() * 1600;

    timerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      const waitTime = 4000 + Math.random() * 4500;
      timerRef.current = window.setTimeout(triggerPeek, waitTime);
    }, visibleDuration);
  }, [calculateRandomSpot]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Start peeking 2 seconds after load
    const initialTimeout = window.setTimeout(triggerPeek, 2000);

    return () => {
      clearTimeout(initialTimeout);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
  }, [triggerPeek]);

  const handleMascotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playMascotFound();
    setIsInteracted(true);
    const newCount = foundCount + 1;
    setFoundCount(newCount);
    setShowBadge(true);

    const randomQuote = MASCOT_QUOTES[Math.floor(Math.random() * MASCOT_QUOTES.length)];
    setSpeech(randomQuote);

    // Confetti explosion from mascot position
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 70,
      origin: { x: originX, y: originY },
      colors: ['#B7F34A', '#CFFF6E', '#14532D', '#F5F3E8', '#EA4335'],
      disableForReducedMotion: true,
    });

    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    speechTimerRef.current = window.setTimeout(() => {
      setSpeech(null);
      setIsInteracted(false);
    }, 3500);
  };

  return (
    <>
      <div
        id="mascot"
        onClick={handleMascotClick}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className={`fixed z-30 cursor-pointer select-none transition-all duration-700 ease-out group ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
        }`}
        role="button"
        tabIndex={0}
        aria-label="Interactive Drapevangelist mascot - Click me!"
      >
        {/* Speech Bubble when clicked */}
        {speech && (
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#061F11] px-4 py-2 text-xs font-bold text-[#B7F34A] shadow-2xl border border-[#B7F34A]/50 animate-bounce flex items-center gap-1.5 z-40">
            <Zap className="h-3.5 w-3.5 text-[#B7F34A]" />
            <span>{speech}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 bg-[#061F11] border-r border-b border-[#B7F34A]/50" />
          </div>
        )}

        <div className="relative w-24 h-24 sm:w-32 sm:h-32 transition-transform duration-300 group-hover:scale-110">
          {/* Animated Glow Aura */}
          <div className="absolute inset-0 rounded-2xl bg-[#B7F34A]/25 blur-lg group-hover:bg-[#B7F34A]/45 transition-colors animate-pulse" />

          {/* Container with rounded border and character image */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#B7F34A]/40 bg-[#061F11]/90 shadow-[0_12px_30px_rgba(0,0,0,0.8)] backdrop-blur-sm p-1">
            <img
              src={mascotImg}
              alt="Drapevangelist GIDA Mascot"
              className="w-full h-full object-contain rounded-xl drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Live indicator badge */}
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#14532D] border-2 border-[#B7F34A] shadow-md text-[#B7F34A]">
            <Sparkles className="h-3.5 w-3.5 animate-spin" />
          </div>
        </div>

        <div className="mt-1.5 text-center text-[10px] font-bold text-[#B7F34A] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity bg-[#061F11]/90 px-2.5 py-1 rounded-full border border-[#B7F34A]/30 backdrop-blur-md shadow-lg">
          Catch Me!
        </div>
      </div>

      {/* Discovery Achievement Toast if clicked */}
      {showBadge && (
        <div className="fixed top-20 right-6 z-40 flex items-center gap-3 rounded-2xl bg-[#061F11] border border-[#B7F34A]/60 p-3.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 duration-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14532D] text-[#B7F34A] border border-[#B7F34A]/30">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#B7F34A] flex items-center gap-1.5">
              <span>Mascot Discovered!</span>
              <span className="rounded-full bg-[#B7F34A]/20 px-2 py-0.2 text-[10px] text-[#B7F34A]">x{foundCount}</span>
            </div>
            <div className="text-[11px] text-[#F5F3E8]/80">You caught Drapevangelist's GIDA Mascot!</div>
          </div>
          <button
            onClick={() => setShowBadge(false)}
            className="ml-2 text-[#6B8F71] hover:text-[#F5F3E8] transition-colors p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
};

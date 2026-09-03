import React, { useEffect, useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Attempt audio start immediately
    soundEngine.autoStart();

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPercent(100);
      setHidden(true);
      soundEngine.play().catch(() => {});
      onComplete();
      return;
    }

    let start: number | null = null;
    const duration = 1500; // ms

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      // Quartic ease-out for realistic loading feeling
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * 100);
      setPercent(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setHidden(true);
          soundEngine.play().catch(() => {});
          setTimeout(onComplete, 500);
        }, 200);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <div
      id="preloader"
      onClick={() => soundEngine.play().catch(() => {})}
      onTouchStart={() => soundEngine.play().catch(() => {})}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B2E1A] transition-all duration-500 ease-out cursor-pointer ${
        hidden ? 'opacity-0 pointer-events-none invisible' : 'opacity-100'
      }`}
    >
      <div className="flex items-baseline gap-1 font-display text-7xl font-bold tracking-tight text-[#B7F34A]">
        <span id="preload-percent">{percent}</span>
        <span className="text-3xl text-[#6B8F71]">%</span>
      </div>

      <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#6B8F71]">
        Loading Drapevangelist
      </div>

      <div className="mt-6 h-1 w-56 overflow-hidden rounded-full bg-[#F5F3E8]/10">
        <div
          id="preload-bar-fill"
          className="h-full bg-[#B7F34A] transition-all duration-75 ease-linear shadow-[0_0_12px_rgba(183,243,74,0.6)]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-[#6B8F71]/80">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B7F34A] animate-pulse" />
        <span>Initializing Web3 & Creative Vault</span>
      </div>
    </div>
  );
};

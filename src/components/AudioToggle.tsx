import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    soundEngine.toggle();
    soundEngine.playClick();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* Audio Toggle Button */}
      <button
        id="audio-toggle"
        onClick={handleToggle}
        onMouseEnter={() => setShowControls(true)}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        className={`group relative flex h-13 w-13 items-center justify-center rounded-full border bg-[#061F11] shadow-2xl transition-all duration-300 ${
          isPlaying
            ? 'border-[#B7F34A] shadow-[0_0_20px_rgba(183,243,74,0.35)] ring-2 ring-[#B7F34A]/20'
            : 'border-[#F5F3E8]/15 hover:border-[#B7F34A]'
        }`}
      >
        <div className="flex items-center justify-center gap-[3.5px]">
          <span
            className={`w-[3.5px] rounded-full bg-[#B7F34A] transition-all duration-200 ${
              isPlaying ? 'animate-eq-1 h-4' : 'h-1.5'
            }`}
          />
          <span
            className={`w-[3.5px] rounded-full bg-[#B7F34A] transition-all duration-200 ${
              isPlaying ? 'animate-eq-2 h-6' : 'h-2'
            }`}
          />
          <span
            className={`w-[3.5px] rounded-full bg-[#B7F34A] transition-all duration-200 ${
              isPlaying ? 'animate-eq-3 h-3.5' : 'h-1.5'
            }`}
          />
        </div>

        {/* Status tooltip dot */}
        <span
          className={`absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-[#0B2E1A] transition-colors ${
            isPlaying ? 'bg-[#B7F34A] animate-ping' : 'bg-transparent'
          }`}
        />
      </button>

      {/* Floating Track Info & Volume Popover (expands on hover or click) */}
      <div
        className={`transition-all duration-300 ${
          showControls || isPlaying
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 -translate-x-3 pointer-events-none'
        }`}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="flex items-center gap-3 rounded-2xl bg-[#061F11]/95 border border-[#F5F3E8]/10 px-3.5 py-2 backdrop-blur-md shadow-xl text-xs text-[#F5F3E8]">
          <div className="flex items-center gap-2">
            <Music className={`h-3.5 w-3.5 ${isPlaying ? 'text-[#B7F34A] animate-pulse' : 'text-[#6B8F71]'}`} />
            <div className="flex flex-col">
              <span className="font-semibold text-[11px] leading-tight text-[#F5F3E8]">
                {isPlaying ? 'Drapevangelist Lo-Fi Loop' : 'Ambient Music'}
              </span>
              <span className="text-[9px] text-[#6B8F71]">
                {isPlaying ? 'Web Audio • 84 BPM' : 'Click EQ icon to play'}
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-[#F5F3E8]/10 mx-1" />

          {/* Volume slider */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                const nextVol = volume === 0 ? 0.4 : 0;
                setVolume(nextVol);
                soundEngine.setVolume(nextVol);
              }}
              className="text-[#6B8F71] hover:text-[#B7F34A] transition-colors"
            >
              {volume === 0 ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-[#B7F34A] bg-[#14532D] rounded-lg cursor-pointer"
              aria-label="Volume slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

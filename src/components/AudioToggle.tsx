import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(soundEngine.getTrackMeta().hasAudioSource);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubPlay = soundEngine.subscribe((playing) => setIsPlaying(playing));
    const unsubMeta = soundEngine.subscribeMeta((meta) => setHasAudio(meta.hasAudioSource));
    const unsubReq = soundEngine.onRequestUpload(() => {
      fileInputRef.current?.click();
    });

    // Keyboard shortcut for owner/admin: Ctrl+Shift+U or Alt+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'u') || (e.altKey && e.key.toLowerCase() === 'u')) {
        e.preventDefault();
        fileInputRef.current?.click();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubPlay();
      unsubMeta();
      unsubReq();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggle = () => {
    soundEngine.playClick();
    if (!hasAudio) {
      fileInputRef.current?.click();
      return;
    }
    soundEngine.toggle();
  };

  const handleDoubleClick = () => {
    // Secret owner shortcut: double click to upload/replace song
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) {
      return;
    }
    await soundEngine.setAudioFile(file, 'Gonna Be Better', 'Drapevangelist');
    soundEngine.play();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 select-none">
      {/* Hidden File Input for Owner / Admin Audio Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        accept="audio/*,.mp3,.wav,.ogg,.m4a"
        className="hidden"
      />

      {/* Clean Public Audio Interface Button */}
      <button
        id="audio-toggle"
        onClick={handleToggle}
        onDoubleClick={handleDoubleClick}
        title={isPlaying ? 'Mute / Pause Audio' : 'Play Audio (On Repeat)'}
        aria-label={isPlaying ? 'Mute audio' : 'Play audio on repeat'}
        className={`group relative flex h-12 items-center gap-2.5 rounded-full border px-4 py-2 bg-[#061F11]/90 backdrop-blur-md shadow-2xl transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'border-[#B7F34A] shadow-[0_0_20px_rgba(183,243,74,0.35)] ring-1 ring-[#B7F34A]/40'
            : 'border-[#F5F3E8]/15 hover:border-[#B7F34A]/60'
        }`}
      >
        {/* Equalizer Waveform Bars */}
        <div className="flex items-center gap-[3px] h-4">
          <span
            className={`w-[2.5px] rounded-full bg-[#B7F34A] transition-all duration-200 ${
              isPlaying ? 'animate-eq-1 h-3.5' : 'h-1.5 opacity-50'
            }`}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#B7F34A] transition-all duration-200 ${
              isPlaying ? 'animate-eq-2 h-5' : 'h-2.5 opacity-50'
            }`}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#B7F34A] transition-all duration-200 ${
              isPlaying ? 'animate-eq-3 h-4' : 'h-1.5 opacity-50'
            }`}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#B7F34A] transition-all duration-200 ${
              isPlaying ? 'animate-eq-1 h-3' : 'h-1 opacity-50'
            }`}
          />
        </div>

        {/* Audio State Icon */}
        <div className="flex items-center text-[#B7F34A]">
          {isPlaying ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4 text-[#6B8F71] group-hover:text-[#B7F34A] transition-colors" />
          )}
        </div>

        {/* Status Indicator */}
        <span className="text-[11px] font-semibold tracking-wide text-[#F5F3E8]/90 group-hover:text-[#B7F34A] transition-colors">
          {isPlaying ? 'AUDIO ON' : 'AUDIO OFF'}
        </span>
      </button>
    </div>
  );
};

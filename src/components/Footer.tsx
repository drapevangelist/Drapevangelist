import React from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onTriggerMascot?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="border-t border-[#F5F3E8]/8 py-10 text-center text-xs text-[#6B8F71]">
      <div className="max-w-[1080px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#B7F34A] animate-pulse" />
          <span>Drapevangelist &copy; {new Date().getFullYear()}</span>
        </div>

        <div className="text-[11px] text-[#6B8F71]/80">
          Decentralized Community · AI Tooling · Creative Sound
        </div>
      </div>
    </footer>
  );
};

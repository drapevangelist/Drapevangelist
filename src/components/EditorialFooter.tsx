import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const EditorialFooter: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#0A0A0A] border-t border-[#262626] text-xs text-[#757575] font-inter">
      <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <img src="/assets/logo.jpg" alt="Drapevangelist Crest" className="w-6 h-6 object-cover border border-[#262626]" />
          <span className="font-oswald text-[#FFFFFF] text-sm font-bold uppercase tracking-wider">DRAPEVANGELIST</span>
          <span className="text-[#444748]">/</span>
          <span>Official Archival Record // 2022—2026</span>
          <span className="text-[#444748]">/</span>
          <span className="font-mono text-[#D32F2F] font-bold">DISPATCH 044</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <span className="text-[#8E9192]">PORT HARCOURT • LAGOS • GLOBAL</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#FFFFFF] hover:text-[#D32F2F] transition-colors cursor-pointer border border-[#262626] px-3 py-1 bg-[#131313]"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-3 w-3 text-[#D32F2F]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

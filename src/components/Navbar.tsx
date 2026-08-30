import React from 'react';
import { PageMode } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { ArrowRight, Globe, Palette, Mail } from 'lucide-react';
import brandLogo from '../assets/images/logo.jpg';

interface NavbarProps {
  currentPage: PageMode;
  onPageChange: (page: PageMode) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  onOpenContact,
}) => {
  const handleToggle = () => {
    soundEngine.playSwitch();
    onPageChange(currentPage === 'web3' ? 'web2' : 'web3');
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0B2E1A]/90 backdrop-blur-md border-b border-[#F5F3E8]/8 transition-colors">
      <div className="max-w-[1080px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Brand with Character Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden border-2 border-[#B7F34A]/60 bg-[#14532D] shadow-md shadow-[#B7F34A]/10 group cursor-pointer hover:border-[#B7F34A] transition-all">
            <img
              src={brandLogo}
              alt="Drapevangelist Logo"
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#B7F34A] border-2 border-[#0B2E1A] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-[#F5F3E8]">
              Drapevangelist
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#6B8F71] font-semibold -mt-1 hidden sm:inline-block">
              {currentPage === 'web3' ? 'Web3 & Community Operations' : 'Creative, Music & Words'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Contact Button */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#F5F3E8]/80 hover:text-[#B7F34A] hover:bg-[#14532D]/50 border border-transparent hover:border-[#B7F34A]/30 transition-all cursor-pointer"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Get in Touch</span>
          </button>

          {/* Main Dual-View Switch Button */}
          <button
            id="switch-btn"
            onClick={handleToggle}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F5F3E8]/15 bg-[#061F11] font-display font-semibold text-sm text-[#B7F34A] hover:bg-[#B7F34A] hover:text-[#0B2E1A] hover:border-[#B7F34A] transition-all duration-200 shadow-lg cursor-pointer"
          >
            {currentPage === 'web3' ? (
              <>
                <Palette className="h-4 w-4 text-[#B7F34A] group-hover:text-[#0B2E1A] transition-colors" />
                <span>View Web2</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 text-[#B7F34A] group-hover:text-[#0B2E1A] transition-colors" />
                <span>View Web3</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

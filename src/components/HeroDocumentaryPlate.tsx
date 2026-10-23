import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface HeroDocumentaryPlateProps {
  onScrollToLedger: () => void;
  onScrollToAi: () => void;
}

export const HeroDocumentaryPlate: React.FC<HeroDocumentaryPlateProps> = ({
  onScrollToLedger,
  onScrollToAi,
}) => {
  return (
    <section className="relative w-full bg-[#0A0A0A] border-b border-[#262626] py-12 lg:py-16 text-[#E5E2E1]">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Overline Dispatch Protocol Stamp */}
        <div className="flex items-center justify-between pb-6 border-b border-[#262626] mb-10">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 bg-[#D32F2F]"></span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E5E2E1] font-bold">
              ARCHIVAL RECORD // 2022—2026
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 font-mono text-xs uppercase text-[#757575]">
            <span>PORT HARCOURT • LAGOS • GLOBAL NODES</span>
            <span>DISPATCH NO. 044</span>
          </div>
        </div>

        {/* Master Subtitle & Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8 space-y-3">
            <span className="font-mono text-xs uppercase text-[#D32F2F] tracking-widest block font-bold">
              DECENTRALIZED COMMUNITY ARCHIVE
            </span>
            <h2 className="font-oswald text-4xl sm:text-6xl lg:text-7xl uppercase font-bold tracking-tight text-[#FFFFFF] leading-[0.92]">
              LEADER. OPERATOR.<br />ECOSYSTEM BUILDER.
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-4">
            <div className="bg-[#131313] p-5 border-l-2 border-[#D32F2F] border-y border-r border-[#262626]">
              <p className="text-xs sm:text-sm text-[#C4C7C7] font-inter leading-relaxed">
                Building community, content, and builder pipelines across the decentralized web. <span className="text-[#FFFFFF] font-semibold">44+ verified engagements</span> across 20+ Web3 ecosystems — Base, Movement, Solana, Sui, Decred, Arbitrum, Ethereum.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onScrollToLedger();
                }}
                className="px-5 py-2.5 bg-[#FFFFFF] text-[#0A0A0A] font-inter text-xs uppercase font-bold tracking-wider hover:bg-[#E5E2E1] transition-colors inline-flex items-center gap-2 cursor-pointer border border-[#FFFFFF]"
              >
                <span>Inspect Ledger</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onScrollToAi();
                }}
                className="px-4 py-2.5 border border-[#262626] bg-[#141414] text-[#E5E2E1] font-inter text-xs uppercase tracking-wider hover:bg-[#20201F] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D32F2F]" />
                <span>Query AI</span>
                <span className="w-1.5 h-1.5 bg-[#D32F2F] animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Documentary Plate Photo Feature */}
        <div className="relative w-full aspect-[21/9] min-h-[320px] max-h-[520px] bg-[#131313] overflow-hidden border border-[#262626] group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDodyDtOQtr85TLBf2rwH3XXDX22CY4qNd-QDicqF7jsN8-70rw50OgUV5P_jqObeajSMzg8ouLO02FeRm6yJZt31doNGN-8QuKGEbSH9j5Ser_p1VCVv-q_uTq46d-AqhoBc07uUJFyx_AINc1ZKeGYXS28gRGPOBDpGTOHJUlsjEAN7Zv9wfnKK9x5vdcEY6iedLxlJFlyjoU1TBDL9Li7lfBp-D1RMf21muLgJ3MJWV9nhMDcn0"
            alt="Campus Convergence UniPort Summit"
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase text-[#D32F2F] tracking-widest block font-bold mb-1">
                IRL DISPATCH // FIELD ARCHIVE
              </span>
              <p className="font-oswald text-2xl sm:text-4xl uppercase text-[#FFFFFF] font-bold">
                CAMPUS CONVERGENCE — UNIPORT SUMMIT
              </p>
            </div>
            <div className="font-mono text-[11px] uppercase text-[#E5E2E1] tracking-widest bg-[#0A0A0A]/90 px-4 py-2 border border-[#262626] backdrop-blur-md">
              70+ ONBOARDED • 40+ HOURS LIVE CODING WORKSHOPS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

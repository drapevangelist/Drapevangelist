import React from 'react';
import { ArrowDown, ExternalLink, ShieldCheck, Mail } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { MASTER_PROOF_OF_WORK } from '../data/portfolioData';

interface EditorialHeroProps {
  onExploreTimeline: () => void;
  onExploreProofOfWork: () => void;
  onOpenContact: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onExploreTimeline,
  onExploreProofOfWork,
  onOpenContact,
}) => {
  return (
    <section id="overview" className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#F7F5EE]/10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Curatorial Masthead Tag */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8FA895] tracking-wider uppercase mb-6">
          <ShieldCheck className="h-4 w-4 text-[#B7F34A]" />
          <span>Verified Public Dossier</span>
          <span aria-hidden="true">·</span>
          <span>Web3 Operations & Campus Stewardship</span>
          <span aria-hidden="true">·</span>
          <span>Port Harcourt, Nigeria</span>
        </div>

        {/* Main Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Column: Statement & Bio Deck */}
          <div className="lg:col-span-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-[#F7F5EE] leading-[1.15] text-balance">
              Building onchain ecosystems through grounded campus leadership and verified community execution.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#F7F5EE]/80 leading-relaxed font-normal max-w-2xl">
              I am <span className="text-[#F7F5EE] font-semibold">Drapevangelist</span> — a Web3 Community Operations Manager, UniPort Campus Coordinator, and independent recording artist. My work bridges grassroots university developer mobilization with decentralized protocol governance, IRL summit orchestration, and transparent onchain stewardship.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-[#8FA895] font-mono">
              <span className="text-[#F7F5EE]">Decred Africa Social Media Manager</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#B7F34A]">UniPort Coordinator (DevCon 2026 / infinitswap / ETHNigeria)</span>
              <span aria-hidden="true">·</span>
              <span>Recording Artist since 2017</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onExploreTimeline();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#B7F34A] text-[#071A10] font-semibold text-xs sm:text-sm hover:bg-[#CFFF6E] transition-colors shadow-sm cursor-pointer"
              >
                <span>Read Chronological Journey</span>
                <ArrowDown className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onExploreProofOfWork();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[#F7F5EE]/20 hover:border-[#B7F34A]/50 text-[#F7F5EE] hover:text-[#B7F34A] font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <span>Browse {MASTER_PROOF_OF_WORK.length} Verified Proofs</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenContact();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm text-[#8FA895] hover:text-[#F7F5EE] transition-colors cursor-pointer ml-1"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Channels</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quantifiable Metrics Box (peterobi.online inspired) */}
          <div className="lg:col-span-4 bg-[#0A2316] border border-[#F7F5EE]/10 rounded-xl p-6 sm:p-7">
            <div className="text-xs uppercase font-mono tracking-widest text-[#8FA895] mb-5 border-b border-[#F7F5EE]/10 pb-3 flex items-center justify-between">
              <span>Stewardship Metrics</span>
              <span className="text-[#B7F34A]">Verified</span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#B7F34A] tracking-tight tabular-nums">
                  {MASTER_PROOF_OF_WORK.length}
                </div>
                <div className="text-sm font-medium text-[#F7F5EE] mt-1">Confirmed Web3 Records</div>
                <div className="text-xs text-[#8FA895] mt-0.5">
                  Across operations, ambassador roles, volunteering & project management
                </div>
              </div>

              <div className="border-t border-[#F7F5EE]/10 pt-4">
                <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#F7F5EE] tracking-tight tabular-nums">
                  40+
                </div>
                <div className="text-sm font-medium text-[#F7F5EE] mt-1">IRL Summits Coordinated</div>
                <div className="text-xs text-[#8FA895] mt-0.5">
                  Base, Movement Network, Rujira Academy, SEBGW & ETHNigeria
                </div>
              </div>

              <div className="border-t border-[#F7F5EE]/10 pt-4">
                <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#B7F34A] tracking-tight tabular-nums">
                  70+
                </div>
                <div className="text-sm font-medium text-[#F7F5EE] mt-1">UniPort Students Onboarded</div>
                <div className="text-xs text-[#8FA895] mt-0.5">
                  Direct hands-on developer workshops & technical onboarding
                </div>
              </div>

              <div className="border-t border-[#F7F5EE]/10 pt-4">
                <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#F7F5EE] tracking-tight tabular-nums">
                  15+
                </div>
                <div className="text-sm font-medium text-[#F7F5EE] mt-1">Ecosystems & Protocols</div>
                <div className="text-xs text-[#8FA895] mt-0.5">
                  Decred, Movement, Ethereum, Solana, Base, Sui Move & Arbitrum
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

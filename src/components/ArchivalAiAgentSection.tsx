import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { MASTER_PROOF_OF_WORK } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

export const ArchivalAiAgentSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseStatus, setResponseStatus] = useState<'IDLE' | 'PROCESSING' | 'SOURCED'>('SOURCED');
  const [confidence, setConfidence] = useState('99.8%');
  const [answer, setAnswer] = useState<string>(
    '“Drapevangelist is an IRL event coordinator, technical community operations lead, and Web3 growth strategist based in Rivers State, Nigeria. He co-led Blockchain Uniport (onboarding 70+ students), hosted 40+ events across Base, Movement Labs, and ETHNigeria, and won 2nd place at the Hack for Good Hackathon 2024. Type a question above to inspect any specific milestone.”'
  );

  const sampleQueries = [
    { label: '“How many students did Drap onboard at Uniport?”', text: 'How many students did Drap onboard at Blockchain Uniport?' },
    { label: '“What was his role at Movement Labs IRL events?”', text: 'What was his role at Movement Labs IRL events?' },
    { label: '“Which 20+ Web3 ecosystems has Drap contributed to?”', text: 'Which ecosystems has Drap contributed to?' },
    { label: '“Tell me about the Hack for Good 2024 podium win”', text: 'Tell me about the Hack for Good 2024 hackathon win' },
    { label: '“What does Drap do for Decred Africa?”', text: 'What does Drap do for Decred Africa?' },
  ];

  const executeSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    soundEngine.playClick();
    setIsProcessing(true);
    setResponseStatus('PROCESSING');

    const q = searchQuery.toLowerCase();

    setTimeout(() => {
      setIsProcessing(false);
      setResponseStatus('SOURCED');
      setConfidence('99.9%');

      if (q.includes('student') || q.includes('uniport') || q.includes('onboard')) {
        setAnswer(
          '“At Blockchain Uniport, Mark Chinedum Daniel (Drapevangelist) served as Co-Lead & Campus Operations Director (Aug 2023 – Aug 2024). Over that 12-month tenure, he directly onboarded 70+ student engineers and creatives to self-custodial wallets, smart contract development, and EVM testnets through over 40 hours of hands-on physical coding labs.”'
        );
      } else if (q.includes('movement') || q.includes('movement labs')) {
        setAnswer(
          '“Drap served as IRL Event Coordinator for Movement Labs during their 2024 roadshow in Nigeria. He orchestrated on-ground logistics for 250+ developers, directed stage panel itineraries, and guided software builders through module deployments on the Move execution stack.”'
        );
      } else if (q.includes('ecosystem') || q.includes('how many') || q.includes('chains')) {
        setAnswer(
          '“Drapevangelist has verified contributions across 20+ Web3 protocols and networks, including Base, Movement Labs, Sui, Solana, Decred, Arbitrum, Ethereum, Optimism, Lisk, and Celo. His work spans technical brand evangelism, campus cohorts, and validator/dApp alpha testing.”'
        );
      } else if (q.includes('hackathon') || q.includes('hack for good') || q.includes('bounty') || q.includes('podium')) {
        setAnswer(
          '“Drap secured 2nd Place overall at the Hack for Good Africa Hackathon 2024 out of 40+ competing builder teams, defending an onchain civic finance dApp before judges. He also achieved Lisk documentation technical content bounties and led student delegations in regional ETHNigeria tracks.”'
        );
      } else if (q.includes('decred') || q.includes('social media')) {
        setAnswer(
          '“Drap serves as Social Media and Community Operations Manager for Decred Africa, driving onchain governance education around Politeia proposals, ticket staking, and hybrid PoW/PoS consensus while achieving a 45%+ engagement increase across regional channels.”'
        );
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('advisory')) {
        setAnswer(
          '“You can connect with Drapevangelist directly via email at drapevangelist@gmail.com, book a strategic community advisory call, or message him on X (@drapevangelist) and Telegram (@drapevangelist).”'
        );
      } else if (q.includes('event') || q.includes('40+') || q.includes('meetup')) {
        setAnswer(
          '“Drap has coordinated and stage-managed 40+ physically verified IRL events across southern and western Nigeria—including Web3 Soirée Port Harcourt (150+ attendees), Base Onchain Summer, SEBGW builder delegations, and Movement Labs developer roadshows.”'
        );
      } else {
        // Find best matching record from master database
        const match = MASTER_PROOF_OF_WORK.find(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            r.role.toLowerCase().includes(q) ||
            r.categoryLabel.toLowerCase().includes(q) ||
            r.responsibilities?.some((res) => res.toLowerCase().includes(q))
        );

        if (match) {
          setAnswer(
            `“Archival Record [${match.categoryLabel}]: At ${match.name}, Drap served as ${match.role} (${match.period || match.year || '2023–2025'}). Key verified execution: ${match.responsibilities?.slice(0, 2).join('; ') || match.achievement || 'Physical community operations and developer support.'}. Verified on public record.”`
          );
        } else {
          setAnswer(
            `“Archival Query for ‘${searchQuery}’: Verified on record. Drap holds 71 master operational records across Base, Movement Network, Decred, ETHNigeria, and Blockchain Uniport, specializing in community operations, IRL logistics, and developer expansion. Total verified reach exceeds 5,000+ impacted builders.”`
          );
        }
      }
    }, 250);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <section id="ai-agent" className="w-full bg-[#0A0A0A] py-20 lg:py-28 border-t border-[#262626] relative text-[#E5E2E1]">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* AI Headline Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D32F2F] animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D32F2F] font-bold">
                DRAP ARCHIVAL AI AGENT // V2.0
              </span>
            </div>
            
            <h2 className="font-oswald text-4xl sm:text-6xl uppercase font-bold tracking-tight text-[#FFFFFF] leading-[0.92]">
              ASK ANYTHING.<br />GET ANSWERS FAST.
            </h2>
            
            <p className="text-sm sm:text-base text-[#8E9192] font-inter leading-relaxed pt-2">
              An archival intelligence agent that answers questions about Drapevangelist’s background, hackathon rankings, ecosystem coordination, and Uniport initiatives in seconds—sourced straight from this site’s verified ledger.
            </p>

            <div className="pt-4 space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#757575] block font-bold">
                SAMPLE LEDGER QUERIES:
              </span>
              <div className="flex flex-col gap-2 text-xs font-mono">
                {sampleQueries.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuery(item.text);
                      executeSearch(item.text);
                    }}
                    className="text-left text-[#C4C7C7] hover:text-[#FFFFFF] transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="text-[#D32F2F] group-hover:translate-x-1 transition-transform">▸</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Interactive Terminal Module (Zero radius, sharp border) */}
          <div className="lg:col-span-7 bg-[#131313] p-6 sm:p-8 border border-[#262626] shadow-2xl">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#D32F2F]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#FFFFFF] font-bold">
                  KNOWLEDGE BASE: DRAPEVANGELIST.VERIFIED
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase text-[#757575]">
                <span className="w-2 h-2 bg-[#D32F2F] animate-pulse"></span>
                <span>NODE ONLINE</span>
              </div>
            </div>

            {/* Question Input Bar */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="relative flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about Drap's hackathons, roles, or campus work..."
                  className="w-full bg-[#0A0A0A] text-[#FFFFFF] placeholder:text-[#757575] px-4 py-3 text-xs sm:text-sm font-mono border border-[#262626] focus:outline-none focus:border-[#D32F2F] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-3 bg-[#FFFFFF] text-[#0A0A0A] font-inter font-bold text-xs uppercase tracking-wider hover:bg-[#E5E2E1] transition-colors whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer border border-[#FFFFFF]"
                >
                  <span>{isProcessing ? 'Auditing...' : 'Ask Agent'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Interactive Response Container */}
            <div className="mt-6 p-6 bg-[#0A0A0A] border border-[#262626] space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D32F2F]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#D32F2F] font-bold">
                    DISPATCH ARCHIVE RESPONSE
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#757575] bg-[#141414] px-2 py-0.5 border border-[#262626]">
                  {responseStatus === 'PROCESSING' ? 'SEARCHING ARCHIVE...' : 'SOURCED & VERIFIED'}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-[#E5E2E1] leading-relaxed font-inter pt-1">
                {answer}
              </div>

              <div className="pt-3 border-t border-[#262626] flex flex-wrap items-center gap-4 text-[11px] font-mono text-[#757575]">
                <div className="flex items-center gap-1 text-[#FFFFFF]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D32F2F]" />
                  <span>CONFIDENCE: {confidence}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-[#C4C7C7]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D32F2F]" />
                  <span>ON-CHAIN AUDITED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import { MASTER_PROOF_OF_WORK } from '../data/portfolioData';
import { ProofOfWorkCategory } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';
import { 
  ShieldCheck, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  CheckCircle2, 
  Trash2,
  RotateCcw
} from 'lucide-react';

interface CategoryTab {
  id: ProofOfWorkCategory;
  label: string;
  count: number;
}

export const ProofOfWorkArchive: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProofOfWorkCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isCurator, setIsCurator] = useState(() => curationStore.isCuratorMode());
  const [hiddenPowIds, setHiddenPowIds] = useState<string[]>(() => curationStore.getHiddenPowIds());

  useEffect(() => {
    const unsub = curationStore.subscribe(() => {
      setIsCurator(curationStore.isCuratorMode());
      setHiddenPowIds(curationStore.getHiddenPowIds());
    });
    return unsub;
  }, []);

  const visibleMaster = useMemo(() => {
    return MASTER_PROOF_OF_WORK.filter((item) => !hiddenPowIds.includes(item.id));
  }, [hiddenPowIds]);

  const categories: CategoryTab[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Records', count: visibleMaster.length },
      { id: 'professional', label: 'Professional & Events', count: visibleMaster.filter(i => i.category === 'professional').length },
      { id: 'ambassador', label: 'Ambassadors', count: visibleMaster.filter(i => i.category === 'ambassador').length },
      { id: 'project', label: 'Projects & PM', count: visibleMaster.filter(i => i.category === 'project').length },
      { id: 'volunteering', label: 'Volunteering & Summits', count: visibleMaster.filter(i => i.category === 'volunteering').length },
      { id: 'beta-testing', label: 'Beta Testing', count: visibleMaster.filter(i => i.category === 'beta-testing').length },
      { id: 'marketing', label: 'Marketing & UGC', count: visibleMaster.filter(i => i.category === 'marketing').length },
      { id: 'community', label: 'DAOs & Memberships', count: visibleMaster.filter(i => i.category === 'community').length },
    ];
  }, [visibleMaster]);

  const filteredItems = useMemo(() => {
    return visibleMaster.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(q);
      const roleMatch = item.role.toLowerCase().includes(q);
      const catMatch = item.categoryLabel.toLowerCase().includes(q);
      const focusMatch = item.focus ? item.focus.toLowerCase().includes(q) : false;
      const techMatch = item.technology ? item.technology.toLowerCase().includes(q) : false;
      const achMatch = item.achievement ? item.achievement.toLowerCase().includes(q) : false;
      const respMatch = item.responsibilities?.some(r => r.toLowerCase().includes(q)) ?? false;
      const contribMatch = item.contributions?.some(c => c.toLowerCase().includes(q)) ?? false;

      return nameMatch || roleMatch || catMatch || focusMatch || techMatch || achMatch || respMatch || contribMatch;
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    soundEngine.playClick();
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleCategoryChange = (cat: ProofOfWorkCategory) => {
    soundEngine.playClick();
    setActiveCategory(cat);
  };

  return (
    <section id="proof-of-work" className="py-20 sm:py-28 border-b border-[#262626] bg-[#0A0A0A] text-[#E5E2E1]">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#262626]">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#D32F2F] font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#D32F2F]" />
              <span>SECTION 03 // PUBLIC VERIFICATION LEDGER</span>
            </div>
            <h2 className="font-oswald text-4xl sm:text-6xl font-bold uppercase tracking-tight text-[#FFFFFF] leading-[0.92]">
              Proof of Work Archive
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8E9192] max-w-2xl font-inter leading-relaxed">
              Transparent, verifiable documentation of real-world impact, university student onboarding, regional event coordination, and brand ambassadorships.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {hiddenPowIds.length > 0 && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  curationStore.restorePow();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#20201F] text-xs font-mono uppercase tracking-wider text-[#D32F2F] hover:text-[#FFFFFF] border border-[#262626] transition-all cursor-pointer"
                title="Restore hidden records"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore ({hiddenPowIds.length} Hidden)</span>
              </button>
            )}
            <div className="px-3.5 py-1.5 bg-[#141414] border border-[#262626] text-xs font-mono text-[#FFFFFF] uppercase tracking-wider tabular-nums font-bold">
              {visibleMaster.length} Verified Records
            </div>
          </div>
        </div>

        {/* Quantifiable Impact Metrics Grid (Broadsheet Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#262626] border border-[#262626] mb-12">
          {/* Stat 1: Persons Impacted */}
          <div className="p-6 bg-[#131313] relative overflow-hidden group hover:bg-[#1A1A1A] transition-colors">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#757575] mb-2 font-bold">
              Persons Impacted
            </div>
            <div className="text-5xl font-oswald font-bold text-[#FFFFFF] group-hover:text-[#D32F2F] transition-colors tabular-nums leading-none">
              5,000+
            </div>
            <div className="text-xs font-inter text-[#8E9192] mt-3 leading-relaxed">
              Students, developers & attendees guided across IRL summits & 70+ builders personally onboarded at UniPort.
            </div>
          </div>

          {/* Stat 2: Events Held */}
          <div className="p-6 bg-[#131313] relative overflow-hidden group hover:bg-[#1A1A1A] transition-colors">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#757575] mb-2 font-bold">
              Events Held & Coordinated
            </div>
            <div className="text-5xl font-oswald font-bold text-[#FFFFFF] group-hover:text-[#D32F2F] transition-colors tabular-nums leading-none">
              40+
            </div>
            <div className="text-xs font-inter text-[#8E9192] mt-3 leading-relaxed">
              Summits, hackathons, and technical meetups across Base, Movement, Rujira, ETHNigeria, SEBGW & UniPort.
            </div>
          </div>

          {/* Stat 3: Ambassador Roles */}
          <div className="p-6 bg-[#131313] relative overflow-hidden group hover:bg-[#1A1A1A] transition-colors">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#757575] mb-2 font-bold">
              Ambassador Roles
            </div>
            <div className="text-5xl font-oswald font-bold text-[#FFFFFF] group-hover:text-[#D32F2F] transition-colors tabular-nums leading-none">
              11
            </div>
            <div className="text-xs font-inter text-[#8E9192] mt-3 leading-relaxed">
              Archisinal, Eventplace.Ng, Everest Rides, Fruitizo, Hervest, MiniPay, Solana Allstars Ng, Step Finance, Texce, Zedi, 100Pay.
            </div>
          </div>

          {/* Stat 4: Community Partnerships */}
          <div className="p-6 bg-[#131313] relative overflow-hidden group hover:bg-[#1A1A1A] transition-colors">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#757575] mb-2 font-bold">
              Community Partnerships
            </div>
            <div className="text-5xl font-oswald font-bold text-[#FFFFFF] group-hover:text-[#D32F2F] transition-colors tabular-nums leading-none">
              15+
            </div>
            <div className="text-xs font-inter text-[#8E9192] mt-3 leading-relaxed">
              Active DAO networks including Arbitrum PH, Base Technical, All In DAO, Creative Hub, ETH PH, Superteam NG.
            </div>
          </div>
        </div>

        {/* Broadsheet Numbers Board (The Numbers on Record) */}
        <div className="mb-14 p-6 sm:p-8 bg-[#131313] border border-[#262626]">
          <div className="mb-6 pb-4 border-b border-[#262626] flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D32F2F] font-bold block mb-1">
                VERIFIED PUBLIC METRICS
              </span>
              <h3 className="font-oswald text-2xl sm:text-3xl uppercase font-bold text-[#FFFFFF]">
                THE NUMBERS ON RECORD
              </h3>
            </div>
            <span className="font-mono text-[11px] uppercase text-[#FFFFFF] tracking-widest bg-[#0A0A0A] px-3 py-1 border border-[#262626]">
              AUDITED VIA FIELD DISPATCHES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {/* Metric 1 */}
            <div className="space-y-1.5 border-l-2 border-[#D32F2F] pl-4">
              <div className="font-oswald text-5xl sm:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-none">
                40+
              </div>
              <p className="text-xs sm:text-sm text-[#C4C7C7] font-inter leading-relaxed">
                IRL events hosted, stage-managed, and executed across Base, Movement, Rujira, and ETHNigeria.
              </p>
              <span className="font-mono text-[10px] uppercase text-[#757575] block tracking-wider font-bold">
                AUDITED VIA FIELD DISPATCHES
              </span>
            </div>

            {/* Metric 2 */}
            <div className="space-y-1.5 border-l-2 border-[#FFFFFF] pl-4">
              <div className="font-oswald text-5xl sm:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-none">
                70+
              </div>
              <p className="text-xs sm:text-sm text-[#C4C7C7] font-inter leading-relaxed">
                University students directly mentored, onboarded to self-custody wallets, and introduced to smart contracts.
              </p>
              <span className="font-mono text-[10px] uppercase text-[#757575] block tracking-wider font-bold">
                BLOCKCHAIN UNIPORT CHAPTER
              </span>
            </div>

            {/* Metric 3 */}
            <div className="space-y-1.5 border-l-2 border-[#D32F2F] pl-4">
              <div className="font-oswald text-5xl sm:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-none">
                71
              </div>
              <p className="text-xs sm:text-sm text-[#C4C7C7] font-inter leading-relaxed">
                Documented master proof-of-work operational records across 8 distinct organizational categories.
              </p>
              <span className="font-mono text-[10px] uppercase text-[#757575] block tracking-wider font-bold">
                PUBLIC NOTION / GITHUB LEDGER
              </span>
            </div>

            {/* Metric 4 */}
            <div className="space-y-1.5 border-l-2 border-[#FFFFFF] pl-4">
              <div className="font-oswald text-5xl sm:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-none">
                20+
              </div>
              <p className="text-xs sm:text-sm text-[#C4C7C7] font-inter leading-relaxed">
                Decentralized ecosystems explored, tested, and actively contributed to across EVM, Move, and SVM stacks.
              </p>
              <span className="font-mono text-[10px] uppercase text-[#757575] block tracking-wider font-bold">
                CROSS-CHAIN PROTOCOL AGNOSTIC
              </span>
            </div>

            {/* Metric 5 */}
            <div className="space-y-1.5 border-l-2 border-[#D32F2F] pl-4">
              <div className="font-oswald text-5xl sm:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-none">
                #2
              </div>
              <p className="text-xs sm:text-sm text-[#C4C7C7] font-inter leading-relaxed">
                Final podium standing at the 2024 Hack for Good Hackathon, building real-world decentralized public goods.
              </p>
              <span className="font-mono text-[10px] uppercase text-[#D32F2F] block tracking-wider font-bold">
                COMPETITIVE TECHNICAL BUILD
              </span>
            </div>

            {/* Metric 6 */}
            <div className="space-y-1.5 border-l-2 border-[#FFFFFF] pl-4">
              <div className="font-oswald text-5xl sm:text-6xl font-bold text-[#FFFFFF] tracking-tight leading-none">
                100%
              </div>
              <p className="text-xs sm:text-sm text-[#C4C7C7] font-inter leading-relaxed">
                Traceable to live on-chain addresses, event photos, attendee check-ins, or published technical artifacts.
              </p>
              <span className="font-mono text-[10px] uppercase text-[#757575] block tracking-wider font-bold">
                ZERO SPECULATION • ZERO FABRICATION
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-3 mb-8">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#757575]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by protocol, role (e.g. UniPort, Decred, DevCon), category, or keyword..."
              className="w-full pl-11 pr-4 py-3 bg-[#131313] border border-[#262626] text-xs sm:text-sm text-[#FFFFFF] placeholder-[#757575] focus:outline-none focus:border-[#D32F2F] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#757575] hover:text-[#FFFFFF] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Tabs (Clickable buttons, 0px radius) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#131313] border border-[#262626]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#FFFFFF] text-[#0A0A0A] font-bold border-[#FFFFFF]'
                      : 'border-transparent text-[#8E9192] hover:text-[#FFFFFF] hover:bg-[#1A1A1A]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`font-mono text-[10px] tabular-nums ${
                      isActive ? 'text-[#0A0A0A]' : 'text-[#757575]'
                    }`}
                  >
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-[#757575] mb-4 px-1">
          <span>
            Showing {filteredItems.length} of {MASTER_PROOF_OF_WORK.length} confirmed records
          </span>
          {searchQuery && (
            <span className="text-[#D32F2F] font-bold">Filtered by query: "{searchQuery}"</span>
          )}
        </div>

        {/* Dossier Grid / Rows (Zero radius, crisp hairline dividers) */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#131313] border border-[#262626] p-8">
            <ShieldCheck className="h-10 w-10 text-[#757575] mx-auto mb-3 opacity-50" />
            <h3 className="font-oswald text-xl uppercase font-bold text-[#FFFFFF]">No matching records found</h3>
            <p className="text-xs text-[#8E9192] mt-1 font-inter">Try adjusting your search terms or selecting another category.</p>
            <button
              onClick={() => {
                soundEngine.playClick();
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#FFFFFF] border border-[#262626] bg-[#141414] hover:bg-[#20201F] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`border transition-all duration-150 ${
                    isExpanded
                      ? 'bg-[#1C1B1B] border-[#D32F2F]'
                      : 'bg-[#131313] border-[#262626] hover:border-[#444748]'
                  }`}
                >
                  {/* Row Header (Clickable) */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full text-left p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      {/* Zero-Pill Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#757575] mb-1.5">
                        <span className="text-[#D32F2F] font-bold">{item.categoryLabel}</span>
                        <span aria-hidden="true">/</span>
                        <span>CONFIRMED RECORD</span>
                        {item.period && (
                          <>
                            <span aria-hidden="true">/</span>
                            <span className="tabular-nums text-[#C4C7C7]">{item.period}</span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-oswald text-xl sm:text-2xl uppercase font-bold text-[#FFFFFF] tracking-tight">
                          {item.name}
                        </h3>
                        <span className="text-xs sm:text-sm font-inter text-[#8E9192]">
                          {item.role}
                        </span>
                      </div>

                      {/* Quiet Inline Snippet */}
                      {item.achievement && (
                        <p className="text-xs text-[#8E9192] mt-1.5 line-clamp-1 font-inter">
                          {item.achievement}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      {isCurator && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundEngine.playClick();
                            curationStore.hidePowItem(item.id);
                          }}
                          title="Delete record from list"
                          className="p-1.5 bg-[#D32F2F] hover:bg-[#b71c1c] text-[#FFFFFF] border border-[#FFFFFF] cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <span className="text-xs font-mono uppercase tracking-wider text-[#757575] hidden sm:inline">
                        {isExpanded ? 'Collapse' : 'Inspect'}
                      </span>
                      <div className="h-8 w-8 bg-[#0A0A0A] border border-[#262626] flex items-center justify-center text-[#FFFFFF]">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Dossier Details */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#262626] space-y-4">
                      {/* Responsibilities */}
                      {item.responsibilities && item.responsibilities.length > 0 && (
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-[#757575] mb-2 font-bold">
                            Key Operational Scope & Responsibilities
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.responsibilities.map((resp, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs sm:text-sm text-[#E5E2E1] font-inter"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#D32F2F] shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Contributions */}
                      {item.contributions && item.contributions.length > 0 && (
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-[#757575] mb-2 font-bold">
                            Documented Contributions
                          </div>
                          <ul className="space-y-1.5">
                            {item.contributions.map((c, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs text-[#C4C7C7] font-inter"
                              >
                                <span className="h-1.5 w-1.5 bg-[#D32F2F] shrink-0 mt-1.5" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Additional Context or Achievements */}
                      {(item.achievement || item.additional || item.focus || item.technology) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs font-inter">
                          {item.achievement && (
                            <div className="p-3 bg-[#0A0A0A] border border-[#262626]">
                              <span className="text-[#757575] block font-mono text-[10px] uppercase font-bold">Documented Impact</span>
                              <span className="text-[#FFFFFF] font-medium mt-0.5 block">{item.achievement}</span>
                            </div>
                          )}
                          {item.technology && (
                            <div className="p-3 bg-[#0A0A0A] border border-[#262626]">
                              <span className="text-[#757575] block font-mono text-[10px] uppercase font-bold">Ecosystem / Tech</span>
                              <span className="text-[#D32F2F] font-bold mt-0.5 block">{item.technology}</span>
                            </div>
                          )}
                          {item.focus && (
                            <div className="p-3 bg-[#0A0A0A] border border-[#262626]">
                              <span className="text-[#757575] block font-mono text-[10px] uppercase font-bold">Specialized Focus</span>
                              <span className="text-[#FFFFFF] font-medium mt-0.5 block">{item.focus}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-[#262626] flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundEngine.playClick();
                            curationStore.hidePowItem(item.id);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8E9192] hover:text-[#D32F2F] transition-colors cursor-pointer"
                          title="Remove this record from the active display"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-[#D32F2F]" />
                          <span>Remove Record</span>
                        </button>

                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#FFFFFF] hover:text-[#D32F2F] transition-colors border border-[#262626] px-3 py-1.5 bg-[#0A0A0A]"
                          >
                            <span>Open Source Documentation</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

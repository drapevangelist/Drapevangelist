import React, { useState, useMemo } from 'react';
import { MASTER_PROOF_OF_WORK } from '../data/portfolioData';
import { ProofOfWorkCategory, ProofOfWorkItem } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { 
  CheckCircle2, 
  Search, 
  Filter, 
  ShieldCheck, 
  Layers, 
  Briefcase, 
  Sparkles, 
  Compass, 
  Award, 
  Radio, 
  Users, 
  Cpu, 
  TrendingUp, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CategoryTab {
  id: ProofOfWorkCategory;
  label: string;
  count: number;
}

export const ProofOfWorkSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProofOfWorkCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories: CategoryTab[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Records', count: MASTER_PROOF_OF_WORK.length },
      { id: 'professional', label: 'Professional & Events', count: MASTER_PROOF_OF_WORK.filter(i => i.category === 'professional').length },
      { id: 'ambassador', label: 'Ambassadors', count: MASTER_PROOF_OF_WORK.filter(i => i.category === 'ambassador').length },
      { id: 'project', label: 'Projects & RWA', count: MASTER_PROOF_OF_WORK.filter(i => i.category === 'project').length },
      { id: 'beta-testing', label: 'Beta Testing', count: MASTER_PROOF_OF_WORK.filter(i => i.category === 'beta-testing').length },
      { id: 'marketing', label: 'Marketing & UGC', count: MASTER_PROOF_OF_WORK.filter(i => i.category === 'marketing').length },
      { id: 'community', label: 'DAOs & Memberships', count: MASTER_PROOF_OF_WORK.filter(i => i.category === 'community').length },
    ];
  }, []);

  const filteredItems = useMemo(() => {
    return MASTER_PROOF_OF_WORK.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(query);
      const roleMatch = item.role.toLowerCase().includes(query);
      const catMatch = item.categoryLabel.toLowerCase().includes(query);
      const focusMatch = item.focus ? item.focus.toLowerCase().includes(query) : false;
      const techMatch = item.technology ? item.technology.toLowerCase().includes(query) : false;
      const achMatch = item.achievement ? item.achievement.toLowerCase().includes(query) : false;
      const respMatch = item.responsibilities?.some(r => r.toLowerCase().includes(query)) ?? false;
      const contribMatch = item.contributions?.some(c => c.toLowerCase().includes(query)) ?? false;

      return nameMatch || roleMatch || catMatch || focusMatch || techMatch || achMatch || respMatch || contribMatch;
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    soundEngine.playClick();
    setExpandedCardId(prev => prev === id ? null : id);
  };

  return (
    <section id="proof-of-work-database" className="border-t border-[#F5F3E8]/8 py-16">
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14532D]/70 border border-[#B7F34A]/30 text-[#B7F34A] text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-[#B7F34A]" />
              <span>Master Proof of Work</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#F5F3E8] tracking-tight">
              Verified Web3 Experience Database
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#F5F3E8]/75 max-w-[650px] leading-relaxed">
              Comprehensive master database of 44 verified engagements spanning professional operations, ambassador roles, beta testing, RWA infrastructure, and campus leadership.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#14532D] border border-[#B7F34A]/30 text-xs font-bold text-[#B7F34A]">
              44 Confirmed Records
            </div>
          </div>
        </div>

        {/* Filter Controls: Category Tabs & Search Bar */}
        <div className="space-y-4 mb-8">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B8F71]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by protocol, role, ecosystem (e.g. Base, Sui Move, Solana, Uniport, Ambassador)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#14532D]/60 border border-[#F5F3E8]/10 text-sm text-[#F5F3E8] placeholder:text-[#6B8F71] focus:outline-none focus:border-[#B7F34A] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#6B8F71] hover:text-[#B7F34A] py-1 px-2 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#B7F34A] text-[#0B2E1A] shadow-md'
                      : 'bg-[#14532D]/70 text-[#F5F3E8]/80 hover:bg-[#14532D] hover:text-[#B7F34A] border border-[#F5F3E8]/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-[#0B2E1A]/20 text-[#0B2E1A]' : 'bg-[#061F11] text-[#6B8F71]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#6B8F71] mb-5">
          <span>
            Showing <strong className="text-[#B7F34A] font-semibold">{filteredItems.length}</strong> of {MASTER_PROOF_OF_WORK.length} verified records
          </span>
          {searchQuery && (
            <span>Filtered by "{searchQuery}"</span>
          )}
        </div>

        {/* Master Database Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isExpanded = expandedCardId === item.id;
            const hasExtraDetails = (item.responsibilities && item.responsibilities.length > 0) || 
                                    (item.contributions && item.contributions.length > 0) || 
                                    item.achievement || 
                                    item.additional || 
                                    item.technology || 
                                    item.focus;

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl bg-[#14532D]/75 border border-[#F5F3E8]/8 p-5 transition-all duration-200 hover:border-[#B7F34A]/50 hover:bg-[#14532D] shadow-sm"
              >
                <div>
                  {/* Card Header: Category & Confirmed Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#B7F34A] bg-[#061F11]/70 px-2.5 py-1 rounded-md border border-[#B7F34A]/20">
                      {item.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B7F34A] bg-[#B7F34A]/10 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="h-3 w-3 text-[#B7F34A]" />
                      {item.status}
                    </span>
                  </div>

                  {/* Item Name */}
                  <h3 className="font-display font-bold text-lg text-[#F5F3E8] group-hover:text-[#B7F34A] transition-colors leading-snug">
                    {item.name}
                  </h3>

                  {/* Role & Period */}
                  <div className="mt-1 text-xs font-semibold text-[#B7F34A]/90">
                    {item.role}
                  </div>
                  {item.period && (
                    <div className="text-[11px] text-[#6B8F71] mt-0.5">
                      {item.period}
                    </div>
                  )}

                  {/* Highlights / Achievement Banner */}
                  {item.achievement && (
                    <div className="mt-3 rounded-lg bg-[#061F11]/80 border border-[#B7F34A]/25 p-2.5 text-xs text-[#F5F3E8]/90">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#B7F34A] uppercase tracking-wider mb-0.5">
                        <Award className="h-3 w-3 text-[#B7F34A]" />
                        Key Achievement
                      </div>
                      <p className="text-xs leading-relaxed text-[#F5F3E8]/85">{item.achievement}</p>
                    </div>
                  )}

                  {/* Focus & Technology tags if available */}
                  {(item.focus || item.technology) && (
                    <div className="mt-3 space-y-1.5 text-xs">
                      {item.focus && (
                        <div className="text-[11px] text-[#F5F3E8]/80">
                          <span className="text-[#6B8F71] font-semibold">Focus:</span> {item.focus}
                        </div>
                      )}
                      {item.technology && (
                        <div className="text-[11px] text-[#F5F3E8]/80">
                          <span className="text-[#6B8F71] font-semibold">Tech:</span>{' '}
                          <span className="text-[#B7F34A] font-mono">{item.technology}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Responsibilities Preview / Expandable */}
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#F5F3E8]/5">
                      <div className="text-[11px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-1.5">
                        Responsibilities:
                      </div>
                      <ul className="space-y-1 text-xs text-[#F5F3E8]/80">
                        {(isExpanded ? item.responsibilities : item.responsibilities.slice(0, 2)).map((resp, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#B7F34A] shrink-0 mt-0.5" />
                            <span className="leading-snug">{resp}</span>
                          </li>
                        ))}
                      </ul>
                      {!isExpanded && item.responsibilities.length > 2 && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="mt-2 text-[11px] font-semibold text-[#B7F34A] hover:underline cursor-pointer inline-flex items-center gap-1"
                        >
                          +{item.responsibilities.length - 2} more duties
                          <ChevronDown className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Contributions Preview / Expandable */}
                  {item.contributions && item.contributions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#F5F3E8]/5">
                      <div className="text-[11px] font-semibold text-[#6B8F71] uppercase tracking-wider mb-1.5">
                        Contributions:
                      </div>
                      <ul className="space-y-1 text-xs text-[#F5F3E8]/80">
                        {(isExpanded ? item.contributions : item.contributions.slice(0, 2)).map((contrib, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#B7F34A] shrink-0 mt-0.5" />
                            <span className="leading-snug">{contrib}</span>
                          </li>
                        ))}
                      </ul>
                      {!isExpanded && item.contributions.length > 2 && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="mt-2 text-[11px] font-semibold text-[#B7F34A] hover:underline cursor-pointer inline-flex items-center gap-1"
                        >
                          +{item.contributions.length - 2} more contributions
                          <ChevronDown className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Additional notes if expanded */}
                  {isExpanded && item.additional && (
                    <div className="mt-3 text-xs text-[#B7F34A]/80 italic">
                      {item.additional}
                    </div>
                  )}
                </div>

                {/* Footer Toggle */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-[#F5F3E8]/5 flex justify-end">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-[11px] font-semibold text-[#6B8F71] hover:text-[#F5F3E8] inline-flex items-center gap-1"
                    >
                      Show less <ChevronUp className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 rounded-2xl bg-[#14532D]/40 border border-[#F5F3E8]/8">
            <Search className="h-8 w-8 text-[#6B8F71] mx-auto mb-3" />
            <div className="text-base font-semibold text-[#F5F3E8]">No matching records found</div>
            <p className="text-xs text-[#6B8F71] mt-1 max-w-sm mx-auto">
              Try searching for a different keyword, protocol name, or clear the search filter.
            </p>
            <button
              onClick={() => {
                soundEngine.playClick();
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#B7F34A] text-[#0B2E1A] text-xs font-bold hover:bg-[#CFFF6E] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

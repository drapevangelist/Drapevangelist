import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA } from '../data/portfolioData';
import { ChapterTabItem } from '../types';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  Briefcase, 
  Globe, 
  CheckCircle2, 
  ChevronRight, 
  Plus, 
  Trash2, 
  RotateCcw, 
  X, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';
import { isEditorEnvironment } from '../utils/envUtils';

interface ChaptersSectionProps {
  onScrollToProof?: () => void;
}

type TabKey = 'posts_held' | 'drapnet' | 'events' | 'certificates' | 'education';

export const ChaptersSection: React.FC<ChaptersSectionProps> = ({ onScrollToProof }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('posts_held');
  const [isEditorAllowed] = useState(isEditorEnvironment());
  const [isCurator, setIsCurator] = useState(() => curationStore.isCuratorMode());
  const [hiddenIds, setHiddenIds] = useState<string[]>(() => curationStore.getHiddenChapterIds());
  const [customChapters, setCustomChapters] = useState<ChapterTabItem[]>(() => curationStore.getCustomChapters());

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newInstitution, setNewInstitution] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newCategory, setNewCategory] = useState<TabKey>('posts_held');
  const [newDescription, setNewDescription] = useState('');
  const [newHighlights, setNewHighlights] = useState('');
  const [newVerificationLink, setNewVerificationLink] = useState('');

  const refreshChapters = () => {
    setIsCurator(curationStore.isCuratorMode());
    setHiddenIds(curationStore.getHiddenChapterIds());
    setCustomChapters(curationStore.getCustomChapters());
  };

  useEffect(() => {
    const unsub = curationStore.subscribe(refreshChapters);
    return unsub;
  }, []);

  const allItems: ChapterTabItem[] = [...customChapters, ...CHAPTERS_DATA].filter(
    (item) => !hiddenIds.includes(item.id)
  );

  const filteredItems = allItems.filter((item) => item.category === activeTab);

  const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }>; count: number }[] = [
    { key: 'posts_held', label: 'Posts Held & Governance', icon: Briefcase, count: allItems.filter((i) => i.category === 'posts_held').length },
    { key: 'drapnet', label: 'DRAPNET Initiative', icon: Globe, count: allItems.filter((i) => i.category === 'drapnet').length },
    { key: 'events', label: 'Summits & Gatherings', icon: Calendar, count: allItems.filter((i) => i.category === 'events').length },
    { key: 'certificates', label: 'Credentials & Certs', icon: Award, count: allItems.filter((i) => i.category === 'certificates').length },
    { key: 'education', label: 'Education', icon: GraduationCap, count: allItems.filter((i) => i.category === 'education').length },
  ];

  const handleDeleteChapter = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundEngine.playClick();
    curationStore.hideChapter(id);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();

    if (!newTitle.trim()) return;

    const highlightsArr = newHighlights
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const newItem: ChapterTabItem = {
      id: `chapter-custom-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || undefined,
      institution: newInstitution.trim() || undefined,
      year: newYear.trim() || '2025–2026',
      category: newCategory,
      description: newDescription.trim() || 'Documented record in the official archive.',
      highlights: highlightsArr.length > 0 ? highlightsArr : undefined,
      verificationLink: newVerificationLink.trim() || undefined,
    };

    curationStore.addCustomChapter(newItem);
    setActiveTab(newCategory);

    // Reset
    setNewTitle('');
    setNewSubtitle('');
    setNewInstitution('');
    setNewYear('');
    setNewDescription('');
    setNewHighlights('');
    setNewVerificationLink('');
    setIsAddModalOpen(false);
  };

  return (
    <section id="chapters" className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0E0E0E] border-t border-[#262626] relative text-[#E5E2E1]">
      <div className="max-w-6xl mx-auto">
        {/* Curatorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#D32F2F] font-bold">
              <span>SECTION 02</span>
              <span>//</span>
              <span>DOCUMENTARY CHAPTERS</span>
            </div>
            <h2 className="mt-2 text-4xl sm:text-6xl font-oswald uppercase font-bold tracking-tight text-[#FFFFFF] leading-[0.92]">
              The Formal Chapters
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8E9192] font-inter max-w-2xl">
              A structured record of academic training, technical certifications, regional event leadership, and institutional posts held across the African and global decentralized ecosystem.
            </p>
          </div>

          {isEditorAllowed && (
            <div className="flex flex-wrap items-center gap-2.5">
              {hiddenIds.length > 0 && (
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    curationStore.restoreChapters();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#141414] hover:bg-[#20201F] text-xs font-mono uppercase tracking-wider text-[#D32F2F] hover:text-[#FFFFFF] border border-[#262626] transition-all cursor-pointer"
                  title="Restore deleted default chapters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore ({hiddenIds.length} Hidden)</span>
                </button>
              )}

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsAddModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#FFFFFF]"
                title="Add new chapter or achievement (Backend only)"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Chapter Record</span>
              </button>
            </div>
          )}
        </div>

        {/* Seven Chapters Horizontal Modular Timeline Ribbon */}
        <div className="mt-10 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 pb-2 border-b border-[#262626]">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D32F2F] font-bold">
              CHRONOLOGICAL DOSSIER // 2022—2026
            </span>
            <span className="font-mono text-xs uppercase text-[#757575] tracking-widest">
              SEVEN CHAPTERS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-px bg-[#262626] border border-[#262626]">
            {/* Chapter 1 */}
            <div className="bg-[#131313] p-4 flex flex-col justify-between min-h-[220px] hover:bg-[#1A1A1A] transition-colors group">
              <div>
                <span className="font-mono text-[10px] text-[#757575] uppercase tracking-widest block font-bold">2022</span>
                <h3 className="font-oswald text-lg uppercase text-[#FFFFFF] mt-1 font-bold group-hover:text-[#D32F2F] transition-colors">ROOTS</h3>
                <p className="text-xs text-[#8E9192] font-inter mt-2 leading-relaxed">
                  Independent technical writing, decentralized governance research, and early L1/L2 testnet experiments.
                </p>
              </div>
              <div className="pt-3 border-t border-[#262626] mt-auto">
                <span className="font-mono text-[10px] uppercase text-[#D32F2F] font-bold">GENESIS ERA</span>
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="bg-[#131313] p-4 flex flex-col justify-between min-h-[220px] hover:bg-[#1A1A1A] transition-colors group">
              <div>
                <span className="font-mono text-[10px] text-[#757575] uppercase tracking-widest block font-bold">2023</span>
                <h3 className="font-oswald text-lg uppercase text-[#FFFFFF] mt-1 font-bold group-hover:text-[#D32F2F] transition-colors">CAMPUS LEAD</h3>
                <p className="text-xs text-[#8E9192] font-inter mt-2 leading-relaxed">
                  Co-lead at Blockchain Uniport; personally organized cohorts onboarding 70+ students into open blockchain tools.
                </p>
              </div>
              <div className="pt-3 border-t border-[#262626] mt-auto">
                <span className="font-mono text-[10px] uppercase text-[#FFFFFF] font-bold">UNIPORT NODE</span>
              </div>
            </div>

            {/* Chapter 3 */}
            <div className="bg-[#131313] p-4 flex flex-col justify-between min-h-[220px] hover:bg-[#1A1A1A] transition-colors group">
              <div>
                <span className="font-mono text-[10px] text-[#757575] uppercase tracking-widest block font-bold">2023</span>
                <h3 className="font-oswald text-lg uppercase text-[#FFFFFF] mt-1 font-bold group-hover:text-[#D32F2F] transition-colors">PROTOCOL ADVOCACY</h3>
                <p className="text-xs text-[#8E9192] font-inter mt-2 leading-relaxed">
                  Decred Africa ecosystem alignment, Politeia governance analysis, and hybrid PoW/PoS education campaigns.
                </p>
              </div>
              <div className="pt-3 border-t border-[#262626] mt-auto">
                <span className="font-mono text-[10px] uppercase text-[#8E9192] font-bold">DECRED AFRICA</span>
              </div>
            </div>

            {/* Chapter 4 */}
            <div className="bg-[#131313] p-4 flex flex-col justify-between min-h-[220px] hover:bg-[#1A1A1A] transition-colors group">
              <div>
                <span className="font-mono text-[10px] text-[#757575] uppercase tracking-widest block font-bold">2024</span>
                <h3 className="font-oswald text-lg uppercase text-[#FFFFFF] mt-1 font-bold group-hover:text-[#D32F2F] transition-colors">IRL SUMMITS</h3>
                <p className="text-xs text-[#8E9192] font-inter mt-2 leading-relaxed">
                  Coordinated 40+ physically verified summits for Base, Movement Labs, ETHNigeria, and Rujira across Nigeria.
                </p>
              </div>
              <div className="pt-3 border-t border-[#262626] mt-auto">
                <span className="font-mono text-[10px] uppercase text-[#D32F2F] font-bold">40+ GATHERINGS</span>
              </div>
            </div>

            {/* Chapter 5 */}
            <div className="bg-[#131313] p-4 flex flex-col justify-between min-h-[220px] hover:bg-[#1A1A1A] transition-colors group">
              <div>
                <span className="font-mono text-[10px] text-[#757575] uppercase tracking-widest block font-bold">2024</span>
                <h3 className="font-oswald text-lg uppercase text-[#FFFFFF] mt-1 font-bold group-hover:text-[#D32F2F] transition-colors">HACKATHONS</h3>
                <p className="text-xs text-[#8E9192] font-inter mt-2 leading-relaxed">
                  2nd Place Hack for Good 2024, Lisk documentation technical bounties, and dev mentorship sprints.
                </p>
              </div>
              <div className="pt-3 border-t border-[#262626] mt-auto">
                <span className="font-mono text-[10px] uppercase text-[#FFFFFF] font-bold">BUILDER WINS</span>
              </div>
            </div>

            {/* Chapter 6 */}
            <div className="bg-[#131313] p-4 flex flex-col justify-between min-h-[220px] hover:bg-[#1A1A1A] transition-colors group">
              <div>
                <span className="font-mono text-[10px] text-[#757575] uppercase tracking-widest block font-bold">2025</span>
                <h3 className="font-oswald text-lg uppercase text-[#FFFFFF] mt-1 font-bold group-hover:text-[#D32F2F] transition-colors">INFRA & RWA</h3>
                <p className="text-xs text-[#8E9192] font-inter mt-2 leading-relaxed">
                  Product contributor for AssetLink & PicWe, omnichain asset infrastructure and Sui ecosystem growth.
                </p>
              </div>
              <div className="pt-3 border-t border-[#262626] mt-auto">
                <span className="font-mono text-[10px] uppercase text-[#8E9192] font-bold">RWA DEPLOYMENT</span>
              </div>
            </div>

            {/* Chapter 7 */}
            <div
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('drapnet');
              }}
              className="bg-[#1A1A1A] p-4 flex flex-col justify-between min-h-[220px] hover:bg-[#20201F] transition-colors group cursor-pointer border border-[#D32F2F]/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#D32F2F] uppercase tracking-widest font-bold">CURRENT</span>
                  <span className="w-2 h-2 bg-[#D32F2F] animate-pulse"></span>
                </div>
                <h3 className="font-oswald text-lg uppercase text-[#FFFFFF] mt-1 font-bold group-hover:text-[#D32F2F] transition-colors">DRAPNET</h3>
                <p className="text-xs text-[#E5E2E1] font-inter mt-2 leading-relaxed">
                  Full-scale institutional community operations, growth syndicates, and protocol ambassador pipelines.
                </p>
              </div>
              <div className="pt-3 border-t border-[#262626] mt-auto flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-[#FFFFFF] font-bold">EXPANDING</span>
                <span className="font-mono text-[9px] uppercase text-[#D32F2F] group-hover:underline">DOSSIER →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls (Zero-radius orthogonal tabs) */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-[#262626]">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab(tab.key);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#0A0A0A] font-bold border-[#FFFFFF]'
                    : 'bg-[#141414] text-[#C4C7C7] hover:text-[#FFFFFF] hover:bg-[#20201F] border-[#262626]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0A0A0A]' : 'text-[#D32F2F]'}`} />
                <span className="uppercase">{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 font-mono ${isActive ? 'bg-[#0A0A0A] text-[#FFFFFF]' : 'bg-[#0A0A0A] text-[#757575]'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Listing */}
        <div className="mt-8 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center border border-[#262626] bg-[#131313]">
              <p className="font-oswald text-xl uppercase text-[#FFFFFF]">No Records in this Chapter</p>
              <p className="text-xs text-[#8E9192] font-inter mt-1">Records have been trimmed or deleted.</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-4 px-4 py-2 bg-[#FFFFFF] text-[#0A0A0A] font-mono text-xs uppercase font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record Here</span>
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <article
                key={item.id}
                className={`p-6 sm:p-8 border bg-[#131313] transition-all duration-200 relative group ${
                  item.category === 'drapnet'
                    ? 'border-[#D32F2F]/50 shadow-[0_0_20px_rgba(211,47,47,0.1)]'
                    : 'border-[#262626] hover:border-[#444748]'
                }`}
              >
                {/* Delete / Prune button to keep site clean (AI Studio Backend only) */}
                {isEditorAllowed && (
                  <button
                    onClick={(e) => handleDeleteChapter(e, item.id)}
                    title="Remove this chapter item (avoids crowding the site)"
                    className={`absolute top-4 right-4 p-1.5 transition-all z-10 cursor-pointer border ${
                      isCurator
                        ? 'bg-[#D32F2F] text-[#FFFFFF] border-[#FFFFFF] shadow-lg flex items-center gap-1 text-[10px] font-mono px-2'
                        : 'bg-[#0A0A0A] hover:bg-[#D32F2F] text-[#FFFFFF] border-[#262626] opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {isCurator && <span className="font-bold">DELETE</span>}
                  </button>
                )}

                {/* Special DRAPNET Dedicated Plate Banner */}
                {item.category === 'drapnet' && (
                  <div className="mb-6 p-4 border border-[#D32F2F]/40 bg-[#0A0A0A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src="/assets/logo.jpg" 
                        alt="DRAPNET Media Asset" 
                        className="w-12 h-12 object-cover border border-[#262626]" 
                      />
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#D32F2F] font-bold block">
                          DRAPNET EXCLUSIVE INITIATIVE
                        </span>
                        <p className="font-oswald text-base uppercase text-[#FFFFFF] font-bold">
                          DEDICATED MEDIA & SYNDICATE ARCHIVE
                        </p>
                        <p className="text-[11px] text-[#8E9192] font-mono">
                          Note: All DRAPNET media files are specifically and exclusively allocated to this initiative.
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-[#141414] text-[#E5E2E1] border border-[#262626] shrink-0">
                      ISOLATED DOMAIN
                    </span>
                  </div>
                )}

                {/* Top metadata strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#262626] text-xs font-mono pr-12">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D32F2F] font-bold">0{index + 1}.</span>
                    <span className="text-[#E5E2E1] uppercase font-bold">{item.institution || 'Verified Web3 Ecosystem'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#757575]">
                    {item.year && <span>{item.year}</span>}
                    {item.credentialId && (
                      <span className="text-[#FFFFFF] border border-[#262626] px-2 py-0.5 text-[10px] bg-[#0A0A0A]">
                        ID: {item.credentialId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mt-4">
                  <h3 className="text-xl sm:text-2xl font-oswald uppercase font-bold text-[#FFFFFF] group-hover:text-[#D32F2F] transition-colors">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs sm:text-sm font-inter text-[#8E9192] mt-1">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="mt-3 text-sm sm:text-base text-[#C4C7C7] font-inter leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights & Specific Contributions */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[#262626]">
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#757575] mb-3 font-bold">
                      Key Execution Milestones
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#E5E2E1]">
                      {item.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.verificationLink && (
                  <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-end">
                    <a
                      href={item.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#FFFFFF] hover:text-[#D32F2F]"
                    >
                      <span>Verification Record</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D32F2F]" />
                    </a>
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        {/* Section Footer / Jump to Next Section */}
        {onScrollToProof && (
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                soundEngine.playClick();
                onScrollToProof();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono uppercase tracking-wider bg-[#141414] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#0A0A0A] border border-[#262626] transition-all font-bold cursor-pointer"
            >
              <span>Explore Proof of Work Archive</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Modal: Add Chapter Record */}
        {isAddModalOpen && (
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#131313] border border-[#262626] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#1A1A1A]">
                <div>
                  <h3 className="text-xl font-oswald uppercase font-bold text-[#FFFFFF]">
                    Add Chapter Dossier Item
                  </h3>
                  <p className="text-xs text-[#8E9192] font-inter">
                    Document a new institutional role, summit, credential, or initiative.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 bg-[#0A0A0A] hover:bg-[#D32F2F] text-[#FFFFFF] border border-[#262626] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Category *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as TabKey)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                    >
                      <option value="posts_held">Posts Held & Governance</option>
                      <option value="drapnet">DRAPNET Initiative</option>
                      <option value="events">Summits & Gatherings</option>
                      <option value="certificates">Credentials & Certs</option>
                      <option value="education">Education</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Year / Period
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2024–2025"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Regional Growth Lead"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Institution / Ecosystem / Protocol
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Decred Africa / Movement Network"
                      value={newInstitution}
                      onChange={(e) => setNewInstitution(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Subtitle / Focus Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Campus Onboarding & Operations"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Description & Narrative
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detailed explanation of responsibilities, achievements, and impact..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Key Milestones (One per line)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Onboarded 50+ developers into Move stack&#10;Organized regional IRL workshop"
                    value={newHighlights}
                    onChange={(e) => setNewHighlights(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-[#262626] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-[#0A0A0A] text-[#C4C7C7] hover:text-[#FFFFFF] border border-[#262626] text-xs font-mono uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider cursor-pointer border border-[#FFFFFF]"
                  >
                    Add Chapter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

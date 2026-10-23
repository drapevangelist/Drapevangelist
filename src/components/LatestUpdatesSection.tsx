import React, { useState, useEffect } from 'react';
import { LATEST_UPDATES } from '../data/portfolioData';
import { LatestUpdateItem } from '../types';
import { ArrowUpRight, Calendar, Plus, Trash2, RotateCcw, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';

export const LatestUpdatesSection: React.FC = () => {
  const [isCurator, setIsCurator] = useState(() => curationStore.isCuratorMode());
  const [hiddenIds, setHiddenIds] = useState<string[]>(() => curationStore.getHiddenUpdateIds());
  const [customUpdates, setCustomUpdates] = useState<LatestUpdateItem[]>(() => curationStore.getCustomUpdates());

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newLinkLabel, setNewLinkLabel] = useState('');

  const refreshUpdates = () => {
    setIsCurator(curationStore.isCuratorMode());
    setHiddenIds(curationStore.getHiddenUpdateIds());
    setCustomUpdates(curationStore.getCustomUpdates());
  };

  useEffect(() => {
    const unsub = curationStore.subscribe(refreshUpdates);
    return unsub;
  }, []);

  const allItems: LatestUpdateItem[] = [...customUpdates, ...LATEST_UPDATES].filter(
    (item) => !hiddenIds.includes(item.id)
  );

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundEngine.playClick();
    curationStore.hideUpdate(id);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();

    if (!newTitle.trim()) return;

    const newItem: LatestUpdateItem = {
      id: `update-custom-${Date.now()}`,
      title: newTitle.trim(),
      tagline: newTagline.trim() || 'Active Field Operations',
      summary: newSummary.trim() || 'Documented progress update in the official archive.',
      category: newCategory.trim() || 'COMMUNITY DISPATCH',
      date: newDate.trim() || 'February 2025',
      externalLink: newLink.trim() || undefined,
      externalLinkLabel: newLinkLabel.trim() || undefined,
      highlight: true,
    };

    curationStore.addCustomUpdate(newItem);

    // Reset
    setNewTitle('');
    setNewTagline('');
    setNewSummary('');
    setNewCategory('');
    setNewDate('');
    setNewLink('');
    setNewLinkLabel('');
    setIsAddModalOpen(false);
  };

  return (
    <section id="updates" className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0E0E0E] border-t border-[#262626] relative text-[#E5E2E1]">
      <div className="max-w-6xl mx-auto">
        {/* Curatorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#D32F2F] font-bold">
              <span>SECTION 06</span>
              <span>//</span>
              <span>RECENT DISPATCH & TIMELINE</span>
            </div>
            <h2 className="mt-2 text-4xl sm:text-6xl font-oswald uppercase font-bold tracking-tight text-[#FFFFFF] leading-[0.92]">
              Latest Updates & Activities
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8E9192] font-inter max-w-2xl">
              Real-time activity pulse detailing active community initiatives, university student cohorts, upcoming regional summits, and protocol milestones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {hiddenIds.length > 0 && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  curationStore.restoreUpdates();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#20201F] text-xs font-mono uppercase tracking-wider text-[#D32F2F] hover:text-[#FFFFFF] border border-[#262626] transition-all cursor-pointer"
                title="Restore deleted default updates"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#FFFFFF]"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add Dispatch</span>
            </button>
          </div>
        </div>

        {/* Timeline Stream (Zero radius, 1px border) */}
        {allItems.length === 0 ? (
          <div className="mt-10 p-12 text-center border border-[#262626] bg-[#131313]">
            <p className="font-oswald text-xl uppercase text-[#FFFFFF]">No Dispatches Displayed</p>
            <p className="text-xs text-[#8E9192] font-inter mt-1">Updates have been cleared to keep the site clean.</p>
            <button
              onClick={() => curationStore.restoreUpdates()}
              className="mt-4 px-4 py-2 bg-[#FFFFFF] text-[#0A0A0A] font-mono text-xs uppercase font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Defaults</span>
            </button>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {allItems.map((item, index) => (
              <div
                key={item.id}
                className={`p-6 sm:p-8 border transition-all duration-200 relative group ${
                  item.highlight
                    ? 'border-[#D32F2F] bg-[#141414]'
                    : 'border-[#262626] bg-[#131313] hover:border-[#444748]'
                }`}
              >
                {/* Delete button */}
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  title="Remove this update (avoids crowding the site)"
                  className={`absolute top-4 right-4 p-1.5 transition-all z-10 cursor-pointer border ${
                    isCurator
                      ? 'bg-[#D32F2F] text-[#FFFFFF] border-[#FFFFFF] shadow-lg flex items-center gap-1 text-[10px] font-mono px-2'
                      : 'bg-[#0A0A0A] hover:bg-[#D32F2F] text-[#FFFFFF] border-[#262626] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {isCurator && <span className="font-bold">DELETE</span>}
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#262626] text-xs font-mono pr-10">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D32F2F] font-bold">0{index + 1}.</span>
                    <span className="text-[#FFFFFF] uppercase font-bold">{item.category}</span>
                    {item.highlight && (
                      <span className="px-2 py-0.5 bg-[#0A0A0A] text-[#D32F2F] text-[10px] uppercase font-bold tracking-wider border border-[#262626]">
                        Featured Milestone
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#757575]">
                    <Calendar className="w-3.5 h-3.5 text-[#D32F2F]" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl sm:text-2xl font-oswald uppercase font-bold text-[#FFFFFF] group-hover:text-[#D32F2F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-inter text-[#8E9192] mt-1">
                    {item.tagline}
                  </p>
                  <p className="mt-3 text-sm sm:text-base text-[#C4C7C7] font-inter leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {item.externalLink && (
                  <div className="mt-5 pt-3 border-t border-[#262626]">
                    <a
                      href={item.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#FFFFFF] hover:text-[#D32F2F] transition-colors"
                    >
                      <span>{item.externalLinkLabel || 'View Details'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D32F2F]" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal: Add Dispatch */}
        {isAddModalOpen && (
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#131313] border border-[#262626] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#1A1A1A]">
                <div>
                  <h3 className="text-xl font-oswald uppercase font-bold text-[#FFFFFF]">
                    Add New Dispatch
                  </h3>
                  <p className="text-xs text-[#8E9192] font-inter">
                    Post an announcement, meetup milestone, or protocol progress update.
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
                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Movement Network Nigeria Cohort Launch"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ECOSYSTEM MILESTONE"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. March 2025"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50+ students inducted into Move language bootcamp"
                    value={newTagline}
                    onChange={(e) => setNewTagline(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Summary
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Details about the activity and outcomes..."
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Link URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Link Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Read Announcement"
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>
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
                    Publish Dispatch
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

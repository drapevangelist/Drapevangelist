import React, { useState, useEffect } from 'react';
import { SOCIAL_TESTIMONIALS } from '../data/portfolioData';
import { SocialTestimonial } from '../types';
import { ShieldCheck, ExternalLink, Quote, Plus, Trash2, RotateCcw, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';
import { isEditorEnvironment } from '../utils/envUtils';

export const SocialTestimonialsSection: React.FC = () => {
  const [isEditorAllowed] = useState(isEditorEnvironment());
  const [isCurator, setIsCurator] = useState(() => curationStore.isCuratorMode());
  const [hiddenIds, setHiddenIds] = useState<string[]>(() => curationStore.getHiddenTestimonialIds());
  const [customTestimonials, setCustomTestimonials] = useState<SocialTestimonial[]>(() => curationStore.getCustomTestimonials());

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [newSocialHandle, setNewSocialHandle] = useState('');

  const refreshTestimonials = () => {
    setIsCurator(curationStore.isCuratorMode());
    setHiddenIds(curationStore.getHiddenTestimonialIds());
    setCustomTestimonials(curationStore.getCustomTestimonials());
  };

  useEffect(() => {
    const unsub = curationStore.subscribe(refreshTestimonials);
    return unsub;
  }, []);

  const allItems: SocialTestimonial[] = [...customTestimonials, ...SOCIAL_TESTIMONIALS].filter(
    (item) => !hiddenIds.includes(item.id)
  );

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundEngine.playClick();
    curationStore.hideTestimonial(id);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();

    if (!newAuthor.trim() || !newQuote.trim()) return;

    const initials = newAuthor
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'TX';

    const newItem: SocialTestimonial = {
      id: `test-custom-${Date.now()}`,
      author: newAuthor.trim(),
      role: newRole.trim() || 'Collaborator & Builder',
      organization: newOrg.trim() || 'Web3 Ecosystem',
      quote: newQuote.trim(),
      context: newContext.trim() || 'Ecosystem Collaboration',
      year: newYear.trim() || '2025',
      verified: true,
      avatarInitials: initials,
      socialUrl: newSocialUrl.trim() || undefined,
      socialHandle: newSocialHandle.trim() || undefined,
      socialPlatform: 'x',
    };

    curationStore.addCustomTestimonial(newItem);

    // Reset
    setNewAuthor('');
    setNewRole('');
    setNewOrg('');
    setNewQuote('');
    setNewContext('');
    setNewYear('');
    setNewSocialUrl('');
    setNewSocialHandle('');
    setIsAddModalOpen(false);
  };

  return (
    <section id="testimonials" className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0A0A0A] border-t border-[#262626] relative text-[#E5E2E1]">
      <div className="max-w-6xl mx-auto">
        {/* Curatorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#D32F2F] font-bold">
              <span>SECTION 05</span>
              <span>//</span>
              <span>ATTRIBUTABLE SOCIAL PROOF</span>
            </div>
            <h2 className="mt-2 text-4xl sm:text-6xl font-oswald uppercase font-bold tracking-tight text-[#FFFFFF] leading-[0.92]">
              Testimonials & Endorsements
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8E9192] font-inter max-w-2xl">
              Documented feedback from program directors, protocol contributors, campus developer co-leads, and community founders linked to their authentic social profiles.
            </p>
          </div>

          {isEditorAllowed && (
            <div className="flex flex-wrap items-center gap-2.5">
              {hiddenIds.length > 0 && (
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    curationStore.restoreTestimonials();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#20201F] text-xs font-mono uppercase tracking-wider text-[#D32F2F] hover:text-[#FFFFFF] border border-[#262626] transition-all cursor-pointer"
                  title="Restore deleted default testimonials"
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
                title="Add peer endorsement (Backend only)"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add Testimonial</span>
              </button>
            </div>
          )}
        </div>

        {/* Testimonials Grid (Zero radius, 1px border) */}
        {allItems.length === 0 ? (
          <div className="mt-10 p-12 text-center border border-[#262626] bg-[#131313]">
            <p className="font-oswald text-xl uppercase text-[#FFFFFF]">No Testimonials Displayed</p>
            <p className="text-xs text-[#8E9192] font-inter mt-1">Items have been removed to avoid crowding.</p>
            {isEditorAllowed && (
              <button
                onClick={() => curationStore.restoreTestimonials()}
                className="mt-4 px-4 py-2 bg-[#FFFFFF] text-[#0A0A0A] font-mono text-xs uppercase font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Defaults</span>
              </button>
            )}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allItems.map((item) => (
              <article
                key={item.id}
                className="p-6 sm:p-7 border border-[#262626] bg-[#131313] hover:border-[#444748] transition-all duration-200 flex flex-col justify-between group relative"
              >
                {/* Delete button (AI Studio Backend only, never shown on Vercel) */}
                {isEditorAllowed && (
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    title="Remove this endorsement (avoids crowding the site)"
                    className={`absolute top-3 right-3 p-1.5 transition-all z-10 cursor-pointer border ${
                      isCurator
                        ? 'bg-[#D32F2F] text-[#FFFFFF] border-[#FFFFFF] shadow-lg flex items-center gap-1 text-[10px] font-mono px-2'
                        : 'bg-[#0A0A0A] hover:bg-[#D32F2F] text-[#FFFFFF] border-[#262626] opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {isCurator && <span className="font-bold">DELETE</span>}
                  </button>
                )}

                <div>
                  {/* Top Author Ribbon & Social Link */}
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#262626] pr-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0A0A0A] border border-[#262626] flex items-center justify-center font-mono text-xs font-bold text-[#FFFFFF]">
                        {item.avatarInitials}
                      </div>
                      <div>
                        <h3 className="font-oswald text-base uppercase font-bold text-[#FFFFFF] group-hover:text-[#D32F2F] transition-colors">
                          {item.author}
                        </h3>
                        <p className="text-[11px] font-inter text-[#8E9192]">
                          {item.role} · {item.organization}
                        </p>
                      </div>
                    </div>

                    {item.verified && (
                      <div title="Verified Attestation">
                        <ShieldCheck className="w-4 h-4 text-[#D32F2F] shrink-0" />
                      </div>
                    )}
                  </div>

                  {/* Direct Social Media Profile Link */}
                  {item.socialUrl && (
                    <div className="mt-3 flex items-center justify-between">
                      <a
                        href={item.socialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#C4C7C7] hover:text-[#FFFFFF] transition-colors"
                      >
                        <span>{item.socialHandle || 'View Social Profile'}</span>
                        <ExternalLink className="w-3 h-3 text-[#D32F2F]" />
                      </a>
                      <span className="text-[10px] font-mono text-[#757575] uppercase">
                        {item.socialPlatform || 'Social Link'}
                      </span>
                    </div>
                  )}

                  {/* Quote Body */}
                  <div className="mt-4 relative">
                    <Quote className="w-6 h-6 text-[#262626] absolute -top-2 -left-1" />
                    <p className="relative z-10 text-xs sm:text-sm text-[#C4C7C7] font-inter italic leading-relaxed pt-2 pl-4">
                      “{item.quote}”
                    </p>
                  </div>
                </div>

                {/* Context Footer */}
                <div className="mt-6 pt-4 border-t border-[#262626] text-[11px] font-mono text-[#757575] flex items-center justify-between">
                  <span className="truncate pr-2">{item.context}</span>
                  <span className="shrink-0 text-[#FFFFFF] font-bold">{item.year}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal: Add Testimonial */}
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
                    Add Endorsement
                  </h3>
                  <p className="text-xs text-[#8E9192] font-inter">
                    Add verified feedback or quote from a peer, lead, or organizer.
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
                      Author Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ecosystem Lead"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Movement Network"
                      value={newOrg}
                      onChange={(e) => setNewOrg(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Year
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2025"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Testimonial Quote *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter what they said about working with Drapevangelist..."
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Social Profile URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://x.com/..."
                      value={newSocialUrl}
                      onChange={(e) => setNewSocialUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Social Handle
                    </label>
                    <input
                      type="text"
                      placeholder="@handle"
                      value={newSocialHandle}
                      onChange={(e) => setNewSocialHandle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
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
                    Add Endorsement
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

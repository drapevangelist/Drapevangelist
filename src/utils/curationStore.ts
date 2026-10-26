import { VisualProofItem, ChapterTabItem, SocialTestimonial, LatestUpdateItem, MosaicItem } from '../types';
import defaultContent from '../data/persistedContent.json';
import { isEditorEnvironment } from './envUtils';

export type PersistedContentType = typeof defaultContent;

export const STARTER_MOSAIC_ITEMS: MosaicItem[] = [
  {
    id: 'mosaic-1',
    title: 'BLOCKCHAIN UNIPORT MASTERCLASS',
    categoryLabel: 'KEYNOTE DISPATCH',
    location: 'Port Harcourt, Nigeria • Decentralized Architecture & Smart Contract Onboarding',
    imageUrl: '/assets/proof-masterclass.jpg',
    colSpan: 'md:col-span-7',
  },
  {
    id: 'mosaic-2',
    title: 'MOVEMENT LABS IRL GATHERING',
    categoryLabel: 'ECOSYSTEM SUMMIT',
    location: 'Lagos • Developer Network & Move Stack Activation',
    imageUrl: '/assets/proof-movement.jpg',
    colSpan: 'md:col-span-5',
  },
  {
    id: 'mosaic-3',
    title: 'GLOBAL AMBASSADOR & ECOSYSTEM STEWARD',
    categoryLabel: 'LEADERSHIP PLATE',
    location: 'Ambassador & Operations Lead • Base, Movement Network, Decred, BoonHQ',
    imageUrl: '/assets/portrait.jpg',
    colSpan: 'md:col-span-4',
  },
  {
    id: 'mosaic-4',
    title: 'CREATIVE RECORDING ARTIST & SONIC EVANGELIST',
    categoryLabel: 'CREATIVE PLATE',
    location: 'Sonic Storytelling • Connecting Hip-Hop, Afrobeats & On-Chain Culture',
    imageUrl: '/assets/musician.jpg',
    colSpan: 'md:col-span-4',
  },
  {
    id: 'mosaic-5',
    title: 'CAMPUS BUILDER MASCOT & COMMUNITY AVATAR',
    categoryLabel: 'CULTURAL AVATAR',
    location: 'UniPort & South-South Developer Hubs • Official Campus Mascot',
    imageUrl: '/assets/gida.jpg',
    colSpan: 'md:col-span-4',
  },
  {
    id: 'mosaic-6',
    title: 'BASE BUILDERS ON-CHAIN WORKSHOP',
    categoryLabel: 'BASE BUILDERS',
    location: 'Hands-on smart contract deployment & builder support',
    imageUrl: '/assets/proof-base.jpg',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'mosaic-7',
    title: 'HACK FOR GOOD 2ND PLACE JURY FINALS',
    categoryLabel: 'HACKATHON PODIUM',
    location: 'Port Harcourt • Public Goods & Decentralized Civic Infrastructure',
    imageUrl: '/assets/proof-hackathon.jpg',
    colSpan: 'md:col-span-6',
  },
];

const KEYS = {
  CURATOR_MODE: 'drape_curator_mode_v2',
  LIVE_CONTENT: 'drape_live_content_v2',
  HIDDEN_PROOFS: 'drape_hidden_proof_ids_v2',
  CUSTOM_PROOFS: 'drape_custom_proofs_v2',
  MOSAIC_ITEMS: 'drape_mosaic_items_v2',
  HIDDEN_CHAPTERS: 'drape_hidden_chapter_ids_v2',
  CUSTOM_CHAPTERS: 'drape_custom_chapters_v2',
  HIDDEN_TESTIMONIALS: 'drape_hidden_testimonial_ids_v2',
  CUSTOM_TESTIMONIALS: 'drape_custom_testimonials_v2',
  HIDDEN_UPDATES: 'drape_hidden_update_ids_v2',
  CUSTOM_UPDATES: 'drape_custom_updates_v2',
  HIDDEN_POW: 'drape_hidden_pow_ids_v2',
  CUSTOM_HERO_VIDEO: 'drape_custom_hero_video_v2',
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function emitChange() {
  listeners.forEach((l) => {
    try {
      l();
    } catch {
      // Safe guard
    }
  });
}

function cleanImageUrl(url: string | undefined, fallback: string): string {
  if (!url) return fallback;
  // If it's a private Google session URL, fallback to reliable permanent local asset
  if (url.includes('lh3.googleusercontent.com/aida/')) {
    return fallback;
  }
  return url;
}

// Background sync to server if running with server.ts
async function syncToServer(updatedData: Record<string, any>) {
  try {
    await fetch('/api/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
  } catch {
    // Non-blocking in static environment
  }
}

export const curationStore = {
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },

  isEditorAllowed(): boolean {
    return isEditorEnvironment();
  },

  // CURATOR / EDIT MODE
  isCuratorMode(): boolean {
    // CRITICAL: On Vercel / production, curation/edit tools are ALWAYS false
    if (!isEditorEnvironment()) {
      return false;
    }
    try {
      return localStorage.getItem(KEYS.CURATOR_MODE) === 'true';
    } catch {
      return false;
    }
  },

  setCuratorMode(enabled: boolean) {
    if (!isEditorEnvironment() && enabled) return;
    try {
      localStorage.setItem(KEYS.CURATOR_MODE, enabled ? 'true' : 'false');
      emitChange();
    } catch {
      // Storage unavailable
    }
  },

  toggleCuratorMode(): boolean {
    if (!isEditorEnvironment()) return false;
    const next = !this.isCuratorMode();
    this.setCuratorMode(next);
    return next;
  },

  // LIVE WORDS & VISUALS CONTENT
  getLiveContent(): PersistedContentType {
    let localData: Partial<PersistedContentType> = {};
    try {
      const stored = localStorage.getItem(KEYS.LIVE_CONTENT);
      if (stored) {
        localData = JSON.parse(stored);
      }
    } catch {
      // Fallback
    }

    // Merge default content from persistedContent.json with local overrides
    const hero = { ...defaultContent.hero, ...(localData.hero || {}) };
    const plate = { ...defaultContent.plate, ...(localData.plate || {}) };
    const bio = { ...defaultContent.bio, ...(localData.bio || {}) };
    const stats = { ...defaultContent.stats, ...(localData.stats || {}) };
    const contact = { ...defaultContent.contact, ...(localData.contact || {}) };

    hero.imageUrl = cleanImageUrl(hero.imageUrl, '/assets/portrait.jpg');
    plate.photoUrl = cleanImageUrl(plate.photoUrl, '/assets/plate-uniport-summit.jpg');
    bio.portraitUrl = cleanImageUrl(bio.portraitUrl, '/assets/portrait.jpg');

    return { hero, plate, bio, stats, contact };
  },

  updateSectionContent<K extends keyof PersistedContentType>(
    section: K,
    data: Partial<PersistedContentType[K]>
  ) {
    const current = this.getLiveContent();
    const updated = {
      ...current,
      [section]: {
        ...current[section],
        ...data,
      },
    };

    try {
      localStorage.setItem(KEYS.LIVE_CONTENT, JSON.stringify(updated));
    } catch {
      // Storage full or unavailable
    }

    emitChange();
    syncToServer({ [section]: updated[section] });
  },

  saveFullContent(newContent: PersistedContentType) {
    try {
      localStorage.setItem(KEYS.LIVE_CONTENT, JSON.stringify(newContent));
    } catch {
      // Safe
    }
    emitChange();
    syncToServer(newContent);
  },

  // VISUAL PROOFS
  getHiddenProofIds(): string[] {
    try {
      const v = localStorage.getItem(KEYS.HIDDEN_PROOFS);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  hideProof(id: string) {
    const list = this.getHiddenProofIds();
    if (!list.includes(id)) {
      list.push(id);
      try {
        localStorage.setItem(KEYS.HIDDEN_PROOFS, JSON.stringify(list));
      } catch {
        // Safe
      }
    }
    const custom = this.getCustomProofs().filter((p) => p.id !== id);
    try {
      localStorage.setItem(KEYS.CUSTOM_PROOFS, JSON.stringify(custom));
    } catch {
      // Safe
    }
    emitChange();
    syncToServer({ customProofs: custom });
  },

  restoreProofs() {
    try {
      localStorage.removeItem(KEYS.HIDDEN_PROOFS);
    } catch {
      // Safe
    }
    emitChange();
  },

  getCustomProofs(): VisualProofItem[] {
    try {
      const v = localStorage.getItem(KEYS.CUSTOM_PROOFS);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  addCustomProof(item: VisualProofItem) {
    const list = this.getCustomProofs();
    const updated = [item, ...list];
    try {
      localStorage.setItem(KEYS.CUSTOM_PROOFS, JSON.stringify(updated));
    } catch (err) {
      console.warn('[LocalStorage Quota or Unavailable, syncing to server]:', err);
    }
    emitChange();
    syncToServer({ customProofs: updated });
  },

  // PHOTO MOSAIC
  getMosaicItems(): MosaicItem[] {
    try {
      const v = localStorage.getItem(KEYS.MOSAIC_ITEMS);
      if (v) {
        const parsed = JSON.parse(v);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: MosaicItem) => ({
            ...item,
            imageUrl: cleanImageUrl(item.imageUrl, '/assets/portrait.jpg'),
          }));
        }
      }
    } catch {
      // fallback
    }
    return STARTER_MOSAIC_ITEMS;
  },

  saveMosaicItems(items: MosaicItem[]) {
    try {
      localStorage.setItem(KEYS.MOSAIC_ITEMS, JSON.stringify(items));
    } catch (err) {
      console.warn('[LocalStorage Quota or Unavailable, syncing to server]:', err);
    }
    emitChange();
    syncToServer({ mosaicItems: items });
  },

  addMosaicItem(item: MosaicItem) {
    const current = this.getMosaicItems();
    const updated = [item, ...current];
    this.saveMosaicItems(updated);
  },

  deleteMosaicItem(id: string) {
    const current = this.getMosaicItems();
    const updated = current.filter((m) => m.id !== id);
    this.saveMosaicItems(updated);
  },

  resetMosaic() {
    try {
      localStorage.removeItem(KEYS.MOSAIC_ITEMS);
    } catch {
      // Safe
    }
    emitChange();
    syncToServer({ mosaicItems: STARTER_MOSAIC_ITEMS });
  },

  // CHAPTERS
  getHiddenChapterIds(): string[] {
    try {
      const v = localStorage.getItem(KEYS.HIDDEN_CHAPTERS);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  hideChapter(id: string) {
    const list = this.getHiddenChapterIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(KEYS.HIDDEN_CHAPTERS, JSON.stringify(list));
    }
    const custom = this.getCustomChapters().filter((c) => c.id !== id);
    localStorage.setItem(KEYS.CUSTOM_CHAPTERS, JSON.stringify(custom));
    emitChange();
  },

  restoreChapters() {
    localStorage.removeItem(KEYS.HIDDEN_CHAPTERS);
    emitChange();
  },

  getCustomChapters(): ChapterTabItem[] {
    try {
      const v = localStorage.getItem(KEYS.CUSTOM_CHAPTERS);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  addCustomChapter(item: ChapterTabItem) {
    const list = this.getCustomChapters();
    const updated = [item, ...list];
    localStorage.setItem(KEYS.CUSTOM_CHAPTERS, JSON.stringify(updated));
    emitChange();
  },

  // SOCIAL TESTIMONIALS
  getHiddenTestimonialIds(): string[] {
    try {
      const v = localStorage.getItem(KEYS.HIDDEN_TESTIMONIALS);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  hideTestimonial(id: string) {
    const list = this.getHiddenTestimonialIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(KEYS.HIDDEN_TESTIMONIALS, JSON.stringify(list));
    }
    const custom = this.getCustomTestimonials().filter((t) => t.id !== id);
    localStorage.setItem(KEYS.CUSTOM_TESTIMONIALS, JSON.stringify(custom));
    emitChange();
  },

  getCustomTestimonials(): SocialTestimonial[] {
    try {
      const v = localStorage.getItem(KEYS.CUSTOM_TESTIMONIALS);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  addCustomTestimonial(item: SocialTestimonial) {
    const list = this.getCustomTestimonials();
    const updated = [item, ...list];
    localStorage.setItem(KEYS.CUSTOM_TESTIMONIALS, JSON.stringify(updated));
    emitChange();
  },

  restoreTestimonials() {
    localStorage.removeItem(KEYS.HIDDEN_TESTIMONIALS);
    emitChange();
  },

  // LATEST UPDATES
  getHiddenUpdateIds(): string[] {
    try {
      const v = localStorage.getItem(KEYS.HIDDEN_UPDATES);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  hideUpdate(id: string) {
    const list = this.getHiddenUpdateIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(KEYS.HIDDEN_UPDATES, JSON.stringify(list));
    }
    const custom = this.getCustomUpdates().filter((u) => u.id !== id);
    localStorage.setItem(KEYS.CUSTOM_UPDATES, JSON.stringify(custom));
    emitChange();
  },

  getCustomUpdates(): LatestUpdateItem[] {
    try {
      const v = localStorage.getItem(KEYS.CUSTOM_UPDATES);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  addCustomUpdate(item: LatestUpdateItem) {
    const list = this.getCustomUpdates();
    const updated = [item, ...list];
    localStorage.setItem(KEYS.CUSTOM_UPDATES, JSON.stringify(updated));
    emitChange();
  },

  restoreUpdates() {
    localStorage.removeItem(KEYS.HIDDEN_UPDATES);
    emitChange();
  },

  // PROOF OF WORK RECORDS
  getHiddenPowIds(): string[] {
    try {
      const v = localStorage.getItem(KEYS.HIDDEN_POW);
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  },

  hidePowItem(id: string) {
    const list = this.getHiddenPowIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(KEYS.HIDDEN_POW, JSON.stringify(list));
    }
    emitChange();
  },

  restorePow() {
    localStorage.removeItem(KEYS.HIDDEN_POW);
    emitChange();
  },

  // HERO VIDEO
  getCustomHeroVideo(): string | null {
    try {
      const local = localStorage.getItem(KEYS.CUSTOM_HERO_VIDEO);
      if (local) return local;
    } catch {
      //
    }
    return defaultContent.hero.videoUrl || null;
  },

  setCustomHeroVideo(url: string | null) {
    try {
      if (url) {
        localStorage.setItem(KEYS.CUSTOM_HERO_VIDEO, url);
        this.updateSectionContent('hero', { videoUrl: url });
      } else {
        localStorage.removeItem(KEYS.CUSTOM_HERO_VIDEO);
      }
      emitChange();
    } catch {
      // Storage unavailable
    }
  },

  // RESET ALL
  resetAllCuration() {
    try {
      Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
      emitChange();
    } catch {
      // Storage unavailable
    }
  },
};

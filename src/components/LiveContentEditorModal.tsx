import React, { useState, useEffect } from 'react';
import { X, Save, Check, Copy, Download, Upload, AlertCircle, Sparkles, Globe, Eye } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore, PersistedContentType } from '../utils/curationStore';
import { uploadImageFile } from '../utils/imageUploadHelper';

interface LiveContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'hero' | 'plate' | 'bio' | 'stats' | 'contact' | 'vercel';
}

type TabType = 'hero' | 'plate' | 'bio' | 'stats' | 'contact' | 'vercel';

export const LiveContentEditorModal: React.FC<LiveContentEditorModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'hero',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [content, setContent] = useState<PersistedContentType>(() => curationStore.getLiveContent());
  const [isSaved, setIsSaved] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(curationStore.getLiveContent());
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleSave = () => {
    soundEngine.playClick();
    curationStore.saveFullContent(content);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const copyJson = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const downloadJson = () => {
    soundEngine.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'persistedContent.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUrl: (uploadedUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus('Uploading & optimizing image...');
    try {
      const res = await uploadImageFile(file);
      if (res.success && res.url) {
        onUrl(res.url);
        setUploadStatus('Image uploaded!');
        setTimeout(() => setUploadStatus(null), 2500);
      } else {
        setUploadStatus('Upload failed. Try another image.');
        setTimeout(() => setUploadStatus(null), 3500);
      }
    } catch {
      setUploadStatus('Error uploading image.');
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 text-[#E5E2E1]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#131313] border border-[#262626] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Editor Modal Top Masthead */}
        <div className="px-6 py-4 bg-[#1A1A1A] border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#D32F2F] animate-pulse"></span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D32F2F] font-bold block">
                BACKEND EDITORIAL STUDIO // LIVE CONTENT & VISUALS
              </span>
              <h2 className="text-xl font-oswald uppercase font-bold text-[#FFFFFF]">
                Broadsheet Live Editor
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {uploadStatus && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#D32F2F]/20 border border-[#D32F2F] text-[#FFFFFF] text-[11px] font-mono animate-pulse">
                <span className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full"></span>
                {uploadStatus}
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-inter font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border border-[#FFFFFF]"
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#D32F2F]" />
                  <span>Saved to Disk!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Edits</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-[#0A0A0A] hover:bg-[#D32F2F] text-[#FFFFFF] border border-[#262626] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex overflow-x-auto border-b border-[#262626] bg-[#0E0E0E] text-xs font-mono">
          {[
            { id: 'hero', label: '01. Hero & Name' },
            { id: 'plate', label: '02. Dispatch Plate' },
            { id: 'bio', label: '03. Bio & Pillars' },
            { id: 'stats', label: '04. Impact Metrics' },
            { id: 'contact', label: '05. Manifesto & Connect' },
            { id: 'vercel', label: '06. Vercel & Deploy' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab(tab.id as TabType);
              }}
              className={`px-4 py-3 whitespace-nowrap uppercase tracking-wider border-r border-[#262626] cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1A1A1A] text-[#FFFFFF] font-bold border-b-2 border-b-[#D32F2F]'
                  : 'text-[#8E9192] hover:text-[#FFFFFF] hover:bg-[#141414]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-inter bg-[#131313]">
          {/* TAB 1: HERO */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#0A0A0A] border-l-2 border-[#D32F2F] text-xs text-[#8E9192]">
                Configure the massive broadsheet header, full-bleed background loop, and primary headline.
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Kicker Name (Top Line)
                </label>
                <input
                  type="text"
                  value={content.hero.kicker}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, kicker: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Monumental Headline
                </label>
                <input
                  type="text"
                  value={content.hero.headline}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-oswald text-xl uppercase focus:border-[#D32F2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Professional Tagline
                </label>
                <input
                  type="text"
                  value={content.hero.tagline}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, tagline: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Sub-Narrative Dispatch Text
                </label>
                <textarea
                  rows={2}
                  value={content.hero.subtext}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, subtext: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Full-Screen Hero Portrait Photo URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={content.hero.imageUrl || ''}
                    onChange={(e) =>
                      setContent({ ...content, hero: { ...content.hero, imageUrl: e.target.value } })
                    }
                    placeholder="https://... or upload from device"
                    className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                  />
                  <label className="px-3 py-2 bg-[#1A1A1A] hover:bg-[#20201F] border border-[#262626] text-[#FFFFFF] font-mono uppercase text-[11px] cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#D32F2F]" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setContent({ ...content, hero: { ...content.hero, imageUrl: url } })
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Background Video Loop URL (Optional MP4 stream)
                </label>
                <input
                  type="url"
                  value={content.hero.videoUrl}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, videoUrl: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: DISPATCH PLATE */}
          {activeTab === 'plate' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#0A0A0A] border-l-2 border-[#D32F2F] text-xs text-[#8E9192]">
                Configure the secondary archival broadsheet plate below the full-page video hero.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                    Archival Tagline
                  </label>
                  <input
                    type="text"
                    value={content.plate.dispatchTag}
                    onChange={(e) =>
                      setContent({ ...content, plate: { ...content.plate, dispatchTag: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                    Dispatch Location Nodes
                  </label>
                  <input
                    type="text"
                    value={content.plate.dispatchLocation}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        plate: { ...content.plate, dispatchLocation: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Plate Headline
                </label>
                <textarea
                  rows={2}
                  value={content.plate.headline}
                  onChange={(e) =>
                    setContent({ ...content, plate: { ...content.plate, headline: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-oswald text-lg uppercase focus:border-[#D32F2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Plate Narrative Summary
                </label>
                <textarea
                  rows={3}
                  value={content.plate.body}
                  onChange={(e) =>
                    setContent({ ...content, plate: { ...content.plate, body: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                />
              </div>

              {/* Photo Plate Visual */}
              <div className="pt-2 border-t border-[#262626]">
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Plate Feature Photo URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={content.plate.photoUrl}
                    onChange={(e) =>
                      setContent({ ...content, plate: { ...content.plate, photoUrl: e.target.value } })
                    }
                    className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                  />
                  <label className="px-3 py-2 bg-[#1A1A1A] hover:bg-[#20201F] border border-[#262626] text-[#FFFFFF] font-mono uppercase text-[11px] cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#D32F2F]" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setContent({ ...content, plate: { ...content.plate, photoUrl: url } })
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                    Photo Title Banner
                  </label>
                  <input
                    type="text"
                    value={content.plate.photoTitle}
                    onChange={(e) =>
                      setContent({ ...content, plate: { ...content.plate, photoTitle: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-oswald uppercase focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                    Photo Metrics Tag
                  </label>
                  <input
                    type="text"
                    value={content.plate.photoTag}
                    onChange={(e) =>
                      setContent({ ...content, plate: { ...content.plate, photoTag: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BIO & PILLARS */}
          {activeTab === 'bio' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#0A0A0A] border-l-2 border-[#D32F2F] text-xs text-[#8E9192]">
                Configure Mark&apos;s biography narrative and the three persona identity visual plates (Ambassador, Musician, Cultural Mascot).
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Bio Portrait Photo URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={content.bio.portraitUrl}
                    onChange={(e) =>
                      setContent({ ...content, bio: { ...content.bio, portraitUrl: e.target.value } })
                    }
                    className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                  />
                  <label className="px-3 py-2 bg-[#1A1A1A] hover:bg-[#20201F] border border-[#262626] text-[#FFFFFF] font-mono uppercase text-[11px] cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#D32F2F]" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setContent({ ...content, bio: { ...content.bio, portraitUrl: url } })
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Three Media Plates */}
              <div className="pt-2 border-t border-[#262626]">
                <label className="block text-xs font-mono uppercase text-[#D32F2F] font-bold mb-2">
                  Three Pillar Visual Plates
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#757575] mb-1">
                      1. Ambassador Plate
                    </label>
                    <input
                      type="text"
                      value={content.bio.ambassadorImage}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          bio: { ...content.bio, ambassadorImage: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1.5 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono text-[11px] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#757575] mb-1">
                      2. Musician Plate
                    </label>
                    <input
                      type="text"
                      value={content.bio.musicianImage}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          bio: { ...content.bio, musicianImage: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1.5 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono text-[11px] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#757575] mb-1">
                      3. Mascot Avatar Plate
                    </label>
                    <input
                      type="text"
                      value={content.bio.mascotImage}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          bio: { ...content.bio, mascotImage: e.target.value },
                        })
                      }
                      className="w-full px-2 py-1.5 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono text-[11px] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Narrative Paragraphs */}
              <div className="pt-2 border-t border-[#262626] space-y-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                    Bio Paragraph 1 (Roots & Protocol Operations)
                  </label>
                  <textarea
                    rows={3}
                    value={content.bio.paragraph1}
                    onChange={(e) =>
                      setContent({ ...content, bio: { ...content.bio, paragraph1: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] leading-relaxed focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                    Bio Paragraph 2 (UniPort & Ecosystem Deployments)
                  </label>
                  <textarea
                    rows={3}
                    value={content.bio.paragraph2}
                    onChange={(e) =>
                      setContent({ ...content, bio: { ...content.bio, paragraph2: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] leading-relaxed focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                    Bio Paragraph 3 (Creative Artistry & Culture)
                  </label>
                  <textarea
                    rows={3}
                    value={content.bio.paragraph3}
                    onChange={(e) =>
                      setContent({ ...content, bio: { ...content.bio, paragraph3: e.target.value } })
                    }
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] leading-relaxed focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#0A0A0A] border-l-2 border-[#D32F2F] text-xs text-[#8E9192]">
                Configure the four broadsheet headline metric cards displayed in the Proof of Work Ledger.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#0A0A0A] border border-[#262626] space-y-2">
                  <span className="font-mono text-[10px] uppercase text-[#D32F2F] font-bold">Metric 01</span>
                  <input
                    type="text"
                    value={content.stats.stat1Num}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat1Num: e.target.value } })
                    }
                    placeholder="e.g. 5,000+"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#FFFFFF] font-oswald text-xl focus:border-[#D32F2F] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={content.stats.stat1Label}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat1Label: e.target.value } })
                    }
                    placeholder="Label"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#FFFFFF] font-mono uppercase text-xs focus:border-[#D32F2F] focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={content.stats.stat1Desc}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat1Desc: e.target.value } })
                    }
                    placeholder="Description"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#C4C7C7] text-xs focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div className="p-4 bg-[#0A0A0A] border border-[#262626] space-y-2">
                  <span className="font-mono text-[10px] uppercase text-[#D32F2F] font-bold">Metric 02</span>
                  <input
                    type="text"
                    value={content.stats.stat2Num}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat2Num: e.target.value } })
                    }
                    placeholder="e.g. 40+"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#FFFFFF] font-oswald text-xl focus:border-[#D32F2F] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={content.stats.stat2Label}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat2Label: e.target.value } })
                    }
                    placeholder="Label"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#FFFFFF] font-mono uppercase text-xs focus:border-[#D32F2F] focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={content.stats.stat2Desc}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat2Desc: e.target.value } })
                    }
                    placeholder="Description"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#C4C7C7] text-xs focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div className="p-4 bg-[#0A0A0A] border border-[#262626] space-y-2">
                  <span className="font-mono text-[10px] uppercase text-[#D32F2F] font-bold">Metric 03</span>
                  <input
                    type="text"
                    value={content.stats.stat3Num}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat3Num: e.target.value } })
                    }
                    placeholder="e.g. 20+"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#FFFFFF] font-oswald text-xl focus:border-[#D32F2F] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={content.stats.stat3Label}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat3Label: e.target.value } })
                    }
                    placeholder="Label"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#FFFFFF] font-mono uppercase text-xs focus:border-[#D32F2F] focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={content.stats.stat3Desc}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat3Desc: e.target.value } })
                    }
                    placeholder="Description"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#C4C7C7] text-xs focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div className="p-4 bg-[#0A0A0A] border border-[#262626] space-y-2">
                  <span className="font-mono text-[10px] uppercase text-[#D32F2F] font-bold">Metric 04</span>
                  <input
                    type="text"
                    value={content.stats.stat4Num}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat4Num: e.target.value } })
                    }
                    placeholder="e.g. 11+"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#FFFFFF] font-oswald text-xl focus:border-[#D32F2F] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={content.stats.stat4Label}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat4Label: e.target.value } })
                    }
                    placeholder="Label"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#FFFFFF] font-mono uppercase text-xs focus:border-[#D32F2F] focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={content.stats.stat4Desc}
                    onChange={(e) =>
                      setContent({ ...content, stats: { ...content.stats, stat4Desc: e.target.value } })
                    }
                    placeholder="Description"
                    className="w-full px-3 py-1.5 bg-[#141414] border border-[#262626] text-[#C4C7C7] text-xs focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MANIFESTO & CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#0A0A0A] border-l-2 border-[#D32F2F] text-xs text-[#8E9192]">
                Configure the closing manifesto statement, direct email, and inquiry copy.
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Closing Manifesto Title
                </label>
                <textarea
                  rows={2}
                  value={content.contact.manifestoTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, manifestoTitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-oswald text-lg uppercase focus:border-[#D32F2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Manifesto Body
                </label>
                <textarea
                  rows={3}
                  value={content.contact.manifestoBody}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, manifestoBody: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Direct Email Address
                </label>
                <input
                  type="email"
                  value={content.contact.email}
                  onChange={(e) =>
                    setContent({ ...content, contact: { ...content.contact, email: e.target.value } })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#757575] font-bold mb-1">
                  Inquiries Subtext
                </label>
                <textarea
                  rows={2}
                  value={content.contact.channelsSubtext}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, channelsSubtext: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 6: VERCEL & DEPLOYMENT ARCHITECTURE */}
          {activeTab === 'vercel' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#0A0A0A] border border-[#D32F2F] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#D32F2F] font-mono font-bold uppercase text-xs">
                  <Globe className="w-4 h-4" />
                  <span>Deployment Architecture & Privacy Protection</span>
                </div>
                <h3 className="font-oswald text-xl uppercase font-bold text-[#FFFFFF]">
                  Backend vs. Vercel Production Separation
                </h3>
                <p className="text-xs text-[#C4C7C7] font-inter leading-relaxed">
                  As requested, your site has a built-in strict separation between this development environment and your live Vercel deployment:
                </p>
                <ul className="space-y-1.5 pt-2 text-xs font-inter text-[#E5E2E1]">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D32F2F] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#FFFFFF]">On Vercel (Production):</strong> All edit buttons, &ldquo;Curate Site&rdquo; controls, delete trash icons, and modal forms are <strong>100% hidden</strong> from public visitors. Only your finished, polished editorial documentary will be live.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D32F2F] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#FFFFFF]">Here on the Backend:</strong> You have full control to edit words, upload visuals, delete irrelevant entries, and curate every chapter and proof.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D32F2F] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#FFFFFF]">Permanent Persistence:</strong> Edits are saved directly to <code className="text-[#D32F2F] font-mono">src/data/persistedContent.json</code>. When Vercel builds the repo (<code className="text-[#FFFFFF] font-mono">npm run build</code>), all your latest words and visuals are baked directly into the finished product!
                    </span>
                  </li>
                </ul>
              </div>

              {/* Data Export / Backup Utilities */}
              <div className="p-5 bg-[#0A0A0A] border border-[#262626] space-y-4">
                <h4 className="font-oswald text-base uppercase font-bold text-[#FFFFFF]">
                  Content Backup & Manual Export
                </h4>
                <p className="text-xs text-[#8E9192]">
                  You can copy or download your current site data anytime as a JSON snapshot:
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={copyJson}
                    className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#20201F] text-[#FFFFFF] border border-[#262626] font-mono text-xs uppercase inline-flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {copiedJson ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D32F2F]" />
                        <span>Copied JSON!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Full Data JSON</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={downloadJson}
                    className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#20201F] text-[#FFFFFF] border border-[#262626] font-mono text-xs uppercase inline-flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D32F2F]" />
                    <span>Download persistedContent.json</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="px-6 py-4 bg-[#141414] border-t border-[#262626] flex items-center justify-between">
          <div className="text-[11px] font-mono text-[#757575]">
            {isSaved ? (
              <span className="text-[#D32F2F] font-bold">✓ Changes saved to project files and memory.</span>
            ) : (
              <span>Click &ldquo;Apply & Save Changes&rdquo; to persist all text and visuals.</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#0A0A0A] text-[#C4C7C7] hover:text-[#FFFFFF] border border-[#262626] text-xs font-mono uppercase cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider cursor-pointer border border-[#FFFFFF] flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply & Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

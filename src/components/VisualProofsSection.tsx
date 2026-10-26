import React, { useState, useEffect, useRef } from 'react';
import { VISUAL_PROOFS } from '../data/portfolioData';
import { VisualProofItem } from '../types';
import { 
  Camera, 
  Video, 
  Play, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Plus,
  Upload,
  Link as LinkIcon,
  Trash2,
  HelpCircle,
  Sparkles,
  Info,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';
import { isEditorEnvironment } from '../utils/envUtils';
import { uploadImageFile } from '../utils/imageUploadHelper';

export const VisualProofsSection: React.FC = () => {
  const [isEditorAllowed] = useState(isEditorEnvironment());
  const [isCurator, setIsCurator] = useState(curationStore.isCuratorMode());
  const [mediaList, setMediaList] = useState<VisualProofItem[]>(() => {
    const hidden = curationStore.getHiddenProofIds();
    const custom = curationStore.getCustomProofs();
    return [...custom, ...VISUAL_PROOFS].filter((item) => !hidden.includes(item.id));
  });
  const [hiddenCount, setHiddenCount] = useState<number>(() => curationStore.getHiddenProofIds().length);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<VisualProofItem | null>(null);

  // Add Media Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [inputType, setInputType] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  
  // Form fields
  const [newTitle, setNewTitle] = useState('');
  const [newEvent, setNewEvent] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<'summits' | 'campus' | 'hackathons' | 'speaking' | 'drapnet' | 'creative'>('summits');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newImpactNote, setNewImpactNote] = useState('');
  const [newSocialPostUrl, setNewSocialPostUrl] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshList = () => {
    setIsCurator(curationStore.isCuratorMode());
    const hidden = curationStore.getHiddenProofIds();
    const custom = curationStore.getCustomProofs();
    setHiddenCount(hidden.length);
    setMediaList([...custom, ...VISUAL_PROOFS].filter((item) => !hidden.includes(item.id)));
  };

  useEffect(() => {
    const unsub = curationStore.subscribe(refreshList);
    return unsub;
  }, []);

  const categories = [
    { id: 'all', label: 'All Visual Proofs' },
    { id: 'drapnet', label: 'DRAPNET Only (Exclusive)' },
    { id: 'creative', label: 'Creative & Personas' },
    { id: 'summits', label: 'Summits & Meetups' },
    { id: 'speaking', label: 'Speaking & Keynotes' },
    { id: 'campus', label: 'Campus & Workshops' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'video_only', label: 'Videos Only' },
  ];

  const filteredItems = mediaList.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'video_only') return item.type === 'video';
    return item.category === selectedCategory;
  });

  const openLightbox = (item: VisualProofItem) => {
    soundEngine.playClick();
    setActiveMedia(item);
  };

  const closeLightbox = () => {
    soundEngine.playClick();
    setActiveMedia(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (!activeMedia) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeMedia.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveMedia(filteredItems[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    if (!activeMedia) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeMedia.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveMedia(filteredItems[nextIndex]);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      setNewMediaType('video');
    } else {
      setNewMediaType('image');
    }

    setIsUploading(true);
    setFormError(null);

    try {
      const res = await uploadImageFile(file);
      if (res.success && res.url) {
        setFilePreview(res.url);
        setNewMediaUrl(res.url);
      } else {
        setFormError(res.error || 'Failed to process file. Please try another image.');
      }
    } catch (err: any) {
      setFormError(err.message || 'Error uploading image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    setFormError(null);

    const mediaSource = inputType === 'upload' ? filePreview : newMediaUrl;

    if (!mediaSource) {
      setFormError(inputType === 'upload' ? 'Please select a photo or video file from your device.' : 'Please paste an image or video URL.');
      return;
    }

    if (!newTitle.trim()) {
      setFormError('Please enter a title for this visual proof.');
      return;
    }

    const newItem: VisualProofItem = {
      id: `custom-proof-${Date.now()}`,
      type: newMediaType,
      title: newTitle.trim(),
      event: newEvent.trim() || (newCategory === 'drapnet' ? 'DRAPNET Initiative' : 'Community Engagement'),
      date: newDate.trim() || '2025–2026',
      category: newCategory,
      thumbnailUrl: mediaSource,
      mediaUrl: mediaSource,
      caption: newCaption.trim() || (newCategory === 'drapnet' ? 'DRAPNET official media archive.' : 'Visual documentation of grassroots community operations and builder activation.'),
      impactNote: newImpactNote.trim() || (newCategory === 'drapnet' ? 'DRAPNET builder syndicate & protocol bridge' : undefined),
      socialPostUrl: newSocialPostUrl.trim() || undefined,
      isUserUploaded: true,
      exclusiveTag: newCategory === 'drapnet' ? 'DRAPNET ONLY' : undefined,
    };

    curationStore.addCustomProof(newItem);

    // Reset form
    setNewTitle('');
    setNewEvent('');
    setNewDate('');
    setNewMediaUrl('');
    setNewCaption('');
    setNewImpactNote('');
    setNewSocialPostUrl('');
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsAddModalOpen(false);
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundEngine.playClick();
    curationStore.hideProof(id);
    if (activeMedia?.id === id) {
      setActiveMedia(null);
    }
  };

  return (
    <section id="visual-proofs" className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0E0E0E] border-t border-[#262626] relative text-[#E5E2E1]">
      <div className="max-w-6xl mx-auto">
        {/* Curatorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#D32F2F] font-bold">
              <span>SECTION 04</span>
              <span>//</span>
              <span>PHOTOGRAPHIC & VIDEO VERIFICATION</span>
            </div>
            <h2 className="mt-2 text-4xl sm:text-6xl font-oswald uppercase font-bold tracking-tight text-[#FFFFFF] leading-[0.92]">
              Visual Proofs
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8E9192] font-inter max-w-2xl">
              Photographic archives and video reels capturing real-world campus workshops, regional protocol summits, stage keynotes, and student builder sessions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isEditorAllowed && (
              <>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsHelpModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#141414] hover:bg-[#20201F] text-xs font-mono uppercase tracking-wider text-[#C4C7C7] hover:text-[#FFFFFF] border border-[#262626] transition-all cursor-pointer"
                  title="Social Media Sync & Upload Guide"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#D32F2F]" />
                  <span>Social Media Sync Guide</span>
                </button>

                {hiddenCount > 0 && (
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      curationStore.restoreProofs();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#141414] hover:bg-[#20201F] text-xs font-mono uppercase tracking-wider text-[#D32F2F] hover:text-[#FFFFFF] border border-[#262626] transition-all cursor-pointer"
                    title="Restore deleted default proof items"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore ({hiddenCount} Hidden)</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsAddModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#FFFFFF]"
                  title="Add photographic or video proof (Backend only)"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Proof Record</span>
                </button>
              </>
            )}

            <span className="px-3 py-2 bg-[#141414] border border-[#262626] text-xs font-mono text-[#FFFFFF] uppercase tracking-wider font-bold">
              {mediaList.length} Records
            </span>
          </div>
        </div>

        {/* Quick Help Callout Banner (AI Studio Backend only) */}
        {isEditorAllowed && isCurator && (
          <div className="mt-6 p-4 bg-[#141414] border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-inter animate-in fade-in">
            <div className="flex items-center gap-2.5 text-[#C4C7C7]">
              <Sparkles className="w-4 h-4 text-[#D32F2F] shrink-0" />
              <span>
                <strong className="text-[#FFFFFF]">Syncing pictures from social media:</strong> You can upload files directly from your phone/laptop, or right-click any photo from your Twitter/X or LinkedIn post and paste the image link!
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#8E9192]">
              <span>Hover any card or enable Curate Site to delete irrelevant records.</span>
            </div>
          </div>
        )}

        {/* Category Filters (Zero radius, sharp tabs) */}
        <div className="mt-8 flex flex-wrap gap-2 pb-4 border-b border-[#262626]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#0A0A0A] font-bold border-[#FFFFFF]'
                    : 'bg-[#141414] text-[#8E9192] hover:text-[#FFFFFF] hover:bg-[#20201F] border-[#262626]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group cursor-pointer border border-[#262626] bg-[#131313] overflow-hidden hover:border-[#D32F2F] transition-all duration-200 flex flex-col relative"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/proof-masterclass.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

                {/* Media Type Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-[#0A0A0A]/90 border border-[#262626] text-[10px] font-mono uppercase tracking-wider text-[#FFFFFF]">
                  {item.type === 'video' ? (
                    <>
                      <Video className="w-3 h-3 text-[#D32F2F]" />
                      <span>Video Clip</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3 h-3 text-[#FFFFFF]" />
                      <span>Photo Proof</span>
                    </>
                  )}
                </div>

                {/* Delete button (AI Studio Backend only, hidden on Vercel) */}
                {isEditorAllowed && (
                  <button
                    onClick={(e) => handleDeleteItem(e, item.id)}
                    title="Delete record from archive (avoids site crowding)"
                    className={`absolute top-3 right-3 p-1.5 transition-all z-10 cursor-pointer border ${
                      isCurator
                        ? 'bg-[#D32F2F] text-[#FFFFFF] border-[#FFFFFF] shadow-lg flex items-center gap-1 text-[10px] font-mono px-2'
                        : 'bg-[#0A0A0A]/90 hover:bg-[#D32F2F] text-[#FFFFFF] border-[#262626] opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {isCurator && <span className="font-bold">DELETE</span>}
                  </button>
                )}

                {/* Center Hover Action Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <div className="w-10 h-10 bg-[#FFFFFF] text-[#0A0A0A] flex items-center justify-center">
                    {item.type === 'video' ? (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Date stamp */}
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#C4C7C7]">
                  {item.date}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#757575]">
                    <span className="font-bold">{item.event}</span>
                    <div className="flex items-center gap-1.5">
                      {(item.category === 'drapnet' || item.exclusiveTag) && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#D32F2F]/20 text-[#D32F2F] border border-[#D32F2F] font-bold">
                          DRAPNET ONLY
                        </span>
                      )}
                      {item.category === 'creative' && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#141414] text-[#FFFFFF] border border-[#262626]">
                          Persona / Plate
                        </span>
                      )}
                      {item.isUserUploaded && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#0A0A0A] text-[#C4C7C7] border border-[#262626]">
                          Custom Entry
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-1.5 text-lg font-oswald uppercase font-bold text-[#FFFFFF] group-hover:text-[#D32F2F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#8E9192] line-clamp-2 leading-relaxed font-inter">
                    {item.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between gap-2 text-[11px]">
                  {item.impactNote ? (
                    <div className="flex items-center gap-1.5 text-[#E5E2E1] font-inter truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D32F2F] shrink-0" />
                      <span className="truncate">{item.impactNote}</span>
                    </div>
                  ) : (
                    <div />
                  )}

                  {item.socialPostUrl && (
                    <a
                      href={item.socialPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#FFFFFF] hover:text-[#D32F2F] hover:underline shrink-0"
                    >
                      <span>Post</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox / Video Modal */}
        {activeMedia && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#131313] border border-[#262626] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Header */}
              <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#757575] font-bold">
                    {activeMedia.event} // {activeMedia.date}
                  </div>
                  <h3 className="text-xl font-oswald uppercase font-bold text-[#FFFFFF]">
                    {activeMedia.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {activeMedia.socialPostUrl && (
                    <a
                      href={activeMedia.socialPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#0A0A0A] text-xs font-mono uppercase tracking-wider border border-[#262626] transition-colors"
                    >
                      <span>Original Post</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={(e) => handleDeleteItem(e, activeMedia.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#D32F2F] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider border border-[#262626] transition-colors cursor-pointer"
                    title="Delete this record from archive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Delete Record</span>
                  </button>
                  <button
                    onClick={closeLightbox}
                    className="p-1.5 bg-[#0A0A0A] hover:bg-[#D32F2F] text-[#FFFFFF] border border-[#262626] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Media Body */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[320px]">
                {activeMedia.type === 'video' ? (
                  <video
                    src={activeMedia.mediaUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[60vh] object-contain"
                  />
                ) : (
                  <img
                    src={activeMedia.mediaUrl}
                    alt={activeMedia.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/proof-masterclass.jpg';
                    }}
                    className="w-full max-h-[60vh] object-contain"
                  />
                )}

                {/* Left/Right Navigation */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[#0A0A0A] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#0A0A0A] border border-[#262626] transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#0A0A0A] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#0A0A0A] border border-[#262626] transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Caption Footer */}
              <div className="p-6 border-t border-[#262626] bg-[#0A0A0A]">
                <p className="text-sm text-[#C4C7C7] leading-relaxed font-inter">
                  {activeMedia.caption}
                </p>
                {activeMedia.impactNote && (
                  <div className="mt-2 text-xs font-mono text-[#FFFFFF] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D32F2F]" />
                    <span>Impact: {activeMedia.impactNote}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Photo / Video Proof */}
        {isAddModalOpen && (
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#131313] border border-[#262626] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#1A1A1A]">
                <div>
                  <h3 className="text-xl font-oswald uppercase font-bold text-[#FFFFFF]">
                    Add Visual Proof Record
                  </h3>
                  <p className="text-xs text-[#8E9192] font-inter">
                    Upload photos/videos from your device, or paste direct image links from Twitter/X and LinkedIn.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 bg-[#0A0A0A] hover:bg-[#D32F2F] text-[#FFFFFF] border border-[#262626] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-6 overflow-y-auto space-y-4">
                {formError && (
                  <div className="p-3 bg-[#1C1B1B] border border-[#D32F2F] text-xs text-[#FFFFFF]">
                    {formError}
                  </div>
                )}

                {/* Input Method Switcher */}
                <div>
                  <label className="block text-xs font-mono text-[#757575] uppercase tracking-wider mb-2 font-bold">
                    Media Source
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInputType('upload')}
                      className={`p-3 border text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        inputType === 'upload'
                          ? 'bg-[#FFFFFF] text-[#0A0A0A] font-bold border-[#FFFFFF]'
                          : 'bg-[#0A0A0A] text-[#C4C7C7] border-[#262626] hover:bg-[#1A1A1A]'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload from Device</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputType('url')}
                      className={`p-3 border text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        inputType === 'url'
                          ? 'bg-[#FFFFFF] text-[#0A0A0A] font-bold border-[#FFFFFF]'
                          : 'bg-[#0A0A0A] text-[#C4C7C7] border-[#262626] hover:bg-[#1A1A1A]'
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>Paste Image / Video URL</span>
                    </button>
                  </div>
                </div>

                {/* File Upload Area */}
                {inputType === 'upload' ? (
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Choose File (Photo or Video)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="w-full text-xs text-[#FFFFFF] file:mr-3 file:py-2 file:px-3 file:border-0 file:text-xs file:font-mono file:bg-[#FFFFFF] file:text-[#0A0A0A] file:font-bold hover:file:bg-[#E5E2E1] cursor-pointer bg-[#0A0A0A] p-2 border border-[#262626]"
                    />
                    {isUploading && (
                      <div className="mt-3 p-4 bg-[#141414] border border-[#D32F2F] flex items-center justify-center gap-3">
                        <span className="w-4 h-4 border-2 border-[#D32F2F] border-t-transparent rounded-full animate-spin"></span>
                        <span className="font-mono text-xs text-[#E5E2E1] font-bold">Compressing & Uploading Media to Server...</span>
                      </div>
                    )}
                    {!isUploading && filePreview && (
                      <div className="mt-3 relative border border-[#262626] overflow-hidden bg-black max-h-48 flex items-center justify-center group">
                        {newMediaType === 'video' ? (
                          <video src={filePreview} controls className="max-h-48 object-contain" />
                        ) : (
                          <img src={filePreview} alt="Preview" className="max-h-48 object-contain" />
                        )}
                        <span className="absolute top-2 right-2 bg-[#D32F2F] text-white text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider font-bold">
                          Ready to Publish
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Image or Video URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://pbs.twimg.com/media/... or https://images.unsplash.com/..."
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none font-mono"
                    />
                    <p className="mt-1 text-[11px] text-[#757575] font-inter">
                      Tip: On Twitter/X or LinkedIn, right-click the photo and choose &ldquo;Copy Image Address&rdquo; then paste it here.
                    </p>
                  </div>
                )}

                {/* Metadata Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SEBGW 2025 Keynote Presentation"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Event / Initiative
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SouthEast Blockchain & Games Week"
                      value={newEvent}
                      onChange={(e) => setNewEvent(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Date / Period
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. February 2025"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none font-mono"
                    >
                      <option value="summits">Summits & Meetups</option>
                      <option value="drapnet">DRAPNET Initiative (Exclusive)</option>
                      <option value="creative">Creative Personas & Mascots</option>
                      <option value="speaking">Speaking & Keynotes</option>
                      <option value="campus">Campus & Workshops</option>
                      <option value="hackathons">Hackathons</option>
                    </select>
                    {newCategory === 'drapnet' && (
                      <p className="mt-1 text-[10px] font-mono text-[#D32F2F] bg-[#141414] p-1.5 border border-[#D32F2F]/40">
                        🔒 DRAPNET Isolation: Media files will be filed strictly and exclusively under DRAPNET.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Media Type
                    </label>
                    <select
                      value={newMediaType}
                      onChange={(e) => setNewMediaType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none font-mono"
                    >
                      <option value="image">Photo Proof</option>
                      <option value="video">Video Clip</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Caption & Narrative Summary
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of the event, what you demonstrated or facilitated, and audience engagement..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Impact Note (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 150+ students onboarded to Web3"
                      value={newImpactNote}
                      onChange={(e) => setNewImpactNote(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Original Post Link (X / LinkedIn)
                    </label>
                    <input
                      type="url"
                      placeholder="https://x.com/drapevangelist/status/..."
                      value={newSocialPostUrl}
                      onChange={(e) => setNewSocialPostUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#262626] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-xs font-mono uppercase tracking-wider text-[#C4C7C7] hover:text-[#FFFFFF] border border-[#262626] transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#FFFFFF]"
                  >
                    Publish to Visual Proofs
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Social Media & Image Guide */}
        {isHelpModalOpen && (
          <div
            onClick={() => setIsHelpModalOpen(false)}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#131313] border border-[#262626] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between bg-[#1A1A1A]">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#D32F2F]" />
                  <h3 className="text-lg font-oswald uppercase font-bold text-[#FFFFFF]">
                    Social Media Pictures vs. Direct Upload
                  </h3>
                </div>
                <button
                  onClick={() => setIsHelpModalOpen(false)}
                  className="p-1.5 bg-[#0A0A0A] hover:bg-[#D32F2F] text-[#FFFFFF] border border-[#262626] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs font-inter text-[#C4C7C7] leading-relaxed">
                <div className="p-3 bg-[#0A0A0A] border border-[#262626]">
                  <h4 className="font-mono text-[#D32F2F] uppercase font-bold text-[11px] mb-1">
                    Why automated social scraping is restricted:
                  </h4>
                  <p>
                    Platforms like <strong>X (Twitter)</strong> and <strong>LinkedIn</strong> strictly block third-party websites from automatically scraping user photos due to cross-origin security (CORS) and expensive enterprise API paywalls ($100+/month).
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-mono text-[#FFFFFF] uppercase font-bold text-[11px]">
                    The 2 Best, Instant Ways to Add Your Pictures:
                  </h4>

                  <div className="p-3 bg-[#0A0A0A] border border-[#262626]">
                    <span className="font-bold text-[#FFFFFF] block mb-1">1. Direct Upload (Recommended):</span>
                    <p className="text-[#8E9192]">
                      Click <strong>&ldquo;Add Proof Record&rdquo;</strong>, select <strong>&ldquo;Upload from Device&rdquo;</strong>, and pick any photo or video from your phone or computer. It will load with crystal-clear resolution and save to your portfolio.
                    </p>
                  </div>

                  <div className="p-3 bg-[#0A0A0A] border border-[#262626]">
                    <span className="font-bold text-[#FFFFFF] block mb-1">2. Copy Image Link from Your Tweet or Post:</span>
                    <p className="text-[#8E9192] mb-2">
                      When viewing any photo on your Twitter/X or LinkedIn:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-[#8E9192] font-mono text-[11px]">
                      <li>Right-click the photo (or long-press on mobile)</li>
                      <li>Click &ldquo;Copy Image Address&rdquo;</li>
                      <li>Paste it into the &ldquo;Paste Image / Video URL&rdquo; field in the Add Proof modal</li>
                      <li>Optionally add your Tweet link so visitors can click through!</li>
                    </ol>
                  </div>

                  <div className="p-3 bg-[#0A0A0A] border border-[#D32F2F]/40">
                    <span className="font-bold text-[#FFFFFF] block mb-1">3. Strict DRAPNET Media Isolation:</span>
                    <p className="text-[#8E9192]">
                      When uploading photos or videos for DRAPNET, select <strong className="text-[#D32F2F]">DRAPNET Initiative (Exclusive)</strong>. The system ensures DRAPNET media files are isolated strictly to DRAPNET and never mixed into general ambassador or speaking records.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setIsHelpModalOpen(false);
                      setIsAddModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#FFFFFF] hover:bg-[#E5E2E1] text-[#0A0A0A] font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#FFFFFF]"
                  >
                    Open Add Media Form →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

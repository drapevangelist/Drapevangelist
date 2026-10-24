import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Plus, Trash2, X, Upload, Link as LinkIcon, RotateCcw, Maximize2, Camera, Video, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { curationStore } from '../utils/curationStore';
import { isEditorEnvironment } from '../utils/envUtils';
import { uploadImageFile } from '../utils/imageUploadHelper';
import { MosaicItem } from '../types';

interface PhotoMosaicSectionProps {
  onScrollToGallery?: () => void;
}

export const PhotoMosaicSection: React.FC<PhotoMosaicSectionProps> = ({ onScrollToGallery }) => {
  const [items, setItems] = useState<MosaicItem[]>(() => curationStore.getMosaicItems());
  const [isEditorAllowed] = useState(isEditorEnvironment());
  const [isCurator, setIsCurator] = useState(() => curationStore.isCuratorMode());
  const [activeItem, setActiveItem] = useState<MosaicItem | null>(null);

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inputType, setInputType] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newKicker, setNewKicker] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newColSpan, setNewColSpan] = useState<'md:col-span-7' | 'md:col-span-5' | 'md:col-span-4' | 'md:col-span-6'>('md:col-span-4');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsub = curationStore.subscribe(() => {
      setItems(curationStore.getMosaicItems());
      setIsCurator(curationStore.isCuratorMode());
    });
    return unsub;
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundEngine.playClick();
    curationStore.deleteMosaicItem(id);
    if (activeItem?.id === id) {
      setActiveItem(null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFormError(null);

    try {
      const res = await uploadImageFile(file);
      if (res.success && res.url) {
        setFilePreview(res.url);
        setNewImageUrl(res.url);
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

    const mediaSrc = inputType === 'upload' ? filePreview : newImageUrl;
    if (!mediaSrc) {
      setFormError(inputType === 'upload' ? 'Please choose an image file from your device.' : 'Please enter an image URL.');
      return;
    }
    if (!newTitle.trim()) {
      setFormError('Please enter a photo caption or title.');
      return;
    }

    const newItem: MosaicItem = {
      id: `mosaic-custom-${Date.now()}`,
      title: newTitle.trim().toUpperCase(),
      categoryLabel: newKicker.trim().toUpperCase() || 'FIELD ARCHIVE',
      location: newLocation.trim() || 'Verified Field Operations',
      imageUrl: mediaSrc,
      colSpan: newColSpan,
      isUserUploaded: true,
    };

    curationStore.addMosaicItem(newItem);

    // Reset
    setNewTitle('');
    setNewKicker('');
    setNewLocation('');
    setNewImageUrl('');
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsAddModalOpen(false);
  };

  return (
    <section className="w-full bg-[#0A0A0A] py-20 lg:py-28 border-t border-[#262626] relative text-[#E5E2E1]">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#D32F2F] font-bold">
              <span>FIELD DOCUMENTATION</span>
              <span>//</span>
              <span>PHOTOJOURNALISTIC MOSAIC</span>
            </div>
            <h2 className="font-oswald text-4xl sm:text-6xl lg:text-7xl leading-[0.92] uppercase font-bold text-[#FFFFFF] mt-2">
              MOST WEEKS,<br />A DIFFERENT COMMUNITY
            </h2>
          </div>
          
          <div className="flex flex-col md:items-end gap-3">
            <span className="font-mono text-xs uppercase text-[#757575] tracking-widest font-bold">
              FIELD ARCHIVE // {items.length} CURATED TILES
            </span>
            
            <div className="flex flex-wrap items-center gap-2">
              {isEditorAllowed && (
                <>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setIsAddModalOpen(true);
                    }}
                    className="text-xs font-mono uppercase text-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#E5E2E1] font-bold inline-flex items-center gap-1.5 cursor-pointer px-3.5 py-1.5 border border-[#FFFFFF] transition-all"
                    title="Upload or add new photo to the field mosaic (AI Studio Backend only)"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Add Field Photo</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      curationStore.resetMosaic();
                    }}
                    className="text-xs font-mono uppercase text-[#8E9192] hover:text-[#FFFFFF] bg-[#141414] hover:bg-[#20201F] inline-flex items-center gap-1.5 cursor-pointer px-3 py-1.5 border border-[#262626] transition-all"
                    title="Restore default starter mosaic tiles"
                  >
                    <RotateCcw className="w-3 h-3 text-[#D32F2F]" />
                    <span>Reset Mosaic</span>
                  </button>
                </>
              )}

              {onScrollToGallery && (
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onScrollToGallery();
                  }}
                  className="text-xs font-mono uppercase text-[#FFFFFF] hover:text-[#D32F2F] inline-flex items-center gap-1 cursor-pointer border border-[#262626] px-3 py-1.5 bg-[#141414]"
                >
                  <span>All Proofs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D32F2F]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tip / Notification */}
        {isEditorAllowed && isCurator && (
          <div className="mb-6 p-3 bg-[#141414] border border-[#D32F2F]/40 flex items-center justify-between text-xs font-mono text-[#E5E2E1]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D32F2F] animate-pulse"></span>
              <span>Curator Mode active: Click the trash button on any photo tile to delete it so as not to crowd the site.</span>
            </div>
          </div>
        )}

        {/* Broadsheet Irregular Photo Grid (Zero radius, 1px border) */}
        {items.length === 0 ? (
          <div className="p-12 text-center border border-[#262626] bg-[#131313]">
            <Camera className="w-10 h-10 text-[#757575] mx-auto mb-3" />
            <p className="font-oswald text-xl uppercase text-[#FFFFFF]">No Mosaic Tiles Visible</p>
            <p className="text-xs text-[#8E9192] font-inter mt-1">All tiles have been removed to unclutter the space.</p>
            <button
              onClick={() => curationStore.resetMosaic()}
              className="mt-4 px-4 py-2 bg-[#FFFFFF] text-[#0A0A0A] font-mono text-xs uppercase font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Starter Tiles</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveItem(item);
                }}
                className={`${item.colSpan || 'md:col-span-4'} relative aspect-[4/3] bg-[#131313] overflow-hidden group border border-[#262626] cursor-pointer`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-95" />

                {/* Delete button (AI Studio Backend only, never shown on Vercel) */}
                {isEditorAllowed && (
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    title="Remove this photo tile (avoids crowding the site)"
                    className={`absolute top-3 right-3 p-1.5 transition-all z-20 cursor-pointer border ${
                      isCurator
                        ? 'bg-[#D32F2F] text-[#FFFFFF] border-[#FFFFFF] shadow-lg flex items-center gap-1 text-[10px] font-mono px-2'
                        : 'bg-[#0A0A0A]/90 hover:bg-[#D32F2F] text-[#FFFFFF] border-[#262626] opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {isCurator && <span className="font-bold">DELETE</span>}
                  </button>
                )}

                {/* Top Left Tag */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  {item.isUserUploaded && (
                    <span className="px-2 py-0.5 bg-[#0A0A0A]/90 text-[#FFFFFF] text-[9px] font-mono border border-[#262626]">
                      CUSTOM UPLOAD
                    </span>
                  )}
                </div>

                {/* Caption / Provenance bottom overlay */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#D32F2F] font-bold block mb-1">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-oswald text-lg sm:text-xl uppercase font-bold text-[#FFFFFF] leading-tight group-hover:text-[#FFFFFF]">
                    {item.title}
                  </h3>
                  {item.location && (
                    <p className="text-xs text-[#8E9192] font-inter mt-1 truncate">
                      {item.location}
                    </p>
                  )}
                </div>

                {/* Enlarge Icon On Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
                  <div className="w-9 h-9 bg-[#FFFFFF] text-[#0A0A0A] flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Full View Tile Lightbox */}
        {activeItem && (
          <div
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#131313] border border-[#262626] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D32F2F] font-bold block">
                    {activeItem.categoryLabel}
                  </span>
                  <h3 className="text-xl font-oswald uppercase font-bold text-[#FFFFFF]">
                    {activeItem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDelete(e, activeItem.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#D32F2F] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider border border-[#262626] transition-colors cursor-pointer"
                    title="Delete this photo tile"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Tile</span>
                  </button>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="p-1.5 bg-[#0A0A0A] hover:bg-[#D32F2F] text-[#FFFFFF] border border-[#262626] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[360px]">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full max-h-[65vh] object-contain"
                />
              </div>

              {activeItem.location && (
                <div className="p-4 border-t border-[#262626] bg-[#0A0A0A] text-xs font-mono text-[#C4C7C7]">
                  {activeItem.location}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: Add Field Photo */}
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
                    Add Photo to Mosaic
                  </h3>
                  <p className="text-xs text-[#8E9192] font-inter">
                    Upload from your device or paste an image link.
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
                {formError && (
                  <div className="p-3 bg-[#1C1B1B] border border-[#D32F2F] text-xs text-[#FFFFFF]">
                    {formError}
                  </div>
                )}

                {/* Media Source Switcher */}
                <div>
                  <label className="block text-xs font-mono text-[#757575] uppercase tracking-wider mb-2 font-bold">
                    Image Source
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInputType('upload')}
                      className={`p-2.5 border text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
                        inputType === 'upload'
                          ? 'bg-[#FFFFFF] text-[#0A0A0A] font-bold border-[#FFFFFF]'
                          : 'bg-[#0A0A0A] text-[#C4C7C7] border-[#262626]'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputType('url')}
                      className={`p-2.5 border text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
                        inputType === 'url'
                          ? 'bg-[#FFFFFF] text-[#0A0A0A] font-bold border-[#FFFFFF]'
                          : 'bg-[#0A0A0A] text-[#C4C7C7] border-[#262626]'
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>Paste Image URL</span>
                    </button>
                  </div>
                </div>

                {inputType === 'upload' ? (
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Choose Photo File
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full text-xs text-[#FFFFFF] file:mr-3 file:py-2 file:px-3 file:border-0 file:text-xs file:font-mono file:bg-[#FFFFFF] file:text-[#0A0A0A] file:font-bold hover:file:bg-[#E5E2E1] cursor-pointer bg-[#0A0A0A] p-2 border border-[#262626]"
                    />
                    {isUploading && (
                      <div className="mt-3 p-4 bg-[#141414] border border-[#D32F2F] flex items-center justify-center gap-3">
                        <span className="w-4 h-4 border-2 border-[#D32F2F] border-t-transparent rounded-full animate-spin"></span>
                        <span className="font-mono text-xs text-[#E5E2E1] font-bold">Compressing & Uploading Photo...</span>
                      </div>
                    )}
                    {!isUploading && filePreview && (
                      <div className="mt-3 relative border border-[#262626] overflow-hidden bg-black max-h-40 flex items-center justify-center group">
                        <img src={filePreview} alt="Preview" className="max-h-40 object-contain" />
                        <span className="absolute top-2 right-2 bg-[#D32F2F] text-white text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider font-bold">
                          Ready to Publish
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Direct Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] font-mono focus:border-[#D32F2F] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Title / Caption *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MOVEMENT NETWORK DEVELOPER SUMMIT"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Category Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. KEYNOTE DISPATCH"
                      value={newKicker}
                      onChange={(e) => setNewKicker(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                      Tile Column Width
                    </label>
                    <select
                      value={newColSpan}
                      onChange={(e) => setNewColSpan(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none font-mono"
                    >
                      <option value="md:col-span-4">Balanced (1/3 Width)</option>
                      <option value="md:col-span-6">Half Width (1/2 Width)</option>
                      <option value="md:col-span-7">Large Feature (7/12 Width)</option>
                      <option value="md:col-span-5">Medium Feature (5/12 Width)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8E9192] mb-1 uppercase font-bold">
                    Location & Scope Provenance
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lagos, Nigeria • Move Stack Onboarding & Cohort Review"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#262626] text-xs text-[#FFFFFF] focus:border-[#D32F2F] focus:outline-none"
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
                    Publish to Mosaic
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

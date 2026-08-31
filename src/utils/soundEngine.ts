// Audio Engine for Drapevangelist Portfolio
// Pure HTML5 Audio player with intelligent candidate detection, IndexedDB caching, and UI sound effects

const DB_NAME = 'DrapevangelistAudioDB';
const STORE_NAME = 'tracks';
const TRACK_KEY = 'original_track';

export interface TrackMeta {
  title: string;
  artist: string;
  duration: number;
  fileName?: string;
  hasAudioSource: boolean;
  resolvedSourceUrl?: string;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  
  private isPlaying = false;
  private volume = 0.75;
  private currentTime = 0;
  private duration = 211; // 3:31 default track length
  private trackMeta: TrackMeta = {
    title: 'Gonna Be Better',
    artist: 'Drapevangelist (Developer Evangelist)',
    duration: 211,
    hasAudioSource: false,
  };

  private isProbing = false;
  private hasResolvedSource = false;
  private listeners: ((playing: boolean) => void)[] = [];
  private timeListeners: ((time: number, duration: number) => void)[] = [];
  private metaListeners: ((meta: TrackMeta) => void)[] = [];
  private requestUploadListeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
      this.loadSavedTrackFromIndexedDB().then((foundInDb) => {
        if (!foundInDb) {
          this.probeAndResolveAudioSource();
        }
      });
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generate exhaustive combinations of potential track names and paths
  private getCandidateUrls(): string[] {
    const envUrl = (import.meta as unknown as { env?: { VITE_AUDIO_URL?: string } })?.env?.VITE_AUDIO_URL;
    
    const prefixes = ['/audio/', '/', '/assets/', '/assets/audio/', '/public/audio/', '/public/'];
    const names = [
      'Be better',
      'Be Better',
      'be better',
      'be-better',
      'Be-Better',
      'be_better',
      'Be_Better',
      'track',
      'Track',
      'TRACK',
      'gonna-be-better',
      'Gonna-Be-Better',
      'Gonna-be-better',
      'gonna_be_better',
      'Gonna_Be_Better',
      'Gonna Be Better',
      'gonna be better',
      'Drapevangelist - Gonna Be Better',
      'Drapevangelist - Be Better',
      'Drapevangelist-Gonna-Be-Better',
      'Drapevangelist - Gonna Be Better (Developer Evangelist)',
      'drapevangelist',
      'Drapevangelist',
      'developer-evangelist',
      'Developer-Evangelist',
      'Developer Evangelist',
      'song',
      'Song',
      'audio',
      'Audio',
      'music',
      'Music',
      'beat',
      'Joey Made This Beat',
      'joey-made-this-beat',
    ];
    const extensions = ['.mp3', '.MP3', '.wav', '.WAV', '.m4a', '.M4A', '.aac', '.ogg'];

    const generated: string[] = [];

    if (envUrl && envUrl.trim().length > 0) {
      generated.push(envUrl.trim());
    }

    // High priority explicit paths for Be better.m4a and variations
    generated.push('/audio/Be better.m4a');
    generated.push('/audio/Be%20better.m4a');
    generated.push('/audio/Be Better.m4a');
    generated.push('/audio/Be%20Better.m4a');
    generated.push('/audio/be-better.m4a');
    generated.push('/audio/Be-Better.m4a');
    generated.push('/audio/be_better.m4a');
    generated.push('/audio/Be_Better.m4a');
    generated.push('/audio/be better.m4a');
    generated.push('/audio/be%20better.m4a');
    generated.push('/Be better.m4a');
    generated.push('/Be%20better.m4a');
    generated.push('/Be Better.m4a');
    generated.push('/Be%20Better.m4a');
    generated.push('/be-better.m4a');
    generated.push('/Be-Better.m4a');
    generated.push('/be_better.m4a');
    generated.push('/be better.m4a');
    generated.push('/assets/Be better.m4a');
    generated.push('/assets/audio/Be better.m4a');

    // Also support mp3/wav versions of Be better
    generated.push('/audio/Be better.mp3');
    generated.push('/audio/Be Better.mp3');
    generated.push('/audio/be-better.mp3');
    generated.push('/Be better.mp3');
    generated.push('/Be Better.mp3');
    generated.push('/be-better.mp3');

    // Standard track/gonna-be-better aliases
    generated.push('/audio/track.m4a');
    generated.push('/audio/track.mp3');
    generated.push('/track.m4a');
    generated.push('/track.mp3');
    generated.push('/audio/gonna-be-better.m4a');
    generated.push('/audio/gonna-be-better.mp3');
    generated.push('/gonna-be-better.m4a');
    generated.push('/gonna-be-better.mp3');
    generated.push('/audio/Gonna-Be-Better.m4a');
    generated.push('/audio/Gonna-Be-Better.mp3');
    generated.push('/audio/Gonna Be Better.m4a');
    generated.push('/audio/Gonna Be Better.mp3');
    generated.push('/Gonna-Be-Better.m4a');
    generated.push('/Gonna-Be-Better.mp3');
    generated.push('/Gonna Be Better.m4a');
    generated.push('/Gonna Be Better.mp3');

    for (const prefix of prefixes) {
      for (const name of names) {
        for (const ext of extensions) {
          const raw = `${prefix}${name}${ext}`;
          const encoded = encodeURI(raw);
          if (!generated.includes(raw)) generated.push(raw);
          if (encoded !== raw && !generated.includes(encoded)) generated.push(encoded);
        }
      }
    }

    return generated;
  }

  // Probe candidates to find a valid audio URL that doesn't return 404 HTML fallback
  public async probeAndResolveAudioSource(): Promise<string | null> {
    if (this.hasResolvedSource && this.trackMeta.resolvedSourceUrl) {
      return this.trackMeta.resolvedSourceUrl;
    }
    if (this.isProbing) return null;
    this.isProbing = true;

    const candidates = this.getCandidateUrls();

    for (const candidate of candidates) {
      try {
        const res = await fetch(candidate, { method: 'HEAD', cache: 'no-cache' });
        const contentType = res.headers.get('content-type') || '';
        
        // Ensure the response is OK and is an actual audio / media stream, not HTML from SPA 404 fallback
        if (res.ok && !contentType.includes('text/html')) {
          this.applyAudioSource(candidate);
          this.isProbing = false;
          return candidate;
        }
      } catch {
        // Continue checking candidates
      }
    }

    // If HEAD is blocked by CORS/server, test with standard GET range check on top candidates
    const topCandidates = candidates.slice(0, 12);
    for (const candidate of topCandidates) {
      try {
        const res = await fetch(candidate, { 
          method: 'GET', 
          headers: { Range: 'bytes=0-10' }, 
          cache: 'no-cache' 
        });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && !contentType.includes('text/html')) {
          this.applyAudioSource(candidate);
          this.isProbing = false;
          return candidate;
        }
      } catch {
        // Continue
      }
    }

    this.isProbing = false;
    return null;
  }

  private applyAudioSource(url: string) {
    if (!this.audioElement) {
      this.initAudioElement();
    }
    if (this.audioElement) {
      this.audioElement.src = url;
      this.audioElement.load();
      this.hasResolvedSource = true;
      this.trackMeta = {
        ...this.trackMeta,
        hasAudioSource: true,
        resolvedSourceUrl: url,
      };
      this.notifyMeta();
    }
  }

  private initAudioElement() {
    if (this.audioElement) return;

    this.audioElement = new Audio();
    this.audioElement.preload = 'auto';
    this.audioElement.volume = this.volume;
    this.audioElement.loop = true;

    // Default to Be better.m4a path
    this.audioElement.src = '/audio/Be%20better.m4a';

    this.audioElement.addEventListener('timeupdate', () => {
      if (this.audioElement) {
        this.currentTime = this.audioElement.currentTime;
        if (this.audioElement.duration && !isNaN(this.audioElement.duration) && isFinite(this.audioElement.duration)) {
          this.duration = this.audioElement.duration;
        }
        this.notifyTime();
      }
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      if (this.audioElement) {
        if (this.audioElement.duration && !isNaN(this.audioElement.duration) && isFinite(this.audioElement.duration)) {
          this.duration = this.audioElement.duration;
        }
        this.trackMeta = {
          ...this.trackMeta,
          duration: this.duration,
          hasAudioSource: true,
        };
        this.notifyMeta();
      }
    });

    this.audioElement.addEventListener('canplay', () => {
      this.trackMeta = {
        ...this.trackMeta,
        hasAudioSource: true,
      };
      this.notifyMeta();
    });

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  // IndexedDB Storage to persist uploaded song in browser across refreshes
  private async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async loadSavedTrackFromIndexedDB(): Promise<boolean> {
    return new Promise((resolve) => {
      this.getDB()
        .then((db) => {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.get(TRACK_KEY);

          req.onsuccess = () => {
            const item = req.result as { blob: Blob; meta: TrackMeta } | undefined;
            if (item && item.blob) {
              const url = URL.createObjectURL(item.blob);
              if (this.audioElement) {
                this.audioElement.src = url;
                this.trackMeta = {
                  ...item.meta,
                  hasAudioSource: true,
                  resolvedSourceUrl: url,
                };
                this.hasResolvedSource = true;
                this.notifyMeta();
                resolve(true);
                return;
              }
            }
            resolve(false);
          };
          req.onerror = () => resolve(false);
        })
        .catch(() => resolve(false));
    });
  }

  public async setAudioFile(file: File | Blob, customTitle?: string, customArtist?: string) {
    const url = URL.createObjectURL(file);
    if (!this.audioElement) {
      this.initAudioElement();
    }
    if (this.audioElement) {
      this.audioElement.src = url;
      this.audioElement.load();

      const meta: TrackMeta = {
        title: customTitle || (file instanceof File ? file.name.replace(/\.[^/.]+$/, '') : 'Gonna Be Better'),
        artist: customArtist || 'Drapevangelist (Developer Evangelist)',
        duration: 211,
        fileName: file instanceof File ? file.name : 'gonna-be-better.mp3',
        hasAudioSource: true,
        resolvedSourceUrl: url,
      };

      this.trackMeta = meta;
      this.hasResolvedSource = true;
      this.notifyMeta();

      // Save to IndexedDB
      try {
        const db = await this.getDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({ blob: file, meta }, TRACK_KEY);
      } catch {
        // storage ignored
      }

      this.audioElement.play().catch(() => {});
    }
  }

  public onRequestUpload(fn: () => void) {
    this.requestUploadListeners.push(fn);
    return () => {
      this.requestUploadListeners = this.requestUploadListeners.filter(l => l !== fn);
    };
  }

  public triggerUploadRequest() {
    this.requestUploadListeners.forEach(fn => fn());
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  public subscribeTime(fn: (time: number, duration: number) => void) {
    this.timeListeners.push(fn);
    return () => {
      this.timeListeners = this.timeListeners.filter(l => l !== fn);
    };
  }

  public subscribeMeta(fn: (meta: TrackMeta) => void) {
    this.metaListeners.push(fn);
    return () => {
      this.metaListeners = this.metaListeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }

  private notifyTime() {
    this.timeListeners.forEach(fn => fn(this.currentTime, this.duration));
  }

  private notifyMeta() {
    this.metaListeners.forEach(fn => fn(this.trackMeta));
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getVolume() {
    return this.volume;
  }

  public getTrackMeta(): TrackMeta {
    return this.trackMeta;
  }

  public getCurrentTime() {
    return this.currentTime;
  }

  public getDuration() {
    return this.duration;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public seek(seconds: number) {
    if (this.audioElement && isFinite(seconds)) {
      this.audioElement.currentTime = Math.max(0, Math.min(this.duration, seconds));
      this.currentTime = this.audioElement.currentTime;
      this.notifyTime();
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      return this.play();
    }
  }

  public async play(): Promise<boolean> {
    this.initContext();

    if (!this.audioElement) {
      this.initAudioElement();
    }

    // If we haven't resolved an audio source yet, try resolving now
    if (!this.hasResolvedSource) {
      await this.probeAndResolveAudioSource();
    }

    if (this.audioElement) {
      try {
        await this.audioElement.play();
        this.isPlaying = true;
        this.notify();
        return true;
      } catch {
        // If initial play failed on current src, try next candidate
        const resolved = await this.probeAndResolveAudioSource();
        if (resolved && this.audioElement) {
          try {
            await this.audioElement.play();
            this.isPlaying = true;
            this.notify();
            return true;
          } catch {
            this.isPlaying = false;
            this.notify();
            return false;
          }
        }
        this.isPlaying = false;
        this.notify();
        return false;
      }
    }
    return false;
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.notify();
  }

  // Micro Sound Effects
  public playClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  public playSwitch() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  public playMascotFound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.001, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.25);
    });
  }
}

export const soundEngine = new SoundEngine();


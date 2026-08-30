// Audio Engine for Drapevangelist Portfolio
// Pure HTML5 Audio player with IndexedDB caching and UI sound effects

const DB_NAME = 'DrapevangelistAudioDB';
const STORE_NAME = 'tracks';
const TRACK_KEY = 'original_track';

export interface TrackMeta {
  title: string;
  artist: string;
  duration: number;
  fileName?: string;
  hasAudioSource: boolean;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  
  private isPlaying = false;
  private volume = 0.7;
  private currentTime = 0;
  private duration = 211; // 3:31 default track length
  private trackMeta: TrackMeta = {
    title: 'Gonna Be Better',
    artist: 'Drapevangelist (Developer Evangelist)',
    duration: 211,
    hasAudioSource: false,
  };

  private listeners: ((playing: boolean) => void)[] = [];
  private timeListeners: ((time: number, duration: number) => void)[] = [];
  private metaListeners: ((meta: TrackMeta) => void)[] = [];
  private requestUploadListeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
      this.loadSavedTrackFromIndexedDB();
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

  private initAudioElement() {
    if (this.audioElement) return;

    this.audioElement = new Audio();
    this.audioElement.preload = 'auto';
    this.audioElement.volume = this.volume;
    this.audioElement.loop = true;

    // Check audio track paths: env variable or static public files
    const envUrl = (import.meta as unknown as { env?: { VITE_AUDIO_URL?: string } })?.env?.VITE_AUDIO_URL;
    const candidates = [
      ...(envUrl ? [envUrl] : []),
      '/audio/track.mp3',
      '/audio/track.wav',
      '/audio/track.m4a',
      '/audio/gonna-be-better.mp3',
      '/audio/Gonna-Be-Better.mp3',
      '/audio/Gonna Be Better.mp3',
      '/audio/audio.mp3',
      '/audio/song.mp3',
      '/track.mp3',
      '/track.wav',
      '/track.m4a',
      '/gonna-be-better.mp3',
      '/Gonna-Be-Better.mp3',
      '/Gonna Be Better.mp3',
    ];
    let candidateIndex = 0;
    this.audioElement.src = candidates[0];

    this.audioElement.addEventListener('error', () => {
      if (candidateIndex < candidates.length - 1) {
        candidateIndex++;
        if (this.audioElement) {
          this.audioElement.src = candidates[candidateIndex];
          this.audioElement.load();
        }
      } else {
        // All static candidates checked
        this.isPlaying = false;
        this.notify();
      }
    });

    this.audioElement.addEventListener('timeupdate', () => {
      if (this.audioElement) {
        this.currentTime = this.audioElement.currentTime;
        if (this.audioElement.duration && !isNaN(this.audioElement.duration)) {
          this.duration = this.audioElement.duration;
        }
        this.notifyTime();
      }
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      if (this.audioElement) {
        if (this.audioElement.duration && !isNaN(this.audioElement.duration)) {
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

  private async loadSavedTrackFromIndexedDB() {
    try {
      const db = await this.getDB();
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
            };
            this.notifyMeta();
          }
        }
      };
    } catch {
      // IndexedDB fallback
    }
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
      };
      this.trackMeta = meta;
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

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public play() {
    this.initContext();

    if (this.audioElement) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch(() => {
            this.isPlaying = false;
            this.notify();
          });
      }
    }
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

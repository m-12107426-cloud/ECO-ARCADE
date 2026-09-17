/**
 * AudioEngine - Web Audio API Synthesizer & Audio Pipeline
 * Features dynamic BPM synthwave soundtrack generation with precise beat callbacks
 * and procedural sound effects for zero-dependency high performance.
 */
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.bpm = 130;
    this.isPlaying = false;
    this.isMuted = false;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;

    this.currentStep = 0;
    this.nextNoteTime = 0;
    this.tempoMultiplier = 1.0;
    this.beatCallbacks = [];

    // Synthwave scale (E Minor Pentatonic / Dorian)
    this.scale = [164.81, 196.00, 220.00, 246.94, 293.66, 329.63, 392.00, 440.00, 493.88, 587.33];

    // External audio pipeline registry
    this.loadedAudioFiles = new Map();
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.8;

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.5;

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.7;

    this.musicGain.connect(this.masterGain);
    this.sfxGain.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startMusic(bpm = 130) {
    this.ensureContext();
    if (!this.ctx) return;

    this.bpm = bpm;
    this.isPlaying = true;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    this.scheduler();
  }

  stopMusic() {
    this.isPlaying = false;
  }

  setTempoMultiplier(mult) {
    this.tempoMultiplier = Math.max(0.25, Math.min(mult, 4.0));
  }

  onBeat(callback) {
    this.beatCallbacks.push(callback);
  }

  scheduler() {
    if (!this.isPlaying) return;

    const secondsPerStep = (60 / (this.bpm * 4)) / this.tempoMultiplier;

    while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
      this.playStep(this.currentStep, this.nextNoteTime);
      this.triggerBeatCallbacks(this.currentStep, this.nextNoteTime);

      this.nextNoteTime += secondsPerStep;
      this.currentStep = (this.currentStep + 1) % 64;
    }

    setTimeout(() => this.scheduler(), 25);
  }

  triggerBeatCallbacks(step, time) {
    if (step % 4 === 0) {
      const beatNumber = Math.floor(step / 4);
      this.beatCallbacks.forEach(cb => cb(beatNumber, step, time));
    }
  }

  playStep(step, time) {
    if (!this.ctx || this.isMuted) return;

    // Bassline (Every 2 steps, Driving synth bass)
    if (step % 2 === 0) {
      const bassIndex = [0, 0, 2, 0, 3, 0, 1, 0][Math.floor(step / 8) % 8];
      const freq = this.scale[bassIndex] / 2;
      this.playSynthNote(freq, time, 0.12, 'sawtooth', 0.4, 800);
    }

    // Drums: Kick on 0, 4, 8, 12... (Four-on-the-floor)
    if (step % 4 === 0) {
      this.playKick(time);
    }

    // Snare on 4, 12 (2 and 4 in 4/4 time)
    if (step % 8 === 4) {
      this.playSnare(time);
    }

    // Hi-hats on off-beats or sixteenths
    if (step % 2 === 1) {
      this.playHiHat(time, step % 4 === 3);
    }

    // Arpeggio synth overlay
    const arpNotes = [0, 2, 4, 7, 5, 4, 2, 1, 0, 3, 5, 7, 8, 7, 5, 3];
    const noteFreq = this.scale[arpNotes[step % 16]];
    if (step % 2 === 0) {
      this.playArpNote(noteFreq * 2, time, 0.1);
    }
  }

  playSynthNote(freq, time, duration, type = 'sawtooth', volume = 0.3, filterCutoff = 1000) {
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterCutoff, time);
    filter.frequency.exponentialRampToValueAtTime(100, time + duration);

    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  playArpNote(freq, time, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  playKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.1);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 0.12);
  }

  playSnare(time) {
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    whiteNoise.start(time);
    whiteNoise.stop(time + 0.15);
  }

  playHiHat(time, open = false) {
    const dur = open ? 0.08 : 0.03;
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    noise.start(time);
    noise.stop(time + dur);
  }

  // SFX triggers
  playSFX(type) {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;

    switch (type) {
      case 'jump': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.12);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }
      case 'orb': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.18);
        break;
      }
      case 'portal': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(1200, now + 0.2);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.22);
        break;
      }
      case 'shield': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.28);
        break;
      }
      case 'death': {
        const dur = 0.35;
        const bufferSize = this.ctx.sampleRate * dur;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + dur);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + dur);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);
        noise.start(now);
        noise.stop(now + dur);
        break;
      }
      case 'win': {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.4, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.3);
        });
        break;
      }
    }
  }

  // Pipeline method for external file loading
  async loadExternalAudio(key, url) {
    this.ensureContext();
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      this.loadedAudioFiles.set(key, audioBuffer);
      return true;
    } catch (e) {
      console.warn(`Failed to load audio key ${key} from ${url}:`, e);
      return false;
    }
  }

  playExternalAudio(key, volume = 1.0) {
    if (!this.loadedAudioFiles.has(key) || !this.ctx) return;
    const buffer = this.loadedAudioFiles.get(key);
    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    source.buffer = buffer;
    gain.gain.value = volume;
    source.connect(gain);
    gain.connect(this.sfxGain);
    source.start(0);
  }
}

export const globalAudio = new AudioEngine();

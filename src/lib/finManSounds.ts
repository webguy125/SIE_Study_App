/**
 * Retro Pac-Man-style effects synthesized with the Web Audio API (no asset files).
 */
class FinManSounds {
  private ctx: AudioContext | null = null;
  private wakaHigh = true;
  private sirenOsc: OscillatorNode | null = null;
  private sirenGain: GainNode | null = null;
  private sirenLfo: OscillatorNode | null = null;

  unlock(): void {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  private ensure(): AudioContext | null {
    if (!this.ctx) return null;
    return this.ctx;
  }

  private tone(
    frequency: number,
    duration: number,
    options?: {
      type?: OscillatorType;
      gain?: number;
      endFreq?: number;
      delay?: number;
    },
  ): void {
    const ctx = this.ensure();
    if (!ctx) return;

    const start = ctx.currentTime + (options?.delay ?? 0);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const vol = options?.gain ?? 0.1;

    osc.type = options?.type ?? 'square';
    osc.frequency.setValueAtTime(frequency, start);
    if (options?.endFreq !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(options.endFreq, 40),
        start + duration,
      );
    }

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(vol, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  }

  /** Classic alternating "waka" when eating a pellet. */
  playWaka(): void {
    const freq = this.wakaHigh ? 440 : 330;
    this.wakaHigh = !this.wakaHigh;
    this.tone(freq, 0.07, { type: 'square', gain: 0.09 });
  }

  /** Power pellet / energizer burst. */
  playPowerPellet(): void {
    this.tone(180, 0.18, { type: 'square', gain: 0.11, endFreq: 520 });
    this.tone(520, 0.12, { type: 'triangle', gain: 0.07, delay: 0.04 });
    this.startFrightenedSiren();
  }

  /** Ghost eaten while vulnerable. */
  playEatGhost(): void {
    this.tone(600, 0.06, { type: 'square', gain: 0.1 });
    this.tone(900, 0.08, { type: 'square', gain: 0.1, delay: 0.06 });
    this.tone(1200, 0.1, { type: 'square', gain: 0.09, delay: 0.12 });
  }

  /** Player caught — death jingle. */
  playDeath(): void {
    this.stopFrightenedSiren();
    this.tone(400, 0.15, { type: 'square', gain: 0.1, endFreq: 120 });
    this.tone(200, 0.35, { type: 'sawtooth', gain: 0.08, delay: 0.14, endFreq: 60 });
  }

  /** Correct checkpoint / SEC audit answer. */
  playCorrect(): void {
    this.tone(523, 0.08, { type: 'square', gain: 0.08 });
    this.tone(659, 0.1, { type: 'square', gain: 0.08, delay: 0.08 });
    this.tone(784, 0.14, { type: 'square', gain: 0.07, delay: 0.16 });
  }

  /** Wrong answer buzz. */
  playWrong(): void {
    this.tone(180, 0.22, { type: 'sawtooth', gain: 0.09 });
    this.tone(140, 0.18, { type: 'square', gain: 0.07, delay: 0.1 });
  }

  /** New round / game start blip. */
  playGameStart(): void {
    this.tone(392, 0.07, { type: 'square', gain: 0.07 });
    this.tone(523, 0.07, { type: 'square', gain: 0.07, delay: 0.07 });
    this.tone(659, 0.12, { type: 'square', gain: 0.07, delay: 0.14 });
  }

  /** Question checkpoint gateway chime. */
  playCheckpoint(): void {
    this.tone(880, 0.06, { type: 'triangle', gain: 0.07 });
    this.tone(1100, 0.1, { type: 'triangle', gain: 0.06, delay: 0.06 });
  }

  /** Low ghost siren while power pellet is active (classic arcade feel). */
  startFrightenedSiren(): void {
    const ctx = this.ensure();
    if (!ctx || this.sirenOsc) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.value = 200;
    gain.gain.value = 0.035;

    lfo.type = 'sine';
    lfo.frequency.value = 4;
    lfoGain.gain.value = 60;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.connect(gain);
    gain.connect(ctx.destination);
    lfo.start();
    osc.start();

    this.sirenOsc = osc;
    this.sirenGain = gain;
    this.sirenLfo = lfo;
  }

  stopFrightenedSiren(): void {
    const ctx = this.ctx;
    if (!ctx || !this.sirenOsc) return;

    const stopAt = ctx.currentTime + 0.05;
    this.sirenGain?.gain.exponentialRampToValueAtTime(0.0001, stopAt);
    this.sirenOsc.stop(stopAt + 0.05);
    this.sirenLfo?.stop(stopAt + 0.05);

    this.sirenOsc = null;
    this.sirenGain = null;
    this.sirenLfo = null;
  }
}

let instance: FinManSounds | null = null;

export function getFinManSounds(): FinManSounds {
  if (!instance) instance = new FinManSounds();
  return instance;
}
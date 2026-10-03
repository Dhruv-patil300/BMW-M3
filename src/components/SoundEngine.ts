// Web Audio API engine sound, throttle revving, launch control & exhaust acoustic synthesis for BMW M S58
class BMWSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private idleOsc1: OscillatorNode | null = null;
  private idleOsc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private engineGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isRunning: boolean = false;
  private revOsc: OscillatorNode | null = null;
  private revGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(160, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      this.engineGain.connect(this.filter);
      this.filter.connect(this.masterGain);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startEngine();
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.3);
      }
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
      }
    }

    return !this.isMuted;
  }

  public unmuteIfSilent(): void {
    if (this.isMuted) {
      this.toggleSound();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private startEngine() {
    if (this.isRunning || !this.ctx || !this.engineGain) return;

    try {
      this.idleOsc1 = this.ctx.createOscillator();
      this.idleOsc1.type = "sawtooth";
      this.idleOsc1.frequency.setValueAtTime(46, this.ctx.currentTime);

      this.idleOsc2 = this.ctx.createOscillator();
      this.idleOsc2.type = "triangle";
      this.idleOsc2.frequency.setValueAtTime(92, this.ctx.currentTime);

      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = "sine";
      this.subOsc.frequency.setValueAtTime(23, this.ctx.currentTime);

      this.idleOsc1.connect(this.engineGain);
      this.idleOsc2.connect(this.engineGain);
      this.subOsc.connect(this.engineGain);

      this.idleOsc1.start();
      this.idleOsc2.start();
      this.subOsc.start();
      this.isRunning = true;
    } catch {
      // Audio policy safe
    }
  }

  // Update throttle from scroll or rev pedal (rpm: 800 to 7200)
  public updateRPM(rpm: number) {
    if (!this.ctx || this.isMuted) return;
    this.startEngine();

    const normalized = Math.max(0, Math.min(1, (rpm - 800) / (7200 - 800)));
    const now = this.ctx.currentTime;

    const baseFreq = 46 + normalized * 180;
    const harmonicFreq = 92 + normalized * 360;
    const filterFreq = 160 + normalized * 1400;

    if (this.idleOsc1) {
      this.idleOsc1.frequency.setTargetAtTime(baseFreq, now, 0.05);
    }
    if (this.idleOsc2) {
      this.idleOsc2.frequency.setTargetAtTime(harmonicFreq, now, 0.05);
    }
    if (this.filter) {
      this.filter.frequency.setTargetAtTime(filterFreq, now, 0.05);
    }
  }

  public updateThrottle(velocity: number) {
    const rpm = 800 + Math.min(velocity, 1) * 4500;
    this.updateRPM(rpm);
  }

  // Synthesize twin-turbo boost pressure whistle
  public playTurboSpool(duration = 1.5) {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    try {
      const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * duration, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(2000, this.ctx.currentTime);
      bandpass.frequency.exponentialRampToValueAtTime(5500, this.ctx.currentTime + duration);
      bandpass.Q.setValueAtTime(8, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + duration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      whiteNoise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + duration);
    } catch {
      // safe
    }
  }

  // Synthesize S58 exhaust crackles and overrun pops
  public playExhaustCrackle() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const numPops = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < numPops; i++) {
      setTimeout(() => {
        if (!this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(140 + Math.random() * 80, this.ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.08);

          gain.gain.setValueAtTime(0.08 + Math.random() * 0.05, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.09);
        } catch {}
      }, i * (50 + Math.random() * 60));
    }
  }

  // Play cold start starter motor ignition sequence
  public playColdStart(onComplete?: () => void) {
    this.initContext();
    this.unmuteIfSilent();
    if (!this.ctx) return;

    try {
      // Starter crank pulses
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(60, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.08);
        }, i * 160);
      }

      // Ignition flare at 0.75s
      setTimeout(() => {
        this.updateRPM(2400); // rev flare
        this.playTurboSpool(0.8);
        setTimeout(() => {
          this.playExhaustCrackle();
          this.updateRPM(1200); // settle to cold high idle
          if (onComplete) onComplete();
        }, 800);
      }, 750);
    } catch {}
  }

  // Synthesize futuristic high-intensity BMW Laserlight ignition hum
  public playLaserlightHum() {
    this.initContext();
    this.unmuteIfSilent();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1440, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch {}
  }

  public playClick() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }
}

export const soundEngine = new BMWSoundEngine();

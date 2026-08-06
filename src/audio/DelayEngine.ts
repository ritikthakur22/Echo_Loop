export type AudioStats = { level: number; latencyMs: number };

export class DelayEngine {
  private context?: AudioContext;
  private stream?: MediaStream;
  private source?: MediaStreamAudioSourceNode;
  private processor?: AudioWorkletNode;
  private onStats?: (stats: AudioStats) => void;

  async start(settings: { delay: number; volume: number; muted: boolean }, onStats: (stats: AudioStats) => void) {
    if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext || !window.AudioWorkletNode) {
      throw new Error('This browser does not support the audio features EchoLoop needs.');
    }
    this.onStats = onStats;
    // Keep the delayed ambient signal, while asking the platform to remove the
    // device speaker from the microphone input. Without this, each replay is
    // captured again and becomes an uncontrolled echo chain.
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false, channelCount: 1 },
      video: false,
    });
    this.context = new AudioContext({ latencyHint: 'interactive' });
    const moduleUrl = URL.createObjectURL(new Blob([delayWorkletSource], { type: 'application/javascript' }));
    try {
      await this.context.audioWorklet.addModule(moduleUrl);
    } finally {
      URL.revokeObjectURL(moduleUrl);
    }
    this.source = this.context.createMediaStreamSource(this.stream);
    this.processor = new AudioWorkletNode(this.context, 'echoloop-delay', { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [1] });
    this.processor.port.onmessage = ({ data }: MessageEvent<{ level: number }>) => {
      const base = (this.context?.baseLatency ?? 0) * 1000 + (this.context?.outputLatency ?? 0) * 1000;
      this.onStats?.({ level: data.level, latencyMs: Math.round(base + settings.delay) });
    };
    this.source.connect(this.processor).connect(this.context.destination);
    this.setDelay(settings.delay); this.setVolume(settings.volume); this.setMuted(settings.muted);
    // Some browsers create a suspended context even after a permission prompt.
    // Explicitly resume while still inside the user-initiated Start interaction.
    if (this.context.state === 'suspended') await this.context.resume();
  }

  setDelay(value: number) { this.processor?.port.postMessage({ type: 'delay', value }); }
  setVolume(value: number) { this.processor?.port.postMessage({ type: 'gain', value }); }
  setMuted(value: boolean) { this.processor?.port.postMessage({ type: 'mute', value }); }
  async stop() {
    this.processor?.disconnect(); this.source?.disconnect(); this.stream?.getTracks().forEach((track) => track.stop());
    await this.context?.close(); this.context = undefined; this.processor = undefined; this.source = undefined; this.stream = undefined;
  }
}
import { delayWorkletSource } from './worklet-source';

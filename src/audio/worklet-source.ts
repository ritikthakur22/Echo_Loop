// Kept as JavaScript text because AudioWorklet executes in its own global scope.
// A Blob URL works in Android WebView as well as standard browsers.
export const delayWorkletSource = `
class DelayProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = new Float32Array(Math.ceil(sampleRate * 3.2));
    this.writeIndex = 0;
    this.delaySamples = Math.round(sampleRate * 1);
    this.gain = 1;
    this.muted = false;
    this.port.onmessage = ({ data }) => {
      if (data.type === 'delay') this.delaySamples = Math.round(Math.min(3000, Math.max(50, Number(data.value))) * sampleRate / 1000);
      if (data.type === 'gain') this.gain = Math.min(1, Math.max(0, Number(data.value)));
      if (data.type === 'mute') this.muted = Boolean(data.value);
    };
  }
  process(inputs, outputs) {
    const input = inputs[0] && inputs[0][0];
    const output = outputs[0] && outputs[0][0];
    if (!output) return true;
    let sum = 0;
    for (let i = 0; i < output.length; i += 1) {
      const source = input ? input[i] : 0;
      this.buffer[this.writeIndex] = source;
      const readIndex = (this.writeIndex - this.delaySamples + this.buffer.length) % this.buffer.length;
      output[i] = this.muted ? 0 : this.buffer[readIndex] * this.gain;
      this.writeIndex = (this.writeIndex + 1) % this.buffer.length;
      sum += source * source;
    }
    this.port.postMessage({ level: Math.sqrt(sum / output.length) });
    return true;
  }
}
registerProcessor('echoloop-delay', DelayProcessor);
`;

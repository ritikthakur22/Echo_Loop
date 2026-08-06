export type Compatibility = { supported: boolean; message: string };
export const getCompatibility = (): Compatibility => {
  if (!window.isSecureContext && location.hostname !== 'localhost') return { supported: false, message: 'Microphone access requires a secure HTTPS connection.' };
  if (!navigator.mediaDevices?.getUserMedia) return { supported: false, message: 'Microphone capture is unavailable in this browser.' };
  if (!window.AudioContext || !window.AudioWorkletNode) return { supported: false, message: 'AudioWorklet is unavailable. Try a recent Chrome, Edge, Firefox, or Safari.' };
  return { supported: true, message: 'Your browser supports local delayed feedback.' };
};

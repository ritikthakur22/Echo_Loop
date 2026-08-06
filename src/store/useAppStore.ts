import { create } from 'zustand';

export type Preset = 'Conversation' | 'Speech Practice' | 'Classroom' | 'Experiment';
const presets: Record<Preset, { delay: number; volume: number }> = {
  Conversation: { delay: 500, volume: 0.72 }, 'Speech Practice': { delay: 750, volume: 0.8 }, Classroom: { delay: 400, volume: 0.62 }, Experiment: { delay: 1200, volume: 0.8 },
};
type AppState = { delay: number; volume: number; muted: boolean; theme: 'light' | 'dark'; preset: Preset; setDelay: (v: number) => void; setVolume: (v: number) => void; toggleMute: () => void; toggleTheme: () => void; applyPreset: (v: Preset) => void; };
export const useAppStore = create<AppState>((set) => ({
  delay: 1000, volume: 0.8, muted: false, theme: 'light', preset: 'Experiment',
  setDelay: (delay) => set({ delay, preset: 'Experiment' }), setVolume: (volume) => set({ volume }), toggleMute: () => set((s) => ({ muted: !s.muted })), toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
  applyPreset: (preset) => set({ preset, ...presets[preset] }),
}));

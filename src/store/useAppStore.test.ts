import { beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from './useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset to initial state before each test
    useAppStore.setState({
      delay: 1000,
      volume: 0.8,
      muted: false,
      theme: 'light',
      preset: 'Experiment',
    });
  });

  it('has correct default initial state', () => {
    const state = useAppStore.getState();
    expect(state.delay).toBe(1000);
    expect(state.volume).toBe(0.8);
    expect(state.muted).toBe(false);
    expect(state.theme).toBe('light');
    expect(state.preset).toBe('Experiment');
  });

  it('updates delay and sets preset to Experiment', () => {
    useAppStore.getState().setDelay(350);
    const state = useAppStore.getState();
    expect(state.delay).toBe(350);
    expect(state.preset).toBe('Experiment');
  });

  it('updates volume correctly', () => {
    useAppStore.getState().setVolume(0.5);
    expect(useAppStore.getState().volume).toBe(0.5);
  });

  it('toggles mute status', () => {
    expect(useAppStore.getState().muted).toBe(false);
    useAppStore.getState().toggleMute();
    expect(useAppStore.getState().muted).toBe(true);
    useAppStore.getState().toggleMute();
    expect(useAppStore.getState().muted).toBe(false);
  });

  it('toggles theme between light and dark', () => {
    expect(useAppStore.getState().theme).toBe('light');
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('dark');
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('applies Conversation preset correctly', () => {
    useAppStore.getState().applyPreset('Conversation');
    const state = useAppStore.getState();
    expect(state.preset).toBe('Conversation');
    expect(state.delay).toBe(500);
    expect(state.volume).toBe(0.72);
  });

  it('applies Speech Practice preset correctly', () => {
    useAppStore.getState().applyPreset('Speech Practice');
    const state = useAppStore.getState();
    expect(state.preset).toBe('Speech Practice');
    expect(state.delay).toBe(750);
    expect(state.volume).toBe(0.8);
  });

  it('applies Classroom preset correctly', () => {
    useAppStore.getState().applyPreset('Classroom');
    const state = useAppStore.getState();
    expect(state.preset).toBe('Classroom');
    expect(state.delay).toBe(400);
    expect(state.volume).toBe(0.62);
  });
});

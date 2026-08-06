import { Mic, MicOff, Play, Square, Volume2, VolumeX } from 'lucide-react';
import type { Preset } from '../store/useAppStore';
import { formatDelay } from '../utils/format';

type Props = { active: boolean; delay: number; volume: number; muted: boolean; preset: Preset; disabled: boolean; onStart: () => void; onStop: () => void; onDelay: (v: number) => void; onVolume: (v: number) => void; onMute: () => void; onPreset: (v: Preset) => void; };
export function Controls({ active, delay, volume, muted, preset, disabled, onStart, onStop, onDelay, onVolume, onMute, onPreset }: Props) {
  return <section className="control-card" aria-label="Delayed feedback controls">
    <div className="start-row"><div><p className="eyebrow">Audio session</p><h2>{active ? 'Listening locally' : 'Ready when you are'}</h2></div><button className={`primary-button ${active ? 'stop' : ''}`} onClick={active ? onStop : onStart} disabled={disabled} aria-label={active ? 'Stop feedback' : 'Start feedback'}>{active ? <><Square size={18} /> Stop</> : <><Play size={18} fill="currentColor" /> Start</>}</button></div>
    <label className="slider-label" htmlFor="delay">Delay <output>{formatDelay(delay)}</output></label>
    <input id="delay" type="range" min="50" max="3000" step="10" value={delay} onChange={(e) => onDelay(Number(e.target.value))} />
    <div className="range-labels"><span>50 ms</span><span>3 s</span></div>
    <div className="two-controls"><div><label className="slider-label" htmlFor="volume">Playback level <output>{Math.round(volume * 100)}%</output></label><input id="volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => onVolume(Number(e.target.value))} /></div><button className="icon-button" onClick={onMute} aria-pressed={muted} aria-label={muted ? 'Unmute playback' : 'Mute playback'}>{muted ? <VolumeX /> : <Volume2 />}</button></div>
    <fieldset><legend>Preset</legend><div className="preset-grid">{(['Conversation', 'Speech Practice', 'Classroom', 'Experiment'] as Preset[]).map((name) => <button key={name} className={preset === name ? 'selected' : ''} onClick={() => onPreset(name)}>{name}</button>)}</div></fieldset>
    <p className="privacy-inline">{active ? <Mic size={16} /> : <MicOff size={16} />} Audio stays on this device. Nothing is recorded or uploaded.</p>
  </section>;
}

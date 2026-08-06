import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Volume2 } from 'lucide-react';
import { DelayEngine } from '../audio/DelayEngine';
import { AudioMonitor } from '../components/AudioMonitor';
import { Controls } from '../components/Controls';
import { useAppStore } from '../store/useAppStore';
import { getCompatibility } from '../utils/compatibility';

export function Home() {
 const engine = useRef<DelayEngine | undefined>(undefined); const [active, setActive] = useState(false); const [level, setLevel] = useState(0); const [latency, setLatency] = useState(0); const [error, setError] = useState<string>();
 const { delay, volume, muted, preset, setDelay, setVolume, toggleMute, applyPreset } = useAppStore(); const compatibility = getCompatibility();
 const stop = useCallback(() => { void engine.current?.stop(); engine.current = undefined; setActive(false); setLevel(0); }, []);
 const start = useCallback(async () => { try { setError(undefined); engine.current = new DelayEngine(); await engine.current.start({ delay, volume, muted }, ({ level: nextLevel, latencyMs }) => { setLevel(nextLevel); setLatency(latencyMs); }); setActive(true); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to start microphone audio.'); await engine.current?.stop(); } }, [delay, volume, muted]);
 useEffect(() => { if (active) engine.current?.setDelay(delay); }, [delay, active]); useEffect(() => { if (active) engine.current?.setVolume(volume); }, [volume, active]); useEffect(() => { if (active) engine.current?.setMuted(muted); }, [muted, active]);
 useEffect(() => () => { void engine.current?.stop(); }, []);
 useEffect(() => { const onKey = (event: KeyboardEvent) => { if ((event.target as HTMLElement).matches('input, button')) return; if (event.code === 'Space') { event.preventDefault(); if (active) stop(); else void start(); } if (event.key.toLowerCase() === 'm') toggleMute(); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [active, start, stop, toggleMute]);
 return <main className="home"><section className="hero"><p className="eyebrow">Local ambient echo</p><h1>Repeat the world,<br /><em>with a delay.</em></h1><p className="lede">Capture nearby sound and play it back through your speaker after a delay. Everything happens on this device.</p><div className="headphone-note"><Volume2 size={18} /> Speaker echo mode is on — start with a lower volume in public</div></section>
 {!compatibility.supported && <div className="warning"><AlertTriangle size={19} /> {compatibility.message}</div>}{error && <div className="warning"><AlertTriangle size={19} /> {error}</div>}
 <div className="workspace"><Controls active={active} delay={delay} volume={volume} muted={muted} preset={preset} disabled={!compatibility.supported} onStart={() => void start()} onStop={stop} onDelay={setDelay} onVolume={setVolume} onMute={toggleMute} onPreset={applyPreset} /><AudioMonitor active={active} level={level} latency={latency} /></div>
 <section className="privacy-banner"><strong>Designed for privacy.</strong><span>Your audio is processed in real time on this device. EchoLoop never stores or uploads it.</span></section><p className="shortcut-hint">Shortcut: <kbd>Space</kbd> start/stop · <kbd>M</kbd> mute</p>
 </main>;
}

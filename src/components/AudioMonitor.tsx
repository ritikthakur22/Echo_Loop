type Props = { level: number; latency: number; active: boolean };
export function AudioMonitor({ level, latency, active }: Props) {
  const bars = Array.from({ length: 20 }, (_, i) => i);
  return <section className="monitor-card" aria-label="Live audio monitor">
    <div className="monitor-heading"><div><p className="eyebrow">Live monitor</p><h2>{active ? 'Signal flowing' : 'Waiting for microphone'}</h2></div><span className={`status-dot ${active ? 'on' : ''}`}>{active ? 'Live' : 'Idle'}</span></div>
    <div className="waveform" aria-label={`Audio level ${Math.round(level * 100)} percent`}>{bars.map((bar) => { const distance = Math.abs(bar - 9.5) / 9.5; const height = Math.max(8, (1 - distance) * Math.min(100, 12 + level * 320)); return <i key={bar} style={{ height: `${height}%`, opacity: active ? 0.45 + level : 0.18 }} />; })}</div>
    <div className="monitor-stats"><div><span>Input level</span><strong>{Math.round(level * 100)}%</strong></div><div><span>Estimated latency</span><strong>{active ? `${latency} ms` : '—'}</strong></div></div>
  </section>;
}

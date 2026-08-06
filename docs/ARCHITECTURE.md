# Architecture

`DelayEngine` is the audio-platform boundary. It obtains a `MediaStream`, connects it to an `AudioWorkletNode`, and releases all browser resources on stop. The worklet has a fixed-size circular buffer sized slightly above the 3000 ms maximum delay. Incoming samples are written at the current index and output samples are read `delaySamples` behind it.

React never sees raw audio frames. It receives only RMS level and latency estimates through an explicit callback. Zustand holds temporary user controls. This separation keeps the UI independent from real-time code and maps naturally to a future Android engine: replace `MediaStream` / `AudioWorklet` with `AudioRecord` / a ring buffer / `AudioTrack` while retaining the settings and statistics contract.

Routes are dynamically imported. Vite tree-shakes packages and splits framework/state chunks. The service worker caches same-origin assets after initial use.

# API documentation

EchoLoop has no network API.

## `DelayEngine`

- `start({ delay, volume, muted }, onStats)`: requests microphone access and begins local processing.
- `setDelay(milliseconds)`: updates the active worklet delay in the supported 50–3000 ms range.
- `setVolume(0..1)`: updates playback gain.
- `setMuted(boolean)`: toggles zero-output playback while continuing input processing.
- `stop()`: disconnects audio nodes, stops stream tracks, and closes the audio context.

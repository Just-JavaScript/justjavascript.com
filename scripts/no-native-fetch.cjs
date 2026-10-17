// Next 11 loads its image wasm with fetch() when fetch exists. Node 24 has native fetch, which can't read local paths,
// so drop it and let Next fall back to its own polyfill. Node 24 no longer accepts --no-experimental-fetch.
delete globalThis.fetch

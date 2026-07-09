// Tiny cartoon sound engine — all sounds synthesized, no assets.
// Muted by default; user opts in via the sound toggle.

let ctx = null
let muted = true

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function setMuted(m) {
  muted = m
  if (!m) ac() // unlock audio on user gesture
}
export function isMuted() {
  return muted
}

function blip({ type = 'sine', from = 400, to = 800, dur = 0.12, gain = 0.15, delay = 0 }) {
  if (muted) return
  const c = ac()
  const t = c.currentTime + delay
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(from, t)
  o.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t + dur)
  g.gain.setValueAtTime(gain, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  o.connect(g).connect(c.destination)
  o.start(t)
  o.stop(t + dur + 0.02)
}

export const sfx = {
  pop: () => blip({ type: 'sine', from: 320, to: 900, dur: 0.09, gain: 0.2 }),
  boing: () => blip({ type: 'triangle', from: 160, to: 520, dur: 0.28, gain: 0.18 }),
  fizz: () => {
    for (let i = 0; i < 6; i++)
      blip({ type: 'sine', from: 900 + Math.random() * 800, to: 1800, dur: 0.05, gain: 0.05, delay: i * 0.04 })
  },
  buzz: () => blip({ type: 'sawtooth', from: 140, to: 70, dur: 0.35, gain: 0.12 }),
  squeak: () => blip({ type: 'square', from: 1200, to: 1900, dur: 0.08, gain: 0.06 }),
  unlock: () => {
    blip({ type: 'triangle', from: 400, to: 800, dur: 0.12, gain: 0.15 })
    blip({ type: 'triangle', from: 600, to: 1200, dur: 0.14, gain: 0.15, delay: 0.12 })
  },
  fanfare: () => {
    ;[440, 554, 659, 880].forEach((f, i) =>
      blip({ type: 'triangle', from: f, to: f * 1.02, dur: 0.22, gain: 0.14, delay: i * 0.13 })
    )
  },
}

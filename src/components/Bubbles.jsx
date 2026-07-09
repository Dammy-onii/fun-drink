import { useMemo } from 'react'

// Ambient rising soda bubbles. Pure CSS animation, cheap.
export default function Bubbles({ count = 14, color = 'rgba(77,227,255,0.25)' }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 26,
        dur: 7 + Math.random() * 9,
        delay: Math.random() * -16,
      })),
    [count]
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="absolute rounded-full border-2"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background: color,
            borderColor: 'rgba(255,255,255,0.15)',
            animation: `rise ${b.dur}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

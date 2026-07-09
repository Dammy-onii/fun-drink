import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { sfx } from '../sound'

// Glorp — the escaped living potion. Eyes follow the pointer. Squishes when poked.
export default function Glorp({ size = 160, mood = 'happy', className = '' }) {
  const ref = useRef(null)
  const [eye, setEye] = useState({ x: 0, y: 0 })
  const [squish, setSquish] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const p = 'touches' in e ? e.touches[0] : e
      if (!p) return
      const dx = p.clientX - cx
      const dy = p.clientY - cy
      const d = Math.max(Math.hypot(dx, dy), 1)
      const m = Math.min(d / 40, 1) * 5
      setEye({ x: (dx / d) * m, y: (dy / d) * m })
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [])

  const poke = () => {
    sfx.boing()
    setSquish(true)
    setTimeout(() => setSquish(false), 350)
  }

  const mouth =
    mood === 'panic'
      ? 'M 38 66 Q 50 58 62 66 Q 50 80 38 66 Z'
      : mood === 'smug'
        ? 'M 40 66 Q 50 74 64 64'
        : 'M 38 64 Q 50 78 62 64'

  return (
    <motion.div
      ref={ref}
      onPointerDown={poke}
      animate={squish ? { scaleX: 1.25, scaleY: 0.75 } : { scaleX: 1, scaleY: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 8 }}
      className={`cursor-pointer select-none ${className}`}
      style={{ width: size, height: size }}
      title="poke me. everyone does."
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_6px_0_rgba(13,6,32,0.6)]">
        {/* blob body */}
        <path
          d="M50 6 C74 6 92 26 90 52 C88 78 74 94 50 94 C26 94 12 78 10 52 C8 26 26 6 50 6 Z"
          fill="#b6ff2e"
          stroke="#0d0620"
          strokeWidth="5"
        />
        {/* drip on head */}
        <path
          d="M44 4 Q50 -6 56 4 Q53 10 50 10 Q47 10 44 4 Z"
          fill="#b6ff2e"
          stroke="#0d0620"
          strokeWidth="4"
        />
        {/* inner glow */}
        <ellipse cx="38" cy="30" rx="12" ry="8" fill="#e2ff9e" opacity="0.8" transform="rotate(-20 38 30)" />
        {/* bubbles inside */}
        <circle cx="66" cy="72" r="5" fill="#e2ff9e" opacity="0.7" />
        <circle cx="56" cy="82" r="3" fill="#e2ff9e" opacity="0.7" />
        {/* eyes */}
        <g>
          <circle cx="38" cy="46" r="11" fill="#fff" stroke="#0d0620" strokeWidth="4" />
          <circle cx="64" cy="46" r="11" fill="#fff" stroke="#0d0620" strokeWidth="4" />
          <circle cx={38 + eye.x} cy={46 + eye.y} r="4.5" fill="#0d0620" />
          <circle cx={64 + eye.x} cy={46 + eye.y} r="4.5" fill="#0d0620" />
        </g>
        {/* brows for mood */}
        {mood === 'panic' && (
          <g stroke="#0d0620" strokeWidth="4" strokeLinecap="round">
            <path d="M28 32 L 46 38" />
            <path d="M74 32 L 56 38" />
          </g>
        )}
        {mood === 'smug' && (
          <g stroke="#0d0620" strokeWidth="4" strokeLinecap="round">
            <path d="M28 36 L 46 34" />
            <path d="M74 36 L 56 34" />
          </g>
        )}
        {/* mouth */}
        <path d={mouth} fill={mood === 'panic' ? '#0d0620' : 'none'} stroke="#0d0620" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

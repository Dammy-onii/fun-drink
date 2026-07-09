import { useState } from 'react'
import { motion } from 'framer-motion'
import { setMuted, sfx } from '../sound'

export default function SoundToggle() {
  const [on, setOn] = useState(false)
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={() => {
        const next = !on
        setOn(next)
        setMuted(!next)
        if (next) sfx.fizz()
      }}
      className={`toon-sm wobbly-2 font-display fixed top-4 right-4 z-50 cursor-pointer px-4 py-2 text-sm ${
        on ? 'bg-acid text-ink' : 'bg-ink-2 text-cream'
      }`}
      title={on ? 'sound: ON' : 'sound: OFF (coward mode)'}
    >
      {on ? '🔊 fizz ON' : '🔇 fizz OFF'}
    </motion.button>
  )
}

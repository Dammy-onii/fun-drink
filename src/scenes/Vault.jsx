import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sfx } from '../sound'

const SYMBOLS = [
  { id: 'bubble', glyph: '🫧', name: 'the fizz' },
  { id: 'skull', glyph: '💀', name: 'the dramatic' },
  { id: 'bolt', glyph: '⚡', name: 'the sting' },
  { id: 'heart', glyph: '💜', name: 'the mush' },
  { id: 'moon', glyph: '🌙', name: 'the floaty' },
  { id: 'star', glyph: '⭐', name: 'the shiny' },
]

const CODE = ['bubble', 'bolt', 'moon']

export default function Vault({ onSolved }) {
  const [entry, setEntry] = useState([])
  const [shake, setShake] = useState(false)
  const [solved, setSolved] = useState(false)

  const press = (id) => {
    if (solved) return
    sfx.pop()
    const next = [...entry, id]
    if (next.length < 3) return setEntry(next)
    // check
    if (next.every((v, i) => v === CODE[i])) {
      setEntry(next)
      setSolved(true)
      sfx.unlock()
      setTimeout(() => onSolved?.(), 2200)
    } else {
      sfx.buzz()
      setShake(true)
      setEntry([])
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <p className="font-doodle max-w-xl text-center text-xl leading-snug text-cream/90">
        Glorp slipped into the old founder's vault and <span className="text-bubble">locked the door
        behind it</span>. Rude. The founder left a note though — he never trusted his own memory:
      </p>

      <motion.div
        initial={{ rotate: -2 }}
        whileHover={{ rotate: 1 }}
        className="toon-sm wobbly mt-6 max-w-sm bg-cream px-6 py-4 text-ink"
      >
        <p className="font-display text-lg text-grape">FOUNDER'S NOTE (coffee-stained)</p>
        <p className="font-doodle mt-1 text-lg leading-snug">
          "The code is the soul of soda itself, in order: what <b>fizzes</b>, what <b>stings</b>,
          and what <b>floats</b>. If you forgot, you deserve the alarm."
        </p>
      </motion.div>

      {/* code display */}
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="toon wobbly-2 mt-10 flex gap-3 bg-ink-2 px-8 py-5"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex h-14 w-14 items-center justify-center rounded-xl border-3 border-[#0d0620] bg-ink text-3xl"
          >
            {entry[i] ? SYMBOLS.find((s) => s.id === entry[i])?.glyph : '·'}
          </div>
        ))}
      </motion.div>

      {/* dial */}
      <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-5">
        {SYMBOLS.map((s) => (
          <motion.button
            key={s.id}
            whileHover={{ scale: 1.15, rotate: 6 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => press(s.id)}
            className="toon-sm wobbly cursor-pointer bg-grape/30 px-5 py-4 text-center hover:bg-grape/60"
          >
            <span className="block text-3xl">{s.glyph}</span>
            <span className="font-doodle block text-xs text-cream/70">{s.name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {shake && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-doodle mt-6 text-lg text-bubble"
          >
            HONK. Wrong. The vault is judging you. From inside, a tiny gulp of laughter.
          </motion.p>
        )}
        {solved && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-8 text-center"
          >
            <p className="font-display text-2xl text-acid">KA-CHUNK. The vault swings open…</p>
            <p className="font-doodle mt-2 max-w-md text-lg text-cream/80">
              …and Glorp rockets past your face, leaving a trail of fizz and one (1) apologetic
              burp. It's headed for the bottling line. GO. But, like, by scrolling.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

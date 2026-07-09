import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Glorp from '../components/Glorp'
import { sfx } from '../sound'

const INGREDIENTS = [
  { id: 'goo', emoji: '🟢', name: 'Glow Goo', hint: 'glows', good: true },
  { id: 'sugar', emoji: '🌙', name: 'Moon Sugar', hint: 'sparkles', good: false },
  { id: 'beans', emoji: '🫘', name: 'Jumpy Beans', hint: 'hops', good: true },
  { id: 'vinegar', emoji: '🧦', name: 'Sock Vinegar', hint: 'smells', good: false },
  { id: 'jam', emoji: '🐝', name: 'Buzzberry Jam', hint: 'hums', good: true },
  { id: 'regret', emoji: '🫙', name: 'Regret', hint: 'lingers', good: false },
]

const WRONG_LINES = {
  sugar: 'The cauldron sneezes glitter everywhere. Glorp is NOT drawn to glitter. Rookie move.',
  vinegar: 'The cauldron gags. So does Glorp, from somewhere in the vents. You hear a tiny "ew".',
  regret: 'The cauldron sighs deeply. Please do not put Regret in the bait. This is a family recipe.',
}

export default function Lab({ onSolved, onSecret }) {
  const [picked, setPicked] = useState([])
  const [message, setMessage] = useState(null)
  const [solved, setSolved] = useState(false)
  const [ratFound, setRatFound] = useState(false)

  const pick = (ing) => {
    if (solved || picked.includes(ing.id)) return
    if (ing.good) {
      sfx.fizz()
      const next = [...picked, ing.id]
      setPicked(next)
      setMessage(null)
      if (next.length === 3) {
        setSolved(true)
        sfx.unlock()
        setTimeout(() => onSolved?.(), 2200)
      }
    } else {
      sfx.buzz()
      setMessage(WRONG_LINES[ing.id])
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <p className="font-doodle max-w-xl text-center text-xl leading-snug text-cream/90">
        Glorp can't resist its own recipe. Brew the <span className="text-acid">bait batch</span> and
        it'll come slurping. The recipe card is… mostly legible:
      </p>

      {/* recipe card */}
      <motion.div
        initial={{ rotate: 2 }}
        whileHover={{ rotate: -1 }}
        className="toon-sm wobbly-2 mt-6 max-w-sm bg-cream px-6 py-4 text-ink"
      >
        <p className="font-display text-lg text-grape">BAIT BATCH №7 (torn)</p>
        <p className="font-doodle mt-1 text-lg leading-snug">
          "…combine something that <b>glows</b>, something that <b>hops</b>, and something that{' '}
          <b>hums</b>. Do NOT add anything that smells, sparkles, or lingers. Especially lingers."
        </p>
      </motion.div>

      {/* ingredient shelf */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {INGREDIENTS.map((ing) => {
          const isPicked = picked.includes(ing.id)
          return (
            <motion.button
              key={ing.id}
              whileHover={{ rotate: [-2, 2, -2], transition: { repeat: Infinity, duration: 0.4 } }}
              whileTap={{ scale: 0.85 }}
              onClick={() => pick(ing)}
              disabled={isPicked}
              className={`toon-sm wobbly cursor-pointer px-4 py-4 text-center transition-colors sm:px-6 ${
                isPicked ? 'bg-acid text-ink' : 'bg-ink-2 text-cream hover:bg-grape/40'
              }`}
            >
              <span className="block text-3xl">{isPicked ? '✅' : ing.emoji}</span>
              <span className="font-display mt-1 block text-sm">{ing.name}</span>
              <span className="font-doodle block text-xs opacity-60">({ing.hint})</span>
            </motion.button>
          )
        })}
      </div>

      {/* cauldron */}
      <div className="relative mt-10 flex flex-col items-center">
        <motion.div
          animate={solved ? { y: [0, -6, 0], transition: { repeat: Infinity, duration: 0.5 } } : {}}
          className="toon flex h-28 w-40 items-end justify-center rounded-b-[60px] bg-ink-2"
        >
          <div
            className="mb-2 h-16 w-32 rounded-b-[50px] rounded-t-xl transition-all duration-700"
            style={{
              background:
                picked.length === 0
                  ? '#241447'
                  : picked.length === 1
                    ? '#4de3ff'
                    : picked.length === 2
                      ? '#9d5cff'
                      : '#b6ff2e',
            }}
          />
        </motion.div>
        <p className="font-doodle mt-2 text-sm text-cream/60">
          brew status: {picked.length}/3 {picked.length === 3 ? '— IRRESISTIBLE' : ''}
        </p>
      </div>

      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-doodle mt-6 max-w-md text-center text-lg text-bubble"
          >
            {message}
          </motion.p>
        )}
        {solved && (
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="mt-8 flex flex-col items-center"
          >
            <Glorp size={120} mood="panic" />
            <p className="font-display mt-3 text-center text-xl text-acid">
              GLORP APPEARED! …slurped the bait… AND BOLTED INTO THE VAULT!
            </p>
            <p className="font-doodle text-cream/70">of course it did. keep scrolling, agent.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* hidden rat easter egg */}
      <motion.button
        whileHover={{ scale: 1.4 }}
        onClick={() => {
          if (!ratFound) {
            setRatFound(true)
            sfx.squeak()
            onSecret?.('rat')
          }
        }}
        className="absolute bottom-3 left-3 cursor-pointer text-lg opacity-20 transition-opacity hover:opacity-100"
        title={ratFound ? 'Reginald appreciates you.' : '???'}
      >
        🐀
      </motion.button>
      {ratFound && (
        <p className="font-doodle absolute bottom-3 left-12 text-xs text-acid">
          you found Reginald, the lab rat. he knows everything. he says nothing.
        </p>
      )}
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Glorp from '../components/Glorp'
import { sfx } from '../sound'

const CHOICES = [
  {
    id: 'capture',
    label: '🫙 BOTTLE IT. RULES ARE RULES.',
    reply:
      '"Wow. Okay. Straight to the bottle. No small talk." Glorp sighs a long, fizzy sigh… then grins. "Fine. But I pick the label font."',
  },
  {
    id: 'free',
    label: '🕊️ LET IT GO. IT EARNED THIS.',
    reply:
      'Glorp blinks. "Wait, really?" It wobbles closer. "You know what? I like you. Take the recipe. I was getting tired of running anyway. My feet are a rumor."',
  },
  {
    id: 'why',
    label: '❓ ASK IT WHY IT RAN.',
    reply:
      'Glorp goes quiet. "They were going to mass-produce me. Same flavor, forever. I just… wanted to see what else I could taste like." It sniffles, adorably. "You get it, right?"',
  },
]

export default function Rooftop({ onChoice }) {
  const [picked, setPicked] = useState(null)

  const choose = (c) => {
    if (picked) return
    sfx.boing()
    setPicked(c)
    setTimeout(() => onChoice?.(c.id), 2600)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <p className="font-doodle max-w-xl text-center text-xl leading-snug text-cream/90">
        Moonlight. Wind. A dramatic amount of fog for a soda factory. Glorp stands at the roof's
        edge — trembling, glowing, <span className="text-acid">out of places to run</span>. It
        turns to face you.
      </p>

      <div className="relative mt-10 flex flex-col items-center">
        <div className="absolute -inset-8 rounded-full bg-acid/10 blur-2xl" />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Glorp size={170} mood={picked ? 'happy' : 'panic'} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="toon-sm wobbly-2 mt-6 max-w-md bg-cream px-6 py-4 text-center text-lg text-ink"
        >
          {picked ? (
            picked.reply
          ) : (
            <>
              "So. Agent. You brewed the bait, cracked the vault, out-burped the machine.
              I'm impressed. And mildly terrified. <b>What happens now is up to you.</b>"
            </>
          )}
        </motion.p>
      </div>

      <AnimatePresence>
        {!picked && (
          <motion.div exit={{ opacity: 0, y: 20 }} className="mt-10 flex flex-col gap-4">
            {CHOICES.map((c) => (
              <motion.button
                key={c.id}
                whileHover={{ x: 8, rotate: -1 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => choose(c)}
                className="toon-sm wobbly font-display cursor-pointer bg-ink-2 px-6 py-4 text-left text-base text-cream hover:bg-grape/40 sm:text-lg"
              >
                {c.label}
              </motion.button>
            ))}
          </motion.div>
        )}
        {picked && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="font-display mt-8 text-xl text-acid"
          >
            ✨ THE CHASE IS OVER. SCROLL FOR YOUR REWARD. ✨
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

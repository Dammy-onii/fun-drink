import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Glorp from '../components/Glorp'
import Bubbles from '../components/Bubbles'
import WobblyButton from '../components/WobblyButton'
import { sfx } from '../sound'

const FLAVORS = {
  capture: {
    name: 'LAWFUL FIZZ',
    desc: 'Tastes like justice, lime, and mild guilt. Glorp designed the label. It chose Comic Sans. You allowed it.',
    color: '#4de3ff',
  },
  free: {
    name: 'FREE-RANGE GLORP',
    desc: 'Notes of wild berry, open skies, and one soda who chose its own destiny. Recipe donated voluntarily. Legally binding burp included.',
    color: '#b6ff2e',
  },
  why: {
    name: 'EXISTENTIAL CITRUS',
    desc: 'Tastes different every single time. Nobody knows how. Glorp says "that\'s the point" and refuses to elaborate.',
    color: '#ff6fb5',
  },
}

export default function Finale({ choice, secrets }) {
  const flavor = FLAVORS[choice] || FLAVORS.free

  const agentNo = useMemo(() => String(Math.floor(1000 + Math.random() * 9000)), [])

  const share = () => {
    sfx.fanfare()
    const text = `I chased a sentient soda through a secret factory and unlocked "${flavor.name}" 🧪🫧 Certified Flavor Recovery Agent #${agentNo} at GLORP & CO. Can you catch Flavor №7?`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    )
  }

  const missed = 2 - secrets.length

  return (
    <div className="relative flex w-full flex-col items-center">
      <Bubbles count={20} color="rgba(182,255,46,0.18)" />

      <p className="font-doodle max-w-xl text-center text-xl leading-snug text-cream/90">
        Chapter closed, agent. The board of directors is furious, Glorp is delighted, and{' '}
        <span className="text-acid">you now hold the secret recipe</span>. As promised. We're
        shady, not liars.
      </p>

      {/* certificate */}
      <motion.div
        initial={{ scale: 0.7, rotate: 3, opacity: 0 }}
        whileInView={{ scale: 1, rotate: -1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="toon wobbly relative z-10 mt-8 max-w-md bg-cream px-6 py-8 text-center text-ink sm:px-10"
      >
        <p className="font-display text-sm tracking-[0.3em] text-ink/50">GLORP &amp; CO. · EST. 1962</p>
        <p className="font-display mt-2 text-2xl text-grape">CERTIFICATE OF RECOVERY</p>
        <div className="my-4 flex justify-center">
          <Glorp size={110} mood="happy" />
        </div>
        <p className="font-doodle text-lg">This certifies that</p>
        <p className="font-display text-xl text-bubble">AGENT #{agentNo}</p>
        <p className="font-doodle mt-1 text-lg">successfully recovered Flavor №7 and unlocked</p>
        <p
          className="font-display mt-2 text-3xl drop-shadow-[3px_3px_0_#0d0620]"
          style={{ color: flavor.color, WebkitTextStroke: '1px #0d0620' }}
        >
          {flavor.name}
        </p>
        <p className="font-doodle mt-3 text-base leading-snug text-ink/80">{flavor.desc}</p>
        <p className="font-doodle mt-4 rotate-[-2deg] text-sm text-ink/50">
          signed: 🖋️ Glorp (it insisted)
        </p>
      </motion.div>

      <div className="z-10 mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <WobblyButton onClick={share} color="bg-bubble">
          🐦 BRAG ON X
        </WobblyButton>
        <WobblyButton onClick={() => window.location.reload()} color="bg-fizz">
          ↻ RUN IT BACK
        </WobblyButton>
      </div>

      {/* replay bait */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="font-doodle z-10 mt-8 max-w-sm text-center text-base text-cream/60"
      >
        {missed > 0 ? (
          <>
            P.S. — you missed <span className="text-acid">{missed} hidden secret{missed > 1 ? 's' : ''}</span> back
            there. The rat knows. The logo knows. That's all the hints you get.
          </>
        ) : (
          <>
            P.S. — you found ALL the secrets. Reginald the rat salutes you. The board of directors
            wants to know how.
          </>
        )}
      </motion.p>

      <p className="font-doodle z-10 mt-12 text-sm text-cream/40">
        brewed with suspicious care by <span className="text-bubble">SilentGeek</span> · GLORP &amp; CO. is
        not a real company. Glorp, however, is very real to us.
      </p>
    </div>
  )
}

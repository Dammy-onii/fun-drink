import { useState } from 'react'
import { motion } from 'framer-motion'
import Glorp from '../components/Glorp'
import Bubbles from '../components/Bubbles'
import WobblyButton from '../components/WobblyButton'
import { sfx } from '../sound'

const TITLE = 'GLORP & CO.'

export default function Hero({ onStart, onSecret }) {
  const [logoClicks, setLogoClicks] = useState(0)
  const [secretFound, setSecretFound] = useState(false)

  const clickLogo = () => {
    const n = logoClicks + 1
    setLogoClicks(n)
    sfx.squeak()
    if (n === 7 && !secretFound) {
      setSecretFound(true)
      sfx.fanfare()
      onSecret?.('seven-clicks')
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <Bubbles count={18} />

      {/* warning tape */}
      <div className="absolute top-0 left-0 z-10 w-full overflow-hidden border-y-4 border-[#0d0620] bg-acid py-1.5">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="font-display px-2 text-xs tracking-widest text-ink sm:text-sm">
              ⚠ CONTAINMENT BREACH — FLAVOR №7 AT LARGE — DO NOT LICK ANYTHING SUSPICIOUS — ⚠ CONTAINMENT BREACH — FLAVOR №7 AT LARGE — DO NOT LICK ANYTHING SUSPICIOUS —&nbsp;
            </span>
          ))}
        </div>
      </div>

      <motion.p
        onClick={clickLogo}
        whileTap={{ scale: 0.95 }}
        className="font-doodle mb-2 cursor-pointer text-lg text-fizz select-none"
        title="est. 1962. click responsibly."
      >
        est. 1962 · secret soda works {secretFound && '· 🐀 you found the 7-click secret!'}
      </motion.p>

      <h1 className="font-display flex flex-wrap justify-center text-6xl text-bubble drop-shadow-[6px_6px_0_#0d0620] sm:text-7xl md:text-8xl">
        {TITLE.split('').map((ch, i) => (
          <motion.span
            key={i}
            whileHover={{ y: -14, rotate: (i % 2 ? 1 : -1) * 8, color: '#b6ff2e' }}
            onHoverStart={() => sfx.pop()}
            className="inline-block cursor-default"
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        ))}
      </h1>

      {/* wanted poster */}
      <motion.div
        initial={{ rotate: -3, y: 30, opacity: 0 }}
        animate={{ rotate: -3, y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="toon wobbly mt-10 flex max-w-md flex-col items-center bg-cream px-6 py-8 text-center text-ink sm:px-10"
      >
        <p className="font-display text-3xl tracking-wider text-ink">WANTED</p>
        <p className="font-doodle text-sm text-ink/60">(alive. it can't really be otherwise. it's soda.)</p>
        <div className="animate-floaty my-4">
          <Glorp size={150} mood="smug" />
        </div>
        <p className="font-display text-xl text-grape">FLAVOR №7 — “GLORP”</p>
        <p className="font-doodle mt-2 text-lg leading-snug">
          Last seen: escaping the tasting room. Distinguishing features: is a liquid, has opinions.
          Crimes: sentience without a permit, tasting <em>too</em> good.
        </p>
        <p className="font-doodle mt-3 text-base font-bold text-bubble">
          REWARD: the secret recipe. Yes, THE one.
        </p>
      </motion.div>

      <div className="mt-10">
        <WobblyButton onClick={onStart}>ACCEPT THE MISSION →</WobblyButton>
      </div>
      <p className="font-doodle mt-4 max-w-xs text-center text-sm text-cream/50">
        by scrolling you agree to become a certified Flavor Recovery Agent. no take-backs.
      </p>
    </section>
  )
}

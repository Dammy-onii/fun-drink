import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WobblyButton from '../components/WobblyButton'
import { sfx } from '../sound'

const PADS = [
  { id: 0, color: 'bg-acid', glow: '#b6ff2e', label: 'BLORP' },
  { id: 1, color: 'bg-bubble', glow: '#ff6fb5', label: 'FWEEP' },
  { id: 2, color: 'bg-fizz', glow: '#4de3ff', label: 'DINK' },
  { id: 3, color: 'bg-grape', glow: '#9d5cff', label: 'WUB' },
]

export default function BottlingLine({ onSolved }) {
  const [seq, setSeq] = useState([])
  const [userIdx, setUserIdx] = useState(0)
  const [lit, setLit] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | showing | input | solved
  const [round, setRound] = useState(0)
  const timeouts = useRef([])

  const clear = () => timeouts.current.forEach(clearTimeout)

  const flash = (padId, delay) => {
    timeouts.current.push(
      setTimeout(() => {
        setLit(padId)
        sfx.pop()
        timeouts.current.push(setTimeout(() => setLit(null), 320))
      }, delay)
    )
  }

  const playSeq = (s) => {
    setPhase('showing')
    s.forEach((p, i) => flash(p, 600 + i * 550))
    timeouts.current.push(
      setTimeout(() => {
        setPhase('input')
        setUserIdx(0)
      }, 600 + s.length * 550 + 200)
    )
  }

  const start = () => {
    clear()
    const s = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4))
    setSeq(s)
    setRound(1)
    playSeq(s)
  }

  const hit = (padId) => {
    if (phase !== 'input') return
    setLit(padId)
    setTimeout(() => setLit(null), 220)
    if (padId === seq[userIdx]) {
      sfx.pop()
      const next = userIdx + 1
      if (next === seq.length) {
        setPhase('solved')
        sfx.fanfare()
        setTimeout(() => onSolved?.(), 2200)
      } else {
        setUserIdx(next)
      }
    } else {
      sfx.buzz()
      setPhase('idle')
      setRound(0)
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <p className="font-doodle max-w-xl text-center text-xl leading-snug text-cream/90">
        Glorp is hiding inside the bottling machine, and the machine is now{' '}
        <span className="text-fizz">burping in code</span>. Repeat the burp sequence to flush it out.
        Yes, this is a real security system. Budget was tight in 1962.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
        {PADS.map((p) => (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.85 }}
            onClick={() => hit(p.id)}
            animate={lit === p.id ? { scale: 1.12 } : { scale: 1 }}
            className={`toon wobbly cursor-pointer px-10 py-8 sm:px-14 sm:py-10 ${p.color} transition-shadow`}
            style={lit === p.id ? { boxShadow: `0 0 40px 8px ${p.glow}, 6px 6px 0 #0d0620` } : {}}
          >
            <span className="font-display text-lg text-ink sm:text-xl">{p.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        {phase === 'idle' && (
          <>
            <WobblyButton onClick={start} color="bg-fizz">
              {round === 0 && seq.length > 0 ? 'WRONG BURP. RETRY?' : 'LISTEN TO THE MACHINE'}
            </WobblyButton>
            {round === 0 && seq.length > 0 && (
              <p className="font-doodle text-bubble">
                The machine made a disappointed noise. New sequence incoming.
              </p>
            )}
          </>
        )}
        {phase === 'showing' && (
          <p className="font-display animate-wiggle text-xl text-acid">👂 MEMORIZE THE BURPS…</p>
        )}
        {phase === 'input' && (
          <p className="font-display text-xl text-fizz">
            YOUR TURN — {userIdx}/{seq.length}
          </p>
        )}
      </div>

      <AnimatePresence>
        {phase === 'solved' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-8 text-center">
            <p className="font-display text-2xl text-acid">PSSSHHHT! The machine ejects Glorp…</p>
            <p className="font-doodle mt-2 max-w-md text-lg text-cream/80">
              …in a majestic arc, straight up the fire escape. It's cornered on the rooftop now.
              Nowhere left to drip. Scroll up there, agent.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

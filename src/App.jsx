import { useState, useCallback } from 'react'
import Hero from './scenes/Hero'
import Lab from './scenes/Lab'
import Vault from './scenes/Vault'
import BottlingLine from './scenes/BottlingLine'
import Rooftop from './scenes/Rooftop'
import Finale from './scenes/Finale'
import SceneShell from './components/SceneShell'
import ProgressHUD from './components/ProgressHUD'
import SoundToggle from './components/SoundToggle'

export default function App() {
  // chapter = highest unlocked chapter (0..5)
  const [chapter, setChapter] = useState(0)
  const [choice, setChoice] = useState(null)
  const [secrets, setSecrets] = useState([])

  const unlock = useCallback(
    (n, scrollTo) => {
      setChapter((c) => Math.max(c, n))
      if (scrollTo) {
        setTimeout(() => {
          document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    },
    []
  )

  const foundSecret = useCallback((id) => {
    setSecrets((s) => (s.includes(id) ? s : [...s, id]))
  }, [])

  return (
    <div className="grain">
      <SoundToggle />
      <ProgressHUD chapter={chapter} />

      <Hero onStart={() => unlock(1, 'lab')} onSecret={foundSecret} />

      <SceneShell id="lab" locked={chapter < 1} chapterNo={1} title="CHAPTER 1 — THE LAB" bg="bg-ink-2">
        <Lab
          onSolved={() => unlock(2)}
          onSecret={foundSecret}
        />
      </SceneShell>

      <SceneShell id="vault" locked={chapter < 2} chapterNo={2} title="CHAPTER 2 — THE VAULT" bg="bg-ink">
        <Vault onSolved={() => unlock(3)} />
      </SceneShell>

      <SceneShell
        id="bottling"
        locked={chapter < 3}
        chapterNo={3}
        title="CHAPTER 3 — THE BOTTLING LINE"
        bg="bg-ink-2"
      >
        <BottlingLine onSolved={() => unlock(4)} />
      </SceneShell>

      <SceneShell id="rooftop" locked={chapter < 4} chapterNo={4} title="CHAPTER 4 — THE ROOFTOP" bg="bg-ink">
        <Rooftop
          onChoice={(c) => {
            setChoice(c)
            unlock(5)
          }}
        />
      </SceneShell>

      <SceneShell
        id="finale"
        locked={chapter < 5}
        chapterNo={5}
        title="CASE CLOSED"
        bg="bg-ink-2"
      >
        <Finale choice={choice} secrets={secrets} />
      </SceneShell>
    </div>
  )
}

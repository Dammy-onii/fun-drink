import { motion } from 'framer-motion'

// Wraps each chapter. Locked chapters show a sealed cover — no peeking.
export default function SceneShell({ id, locked, chapterNo, title, children, bg = 'bg-ink' }) {
  return (
    <section id={id} className={`relative min-h-screen overflow-hidden ${bg}`}>
      {locked ? (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <motion.div
            initial={{ rotate: -6 }}
            animate={{ rotate: [-6, -3, -6] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="toon wobbly bg-ink-2 px-10 py-12"
          >
            <div className="font-display text-5xl">🔒</div>
            <p className="font-display mt-4 text-2xl text-bubble md:text-3xl">CHAPTER {chapterNo}: SEALED</p>
            <p className="font-doodle mt-3 max-w-sm text-lg text-cream/70">
              Nice try, agent. Solve the previous chapter first. Glorp respects the rules of storytelling.
            </p>
          </motion.div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-20 sm:px-6"
          >
            {title && (
              <h2 className="font-display mb-2 text-center text-3xl text-acid drop-shadow-[4px_4px_0_#0d0620] sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {children}
          </motion.div>
        </>
      )}
    </section>
  )
}

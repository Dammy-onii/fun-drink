import { motion } from 'framer-motion'

const LABELS = ['Briefing', 'The Lab', 'The Vault', 'Bottling', 'Rooftop', 'Case Closed']

// Case-file stamps showing chase progress.
export default function ProgressHUD({ chapter }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="toon-sm wobbly flex items-center gap-1.5 bg-ink-2 px-3 py-2 sm:gap-2 sm:px-4">
        {LABELS.map((label, i) => (
          <motion.div
            key={label}
            animate={i === chapter ? { scale: [1, 1.25, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className={`h-3.5 w-3.5 rounded-full border-2 border-[#0d0620] sm:h-4 sm:w-4 ${
              i < chapter ? 'bg-acid' : i === chapter ? 'bg-bubble' : 'bg-ink'
            }`}
            title={label}
          />
        ))}
        <span className="font-doodle ml-1 hidden text-xs text-cream/70 sm:inline">{LABELS[chapter]}</span>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { sfx } from '../sound'

export default function WobblyButton({ children, onClick, color = 'bg-acid', className = '', ...rest }) {
  return (
    <motion.button
      whileHover={{ rotate: [-1.5, 1.5, -1.5], transition: { repeat: Infinity, duration: 0.35 } }}
      whileTap={{ scale: 0.9, rotate: 0 }}
      onClick={(e) => {
        sfx.pop()
        onClick?.(e)
      }}
      className={`toon wobbly font-display cursor-pointer px-8 py-4 text-lg text-ink md:text-xl ${color} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

import { motion } from 'framer-motion'

// Wraps every page: soft cross-fade + the <main> landmark used by the skip link.
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.main
      id="main"
      tabIndex={-1}
      className={`outline-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {children}
    </motion.main>
  )
}

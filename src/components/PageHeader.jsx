import { motion } from 'framer-motion'

export default function PageHeader({ title, intro }) {
  return (
    <header className="mx-auto max-w-3xl px-6 pb-16 pt-32 text-center sm:pt-40">
      <motion.h1
        className="text-[clamp(2.4rem,7vw,4.25rem)] font-medium leading-[1.1] text-ivory"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h1>
      <motion.span
        aria-hidden="true"
        className="mx-auto mt-7 block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />
      <motion.p
        className="mx-auto mt-7 max-w-xl font-display text-lg italic leading-relaxed text-ivory/70 sm:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {intro}
      </motion.p>
    </header>
  )
}

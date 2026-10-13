import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Sparkles, BookOpen } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import FloatingParticles from '../components/FloatingParticles'
import FloatingHearts from '../components/FloatingHearts'
import AnimatedKisses from '../components/AnimatedKisses'
import RevealText from '../components/RevealText'
import HeartConfetti from '../components/HeartConfetti'
import { config } from '../data/config'

const HEART_PATH =
  'M12 21.2s-8.2-5-10.1-10.4C.5 6.9 3 3.6 6.4 3.6c2.2 0 3.8 1.2 5.6 3.3 1.8-2.1 3.4-3.3 5.6-3.3 3.4 0 5.9 3.3 4.5 7.2C20.2 16.2 12 21.2 12 21.2z'

export default function ForeverPage() {
  const [burst, setBurst] = useState(0)
  const { forever } = config

  return (
    <PageTransition className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28 text-center">
      {/* night sky */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{ background: 'linear-gradient(180deg, rgba(255,105,180,0.5) 0%, #190D15 45%, rgba(255,20,147,0.6) 100%)' }}
      />
      <FloatingParticles variant="stars" count={140} className="-z-10" />
      <FloatingParticles variant="dust" count={22} className="-z-10" />
      <FloatingHearts count={10} className="-z-5" />
      <AnimatedKisses count={5} className="-z-4" />

      {/* glowing heart */}
      <div className="relative mb-12 h-40 w-40 sm:h-52 sm:w-52">
        <span
          aria-hidden="true"
          className="animate-glow-pulse absolute -inset-16 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(255,105,180,0.6), rgba(255,20,147,0.4) 60%, transparent)' }}
        />
        <div className="animate-heartbeat relative h-full w-full" style={{ animationDelay: '3s' }}>
          <svg viewBox="0 0 24 24" role="img" aria-label="A softly glowing heart" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="forever-heart" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FF69B4" />
                <stop offset="0.55" stopColor="#FF1493" />
                <stop offset="1" stopColor="#FF007F" />
              </linearGradient>
            </defs>
            <motion.path
              d={HEART_PATH}
              stroke="url(#forever-heart)"
              strokeWidth="0.45"
              strokeLinejoin="round"
              fill="url(#forever-heart)"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 0.22 }}
              transition={{
                pathLength: { duration: 2.4, ease: 'easeInOut' },
                fillOpacity: { delay: 2, duration: 1.6 },
              }}
            />
          </svg>
        </div>
      </div>

      <RevealText
        text={forever.message}
        delay={2.2}
        stagger={0.12}
        className="max-w-3xl text-balance text-[clamp(2rem,7.5vw,4.5rem)] font-medium italic leading-[1.12] text-ivory"
      />

      <motion.p
        className="mt-8 max-w-xl text-pretty font-display text-lg italic leading-relaxed text-ivory/75 sm:text-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 4.6 }}
      >
        {forever.subMessage}
      </motion.p>

      <motion.div
        className="mt-12 flex w-full max-w-md flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 5.4 }}
      >
        <button type="button" onClick={() => setBurst((b) => b + 1)} className="btn-primary">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          {forever.surpriseButton}
        </button>
        <Link to="/story" className="btn-quiet">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          {forever.replayButton}
        </Link>
        <Link to="/home" className="btn-quiet">
          <Home className="h-4 w-4" aria-hidden="true" />
          {forever.homeButton}
        </Link>
      </motion.div>

      <HeartConfetti burst={burst} />
    </PageTransition>
  )
}

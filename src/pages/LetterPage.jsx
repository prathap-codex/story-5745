import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Mail, RotateCcw } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import FloatingParticles from '../components/FloatingParticles'
import FloatingHearts from '../components/FloatingHearts'
import AnimatedKisses from '../components/AnimatedKisses'
import Envelope from '../components/Envelope'
import ChapterLink from '../components/ChapterLink'
import { letter } from '../data/letter'

const OPEN_DURATION_MS = 2800 // envelope animation length before the letter view appears
const STEP = 1.5 // seconds between paragraphs

export default function LetterPage() {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState('sealed') // 'sealed' | 'opening' | 'reading'
  const [runKey, setRunKey] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const [done, setDone] = useState(false)
  const timer = useRef(0)

  const instant = skipped || reduce
  const parts = letter.paragraphs.length + 2 // paragraphs + closing + signature
  const totalMs = (0.6 + parts * STEP + 1.2) * 1000

  useEffect(() => () => clearTimeout(timer.current), [])

  // Track when the reveal has finished so we can hide the "Show the whole letter" button.
  useEffect(() => {
    if (stage !== 'reading') return
    if (instant) {
      setDone(true)
      return
    }
    setDone(false)
    const t = window.setTimeout(() => setDone(true), totalMs)
    return () => clearTimeout(t)
  }, [stage, runKey, instant, totalMs])

  const openEnvelope = () => {
    if (stage !== 'sealed') return
    if (reduce) {
      setStage('reading')
      return
    }
    setStage('opening')
    timer.current = window.setTimeout(() => setStage('reading'), OPEN_DURATION_MS)
  }

  const closeEnvelope = () => {
    clearTimeout(timer.current)
    setSkipped(false)
    setStage('sealed')
    window.scrollTo({ top: 0 })
  }

  const replay = () => {
    setSkipped(false)
    setRunKey((k) => k + 1)
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  const reveal = (i) => ({
    initial: instant ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay: instant ? 0 : 0.6 + i * STEP, ease: 'easeOut' },
  })

  return (
    <PageTransition className="relative isolate min-h-[100svh] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{ background: 'radial-gradient(90% 70% at 50% 30%, rgba(255,105,180,0.7) 0%, rgba(255,20,147,0.6) 40%, rgba(255,0,127,0.5) 100%)' }}
      />
      <FloatingParticles variant="dust" count={30} className="-z-10" />
      <FloatingHearts count={6} className="-z-5" />
      <AnimatedKisses count={3} className="-z-4" />

      <AnimatePresence mode="wait">
        {stage !== 'reading' ? (
          <motion.section
            key="envelope"
            className="flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-balance text-[clamp(2rem,7vw,3.5rem)] font-medium leading-tight text-ivory">
              A Few Words From My Heart
            </h1>
            <div className="mb-14 mt-20 w-full sm:mt-24">
              <Envelope opened={stage === 'opening'} />
            </div>
            <button type="button" onClick={openEnvelope} disabled={stage === 'opening'} className="btn-primary">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {stage === 'opening' ? 'Opening…' : 'Open My Letter'}
            </button>
          </motion.section>
        ) : (
          <motion.section
            key="letter"
            className="px-5 pb-8 pt-28 sm:px-8 sm:pt-32"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="mb-8 text-center font-display text-xl italic text-rose sm:text-2xl">
              A Few Words From My Heart
            </h1>

            <article className="paper mx-auto w-full max-w-2xl rounded-[3px] px-7 py-12 text-[#2a1420] sm:px-14 sm:py-16">
              <div key={`${runKey}-${instant}`}>
                <motion.p className="font-display text-2xl italic text-wine" {...reveal(0)}>
                  {letter.salutation}
                </motion.p>
                <div className="mt-8 space-y-6">
                  {letter.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      className="font-display text-[1.1rem] leading-[1.95] sm:text-[1.2rem]"
                      {...reveal(i + 1)}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
                <motion.p
                  className="mt-12 font-display text-xl italic text-wine"
                  {...reveal(letter.paragraphs.length + 1)}
                >
                  {letter.closing}
                </motion.p>
                <motion.p
                  className="mt-1 font-display text-2xl italic text-wine"
                  {...reveal(letter.paragraphs.length + 2)}
                >
                  {letter.signature}
                </motion.p>
              </div>
            </article>

            {letter.isPlaceholder && (
              <p className="mx-auto mt-6 max-w-md text-center text-sm text-ivory/60">
                This is a placeholder letter. Replace it by editing <span className="font-mono text-gold/90">src/data/letter.js</span>.
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {!done && (
                <button type="button" onClick={() => setSkipped(true)} className="btn-quiet">
                  Show the whole letter
                </button>
              )}
              <button type="button" onClick={replay} className="btn-quiet">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Replay the letter
              </button>
              <button type="button" onClick={closeEnvelope} className="btn-quiet">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Close the envelope
              </button>
            </div>

            <ChapterLink to="/forever" title="Itha thodu da !" />
          </motion.section>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}

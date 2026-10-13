import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import FloatingParticles from '../components/FloatingParticles'
import FloatingHearts from '../components/FloatingHearts'
import AnimatedKisses from '../components/AnimatedKisses'
import RevealText from '../components/RevealText'
import { config } from '../data/config'

const chapters = [
  { to: '/story', numeral: 'I', title: 'Our Love Story', text: 'The moments that brought us here.' },
  { to: '/memories', numeral: 'II', title: 'Our Memories', text: 'Pictures worth keeping forever.' },
  { to: '/letter', numeral: 'III', title: 'A Letter', text: 'Words I want you to read slowly.' },
  { to: '/forever', numeral: 'IV', title: 'Our Forever', text: 'Where the story is heading.' },
]

export default function HomePage() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 900], [0, 180]) // gentle parallax
  const { hero } = config

  const scrollToChapters = () =>
    document.getElementById('chapters')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  return (
    <PageTransition>
      {/* ---------- hero ---------- */}
      <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28 text-center">
        <motion.div aria-hidden="true" className="absolute inset-0 -z-20" style={{ y: bgY }}>
          <div className="absolute inset-0 bg-midnight" />
          <div
            className="aurora-blob animate-drift-a -left-[20%] top-[5%] h-[75vmax] w-[75vmax]"
            style={{ background: 'radial-gradient(closest-side, rgba(255,105,180,0.7), transparent)' }}
          />
          <div
            className="aurora-blob animate-drift-b -right-[25%] top-[25%] h-[65vmax] w-[65vmax]"
            style={{ background: 'radial-gradient(closest-side, rgba(255,20,147,0.6), transparent)' }}
          />
          <div
            className="aurora-blob animate-drift-c left-[10%] -bottom-[30%] h-[60vmax] w-[60vmax]"
            style={{ background: 'radial-gradient(closest-side, rgba(255,0,127,0.5), transparent)' }}
          />
        </motion.div>
        <FloatingParticles variant="dust" count={55} className="-z-10" />
        <FloatingHearts count={12} className="-z-5" />
        <AnimatedKisses count={6} className="-z-4" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(90% 70% at 50% 45%, transparent 40%, rgba(25,13,21,0.85) 100%)' }}
        />

        <motion.p
          className="font-display text-lg italic text-rose sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        >
          {hero.intro}
        </motion.p>

        <RevealText
          text={hero.heading}
          delay={0.7}
          className="mt-6 max-w-4xl text-balance text-[clamp(2.5rem,9.5vw,5.75rem)] font-medium leading-[1.06] tracking-[-0.01em] text-ivory"
        />

        <motion.p
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-ivory/75 sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2 }}
        >
          {hero.text}
        </motion.p>

        <motion.div
          className="mt-11"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.7 }}
        >
          <Link to="/story" className="btn-primary">
            {hero.button}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.button
          type="button"
          onClick={scrollToChapters}
          aria-label="Scroll down to the chapters"
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-sm text-ivory/55 transition hover:text-gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.4 }}
        >
          Scroll
          <span aria-hidden="true" className="animate-scroll-cue block h-8 w-px bg-gold/70" />
          <ChevronDown className="-mt-1 h-4 w-4" aria-hidden="true" />
        </motion.button>
      </section>

      {/* ---------- chapters ---------- */}
      <section id="chapters" aria-labelledby="chapters-title" className="mx-auto max-w-3xl px-6 pb-32 pt-24">
        <motion.h2
          id="chapters-title"
          className="text-center text-3xl font-medium text-ivory sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          Where would you like to begin?
        </motion.h2>
        <ul className="mt-14 border-b border-ivory/10">
          {chapters.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                className="group flex items-baseline gap-5 border-t border-ivory/10 py-7 transition-colors duration-500 hover:bg-ivory/[0.03] sm:gap-8 sm:px-4"
              >
                <span className="w-8 font-display text-lg italic text-gold/80">{c.numeral}</span>
                <span className="flex-1">
                  <span className="block font-display text-2xl text-ivory transition-colors duration-500 group-hover:text-gold sm:text-3xl">
                    {c.title}
                  </span>
                  <span className="mt-1 block text-sm text-ivory/60">{c.text}</span>
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 self-center text-ivory/40 transition duration-500 group-hover:translate-x-1.5 group-hover:text-gold"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageTransition>
  )
}

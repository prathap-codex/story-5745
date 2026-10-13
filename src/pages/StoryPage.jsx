import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import ChapterLink from '../components/ChapterLink'
import SafeImage from '../components/SafeImage'
import FloatingHearts from '../components/FloatingHearts'
import AnimatedKisses from '../components/AnimatedKisses'
import { config } from '../data/config'
import { timeline } from '../data/timeline'

function TimelineItem({ milestone, index }) {
  const [imageBroken, setImageBroken] = useState(false)
  const right = index % 2 === 1
  const showImage = milestone.image && !imageBroken

  return (
    <motion.li
      className={`relative pb-20 pl-14 last:pb-0 md:w-1/2 md:pl-0 ${
        right ? 'md:ml-auto md:pl-16' : 'md:pr-16 md:text-right'
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* glowing marker */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-2 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-gold/70 bg-midnight shadow-glow ${
          right ? 'md:-left-[11px]' : 'md:left-auto md:-right-[11px]'
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-gold" />
      </span>

      <p className="font-display text-base italic text-gold">{milestone.date}</p>
      <h2 className="mt-2 text-2xl font-medium leading-snug text-ivory sm:text-3xl">{milestone.title}</h2>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-ivory/75 md:inline-block">{milestone.description}</p>

      {showImage && (
        <figure className={`mt-7 max-w-xs ${right ? '' : 'md:ml-auto'}`}>
          <div className="border border-gold/30 bg-ivory p-2 pb-2 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]">
            <SafeImage
              src={milestone.image}
              alt={milestone.imageAlt}
              className="aspect-[4/3] w-full object-cover"
              onFail={() => setImageBroken(true)}
            />
          </div>
          {milestone.caption && (
            <figcaption className="mt-3 font-display text-sm italic text-ivory/60">{milestone.caption}</figcaption>
          )}
        </figure>
      )}
    </motion.li>
  )
}

export default function StoryPage() {
  return (
    <PageTransition className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh]"
        style={{ background: 'radial-gradient(70% 100% at 50% 0%, rgba(255,105,180,0.8), transparent)' }}
      />
      <FloatingHearts count={8} className="-z-5" />
      <AnimatedKisses count={4} className="-z-4" />
      <PageHeader title={config.story.heading} intro={config.story.intro} />

      <ol className="relative mx-auto max-w-5xl px-6 sm:px-10">
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[calc(1.5rem+11px)] top-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent sm:left-[calc(2.5rem+11px)] md:left-1/2"
        />
        {timeline.map((m, i) => (
          <TimelineItem key={m.id} milestone={m} index={i} />
        ))}
      </ol>

      <ChapterLink to="/memories" title="Itha thodu da !" />
    </PageTransition>
  )
}

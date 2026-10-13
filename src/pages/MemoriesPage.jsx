import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import ChapterLink from '../components/ChapterLink'
import PhotoCard from '../components/PhotoCard'
import Lightbox from '../components/Lightbox'
import FloatingHearts from '../components/FloatingHearts'
import AnimatedKisses from '../components/AnimatedKisses'
import { config } from '../data/config'
import { memories } from '../data/memories'

export default function MemoriesPage() {
  const [active, setActive] = useState(null) // index of the open photo, or null

  return (
    <PageTransition className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 40% at 15% 15%, rgba(255,105,180,0.7), transparent), radial-gradient(60% 40% at 90% 70%, rgba(255,20,147,0.6), transparent)',
        }}
      />
      <FloatingHearts count={8} className="-z-5" />
      <AnimatedKisses count={4} className="-z-4" />
      <PageHeader title={config.memories.heading} intro={config.memories.intro} />

      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-x-10 gap-y-16 px-8 pt-4 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:gap-x-14">
        {memories.map((m, i) => (
          <PhotoCard key={m.id} memory={m} index={i} onOpen={setActive} />
        ))}
      </ul>

      <AnimatePresence>
        {active !== null && (
          <Lightbox items={memories} index={active} onChange={setActive} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>

      <ChapterLink to="/letter" title="Itha thodu da !" />
    </PageTransition>
  )
}

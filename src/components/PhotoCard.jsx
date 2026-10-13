import { motion } from 'framer-motion'
import SafeImage, { ImagePlaceholder } from './SafeImage'

const ASPECTS = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
}

// One polaroid-style photo. Opens the lightbox on click / Enter / Space.
export default function PhotoCard({ memory, index, onOpen }) {
  const aspect = ASPECTS[memory.aspect] ?? ASPECTS.square

  return (
    <motion.li
      className={index % 2 === 1 ? 'lg:mt-12' : ''}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open photo: ${memory.caption}`}
        className="group relative block w-full bg-ivory p-3 pb-5 text-left shadow-[0_22px_44px_-20px_rgba(0,0,0,0.85)] sm:p-4 sm:pb-6"
        style={{ rotate: memory.rotate }}
        whileHover={{ rotate: 0, y: -8, scale: 1.025 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-gold/45 shadow-sm backdrop-blur-[1px]"
        />
        <div className={`relative overflow-hidden bg-midnight ${aspect}`}>
          <SafeImage
            src={memory.src}
            alt={memory.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            fallback={
              <ImagePlaceholder
                className="h-full w-full"
                title={memory.caption}
                hint={memory.instructions}
                filePath={memory.src}
              />
            }
          />
        </div>
        <p className="mt-4 text-center font-display text-lg italic leading-snug text-wine">{memory.caption}</p>
      </motion.button>
    </motion.li>
  )
}

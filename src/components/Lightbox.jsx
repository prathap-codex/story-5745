import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import SafeImage, { ImagePlaceholder } from './SafeImage'

// Full-screen photo viewer.
// Keyboard: Esc closes, ←/→ navigate, Tab is kept inside. Touch: swipe left/right.
export default function Lightbox({ items, index, onClose, onChange }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const item = items[index]
  const total = items.length

  const prev = () => onChange((index - 1 + total) % total)
  const next = () => onChange((index + 1) % total)

  // Lock page scroll, focus the close button, restore focus afterwards.
  useEffect(() => {
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const navButton =
    'absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-ivory/20 bg-midnight/70 p-3 text-ivory transition hover:border-gold hover:text-gold'

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${item.caption}`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close photo viewer"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full border border-ivory/20 bg-midnight/70 p-3 text-ivory transition hover:border-gold hover:text-gold"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className={`${navButton} left-3 sm:left-8`}
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className={`${navButton} right-3 sm:right-8`}
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      <motion.figure
        key={item.id}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) next()
          else if (info.offset.x > 80) prev()
        }}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-[92vw] flex-col items-center px-14 sm:px-20"
      >
        <div className="bg-ivory p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:p-4">
          <SafeImage
            src={item.src}
            alt={item.alt}
            loading="eager"
            className="max-h-[66vh] max-w-[78vw] select-none object-contain"
            draggable={false}
            fallback={
              <ImagePlaceholder
                className="aspect-[4/5] w-[min(72vw,380px)]"
                title={item.caption}
                hint={item.instructions}
                filePath={item.src}
              />
            }
          />
        </div>
        <figcaption className="mt-6 text-center">
          <p className="font-display text-xl italic text-ivory sm:text-2xl">{item.caption}</p>
          <p className="mt-2 text-sm text-ivory/60" aria-live="polite">
            {index + 1} of {total}
          </p>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

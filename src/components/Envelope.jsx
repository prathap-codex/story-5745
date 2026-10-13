import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

// Sealed envelope → flap opens → letter rises.
// `opened` is controlled by the parent (LetterPage).
export default function Envelope({ opened }) {
  return (
    <div
      role="img"
      aria-label={opened ? 'An envelope opening, with a letter rising out of it' : 'A sealed envelope'}
      className="animate-float-slow relative mx-auto aspect-[7/5] w-[min(88vw,440px)]"
      style={{ perspective: 1200 }}
    >
      {/* soft glow behind */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(214,180,122,0.16), transparent)' }}
      />

      {/* back of the envelope */}
      <div className="absolute inset-0 rounded-[3px] border border-gold/30 bg-gradient-to-b from-[#5a2035] to-[#3a1223] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]" />

      {/* the letter */}
      <motion.div
        aria-hidden="true"
        className="paper absolute inset-x-[7%] bottom-[10%] top-[6%] z-10 rounded-[2px] px-[9%] pt-[12%]"
        initial={false}
        animate={{ y: opened ? '-58%' : '0%' }}
        transition={{ duration: 1.3, delay: opened ? 0.8 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="mb-[9%] block h-px bg-wine/15" style={{ width: `${100 - i * 9}%` }} />
        ))}
      </motion.div>

      {/* front pocket */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 bg-gradient-to-t from-[#47192a] to-[#5d2238]"
        style={{ clipPath: 'polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)' }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      >
        <path
          d="M0 0 L50 54 L100 0 M0 100 L50 54 L100 100"
          fill="none"
          stroke="rgba(214,180,122,0.32)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* flap */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[54%]"
        style={{ transformOrigin: 'top', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        initial={false}
        animate={{ rotateX: opened ? -180 : 0, zIndex: opened ? 5 : 30 }}
        transition={{
          rotateX: { duration: 1, ease: [0.45, 0, 0.2, 1] },
          zIndex: { delay: opened ? 0.5 : 0, duration: 0 },
        }}
      >
        <div className="h-full w-full bg-gradient-to-b from-[#74294a] to-[#56203a]" />
      </motion.div>

      {/* wax seal */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[54%] z-[31] -translate-x-1/2 -translate-y-1/2"
        initial={false}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      >
        <span
          className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
          style={{ background: 'radial-gradient(circle at 35% 30%, #efd9ab, #d6b47a 55%, #9a763b)' }}
        >
          <span className="absolute inset-1.5 rounded-full border border-wine/30" />
          <Heart className="h-5 w-5 text-wine" strokeWidth={1.6} fill="currentColor" fillOpacity={0.25} />
        </span>
      </motion.div>
    </div>
  )
}

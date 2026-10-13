import { useEffect, useState } from 'react'
import { ImagePlus } from 'lucide-react'

// A tasteful stand-in shown until you add your own photo.
export function ImagePlaceholder({ title, filePath, hint, className = '' }) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${title}`}
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-wine via-[#2c1020] to-midnight p-6 text-center ${className}`}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-2 border border-gold/30" />
      <ImagePlus className="h-7 w-7 text-gold/80" strokeWidth={1.25} aria-hidden="true" />
      <p className="font-display text-lg italic leading-snug text-ivory/90">{title}</p>
      {hint && <p className="max-w-[24ch] text-xs leading-relaxed text-ivory/60">{hint}</p>}
      {filePath && <p className="break-all font-mono text-[0.68rem] text-gold/80">{filePath}</p>}
    </div>
  )
}

// Renders <img>, but swaps to `fallback` if there is no src or the file fails to load
// (so there is never a broken-image icon).
export default function SafeImage({ src, alt, className = '', fallback = null, onFail, ...rest }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => setFailed(false), [src])

  if (!src || failed) return fallback

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => {
        setFailed(true)
        onFail?.()
      }}
      {...rest}
    />
  )
}

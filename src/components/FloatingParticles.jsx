import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Lightweight canvas of drifting dust ("dust") or twinkling stars ("stars").
// • Fewer particles on small screens, 30fps cap on phones
// • Pauses when the tab is hidden
// • With reduced motion: draws one still frame, no animation
export default function FloatingParticles({ count = 60, variant = 'dust', className = '' }) {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const small = window.innerWidth < 640
    const n = Math.round(count * (small ? 0.55 : 1))
    const stars = variant === 'stars'
    const palette = stars
      ? ['255,105,180', '255,20,147', '255,0,127', '245,235,221']
      : ['255,105,180', '255,20,147', '255,0,127']

    let w = 0
    let h = 0
    let raf = 0
    let frame = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const particles = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * (stars ? 1.2 : 1.8) + 0.3,
      vx: (Math.random() - 0.5) * 0.08,
      vy: stars ? -0.01 - Math.random() * 0.03 : -0.06 - Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      alpha: 0.25 + Math.random() * 0.6,
      color: palette[Math.floor(Math.random() * palette.length)],
    }))

    const draw = (animate) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        if (animate) {
          p.x += p.vx
          p.y += p.vy
          p.phase += p.speed
          if (p.y < -4) p.y = h + 4
          if (p.y > h + 4) p.y = -4
          if (p.x < -4) p.x = w + 4
          if (p.x > w + 4) p.x = -4
        }
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.phase))
        if (p.r > 1.2) {
          ctx.fillStyle = `rgba(${p.color},${a * 0.18})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = `rgba(${p.color},${a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      frame += 1
      if (!small || frame % 2 === 0) draw(true)
      raf = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop)
    }
    const onResize = () => {
      resize()
      if (reduce) draw(false)
    }

    if (reduce) {
      draw(false)
    } else {
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [count, variant, reduce])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}

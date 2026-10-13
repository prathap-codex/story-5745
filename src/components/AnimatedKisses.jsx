import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function AnimatedKisses({ count = 8, className = '' }) {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const small = window.innerWidth < 640
    const n = Math.round(count * (small ? 0.5 : 1))

    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const kisses = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 16 + Math.random() * 14,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.25 - Math.random() * 0.35,
      rotation: (Math.random() - 0.5) * 0.3,
      vrot: (Math.random() - 0.5) * 0.015,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.008 + Math.random() * 0.015,
      swayAmplitude: 0.25 + Math.random() * 0.4,
      alpha: 0.4 + Math.random() * 0.4,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }))

    const drawKiss = (x, y, size, rotation, alpha) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = alpha

      const s = size / 24

      // Lip shapes
      ctx.fillStyle = '#FF1493'
      ctx.beginPath()
      ctx.scale(s, s)

      // Upper lip
      ctx.moveTo(-12, 0)
      ctx.bezierCurveTo(-12, -8, -6, -10, 0, -4)
      ctx.bezierCurveTo(6, -10, 12, -8, 12, 0)

      // Lower lip
      ctx.bezierCurveTo(12, 6, 6, 12, 0, 8)
      ctx.bezierCurveTo(-6, 12, -12, 6, -12, 0)

      ctx.fill()

      // Lip shine
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.beginPath()
      ctx.ellipse(-5, -4, 3, 2, -0.3, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const draw = (animate) => {
      ctx.clearRect(0, 0, w, h)

      for (const kiss of kisses) {
        if (animate) {
          kiss.x += kiss.vx + Math.sin(kiss.swayPhase) * kiss.swayAmplitude
          kiss.y += kiss.vy
          kiss.rotation += kiss.vrot
          kiss.swayPhase += kiss.swaySpeed
          kiss.pulsePhase += kiss.pulseSpeed

          if (kiss.y < -25) {
            kiss.y = h + 25
            kiss.x = Math.random() * w
          }
          if (kiss.x < -25) kiss.x = w + 25
          if (kiss.x > w + 25) kiss.x = -25
        }

        const pulse = animate ? 1 + Math.sin(kiss.pulsePhase) * 0.1 : 1
        const currentAlpha = kiss.alpha * pulse
        drawKiss(kiss.x, kiss.y, kiss.size * pulse, kiss.rotation, currentAlpha)
      }
    }

    const loop = () => {
      draw(true)
      raf = requestAnimationFrame(loop)
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
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [count, reduce])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

function drawHeart(ctx, x, y, size, rotation, color, alpha) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.scale(size / 20, size / 20)
  ctx.globalAlpha = alpha
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(0, 7)
  ctx.bezierCurveTo(-13, -2, -8, -11, 0, -4)
  ctx.bezierCurveTo(8, -11, 13, -2, 0, 7)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export default function FloatingHearts({ count = 15, className = '' }) {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const small = window.innerWidth < 640
    const n = Math.round(count * (small ? 0.6 : 1))

    const colors = ['#FF69B4', '#FF1493', '#FF007F', '#FF6B9D', '#FF7F9D', '#FF6FA6', '#FF69B4']

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

    const hearts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 12 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -0.3 - Math.random() * 0.4,
      rotation: (Math.random() - 0.5) * 0.5,
      vrot: (Math.random() - 0.5) * 0.02,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02,
      swayAmplitude: 0.3 + Math.random() * 0.5,
      alpha: 0.3 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const draw = (animate) => {
      ctx.clearRect(0, 0, w, h)

      for (const heart of hearts) {
        if (animate) {
          heart.x += heart.vx + Math.sin(heart.swayPhase) * heart.swayAmplitude
          heart.y += heart.vy
          heart.rotation += heart.vrot
          heart.swayPhase += heart.swaySpeed

          if (heart.y < -30) {
            heart.y = h + 30
            heart.x = Math.random() * w
          }
          if (heart.x < -30) heart.x = w + 30
          if (heart.x > w + 30) heart.x = -30
        }

        drawHeart(ctx, heart.x, heart.y, heart.size, heart.rotation, heart.color, heart.alpha)
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

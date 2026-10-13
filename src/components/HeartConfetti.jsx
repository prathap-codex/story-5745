import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const COLORS = ['#FF69B4', '#FF1493', '#FF007F', '#FF6B9D', '#FF7F9D']

function drawHeart(ctx, x, y, size, rotation) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.scale(size / 20, size / 20)
  ctx.beginPath()
  ctx.moveTo(0, 7)
  ctx.bezierCurveTo(-13, -2, -8, -11, 0, -4)
  ctx.bezierCurveTo(8, -11, 13, -2, 0, 7)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

// Pass a number that increases each time you want a burst: <HeartConfetti burst={n} />
// With reduced motion, hearts appear still for a moment instead of flying.
export default function HeartConfetti({ burst }) {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!burst) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const count = w < 640 ? 55 : 100
    const parts = Array.from({ length: count }, (_, i) => ({
      x: reduce ? Math.random() * w : w / 2 + (Math.random() - 0.5) * 90,
      y: reduce ? Math.random() * h * 0.85 : h * 0.6,
      vx: (Math.random() - 0.5) * 15,
      vy: -(Math.random() * 14 + 6),
      g: 0.22 + Math.random() * 0.12,
      size: 9 + Math.random() * 15,
      rot: (Math.random() - 0.5) * 1.2,
      vrot: (Math.random() - 0.5) * 0.08,
      color: COLORS[i % COLORS.length],
    }))

    let raf = 0
    let timeout = 0
    const clear = () => ctx.clearRect(0, 0, w, h)

    if (reduce) {
      parts.forEach((p) => {
        ctx.globalAlpha = 0.85
        ctx.fillStyle = p.color
        drawHeart(ctx, p.x, p.y, p.size, p.rot)
      })
      timeout = window.setTimeout(clear, 3000)
    } else {
      const start = performance.now()
      let last = start
      const frame = (now) => {
        const dt = Math.min((now - last) / 16.67, 2)
        last = now
        const elapsed = now - start
        const fade = elapsed > 2600 ? Math.max(0, 1 - (elapsed - 2600) / 1700) : 1
        clear()
        for (const p of parts) {
          p.vy += p.g * dt
          p.vx *= 0.992
          p.x += p.vx * dt
          p.y += p.vy * dt
          p.rot += p.vrot * dt
          ctx.globalAlpha = fade
          ctx.fillStyle = p.color
          drawHeart(ctx, p.x, p.y, p.size, p.rot)
        }
        if (elapsed < 4400) raf = requestAnimationFrame(frame)
        else clear()
      }
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
      clear()
    }
  }, [burst, reduce])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] h-full w-full" />
}

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

function drawCandle(ctx, x, y, width, height, color) {
  ctx.save()
  ctx.translate(x, y)

  // Candle body
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.roundRect(-width / 2, 0, width, height, width / 2)
  ctx.fill()

  // Wick
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -12)
  ctx.stroke()

  ctx.restore()
}

function drawFlame(ctx, x, y, size, flickerIntensity) {
  ctx.save()
  ctx.translate(x, y)

  const flicker = 1 + (Math.random() - 0.5) * flickerIntensity
  const height = size * flicker
  const width = size * 0.6 * flicker

  // Outer glow
  const gradient = ctx.createRadialGradient(0, -height / 2, 0, 0, -height / 2, size * 2)
  gradient.addColorStop(0, 'rgba(255, 200, 100, 0.6)')
  gradient.addColorStop(0.5, 'rgba(255, 150, 50, 0.3)')
  gradient.addColorStop(1, 'rgba(255, 100, 0, 0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.ellipse(0, -height / 2, size * 2, size * 2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Flame shape
  const flameGradient = ctx.createLinearGradient(0, 0, 0, -height)
  flameGradient.addColorStop(0, '#FF6B35')
  flameGradient.addColorStop(0.3, '#FF8C42')
  flameGradient.addColorStop(0.6, '#FFD700')
  flameGradient.addColorStop(1, '#FFF8DC')

  ctx.fillStyle = flameGradient
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.bezierCurveTo(-width / 2, -height * 0.3, -width / 2, -height, 0, -height)
  ctx.bezierCurveTo(width / 2, -height, width / 2, -height * 0.3, 0, 0)
  ctx.fill()

  // Inner brighter core
  ctx.fillStyle = 'rgba(255, 255, 200, 0.8)'
  ctx.beginPath()
  ctx.ellipse(0, -height * 0.6, width * 0.3, height * 0.25, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

export default function AnimatedCandles({ count = 3, className = '' }) {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

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

    const candleColors = ['#FFB6C1', '#FF69B4', '#FF1493', '#DB7093', '#FFE4E9']
    const candles = Array.from({ length: count }, (_, i) => ({
      x: (w / (count + 1)) * (i + 1),
      y: h * 0.85,
      width: 24 + Math.random() * 8,
      height: 80 + Math.random() * 20,
      color: candleColors[i % candleColors.length],
      flameSize: 18 + Math.random() * 6,
      flickerIntensity: 0.15 + Math.random() * 0.1,
    }))

    const draw = (animate) => {
      ctx.clearRect(0, 0, w, h)

      candles.forEach((candle) => {
        drawCandle(ctx, candle.x, candle.y, candle.width, candle.height, candle.color)
        drawFlame(
          ctx,
          candle.x,
          candle.y,
          candle.flameSize,
          animate ? candle.flickerIntensity : 0
        )
      })
    }

    const loop = () => {
      draw(true)
      raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      resize()
      candles.forEach((candle, i) => {
        candle.x = (w / (count + 1)) * (i + 1)
        candle.y = h * 0.85
      })
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

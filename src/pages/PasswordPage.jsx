import { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, Lock, LockOpen } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import FloatingParticles from '../components/FloatingParticles'
import FloatingHearts from '../components/FloatingHearts'
import AnimatedKisses from '../components/AnimatedKisses'
import { config } from '../data/config'
import { isUnlocked, unlock } from '../lib/session'

export default function PasswordPage() {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const controls = useAnimationControls()
  const navigate = useNavigate()
  const location = useLocation()
  const reduce = useReducedMotion()
  const timer = useRef(0)
  const inputRef = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  // Where to go after unlocking: the page that was originally requested, or /home.
  const from = location.state?.from?.pathname
  const target = from && from !== '/' ? from : '/home'

  // Already passed the gate in this tab → skip it.
  if (isUnlocked() && !unlocking) return <Navigate to={target} replace />

  const handleSubmit = (e) => {
    e.preventDefault()
    if (unlocking) return
    const attempt = value.trim().toLowerCase()
    const secret = String(config.password).trim().toLowerCase()

    if (attempt && attempt === secret) {
      unlock()
      setError('')
      setUnlocking(true)
      timer.current = window.setTimeout(() => navigate(target, { replace: true }), reduce ? 200 : 1500)
    } else {
      setError(config.gate.errorMessage)
      controls.start({ x: [0, -10, 10, -7, 7, 0], transition: { duration: 0.5 } })
      inputRef.current?.focus()
    }
  }

  const { gate } = config

  return (
    <PageTransition className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-16">
      {/* night sky */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{ background: 'radial-gradient(120% 90% at 50% 110%, rgba(255,105,180,0.6) 0%, #190D15 55%, rgba(255,20,147,0.5) 100%)' }}
      />
      <FloatingParticles variant="stars" count={110} className="-z-10" />
      <FloatingHearts count={8} className="-z-5" />
      <AnimatedKisses count={4} className="-z-4" />

      <div className="relative w-full max-w-md text-center">
        {/* lock */}
        <motion.div
          className="relative mx-auto mb-10 flex h-24 w-24 items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <span
            aria-hidden="true"
            className="animate-glow-pulse absolute -inset-8 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(214,180,122,0.28), transparent)' }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-gold/40 bg-midnight/70 shadow-glow-lg"
            animate={unlocking ? { scale: [1, 1.25, 1.1], borderColor: '#D6B47A' } : {}}
            transition={{ duration: 0.9 }}
          />
          {unlocking ? (
            <LockOpen className="relative h-9 w-9 text-gold" strokeWidth={1.3} aria-hidden="true" />
          ) : (
            <Lock className="relative h-9 w-9 text-gold" strokeWidth={1.3} aria-hidden="true" />
          )}
        </motion.div>

        <motion.h1
          className="text-balance text-[clamp(2.2rem,8vw,3.5rem)] font-medium leading-[1.1] text-ivory"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {gate.heading}
        </motion.h1>
        <motion.p
          className="mt-5 font-display text-lg italic leading-relaxed text-ivory/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {gate.text}
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div animate={controls}>
            <label htmlFor="gate-password" className="sr-only">
              {gate.inputLabel}
            </label>
            <div className="relative">
              <input
                id="gate-password"
                ref={inputRef}
                type={show ? 'text' : 'password'}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  if (error) setError('')
                }}
                placeholder={gate.inputPlaceholder}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby="gate-error"
                disabled={unlocking}
                className={`w-full rounded-full border bg-ivory/5 px-14 py-4 text-center text-ivory placeholder:text-ivory/40 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 ${
                  error ? 'border-rose/70' : 'border-ivory/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                aria-pressed={show}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-ivory/60 transition hover:text-gold"
              >
                {show ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </motion.div>

          <motion.p
            id="gate-error"
            role="alert"
            className="mt-4 min-h-[1.5rem] text-2xl font-bold text-pink-vibrant"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={error ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, type: 'spring' }}
          >
            {error && (
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255,20,147,0.8)',
                    '0 0 40px rgba(255,20,147,1)',
                    '0 0 20px rgba(255,20,147,0.8)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {error}
              </motion.span>
            )}
          </motion.p>

          <button type="submit" disabled={unlocking} className="btn-primary mt-4 w-full sm:w-auto sm:min-w-[12rem]">
            {unlocking ? 'Welcome…' : gate.button}
          </button>
        </motion.form>
      </div>
    </PageTransition>
  )
}

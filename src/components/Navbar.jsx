import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Menu, X } from 'lucide-react'
import { config } from '../data/config'
import { lock } from '../lib/session'

const links = [
  { to: '/home', label: 'Welcome' },
  { to: '/story', label: 'Our Story' },
  { to: '/memories', label: 'Memories' },
  { to: '/letter', label: 'The Letter' },
  { to: '/forever', label: 'Forever' },
]

const desktopLink = ({ isActive }) =>
  `text-sm tracking-wide transition-colors duration-300 ${
    isActive ? 'text-gold' : 'text-ivory/70 hover:text-ivory'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleLock = () => {
    lock()
    navigate('/')
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || open ? 'border-b border-ivory/10 bg-midnight/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/home" className="font-display text-xl italic text-ivory">
          {config.siteName}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={desktopLink}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={handleLock}
              aria-label="Lock the site and return to the password page"
              className="rounded-full border border-ivory/20 p-2 text-ivory/70 transition hover:border-gold/60 hover:text-gold"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-full border border-ivory/20 p-2.5 text-ivory md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `block border-b border-ivory/10 py-3.5 font-display text-2xl ${
                        isActive ? 'text-gold' : 'text-ivory'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={handleLock}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-ivory/70"
                >
                  <Lock className="h-4 w-4" aria-hidden="true" /> Lock the site
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

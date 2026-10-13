import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import MusicPlayer from './components/MusicPlayer'
import ProtectedRoute from './components/ProtectedRoute'
import PasswordPage from './pages/PasswordPage'
import HomePage from './pages/HomePage'
import StoryPage from './pages/StoryPage'
import MemoriesPage from './pages/MemoriesPage'
import LetterPage from './pages/LetterPage'
import ForeverPage from './pages/ForeverPage'
import NotFoundPage from './pages/NotFoundPage'
import { isUnlocked } from './lib/session'

const guard = (page) => <ProtectedRoute>{page}</ProtectedRoute>

export default function App() {
  const location = useLocation()
  const showChrome = location.pathname !== '/' && isUnlocked()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ivory focus:px-4 focus:py-2 focus:text-midnight"
      >
        Skip to content
      </a>

      {showChrome && <Navbar />}

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PasswordPage />} />
          <Route path="/home" element={guard(<HomePage />)} />
          <Route path="/story" element={guard(<StoryPage />)} />
          <Route path="/memories" element={guard(<MemoriesPage />)} />
          <Route path="/letter" element={guard(<LetterPage />)} />
          <Route path="/forever" element={guard(<ForeverPage />)} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>

      {showChrome && <MusicPlayer />}
    </>
  )
}

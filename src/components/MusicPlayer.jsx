import { useEffect, useRef, useState } from 'react'
import { Music, VolumeX } from 'lucide-react'
import { config } from '../data/config'

// Optional background music. Starts ONLY when the visitor presses the button.
export default function MusicPlayer() {
  const audioRef = useRef(null)
  const noteTimer = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => () => clearTimeout(noteTimer.current), [])

  if (!config.music?.enabled) return null

  const showNote = (text) => {
    setNote(text)
    clearTimeout(noteTimer.current)
    noteTimer.current = window.setTimeout(() => setNote(''), 5000)
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
      showNote(`Add your song at public${config.music.src} to enable music.`)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-3 sm:bottom-6 sm:left-6">
      <audio ref={audioRef} src={config.music.src} loop preload="none" onEnded={() => setPlaying(false)} />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="rounded-full border border-gold/40 bg-midnight/80 p-3 text-gold shadow-glow backdrop-blur transition hover:border-gold hover:bg-wine/60"
      >
        {playing ? <Music className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
      </button>
      <p role="status" className="max-w-[16rem] text-xs leading-snug text-ivory/70">
        {note}
      </p>
    </div>
  )
}

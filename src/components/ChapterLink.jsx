import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// "Continue to the next page" block shown at the end of a page.
export default function ChapterLink({ to, title }) {
  return (
    <nav aria-label="Next page" className="mx-auto max-w-3xl px-6 pb-28 pt-20 text-center">
      <p className="font-display italic text-ivory/60">Continue</p>
      <Link
        to={to}
        className="group mt-3 inline-flex items-center gap-3 font-display text-3xl text-ivory transition-colors duration-500 hover:text-gold sm:text-4xl"
      >
        {title}
        <ArrowRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden="true" />
      </Link>
    </nav>
  )
}

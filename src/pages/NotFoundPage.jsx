import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import FloatingParticles from '../components/FloatingParticles'

export default function NotFoundPage() {
  return (
    <PageTransition className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{ background: 'radial-gradient(100% 80% at 50% 100%, #4B182B 0%, #190D15 60%)' }}
      />
      <FloatingParticles variant="stars" count={70} className="-z-10" />
      <h1 className="text-balance text-[clamp(2.2rem,8vw,4rem)] font-medium leading-tight text-ivory">
        This page wandered off
      </h1>
      <p className="mt-5 max-w-md font-display text-lg italic text-ivory/70">
        There is nothing at this address, but our story is still waiting for you.
      </p>
      <Link to="/home" className="btn-primary mt-10">
        Back to the welcome
      </Link>
    </PageTransition>
  )
}

import { Navigate, useLocation } from 'react-router-dom'
import { isUnlocked } from '../lib/session'

// Demo-only guard. NOT real security (see README).
// If someone opens e.g. /letter directly, they are sent to the gate first
// and returned to /letter once the password is entered.
export default function ProtectedRoute({ children }) {
  const location = useLocation()
  if (!isUnlocked()) {
    return <Navigate to="/" replace state={{ from: location }} />
  }
  return children
}

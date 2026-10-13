// Remembers (for this browser tab only) that the password gate was passed,
// so a page refresh does not send you back to the gate.
// This is a convenience, NOT security.
import { config } from '../data/config'

export const isUnlocked = () => {
  try {
    return sessionStorage.getItem(config.sessionKey) === '1'
  } catch {
    return false
  }
}

export const unlock = () => {
  try {
    sessionStorage.setItem(config.sessionKey, '1')
  } catch {
    /* storage unavailable (e.g. private mode) – ignore */
  }
}

export const lock = () => {
  try {
    sessionStorage.removeItem(config.sessionKey)
  } catch {
    /* ignore */
  }
}

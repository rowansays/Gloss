import { castString } from './castString.js'

export function castStringArray (aught) {
  aught = Array.isArray(aught) ? aught : []
  return aught.length === 0
    ? aught
    : Array.from(new Set(aught)).filter(castString).filter(Boolean)
}

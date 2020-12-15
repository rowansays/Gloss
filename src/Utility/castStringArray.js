import { castString } from './castString.js'

/**
 * Coerce a value to an array of unique strings.
 *
 * @param {mixed} aught Any value.
 * @return {Array} An array of unique strings.
 */
export function castStringArray (aught) {
  aught = Array.isArray(aught) ? aught : []
  return aught.length === 0
    ? aught
    : Array.from(new Set(aught)).filter(castString).filter(Boolean)
}

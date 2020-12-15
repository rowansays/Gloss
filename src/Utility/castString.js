/**
 * Coerce a value to a string.
 *
 * @param {mixed} aught Any value.
 * @return {Array} A string.
 */
function castString (aught) {
  // Extract "name" value from objects with a getName() method.
  if (!!aught && typeof aught.getName === 'function') {
    aught = aught.getName()
  }
  // Coerce numbers to strings.
  aught = typeof aught === 'number' ? String(aught) : aught

  // Return trimmed value of string or empty.
  return typeof aught === 'string' ? aught.trim() : ''
}

export { castString }

/**
 * Can the provided value be used as a quote?
 *
 * @param {mixed} aught The value which may be a quote.
 * @return {bool} True if the object can be used as a quote; false otherwise.
 */
function isNamed (aught) {
  return !!aught && typeof aught === 'object' && typeof aught.getName === 'function'
}

export { isNamed }

/**
 * Can the provided value be used as a quote?
 *
 * @param {mixed} aught The value which may be a quote.
 * @return {bool} True if the object can be used as a quote; false otherwise.
 */
function isQuote (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getFull === 'function' &&
    typeof aught.getName === 'function' &&
    typeof aught.getSource === 'function' &&
    typeof aught.withSource === 'function'
}

export { isQuote }

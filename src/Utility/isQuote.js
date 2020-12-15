/**
 * Can the provided value be used as a quote?
 *
 * @param {mixed} aught The value which may be a quote.
 * @return {bool} True if the object can be used as a quote; false otherwise.
 */
export function isQuote (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.forEach === 'function' &&
    typeof aught.getAltNames === 'function' &&
    typeof aught.getFreq === 'function' &&
    typeof aught.getName === 'function' &&
    typeof aught.getProps === 'function' &&
    typeof aught.isSingular === 'function' &&
    typeof aught.length === 'number' &&
    typeof aught.slice === 'function' &&
    typeof aught.withQuote === 'function' &&
    typeof aught.withRef === 'function'
}

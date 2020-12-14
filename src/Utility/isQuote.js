/**
 * Can the provided value be used as a quote?
 *
 * @param {mixed} aught The value which may be a quote.
 * @return {bool} True if the object can be used as a quote; false otherwise.
 */
export function isQuote (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getFreq === 'function' &&
    typeof aught.getName === 'function' &&
    typeof aught.getProps === 'function' &&
    typeof aught.getSize === 'function' &&
    typeof aught.isSingular === 'function' &&
    typeof aught.withQuote === 'function'
}

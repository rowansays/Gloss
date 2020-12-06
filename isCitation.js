/**
 * Can the provided value be used as a source?
 *
 * @param {mixed} aught The value which may be a source.
 * @return {bool} True if the object can be used as a source; false otherwise.
 */
function isCitation (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getFull === 'function' &&
    typeof aught.getName === 'function' &&
    typeof aught.getSource === 'function' &&
    typeof aught.getType === 'function' &&
    aught.getType() === 'Citation'
}

export { isCitation }

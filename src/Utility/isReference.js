/**
 * Can the provided value be used as a reference?
 *
 * @param {mixed} aught The value which may be a reference.
 * @return {bool} True if the value can be used as a reference; false otherwise.
 */
function isReference (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getName === 'function' &&
    typeof aught.getUrl === 'function'
}

export { isReference }

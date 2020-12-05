/**
 * Can the provided value be used as a source?
 *
 * @param {mixed} aught The value which may be a source.
 * @return {bool} True if the object can be used as a source; false otherwise.
 */
function isSource (aught) {
  return isObject(aught) && hasMethods(aught)
}

function isObject (aught) {
  return aught || typeof aught === 'object'
}

function hasMethods (aught) {
  return !!aught &&
    typeof aught.getName === 'function' &&
    typeof aught.getUrl === 'function'
}

export { isSource }

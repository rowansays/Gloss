/**
 * Can the provided value be used as a list?
 *
 * This function should return true for both scalar and object lists.
 *
 * @param {mixed} aught The value which may be a list.
 * @return {bool} True if the object can be used as a list; false otherwise.
 */
function isList (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.add === 'function' &&
    typeof aught.entries === 'function' &&
    typeof aught.forEach === 'function' &&
    typeof aught.get === 'function' &&
    typeof aught.has === 'function' &&
    typeof aught.length === 'number'
}

export { isList }

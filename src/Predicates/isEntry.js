/**
 * Can the provided value be used as an entry?
 *
 * @param {mixed} aught The value which may be an entry.
 * @return {bool} True if the object can be used as an entry; false otherwise.
 */
function isEntry (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getMemo === 'function' &&
    typeof aught.getName === 'function' &&
    typeof aught.getSize === 'function'
}

export { isEntry }

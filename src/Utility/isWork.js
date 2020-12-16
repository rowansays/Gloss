/**
 * Can the provided value be used as a work?
 *
 * @param {mixed} aught The value which may be a work.
 * @return {bool} True if the object can be used as a work; false otherwise.
 */
function isWork (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getAuthor === 'function' &&
    typeof aught.getDate === 'function' &&
    typeof aught.getDescription === 'function' &&
    typeof aught.getKey === 'function' &&
    typeof aught.getName === 'function' &&
    typeof aught.getSubtitle === 'function' &&
    typeof aught.getTitle === 'function' &&
    typeof aught.getUrl === 'function'
}

export { isWork }

/**
 * Can the provided value be used as a source?
 *
 * @param {mixed} aught The value which may be a source.
 * @return {bool} True if the object can be used as a source; false otherwise.
 */
function isSource (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getName === 'function' &&
    typeof aught.getType === 'function' &&
    typeof aught.getUrl === 'function' &&
    ['Book', 'Webpage'].indexOf(aught.getType()) > -1
}

export { isSource }

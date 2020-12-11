/**
 * Can the provided value be used as a gloss?
 *
 * @param {mixed} aught The value which may be a gloss.
 * @return {bool} True if the object can be used as a gloss; false otherwise.
 */
function isGloss (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getMemo === 'function' &&
    typeof aught.getName === 'function' &&
    typeof aught.getSize === 'function' &&
    typeof aught.withDef === 'function' &&
    typeof aught.withMemo === 'function'
}

export { isGloss }

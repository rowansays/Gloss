/**
 * Can the provided value be used as a gloss?
 *
 * @param {mixed} aught The value which may be a gloss.
 * @return {bool} True if the object can be used as a gloss; false otherwise.
 */
export function isGloss (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getMemo === 'function' &&
    typeof aught.getName === 'function' &&
    typeof aught.length === 'number' &&
    typeof aught.withDef === 'function' &&
    typeof aught.withGloss === 'function' &&
    typeof aught.withMemo === 'function'
}
/**
 * Can the provided value be used as a list?
 *
 * This function should return true for both scalar and object lists.
 *
 * @param {mixed} aught The value which may be a list.
 * @return {bool} True if the object can be used as a list; false otherwise.
 */
export function isList (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.add === 'function' &&
    typeof aught.entries === 'function' &&
    typeof aught.forEach === 'function' &&
    typeof aught.get === 'function' &&
    typeof aught.has === 'function' &&
    typeof aught.length === 'number'
}
/**
 * Can the provided value be used as a named entity?
 *
 * @param {mixed} aught The value which may be named.
 * @return {bool} True if the object can be used as a named entity; false
 *   otherwise.
 */
export function isNamed (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getName === 'function'
}
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
    typeof aught.getName === 'function' &&
    typeof aught.getProps === 'function' &&
    typeof aught.isSingular === 'function' &&
    typeof aught.length === 'number' &&
    typeof aught.mentions === 'number' &&
    typeof aught.slice === 'function' &&
    typeof aught.withQuote === 'function' &&
    typeof aught.withRef === 'function'
}
/**
 * Can the provided value be used as a reference?
 *
 * @param {mixed} aught The value which may be a reference.
 * @return {bool} True if the value can be used as a reference; false otherwise.
 */
export function isReference (aught) {
  return !!aught &&
    typeof aught === 'object' &&
    typeof aught.getName === 'function' &&
    typeof aught.getUrl === 'function'
}
/**
 * Can the provided value be used as a work?
 *
 * @param {mixed} aught The value which may be a work.
 * @return {bool} True if the object can be used as a work; false otherwise.
 */
export function isWork (aught) {
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
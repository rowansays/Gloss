import { castString } from '../../index.js'

function AbstractQuote () {}

AbstractQuote.prototype.getReference = function (index) {
  index = typeof Number.isInteger(index) && index > -1 ? index : 0
  return castString(this.references.getItem(index))
}
AbstractQuote.prototype.getReferences = function (index) {
  return [...this.references.getItems()]
}
/**
 * Does this quote have a reference?
 *
 * @param {string} refKey Optional. This method has two signatures:
 *
 *   () - "Does this quote have at least one reference" is the question that is
 *        answered when no parameters are provided.
 *
 *   (refKey) - "Does this quote have this particular reference" is the question
 *        answered when one parameter is provided.
 *
 * @return {bool}
 */
AbstractQuote.prototype.hasReference = function (refKey) {
  switch (arguments.length) {
    case 1 :
      return this.references.has(refKey)
    case 0 :
    default :
      return this.references.getSize() > 0
  }
}

export { AbstractQuote }

import { castString } from '../../index.js'

function AbstractQuote () {}

AbstractQuote.prototype.getReference = function (index) {
  index = typeof Number.isInteger(index) && index > -1 ? index : 0
  return castString(this.references.getItem(index))
}
AbstractQuote.prototype.getSize = function () {
  return this.references.getSize()
}
AbstractQuote.prototype.hasReference = function (name) {
  if (arguments.length === 0) {
    return this.references.getSize() > 0
  }
  return this.references.has(name)
}

export { AbstractQuote }

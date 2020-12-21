import { isRef } from '../../src/Utility/predicate.js'

export function MockQuote (name, from, ref) {
  this.name = name
  this.from = from
  this.ref = ref
}

MockQuote.prototype.reduce = function () { return this }
MockQuote.prototype.withRef = function () { return this }

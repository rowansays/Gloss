/**
 * Normalized Normal factory.
 *
 * A normalized phrase is a type of actual which can be "normalized" to a local
 * term.
 *
 * @param {string} normal
 * @param {string} actual
 * @param {...string} reference
 */

import { AbstractQuote, castString, StringList } from '../../index.js'
import { freeze } from '@mfields/lib/.internal/freeze.js'

function $Normal (normal, actual, ...reference) {
  this.normal = castString(normal)
  this.actual = castString(actual)
  this.references = StringList(...reference)
}

$Normal.prototype = Object.create(AbstractQuote.prototype)

Object.defineProperty($Normal.prototype, 'constructor', {
  value: $Normal
})

$Normal.prototype.getFull = function () {
  return this.actual
}
$Normal.prototype.getName = function () {
  return this.normal
}
$Normal.prototype.withReference = function (...reference) {
  const references = this.references.withString(...reference).getItems()
  return new this.constructor(this.normal, this.actual, ...references)
}

function Normal () {
  const obj = new $Normal(...arguments)
  freeze(obj, $Normal)
  return obj
}

export { Normal }

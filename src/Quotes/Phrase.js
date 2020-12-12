/**
 * Phrase factory.
 *
 * A phrase is a type of quote which can be "normalized" to a local term.
 *
 * @param {string} normal
 * @param {string} quote
 * @param {...string} reference
 */

import { AbstractQuote, castString, StringList } from '../../index.js'
import { freeze } from '../Utility/freeze.js'

function $Phrase (value, ...reference) {
  this.value = castString(value)
  this.references = StringList(...reference)
}

$Phrase.prototype = Object.create(AbstractQuote.prototype)

Object.defineProperty($Phrase.prototype, 'constructor', {
  value: $Phrase
})

$Phrase.prototype.getFull = function () {
  return ''
}
$Phrase.prototype.getName = function () {
  return this.value
}
$Phrase.prototype.withReference = function (...reference) {
  const references = this.references.withString(...reference).getItems()
  return new this.constructor(this.value, ...references)
}

function Phrase () {
  const obj = new $Phrase(...arguments)
  freeze(obj, $Phrase)
  return obj
}

export { Phrase }

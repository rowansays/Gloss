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
import { freeze } from '@mfields/lib/.internal/freeze.js'

function $Phrase (normal, quote, ...reference) {
  this.normal = castString(normal)
  this.quote = castString(quote)
  this.references = StringList(...reference)
}

$Phrase.prototype = Object.create(AbstractQuote.prototype)

Object.defineProperty($Phrase.prototype, 'constructor', {
  value: $Phrase
})

$Phrase.prototype.getFull = function () {
  return this.quote
}
$Phrase.prototype.getName = function () {
  return this.normal
}
$Phrase.prototype.withReference = function (...reference) {
  const references = this.references.withString(...reference).getItems()
  return new this.constructor(this.normal, this.quote, ...references)
}

function Phrase () {
  const obj = new $Phrase(...arguments)
  freeze(obj, $Phrase)
  return obj
}

export { Phrase }

import { freeze } from '@mfields/lib/.internal/freeze.js'
import { castString } from '../../index.js'

function $Phrase (normal, quote, reference) {
  this.normal = castString(normal)
  this.quote = castString(quote)
  this.reference = castString(reference)
}
$Phrase.prototype.getFull = function () {
  return this.quote
}
$Phrase.prototype.getName = function () {
  return this.normal
}
$Phrase.prototype.getReference = function () {
  return this.reference
}
$Phrase.prototype.withReference = function (reference) {
  return new $Phrase(this.normal, this.quote, castString(reference))
}

/**
 * Phrase factory.
 *
 * A phrase is a type of quote which can be "normalized" to a local term.
 */
function Phrase () {
  const obj = new $Phrase(...arguments)
  freeze(obj, $Phrase)
  return obj
}

export { Phrase }

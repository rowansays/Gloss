import { freeze } from '@mfields/lib/.internal/freeze.js'
import { castString } from '../../index.js'

function $Phrase (normal, quote, source) {
  this.normal = castString(normal)
  this.quote = castString(quote)
  this.source = castString(source)
}
$Phrase.prototype.getFull = function () {
  return this.quote
}
$Phrase.prototype.getName = function () {
  return this.normal
}
$Phrase.prototype.getSource = function () {
  return this.source
}
$Phrase.prototype.withSource = function (source) {
  return new $Phrase(this.normal, this.quote, castString(source))
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

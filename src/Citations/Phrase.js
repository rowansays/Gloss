import { freeze } from '@mfields/lib/.internal/freeze.js'
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf.js'

/**
 * Phrase constructor.
 *
 * A phrase is a type of citation.
 */
function Phrase (source, normal, quote) {
  if (!(this instanceof Phrase)) {
    return makeInstanceOf(Phrase, arguments)
  }

  this.normal = normal && typeof normal === 'string' ? normal.trim() : ''
  this.quote = quote && typeof quote === 'string' ? quote.trim() : ''
  this.source = source && typeof source === 'string' ? source.trim() : ''

  freeze(this, Phrase)
}
Phrase.prototype.getFull = function () {
  return this.quote
}
Phrase.prototype.getName = function () {
  return this.normal
}
Phrase.prototype.getSource = function () {
  return this.source
}

export { Phrase }

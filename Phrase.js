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
Phrase.prototype.getName = function () {
  return this.normal
}
Phrase.prototype.getSource = function () {
  return this.source
}
Phrase.prototype.hasType = function (type) {
  return types.indexOf(type) > -1
}
Phrase.fromObject = function (o) {
  return new Phrase(
    o && o.source ? o.source : '',
    o && o.normal ? o.normal : '',
    o && o.quote ? o.quote : ''
  )
}

export { Phrase }

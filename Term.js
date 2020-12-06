import { freeze } from '@mfields/lib/.internal/freeze.js'
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf.js'
import { isCitation } from './isCitation.js'

/**
 * Term constructor.
 *
 * A term is the simplest form of dictionary entry.
 */
function Term (name, ...defs) {
  if (!(this instanceof Term)) {
    return makeInstanceOf(Term, arguments)
  }

  this.name = name && typeof name === 'string' ? name.trim() : ''
  this.defs = []
  defs.forEach(def => {
    if (isCitation(def)) {
      this.defs.push(def)
    }
  })

  freeze(this, Term)
}
Term.prototype.getName = function () {
  return this.name
}
Term.fromObject = function (o) {
  return new Term(
    o && o.name ? o.name : '',
    o && Array.isArray(o.defs) ? o.defs : []
  )
}

export { Term }

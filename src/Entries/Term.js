import { freeze } from '@mfields/lib/.internal/freeze.js'
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf.js'
import { isCitation } from '../Predicates/isCitation.js'

/**
 * Term constructor.
 *
 * A term is the simplest form of entry.
 */
function Term (name, memo, ...defs) {
  if (!(this instanceof Term)) {
    return makeInstanceOf(Term, arguments)
  }

  this.name = name && typeof name === 'string' ? name.trim() : ''
  this.memo = memo && typeof memo === 'string' ? memo.trim() : ''
  this.defs = []
  defs.forEach(def => {
    if (isCitation(def)) {
      this.defs.push(def)
    }
  })

  freeze(this, Term)
}
Term.prototype.getMemo = function () {
  return this.memo
}
Term.prototype.getName = function () {
  return this.name
}
Term.prototype.getSize = function () {
  return this.defs.length
}
Term.prototype.sortByName = function () {
  return new Term(this.getName(), ...[...this.defs].sort((a, b) => {
    if (a.getName() < b.getName()) {
      return -1
    }
    if (a.getName() > b.getName()) {
      return 1
    }
    return 0
  }))
}

export { Term }

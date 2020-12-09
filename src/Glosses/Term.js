/**
 * Term constructor.
 *
 * A term is the simplest form of gloss.
 *
 * @param {String} name Required.
 */

import { castString, Phrase, isQuote } from '../../index.js'
import { freeze } from '@mfields/lib/.internal/freeze.js'
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf.js'

function Term (name, memo, ...defs) {
  if (!(this instanceof Term)) {
    return makeInstanceOf(Term, arguments)
  }

  const cleanName = castString(name)
  if (cleanName === '') {
    throw new TypeError('' +
      'Term(): Parameter 1 "name" is required and must evaluate to a ' +
      'non-empty string. It may be either: a string, a number, or an object ' +
      'having a getName() method.'
    )
  }

  if (isQuote(name)) {
    this.name = name
  } else if (typeof cleanName === 'string') {
    this.name = Phrase(cleanName)
  }

  this.memo = memo && typeof memo === 'string' ? memo.trim() : ''
  this.defs = []
  defs.forEach(def => {
    if (isQuote(def)) {
      this.defs.push(def)
    }
  })

  freeze(this, Term)
}
Term.prototype.getMemo = function () {
  return this.memo
}
Term.prototype.getName = function () {
  return this.name.getName()
}
Term.prototype.getSize = function () {
  return this.defs.length
}
Term.prototype.sortByName = function () {
  const sorted = [...this.defs].sort((a, b) => {
    if (a.getName() < b.getName()) {
      return -1
    }
    if (a.getName() > b.getName()) {
      return 1
    }
    return 0
  })
  return new Term(this.getName(), this.getMemo(), ...sorted)
}

export { Term }

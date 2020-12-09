/**
 * Term constructor.
 *
 * A term is the simplest form of gloss.
 *
 * @param {string|Quote} name Required.
 * @param {string|Quote|QuoteList} name Required.
 *
 *
 * @prop {Quote} name
 * @prop {QuoteList} memos
 * @prop {QuoteList} definitions
 */

import { castString, isQuote, Phrase, QuoteList } from '../../index.js'
import { freeze } from '@mfields/lib/.internal/freeze.js'
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf.js'

function validateName (aught) {
  const clean = castString(aught)
  if (clean === '') {
    throw new TypeError('' +
      'Term(): Parameter 1 "name" is required and must evaluate to a ' +
      'non-empty string. It may be either: a string, a number, or an object ' +
      'having a getName() method.'
    )
  }

  return isQuote(aught) ? aught : Phrase(clean)
}

function Term (name, memos, ...defs) {
  if (!(this instanceof Term)) {
    return makeInstanceOf(Term, arguments)
  }

  this.name = validateName(name)
  this.memos = QuoteList(memos)
  this.defs = []
  defs.forEach(def => {
    if (isQuote(def)) {
      this.defs.push(def)
    }
  })

  freeze(this, Term)
}
Term.prototype.getMemo = function () {
  switch (this.memos.getSize()) {
    case 0 :
      return ''
    case 1 :
      return this.memos.getItem(0).getName()
    default :
      break
  }
  return this.memos
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

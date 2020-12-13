/**
 * Term factory.
 *
 * A term is the simplest form of gloss. Instances contain a name, zero or more
 * memos, and zero or more definitions.
 *
 * @param {string|Quote|QuoteList} name Required.
 * @param {Array|QuoteList} memos.
 * @param {...Quote|...String} definitions.
 *
 * @prop {Quote} name
 * @prop {QuoteList} memos
 * @prop {QuoteList} definitions
 */

import { castString } from '../Utility/castString.js'
import { isQuote } from '../Utility/isQuote.js'
import { Phrase } from '../Quotes/Phrase.js'
import { QuoteList } from '../Lists/QuoteList.js'
import { freeze } from '../Utility/freeze.js'

function validateName (aught) {
  const clean = castString(aught)
  if (clean === '') {
    throw new TypeError('' +
      '$Term(): Parameter 1 "name" is required and must evaluate to a ' +
      'non-empty string. It may be either: a string, a number, or an object ' +
      'having a getName() method.'
    )
  }

  return isQuote(aught) ? aught : Phrase(clean)
}

function $Term (name, memos, ...defs) {
  this.name = validateName(name)
  this.memos = QuoteList(memos)
  this.defs = QuoteList(...defs)
}
$Term.prototype.getDef = function (index) {
  return this.defs.getItem(index)
}
$Term.prototype.getDefs = function () {
  return this.defs.getItems()
}
$Term.prototype.getMemo = function (index) {
  switch (this.memos.getSize()) {
    case 0 :
      return ''
    case 1 :
      return this.memos.getItem(0)
    default :
      return this.memos.getItem(index)
  }
}
$Term.prototype.getMemos = function () {
  return this.memos.getItems()
}
$Term.prototype.getName = function () {
  return this.name.getName()
}
/**
 * @return {number}
 */
$Term.prototype.getSize = function () {
  return this.defs.getSize()
}
/**
 * @return {bool}
 */
$Term.prototype.hasDef = function () {
  return this.defs.getSize() > 0
}
/**
 * @return {$Term}
 */
$Term.prototype.sortDefsByName = function () {
  const sortedDefs = this.defs.sortAscBy().getItems()
  return Term(this.getName(), this.getMemo(), ...sortedDefs)
}
/**
 * Clone an instance while adding one or more definitions.
 *
 * @param {...Quote} One or more quote objects.
 * @return {$Term}
 */
$Term.prototype.withDef = function () {
  return new $Term(this.name, this.memo, this.defs, ...arguments)
}
/**
 * Clone an instance while merging in one or more glosses.
 *
 * @param {...Quote} One or more glosses.
 * @return {$Term}
 */
$Term.prototype.withGloss = function (...glosses) {
  if (!!glosses && typeof glosses.forEach === 'function') {
    const memos = this.getMemos()
    const defs = this.getDefs()
    glosses.forEach(gloss => {
      gloss.getMemos().forEach(memo => { memos.push(memo) })
      gloss.getDefs().forEach(def => { defs.push(def) })
    })
    return Term(this.name, memos, defs)
  }
  return this
}
/**
 * Clone an instance while adding one or more memos.
 *
 * @param {...Quote} One or more values that can be coerced into a quote.
 * @return {$Term}
 */
$Term.prototype.withMemo = function () {
  const newMemo = this.memos.withQuote(this.memo, ...arguments)
  return new $Term(this.name, newMemo, this.defs)
}

function Term () {
  const obj = new $Term(...arguments)
  freeze(obj, $Term)
  return obj
}

export { Term }

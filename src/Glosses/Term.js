/**
 * $Term constructor.
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
$Term.prototype.getMemo = function () {
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

function Term () {
  const obj = new $Term(...arguments)
  freeze(obj, $Term)
  return obj
}

export { Term }

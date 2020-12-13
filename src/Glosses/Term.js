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
import { QuoteList } from '../Lists/QuoteList.js'
import { freeze } from '../Utility/freeze.js'

function validateName (aught, constructor, number) {
  number = Number.isInteger(number) ? number : 1
  const clean = castString(aught)
  if (clean === '') {
    throw new TypeError('' +
      `${constructor}: Parameter ${number} "props" must possess a "name" ` +
      'property whose value is either a string, a number, or an object that ' +
      `has a getName() method. A value with type "${typeof aught}" was ` +
      'provided.'
    )
  }
  return clean
}

function $Term (props) {
  this.name = validateName(props.name, '$Term()')
  this.memos = QuoteList({ name: 'Term memos', quotes: props.memos })
  this.defs = QuoteList({ name: 'Term definitions', quotes: props.defs })
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
  return this.name
}
/**
 * Get Properties.
 *
 * @return {Object} A plain javascript object that can be used as the props
 *   parameter to create a new instance.
 */
$Term.prototype.getProps = function () {
  const { name, memos, defs } = this
  return { name, memos, defs }
}
/**
 * Get size.
 *
 * The size of a gloss is equal to the quantity of its definitions.
 *
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
$Term.prototype.withDef = function (...defs) {
  const props = this.getProps()
  props.defs = props.defs.withQuote(...defs)
  return new this.constructor(props)
}
/**
 * Clone an instance while merging in one or more glosses.
 *
 * @param {...Quote} One or more glosses.
 * @return {$Term}
 */
$Term.prototype.withGloss = function (...glosses) {
  if (!!glosses && typeof glosses.forEach === 'function') {
    const props = this.getProps()
    glosses.forEach(gloss => {
      props.memos = props.memos.withQuote(...gloss.getMemos())
      props.defs = props.defs.withQuote(...gloss.getDefs())
    })
    return new $Term(props)
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
  const props = this.getProps()
  props.memos = props.memos.withQuote(this.memo, ...arguments)
  return new this.constructor(props)
}

function Term (name, memos, ...defs) {
  const obj = new $Term({ name, memos, defs })
  freeze(obj, $Term)
  return obj
}

export { Term }

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
  this.memos = QuoteList({ name: 'Term memos', items: props.memos })
  this.defs = QuoteList({ name: 'Term definitions', items: props.defs })
  this.length = this.defs.length
}
/**
 * Return a frozen instance of $Term.
 */
$Term.makeFrozen = function () {
  const o = new $Term(...arguments)
  freeze(o, $Term)
  return o
}
$Term.prototype.getDef = function (index) {
  return this.defs.get(index)
}
$Term.prototype.getDefs = function () {
  return this.defs.entries()
}
$Term.prototype.getMemo = function (index) {
  switch (this.memos.length) {
    case 0 :
      return ''
    case 1 :
      return this.memos.get(0)
    default :
      return this.memos.get(index)
  }
}
$Term.prototype.getMemos = function () {
  return this.memos.entries()
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
 * @return {bool}
 */
$Term.prototype.hasDef = function () {
  return this.defs.length > 0
}
/**
 * @return {$Term}
 */
$Term.prototype.sortDefsByName = function () {
  const sortedDefs = this.defs.sortAscBy().entries()
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
  props.defs = props.defs.add(...defs)
  return new this.constructor(props)
}
/**
 * Add one or more references to all definitions of this term.
 *
 * @param {string} ref One or more strings representing the key of a reference.
 */
$Term.prototype.withDefRef = function (...ref) {
  const defs = []
  this.defs.forEach(def => {
    defs.push(def.withRef(...ref))
  })

  if (defs.length === 0) {
    return this
  }

  const props = this.getProps()
  props.defs = defs
  return $Term.makeFrozen(props)
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
      props.memos = props.memos.add(...gloss.getMemos())
      props.defs = props.defs.add(...gloss.getDefs())
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
$Term.prototype.withMemo = function (...memos) {
  const props = this.getProps()
  props.memos = props.memos.add(memos)
  return new this.constructor(props)
}

function Term (name, memos, ...defs) {
  return $Term.makeFrozen({ name, memos, defs })
}

export { Term }

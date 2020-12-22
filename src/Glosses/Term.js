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

import { AbstractNamed } from '../Abstracts/AbstractNamed.js'
import { $DefList } from '../Defs/DefList.js'
import { $QuoteList } from '../Lists/QuoteList.js'
import { $RefList } from '../Refs/RefList.js'
import { freeze } from '../Utility/freeze.js'

function $Term (props) {
  AbstractNamed.call(this, props)
  const { defs, memos, refs } = props
  this.memos = new $QuoteList(memos)
  this.defs = new $DefList(defs)
  this.refs = new $RefList(refs)
  this.length = this.defs.length
  Object.freeze(this)
}

$Term.prototype = Object.create(AbstractNamed.prototype)

Object.defineProperty($Term.prototype, 'constructor', { value: $Term })

/**
 * Return a frozen instance of $Term.
 */
$Term.makeFrozen = function () {
  const o = new $Term(...arguments)
  freeze(o, $Term)
  return o
}
/**
 * Clone an instance while adding one or more definitions.
 *
 * @param {...Quote} One or more quote objects.
 * @return {$Term}
 */
$Term.prototype.as = function (...defs) {
  const props = this.getProps()
  props.defs = props.defs.add(...defs)
  return new this.constructor(props)
}
$Term.prototype.def = function (index) {
  return this.defs.get(index)
}
/**
 * Clone an instance while appending one or more references.
 *
 * Note: these references serve to form a segment of a reference path. They are
 *   not to be thought of as references from different sources, rather those
 *   that add specificity. The first reference passed should be the broadest
 *   with each consecutive ref getting more and more specific. For example:
 *   Earth, Antarctica, Ross Ice Shelf shows the appropriate order as does:
 *   Frankenstein, Chapter 1, Page 10
 *
 * @param {...Ref} One or more reference objects.
 * @return {$Term}
 */
$Term.prototype.from = function (...refs) {
  const clean = new $RefList(...refs)
  if (clean.length === 0) {
    return this
  }
  const props = this.getProps()
  props.refs = props.refs.add(clean)
  return new this.constructor(props)
}
$Term.prototype.getDefs = function () {
  return this.defs.entries()
}
$Term.prototype.getMemo = function (index) {
  switch (this.memos.length) {
    case 0 :
      return undefined
    case 1 :
      return this.memos.get(0)
    default :
      return this.memos.get(index)
  }
}
$Term.prototype.getMemos = function () {
  return this.memos.entries()
}
/**
 * Get Properties.
 *
 * @return {Object} A plain javascript object that can be used as the props
 *   parameter to create a new instance.
 */
$Term.prototype.getProps = function () {
  const { name, memos, defs, refs } = this
  return { name, memos, defs, refs }
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
  return Term(this.name, this.getMemo(), ...sortedDefs)
}
/**
 * Add one reference to all definitions of this term.
 *
 * @param {string} ref One or more strings representing the key of a reference.
 */
$Term.prototype.withDefRef = function (ref) {
  const defs = []
  this.defs.forEach(def => {
    defs.push(def.from(ref))
  })

  if (defs.length === 0) {
    return this
  }

  const props = this.getProps()
  props.defs = defs

  return new $Term(props)
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

Object.freeze($Term.prototype)

function Term (name, memos, ...defs) {
  return $Term.makeFrozen({ name, memos, defs })
}

export { $Term, Term }

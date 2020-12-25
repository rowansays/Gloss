/**
 * Gloss factory.
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

import { castString } from '../Utility/cast.js'
import { $DefList } from '../Constructor/DefList.js'
import { $Quote } from '../Constructor/Quote.js'
import { $QuoteList } from '../Constructor/QuoteList.js'
import { $RefList } from '../Constructor/RefList.js'

function $Gloss (props) {
  const { defs, name, memos, refs } = props || {}
  this.name = castString(name)
  this.memos = new $QuoteList(memos)
  this.defs = new $DefList(defs)
  this.refs = new $RefList(refs)
  this.length = this.defs.length
  Object.freeze(this)
}

$Gloss.prototype = Object.create(null)

Object.defineProperty($Gloss.prototype, 'constructor', { value: $Gloss })

/**
 * Creates a new instance which prepends all references in `this.refs` to every
 *   quote in each definition.
 *
 * @return {$Gloss} A new instance with modified definitions and quotes. If
 *   `this.refs` is empty than `this` will be returned.
 */
$Gloss.prototype.applyRefs = function () {
  if (this.defs.length === 0 || this.refs.length === 0) {
    return this
  }

  const defs = []
  this.defs.forEach(def => {
    defs.push(def.from(...this.refs))
  })

  const props = this.getProps()
  props.defs = defs

  return new this.constructor(props)
}
/**
 * Clone an instance while adding one or more definitions.
 *
 * @param {...Quote} One or more quote objects.
 * @return {$Gloss}
 */
$Gloss.prototype.as = function (...defs) {
  const props = this.getProps()
  props.defs = props.defs.add(...defs)
  return new this.constructor(props)
}
$Gloss.prototype.def = function (index) {
  return this.defs.get(index)
}
/**
 * Clone an instance while appending one or more references.
 *
 * This method only alters the value of this term's `refs` property. The
 *   individual definitions will not be affected. $Gloss.prototype.applyRefs()
 *   may be used to apply the Gloss's references to each quote in each
 *   definition.
 *
 * Note: these references serve to form a segment of a reference path. They are
 *   not to be thought of as references from different sources, rather those
 *   that add specificity. The first reference passed should be the broadest
 *   with each consecutive ref getting more and more specific. For example:
 *   Earth, Antarctica, Ross Ice Shelf shows the appropriate order as does:
 *   Frankenstein, Chapter 1, Page 10
 *
 * @param {...Ref} One or more reference objects.
 * @return {$Gloss}
 */
$Gloss.prototype.from = function (...refs) {
  const clean = new $RefList(...refs)
  if (clean.length === 0) {
    return this
  }
  const props = this.getProps()
  props.refs = props.refs.add(...clean)
  return new this.constructor(props)
}
$Gloss.prototype.getMemo = function (index) {
  switch (this.memos.length) {
    case 0 :
      return undefined
    case 1 :
      return this.memos.get(0)
    default :
      return this.memos.get(index)
  }
}
/**
 * Get Properties.
 *
 * @return {Object} A plain javascript object that can be used as the props
 *   parameter to create a new instance.
 */
$Gloss.prototype.getProps = function () {
  const { name, memos, defs, refs } = this
  return { name, memos, defs, refs }
}
/**
 * @return {bool}
 */
$Gloss.prototype.hasDef = function () {
  return this.defs.length > 0
}
/**
 * Add one quote to a new instance.
 *
 * This function generates a new definition from the string supplied as
 *   parameter 1.
 *
 * @param {string} text
 * @return {$Gloss}
 */
$Gloss.prototype.quote = function (text) {
  try {
    const quote = new $Quote({ name: text })
    if (!!quote && quote.name !== '') {
      const props = this.getProps()
      props.defs = props.defs.add(quote)
      return new this.constructor(props)
    }
    return this
  } catch (e) {
    return this
  }
}
$Gloss.prototype.ref = function (index) {
  return this.refs.get(index)
}
/**
 * Clone an instance while prepending one or more references.
 *
 * This method only alters the value of this term's `refs` property. The
 *   individual definitions will not be affected. $Gloss.prototype.applyRefs()
 *   may be used to apply the Gloss's references to each quote in each
 *   definition.
 *
 * @param {...Ref} One or more reference objects.
 * @return {$Gloss}
 */
$Gloss.prototype.root = function (...refs) {
  const clean = new $RefList(...refs)
  if (clean.length === 0) {
    return this
  }
  const props = this.getProps()
  props.refs = clean.add(...props.refs)
  return new this.constructor(props)
}
/**
 * @return {$Gloss}
 */
$Gloss.prototype.sortDefsByName = function () {
  return new this.constructor({
    name: this.name,
    memos: this.getMemo(),
    defs: this.defs.sortAscBy().entries()
  })
}
/**
 * Clone an instance while merging in one or more glosses.
 *
 * @param {...Quote} One or more glosses.
 * @return {$Gloss}
 */
$Gloss.prototype.withGloss = function (...glosses) {
  if (!!glosses && typeof glosses.forEach === 'function') {
    const props = this.getProps()
    glosses.forEach(gloss => {
      props.memos = props.memos.add(...gloss.memos)
      props.defs = props.defs.add(...gloss.defs)
    })
    return new $Gloss(props)
  }
  return this
}
/**
 * Clone an instance while adding one or more memos.
 *
 * @param {...Quote} One or more values that can be coerced into a quote.
 * @return {$Gloss}
 */
$Gloss.prototype.withMemo = function (...memos) {
  const props = this.getProps()
  props.memos = props.memos.add(memos)
  return new this.constructor(props)
}

Object.freeze($Gloss.prototype)

export { $Gloss }

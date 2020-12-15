/**
 * Quote factory.
 *
 * A Quote is the simplest form of gloss. Instances contain a name, zero or more
 * memos, and zero or more Quoteinitions.
 *
 * @param {string|Quote|QuoteList} name Required.
 * @param {Array|QuoteList} memos.
 * @param {...Quote|...String} Quoteinitions.
 *
 * @prop {Quote} name
 * @prop {QuoteList} memos
 * @prop {QuoteList} Quoteinitions
 */

import { castString } from '../Utility/castString.js'
import { castStringArray } from '../Utility/castStringArray.js'
import { freeze } from '../Utility/freeze.js'
import { isQuote } from '../Utility/isQuote.js'

function $Quote (...quotes) {
  if (quotes.length < 1) {
    throw new Error('no quotes')
  }

  const map = Object.create(null)
  const refs = []

  quotes.forEach((aught, i) => {
    aught = isQuote(aught) ? aught.getProps() : aught
    aught = Array.isArray(aught) ? aught : [aught]
    aught.forEach(dirty => {
      const name = castString(dirty.name)
      const refStrings = castStringArray(dirty.refs)
      const refNumbers = []
      refStrings.forEach(ref => {
        let index = refs.indexOf(ref)
        if (index === -1) {
          index = refs.length
          refs.push(ref)
        }
        refNumbers.push(index)
      })

      if (name === '') {
        throw new Error('Invalid name')
      }

      if (typeof this.name === 'undefined') {
        this.name = name
      }

      map[name] = Array.isArray(map[name])
        ? [...map[name], ...refNumbers]
        : refNumbers
    })
  })

  this.map = map
  this.refs = refs
}
/**
 * Return a frozen instance of $Quote.
 */
$Quote.makeFrozen = function () {
  const o = new $Quote(...arguments)
  freeze(o, $Quote)
  return o
}
$Quote.prototype.forEach = function (func) {
  return this.getProps().forEach((...args) => {
    const quote = $Quote.makeFrozen(args[0])
    func(quote, ...args.slice(1))
  })
}
$Quote.prototype.getAltNames = function () {
  return Object.keys(this.map).slice(1)
}
/**
 * Get frequency.
 *
 * @return {number} int (>= 0) - The total number of unique sources in which
 *   this phrase and all of it's derivatives appear.
 */
$Quote.prototype.getFreq = function () {
  return this.refs.length
}
$Quote.prototype.getName = function () {
  return this.name
}
/**
 * Get size.
 *
 * @return {number} int (>= 0) - The total number of unique phrases represented
 *   in this instance.
 */
$Quote.prototype.getSize = function () {
  return Object.keys(this.map).length
}
/**
 * Get Properties.
 *
 * @return {Object} A plain javascript object that can be used as the props
 *   parameter to create a new instance.
 */
$Quote.prototype.getProps = function () {
  const o = []
  Object.keys(this.map).forEach(name => {
    const refs = this.map[name].reduce((output, index) => {
      output.push(this.refs[index])
      return output
    }, [])
    o.push({ name, refs })
  })
  return o
}
$Quote.prototype.getRefs = function (key) {
  if (typeof key === 'undefined') {
    return this.refs
  } else if (Array.isArray(this.map[key])) {
    return this.map[key]
  }
}
$Quote.prototype.hasRef = function (key) {
  return this.refs.indexOf(key) > -1
}
$Quote.prototype.isSingular = function () {
  return Object.keys(this.map).length === 1
}
$Quote.prototype.slice = function () {
  return $Quote.makeFrozen(this.getProps().slice(...arguments))
}
$Quote.prototype.withQuote = function (...quotes) {
  return $Quote.makeFrozen(...this.getProps().concat(quotes))
}
/**
 * Add one or more references to this quote.
 */
$Quote.prototype.withRef = function (...refs) {
  const props = []
  this.getProps().forEach(prop => {
    prop.refs = prop.refs.concat(refs)
    props.push(prop)
  })
  return $Quote.makeFrozen(...props)
}

function Quote () {
  return $Quote.makeFrozen(...arguments)
}

function Phrase (name, ref) {
  return $Quote.makeFrozen({ name: name, refs: [ref] })
}

function Normal (normal, actual, ref) {
  return $Quote.makeFrozen(
    { name: normal, refs: [] },
    { name: actual, refs: [ref] }
  )
}

export { Quote, Phrase, Normal }

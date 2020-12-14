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

  quotes.forEach((aught, i) => {
    aught = isQuote(aught) ? aught.getProps() : aught
    aught = Array.isArray(aught) ? aught : [aught]
    aught.forEach(dirty => {
      const name = castString(dirty.name)
      const refs = castStringArray(dirty.refs)
      if (name === '') {
        throw new Error('Invalid name')
      }

      if (typeof this.name === 'undefined') {
        this.name = name
      }

      map[name] = Array.isArray(map[name])
        ? [...refs, ...map[name]]
        : refs
    })
  })

  this.map = map
  this.size = Object.keys(map).length
  this.freq = this.getRefs().length
}
/**
 * Return a frozen instance of $Quote.
 */
$Quote.makeFrozen = function () {
  const o = new $Quote(...arguments)
  freeze(o, $Quote)
  return o
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
  return this.freq
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
  return this.size
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
    o.push({ name: name, refs: this.map[name] })
  })
  return o
}
$Quote.prototype.getRefs = function (key) {
  if (typeof key === 'undefined') {
    let o = []
    Object.keys(this.map).forEach(Quote => {
      o = o.concat(this.map[Quote])
    })
    return Array.from(new Set(o)).filter(castString).filter(Boolean)
  } else if (Array.isArray(this.map[key])) {
    return this.map[key]
  }
}
$Quote.prototype.isSingular = function () {
  return Object.keys(this.map).length === 1
}
$Quote.prototype.withQuote = function (...quotes) {
  return $Quote.makeFrozen(...this.getProps().concat(quotes))
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

/**
 * Quote list factory
 *
 * A quote list is a flat list of unique, non-empty quote objects.
 *
 * @param {...Quote|QuoteList|Array|string|number} quotes
 */

import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { castString } from '../Utility/castString.js'
import { isList } from '../Utility/isList.js'
import { isQuote } from '../Utility/isQuote.js'
import { Phrase } from '../Quotes/Phrase.js'
import { freeze } from '../Utility/freeze.js'

/**
 * Parse quotes parameter.
 *
 * Robust function which accepts just about any value that can be converted to
 * a quote.
 *
 * @param {Array|Quote|QuoteList|string} param
 * @return {Quote[]} A flat array of quotes.
 */
function parseQuotes (...params) {
  let output = []
  params = Array.isArray(params) ? params : []
  params.forEach(param => {
    if (typeof param === 'string' || typeof param === 'number') {
      const clean = castString(param)
      if (clean !== '') {
        output.push(Phrase(param))
      }
    } else if (isQuote(param)) {
      output.push(param)
    } else if (isList(param)) {
      param.forEach(subParam => {
        output.push(subParam)
      })
    } else if (Array.isArray(param)) {
      output = output.concat(parseQuotes(...param))
    }
  })
  return output
}
/**
 * Merge quotes.
 *
 * Merges all duplicate quotes into single quotes containing multiple
 * references. To illustrate:
 *
 * Input array: [
 *   Phrase { value: 'Alice', references: ['aaiw:movie'] },
 *   Phrase { value: 'Alice', references: ['aaiw:book'] },
 *   Phrase { value: 'Alice', references: ['aaiw:comic'] },
 *   Phrase { value: 'Wonderland', references: ['aaiw:book'] },
 * ]
 *
 * Output array: [
 *   Phrase { value: 'Alice', references: ['aaiw:movie', 'aaiw:book', 'aaiw:comic'] },
 *   Phrase { value: 'Wonderland', references: ['encyclopedia'] },
 * ]
 *
 * @param {Quote[]} A flat array of {Quote} objects.
 * @return {Quote{}} A flat array of {Quote} objects with duplicates merged.
 */
function mergeQuotes (quotes) {
  quotes = Array.isArray(quotes) ? quotes : []

  const map = new Map()
  quotes.forEach(quote => {
    const key = quote.getName()
    if (map.has(key) && quote.hasReference()) {
      // merge quotes with the same name.
      map.set(key, map.get(key).withReference(...quote.getReferences()))
    } else {
      // Add new quote to the list.
      map.set(key, quote)
    }
  })

  return Array.from(map.values())
}

function $QuoteList () {
  AbstractObjectList.call(this)
  const parsed = parseQuotes(...arguments)
  const merged = mergeQuotes(parsed)
  this.items = merged
}

$QuoteList.prototype = Object.create(AbstractObjectList.prototype)

$QuoteList.prototype.getItemName = function (index) {
  return this.getItem(index).getName()
}

/**
 * Determine if a quote exists in the list by name.
 *
 * @return {boolean}
 */
$QuoteList.prototype.has = function (name) {
  for (let i = 0; i < this.getSize(); i++) {
    if (this.getItem(i).getName() === name) {
      return true
    }
  }
  return false
}
$QuoteList.prototype.withQuote = function () {
  return new $QuoteList(...this.items, ...arguments)
}

Object.defineProperty($QuoteList.prototype, 'constructor', {
  value: $QuoteList
})

function QuoteList () {
  const obj = new $QuoteList(...arguments)
  freeze(obj, $QuoteList)
  return obj
}

export { QuoteList }

/**
 * Quote list factory
 *
 * A quote list is a flat list of unique, non-empty quote objects.
 *
 * @param {...Quote|QuoteList|Array|string|number} quotes
 */

import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { freeze } from '../Utility/freeze.js'
import { isQuote } from '../Utility/predicate.js'

function $QuoteList (...quotes) {
  AbstractObjectList.call(this)
  const parsed = AbstractObjectList.parseArgs(isQuote, quotes)
  this.items = parsed
  this.length = parsed.length

  /*
  const parsed = AbstractObjectList.parseArgs(isQuote, quotes)
  const merged = mergeQuotes(parsed)
  this.items = merged
  this.length = merged.length
  */
}

$QuoteList.prototype = Object.create(AbstractObjectList.prototype)

Object.defineProperty($QuoteList.prototype, 'constructor', {
  value: $QuoteList
})

$QuoteList.prototype.reduceQuotes = function () {
  const reduced = []
  this.items.forEach(quote => {
    reduced.push(quote.reduce())
  })
  return new this.constructor(reduced)
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
export function mergeQuotes (quotes) {
  quotes = Array.isArray(quotes) ? quotes : []

  const map = new Map()
  quotes.forEach(quote => {
    const key = quote.name
    if (map.has(key)) {
      // merge quotes with the same name.
      map.set(key, map.get(key).withQuote(quote))
    } else {
      // Add new quote to the list.
      map.set(key, quote)
    }
  })

  return Array.from(map.values())
}
function QuoteList (...props) {
  const obj = new $QuoteList(...props)
  freeze(obj, $QuoteList)
  return obj
}

export { $QuoteList, QuoteList }

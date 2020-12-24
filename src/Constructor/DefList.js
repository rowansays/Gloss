/**
 * Quote list factory
 *
 * A quote list is a flat list of unique, non-empty quote objects.
 *
 * @param {...Quote|QuoteList|Array|string|number} quotes
 */

import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { isDef, isQuote } from '../Utility/predicate.js'
import { Def } from '../Constructor/Def.js'

/**
 * Definiton List.
 *
 * $params {...$Def|$Quote} Zero of more definitions or quotes or an mixture
 *   thereof.
 */
function $DefList (...items) {
  AbstractObjectList.call(this)
  const isValidItem = (x) => isDef(x) || isQuote(x)
  const parsed = AbstractObjectList.parseArgs(isValidItem, items)

  // Extract all quotes from parseditems.
  const quotes = []
  parsed.forEach(item => {
    if (isQuote(item)) {
      quotes.push(item)
    } else if (isDef(item)) {
      item.quotes.forEach(quote => {
        quotes.push(quote)
      })
    }
  })

  const map = new Map()
  quotes.forEach(quote => {
    const key = quote.name
    if (map.has(key)) {
      map.get(key).push(quote)
    } else {
      map.set(key, [quote])
    }
  })

  const defs = []
  for (const key of map.keys()) {
    const def = Def(...map.get(key))
    defs.push(def)
  }

  this.items = defs
  this.length = defs.length
  Object.freeze(this)
}

$DefList.prototype = Object.create(AbstractObjectList.prototype)

Object.defineProperty($DefList.prototype, 'constructor', {
  value: $DefList
})

$DefList.prototype.reduceQuotes = function () {
  const reduced = []
  this.items.forEach(quote => {
    reduced.push(quote.reduce())
  })
  return new this.constructor(reduced)
}

Object.freeze($DefList.prototype)

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

function DefList (...items) {
  return new $DefList(...items)
}

export { $DefList, DefList }

/**
 * Quote list factory
 *
 * A quote list is a flat list of unique, non-empty quote objects.
 *
 * @param {...Quote|QuoteList|Array|string|number} quotes
 */

import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { freeze } from '../Utility/freeze.js'
import { mergeQuotes } from '../Utility/mergeQuotes.js'
import { parseQuotes } from '../Utility/parseQuotes.js'

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

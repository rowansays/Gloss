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

function $QuoteList (props) {
  AbstractObjectList.call(this, props)
  const parsed = parseQuotes(props.items)
  const merged = mergeQuotes(parsed)
  this.items = merged
  this.length = merged.length
}

$QuoteList.prototype = Object.create(AbstractObjectList.prototype)

$QuoteList.prototype.getItemName = function (index) {
  return this.get(index).getName()
}

$QuoteList.prototype.withQuote = function () {
  return new $QuoteList({
    name: this.name,
    items: [...this.items, ...arguments]
  })
}

Object.defineProperty($QuoteList.prototype, 'constructor', {
  value: $QuoteList
})

function QuoteList (props) {
  const obj = new $QuoteList(props)
  freeze(obj, $QuoteList)
  return obj
}

export { QuoteList }

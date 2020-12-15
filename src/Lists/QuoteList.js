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
}

$QuoteList.prototype = Object.create(AbstractObjectList.prototype)

$QuoteList.prototype.getItemName = function (index) {
  return this.get(index).getName()
}

/**
 * Determine if a quote exists in the list by name.
 *
 * @return {boolean}
 */
$QuoteList.prototype.has = function (name) {
  for (let i = 0; i < this.getSize(); i++) {
    if (this.get(i).getName() === name) {
      return true
    }
  }
  return false
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

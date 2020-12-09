import { AbstractObjectList, castString, isList, isQuote, Phrase } from '../../index.js'
import { freeze } from '@mfields/lib/.internal/freeze.js'

/**
 * Parse quotes parameter.
 *
 * @param {Array|Quote|QuoteList|string} param
 * @return {Array}
 */
function parseQuotes (...params) {
  const output = []
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
      const subParams = parseQuotes(param)
      subParams.forEach(subParam => {
        output.push(subParam)
      })
    }
  })
  return output
}
function mergeQuotes (quotes) {
  quotes = Array.isArray(quotes) ? quotes : []

  const map = new Map()
  quotes.forEach(quote => {
    const key = quote.getName()
    if (map.has(key) && quote.hasReference()) {
      map.set(key, map.get(key).withReference(...quote.getReferences()))
    } else {
      map.set(key, quote)
    }
  })

  return Array.from(map.values())
}

function $QuoteList (...quotes) {
  AbstractObjectList.call(this)
  const parsed = parseQuotes(...quotes)
  const merged = mergeQuotes(parsed)
  this.items = merged
}

$QuoteList.prototype = Object.create(AbstractObjectList.prototype)

$QuoteList.prototype.getItemName = function (index) {
  return this.getItem(index).getName()
}

/**
 * Determine if a gloss exists in the list by name.
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

Object.defineProperty($QuoteList.prototype, 'constructor', {
  value: $QuoteList
})

function QuoteList () {
  const obj = new $QuoteList(...arguments)
  freeze(obj, $QuoteList)
  return obj
}

export { QuoteList }

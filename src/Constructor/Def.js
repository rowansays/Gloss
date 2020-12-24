import { castString } from '../Utility/cast.js'
import { $QuoteList } from '../Constructor/QuoteList.js'
import { isDef, isQuote } from '../Utility/predicate.js'
import { $RefList } from '../Refs/RefList.js'

/**
 * A definition is a named list of normalized quotes.
 *
 * @param {...Quote|...Def} items Zero or more objects that represent
 *   definitions or quotes.
 */
function $Def (...items) {
  let name
  const quotes = []
  items.forEach(item => {
    if (isQuote(item)) {
      quotes.push(item)
    } else if (isDef(item)) {
      item.quotes.forEach(quote => {
        quotes.push(quote)
      })
    }
  })

  quotes.forEach(quote => {
    if (typeof name === 'undefined') {
      name = quote.name
    } else if (name !== quote.name) {
      throw new Error('' +
      'Only quotes with same name may be provided to $Def(). ' +
      `
      * Def name: "${name}"
      * Quote name: "${quote.name}"`
      )
    }
  })

  Object.defineProperties(this, {
    name: { enumerable: true, value: castString(name) },
    length: { enumerable: true, value: quotes.length },
    quotes: { enumerable: true, value: new $QuoteList(quotes) }
  })

  Object.freeze(this)
}

$Def.prototype = Object.create(null)

Object.defineProperty($Def.prototype, 'constructor', {
  value: $Def
})

/**
 * Add one or more refs to each quote contained by this definition.
 */
$Def.prototype.from = function (...refs) {
  const refList = new $RefList(...refs)
  if (refList.length === 0) {
    return this
  }
  const quotes = []
  this.quotes.forEach(quote => {
    quotes.push(quote.from(...refList))
  })
  return new $Def(...quotes)
}
$Def.prototype.mapBy = function (type) {
  const getValue = (quote) => {
    switch (type) {
      case 'year':
        return quote.ref(0).datePublished
      case 'datePublished': return quote.ref(0).datePublished
      default : throw new Error('Unsupported map type.')
    }
  }
  const map = new Map()
  this.quotes.forEach(quote => {
    const key = getValue(quote)
    const value = map.has(key) ? map.get(key).concat(quote) : [quote]
    map.set(key, value)
  })
  return map
}
$Def.prototype.quote = function (index) {
  return this.quotes.get(index)
}
/**
 * Return a list of unique references from all quotes within this definition.
 * @return {$RefList}
 */
$Def.prototype.refs = function () {
  return new $RefList(this.quotes.column('refs'))
}

Object.freeze($Def.prototype)

export { $Def }

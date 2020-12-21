import { isQuote } from '../Utility/predicate.js'

/**
 * Quote constructor.
 *
 * Creates instances containing one or more quotations from an optional
 *   reference.
 *
 * @class Quote
 * @prop {number} length - The number of values contained within this quote.
 *   This number includes the quote's name as well as the names of all its
 *   analogs.
 * @prop {number} mentions - The number of times that this quote, or one of its
 *   analogs appear across all of its references.
 *
 * @param {...AbstractQuote|...Object} quotes Zero or more objects that represent a
 *   quote. Recognized values include instances of AbstractQuote or any object with
 *   the following properties:
 *
 *      1. name {string} Any value that can be coerced to a string.
 *      2. refs {string[]} An array of values that can be coerced to strings.
 *
 * @return {AbstractQuote}
 */
function AbstractQuote (...quotes) {
  if (quotes.length < 1) {
    throw new Error('AbstractQuote() - No quotes were passed to the constructor.')
  }

  let mentions = 0
  let clean = []
  const refs = []
  quotes.forEach((quote, i) => {
    let newQuotes
    if (isQuote(quote)) {
      newQuotes = quote.quotes
    } else {
      if (typeof this.constructor.parseQuote !== 'function') {
        throw new TypeError('' +
          `The constructor ${this.constructor.name}() must provide a static ` +
          'method named parseQuote() that validates and sanitizes incoming ' +
          'Quote data. No such method was found by AbstractQuote().'
        )
      }
      newQuotes = this.constructor.parseQuote(quote, i)
    }

    mentions = newQuotes.reduce((a, b) => a + b.refs.length, mentions)
    clean = clean.concat(newQuotes)
  })

  clean.forEach(quote => {
    quote.refs.forEach(ref => {
      if (refs.indexOf(ref) === -1) {
        refs.push(ref)
      }
    })
  })

  Object.defineProperties(this, {
    name: { enumerable: true, value: clean[0].name },
    from: { enumerable: true, value: clean[0].from },
    desc: { enumerable: true, value: clean[0].desc },
    length: { enumerable: true, value: clean.length },

    mentions: { enumerable: true, value: mentions },
    quotes: { enumerable: true, value: clean },
    refs: { enumerable: true, value: refs }
  })
}

AbstractQuote.prototype = Object.create(null)

/**
 * @param {string} The value to map by
 * @return {Map}
 */
AbstractQuote.prototype.mapBy = function (type) {
  const getValue = (quote) => {
    switch (type) {
      case 'datePublished': return quote.getRef(0).datePublished
      default : throw new Error('Unsupported map type.')
    }
  }
  const map = new Map()
  this.flatten().forEach(quote => {
    const key = getValue(quote)
    const value = map.has(key) ? map.get(key).concat(quote) : [quote]
    map.set(key, value)
  })
  return map
}
/**
 * @return {AbstractQuote[]}
 */
AbstractQuote.prototype.flatten = function () {
  return this.getProps().reduce((output, props) => {
    output.push(new this.constructor(props))
    return output
  }, [])
}
AbstractQuote.prototype.forEach = function (func) {
  return this.getProps().forEach((...args) => {
    const quote = new this.constructor(args[0])
    func(quote, ...args.slice(1))
  })
}
AbstractQuote.prototype.getAltNames = function () {
  return Object.keys(this.map).slice(1)
}
/**
 * Get Properties.
 *
 * @return {Object} A plain javascript object that can be used as the props
 *   parameter to create a new instance.
 */
AbstractQuote.prototype.getProps = function () {
  return this.quotes
}
AbstractQuote.prototype.getRef = function (key) {
  return this.refs.get(key)
}
AbstractQuote.prototype.hasRef = function (key) {
  return this.refs.indexOf(key) > -1
}
AbstractQuote.prototype.isSingular = function () {
  return this.length === 1
}
AbstractQuote.prototype.slice = function () {
  return new this.constructor(this.getProps().slice(...arguments))
}
AbstractQuote.prototype.withQuote = function (...quotes) {
  return new this.constructor(...this.quotes.concat(quotes))
}
/**
 * Add one or more references to this quote.
 *
 * The provided reference(s) will be added to all quotations represented by
 * this instance.
 *
 * @param {string} ref One or more strings representing the key of a reference.
 */
AbstractQuote.prototype.withRef = function (...refs) {
  const props = []
  Array.from(this.quotes).forEach(prop => {
    prop.refs = prop.refs.concat(refs)
    props.push(prop)
  })
  return new this.constructor(...props)
}

export { AbstractQuote }

import { castString } from '../Utility/castString.js'
import { freeze } from '../Utility/freeze.js'
import { isQuote } from '../Utility/isQuote.js'
import { ReferenceList } from '../Lists/ReferenceList.js'
import { isReference } from '../Utility/isReference.js'
import { validateStringProp } from '../Utility/validate.js'

/**
 * Quote constructor.
 *
 * Creates instances containing one or more quotations from a reference.
 *
 * @param {...$Quote|Object} quotes Zero or more objects that represent a
 *   quote. Recognized values include instances of $Quote or any object with
 *   the following properties:
 *
 *      1. name {string} Any value that can be coerced to a string.
 *      2. refs {string[]} An array of values that can be coerced to strings.
 *
 * @return {$Quote}
 */
function $Quote (...quotes) {
  if (quotes.length < 1) {
    throw new Error('$Quote() - No quotes were passed to the constructor.')
  }

  const map = Object.create(null)
  const refs = []

  quotes.forEach((aught, i) => {
    aught = isQuote(aught) ? aught.getProps() : aught
    aught = Array.isArray(aught) ? aught : [aught]
    aught.forEach(prop => {
      prop = validateQuoteProp('$Quote', prop)

      const refNumbers = []
      const refList = ReferenceList(...prop.refs)
      refList.forEach(ref => {
        let index = refs.indexOf(ref)
        if (index === -1) {
          index = refs.length
          refs.push(ref)
        }
        refNumbers.push(index)
      })

      const name = castString(prop.name)
      if (name === '') {
        throw new Error('Invalid name')
      }

      if (typeof this.name === 'undefined') {
        this.name = name
      }

      map[name] = Array.isArray(map[name])
        ? [...map[name], ...refNumbers]
        : refNumbers
    })
  })

  this.length = Object.keys(map).length
  this.map = map
  this.mentions = 0
  for (const key in this.map) {
    this.mentions = this.mentions + this.map[key].length
  }
  this.refs = ReferenceList(...refs)
}
/**
 * Return a frozen instance of $Quote.
 */
$Quote.makeFrozen = function () {
  const o = new $Quote(...arguments)
  freeze(o, $Quote)
  return o
}
$Quote.prototype.forEach = function (func) {
  return this.getProps().forEach((...args) => {
    const quote = $Quote.makeFrozen(args[0])
    func(quote, ...args.slice(1))
  })
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
  return this.refs.length
}
$Quote.prototype.getName = function () {
  return this.name
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
    const refs = this.map[name].reduce((output, index) => {
      output.push(this.getRef(index))
      return output
    }, [])
    o.push({ name, refs })
  })
  return o
}
$Quote.prototype.getRefs = function (key) { // Find a use-case for this :)
  if (typeof key === 'undefined') {
    return this.refs
  } else if (Array.isArray(this.map[key])) {
    return this.map[key]
  }
}
$Quote.prototype.getRef = function (key) {
  return this.refs.get(key)
}
$Quote.prototype.hasRef = function (key) {
  return this.refs.has(key)
}
$Quote.prototype.isSingular = function () {
  return Object.keys(this.map).length === 1
}
$Quote.prototype.slice = function () {
  return $Quote.makeFrozen(this.getProps().slice(...arguments))
}
$Quote.prototype.withQuote = function (...quotes) {
  return $Quote.makeFrozen(...this.getProps().concat(quotes))
}
/**
 * Add one or more references to this quote.
 *
 * The provided reference(s) will be added to all quotations represented by
 * this instance.
 *
 * @param {string} ref One or more strings representing the key of a reference.
 */
$Quote.prototype.withRef = function (...refs) {
  const props = []
  this.getProps().forEach(prop => {
    prop.refs = prop.refs.concat(refs)
    props.push(prop)
  })
  return $Quote.makeFrozen(...props)
}
function validateQuoteProp (funcName, aught) {
  if (typeof aught !== 'object') {
    throw new Error('prop must be an object.')
  }

  return {
    name: validateStringProp(funcName, 'props.name', aught.name),
    refs: validateRefsArrayProp(funcName, 'props.refs', aught.refs)
  }
}
function validateRefsArrayProp (funcName, paramName, aught) {
  aught = typeof aught === 'undefined' ? [] : aught

  if (!Array.isArray(aught)) {
    throw new Error('' +
      `${funcName}(): the "${paramName}" parameter must be an array. a value` +
      `with a type of "${typeof aught}" was provided.  Here is its string ` +
      `value: "${aught}".`
    )
  }

  const o = aught.filter(Boolean)

  o.forEach(ref => {
    if (!isReference(ref)) {
      throw new Error('' +
        `${funcName}(): the ${paramName} parameter must contain only ` +
        `reference objects. A value with a type of "${typeof ref}" was ` +
        `provided. Here is its string value: "${ref}".`
      )
    }
  })

  return o
}
/**
 * Quote factory.
 *
 * This function shares a signature with &Quote()
 *
 * @param {...$Quote|...Object} quotes Zero or more objects that represent a
 *   quote.
 *
 * @return {$Quote} A new quote.
 * @thorws {TypeError} When an invalid name or reference is present in
 *   arguments.
 */
function Quote () {
  return $Quote.makeFrozen(...arguments)
}

/**
 * Phrase factory.
 *
 * Create a quote from a single reference.
 *
 * @param {string} verbatim Required. The quote as it appears in the reference.
 * @param {string} [ref] The key of the reference in which this quote was taken.
 *
 * @return {$Quote} A singular quote.
 * @thorws {TypeError} When name coerces to an empty string
 */
function Phrase (verbatim, ref) {
  verbatim = validateStringProp('Phrase', 'verbatim', verbatim)
  return $Quote.makeFrozen({ name: verbatim, refs: [ref] })
}

/**
 * Normalized phrase factory.
 *
 * A normalized phrase is one that has been paraphrased to a simpler form
 * consistent with quotations from other sources.
 *
 * For example...
 *
 * Imagine that the term "Book" appears in Reference #1 and we want to quote it
 * We can use the Phrase function:
 *
 * ```
 * const book = Prase('Book', 'reference1')
 * ```
 *
 * Now imagine that the idea of a book is contained in Reference #2 however,
 * the word "Tome" is used. To allow the term "Tome" to be understood as a
 * "Book" we can normalize it using Normal().
 *
 * ```
 * const tome = Normal('Book', 'Tome', 'reference2')
 * ```
 *
 * Doing so will allow these 2 quotes to be understood as the same idea and
 * merged together by other processes - namely those in `QuoteList()`.
 *
 * @param {string} normal Required. The normalized form of the quote.
 * @param {string} verbatim Required. The quote as it appears in the reference.
 * @param {string} [ref] The key of the reference in which this quote was taken.
 *
 * @return {$Quote} A compound quote.
 * @thorws {TypeError} When name coerces to an empty string
 */
function Normal (normal, verbatim, ref) {
  normal = validateStringProp('Normal', 'normal', normal)
  verbatim = validateStringProp('Normal', 'verbatim', verbatim)
  return $Quote.makeFrozen(
    { name: normal, refs: [] },
    { name: verbatim, refs: [ref] }
  )
}

export { Quote, Phrase, Normal }

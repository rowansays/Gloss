import { castString } from '../Utility/cast.js'
import { isQuote, isRef } from '../Utility/predicate.js'
import { RefList } from '../Refs/RefList.js'
import { validateStringProp } from '../Utility/validate.js'

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
 * @param {...$Quote|...Object} quotes Zero or more objects that represent a
 *   quote. Recognized values include instances of $Quote or any object with
 *   the following properties:
 *
 *      1. name {string} Any value that can be coerced to a string.
 *      2. refs {string[]} An array of values that can be coerced to strings.
 *
 * @return {$Quote}
 */
function $Quote (props) {
  const { name, from } = props
  if (props.length < 1) {
    throw new Error('$Quote() - No props were passed to the constructor.')
  }

  const cleanName = castString(name)
  if (name === '') {
    throw new TypeError('$Quote() name property must not be empty.')
  }

  let param
  if (isQuote(props)) {
    param = props.refs
  } else if (isRef(props.ref)) {
    param = [props.ref]
  } else {
    param = []
  }

  Object.defineProperties(this, {
    name: { enumerable: true, value: cleanName },
    from: { enumerable: true, value: castString(from) },
    refs: { enumerable: true, value: RefList(...param) }
  })

  Object.freeze(this)
}

$Quote.prototype = Object.create(null)

Object.defineProperty($Quote.prototype, 'constructor', { value: $Quote })

$Quote.prototype.reduce = function () {
  if (this.from === '') {
    return this
  }
  return new $Quote({ name: this.from, ref: this.ref })
}
$Quote.prototype.ref = function (index) {
  return this.refs.get(index)
}
$Quote.prototype.withRef = function (ref) {
  if (!isRef(ref)) {
    throw new Error('' +
      '$Quote.withRef() Invalid reference passed as parameter 1.'
    )
  }
  return new $Quote({ name: this.name, from: this.from, ref: ref })
}

Object.freeze($Quote.prototype)

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
  return new $Quote(...arguments)
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
  return new $Quote({
    name: validateStringProp('Phrase', 'verbatim', verbatim),
    ref: ref
  })
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
  return new $Quote({
    name: validateStringProp('Normal', 'normal', normal),
    from: validateStringProp('Normal', 'verbatim', verbatim),
    ref: ref
  })
}

export { $Quote, Quote, Phrase, Normal }

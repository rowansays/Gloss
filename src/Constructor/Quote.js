import { castString } from '../Utility/cast.js'
import { isIterable, isRef } from '../Utility/predicate.js'
import { $RefList } from '../Constructor/RefList.js'

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
  const { name, cite } = props
  if (props.length < 1) {
    throw new Error('$Quote() - No props were passed to the constructor.')
  }

  const cleanName = castString(name)
  if (name === '') {
    throw new TypeError('$Quote() name property must not be empty.')
  }

  let param
  if (isIterable(props.refs)) {
    param = props.refs
  } else if (isRef(props.ref)) {
    param = [props.ref]
  } else {
    param = []
  }

  Object.defineProperties(this, {
    name: { enumerable: true, value: cleanName },
    cite: { enumerable: true, value: castString(cite) },
    refs: { enumerable: true, value: new $RefList(...param) }
  })

  Object.freeze(this)
}

$Quote.prototype = Object.create(null)

Object.defineProperty($Quote.prototype, 'constructor', { value: $Quote })

$Quote.prototype.from = function (...refs) {
  if (refs.length === 0) {
    return this
  }

  const param = []
  refs.forEach((ref, i) => {
    if (!isRef(ref)) {
      throw new Error('' +
        `$Quote.from() Invalid reference passed as parameter ${i + 1}.`
      )
    }
    param.push(ref)
  })

  this.refs.forEach(ref => {
    param.push(ref)
  })

  return new this.constructor({
    name: this.name,
    cite: this.cite,
    refs: param
  })
}
$Quote.prototype.map = function (func) {
  if (typeof func !== 'function') {
    throw new TypeError('$Quote.map() Parameter 1 must be a function.')
  }
  const output = []
  for (const ref of this.refs) {
    output.push(func(ref))
  }
  return output
}
$Quote.prototype.reduce = function () {
  if (this.cite === '') {
    return this
  }
  return new $Quote({ name: this.cite, refs: this.refs })
}
$Quote.prototype.ref = function (index) {
  return this.refs.get(index)
}

Object.freeze($Quote.prototype)

export { $Quote }

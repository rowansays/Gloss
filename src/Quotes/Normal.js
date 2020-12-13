/**
 * Normalized Normal factory.
 *
 * A normalized phrase is a type of actual which can be "normalized" to a local
 * term.
 *
 * @param {string|number|object} normal Required. Any value that can be coereced
 *   to a non-empty string. See Utility/castString().
 * @param {string|number|object} actual Required. Any value that can be coereced
 *   to a non-empty string. See Utility/castString().
 * @param {...string} reference
 */

import { AbstractQuote } from '../Abstracts/AbstractQuote.js'
import { castString } from '../Utility/castString.js'
import { StringList } from '../Lists/StringList.js'
import { freeze } from '../Utility/freeze.js'

function $Normal (normal, actual, ...reference) {
  normal = castString(normal)
  if (normal === '') {
    throw new Error('' +
      'Parameter 1 "normal" is required and must be a value that can be ' +
      'coereced to a non-empty string.'
    )
  } else {
    this.normal = normal
  }

  actual = castString(actual)
  if (actual === '') {
    throw new Error('' +
    'Parameter 2 "actual" is required and must be a value that can be ' +
    'coereced to a non-empty string.'
    )
  } else {
    this.actual = actual
  }

  this.references = StringList(...reference)
}

$Normal.prototype = Object.create(AbstractQuote.prototype)

Object.defineProperty($Normal.prototype, 'constructor', {
  value: $Normal
})

$Normal.prototype.getFull = function () {
  return this.actual
}
$Normal.prototype.getName = function () {
  return this.normal
}
$Normal.prototype.isAbbr = function () {
  return true
}
$Normal.prototype.withReference = function (...reference) {
  const references = this.references.withString(...reference).getItems()
  return new this.constructor(this.normal, this.actual, ...references)
}

function Normal () {
  const obj = new $Normal(...arguments)
  freeze(obj, $Normal)
  return obj
}

export { Normal }

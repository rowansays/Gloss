/**
 * Part of speech constructor.
 *
 * A part of speech is a type of quote.
 */

import { AbstractQuote, castString, StringList } from '../../index.js'
import { freeze } from '@mfields/lib/.internal/freeze.js'

function $Speech (name, $case, ...reference) {
  this.case = castString($case)
  this.name = castString(name)
  this.references = StringList(...reference)
}

$Speech.prototype = Object.create(AbstractQuote.prototype)

Object.defineProperty($Speech.prototype, 'constructor', {
  value: $Speech
})

$Speech.prototype.getFull = function () {
  if (!!this.name && !!this.case) {
    return this.name + ' ' + this.case
  } else if (!this.name) {
    return this.case
  } else if (!this.case) {
    return this.name
  } else {
    return ''
  }
}
$Speech.prototype.getName = function () {
  return this.name
}
$Speech.prototype.withReference = function (...reference) {
  const references = this.references.withString(...reference).getItems()
  return new this.constructor(this.name, this.case, ...references)
}

function Speech () {
  const obj = new $Speech(...arguments)
  freeze(obj, $Speech)
  return obj
}

export { Speech }

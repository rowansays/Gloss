/**
 * Part of speech constructor.
 *
 * A part of speech is a type of quote.
 */

import { AbstractQuote, castString, StringList } from '../../index.js'
import { freeze } from '@mfields/lib/.internal/freeze.js'

function $Pos (name, $case, ...reference) {
  this.case = castString($case)
  this.name = castString(name)
  this.references = StringList(...reference)
}

$Pos.prototype = Object.create(AbstractQuote.prototype)

Object.defineProperty($Pos.prototype, 'constructor', {
  value: $Pos
})

$Pos.prototype.getFull = function () {
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
$Pos.prototype.getName = function () {
  return this.name
}
$Pos.prototype.withReference = function (...reference) {
  const references = this.references.withString(...reference).getItems()
  return new this.constructor(this.name, this.case, ...references)
}

function Pos () {
  const obj = new $Pos(...arguments)
  freeze(obj, $Pos)
  return obj
}

export { Pos }

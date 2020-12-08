import { freeze } from '@mfields/lib/.internal/freeze.js'
import { castString } from '../../index.js'

function $Pos (name, $case, reference) {
  this.case = castString($case)
  this.name = castString(name)
  this.reference = castString(reference)
}
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
$Pos.prototype.getReference = function () {
  return this.reference
}
$Pos.prototype.withReference = function (reference) {
  return new $Pos(this.name, this.case, castString(reference))
}

/**
 * Part of speech constructor.
 *
 * A part of speech is a type of quote.
 */
function Pos () {
  const obj = new $Pos(...arguments)
  freeze(obj, $Pos)
  return obj
}

export { Pos }

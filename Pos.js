import { freeze } from '@mfields/lib/.internal/freeze.js'
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf.js'

/**
 * Part of Speech constructor.
 *
 * A part of speech is a type of citation.
 */
function Pos (source, name, $case) {
  if (!(this instanceof Pos)) {
    return makeInstanceOf(Pos, arguments)
  }

  this.case = $case && typeof $case === 'string' ? $case.trim() : ''
  this.name = name && typeof name === 'string' ? name.trim() : ''
  this.source = source && typeof source === 'string' ? source.trim() : ''

  freeze(this, Pos)
}
Pos.prototype.getName = function () {
  return this.name
}
Pos.prototype.getSource = function () {
  return this.source
}
Pos.prototype.getType = function () {
  return 'Citation'
}
Pos.prototype.getFull = function () {
  if (this.name && this.case) {
    return this.name + ' ' + this.case
  } else if (!this.name) {
    return this.case
  } else if (!this.case) {
    return this.name
  } else {
    return ''
  }
}
Pos.fromObject = function (o) {
  return new Pos(
    o && o.source ? o.source : '',
    o && o.name ? o.name : '',
    o && o.case ? o.case : ''
  )
}

export { Pos }

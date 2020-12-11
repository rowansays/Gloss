/**
 * String list
 *
 * A string list is a flat, indexed collection of non-empty, unique strings.
 *
 * @param {...string|number|NamedObject} strings Zero or more values that can
 *   be coerced to strings.
 */

import { AbstractScalarList, castString } from '../../index.js'
import { freeze } from '../Utility/freeze.js'

function $StringList (...strings) {
  AbstractScalarList.call(this)
  this.items = Array.isArray(strings)
    ? Array.from(new Set(strings)).map(castString).filter(Boolean)
    : []
}

$StringList.prototype = Object.create(AbstractScalarList.prototype)

Object.defineProperty($StringList.prototype, 'constructor', {
  value: $StringList
})

$StringList.prototype.withString = function (...string) {
  const items = this.getItems().concat(string)
  return new $StringList(...items)
}

function StringList () {
  const list = new $StringList(...arguments)
  freeze(list, $StringList)
  return list
}

export { StringList }

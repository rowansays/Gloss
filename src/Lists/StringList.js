/**
 * String list
 *
 * A string list is a flat, indexed collection of non-empty, unique strings.
 */

import { freeze } from '@mfields/lib/.internal/freeze.js'
import { AbstractScalarList } from '../../index.js'
import { castString } from '../../index.js'

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

function StringList () {
  const list = new $StringList(...arguments)
  freeze(list, $StringList)
  return list
}

export { StringList }
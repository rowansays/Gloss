import { castArray } from '../Utility/cast.js'
import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { isRef } from '../Utility/predicate.js'

function $RefList (...items) {
  AbstractObjectList.call(this)
  const filter = x => isRef(x) ? x : undefined
  const parsed = castArray(items, filter, 'recursive')
  this.items = [...new Set(parsed)]
  this.length = this.items.length
  Object.freeze(this)
}

$RefList.prototype = Object.create(AbstractObjectList.prototype)

Object.defineProperty($RefList.prototype, 'constructor', {
  value: $RefList
})

Object.freeze($RefList.prototype)

export { $RefList }

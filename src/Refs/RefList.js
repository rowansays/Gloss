import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { isRef } from '../Utility/predicate.js'

function $RefList (...refs) {
  AbstractObjectList.call(this)
  const parsed = AbstractObjectList.parseArgs(isRef, refs)
  this.items = [...new Set(parsed)]
  this.length = this.items.length
  Object.freeze(this)
}

$RefList.prototype = Object.create(AbstractObjectList.prototype)

Object.defineProperty($RefList.prototype, 'constructor', {
  value: $RefList
})

function RefList (...refs) {
  return new $RefList(...refs)
}

export { $RefList, RefList }

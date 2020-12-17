import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { freeze } from '../Utility/freeze.js'
import { isReference } from '../Utility/isReference.js'

function $ReferenceList (...refs) {
  AbstractObjectList.call(this)
  this._defaultGetMethod = 'getKey'
  this._defaultSortMethod = 'getDate'
  const parsed = AbstractObjectList.parseArgs(isReference, refs)
  this.items = parsed
  this.length = this.items.length
}

$ReferenceList.makeFrozen = function () {
  const o = new $ReferenceList(...arguments)
  freeze(o, $ReferenceList)
  return o
}

$ReferenceList.prototype = Object.create(AbstractObjectList.prototype)

Object.defineProperty($ReferenceList.prototype, 'constructor', {
  value: $ReferenceList
})

function ReferenceList () {
  return $ReferenceList.makeFrozen(...arguments)
}

export { ReferenceList }

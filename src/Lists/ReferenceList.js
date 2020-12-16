import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { freeze } from '../Utility/freeze.js'
import { isReference } from '../Utility/isReference.js'

function $ReferenceList (...refs) {
  AbstractObjectList.call(this)
  this._defaultGetMethod = 'getKey'
  this._defaultSortMethod = 'getDate'
  this.items = []
  refs.forEach(ref => {
    if (isReference(ref)) {
      this.items.push(ref)
    }
  })
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

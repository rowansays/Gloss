import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { freeze } from '../Utility/freeze.js'
import { isReference } from '../Predicates/isReference.js'

function $ReferenceList (...entries) {
  AbstractObjectList.call(this)
  this.items = []
  if (!!entries && typeof entries.forEach === 'function') {
    entries.forEach(gloss => {
      if (isReference(gloss)) {
        this.items.push(gloss)
      }
    })
  }
}

$ReferenceList.prototype = Object.create(AbstractObjectList.prototype)

Object.defineProperty($ReferenceList.prototype, 'constructor', {
  value: $ReferenceList
})

function ReferenceList () {
  const obj = new $ReferenceList(...arguments)
  freeze(obj, $ReferenceList)
  return obj
}

export { ReferenceList }

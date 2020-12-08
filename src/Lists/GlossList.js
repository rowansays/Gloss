import { freeze } from '@mfields/lib/.internal/freeze.js'
import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { isGloss } from '../Predicates/isGloss.js'

function $GlossList (...entries) {
  AbstractObjectList.call(this)
  this.items = []
  if (!!entries && typeof entries.forEach === 'function') {
    entries.forEach(gloss => {
      if (isGloss(gloss)) {
        this.items.push(gloss)
      }
    })
  }
}

$GlossList.prototype = Object.create(AbstractObjectList.prototype)

Object.defineProperty($GlossList.prototype, 'constructor', {
  value: $GlossList
})

function GlossList () {
  const list = new $GlossList(...arguments)
  freeze(list, $GlossList)
  return list
}

export { GlossList }

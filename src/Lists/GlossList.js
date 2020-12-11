/**
 * Gloss list factory.
 *
 * A gloss list is a flat list that constains zero or more glosses.
 *
 * @see AbstractObjectList()
 */

import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { freeze } from '../Utility/freeze.js'
import { isGloss } from '../Predicates/isGloss.js'

function $GlossList (...glosses) {
  AbstractObjectList.call(this)
  this.items = []
  if (!!glosses && typeof glosses.forEach === 'function') {
    glosses.forEach(gloss => {
      if (isGloss(gloss)) {
        this.items.push(gloss)
      }
    })
  }
}

$GlossList.prototype = Object.create(AbstractObjectList.prototype)

/**
 * Determine if a gloss exists in the list by name.
 *
 * @return {boolean}
 */
$GlossList.prototype.has = function (name) {
  for (let i = 0; i < this.getSize(); i++) {
    if (this.getItem(i).getName() === name) {
      return true
    }
  }
  return false
}

Object.defineProperty($GlossList.prototype, 'constructor', {
  value: $GlossList
})

function GlossList () {
  const list = new $GlossList(...arguments)
  freeze(list, $GlossList)
  return list
}

export { GlossList }

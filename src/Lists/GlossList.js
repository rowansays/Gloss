/**
 * Gloss list factory.
 *
 * A gloss list is a flat list that constains zero or more glosses.
 *
 * @see AbstractObjectList()
 */

import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { freeze } from '../Utility/freeze.js'
import { isGloss } from '../Utility/isGloss.js'
import { isList } from '../Utility/isList.js'

/**
 * Parse glosses parameter.
 *
 * @param {...Gloss|GlossList|Array} param
 * @return {Gloss[]} An array of glosses.
 */
function parseGlosses (...params) {
  let output = []
  params = Array.isArray(params) ? params : []
  params.forEach(param => {
    if (isGloss(param)) {
      output.push(param)
    } else if (isList(param)) {
      param.forEach(subParam => {
        output.push(subParam)
      })
    } else if (Array.isArray(param)) {
      output = output.concat(parseGlosses(...param))
    }
  })
  return output
}

/**
 * Merge glosses.
 *
 * Merges all duplicate glosses into single glosses containing multiple
 * definitions.
 *
 * @param {Gloss[]} A flat array of {Gloss} objects.
 * @return {Gloss[]} A flat array of {Gloss} objects with duplicates merged.
 */
function mergeGlosses (quotes) {
  quotes = Array.isArray(quotes) ? quotes : []

  const map = new Map()
  quotes.forEach(gloss => {
    const key = gloss.getName()
    if (map.has(key) && gloss.hasDef()) {
      // merge glosses with the same name.
      map.set(key, map.get(key).withGloss(gloss))
    } else {
      // Add new gloss to the list.
      map.set(key, gloss)
    }
  })

  return Array.from(map.values())
}

function $GlossList (...glosses) {
  AbstractObjectList.call(this)
  this.items = mergeGlosses(parseGlosses(...arguments))
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

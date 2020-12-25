/**
 * Gloss list factory.
 *
 * A gloss list is a flat list that constains zero or more glosses.
 *
 * @see AbstractObjectList()
 */

import { castArray } from '../Utility/cast.js'
import { AbstractObjectList } from '../Abstracts/AbstractObjectList.js'
import { isGloss } from '../Utility/predicate.js'

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
    const key = gloss.name
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

function $GlossList (...items) {
  AbstractObjectList.call(this)
  const filter = x => isGloss(x) ? x : undefined
  const parsed = castArray(items, filter, 'recursive')
  const merged = mergeGlosses(parsed)
  this.items = merged
  this.length = merged.length
  Object.freeze(this)
}

$GlossList.prototype = Object.create(AbstractObjectList.prototype)

Object.defineProperty($GlossList.prototype, 'constructor', {
  value: $GlossList
})

Object.freeze($GlossList.prototype)

export { $GlossList }

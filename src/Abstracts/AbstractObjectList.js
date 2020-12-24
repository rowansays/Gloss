import { makeFrozenInstanceOf } from '../Utility/makeFrozenInstanceOf.js'
import { isIterableObject } from '../Utility/predicate.js'

function AbstractObjectList () {}

AbstractObjectList.prototype = Object.create(null)

AbstractObjectList.prototype.add = function (...items) {
  return makeFrozenInstanceOf(this.constructor, [...this.items, ...items])
}
AbstractObjectList.prototype.column = function (accessor, sortFunc) {
  const column = []
  for (const item of this) {
    if (typeof item[accessor] === 'function') {
      column.push(item[accessor]())
    } else if (typeof item[accessor] !== 'undefined') {
      column.push(item[accessor])
    } else {
      throw new TypeError('Invalid accessor.')
    }
  }
  if (typeof sortFunc === 'function') {
    column.sort(sortFunc)
  }
  return column
}
/**
 * @return {Array} A clone of the items array.
 */
AbstractObjectList.prototype.entries = function () {
  return [...this.items]
}
AbstractObjectList.prototype.forEach = function () {
  return this.items.forEach(...arguments)
}
/**
 * Get item by index.
 *
 * @param {number|string} key When an integer, this value represents the index
 *   of the item to retrieve. When a string, this value represents the name of
 *   the item to retrieve.
 * @return {mixed}
 */
AbstractObjectList.prototype.get = function (key) {
  switch (typeof key) {
    case 'number':
      return this.items[key]
    case 'string':
      for (let i = 0; i < this.length; i++) {
        const item = this.get(i)
        if (item.name === key) {
          return item
        }
      }
      return undefined
    default:
      return undefined
  }
}
/**
 * @return {bool}
 */
AbstractObjectList.prototype.has = function (key) {
  switch (typeof key) {
    case 'object' :
      return this.items.indexOf(key) > -1
    default :
      return typeof this.get(key) !== 'undefined'
  }
}
/**
 * Sort items in ascending order by a given accessor method.
 *
 * @return {List} A clone of the this object with all items sorted by the
 *   specified accessor.
 */
AbstractObjectList.prototype.sortAscBy = function (prop) {
  prop = 'name'
  const sorted = [...this.items].sort((a, b) => {
    if (a[prop] < b[prop]) {
      return -1
    }
    if (a[prop] > b[prop]) {
      return 1
    }
    return 0
  })
  return makeFrozenInstanceOf(this.constructor, sorted)
}
/**
 * Sort items in descending order by a given accessor method.
 *
 * @return {List} A clone of the this object with all items sorted by the
 *   specified accessor.
 */
AbstractObjectList.prototype.sortDescBy = function (prop) {
  prop = 'name'
  const sorted = [...this.items].sort((a, b) => {
    if (a[prop] < b[prop]) {
      return 1
    }
    if (a[prop] > b[prop]) {
      return -1
    }
    return 0
  })
  return makeFrozenInstanceOf(this.constructor, sorted)
}
AbstractObjectList.prototype[Symbol.iterator] = function () {
  return this.items[Symbol.iterator]()
}

export { AbstractObjectList }

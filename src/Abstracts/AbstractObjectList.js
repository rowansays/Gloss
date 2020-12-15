import { AbstractNamed } from './AbstractNamed.js'

function AbstractObjectList (props) {
  AbstractNamed.call(this, props)
  this._defaultGetMethod = 'getName'
  this._defaultSortMethod = 'getName'
}

AbstractObjectList.prototype = Object.create(AbstractNamed.prototype)
AbstractObjectList.prototype.constructor = AbstractNamed

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
        if (item[this._defaultGetMethod]() === key) {
          return item
        }
      }
      return undefined
    default:
      return undefined
  }
}
/**
 * Sort items in ascending order by a given accessor method.
 *
 * @return {List} A clone of the this object with all items sorted by the
 *   specified accessor.
 */
AbstractObjectList.prototype.sortAscBy = function (method) {
  method = validateAccessor(this, this.items[0], method)
  const sorted = [...this.items].sort((a, b) => {
    if (a[method]() < b[method]()) {
      return -1
    }
    if (a[method]() > b[method]()) {
      return 1
    }
    return 0
  })
  return new this.constructor({
    name: this.name,
    items: sorted
  })
}
/**
 * Sort items in descending order by a given accessor method.
 *
 * @return {List} A clone of the this object with all items sorted by the
 *   specified accessor.
 */
AbstractObjectList.prototype.sortDescBy = function (method) {
  method = validateAccessor(this, this.items[0], method)
  const sorted = [...this.items].sort((a, b) => {
    if (a[method]() < b[method]()) {
      return 1
    }
    if (a[method]() > b[method]()) {
      return -1
    }
    return 0
  })
  return new this.constructor({
    name: this.name,
    items: sorted
  })
}

function validateAccessor (list, item, name) {
  if (typeof item !== 'object') {
    return ''
  }

  const partial = typeof name === 'string' ? name : ''
  if (partial === '') {
    return list._defaultSortMethod
  }

  const method = partial !== '' && partial.slice(0, 3) !== 'get'
    ? 'get' + partial
    : partial

  if (typeof item[method] === 'function') {
    return method
  }

  return list._defaultSortMethod
}

export { AbstractObjectList }

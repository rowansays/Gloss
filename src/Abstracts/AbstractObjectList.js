import { makeFrozenInstanceOf } from '../Utility/makeFrozenInstanceOf.js'
import { isList } from '../Utility/predicate.js'

function AbstractObjectList () {
  this._defaultGetMethod = 'getName'
  this._defaultSortMethod = 'getName'
}

AbstractObjectList.prototype = Object.create(null)

AbstractObjectList.prototype.add = function (...items) {
  return makeFrozenInstanceOf(this.constructor, [...this.items, ...items])
}
AbstractObjectList.prototype.column = function (accessor, sortFunc) {
  const column = []
  this.forEach(item => {
    if (typeof item[accessor] !== 'function') {
      throw new TypeError('Invalid accessor.')
    }
    column.push(item[accessor]())
  })
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
  return makeFrozenInstanceOf(this.constructor, sorted)
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
  return makeFrozenInstanceOf(this.constructor, sorted)
}

/**
 * Parse quotes parameter.
 *
 * Robust function which accepts just about any value that can be converted to
 * a quote.
 *
 * @param {Array|Quote|*List|string} param
 * @return {Quote[]} A flat array of quotes.
 */
AbstractObjectList.parseArgs = function (isValidItem, ...params) {
  let output = []
  params = Array.isArray(params) ? params : []
  params.forEach(param => {
    if (isValidItem(param)) {
      output.push(param)
    } else if (isList(param)) {
      param.forEach(subParam => {
        output.push(subParam)
      })
    } else if (Array.isArray(param)) {
      output = output.concat(AbstractObjectList.parseArgs(isValidItem, ...param))
    }
  })
  return output
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

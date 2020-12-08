function AbstractObjectList () {
  this._defaultSortMethod = 'getName'
}

/**
 * Get item by index.
 *
 * @param {Number} An integer representing the index of the item to retrieve.
 * @return {mixed}
 */
AbstractObjectList.prototype.getItem = function (index) {
  return this.items[index]
}
/**
 * @return {Array} A clone of the items array.
 */
AbstractObjectList.prototype.getItems = function () {
  return [...this.items]
}
/**
 * @return {Number} An integer representing the total number of items in this
 *   list.
 */
AbstractObjectList.prototype.getSize = function () {
  return this.items.length
}
/**
 * Sort items in ascending order by a given accessor method.
 *
 * @return {List} A clone of the this object with all items sorted by the
 *   specified accessor.
 */
AbstractObjectList.prototype.sortAscBy = function (method) {
  method = validateAccessor(this.items[0], method)
  const sorted = [...this.items].sort((a, b) => {
    if (a[method]() < b[method]()) {
      return -1
    }
    if (a[method]() > b[method]()) {
      return 1
    }
    return 0
  })
  return new this.constructor(...sorted)
}
/**
 * Sort items in descending order by a given accessor method.
 *
 * @return {List} A clone of the this object with all items sorted by the
 *   specified accessor.
 */
AbstractObjectList.prototype.sortDescBy = function (method) {
  method = validateAccessor(this.items[0], method)
  const sorted = [...this.items].sort((a, b) => {
    if (a[method]() < b[method]()) {
      return 1
    }
    if (a[method]() > b[method]()) {
      return -1
    }
    return 0
  })
  return new this.constructor(...sorted)
}

function validateAccessor (obj, name) {
  if (typeof obj !== 'object') {
    return ''
  }

  const partial = typeof name === 'string' ? name : ''
  if (partial === '') {
    return this._defaultSortMethod
  }

  const method = partial !== '' && partial.slice(0, 3) !== 'get'
    ? 'get' + partial
    : partial

  if (!!obj && typeof obj[method] === 'function') {
    return method
  }

  return this._defaultSortMethod
}

export { AbstractObjectList }

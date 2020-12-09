function AbstractScalarList () {}

/**
 * @return {undefined}
 */
AbstractScalarList.prototype.forEach = function () {
  return this.items.forEach(...arguments)
}
/**
 * Get item by index.
 *
 * @param {Number} An integer representing the index of the item to retrieve.
 * @return {mixed}
 */
AbstractScalarList.prototype.getItem = function (index) {
  return this.items[index]
}
/**
 * @return {Number} An integer representing the total number of items in this
 *   list.
 */
AbstractScalarList.prototype.getSize = function () {
  return this.items.length
}
/**
 * @return {self}
 */
AbstractScalarList.prototype.sort = function () {
  const sorted = [...this.items].sort(...arguments)
  return new this.constructor(...sorted)
}

export { AbstractScalarList }

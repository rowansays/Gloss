/**
 * Recursively freeze an object.
 *
 * @arg {object} o - The object to freeze.
 * @arg {function} [skip] - Do not freeze instances of this constructor.
 * @return undefined
 */
export function freeze (o, skip) {
  if (typeof o !== 'object') {
    return
  }

  skip = typeof skip === 'function' ? skip : function () {}

  Object.getOwnPropertyNames(o).forEach(function (key) {
    const value = o[key]
    if (value && typeof value === 'object' && !(value instanceof skip)) {
      freeze(value, skip)
    }
  })

  Object.freeze(o)
  Object.freeze(Object.getPrototypeOf(o))
}

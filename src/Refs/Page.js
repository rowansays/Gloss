/**
 * Page reference.
 *
 * Instances of this object may be used to reference one or more pages in a
 *   book, magazine, or newspaper.
 *
 * @param {...number|...string|...$Page} pageNumbers - required. one or more
 *   pages numbers.
 *
 * @return {Reference}
 *
 * @throws {TypeError} when no valid page numbers are provided.
 */
function $Page (...pageNumbers) {
  let clean = []
  for (const n of pageNumbers) {
    if (typeof n === 'string' || typeof n === 'number') {
      clean.push(n)
    } else if (n instanceof $Page) {
      clean = clean.concat(n.numbers)
    }
  }

  clean.sort((a, b) => {
    if (Number.isInteger(a) && Number.isInteger(b)) {
      return a - b
    } else {
      a = a.toLowerCase()
      b = b.toLowerCase()
      if (a < b) return -1
      if (a > b) return 1
    }
    return 0
  })

  let value
  switch (clean.length) {
    case 0 :
      throw new TypeError('$Page() - No valid page numbers could be recognized.')
    case 1 :
      value = `p. ${clean[0]}`
      break
    default :
      value = `pp. ${clean.join(', ')}`
      break
  }

  Object.defineProperties(this, {
    name: { enumerable: true, value: value },
    numbers: { enumerable: true, value: clean }
  })

  Object.freeze(this)
}

$Page.prototype = Object.create(null)

Object.defineProperty($Page.prototype, 'constructor', { value: $Page })

Object.freeze($Page.prototype)

function Page (...refs) {
  return new $Page(...refs)
}

export { $Page, Page }

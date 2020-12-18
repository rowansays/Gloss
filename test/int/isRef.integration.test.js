import { isReference } from '../../src/Utility/predicate.js'
import { Book } from '../../src/References/Book.js'
import { Webpage } from '../../src/References/Webpage.js'

describe('isReference() + various constructors.', () => {
  const emptyBook = new Book()
  test('Instances of Book() are references.', function () {
    expect(isReference(new Book())).toBe(true)
  })
  test('Instances of Webpage() are references.', function () {
    expect(isReference(Webpage())).toBe(true)
  })
})

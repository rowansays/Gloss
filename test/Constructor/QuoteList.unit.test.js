// System under test.
import { $QuoteList } from '../../src/Constructor/QuoteList.js'

// Helpers.
import { testConstructor } from '../helpers/testConstructor.js'
import { testObjectListInterface } from '../helpers/prototypes.js'

const props = { name: 'Nobody' }
const empty = new $QuoteList(props)

describe('Function Signatures', function () {
  testConstructor($QuoteList)
  describe("()", () => {
    test('accepts three QuoteList instances.', () => {
      const ql = new $QuoteList(
        new $QuoteList(),
        new $QuoteList(),
        new $QuoteList()
      )
      expect(ql.length).toBe(0)
    })
  })
})

describe('$QuoteList.prototype', function () {
  testObjectListInterface(empty)
})

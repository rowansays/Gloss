// System under test.
import { $QuoteList } from '../../src/Constructor/QuoteList.js'

// Helpers.
import { testObjectListInterface } from '../helpers/prototypes.js'
import { testFactoryFunction } from '../helpers/factories.js'

const props = { name: 'Nobody' }
const empty = new $QuoteList(props)

testFactoryFunction('$QuoteList', $QuoteList, empty)
describe('$QuoteList.prototype', function () {
  testObjectListInterface(empty)
})
describe('Function Signatures', function () {
  describe("()", () => {
    test('accepts undefined.', () => {
      const ql = new $QuoteList()
      expect(ql.length).toBe(0)
    })
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

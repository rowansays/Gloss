// System under test.
import { QuoteList } from '../../src/Lists/QuoteList.js'

// Helpers.
import { testObjectListInterface } from '../helpers/prototypes.js'
import { testFactoryFunction } from '../helpers/factories.js'

const props = { name: 'Nobody' }
const empty = QuoteList(props)

testFactoryFunction('QuoteList', QuoteList, empty)
describe('QuoteList.prototype', function () {
  testObjectListInterface(empty)
})
describe('Function Signatures', function () {
  describe("()", () => {
    test('accepts undefined.', () => {
      const ql = QuoteList()
      expect(ql.length).toBe(0)
    })
    test('accepts three QuoteList instances.', () => {
      const ql = QuoteList(QuoteList(), QuoteList(), QuoteList())
      expect(ql.length).toBe(0)
    })
  })
})

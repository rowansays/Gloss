// Sustem under test.
import { QuoteList } from '../src/Lists/QuoteList.js'

// Testing library.
import chai from 'chai'
import mocha from 'mocha'
import { testObjectListInterface } from './helpers/prototypes.js'
import { testFactoryFunction } from './helpers/factories.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

const props = { name: 'Nobody' }
const empty = QuoteList(props)

testFactoryFunction('QuoteList', QuoteList, empty)
describe('QuoteList.prototype', function () {
  testObjectListInterface(empty)
})
describe('Function Signatures', function () {
  describe("()", () => {
    it('accepts undefined.', () => {
      const ql = QuoteList()
      expect(ql.length).to.equal(0)
    })
    it('accepts three QuoteList instances.', () => {
      const ql = QuoteList(QuoteList(), QuoteList(), QuoteList())
      expect(ql.length).to.equal(0)
    })
  })
})

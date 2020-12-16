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

describe('empty: Function Signatures', function () {
  describe("()", () => {
    it('accepts an empty array.', () => {
      const ql = QuoteList()
      expect(ql.length).to.equal(0)
    })
    it('accepts three strings.', () => {
      const ql = QuoteList('a', 'b', 'c')
      expect(ql.length).to.equal(3)
      expect(ql.has('a')).to.be.true
      expect(ql.has('b')).to.be.true
      expect(ql.has('c')).to.be.true
    })
    it('accepts three integers.', () => {
      const ql = QuoteList(1, 2, 3)
      expect(ql.length).to.equal(3)
      expect(ql.has('1')).to.be.true
      expect(ql.has('2')).to.be.true
      expect(ql.has('3')).to.be.true
    })
    it('accepts three QuoteList instances.', () => {
      const ql = QuoteList(
        QuoteList('a', 'b', 'c'),
        QuoteList('d', 'e', 'f'),
        QuoteList('g', 'h', 'i')
      )
      expect(ql.length).to.equal(9)
      expect(ql.has('a')).to.be.true
      expect(ql.has('b')).to.be.true
      expect(ql.has('c')).to.be.true
      expect(ql.has('d')).to.be.true
      expect(ql.has('e')).to.be.true
      expect(ql.has('f')).to.be.true
      expect(ql.has('g')).to.be.true
      expect(ql.has('h')).to.be.true
      expect(ql.has('i')).to.be.true
    })
    it('merges an array of QuoteLists.', () => {
      const ql = QuoteList(
        QuoteList('a', 'b', 'c'),
        QuoteList('a', 'b', 'c'),
        QuoteList('a', 'b', 'c')
      )
      expect(ql.length).to.equal(3)
      expect(ql.has('a')).to.be.true
      expect(ql.has('b')).to.be.true
      expect(ql.has('c')).to.be.true
    })
  })
})

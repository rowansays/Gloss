// Sustem under test.
import { QuoteList } from '../src/Lists/QuoteList.js'

// Testing library.
import chai from 'chai'
import mocha from 'mocha'
import { testObjectListInterface } from './helpers/prototypes.js'
import { testFactoryFunction, testNameProp } from './helpers/factories.js'

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
  testNameProp(QuoteList)
  describe("({ name: 'nobody', items: [] })", () => {
    it('accepts an empty array.', () => {
      const ql = QuoteList({ name: 'nobody', items: [] })
      expect(ql.length).to.equal(0)
    })
    it('accepts an array of strings.', () => {
      const ql = QuoteList({ name: 'nobody', items: ['a', 'b', 'c'] })
      expect(ql.length).to.equal(3)
      expect(ql.has('a')).to.be.true
      expect(ql.has('b')).to.be.true
      expect(ql.has('c')).to.be.true
    })
    it('accepts an array of integers.', () => {
      const ql = QuoteList({ name: 'nobody', items: [1, 2, 3] })
      expect(ql.length).to.equal(3)
      expect(ql.has('1')).to.be.true
      expect(ql.has('2')).to.be.true
      expect(ql.has('3')).to.be.true
    })
    it('accepts an array of QuoteLists.', () => {
      const ql = QuoteList({ name: 'nobody', items: [
        QuoteList({ name: 'nobody', items: ['a', 'b', 'c'] }),
        QuoteList({ name: 'nobody', items: ['d', 'e', 'f'] }),
        QuoteList({ name: 'nobody', items: ['g', 'h', 'i'] })
      ] })
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
      const ql = QuoteList({ name: 'nobody', items: [
        QuoteList({ name: 'nobody', items: ['a', 'b', 'c'] }),
        QuoteList({ name: 'nobody', items: ['a', 'b', 'c'] }),
        QuoteList({ name: 'nobody', items: ['a', 'b', 'c'] })
      ] })
      expect(ql.length).to.equal(3)
      expect(ql.has('a')).to.be.true
      expect(ql.has('b')).to.be.true
      expect(ql.has('c')).to.be.true
    })
  })
})

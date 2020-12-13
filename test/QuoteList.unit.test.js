// Sustem under test.
import { QuoteList } from '../src/Lists/QuoteList.js'

// Testing library.
import chai from 'chai'
import mocha from 'mocha'
import { testAbstractObjectListPrototype } from './helpers/prototypes.js'
import { testFactoryFunction, testNameProp } from './helpers/factories.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

const props = { name: 'Nobody' }
const empty = QuoteList(props)

testFactoryFunction('QuoteList', QuoteList, empty)

describe('QuoteList.prototype', function () {
  it('has a has() method.', () => {
    expect(typeof empty.has).to.equal('function')
  })
  it('has a withQuote() method.', () => {
    expect(typeof empty.withQuote).to.equal('function')
  })
  testAbstractObjectListPrototype(empty)
})

describe('empty: Function Signatures', function () {
  testNameProp(QuoteList)
  describe("({ name: 'nobody', quotes: [] })", () => {
    it('accepts an empty array.', () => {
      const ql = QuoteList({ name: 'nobody', quotes: [] })
      expect(ql.getSize()).to.equal(0)
    })
    it('accepts an array of strings.', () => {
      const ql = QuoteList({ name: 'nobody', quotes: ['a', 'b', 'c'] })
      expect(ql.getSize()).to.equal(3)
      expect(ql.has('a')).to.be.true
      expect(ql.has('b')).to.be.true
      expect(ql.has('c')).to.be.true
    })
    it('accepts an array of integers.', () => {
      const ql = QuoteList({ name: 'nobody', quotes: [1, 2, 3] })
      expect(ql.getSize()).to.equal(3)
      expect(ql.has('1')).to.be.true
      expect(ql.has('2')).to.be.true
      expect(ql.has('3')).to.be.true
    })
    it('accepts an array of QuoteLists.', () => {
      const ql = QuoteList({ name: 'nobody', quotes: [
        QuoteList({ name: 'nobody', quotes: ['a', 'b', 'c'] }),
        QuoteList({ name: 'nobody', quotes: ['d', 'e', 'f'] }),
        QuoteList({ name: 'nobody', quotes: ['g', 'h', 'i'] })
      ] })
      expect(ql.getSize()).to.equal(9)
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
      const ql = QuoteList({ name: 'nobody', quotes: [
        QuoteList({ name: 'nobody', quotes: ['a', 'b', 'c'] }),
        QuoteList({ name: 'nobody', quotes: ['a', 'b', 'c'] }),
        QuoteList({ name: 'nobody', quotes: ['a', 'b', 'c'] })
      ] })
      expect(ql.getSize()).to.equal(3)
      expect(ql.has('a')).to.be.true
      expect(ql.has('b')).to.be.true
      expect(ql.has('c')).to.be.true
    })
  })
})

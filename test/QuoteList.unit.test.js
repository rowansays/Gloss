// Sustem under test.
import { QuoteList } from '../src/Lists/QuoteList.js'

// Testing library.
import chai from 'chai'
import mocha from 'mocha'
import { testAbstractObjectListPrototype } from './helpers/prototypes.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('QuoteList()', () => {
  it('is a function.', () => {
    expect(typeof QuoteList).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { QuoteList() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(QuoteList())).to.equal(true)
    if (typeof QuoteList().__proto__ === 'object') {
      expect(Object.isFrozen(QuoteList().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('QuoteList.prototype', function () {
  testAbstractObjectListPrototype(QuoteList())
})
describe('QuoteList(): Function Signatures', function () {
  describe('()', () => {
    it('does not require parameters.', () => {
      expect(function () { QuoteList() }).not.to.throw(Error)
      expect(QuoteList().getSize()).to.equal(0)
    })
  })
  describe('(string)', () => {
    it('does not require parameters.', () => {
      expect(function () { QuoteList() }).not.to.throw(Error)
      expect(QuoteList().getSize()).to.equal(0)
    })
    it('accepts a non-empty string.', () => {
      const ql = QuoteList('A')
      expect(ql.getSize()).to.equal(1)
      expect(ql.getItemName(0)).to.equal('A')
    })
    it('trims spaces from both sides of a non-empty string.', () => {
      expect(QuoteList(' A ',).getItemName(0)).to.equal('A')
    })
    it('rejects an empty string.', () => {
      expect(QuoteList('').getSize()).to.equal(0)
    })
    it('rejects a space character.', () => {
      expect(QuoteList(' ').getSize()).to.equal(0)
    })
    it('rejects multiple space characters.', () => {
      expect(QuoteList('   ').getSize()).to.equal(0)
    })
    it('rejects a tab character.', () => {
      expect(QuoteList('  ').getSize()).to.equal(0)
    })
    it('rejects multiple tab characters.', () => {
      expect(QuoteList('      ').getSize()).to.equal(0)
    })
  })
  describe('(string, string, string)', () => {
    it('accepts strings.', () => {
      const ql = QuoteList('A', 'B', 'C')
      expect(ql.getSize()).to.equal(3)
    })
    it('stores strings in the order they are provided.', () => {
      const ql = QuoteList('a', 'b', 'c')
      expect(ql.getItemName(0)).to.equal('a')
      expect(ql.getItemName(1)).to.equal('b')
      expect(ql.getItemName(2)).to.equal('c')
    })
    it('rejects empty strings.', () => {
      expect(QuoteList('', '', '').getSize()).to.equal(0)
    })
    it('rejects space characters.', () => {
      expect(QuoteList(' ', '  ', '   ').getSize()).to.equal(0)
    })
    it('rejects tabs characters.', () => {
      expect(QuoteList(' ', '    ', '      ').getSize()).to.equal(0)
    })
  })
  describe('(number)', () => {
    it('accepts an integer.', () => {
      const ql = QuoteList(123)
      expect(ql.getSize()).to.equal(1)
      expect(ql.getItemName(0)).to.equal('123')
    })
  })
  describe('(number, number, number)', () => {
    it('accepts integers.', () => {
      const ql = QuoteList(1, 2, 3)
      expect(ql.getSize()).to.equal(3)
    })
  })
  describe('(QuoteList)', () => {
    it('accepts a QuoteList.', () => {
      const ql1 = QuoteList(1, 2, 3)
      const ql2 = QuoteList(ql1)
      expect(ql2.getSize()).to.equal(3)
    })
  })
  describe('(QuoteList, QuoteList, QuoteList)', () => {
    it('accepts QuoteLists.', () => {
      const ql = QuoteList(
        QuoteList(1, 2, 3),
        QuoteList(4, 5, 6),
        QuoteList(7, 8, 9)
      )
      expect(ql.getSize()).to.equal(9)
    })
  })
})

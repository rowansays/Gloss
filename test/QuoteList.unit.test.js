import chai from 'chai'
import mocha from 'mocha'
import { QuoteList } from '../index.js'

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
describe('QuoteList(): Parameters', function () {
  describe('zero', () => {
    it('does not require parameters.', () => {
      expect(function () { QuoteList() }).not.to.throw(Error)
      expect(QuoteList().getSize()).to.equal(0)
    })
  })
  describe('single: {string}', () => {
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
  describe('single: {number}', () => {
    it('accepts an integer.', () => {
      const ql = QuoteList(123)
      expect(ql.getSize()).to.equal(1)
      expect(ql.getItemName(0)).to.equal('123')
    })
  })
  describe('multiple: {string}', () => {
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
  describe('multiple: {number}', () => {
    it('accepts integers.', () => {
      const ql = QuoteList(1, 2, 3)
      expect(ql.getSize()).to.equal(3)
    })
  })
})

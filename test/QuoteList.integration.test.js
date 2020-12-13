import chai from 'chai'
import mocha from 'mocha'
import { Phrase } from '../src/Quotes/Phrase.js'
import { QuoteList } from '../src/Lists/QuoteList.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('QuoteList(): Parameters', function () {
  describe('single: {Phrase}', () => {
    it('accepts a Quote.', () => {
      const ql = QuoteList(Phrase('a'))
      expect(ql.getSize()).to.equal(1)
      expect(ql.getItemName(0)).to.equal('a')
    })
  })
  describe('multiple: {Phrase}', () => {
    it('accepts unique phrases.', () => {
      const q = QuoteList( Phrase('f'), Phrase('z'), Phrase('t'))
      expect(q.getSize()).to.equal(3)
    })
    it('stores phrases in the order they were provided.', () => {
      const q = QuoteList( Phrase('f'), Phrase('z'), Phrase('t'))
      expect(q.getItemName(0)).to.equal('f')
      expect(q.getItemName(1)).to.equal('z')
      expect(q.getItemName(2)).to.equal('t')
    })
    const quantumRobin = QuoteList(
      Phrase('Quantum robin', '', 'ref1'),
      Phrase('Quantum robin', '', 'ref2'),
      Phrase('Quantum robin', '', 'ref3')
    )
    it('does not allow duplicate phrases.', () => {
      expect(quantumRobin.getSize()).to.equal(1)
    })
    it('merges duplicate phrases into a single item.', () => {
      expect(quantumRobin.getItem(0).hasReference('ref1')).to.be.true
      expect(quantumRobin.getItem(0).hasReference('ref2')).to.be.true
      expect(quantumRobin.getItem(0).hasReference('ref3')).to.be.true
    })
  })
})

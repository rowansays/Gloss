import chai from 'chai'
import mocha from 'mocha'
import { Normal, Phrase, Quote } from '../src/Quotes/Quote.js'
import { QuoteList } from '../src/Lists/QuoteList.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('QuoteList(): Parameters', function () {
  describe('single: {Phrase}', () => {
    it('accepts a Quote.', () => {
      const ql = QuoteList({ name: 'nobody', items: [ Phrase('a') ] })
      expect(ql.getSize()).to.equal(1)
      expect(ql.getItemName(0)).to.equal('a')
    })
  })
  describe('Phrase())', () => {
    it('accepts unique phrases.', () => {
      const q = QuoteList({
        name: 'nobody',
        items: [ Phrase('f'), Phrase('z'), Phrase('t') ]
      })

      expect(q.getSize()).to.equal(3)
    })
    it('stores phrases in the order they were provided.', () => {
      const q = QuoteList({
        name: 'nobody',
        items: [ Phrase('f'), Phrase('z'), Phrase('t') ]
      })
      expect(q.getItemName(0)).to.equal('f')
      expect(q.getItemName(1)).to.equal('z')
      expect(q.getItemName(2)).to.equal('t')
    })
    const quantumRobin = QuoteList({
      name: 'nobody',
      items: [
        Phrase('Quantum robin', 'ref1'),
        Phrase('Quantum robin', 'ref2'),
        Phrase('Quantum robin', 'ref3')
      ]
    })
    it('does not allow duplicate phrases.', () => {
      expect(quantumRobin.getSize()).to.equal(1)
    })
    it('merges duplicate phrases into a single item.', () => {
      expect(quantumRobin.get(0).hasRef('ref1')).to.be.true
      expect(quantumRobin.get(0).hasRef('ref2')).to.be.true
      expect(quantumRobin.get(0).hasRef('ref3')).to.be.true
    })
  })
  describe('Normal()', () => {
    it('accepts unique normalized phrases.', () => {
      const q = QuoteList({
        name: 'nobody',
        items: [ Normal('x', 'xx'), Normal('y', 'yy'), Normal('z', 'zz') ]
      })
      expect(q.getSize()).to.equal(3)
    })

    it('merges normalized phrases with the same name.', () => {
      const q = QuoteList({
        name: 'nobody',
        items: [
          Normal('x', 'xx', 'alphabet-1'),
          Normal('x', 'xy', 'alphabet-2'),
          Normal('x', 'xz', 'alphabet-3')
        ]
      })

      expect(q.getSize()).to.equal(1)
    })
  })
})

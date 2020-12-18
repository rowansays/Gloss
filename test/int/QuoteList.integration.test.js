import chai from 'chai'
import mocha from 'mocha'
import { Normal, Phrase } from '../src/Quotes/Quote.js'
import { QuoteList } from '../src/Lists/QuoteList.js'
import { aliceBook, devilsBook, frankenBook, prideBook } from './data/refs.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('QuoteList Integration Tests', function () {
  describe('Parameters', function () {
    describe('single: {Phrase}', () => {
      it('accepts a Quote.', () => {
        const ql = QuoteList(Phrase('a', aliceBook))
        expect(ql.length).to.equal(1)
        expect(ql.getItemName(0)).to.equal('a')
      })
    })
    describe('Phrase())', () => {
      it('accepts unique phrases.', () => {
        const q = QuoteList(
          Phrase('f', aliceBook),
          Phrase('z', devilsBook),
          Phrase('t', frankenBook)
        )
        expect(q.length).to.equal(3)
      })
      it('stores phrases in the order they were provided.', () => {
        const q = QuoteList(
          Phrase('f', aliceBook),
          Phrase('z', devilsBook),
          Phrase('t', frankenBook)
        )
        expect(q.getItemName(0)).to.equal('f')
        expect(q.getItemName(1)).to.equal('z')
        expect(q.getItemName(2)).to.equal('t')
      })
      const quantumRobin = QuoteList(
        Phrase('Quantum robin', aliceBook),
        Phrase('Quantum robin', devilsBook),
        Phrase('Quantum robin', frankenBook)
      )
      it('does not allow duplicate phrases.', () => {
        expect(quantumRobin.length).to.equal(1)
      })
      it('merges duplicate phrases into a single item.', () => {
        expect(quantumRobin.get(0).hasRef(aliceBook)).to.be.true
        expect(quantumRobin.get(0).hasRef(devilsBook)).to.be.true
        expect(quantumRobin.get(0).hasRef(frankenBook)).to.be.true
      })
    })
    describe('Normal()', () => {
      it('accepts unique normalized phrases.', () => {
        const q = QuoteList(
          Normal('x', 'xx', aliceBook),
          Normal('y', 'yy', aliceBook),
          Normal('z', 'zz', aliceBook)
        )
        expect(q.length).to.equal(3)
      })
      it('merges normalized phrases with the same name.', () => {
        const q = QuoteList(
          Normal('x', 'xx', aliceBook),
          Normal('x', 'xy', devilsBook),
          Normal('x', 'xz', frankenBook)
        )
        expect(q.length).to.equal(1)
      })
    })
  })
})

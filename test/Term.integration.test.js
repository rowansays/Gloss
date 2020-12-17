import chai from 'chai'
import mocha from 'mocha'
import { Term } from '../src/Glosses/Term.js'
import { Phrase } from '../src/Quotes/Quote.js'
import { aliceBook, devilsBook } from './data/refs.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Term(): Integration Tests', function () {
  describe('Term(name, memo, ...Phrase())', () => {
    it('accepts return value of Phrase() for parameters 3, 4, & 5.', () => {
      const def0 = Phrase('Three', aliceBook)
      const def1 = Phrase('Four', aliceBook)
      const def2 = Phrase('Five', aliceBook)
      const term = Term('a', '', def0, def1, def2)
      expect(term.getDef(0).getName()).to.equal(def0.getName())
      expect(term.getDef(1).getName()).to.equal(def1.getName())
      expect(term.getDef(2).getName()).to.equal(def2.getName())
    })
  })
  describe('withDef()', function () {
    it('merges two phrases having different sources.', () => {
      const def1 = Phrase('Klingon', aliceBook)
      const def2 = Phrase('Klingon', devilsBook)
      const term = Term('a', '', def1).withDef(def2)

      const def = term.getDef('Klingon')
      expect(term.length, 'term.length').to.equal(1)
      expect(def.length, 'def.length').to.equal(1)
      expect(def.mentions, 'def.getFreq()').to.equal(2)
      expect(def.hasRef(aliceBook)).to.be.true
      expect(def.hasRef(devilsBook)).to.be.true
    })
  })
  describe('withMemo()', function () {
    it('merges two phrases having different memos.', () => {
      const memo1 = Phrase('They are dangerous.', aliceBook)
      const memo2 = Phrase('They are mageistic.', devilsBook)
      const term = Term('a', memo1).withMemo(memo2)

      expect(term.getMemo(0).getName()).to.equal(memo1.getName())
      expect(term.getMemo(0).hasRef(aliceBook)).to.equal(true)
      expect(term.getMemo(1).getName()).to.equal(memo2.getName())
      expect(term.getMemo(1).hasRef(devilsBook)).to.equal(true)
    })
  })
  describe('withDefRef()', function () {
    it('appends a reference to all definitions.', () => {
      const term = Term('a', '', Phrase('Bunnies'), Phrase('Kittens'))
      expect(term.getDef(0).hasRef(aliceBook)).to.be.false
      expect(term.getDef(1).hasRef(aliceBook)).to.be.false

      const term2 = term.withDefRef(aliceBook)
      expect(term2.getDef(0).hasRef(aliceBook)).to.be.true
      expect(term2.getDef(1).hasRef(aliceBook)).to.be.true
    })
  })
})

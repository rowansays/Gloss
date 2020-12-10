import chai from 'chai'
import mocha from 'mocha'
import { Phrase, Term } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Term(): Integration Tests', function () {
  describe('Term(name, memo, ...Phrase())', () => {
    it('accepts Quote objects for parameters three, four, and five.', () => {
      const def0 = Phrase('Three', 'source')
      const def1 = Phrase('Four', 'source')
      const def2 = Phrase('Five', 'source')
      const term = Term('a', '', def0, def1, def2)
      expect(term.getDef(0).getName()).to.equal(def0.getName())
      expect(term.getDef(1).getName()).to.equal(def1.getName())
      expect(term.getDef(2).getName()).to.equal(def2.getName())
    })
  })
  describe('withDef()', function () {
    it('merges two phrases having different sources.', () => {
      const def1 = Phrase('Klingon', 'here')
      const def2 = Phrase('Klingon', 'there')
      const term = Term('a', '', def1).withDef(def2)
      expect(term.getSize()).to.equal(1)
      expect(term.getDef(0).hasReference('here')).to.be.true
      expect(term.getDef(0).hasReference('there')).to.be.true
    })
  })
})

import chai from 'chai'
import mocha from 'mocha'
import { isQuote } from '../src/Utility/predicate.js'
import { Normal, Phrase, Quote } from '../src/Quotes/Quote.js'
import { wikipedia } from './mocks/MockRef.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isQuote() Integration Tests.', () => {
  describe('isQuote(Normal())', () => {
    it('recognizes objects returned by Normal() as quotes', function () {
      expect(isQuote(Normal('a', 'b', wikipedia))).to.be.true
    })
  })
  describe('isQuote(Phrase())', () => {
    it('recognizes objects returned by Phrase() as quotes', function () {
      expect(isQuote(Phrase('a', wikipedia))).to.be.true
    })
  })
  describe('isQuote(Phrase())', () => {
    it('recognizes objects returned by Quote() as quotes', function () {
      expect(isQuote(Quote({ name: 'a', refs: [wikipedia] }))).to.be.true
    })
  })
})

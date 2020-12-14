import chai from 'chai'
import mocha from 'mocha'
import { isQuote } from '../src/Utility/isQuote.js'
import { Normal, Phrase, Quote } from '../src/Quotes/Quote.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isQuote() + various constructors.', () => {
  it('Objects returned by Normal() are quotes.', function () {
    expect(isQuote(Normal('a', 'b', 'c'))).to.be.true
  })
  it('Objects returned by Phrase() are quotes.', function () {
    expect(isQuote(Phrase('a', 'b'))).to.be.true
  })
  it('Objects returned by Quote() are quotes.', function () {
    expect(isQuote(Quote({ name: 'a', refs: ['b'] }))).to.be.true
  })
})

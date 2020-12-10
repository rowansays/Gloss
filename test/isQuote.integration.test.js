import chai from 'chai'
import mocha from 'mocha'
import { isQuote, Normal, Phrase, Speech } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isQuote() + various constructors.', () => {
  it('Instances of Normal() are quotes.', function () {
    expect(isQuote(new Normal())).to.be.true
  })
  it('Instances of Phrase() are quotes.', function () {
    expect(isQuote(new Phrase())).to.be.true
  })
  it('Instances of Speech() are quotes.', function () {
    expect(isQuote(new Speech())).to.be.true
  })
})

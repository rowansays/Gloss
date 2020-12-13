import chai from 'chai'
import mocha from 'mocha'
import { isQuote } from '../src/Utility/isQuote.js'
import { Normal } from '../src/Quotes/Normal.js'
import { Phrase } from '../src/Quotes/Phrase.js'
import { Speech } from '../src/Quotes/Speech.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isQuote() + various constructors.', () => {
  it('Instances of Normal() are quotes.', function () {
    expect(isQuote(new Normal(1, 2))).to.be.true
  })
  it('Instances of Phrase() are quotes.', function () {
    expect(isQuote(new Phrase())).to.be.true
  })
  it('Instances of Speech() are quotes.', function () {
    expect(isQuote(new Speech())).to.be.true
  })
})

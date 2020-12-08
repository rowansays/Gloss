import chai from 'chai'
import mocha from 'mocha'
import { isQuote } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isQuote()', () => {
  it('is a function.', () => {
    expect(typeof isQuote).to.equal('function')
  })
  it('returns false for null.', () => {
    expect(isQuote(null)).to.be.false
  })
  it('returns false for scalar values.', () => {
    expect(isQuote(true)).to.be.false
    expect(isQuote(false)).to.be.false
    expect(isQuote('')).to.be.false
    expect(isQuote(123)).to.be.false
    expect(isQuote(1.23)).to.be.false
  })
  it('returns false for invalid objects.', () => {
    expect(isQuote({})).to.be.false
    expect(isQuote([])).to.be.false
  })
})

describe('isQuote(Quote)', () => {
  function Quote () {}
  Quote.prototype.getFull = function () {return ''}
  Quote.prototype.getName = function () {return ''}
  Quote.prototype.getReference = function () {return ''}
  Quote.prototype.hasReference = function () {return false}
  Quote.prototype.withReference = function () {new Quote()}
  it('returns true for objects that behave like quotes.', () => {
    expect(isQuote(new Quote())).to.be.true
  })
})
describe('isQuote(UnrecognizedType)', () => {
  it('returns false for objects that lack a getFull() method.', () => {
    function Quote () {}
    Quote.prototype.getName = function () {return ''}
    Quote.prototype.getReference = function () {return ''}
    Quote.prototype.hasReference = function () {return false}
    Quote.prototype.withReference = function () {new Quote()}
    expect(isQuote(new Quote())).to.be.false
  })
  it('returns false for objects that lack a getName() method.', () => {
    function Quote () {}
    Quote.prototype.getFull = function () {return ''}
    Quote.prototype.getReference = function () {return ''}
    Quote.prototype.hasReference = function () {return false}
    Quote.prototype.withReference = function () {new Quote()}
    expect(isQuote(new Quote())).to.be.false
  })
  it('returns false for objects that lack a getReference() method.', () => {
    function Quote () {}
    Quote.prototype.getFull = function () {return ''}
    Quote.prototype.getName = function () {return ''}
    Quote.prototype.hasReference = function () {return false}
    Quote.prototype.withReference = function () {new Quote()}
    expect(isQuote(new Quote())).to.be.false
  })
  it('returns false for objects that lack a hasReference() method.', () => {
    function Quote () {}
    Quote.prototype.getFull = function () {return ''}
    Quote.prototype.getName = function () {return ''}
    Quote.prototype.getReference = function () {return ''}
    Quote.prototype.withReference = function () {new Quote()}
    expect(isQuote(new Quote())).to.be.false
  })
  it('returns false for objects that lack a withReference() method.', () => {
    function Quote () {}
    Quote.prototype.getFull = function () {return ''}
    Quote.prototype.getName = function () {return ''}
    Quote.prototype.getReference = function () {return ''}
    Quote.prototype.hasReference = function () {return false}
    expect(isQuote(new Quote())).to.be.false
  })
})

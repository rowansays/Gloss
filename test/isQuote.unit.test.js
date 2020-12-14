import chai from 'chai'
import mocha from 'mocha'
import { isQuote } from '../src/Utility/isQuote.js'

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

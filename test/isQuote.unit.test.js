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

describe('isQuote(Citation)', () => {
  function Citation () {}
  Citation.prototype.getFull = function () {return ''}
  Citation.prototype.getName = function () {return ''}
  Citation.prototype.getSource = function () {return ''}
  it('returns true for objects that behave like citations.', () => {
    expect(isQuote(new Citation())).to.be.true
  })
})
describe('isQuote(UnrecognizedType)', () => {
  it('returns false for objects that lack a getFull() method.', () => {
    function Citation () {}
    Citation.prototype.getName = function () {return ''}
    Citation.prototype.getSource = function () {return ''}
    expect(isQuote(new Citation())).to.be.false
  })
  it('returns false for objects that lack a getName() method.', () => {
    function Citation () {}
    Citation.prototype.getFull = function () {return ''}
    Citation.prototype.getSource = function () {return ''}
    expect(isQuote(new Citation())).to.be.false
  })
  it('returns false for objects that lack a getSource() method.', () => {
    function Citation () {}
    Citation.prototype.getFull = function () {return ''}
    Citation.prototype.getName = function () {return ''}
    expect(isQuote(new Citation())).to.be.false
  })
})

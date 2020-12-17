// System under test.
import { isNamed } from '../src/Utility/predicate.js'

// Testing libraries.
import chai from 'chai'
import mocha from 'mocha'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isNamed()', () => {
  it('is a function.', () => {
    expect(typeof isNamed).to.equal('function')
  })
  it('returns false for null.', () => {
    expect(isNamed(null)).to.be.false
  })
  it('returns false for scalar values.', () => {
    expect(isNamed(true)).to.be.false
    expect(isNamed(false)).to.be.false
    expect(isNamed('')).to.be.false
    expect(isNamed(123)).to.be.false
    expect(isNamed(1.23)).to.be.false
  })
  it('returns false for invalid objects.', () => {
    expect(isNamed({})).to.be.false
    expect(isNamed([])).to.be.false
  })
})
describe('isNamed(Quote)', () => {
  it('returns true for objects that have a getName() method.', () => {
    function Named () {}
    Named.prototype.getName = function () {return ''}
    expect(isNamed(new Named())).to.be.true
  })
})

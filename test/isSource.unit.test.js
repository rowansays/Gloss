import chai from 'chai'
import mocha from 'mocha'
import { isSource } from '../isSource.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function Source () {}
Source.prototype.getName = function () {return ''}
Source.prototype.getUrl = function () {return ''}

describe('isSource()', () => {
  it('is a function.', () => {
    expect(typeof isSource).to.equal('function')
  })
  it('returns false for null.', () => {
    expect(isSource(null)).to.be.false
  })
  it('returns false for scalar values.', () => {
    expect(isSource(true)).to.be.false
    expect(isSource(false)).to.be.false
    expect(isSource('')).to.be.false
    expect(isSource(123)).to.be.false
    expect(isSource(1.23)).to.be.false
  })
  it('returns false for invalid objects.', () => {
    expect(isSource({})).to.be.false
    expect(isSource([])).to.be.false
  })
  it('returns true for objects that behave like publications.', () => {
    expect(isSource(new Source())).to.be.true
  })
})

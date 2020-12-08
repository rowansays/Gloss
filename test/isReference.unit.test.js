import chai from 'chai'
import mocha from 'mocha'
import { isReference } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function Source () {}
Source.prototype.getName = function () {return ''}
Source.prototype.getUrl = function () {return ''}

describe('isReference()', () => {
  it('is a function.', () => {
    expect(typeof isReference).to.equal('function')
  })
  it('returns false for null.', () => {
    expect(isReference(null)).to.be.false
  })
  it('returns false for scalar values.', () => {
    expect(isReference(true)).to.be.false
    expect(isReference(false)).to.be.false
    expect(isReference('')).to.be.false
    expect(isReference(123)).to.be.false
    expect(isReference(1.23)).to.be.false
  })
  it('returns false for invalid objects.', () => {
    expect(isReference({})).to.be.false
    expect(isReference([])).to.be.false
  })
  it('returns true for objects that behave like publications.', () => {
    expect(isReference(new Source())).to.be.true
  })
})

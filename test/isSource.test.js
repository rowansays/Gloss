import chai from 'chai'
import mocha from 'mocha'
import { isSource } from '../isSource.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function Mock () {}
Mock.prototype.getName = function () {return ''}
Mock.prototype.getUrl = function () {return ''}

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
  it('returns true for valid object.', () => {
    expect(isSource(new Mock())).to.be.true
  })
})

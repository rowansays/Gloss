import chai from 'chai'
import mocha from 'mocha'
import { isSource } from '../isSource.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

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
})

describe('isSource(Publication)', () => {
  function MockBook () {}
  MockBook.prototype.getName = function () {return ''}
  MockBook.prototype.getUrl = function () {return ''}
  MockBook.prototype.getType = function () {return 'Publication'}
  it('returns true for objects that behave like publications.', () => {
    expect(isSource(new MockBook())).to.be.true
  })
})

describe('isSource(Hyperlink)', () => {
  function MockWebpage () {}
  MockWebpage.prototype.getName = function () {return ''}
  MockWebpage.prototype.getUrl = function () {return ''}
  MockWebpage.prototype.getType = function () {return 'Hyperlink'}
  it('returns true for objects that behave like hyperlinks.', () => {
    expect(isSource(new MockWebpage())).to.be.true
  })
})

describe('isSource(UnrecognizedType)', () => {
  function MockUnrecognized () {}
  MockUnrecognized.prototype.getName = function () {return ''}
  MockUnrecognized.prototype.getUrl = function () {return ''}
  MockUnrecognized.prototype.getType = function () {return 'Unrecognized'}
  it('returns false for objects that behave like webpages, but return unrecognized types.', () => {
    expect(isSource(new MockUnrecognized())).to.be.false
  })
})

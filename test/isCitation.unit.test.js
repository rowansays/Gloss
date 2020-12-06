import chai from 'chai'
import mocha from 'mocha'
import { isCitation } from '../isCitation.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isCitation()', () => {
  it('is a function.', () => {
    expect(typeof isCitation).to.equal('function')
  })
  it('returns false for null.', () => {
    expect(isCitation(null)).to.be.false
  })
  it('returns false for scalar values.', () => {
    expect(isCitation(true)).to.be.false
    expect(isCitation(false)).to.be.false
    expect(isCitation('')).to.be.false
    expect(isCitation(123)).to.be.false
    expect(isCitation(1.23)).to.be.false
  })
  it('returns false for invalid objects.', () => {
    expect(isCitation({})).to.be.false
    expect(isCitation([])).to.be.false
  })
})

describe('isCitation(Citation)', () => {
  function Citation () {}
  Citation.prototype.getFull = function () {return ''}
  Citation.prototype.getName = function () {return ''}
  Citation.prototype.getSource = function () {return ''}
  Citation.prototype.getType = function () {return 'Citation'}
  it('returns true for objects that behave like citations.', () => {
    expect(isCitation(new Citation())).to.be.true
  })
})
describe('isCitation(UnrecognizedType)', () => {
  it('returns false for objects that lack a getFull() method.', () => {
    function Citation () {}
    Citation.prototype.getName = function () {return ''}
    Citation.prototype.getSource = function () {return ''}
    Citation.prototype.getType = function () {return 'Citation'}
    expect(isCitation(new Citation())).to.be.false
  })
  it('returns false for objects that lack a getName() method.', () => {
    function Citation () {}
    Citation.prototype.getFull = function () {return ''}
    Citation.prototype.getSource = function () {return ''}
    Citation.prototype.getType = function () {return 'Citation'}
    expect(isCitation(new Citation())).to.be.false
  })
  it('returns false for objects that lack a getSource() method.', () => {
    function Citation () {}
    Citation.prototype.getFull = function () {return ''}
    Citation.prototype.getName = function () {return ''}
    Citation.prototype.getType = function () {return 'Citation'}
    expect(isCitation(new Citation())).to.be.false
  })
  it('returns false for objects that lack a getType() method.', () => {
    function Citation () {}
    Citation.prototype.getFull = function () {return ''}
    Citation.prototype.getName = function () {return ''}
    Citation.prototype.getSource = function () {return ''}
    expect(isCitation(new Citation())).to.be.false
  })
  it('returns false for objects that behave like webpages, but return unrecognized types.', () => {
    function Citation () {}
    Citation.prototype.getFull = function () {return ''}
    Citation.prototype.getName = function () {return ''}
    Citation.prototype.getSource = function () {return ''}
    Citation.prototype.getType = function () {return 'Unrecognized'}
    expect(isCitation(new Citation())).to.be.false
  })
})

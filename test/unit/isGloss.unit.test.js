import chai from 'chai'
import mocha from 'mocha'
import { isGloss } from '../src/Utility/predicate.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isGloss()', () => {
  it('is a function.', () => {
    expect(typeof isGloss).to.equal('function')
  })
  it('returns false for null.', () => {
    expect(isGloss(null)).to.be.false
  })
  it('returns false for scalar values.', () => {
    expect(isGloss(true)).to.be.false
    expect(isGloss(false)).to.be.false
    expect(isGloss('')).to.be.false
    expect(isGloss(123)).to.be.false
    expect(isGloss(1.23)).to.be.false
  })
  it('returns false for invalid objects.', () => {
    expect(isGloss({})).to.be.false
    expect(isGloss([])).to.be.false
  })
})

describe('isGloss(Gloss)', () => {
  it('returns true for objects that behave like glosses.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).to.be.true
  })
})
describe('isGloss(UnrecognizedType)', () => {
  it('returns false for objects that lack a getMemo() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).to.be.false
  })
  it('returns false for objects that lack a getName() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).to.be.false
  })
  it('returns false for objects that lack a withDef() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).to.be.false
  })
  it('returns false for objects that lack a withMemo() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).to.be.false
  })
  it('returns false for objects that lack a withGloss() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    expect(isGloss(new Gloss())).to.be.false
  })
})
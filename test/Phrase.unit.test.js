import chai from 'chai'
import mocha from 'mocha'
import { Phrase } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Phrase()', () => {
  it('is a function.', () => {
    expect(typeof Phrase).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { Phrase() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Phrase())).to.equal(true)
    if (typeof Phrase().__proto__ === 'object') {
      expect(Object.isFrozen(Phrase().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('Phrase(): Parameters', function () {
  describe('1. normal', () => {
    it('accepts a string as parameter 1.', () => {
      expect(function () { new Phrase() }).not.to.throw(Error)
    })
  })
  describe('2. quote', () => {
    it('accepts a string as parameter 2.', () => {
      expect(function () { new Phrase('', '') }).not.to.throw(Error)
    })
  })
  describe('3. source', () => {
    it('accepts a string as parameter 3.', () => {
      expect(function () { new Phrase('', '', '') }).not.to.throw(Error)
    })
  })
})
describe('Phrase(): Instance Methods', function () {
  const aether = Phrase('Aether', 'Luminiferous aether', 'wikipedia')
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof Phrase().getName).to.equal('function')
    })
    it('returns value of normal.', () => {
      expect(Phrase().getSource()).to.equal('')
      expect(aether.getName()).to.equal('Aether')
    })
  })
  describe('getSource()', function () {
    it('is a function.', () => {
      expect(typeof Phrase().getSource).to.equal('function')
    })
    it('returns value of source.', () => {
      expect(Phrase().getSource()).to.equal('')
      expect(aether.getSource()).to.equal('wikipedia')
    })
  })
  describe('getFull()', function () {
    it('is a function.', () => {
      expect(typeof Phrase().getFull).to.equal('function')
    })
    it('returns empty string when normal is empty.', () => {
      expect(Phrase().getFull()).to.equal('')
    })
    it('returns value of quote', () => {
      expect(aether.getFull()).to.equal('Luminiferous aether')
    })
  })
  describe('withSource()', function () {
    const bunny = Phrase('bunny', 'jack rabbit')
    const bunnyWithSource = bunny.withSource('myMemory')
    it('is a function.', () => {
      expect(typeof Phrase().withSource).to.equal('function')
    })
    it('returns a new instance of $Phrase.', () => {
      expect(bunnyWithSource.constructor.name).to.equal('$Phrase')
    })
    it('adds a new source value.', () => {
      expect(bunnyWithSource.getSource()).to.equal('myMemory')
    })
    it('does not alter return value of .getName().', () => {
      expect(bunnyWithSource.getName()).to.equal(bunny.getName())
    })
    it('does not alter return value of .getFull().', () => {
      expect(bunnyWithSource.getFull()).to.equal(bunny.getFull())
    })
  })
})

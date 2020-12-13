import chai from 'chai'
import mocha from 'mocha'
import { Normal } from '../src/Quotes/Normal.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Normal()', () => {
  it('is a function.', () => {
    expect(typeof Normal).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { Normal(1, 2) }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Normal(1, 2))).to.equal(true)
    if (typeof Normal(1, 2).__proto__ === 'object') {
      expect(Object.isFrozen(Normal(1, 2).__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('Normal(): Function Signature', function () {
  describe('(normal, actual)', () => {
    it('accepts a non-empty string for parameters 1 and 2.', () => {
      expect(function () { new Normal('one', 'two') }).to.not.throw(Error)
    })
    it('accepts an integer for parameters 1 and 2.', () => {
      expect(function () { new Normal(1, 2) }).to.not.throw(Error)
    })
    it('rejects undefined for parameter 1.', () => {
      expect(function () { new Normal(undefined, 'two') }).to.throw(Error)
    })
    it('rejects empty string for parameter 1.', () => {
      expect(function () { new Normal('', 'two') }).to.throw(Error)
    })
    it('rejects undefined for parameter 2.', () => {
      expect(function () { new Normal('two', undefined) }).to.throw(Error)
    })
    it('rejects empty string for parameter 2.', () => {
      expect(function () { new Normal('two', '') }).to.throw(Error)
    })
  })
  describe('(normal, actual, source)', () => {
    it('accepts an empty string for parameter 3.', () => {
      expect(function () { new Normal(1, 2, '') }).not.to.throw(Error)
    })
  })
})
describe('Normal(): Instance Methods', function () {
  const aether = Normal('Aether', 'Luminiferous aether', 'wikipedia')
  describe('getFull()', function () {
    it('is a function.', () => {
      expect(typeof Normal(1, 2).getFull).to.equal('function')
    })
    it('returns the value of "actual"', () => {
      expect(aether.getFull()).to.equal('Luminiferous aether')
    })
  })
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof Normal(1, 2).getName).to.equal('function')
    })
    it('returns the "normal" value.', () => {
      expect(aether.getName()).to.equal('Aether')
    })
  })
  describe('getReference()', function () {
    it('is a function.', () => {
      expect(typeof Normal(1, 2).getReference).to.equal('function')
    })
    it('returns an empty string when no references exist.', () => {
      expect(Normal(1, 2).getReference()).to.equal('')
    })
    it('returns value of the first reference when only one exists.', () => {
      expect(aether.getReference()).to.equal('wikipedia')
    })
    it('returns value for given index.', () => {
      expect(Normal(1, 2, 'b', 'c').getReference(0)).to.equal('b')
      expect(Normal(1, 2, 'b', 'c').getReference(1)).to.equal('c')
    })
  })
  describe('hasReference()', function () {
    it('is a function.', () => {
      expect(typeof Normal(1, 2).hasReference).to.equal('function')
    })
    describe('Signature 1: hasReference()', function () {
      it('returns false when no references exist.', () => {
        expect(Normal(1, 2).hasReference()).to.equal(false)
      })
      it('returns true when one reference exists.', () => {
        expect(aether.hasReference()).to.equal(true)
      })
      it('returns true when two references exist.', () => {
        expect(Normal(1, 2, 'a', 'b').hasReference()).to.equal(true)
      })
    })
    describe('Signature 2: hasReference(name)', function () {
      const phrase = Normal(1, 2, 'a', 'b')
      it('returns false when given source does not exist.', () => {
        expect(phrase.hasReference('c')).to.equal(false)
      })
      it('returns true when given source exists.', () => {
        expect(phrase.hasReference('a')).to.equal(true)
        expect(phrase.hasReference('b')).to.equal(true)
      })
    })
  })
  describe('withReference()', function () {
    const bunny = Normal('bunny', 'jack rabbit')
    const bunnyWithSource = bunny.withReference('myMemory')
    it('is a function.', () => {
      expect(typeof Normal(1, 2).withReference).to.equal('function')
    })
    it('returns a new instance of $Normal.', () => {
      expect(bunnyWithSource.constructor.name).to.equal('$Normal')
    })
    it('adds single reference.', () => {
      expect(bunnyWithSource.getReference()).to.equal('myMemory')
    })
    it('adds multiple references.', () => {
      const multiRef = bunny.withReference('a', 'b', 'c')
      expect(multiRef.getReference(0)).to.equal('a')
      expect(multiRef.getReference(1)).to.equal('b')
      expect(multiRef.getReference(2)).to.equal('c')
    })
    it('does not alter return value of .getName().', () => {
      expect(bunnyWithSource.getName()).to.equal(bunny.getName())
    })
    it('does not alter return value of .getFull().', () => {
      expect(bunnyWithSource.getFull()).to.equal(bunny.getFull())
    })
  })
})

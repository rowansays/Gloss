import chai from 'chai'
import mocha from 'mocha'
import { Phrase } from '../src/Quotes/Phrase.js'
import { testFactoryFunction } from './helpers/factories.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

testFactoryFunction('Phrase', Phrase, Phrase())

describe('Phrase(): Parameters', function () {
  describe('1. value', () => {
    it('accepts a string as parameter 1.', () => {
      expect(function () { new Phrase() }).not.to.throw(Error)
    })
  })
  describe('2+. references', () => {
    it('accepts a string as parameter 3.', () => {
      expect(function () { new Phrase('', '') }).not.to.throw(Error)
      expect(function () { new Phrase('', '', '') }).not.to.throw(Error)
    })
  })
})
describe('Phrase(): Instance Methods', function () {
  const aether = Phrase('Aether', 'wikipedia')
  describe('getFull()', function () {
    it('is a function.', () => {
      expect(typeof Phrase().getFull).to.equal('function')
    })
    it('returns empty string when value is empty.', () => {
      expect(Phrase().getFull()).to.equal('')
    })
    it('returns empty string when value is non-empty', () => {
      expect(aether.getFull()).to.equal('')
    })
  })
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof Phrase().getName).to.equal('function')
    })
    it('returns value.', () => {
      expect(Phrase().getName()).to.equal('')
      expect(aether.getName()).to.equal('Aether')
    })
  })
  describe('getReference()', function () {
    it('is a function.', () => {
      expect(typeof Phrase().getReference).to.equal('function')
    })
    it('returns an empty string when no references exist.', () => {
      expect(Phrase().getReference()).to.equal('')
    })
    it('returns value of the first reference when only one exists.', () => {
      expect(aether.getReference()).to.equal('wikipedia')
    })
    it('returns value for given index.', () => {
      expect(Phrase('a', '', 'b', 'c').getReference(0)).to.equal('b')
      expect(Phrase('a', '', 'b', 'c').getReference(1)).to.equal('c')
    })
  })
  describe('hasReference()', function () {
    it('is a function.', () => {
      expect(typeof Phrase().hasReference).to.equal('function')
    })
    describe('Signature 1: hasReference()', function () {
      it('returns false when no references exist.', () => {
        expect(Phrase().hasReference()).to.equal(false)
      })
      it('returns true when one reference exists.', () => {
        expect(aether.hasReference()).to.equal(true)
      })
      it('returns true when two references exist.', () => {
        expect(Phrase('', '', 'a', 'b').hasReference()).to.equal(true)
      })
    })
    describe('Signature 2: hasReference(name)', function () {
      const phrase = Phrase('', '', 'a', 'b')
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
    const bunny = Phrase('bunny')
    const bunnyWithSource = bunny.withReference('myMemory')
    it('is a function.', () => {
      expect(typeof Phrase().withReference).to.equal('function')
    })
    it('returns a new instance of $Phrase.', () => {
      expect(bunnyWithSource.constructor.name).to.equal('$Phrase')
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

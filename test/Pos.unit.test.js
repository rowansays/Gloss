import chai from 'chai'
import mocha from 'mocha'
import { Pos } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Pos()', () => {
  it('is a function.', () => {
    expect(typeof Pos).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { Pos() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Pos())).to.equal(true)
    if (typeof Pos().__proto__ === 'object') {
      expect(Object.isFrozen(Pos().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('Pos(): Parameters', function () {
  describe('1. name', () => {
    it('accepts a string as parameter 1.', () => {
      expect(function () { new Pos() }).not.to.throw(Error)
    })
  })
  describe('2. case', () => {
    it('accepts a string as parameter 2.', () => {
      expect(function () { new Pos('', '') }).not.to.throw(Error)
    })
  })

  describe('3. source', () => {
    it('accepts a string as parameter 3.', () => {
      expect(function () { new Pos('', '', '') }).not.to.throw(Error)
    })
  })
})
describe('Pos(): Instance Methods', function () {
  const noun = new Pos('noun', 'genitive', 'websters')
  describe('getFull()', function () {
    it('is a function.', () => {
      expect(typeof Pos().getFull).to.equal('function')
    })
    it('returns empty string when both name and case are empty.', () => {
      expect(Pos().getFull()).to.equal('')
    })
    it('returns name when case is empty.', () => {
      expect(Pos('123').getFull()).to.equal('123')
    })
    it('returns case when name is empty.', () => {
      expect(Pos('', '456').getFull()).to.equal('456')
    })
    it('returns concatenated value of parameters 1 and 2.', () => {
      expect(noun.getFull()).to.equal('noun genitive')
    })
  })
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof Pos().getName).to.equal('function')
    })
    it('returns value of name.', () => {
      expect(Pos().getSource()).to.equal('')
      expect(noun.getName()).to.equal('noun')
    })
  })
  describe('getSource()', function () {
    it('is a function.', () => {
      expect(typeof Pos().getSource).to.equal('function')
    })
    it('returns value of parameter 1.', () => {
      expect(Pos().getSource()).to.equal('')
      expect(noun.getSource()).to.equal('websters')
    })
  })
  describe('withSource()', function () {
    const pronoun = Pos('pronoun', 'possessive')
    const pronounWithSource = pronoun.withSource('myMemory')
    it('is a function.', () => {
      expect(typeof Pos().withSource).to.equal('function')
    })
    it('returns a new instance of $Phrase.', () => {
      expect(pronounWithSource.constructor.name).to.equal('$Pos')
    })
    it('adds a new source value.', () => {
      expect(pronounWithSource.getSource()).to.equal('myMemory')
    })
    it('does not alter return value of .getName().', () => {
      expect(pronounWithSource.getName()).to.equal(pronoun.getName())
    })
    it('does not alter return value of .getFull().', () => {
      expect(pronounWithSource.getFull()).to.equal(pronoun.getFull())
    })
  })
})

import chai from 'chai'
import mocha from 'mocha'
import { Term } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function NamedObject () {}
NamedObject.prototype.getName = function () {return 'This is my name'}

function UnnamedObject () {}
UnnamedObject.prototype.getName = function () {return ''}

function Quote (source, name) {
  this.name = name
  this.source = source
}
Quote.prototype.getFull = function () { return this.name }
Quote.prototype.getName = function () { return this.name }
Quote.prototype.getSource = function () { return this.source }

describe('Term()', () => {
  it('is a function.', () => {
    expect(typeof Term).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { Term('a') }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Term('a'))).to.equal(true)
    if (typeof Term('a').__proto__ === 'object') {
      expect(Object.isFrozen(Term('a').__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('Term(): Function Signatures', function () {
  describe('(name)', () => {
    it('accepts a non-empty string as parameter one.', () => {
      expect(function () { Term('a') }).not.to.throw(Error)
    })
    it('accepts a number as parameter one.', () => {
      expect(function () { Term(123) }).not.to.throw(Error)
    })
    it('accepts a named object as parameter one.', () => {
      expect(function () { Term(new NamedObject()) }).not.to.throw(Error)
    })
    it('rejects empty strings as parameter one by throwing a TypeError.', () => {
      expect(function () { Term('') }).to.throw(TypeError)
    })
    it('rejects unnamed objects as parameter one by throwing a TypeError.', () => {
      expect(function () { Term(new UnnamedObject()) }).to.throw(TypeError)
    })
  })
  describe('(name, memo)', () => {
    it('accepts an empty string as parameter two.', () => {
      expect(function () { Term('a', '') }).not.to.throw(Error)
    })
    it('accepts a non-empty string as parameter two.', () => {
      expect(function () { Term('a', 'Betelgeuse') }).not.to.throw(Error)
    })
    it('accepts an integer as parameter two.', () => {
      expect(function () { Term('a', 123) }).not.to.throw(Error)
    })
    it('accepts a named object as parameter two.', () => {
      expect(function () { Term(new NamedObject()) }).not.to.throw(Error)
    })
    it('rejects an unnamed objects as parameter two by throwing a TypeError.', () => {
      expect(function () { Term(new UnnamedObject()) }).to.throw(TypeError)
    })
  })
  describe('(name, memo, ...defs)', () => {
    it('accepts Quote objects for parameters three, four, and five.', () => {
      expect(function () {
        const term = Term('a', '',
          new Quote('source', 'Three'),
          new Quote('source', 'Four'),
          new Quote('source', 'Five')
        )
      }).not.to.throw(Error)
    })
  })
})
describe('Term(): Properties', function () {
  describe('name', () => {
    it('Is an object.', () => {
      expect(typeof Term('a').name).to.equal('object')
    })
  })
})
describe('Term: Instance Methods', function () {
  describe('getMemo()', function () {
    it('is a function.', () => {
      expect(typeof Term('a').getMemo).to.equal('function')
    })
    it('returns empty string when no memo exists.', () => {
      expect(Term('a').getMemo()).to.equal('')
    })
    it('returns memo string when memo does exist.', () => {
      const memo = 'The book not the show.'
      expect(Term('American Gods', memo).getMemo()).to.equal(memo)
    })
  })
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof Term('a').getName).to.equal('function')
    })
    it('returns value of name.', () => {
      expect(Term('Poetic Edda').getName()).to.equal('Poetic Edda')
    })
  })
})

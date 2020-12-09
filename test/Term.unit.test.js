import chai from 'chai'
import mocha from 'mocha'
import { Term } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

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
describe('Term(): Parameters', function () {
  describe('1. name', () => {
    it('Throws a TypeError when an empty string is provided.', () => {
      expect(function () { Term('') }).to.throw(TypeError)
    })
    it('Throws a TypeError when an object with no name is provided.', () => {
      expect(function () {
        function NoName () {}
        NoName.prototype.getName = function () {return ''}
        Term(new NoName())
      }).to.throw(TypeError)
    })
    it('accepts a non-empty string as parameter one.', () => {
      expect(function () { Term('a') }).not.to.throw(Error)
    })
    it('accepts a number as parameter one.', () => {
      expect(function () { Term(123) }).not.to.throw(Error)
    })
  })
  describe('2. memo', () => {
    it('accepts an empty string as parameter two.', () => {
      expect(function () { Term('a', '') }).not.to.throw(Error)
    })
    it('accepts an empty string as parameter two.', () => {
      expect(function () { Term('a', '') }).not.to.throw(Error)
    })
  })
  describe('3.+ ...Definitions', () => {
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

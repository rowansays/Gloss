import chai from 'chai'
import mocha from 'mocha'
import { Term } from '../src/Entries/Term.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function Citation (source, name) {
  this.name = name
  this.source = source
}
Citation.prototype.getFull = function () { return this.name }
Citation.prototype.getName = function () { return this.name }
Citation.prototype.getSource = function () { return this.source }

describe('Term()', () => {
  it('is a function.', () => {
    expect(typeof Term).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { Term() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Term())).to.equal(true)
    if (typeof Term().__proto__ === 'object') {
      expect(Object.isFrozen(Term().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('Term(): Parameters', function () {
  describe('1. name', () => {
    it('accepts a string as parameter one.', () => {
      expect(function () { new Term('') }).not.to.throw(Error)
    })
  })
  describe('2. memo', () => {
    it('accepts a string as parameter two.', () => {
      expect(function () { new Term('', '') }).not.to.throw(Error)
    })
  })
  describe('3.+ ...Definitions', () => {
    it('accepts citation objects for parameters three, four, and five.', () => {
      const term = new Term('', '',
        new Citation('source', 'Three'),
        new Citation('source', 'Four'),
        new Citation('source', 'Five')
      )
      expect(function () { term }).not.to.throw(Error)
    })
  })
})
describe('Term: Instance Methods', function () {
  describe('getMemo()', function () {
    it('is a function.', () => {
      expect(typeof Term().getMemo).to.equal('function')
    })
    it('returns empty string when no memo exists.', () => {
      expect(Term('').getMemo()).to.equal('')
    })
    it('returns memo string when memo does exist.', () => {
      const memo = 'The book not the show.'
      expect(Term('American Gods', memo).getMemo()).to.equal(memo)
    })
  })
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof Term().getName).to.equal('function')
    })
    it('returns value of name.', () => {
      expect(Term('').getName()).to.equal('')
      expect(Term('Poetic Edda').getName()).to.equal('Poetic Edda')
    })
  })
})

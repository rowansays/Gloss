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
  describe('... Definitions', () => {
    it('accepts a string as parameter three.', () => {
      expect(function () { new Term('', '', '') }).not.to.throw(Error)
    })
  })
})
describe('Term: Instance Methods', function () {
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
describe('Term.fromObject()', function () {
  it('is a function.', () => {
    expect(typeof Term.fromObject).to.equal('function')
  })
  it('constructs an empty term by default.', () => {
    const part = Term.fromObject()
    expect(part.name).to.equal('')
    expect(part.defs.length).to.equal(0)
  })
  it('constructs an valid term from an object.', () => {
    const obj = {
      name: 'Monster',
      memo: 'Some say they are scary.',
      defs: [
        new Citation('source', 'Scary')
      ]
    }
    const term = Term.fromObject(obj)
    expect(term.getName()).to.equal(obj.name)
    expect(term.getMemo()).to.equal(obj.memo)
    expect(term.defs.length).to.equal(1)
  })
})

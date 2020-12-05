import chai from 'chai'
import mocha from 'mocha'
import { Dictionary } from '../Dictionary.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Dictionary()', () => {
  it('is a function', () => {
    expect(typeof Dictionary).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { Dictionary() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Dictionary())).to.equal(true)
    if (typeof Dictionary().__proto__ === 'object') {
      expect(Object.isFrozen(Dictionary().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('Parameters', function () {
  describe('1. name', () => {
    it('accepts a string as parameter one.', () => {
      expect(function () { new Dictionary('name') }).not.to.throw(Error)
    })
  })
  describe('2. description', () => {
    it('accepts a string as parameter two.', () => {
      expect(function () { new Dictionary('name', 'description') }).not.to.throw(Error)
    })
  })
})
describe('Properties', function () {
  describe('description', function () {
    it('defaults to an empty string.', () => {
      const d = new Dictionary()
      expect(d.description).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      const d = new Dictionary('Fenrir', 'A very big wolf puppy.')
      expect(d.description).to.equal('A very big wolf puppy.')
    })
  })
  describe('entries', function () {
    it('defaults to an empty array.', () => {
      const d = new Dictionary()
      expect(Array.isArray(d.entries)).to.equal(true)
    })
  })
  describe('name', function () {
    it('defaults to an empty string.', () => {
      const d = new Dictionary()
      expect(d.name).to.equal('')
    })
    it('inherits the value of parameter one.', () => {
      const n = 'Fenrir'
      const d = new Dictionary(n)
      expect(d.name).to.equal(n)
    })
  })
})

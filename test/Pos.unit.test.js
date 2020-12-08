import chai from 'chai'
import mocha from 'mocha'
import { Pos } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

const emptyPos = new Pos()
const nounPos = new Pos('websters', 'noun', 'genitive')

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
  describe('1. source', () => {
    it('accepts a string as parameter one.', () => {
      expect(function () { new Pos('') }).not.to.throw(Error)
    })
  })
  describe('2. name', () => {
    it('accepts a string as parameter two.', () => {
      expect(function () { new Pos('', '') }).not.to.throw(Error)
    })
  })
  describe('3. case', () => {
    it('accepts a string as parameter three.', () => {
      expect(function () { new Pos('', '', '') }).not.to.throw(Error)
    })
  })
})
describe('Pos: Instance Properties', function () {
  describe('source', function () {
    it('defaults to an empty string.', () => {
      expect(emptyPos.source).to.equal('')
    })
    it('inherits the value of parameter 3.', () => {
      expect(nounPos.source).to.equal('websters')
    })
  })
  describe('name', function () {
    it('defaults to an empty string.', () => {
      expect(emptyPos.name).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(nounPos.name).to.equal('noun')
    })
  })
  describe('case', function () {
    it('defaults to an empty string.', () => {
      expect(emptyPos.case).to.equal('')
    })
    it('inherits the value of parameter 2.', () => {
      expect(nounPos.case).to.equal('genitive')
    })
  })
})
describe('Pos: Instance Methods', function () {
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof emptyPos.getName).to.equal('function')
    })
    it('returns value of parameter 2.', () => {
      expect(emptyPos.getSource()).to.equal('')
      expect(nounPos.getName()).to.equal('noun')
    })
  })
  describe('getSource()', function () {
    it('is a function.', () => {
      expect(typeof emptyPos.getSource).to.equal('function')
    })
    it('returns value of parameter 1.', () => {
      expect(emptyPos.getSource()).to.equal('')
      expect(nounPos.getSource()).to.equal('websters')
    })
  })
  describe('getFull()', function () {
    it('is a function.', () => {
      expect(typeof emptyPos.getFull).to.equal('function')
    })
    it('returns empty string when both name and case are empty.', () => {
      expect(emptyPos.getFull()).to.equal('')
    })
    it('returns name when case is empty.', () => {
      expect(Pos('', '123').getFull()).to.equal('123')
    })
    it('returns case when name is empty.', () => {
      expect(Pos('', '', '456').getFull()).to.equal('456')
    })
    it('returns concatenated value of parameters 1 and 2.', () => {
      expect(nounPos.getFull()).to.equal('noun genitive')
    })
  })
})

import chai from 'chai'
import mocha from 'mocha'
import { Phrase } from '../Phrase.js'

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
  describe('1. source', () => {
    it('accepts a string as parameter one.', () => {
      expect(function () { new Phrase('') }).not.to.throw(Error)
    })
  })
  describe('2. normal', () => {
    it('accepts a string as parameter two.', () => {
      expect(function () { new Phrase('', '') }).not.to.throw(Error)
    })
  })
  describe('3. quote', () => {
    it('accepts a string as parameter three.', () => {
      expect(function () { new Phrase('', '', '') }).not.to.throw(Error)
    })
  })
})
describe('Phrase: Instance Properties', function () {
  describe('source', function () {
    it('defaults to an empty string.', () => {
      expect(Phrase().source).to.equal('')
    })
    it('inherits the value of parameter 1.', () => {
      expect(Phrase('websters', 'noun', 'genitive').source).to.equal('websters')
    })
  })
  describe('normal', function () {
    it('defaults to an empty string.', () => {
      expect(Phrase().normal).to.equal('')
    })
    it('inherits the value of parameter 2.', () => {
      expect(Phrase('websters', 'noun', 'genitive').normal).to.equal('noun')
    })
  })
  describe('quote', function () {
    it('defaults to an empty string.', () => {
      expect(Phrase().quote).to.equal('')
    })
    it('inherits the value of parameter 3.', () => {
      expect(Phrase('websters', 'noun', 'genitive').quote).to.equal('genitive')
    })
  })
})
describe('Phrase: Instance Methods', function () {
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof Phrase().getName).to.equal('function')
    })
    it('returns value of normal.', () => {
      expect(Phrase().getSource()).to.equal('')
      expect(Phrase('websters', 'noun', 'genitive').getName()).to.equal('noun')
    })
  })
  describe('getSource()', function () {
    it('is a function.', () => {
      expect(typeof Phrase().getSource).to.equal('function')
    })
    it('returns value of source.', () => {
      expect(Phrase().getSource()).to.equal('')
      expect(Phrase('websters', 'noun', 'genitive').getSource()).to.equal('websters')
    })
  })
})
describe('Phrase.fromObject()', function () {
  it('is a function.', () => {
    expect(typeof Phrase.fromObject).to.equal('function')
  })
  it('constructs an empty phrase by default.', () => {
    const part = Phrase.fromObject()
    expect(part.normal).to.equal('')
    expect(part.quote).to.equal('')
    expect(part.source).to.equal('')
  })
  it('constructs an valid phrase from an object.', () => {
    const obj = {
      source: 'memory',
      normal: 'þurs',
      quote: 'thurs',
    }
    const phrase = Phrase.fromObject(obj)
    expect(phrase.normal).to.equal(obj.normal)
    expect(phrase.quote).to.equal(obj.quote)
    expect(phrase.source).to.equal(obj.source)
  })
})

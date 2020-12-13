import chai from 'chai'
import mocha from 'mocha'

var expect = chai.expect
var it = mocha.it

export function testFactoryFunction(name, func, instance) {
  describe(`${name} Factory Tests`, () => {
    it('is a function.', () => {
      expect(typeof func).to.equal('function')
    })
    it('creates frozen instances.', function () {
      expect(Object.isFrozen(instance)).to.equal(true)
      if (typeof instance.__proto__ === 'object') {
        expect(Object.isFrozen(instance.__proto__)).to.equal(true)
      }
    })
    it('does not accidentally freeze the built-in Object prototype.', function () {
      expect(Object.isFrozen(Object.prototype)).to.equal(false)
    })
  })
}

export function testNameProp (func) {
  describe('({ name })', () => {
    it('accepts non-empty strings.', () => {
      expect(function () { func({ name: 'nobody' }) }).to.not.throw(Error)
    })
    it('accepts integers.', () => {
      expect(function () { func({ name: 123 }) }).to.not.throw(Error)
    })
    it('rejects empty names', () => {
      expect(function () { func() }).to.throw(Error)
      expect(function () { func({ name: null }) }).to.throw(Error)
      expect(function () { func({ name: undefined }) }).to.throw(Error)
      expect(function () { func({ name: '' }) }).to.throw(Error)
    })
    it('rejects a space character.', () => {
      expect(function () { func({ name: ' ' })}).to.throw(Error)
    })
    it('rejects multiple space characters.', () => {
      expect(function () { func({ name: '   ' })}).to.throw(Error)
    })
    it('rejects a tab character.', () => {
      expect(function () { func({ name: '  ' })}).to.throw(Error)
    })
    it('rejects multiple tab characters.', () => {
      expect(function () { func({ name: '      ' })}).to.throw(Error)
    })
  })
}

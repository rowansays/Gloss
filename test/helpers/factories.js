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

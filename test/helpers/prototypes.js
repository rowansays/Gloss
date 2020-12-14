import chai from 'chai'
import mocha from 'mocha'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

export function test(method, instance, tests) {
  tests = typeof tests === 'function' ? tests : () => {}
  describe(`${method}()`, function () {
    it('is in prototype chain', () => {
      expect(instance).to.have.a.property(method)
    })
    it('is a function', () => {
      expect(typeof instance[method]).to.equal('function')
    })
    tests()
  })
}

export function testAbstractObjectListPrototype(instance) {
  test('forEach', instance)
  test('getItem', instance, () => {
    it('returns undefined no items exist.', () => {
      expect(instance.getItem(0)).to.be.undefined
    })
  })
  test('getItems', instance, () => {
    it('returns empty array when no items exist.', () => {
      expect(Array.isArray(instance.getItems())).to.be.true
      expect(instance.getItems().length).to.equal(0)
    })
  })
  test('getName', instance)
  test('getSize', instance, () => {
    it('returns an integer with a value of zero when no items exist.', () => {
      expect(Number.isInteger(instance.getSize())).to.be.true
      expect(instance.getSize()).to.equal(0)
    })
  })
  test('has', instance, () => {
    it('returns false when list is empty.', () => {
      expect(instance.has('a')).to.be.false
    })
  })
  test('sortAscBy', instance, () => {
    it('returns an empty instance when no referenes exist.', () => {
      const sorted = instance.sortAscBy()
      expect(sorted.constructor).to.equal(instance.constructor)
      expect(sorted.getSize()).to.equal(0)
    })
  })
  test('sortDescBy', instance, () => {
    it('returns an empty GlossList instance when no entries exist.', () => {
      const sorted = instance.sortDescBy()
      expect(sorted.constructor).to.equal(instance.constructor)
      expect(sorted.getSize()).to.equal(0)
    })
  })
}

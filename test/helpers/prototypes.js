import chai from 'chai'
import mocha from 'mocha'

const describe = mocha.describe
const expect = chai.expect
const it = mocha.it

export function test (method, instance, tests) {
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
export function testMethodReturnsFrozenInstance (method, instance) {
  it('returns an instance of the same constructor.', () => {
    expect(instance[method]().constructor).to.equal(instance.constructor)
  })
  it('returns a frozen instance.', () => {
    expect(Object.isFrozen(instance[method]())).to.be.true
  })
}
export function testListInterface (instance) {
  test('add', instance, () => {
    testMethodReturnsFrozenInstance('add', instance)
  })
  test('entries', instance, () => {
    it('returns empty array when no items exist.', () => {
      expect(Array.isArray(instance.entries())).to.be.true
      expect(instance.entries().length).to.equal(0)
    })
  })
  test('forEach', instance)
  test('get', instance, () => {
    it('returns undefined no items exist.', () => {
      expect(instance.get(0)).to.be.undefined
    })
  })
  test('has', instance, () => {
    it('returns false when list is empty.', () => {
      expect(instance.has('a')).to.be.false
    })
  })
  describe('length', () => {
    it('is a property.', () => {
      expect(instance).to.have.a.property('length')
    })
    it('is an integer.', () => {
      expect(Number.isInteger(instance.length)).to.be.true
    })
    it('is zero when no items exist.', () => {
      expect(instance.length).to.equal(0)
    })
  })
}
export function testObjectListInterface (instance) {
  testListInterface (instance)
  test('sortAscBy', instance, () => {
    testMethodReturnsFrozenInstance('sortDescBy', instance)
    it('returns an empty instance when no referenes exist.', () => {
      const sorted = instance.sortAscBy()
      expect(sorted.constructor).to.equal(instance.constructor)
      expect(sorted.length).to.equal(0)
    })
  })
  test('sortDescBy', instance, () => {
    testMethodReturnsFrozenInstance('sortDescBy', instance)
    it('returns an empty GlossList instance when no entries exist.', () => {
      const sorted = instance.sortDescBy()
      expect(sorted.constructor).to.equal(instance.constructor)
      expect(sorted.length).to.equal(0)
    })
  })
}

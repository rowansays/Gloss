export function testProtoFunc (method, instance, tests) {
  tests = typeof tests === 'function' ? tests : () => {}
  describe(`${method}()`, function () {
    test('is a function in prototype chain', () => {
      expect(typeof instance[method]).toBe('function')
    })
    tests()
  })
}
export function testMethodReturnsFrozenInstance (method, instance) {
  it('returns an instance of the same constructor.', () => {
    expect(instance[method]().constructor).toEqual(instance.constructor)
  })
  it('returns a frozen instance.', () => {
    expect(Object.isFrozen(instance[method]())).toBe(true)
  })
}
export function testListInterface (instance) {
  testProtoFunc('add', instance, () => {
    testMethodReturnsFrozenInstance('add', instance)
  })
  testProtoFunc('entries', instance, () => {
    it('returns empty array when no items exist.', () => {
      expect(Array.isArray(instance.entries())).toBe(true)
      expect(instance.entries().length).toBe(0)
    })
  })
  testProtoFunc('forEach', instance)
  testProtoFunc('get', instance, () => {
    it('returns undefined when no items exist.', () => {
      expect(instance.get(0)).toBe(undefined)
    })
  })
  testProtoFunc('has', instance, () => {
    it('returns false when list is empty.', () => {
      expect(instance.has('a')).toBe(false)
    })
  })
  describe('length', () => {
    it('is an integer.', () => {
      expect(Number.isInteger(instance.length)).toBe(true)
    })
    it('is zero when no items exist.', () => {
      expect(instance.length).toBe(0)
    })
  })
}
export function testObjectListInterface (instance) {
  testListInterface (instance)
  testProtoFunc('sortAscBy', instance, () => {
    testMethodReturnsFrozenInstance('sortDescBy', instance)
    it('returns an empty instance when no referenes exist.', () => {
      const sorted = instance.sortAscBy()
      expect(sorted.constructor).toBe(instance.constructor)
      expect(sorted.length).toBe(0)
    })
  })
  testProtoFunc('sortDescBy', instance, () => {
    testMethodReturnsFrozenInstance('sortDescBy', instance)
    it('returns an empty GlossList instance when no entries exist.', () => {
      const sorted = instance.sortDescBy()
      expect(sorted.constructor).toBe(instance.constructor)
      expect(sorted.length).toBe(0)
    })
  })
}

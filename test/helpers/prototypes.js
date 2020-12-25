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

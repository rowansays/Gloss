export function testConstructor (func) {
  it('is a function', () => {
    expect(typeof func).toBe('function')
  })
  it('  ⋅ constructs without parameters', () => {
    expect(() => { new func() }).not.toThrow()
  })
  it('  ⋅ constructs frozen instances', function () {
    expect(Object.isFrozen(new func())).toBe(true)
  })
  it('  ⋅ constructs instances with frozen prototypes', function () {
    const t = new func()
    expect(Object.isFrozen(Object.getPrototypeOf(t))).toBe(true)
  })
  it('  ⋅ constructs instances of itself', function () {
    expect(new func()).toBeInstanceOf(func)
  })
  it('  ⋅ constructs instances that know their constructor', function () {
    expect((new func()).constructor).toBe(func)
  })
  it('  ⋅ throws if called without the new keyword', () => {
    expect(() => { func() }).toThrow()
  })
}

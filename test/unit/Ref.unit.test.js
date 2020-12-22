import { $Ref, Ref } from '../../src/Refs/Ref.js'

describe('$Ref', () => {
  it('is a function', () => {
    expect(typeof $Ref).toBe('function')
  })
  test('throws when no parameters are given.', () => {
    expect(() => { new $Ref() }).toThrow()
  })
  test('constructs with a non-empty name prop.', () => {
    expect(() => { new $Ref({ name: 'abc' }) }).not.toThrow()
  })
  it('is idempotent when simple', () => {
    const a = new $Ref({ name: 'abc' })
    const b = new $Ref(a)
    expect(b === a).toBe(false)
    expect(b).toMatchObject(a)
  })
  it('constructs frozen instances', function () {
    expect(Object.isFrozen(new $Ref({ name: 'abc' }))).toBe(true)
  })
  it('constructs instances with frozen prototypes', function () {
    const r = new $Ref({ name: 'abc' })
    expect(Object.isFrozen(Object.getPrototypeOf(r))).toBe(true)
  })
  it('constructs instances with frozen properties', function () {
    const r = new $Ref({ name: 'abc' })
    expect(Object.isFrozen(r.name)).toBe(true)
  })
  test('throws when name coerces to an empty string.', () => {
    expect(() => { new $Ref({ name: '' }) }).toThrow()
    expect(() => { new $Ref({ name: [] }) }).toThrow()
    expect(() => { new $Ref({ name: {} }) }).toThrow()
    expect(() => { new $Ref({ name: false }) }).toThrow()
  })
})

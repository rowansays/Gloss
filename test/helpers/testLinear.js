/**
 * Defines tests for the prototypes of all linear data structues.
 */
export function testLinear (func) {
  const instance = new func()
  it('column()', () => {
    expect(instance.column).not.toBeUndefined()
  })
  test('  ⋅ is a function', () => {
    expect(typeof instance.column).toBe('function')
  })
  it('  ⋅ returns an empty array when no parameters are passed', () => {
    expect(instance.column()).toEqual([])
  })
  it('  ⋅ returns an empty array when no columns exist', () => {
    expect(instance.column('I do not exist')).toEqual([])
  })
  it('get()', () => {
    expect(instance.get).not.toBeUndefined()
  })
  test('  ⋅ is a function', () => {
    expect(typeof instance.get).toBe('function')
  })
  it('  ⋅ returns undefined when no parameters are passed', () => {
    expect(instance.get()).toBeUndefined()
  })
  it('  ⋅ returns undefined index does not exist', () => {
    expect(instance.get(13)).toBeUndefined()
  })
  it('has()', () => {
    expect(instance.has).not.toBeUndefined()
  })
  test('  ⋅ is a function', () => {
    expect(typeof instance.has).toBe('function')
  })
  it('  ⋅ returns false when no parameters are passed', () => {
    expect(instance.has()).toBe(false)
  })
  it('  ⋅ returns false when list is empty', () => {
    expect(instance.has(13)).toBe(false)
  })
  it('length', () => {
    expect(instance.length).not.toBeUndefined()
  })
  it('  ⋅ is an integer.', () => {
    expect(Number.isInteger(instance.length)).toBe(true)
  })
  it('  ⋅ is zero when list is empty.', () => {
    expect(instance.length).toBe(0)
  })
  it('Symbol.iterator()', () => {
    expect(instance[Symbol.iterator]).not.toBeUndefined()
  })
  test('  ⋅ is a function', () => {
    expect(typeof instance[Symbol.iterator]).toBe('function')
  })
}
/**
 * Defines tests for the prototypes of all object lists.
 */
export function testObjectList (func) {
  const instance = new func()
  testLinear(func)
  it('add()', () => {
    expect(instance.add).not.toBeUndefined()
  })
  it('  ⋅ is a function', () => {
    expect(typeof instance.add).toBe('function')
  })
  it('  ⋅ returns "this" when no parameters are passed', () => {
    const a = new func()
    const b = a.add()
    expect(b === a).toBe(true)
  })
  it('entries()', () => {
    expect(instance.entries).not.toBeUndefined()
  })
  test('  ⋅ is a function', () => {
    expect(typeof instance.entries).toBe('function')
  })
  it('  ⋅ returns an empty array when list is empty', () => {
    expect(instance.entries()).toEqual([])
  })
  it('forEach()', () => {
    expect(instance.forEach).not.toBeUndefined()
  })
  test('  ⋅ is a function', () => {
    expect(typeof instance.forEach).toBe('function')
  })
  it('  ⋅ throws when parameter 1 is not a function', () => {
    expect(() => { instance.forEach() }).toThrow()
  })
  it('  ⋅ returns undefined when list is empty', () => {
    expect(instance.forEach(() => {})).toBeUndefined()
  })
  it('sortAscBy()', () => {
    expect(instance.sortAscBy).not.toBeUndefined()
  })
  it('  ⋅ is a function', () => {
    expect(typeof instance.sortAscBy).toBe('function')
  })
  it('  ⋅ returns "this" when list is empty', () => {
    const b = instance.sortAscBy()
    expect(b === instance).toBe(true)
  })
  it('sortDescBy()', () => {
    expect(instance.sortDescBy).not.toBeUndefined()
  })
  it('  ⋅ is a function', () => {
    expect(typeof instance.sortDescBy).toBe('function')
  })
  it('  ⋅ returns "this" when list is empty', () => {
    const b = instance.sortDescBy()
    expect(b === instance).toBe(true)
  })
}

export function testFactoryFunction (name, func, instance) {
  describe(`${name} Factory Tests`, () => {
    test('is a function.', () => {
      expect(typeof func).toBe('function')
    })
    test('creates frozen instances.', function () {
      expect(Object.isFrozen(instance)).toBe(true)
      if (typeof instance.__proto__ === 'object') {
        expect(Object.isFrozen(instance.__proto__)).toBe(true)
      }
    })
    test('does not accidentally freeze the built-in Object prototype.', function () {
      expect(Object.isFrozen(Object.prototype)).toBe(false)
    })
  })
}
/*
export function testNameProp (func) {
  describe('({ name })', () => {
    test('accepts non-empty strings.', () => {
      expect(function () { func({ name: 'nobody' }) }).to.not.throw(Error)
    })
    test('  - trims leading and trailing spaces.', () => {
      expect(func({ name: '   nobody   ' }).getName()).to.equal('nobody')
    })
    test('  - trims leading and trailing tabs.', () => {
      expect(func({ name: '\t\t\tnobody\t\t\t' }).getName()).to.equal('nobody')
    })
    test('  - trims leading and trailing spaces and tabs.', () => {
      expect(func({ name: '\t \t nobody \t \t' }).getName()).to.equal('nobody')
    })
    test('accepts integers.', () => {
      expect(function () { func({ name: 123 }) }).to.not.throw(Error)
    })
    test('  - casts integers to strings.', () => {
      expect(func({ name: 123 }).getName()).to.equal('123')
    })
    test('rejects empty names', () => {
      expect(function () { func() }).to.throw(Error)
      expect(function () { func({ name: null }) }).to.throw(Error)
      expect(function () { func({ name: undefined }) }).to.throw(Error)
      expect(function () { func({ name: '' }) }).to.throw(Error)
    })
    test('rejects a space character.', () => {
      expect(function () { func({ name: ' ' }) }).to.throw(Error)
    })
    test('rejects multiple space characters.', () => {
      expect(function () { func({ name: '   ' }) }).to.throw(Error)
    })
    test('rejects a tab character.', () => {
      expect(function () { func({ name: '\t' }) }).to.throw(Error)
    })
    test('rejects multiple tab characters.', () => {
      expect(function () { func({ name: '\t\t\t' }) }).to.throw(Error)
    })
  })
}
*/
export function testObjectPredicate(name, func, moreTests) {
  describe(`${name}()`, () => {
    test('is a function', () => {
      expect(typeof func).toBe('function')
    })
    test('returns false for null', () => {
      expect(func(null)).toBe(false)
    })
    test('returns false for boolean true', () => {
      expect(func(true)).toBe(false)
    })
    test('returns false for boolean false', () => {
      expect(func(false)).toBe(false)
    })
    test('returns false for strings', () => {
      expect(func('abc')).toBe(false)
    })
    test('returns false for integers', () => {
      expect(func(123)).toBe(false)
    })
    test('returns false for floats', () => {
      expect(func(1.23)).toBe(false)
    })
    test('returns false for empty pojos.', () => {
      expect(func({})).toBe(false)
    })
    test('returns false for empty arrays', () => {
      expect(func([])).toBe(false)
    })
    if (typeof moreTests === 'function') {
      moreTests()
    }
  })
}

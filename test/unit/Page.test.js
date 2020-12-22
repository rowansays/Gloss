import { $Page } from '../../src/Refs/Page.js'
import { isRef } from '../../src/Utility/predicate.js'


it('is a function', () => {
  expect(typeof $Page).toBe('function')
})
test('throws when no parameters are given.', () => {
  expect(() => { new $Page() }).toThrow()
})
it('constructs with one integer', () => {
  expect(() => { new $Page(13) }).not.toThrow()
})
it('constructs frozen instances', function () {
  expect(Object.isFrozen(new $Page(13))).toBe(true)
})
it('constructs instances with frozen prototypes', function () {
  expect(Object.isFrozen(Object.getPrototypeOf(new $Page(13)))).toBe(true)
})
it('constructs instances with frozen properties', function () {
  const p = new $Page(13)
  expect(Object.isFrozen(p.name)).toBe(true)
})
it('is idempotent when singular', () => {
  const a = new $Page(13)
  const b = new $Page(a)
  expect(b === a).toBe(false)
  expect(b).toMatchObject(a)
})
it('is idempotent when complex', () => {
  const a = new $Page(111, 5, 23, 33, 13, 3, 9)
  const b = new $Page(a)
  expect(b === a).toBe(false)
  expect(b).toMatchObject(a)
})
test('throws when all page numbers coerce to an empty string.', () => {
  expect(() => { new Page('') }).toThrow()
  expect(() => { new Page('', '') }).toThrow()
  expect(() => { new Page([], [], []) }).toThrow()
  expect(() => { new Page({}, {}, {}) }).toThrow()
})
test('accepts 2 integers as parameters', () => {
  const p = new $Page(13, 23)
  expect(p.name).toBe('pp. 13, 23')
})
test('sorts number parameters in ascending order', () => {
  const p = new $Page(111, 5, 23, 33, 13, 3, 9)
  expect(p.name).toBe('pp. 3, 5, 9, 13, 23, 33, 111')
})
test('sorts string parameters in ascending order', () => {
  const p = new $Page('B23', 'A13', 'B99', 'A1')
  expect(p.name).toBe('pp. A1, A13, B23, B99')
})

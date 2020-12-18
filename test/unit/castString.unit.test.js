import { castString } from '../../src/Utility/castString.js'

describe('castString()', () => {
  test('is a function.', () => {
    expect(typeof castString).toBe('function')
  })
  test('returns an empty string when no parameters are passed.', () => {
    expect(castString()).toBe('')
  })
  test('returns an empty string for many objects.', () => {
    expect(castString(null)).toBe('')
    expect(castString({})).toBe('')
    expect(castString([])).toBe('')
  })
  test('trims spaces from boths sides of a string.', () => {
    expect(castString(' A ',)).toBe('A')
  })
  test('considers a space to be empty.', () => {
    expect(castString(' ')).toBe('')
    expect(castString('  ')).toBe('')
    expect(castString('   ')).toBe('')
  })
  test('considers a tabs to be empty.', () => {
    expect(castString(' ')).toBe('')
    expect(castString('    ')).toBe('')
    expect(castString('      ')).toBe('')
  })
  test('coerces numbers to strings.', () => {
    expect(castString(123)).toBe('123')
  })
  test('extracts the "name" value from objects with a getName() method.', () => {
    function NamedObject (name) { this.name = name }
    NamedObject.prototype.getName = function () { return this.name }
    expect(castString(new NamedObject('Kublai Khan'))).toBe('Kublai Khan')
  })
  test('perserves valid string values.', () => {
    expect(castString('Juniper')).toBe('Juniper')
  })
})

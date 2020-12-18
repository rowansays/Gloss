import { StringList } from '../../src/Lists/StringList.js'
import { testFactoryFunction } from '../helpers/factories.js'
import {
  testListInterface,
  testMethodReturnsFrozenInstance
} from '../helpers/prototypes.js'

testFactoryFunction('StringList', StringList, StringList())
testListInterface(StringList())

testMethodReturnsFrozenInstance('sort', StringList())

describe('StringList(): Parameters', function () {
  describe('1+. ...strings', () => {
    it('accepts a string.', () => {
      expect(function () { StringList('A') }).not.toThrow(Error)
    })
    it('accepts multiple strings.', () => {
      expect(function () { StringList('A', 'B', 'C') }).not.toThrow(Error)
    })
    it('does not store duplicates.', () => {
      expect(StringList('A', 'A', 'A').length).toBe(1)
    })
    it('does not store empty strings.', () => {
      expect(StringList('', '', '').length).toBe(0)
    })
    it('considers a space to be empty.', () => {
      expect(StringList(' ', '  ', '   ').length).toBe(0)
    })
    it('considers a tabs to be empty.', () => {
      expect(StringList(' ', '    ', '      ').length).toBe(0)
    })
    it('trims spaces from boths sides of a string.', () => {
      expect(StringList(' A ',).get(0)).toBe('A')
    })
    it('coerces numbers to strings.', () => {
      const list = StringList(0, 1, 2)
      expect(list.get(0)).toBe('0')
      expect(list.get(1)).toBe('1')
      expect(list.get(2)).toBe('2')
    })
  })
})
describe('StringList(): Instance Methods', function () {
  describe('forEach()', function () {
    it('is a function.', () => {
      expect(typeof StringList().forEach).toBe('function')
    })
    it('returns undefined.', () => {
      const a = StringList()
      const b = a.forEach(() => {})
      expect(typeof b).toBe('undefined')
    })
    it('executes given callback function on each item.', () => {
      const list = StringList('A', 'B', 'C')
      const listWithUnderscores = []
      list.forEach(s => {
        listWithUnderscores.push('_' + s)
      })
      expect(listWithUnderscores[0]).toBe('_A')
      expect(listWithUnderscores[1]).toBe('_B')
      expect(listWithUnderscores[2]).toBe('_C')
    })
  })
  describe('has()', function () {
    it('is a function.', () => {
      expect(typeof StringList().has).toBe('function')
    })
    it('returns false when item does not exist.', () => {
      expect(StringList('a').has('b')).toBe(false)
    })
    it('returns true when item exists.', () => {
      expect(StringList('a').has('a')).toBe(true)
    })
  })
  describe('get()', function () {
    it('is a function.', () => {
      expect(typeof StringList().get).toBe('function')
    })
    it('returns undefined when the given item does not exist.', () => {
      expect(typeof StringList('A', 'B', 'C').get(3)).toBe('undefined')
    })
    it('returns string when a valid description exists.', () => {
      expect(StringList('A').get(0)).toBe('A')
    })
  })
  describe('length', function () {
    it('is an integer.', () => {
      expect(Number.isInteger(StringList().length)).toBe(true)
    })
    it('returns zero when no strings exist.', () => {
      expect(StringList().length).toBe(0)
    })
    it('returns one when there is only one string.', () => {
      expect(StringList('a').length).toBe(1)
    })
    it('returns two when there are two strings.', () => {
      expect(StringList('a', 'b').length).toBe(2)
    })
    it('returns three when there are three strings.', () => {
      expect(StringList('a', 'b', 'c').length).toBe(3)
    })
  })
  describe('sort()', function () {
    it('is a function.', () => {
      expect(typeof StringList().sort).toBe('function')
    })
    it('returns an instance of $StringList.', () => {
      expect(StringList().sort().constructor.name).toBe('$StringList')
    })
    it('sorts strings in ascending alphabetic order by default.', () => {
      const list = StringList('c', 'b', 'a').sort()
      expect(list.get(0)).toBe('a')
      expect(list.get(1)).toBe('b')
      expect(list.get(2)).toBe('c')
    })
  })
  describe('add()', function () {
    it('is a function.', () => {
      expect(typeof StringList().add).toBe('function')
    })
    it('returns an instance of $StringList.', () => {
      expect(StringList().add().constructor.name).toBe('$StringList')
    })
    it('appends a single, unique string.', () => {
      const list = StringList('a', 'b').add('c')
      expect(list.get(0)).toBe('a')
      expect(list.get(1)).toBe('b')
      expect(list.get(2)).toBe('c')
    })
    it('appends two, unique strings.', () => {
      const list = StringList('a').add('b', 'c')
      expect(list.get(0)).toBe('a')
      expect(list.get(1)).toBe('b')
      expect(list.get(2)).toBe('c')
    })
    it('ignores non-strings.', () => {
      const list = StringList('a').add(null, [], {})
      expect(list.get(0)).toBe('a')
      expect(list.get(1)).toBe(void 1)
      expect(list.get(2)).toBe(void 1)
    })
    it('coerces numbers to strings.', () => {
      const list = StringList('a').add(1, 2)
      expect(list.get(0)).toBe('a')
      expect(list.get(1)).toBe('1')
      expect(list.get(2)).toBe('2')
    })
  })
})

import chai from 'chai'
import mocha from 'mocha'
import { StringList } from '../src/Lists/StringList.js'
import { testFactoryFunction } from './helpers/factories.js'
import {
  testListInterface,
  testMethodReturnsFrozenInstance
} from './helpers/prototypes.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

testFactoryFunction('StringList', StringList, StringList())
testListInterface(StringList())

testMethodReturnsFrozenInstance('sort', StringList())

describe('StringList(): Parameters', function () {
  describe('1+. ...strings', () => {
    it('accepts a string.', () => {
      expect(function () { StringList('A') }).not.to.throw(Error)
    })
    it('accepts multiple strings.', () => {
      expect(function () { StringList('A', 'B', 'C') }).not.to.throw(Error)
    })
    it('does not store duplicates.', () => {
      expect(StringList('A', 'A', 'A').length).to.equal(1)
    })
    it('does not store empty strings.', () => {
      expect(StringList('', '', '').length).to.equal(0)
    })
    it('considers a space to be empty.', () => {
      expect(StringList(' ', '  ', '   ').length).to.equal(0)
    })
    it('considers a tabs to be empty.', () => {
      expect(StringList(' ', '    ', '      ').length).to.equal(0)
    })
    it('trims spaces from boths sides of a string.', () => {
      expect(StringList(' A ',).get(0)).to.equal('A')
    })
    it('coerces numbers to strings.', () => {
      const list = StringList(0, 1, 2)
      expect(list.get(0)).to.equal('0')
      expect(list.get(1)).to.equal('1')
      expect(list.get(2)).to.equal('2')
    })
  })
})
describe('StringList(): Instance Methods', function () {
  describe('forEach()', function () {
    it('is a function.', () => {
      expect(typeof StringList().forEach).to.equal('function')
    })
    it('returns undefined.', () => {
      const a = StringList()
      const b = a.forEach(() => {})
      expect(typeof b).to.equal('undefined')
    })
    it('executes given callback function on each item.', () => {
      const list = StringList('A', 'B', 'C')
      const listWithUnderscores = []
      list.forEach(s => {
        listWithUnderscores.push('_' + s)
      })
      expect(listWithUnderscores[0]).to.equal('_A')
      expect(listWithUnderscores[1]).to.equal('_B')
      expect(listWithUnderscores[2]).to.equal('_C')
    })
  })
  describe('has()', function () {
    it('is a function.', () => {
      expect(typeof StringList().has).to.equal('function')
    })
    it('returns false when item does not exist.', () => {
      expect(StringList('a').has('b')).to.be.false
    })
    it('returns true when item exists.', () => {
      expect(StringList('a').has('a')).to.be.true
    })
  })
  describe('get()', function () {
    it('is a function.', () => {
      expect(typeof StringList().get).to.equal('function')
    })
    it('returns undefined when the given item does not exist.', () => {
      expect(typeof StringList('A', 'B', 'C').get(3)).to.equal('undefined')
    })
    it('returns string when a valid description exists.', () => {
      expect(StringList('A').get(0)).to.equal('A')
    })
  })
  describe('length', function () {
    it('is an integer.', () => {
      expect(Number.isInteger(StringList().length)).to.be.true
    })
    it('returns zero when no strings exist.', () => {
      expect(StringList().length).to.equal(0)
    })
    it('returns one when there is only one string.', () => {
      expect(StringList('a').length).to.equal(1)
    })
    it('returns two when there are two strings.', () => {
      expect(StringList('a', 'b').length).to.equal(2)
    })
    it('returns three when there are three strings.', () => {
      expect(StringList('a', 'b', 'c').length).to.equal(3)
    })
  })
  describe('sort()', function () {
    it('is a function.', () => {
      expect(typeof StringList().sort).to.equal('function')
    })
    it('returns an instance of $StringList.', () => {
      expect(StringList().sort().constructor.name).to.equal('$StringList')
    })
    it('sorts strings in ascending alphabetic order by default.', () => {
      const list = StringList('c', 'b', 'a').sort()
      expect(list.get(0)).to.equal('a')
      expect(list.get(1)).to.equal('b')
      expect(list.get(2)).to.equal('c')
    })
  })
  describe('add()', function () {
    it('is a function.', () => {
      expect(typeof StringList().add).to.equal('function')
    })
    it('returns an instance of $StringList.', () => {
      expect(StringList().add().constructor.name).to.equal('$StringList')
    })
    it('appends a single, unique string.', () => {
      const list = StringList('a', 'b').add('c')
      expect(list.get(0)).to.equal('a')
      expect(list.get(1)).to.equal('b')
      expect(list.get(2)).to.equal('c')
    })
    it('appends two, unique strings.', () => {
      const list = StringList('a').add('b', 'c')
      expect(list.get(0)).to.equal('a')
      expect(list.get(1)).to.equal('b')
      expect(list.get(2)).to.equal('c')
    })
    it('ignores non-strings.', () => {
      const list = StringList('a').add(null, [], {})
      expect(list.get(0)).to.equal('a')
      expect(list.get(1)).to.equal(void 1)
      expect(list.get(2)).to.equal(void 1)
    })
    it('coerces numbers to strings.', () => {
      const list = StringList('a').add(1, 2)
      expect(list.get(0)).to.equal('a')
      expect(list.get(1)).to.equal('1')
      expect(list.get(2)).to.equal('2')
    })
  })
})
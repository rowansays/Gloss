import chai from 'chai'
import mocha from 'mocha'
import { StringList } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('StringList()', () => {
  it('is a function.', () => {
    expect(typeof StringList).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { StringList() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(StringList())).to.equal(true)
    if (typeof StringList().__proto__ === 'object') {
      expect(Object.isFrozen(StringList().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('StringList(): Parameters', function () {
  describe('1+. ...strings', () => {
    it('accepts a string.', () => {
      expect(function () { StringList('A') }).not.to.throw(Error)
    })
    it('accepts multiple strings.', () => {
      expect(function () { StringList('A', 'B', 'C') }).not.to.throw(Error)
    })
    it('does not store duplicates.', () => {
      expect(StringList('A', 'A', 'A').getSize()).to.equal(1)
    })
    it('does not store empty strings.', () => {
      expect(StringList('', '', '').getSize()).to.equal(0)
    })
    it('considers a spaces to be empty.', () => {
      expect(StringList(' ', '  ', '   ').getSize()).to.equal(0)
    })
    it('considers a tabs to be empty.', () => {
      expect(StringList(' ', '    ', '      ').getSize()).to.equal(0)
    })
    it('trims spaces from boths sides of a string.', () => {
      expect(StringList(' A ',).getItem(0)).to.equal('A')
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
  describe('getItem()', function () {
    it('is a function.', () => {
      expect(typeof StringList().getItem).to.equal('function')
    })
    it('returns undefined when the given item does not exist.', () => {
      expect(typeof StringList('A', 'B', 'C').getItem(3)).to.equal('undefined')
    })
    it('returns string when a valid description exists.', () => {
      expect(StringList('A').getItem(0)).to.equal('A')
    })
  })
  describe('getSize()', function () {
    it('is a function.', () => {
      expect(typeof StringList().getSize).to.equal('function')
    })
    it('returns zero when no strings exist.', () => {
      expect(StringList().getSize()).to.equal(0)
    })
    it('returns one when there is only one string.', () => {
      expect(StringList('a').getSize()).to.equal(1)
    })
    it('returns two when there are two strings.', () => {
      expect(StringList('a', 'b').getSize()).to.equal(2)
    })
    it('returns three when there are three strings.', () => {
      expect(StringList('a', 'b', 'c').getSize()).to.equal(3)
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
      expect(list.getItem(0)).to.equal('a')
      expect(list.getItem(1)).to.equal('b')
      expect(list.getItem(2)).to.equal('c')
    })
  })
})

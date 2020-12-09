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
describe('StringList: Instance Methods', function () {
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
  /*
  describe('getSize()', function () {
    it('is a function.', () => {
      expect(typeof StringList().getKey).to.equal('function')
    })
    it('returns empty when no description exists.', () => {
      expect(StringList().getKey()).to.equal('')
    })
    it('returns string when a valid description exists.', () => {
      expect(wikiPage.getKey()).to.equal('wikipedia:unitTesting')
    })
  })
  describe('sort()', function () {
    it('is a function.', () => {
      expect(typeof StringList().getName).to.equal('function')
    })
    it('inherits title from work parameter when no parameters are defined.', () => {
      expect(wikiPage.getName()).to.equal('Unit Testing')
    })
    it('returns title from work parameter when parameter 1 is "short".', () => {
      const name = wikiPage.getName('short')
      expect(name).to.equal('Unit Testing')
    })
    it('concatenates title and subtitle when parameter 1 is "long".', () => {
      const name = wikiPage.getName('long')
      expect(name).to.equal('Unit Testing From Wikipedia, the free encyclopedia')
    })
    it('returns title when parameter 1 is unrecognized.', () => {
      const name = wikiPage.getName([])
      expect(name).to.equal('Unit Testing')
    })
  })
  */
})

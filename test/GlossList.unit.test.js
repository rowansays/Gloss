import chai from 'chai'
import mocha from 'mocha'
import { GlossList } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function Gloss (name, memo, ...quotes) {
  this.name = name
  this.memo = memo
  this.quotes = Array.isArray(quotes) ? quotes : []
}
Gloss.prototype.getMemo = function () { return this.memo }
Gloss.prototype.getName = function () { return this.name }
Gloss.prototype.getSize = function () { return this.quotes.length }
Gloss.prototype.sortDefsByName = function () { return this.quotes }
Gloss.prototype.withDef = function () { return this }

describe('GlossList()', () => {
  it('is a function.', () => {
    expect(typeof GlossList).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { GlossList() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(GlossList())).to.equal(true)
    if (typeof GlossList().__proto__ === 'object') {
      expect(Object.isFrozen(GlossList().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('GlossList(): Parameters', function () {
  describe('1.+ ...entries', () => {
    it('accepts entry objects for parameters one, two, and three.', () => {
      expect(function () {
        new GlossList(
          new Gloss('source', 'Three'),
          new Gloss('source', 'Four'),
          new Gloss('source', 'Five')
        )
      }).not.to.throw(Error)
    })
  })
})
describe('GlossList(): Instance Methods', function () {
  describe('has()', function () {
    it('is a function.', () => {
      expect(typeof GlossList().has).to.equal('function')
    })
    it('returns false when list is empty.', () => {
      expect(GlossList().has('a')).to.be.false
    })
    it('returns false when a given gloss does not exist.', () => {
      expect(GlossList(new Gloss('a')).has('b')).to.be.false
    })
    it('returns true when a given gloss does exist.', () => {
      expect(GlossList(new Gloss('a')).has('a')).to.be.true
    })
  })
  describe('Inherited from AbstractObjectList()', function () {
    describe('getItems()', function () {
      it('does exist.', () => {
        expect(!!GlossList().getItems).to.be.true
      })
      it('is a function.', () => {
        expect(typeof GlossList().getItems).to.equal('function')
      })
      it('returns empty array when no referenes exist.', () => {
        expect(Array.isArray(GlossList().getItems())).to.be.true
        expect(GlossList().getItems().length).to.equal(0)
      })
    })
    describe('getSize()', function () {
      it('does exist.', () => {
        expect(!!GlossList().getSize).to.be.true
      })
      it('is a function.', () => {
        expect(typeof GlossList().getSize).to.equal('function')
      })
      it('returns an integer with a value of zero when no referenes exist.', () => {
        expect(Number.isInteger(GlossList().getSize())).to.be.true
        expect(GlossList().getSize()).to.equal(0)
      })
    })
    describe('sortAscBy()', function () {
      it('does exist.', () => {
        expect(!!GlossList().sortAscBy).to.be.true
      })
      it('is a function.', () => {
        expect(typeof GlossList().sortAscBy).to.equal('function')
      })
      it('returns an empty GlossList instance when no referenes exist.', () => {
        const list = GlossList()
        const sorted = list.sortAscBy()
        expect(sorted.constructor.name).to.equal('$GlossList')
        expect(GlossList().getSize()).to.equal(0)
      })
      it('sorts by name.', () => {
        const list = GlossList(
          new Gloss('Bobcat'),
          new Gloss('Calico'),
          new Gloss('Aegean')
        )
        const sorted = list.sortAscBy('Name')
        expect(sorted.constructor.name).to.equal('$GlossList')
        expect(sorted.getItem(0).getName()).to.equal('Aegean')
        expect(sorted.getItem(1).getName()).to.equal('Bobcat')
        expect(sorted.getItem(2).getName()).to.equal('Calico')
      })
    })
    describe('sortDescBy()', function () {
      it('does exist.', () => {
        expect(!!GlossList().sortDescBy).to.be.true
      })
      it('is a function.', () => {
        expect(typeof GlossList().sortDescBy).to.equal('function')
      })
      it('returns an empty GlossList instance when no entries exist.', () => {
        const list = GlossList()
        const sorted = list.sortDescBy()
        expect(sorted.constructor.name).to.equal('$GlossList')
        expect(GlossList().getSize()).to.equal(0)
      })
      it('sorts by name.', () => {
        const list = GlossList(
          new Gloss('Bobcat'),
          new Gloss('Aegean'),
          new Gloss('Calico')
        )
        const sorted = list.sortDescBy('Name')
        expect(sorted.constructor.name).to.equal('$GlossList')
        expect(sorted.getItem(0).getName()).to.equal('Calico')
        expect(sorted.getItem(1).getName()).to.equal('Bobcat')
        expect(sorted.getItem(2).getName()).to.equal('Aegean')
      })
    })
  })
})

import chai from 'chai'
import mocha from 'mocha'
import { EntryList } from '../src/Lists/EntryList.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function Entry (name, memo, ...references) {
  this.name = name
  this.memo = memo
  this.references = Array.isArray(references) ? references : []
}
Entry.prototype.getMemo = function () { return this.memo }
Entry.prototype.getName = function () { return this.name }
Entry.prototype.getSize = function () { return this.references.length }
Entry.prototype.sortByName = function () { return this.references }
Entry.prototype.getItems = function () { return this.references }

describe('EntryList()', () => {
  it('is a function.', () => {
    expect(typeof EntryList).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { EntryList() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(EntryList())).to.equal(true)
    if (typeof EntryList().__proto__ === 'object') {
      expect(Object.isFrozen(EntryList().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('EntryList(): Parameters', function () {
  describe('1.+ ...entries', () => {
    it('accepts entry objects for parameters one, two, and three.', () => {
      expect(function () {
        new EntryList(
          new Entry('source', 'Three'),
          new Entry('source', 'Four'),
          new Entry('source', 'Five')
        )
      }).not.to.throw(Error)
    })
  })
})

describe('EntryList(): Inherited Methods', function () {
  describe('getItems()', function () {
    it('does exist.', () => {
      expect(!!EntryList().getItems).to.be.true
    })
    it('is a function.', () => {
      expect(typeof EntryList().getItems).to.equal('function')
    })
    it('returns empty array when no referenes exist.', () => {
      expect(Array.isArray(EntryList().getItems())).to.be.true
      expect(EntryList().getItems().length).to.equal(0)
    })
  })
  describe('getSize()', function () {
    it('does exist.', () => {
      expect(!!EntryList().getSize).to.be.true
    })
    it('is a function.', () => {
      expect(typeof EntryList().getSize).to.equal('function')
    })
    it('returns an integer with a value of zero when no referenes exist.', () => {
      expect(Number.isInteger(EntryList().getSize())).to.be.true
      expect(EntryList().getSize()).to.equal(0)
    })
  })
  describe('sortAscBy()', function () {
    it('does exist.', () => {
      expect(!!EntryList().sortAscBy).to.be.true
    })
    it('is a function.', () => {
      expect(typeof EntryList().sortAscBy).to.equal('function')
    })
    it('returns an empty EntryList instance when no referenes exist.', () => {
      const list = EntryList()
      const sorted = list.sortAscBy()
      expect(sorted.constructor.name).to.equal('$EntryList')
      expect(EntryList().getSize()).to.equal(0)
    })
    it('sorts by name.', () => {
      const list = EntryList(
        new Entry('Bobcat'),
        new Entry('Calico'),
        new Entry('Aegean')
      )
      const sorted = list.sortAscBy('Name')
      expect(sorted.constructor.name).to.equal('$EntryList')
      expect(sorted.getItem(0).getName()).to.equal('Aegean')
      expect(sorted.getItem(1).getName()).to.equal('Bobcat')
      expect(sorted.getItem(2).getName()).to.equal('Calico')
    })
  })
  describe('sortDescBy()', function () {
    it('does exist.', () => {
      expect(!!EntryList().sortDescBy).to.be.true
    })
    it('is a function.', () => {
      expect(typeof EntryList().sortDescBy).to.equal('function')
    })
    it('returns an empty EntryList instance when no entries exist.', () => {
      const list = EntryList()
      const sorted = list.sortDescBy()
      expect(sorted.constructor.name).to.equal('$EntryList')
      expect(EntryList().getSize()).to.equal(0)
    })
    it('sorts by name.', () => {
      const list = EntryList(
        new Entry('Bobcat'),
        new Entry('Aegean'),
        new Entry('Calico')
      )
      const sorted = list.sortDescBy('Name')
      expect(sorted.constructor.name).to.equal('$EntryList')
      expect(sorted.getItem(0).getName()).to.equal('Calico')
      expect(sorted.getItem(1).getName()).to.equal('Bobcat')
      expect(sorted.getItem(2).getName()).to.equal('Aegean')
    })
  })
})

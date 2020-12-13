// System under test.
import { GlossList } from '../src/Lists/GlossList.js'

// Test library
import chai from 'chai'
import mocha from 'mocha'
import { testAbstractObjectListPrototype } from './helpers/prototypes.js'
import { testFactoryFunction } from './helpers/factories.js'

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
Gloss.prototype.withGloss = function () { return this }
Gloss.prototype.withMemo = function () {return this}

testFactoryFunction('GlossList', GlossList, GlossList())

describe('GlossList.prototype', () => {
  const g = GlossList()
  it('.has()', () => { expect(typeof g.has).to.equal('function') })
  testAbstractObjectListPrototype(g)
})
describe('GlossList(): Parameters', function () {
  describe('1.+ ...entries', () => {
    it('accepts a gloss for parameters one, two, and three.', () => {
      expect(function () {
        GlossList(new Gloss('a'), new Gloss('b'), new Gloss('c'))
      }).not.to.throw(Error)
    })
    it('accepts an array of glosses for parameter one.', () => {
      const gl = GlossList([new Gloss('a'), new Gloss('b'), new Gloss('c')])
      expect(gl.has('a')).to.be.true
      expect(gl.has('b')).to.be.true
      expect(gl.has('c')).to.be.true
    })
    it('accepts a GlossList as parameter one.', () => {
      const gl1 = GlossList(new Gloss('a'), new Gloss('b'), new Gloss('c'))
      const gl2 = GlossList(gl1)
      expect(gl2.has('a')).to.be.true
      expect(gl2.has('b')).to.be.true
      expect(gl2.has('c')).to.be.true
    })
    it('accepts a mixture of parameter types.', () => {
      const gloss = new Gloss('a')
      const array = [new Gloss('b')]
      const list = GlossList(new Gloss('c'))
      const gl = GlossList(gloss, array, list)
      expect(gl.has('a')).to.be.true
      expect(gl.has('b')).to.be.true
      expect(gl.has('c')).to.be.true
    })
  })
})
describe('GlossList(): Instance Methods', function () {
  describe('has()', function () {
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
      it('returns empty array when no referenes exist.', () => {
        expect(Array.isArray(GlossList().getItems())).to.be.true
        expect(GlossList().getItems().length).to.equal(0)
      })
    })
    describe('getSize()', function () {
      it('returns an integer with a value of zero when no referenes exist.', () => {
        expect(Number.isInteger(GlossList().getSize())).to.be.true
        expect(GlossList().getSize()).to.equal(0)
      })
    })
    describe('sortAscBy()', function () {
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

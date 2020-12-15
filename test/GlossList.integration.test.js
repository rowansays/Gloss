import chai from 'chai'
import mocha from 'mocha'
import { GlossList } from '../src/Lists/GlossList.js'
import { Phrase } from '../src/Quotes/Quote.js'
import { Term } from '../src/Glosses/Term.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('GlossList: Integration Tests', function () {
  it('merges phrases with the same names (case sensitive).', () => {
    const gl = GlossList({
      name: 'Nobody',
      items: [
        Term(3, '', Phrase('natural number', 'wikipedia')),
        Term(3, '', Phrase('odd number', 'wikipedia')),
        Term(3, '', Phrase('prime number', 'wikipedia')),
        Term(3, '', Phrase('magic number', 'schoolhouse-rock')),
      ]
    })

    expect(gl.length).to.equal(1)
  })

  /*
  it('accepts an array of phrases.', () => {
    const gl = GlossList({ name: 'nobody', items: [
      Phrase('a'),
      Phrase('b'),
      Phrase('c')
    ] })
    expect(gl.length).to.equal(3)
    expect(gl.has('a')).to.be.true
    expect(gl.has('b')).to.be.true
    expect(gl.has('c')).to.be.true
  })
  it('accepts an array of GlossLists containing Phrases.', () => {
    const ql = GlossList({ name: 'nobody', items: [
      GlossList({ name: 'nobody', items: [
        Phrase('a'), Phrase('b'), Phrase('c')
      ] }),
      GlossList({ name: 'nobody', items: [
        Phrase('d'), Phrase('e'), Phrase('f')
      ] }),
      GlossList({ name: 'nobody', items: [
        Phrase('g'), Phrase('h'), Phrase('i')
      ] })
    ] })
    expect(ql.length).to.equal(9)
    expect(ql.has('a')).to.be.true
    expect(ql.has('b')).to.be.true
    expect(ql.has('c')).to.be.true
    expect(ql.has('d')).to.be.true
    expect(ql.has('e')).to.be.true
    expect(ql.has('f')).to.be.true
    expect(ql.has('g')).to.be.true
    expect(ql.has('h')).to.be.true
    expect(ql.has('i')).to.be.true
  })
  it('  - merges an array of GlossLists.', () => {
    const ql = GlossList({ name: 'nobody', items: [
      GlossList({ name: 'nobody', items: [
        Phrase('a'), Phrase('b'), Phrase('c')
      ] }),
      GlossList({ name: 'nobody', items: [
        Phrase('a'), Phrase('b'), Phrase('c')
      ] }),
      GlossList({ name: 'nobody', items: [
        Phrase('a'), Phrase('b'), Phrase('c')
      ] })
    ] })
    expect(ql.length).to.equal(3)
    expect(ql.has('a')).to.be.true
    expect(ql.has('b')).to.be.true
    expect(ql.has('c')).to.be.true
  })


  describe('GlossList(): Instance Methods', function () {
    describe('has()', function () {
      it('returns false when list is empty.', () => {
        expect(GlossList({ name: 'nobody' }).has('a')).to.be.false
      })
      it('returns false when a given gloss does not exist.', () => {
        expect(GlossList({ name: 'nobody', items: a })).has('b')).to.be.false
      })
      it('returns true when a given gloss does exist.', () => {
        expect(GlossList({ name: 'nobody', items: [Term('a')]}).has('a')).to.be.true
      })
    })
    describe('Inherited from AbstractObjectList()', function () {
      describe('entries()', function () {
        it('returns empty array when no referenes exist.', () => {
          expect(Array.isArray(GlossList().entries())).to.be.true
          expect(GlossList().entries().length).to.equal(0)
        })
      })
      describe('length', function () {
        it('returns an integer with a value of zero when no referenes exist.', () => {
          expect(Number.isInteger(GlossList().length)).to.be.true
          expect(GlossList().length).to.equal(0)
        })
      })
      describe('sortAscBy()', function () {
        it('returns an empty GlossList instance when no referenes exist.', () => {
          const list = GlossList()
          const sorted = list.sortAscBy()
          expect(sorted.constructor.name).to.equal('$GlossList')
          expect(GlossList().length).to.equal(0)
        })
        it('sorts by name.', () => {
          const list = GlossList(
            Term('Bobcat'),
            Term('Calico'),
            Term('Aegean')
          )
          const sorted = list.sortAscBy('Name')
          expect(sorted.constructor.name).to.equal('$GlossList')
          expect(sorted.get(0).getName()).to.equal('Aegean')
          expect(sorted.get(1).getName()).to.equal('Bobcat')
          expect(sorted.get(2).getName()).to.equal('Calico')
        })
      })
      describe('sortDescBy()', function () {
        it('returns an empty GlossList instance when no entries exist.', () => {
          const list = GlossList()
          const sorted = list.sortDescBy()
          expect(sorted.constructor.name).to.equal('$GlossList')
          expect(GlossList().length).to.equal(0)
        })
        it('sorts by name.', () => {
          const list = GlossList(
            Term('Bobcat'),
            Term('Aegean'),
            Term('Calico')
          )
          const sorted = list.sortDescBy('Name')
          expect(sorted.constructor.name).to.equal('$GlossList')
          expect(sorted.get(0).getName()).to.equal('Calico')
          expect(sorted.get(1).getName()).to.equal('Bobcat')
          expect(sorted.get(2).getName()).to.equal('Aegean')
        })
      })
    })
  })
  */
})

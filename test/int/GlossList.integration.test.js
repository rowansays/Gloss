import chai from 'chai'
import mocha from 'mocha'
import { GlossList } from '../src/Lists/GlossList.js'
import { Phrase } from '../src/Quotes/Quote.js'
import { Term } from '../src/Glosses/Term.js'

import { MockRef } from './mocks/MockRef.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

const wikipedia = new MockRef('wikipedia', 'Wikipedia')
const schoolHouseRock = new MockRef('school-rock', 'Schoolhouse Rock')

const a = () => { return Term('A', '', Phrase('the first letter', wikipedia)) }
const b = () => { return Term('B', '', Phrase('the second letter', wikipedia)) }
const c = () => { return Term('C', '', Phrase('the third letter', wikipedia)) }
const d = () => { return Term('D', '', Phrase('the fourth letter', wikipedia)) }
const e = () => { return Term('E', '', Phrase('the fifth letter', wikipedia)) }
const f = () => { return Term('F', '', Phrase('the sixth letter', wikipedia)) }
const g = () => { return Term('G', '', Phrase('the seventh letter', wikipedia)) }
const h = () => { return Term('H', '', Phrase('the eighth letter', wikipedia)) }
const i = () => { return Term('I', '', Phrase('the ninth letter', wikipedia)) }

describe('GlossList: Integration Tests', function () {
  it('merges terms with the same names (case sensitive).', () => {
    const gl = GlossList(
      Term(3, '', Phrase('natural number', wikipedia)),
      Term(3, '', Phrase('odd number', wikipedia)),
      Term(3, '', Phrase('magic number', schoolHouseRock)),
    )
    expect(gl.length).to.equal(1)
  })
  it('accepts an array of unique phrases.', () => {
    const gl = GlossList(a(), b(), c())
    expect(gl.length).to.equal(3)
    expect(gl.has('A')).to.be.true
    expect(gl.has('B')).to.be.true
    expect(gl.has('C')).to.be.true
  })

  it('accepts an array of GlossLists containing Phrases.', () => {
    const ql = GlossList(
      GlossList(a(), b(), c()),
      GlossList(d(), e(), f()),
      GlossList(g(), h(), i())
    )
    expect(ql.length).to.equal(9)
    expect(ql.has('A')).to.be.true
    expect(ql.has('B')).to.be.true
    expect(ql.has('C')).to.be.true
    expect(ql.has('D')).to.be.true
    expect(ql.has('E')).to.be.true
    expect(ql.has('F')).to.be.true
    expect(ql.has('G')).to.be.true
    expect(ql.has('H')).to.be.true
    expect(ql.has('I')).to.be.true
  })
  it('merges an array of GlossLists.', () => {
    const ql = GlossList(
      GlossList(a(), b(), c()),
      GlossList(a(), b(), c()),
      GlossList(a(), b(), c()),
    )
    expect(ql.length).to.equal(3)
    expect(ql.has('A')).to.be.true
    expect(ql.has('B')).to.be.true
    expect(ql.has('C')).to.be.true
  })

  describe('GlossList(): Instance Methods', function () {
    describe('has()', function () {
      it('returns false when list is empty.', () => {
        expect(GlossList().has('a')).to.be.false
      })
      it('returns false when a given gloss does not exist.', () => {
        expect(GlossList(a(), b(), c()).has('D')).to.be.false
      })
      it('returns true when a given gloss does exist.', () => {
        expect(GlossList(a()).has('A')).to.be.true
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
})

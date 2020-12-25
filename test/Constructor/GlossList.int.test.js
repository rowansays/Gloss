import { $GlossList } from '../../src/Constructor/GlossList.js'
import { Phrase, Term } from '../../src/Utility/factory.js'
import { MockRef } from '../mocks/MockRef.js'

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
  test('merges terms with the same names (case sensitive).', () => {
    const gl = new $GlossList(
      Term(3, '', Phrase('natural number', wikipedia)),
      Term(3, '', Phrase('odd number', wikipedia)),
      Term(3, '', Phrase('magic number', schoolHouseRock)),
    )
    expect(gl.length).toBe(1)
  })
  test('accepts an array of unique phrases.', () => {
    const gl = new $GlossList(a(), b(), c())
    expect(gl.length).toBe(3)
    expect(gl.has('A')).toBe(true)
    expect(gl.has('B')).toBe(true)
    expect(gl.has('C')).toBe(true)
  })
  test('accepts an array of GlossLists containing Phrases.', () => {
    const ql = new $GlossList(
      new $GlossList(a(), b(), c()),
      new $GlossList(d(), e(), f()),
      new $GlossList(g(), h(), i())
    )
    expect(ql.length).toBe(9)
    expect(ql.has('A')).toBe(true)
    expect(ql.has('B')).toBe(true)
    expect(ql.has('C')).toBe(true)
    expect(ql.has('D')).toBe(true)
    expect(ql.has('E')).toBe(true)
    expect(ql.has('F')).toBe(true)
    expect(ql.has('G')).toBe(true)
    expect(ql.has('H')).toBe(true)
    expect(ql.has('I')).toBe(true)
  })
  test('merges an array of GlossLists.', () => {
    const ql = new $GlossList(
      new $GlossList(a(), b(), c()),
      new $GlossList(a(), b(), c()),
      new $GlossList(a(), b(), c()),
    )
    expect(ql.length).toBe(3)
    expect(ql.has('A')).toBe(true)
    expect(ql.has('B')).toBe(true)
    expect(ql.has('C')).toBe(true)
  })
  describe('new $GlossList(): Instance Methods', function () {
    describe('has()', function () {
      test('returns false when list is empty.', () => {
        expect(new $GlossList().has('a')).toBe(false)
      })
      test('returns false when a given gloss does not exist.', () => {
        expect(new $GlossList(a(), b(), c()).has('D')).toBe(false)
      })
      test('returns true when a given gloss does exist.', () => {
        expect(new $GlossList(a()).has('A')).toBe(true)
      })
    })
    describe('Inherited from AbstractObjectList()', function () {
      describe('entries()', function () {
        test('returns empty array when no referenes exist.', () => {
          expect(Array.isArray(new $GlossList().entries())).toBe(true)
          expect(new $GlossList().entries().length).toBe(0)
        })
      })
      describe('length', function () {
        test('returns an integer with a value of zero when no referenes exist.', () => {
          expect(Number.isInteger(new $GlossList().length)).toBe(true)
          expect(new $GlossList().length).toBe(0)
        })
      })
      describe('sortAscBy()', function () {
        test('returns an empty GlossList instance when no referenes exist.', () => {
          const list = new $GlossList()
          const sorted = list.sortAscBy()
          expect(sorted.constructor.name).toBe('$GlossList')
          expect(new $GlossList().length).toBe(0)
        })
        test('sorts by name.', () => {
          const list = new $GlossList(
            Term('Bobcat'),
            Term('Calico'),
            Term('Aegean')
          )
          const sorted = list.sortAscBy('Name')
          expect(sorted.constructor.name).toBe('$GlossList')
          expect(sorted.get(0).name).toBe('Aegean')
          expect(sorted.get(1).name).toBe('Bobcat')
          expect(sorted.get(2).name).toBe('Calico')
        })
      })
      describe('sortDescBy()', function () {
        test('returns an empty GlossList instance when no entries exist.', () => {
          const list = new $GlossList()
          const sorted = list.sortDescBy()
          expect(sorted.constructor.name).toBe('$GlossList')
          expect(new $GlossList().length).toBe(0)
        })
        test('sorts by name.', () => {
          const list = new $GlossList(
            Term('Bobcat'),
            Term('Aegean'),
            Term('Calico')
          )
          const sorted = list.sortDescBy('Name')
          expect(sorted.constructor.name).toBe('$GlossList')
          expect(sorted.get(0).name).toBe('Calico')
          expect(sorted.get(1).name).toBe('Bobcat')
          expect(sorted.get(2).name).toBe('Aegean')
        })
      })
    })
  })
})

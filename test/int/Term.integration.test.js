import { Term } from '../../src/Glosses/Term.js'
import { Phrase } from '../../src/Quotes/Quote.js'
import { aliceBook, devilsBook } from '../data/refs.js'

describe('Term()', function () {
  describe('Term(name, memo, ...Phrase())', () => {
    test('accepts return value of Phrase() for parameters 3, 4, & 5.', () => {
      const def0 = Phrase('Three', aliceBook)
      const def1 = Phrase('Four', aliceBook)
      const def2 = Phrase('Five', aliceBook)
      const term = Term('a', '', def0, def1, def2)
      expect(term.def(0).name).toBe(def0.name)
      expect(term.def(1).name).toBe(def1.name)
      expect(term.def(2).name).toBe(def2.name)
    })
  })
  describe('as()', function () {
    test('appends an existing phrase with a new reference.', () => {
      const def1 = Phrase('Klingon', aliceBook)
      const def2 = Phrase('Klingon', devilsBook)
      const term = Term('a', '', def1).as(def2)

      const def = term.def('Klingon')
      expect(term.length).toBe(1)
      expect(def.length).toBe(2)
      expect(def.quote(0).ref(0)).toBe(aliceBook)
      expect(def.quote(1).ref(0)).toBe(devilsBook)
    })
  })
  describe('withMemo()', function () {
    test('merges two phrases having different memos.', () => {
      const memo1 = Phrase('They are dangerous.', aliceBook)
      const memo2 = Phrase('They are mageistic.', devilsBook)
      const term = Term('a', memo1).withMemo(memo2)

      expect(term.getMemo(0).name).toBe(memo1.name)
      expect(term.getMemo(0).ref(0)).toBe(aliceBook)
      expect(term.getMemo(1).name).toBe(memo2.name)
      expect(term.getMemo(1).ref(0)).toBe(devilsBook)
    })
  })
  describe('withDefRef()', function () {
    test('appends a reference to all definitions.', () => {
      const a = Term('a', '', Phrase('Bunnies'), Phrase('Kittens'))
      const b = a.withDefRef(aliceBook)

      expect(typeof a.def(0).quote(0).ref(0)).toBe('undefined')
      expect(typeof a.def(1).quote(0).ref(0)).toBe('undefined')
      expect(b.def(0).quote(0).ref(0)).toBe(aliceBook)
      expect(b.def(1).quote(0).ref(0)).toBe(aliceBook)
    })
  })
})

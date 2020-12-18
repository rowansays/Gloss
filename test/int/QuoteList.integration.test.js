import { Normal, Phrase } from '../../src/Quotes/Quote.js'
import { QuoteList } from '../../src/Lists/QuoteList.js'
import { aliceBook, devilsBook, frankenBook, prideBook } from '../data/refs.js'

describe('QuoteList Integration Tests', function () {
  describe('Parameters', function () {
    describe('single: {Phrase}', () => {
      test('accepts a Quote.', () => {
        const ql = QuoteList(Phrase('a', aliceBook))
        expect(ql.length).toBe(1)
        expect(ql.getItemName(0)).toBe('a')
      })
    })
    describe('Phrase())', () => {
      test('accepts unique phrases.', () => {
        const q = QuoteList(
          Phrase('f', aliceBook),
          Phrase('z', devilsBook),
          Phrase('t', frankenBook)
        )
        expect(q.length).toBe(3)
      })
      test('stores phrases in the order they were provided.', () => {
        const q = QuoteList(
          Phrase('f', aliceBook),
          Phrase('z', devilsBook),
          Phrase('t', frankenBook)
        )
        expect(q.getItemName(0)).toBe('f')
        expect(q.getItemName(1)).toBe('z')
        expect(q.getItemName(2)).toBe('t')
      })
      const quantumRobin = QuoteList(
        Phrase('Quantum robin', aliceBook),
        Phrase('Quantum robin', devilsBook),
        Phrase('Quantum robin', frankenBook)
      )
      test('does not allow duplicate phrases.', () => {
        expect(quantumRobin.length).toBe(1)
      })
      test('merges duplicate phrases into a single item.', () => {
        expect(quantumRobin.get(0).hasRef(aliceBook)).toBe(true)
        expect(quantumRobin.get(0).hasRef(devilsBook)).toBe(true)
        expect(quantumRobin.get(0).hasRef(frankenBook)).toBe(true)
      })
    })
    describe('Normal()', () => {
      test('accepts unique normalized phrases.', () => {
        const q = QuoteList(
          Normal('x', 'xx', aliceBook),
          Normal('y', 'yy', aliceBook),
          Normal('z', 'zz', aliceBook)
        )
        expect(q.length).toBe(3)
      })
      test('merges normalized phrases with the same name.', () => {
        const q = QuoteList(
          Normal('x', 'xx', aliceBook),
          Normal('x', 'xy', devilsBook),
          Normal('x', 'xz', frankenBook)
        )
        expect(q.length).toBe(1)
      })
    })
  })
})

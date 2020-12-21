import { Normal, Phrase } from '../../src/Quotes/Quote.js'
import { QuoteList } from '../../src/Lists/QuoteList.js'
import { aliceBook, devilsBook, frankenBook, prideBook } from '../data/refs.js'

describe('QuoteList()', function () {
  describe('Parameters', function () {
    describe('single: {Phrase}', () => {
      test('accepts a Quote.', () => {
        const ql = QuoteList(Phrase('a', aliceBook))
        expect(ql.length).toBe(1)
        expect(ql.get(0).name).toBe('a')
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
        const ql = QuoteList(
          Phrase('f', aliceBook),
          Phrase('z', devilsBook),
          Phrase('t', frankenBook)
        )
        expect(ql.get(0).name).toBe('f')
        expect(ql.get(1).name).toBe('z')
        expect(ql.get(2).name).toBe('t')
      })
      const quantumRobin = QuoteList(
        Phrase('Quantum robin', aliceBook),
        Phrase('Quantum robin', devilsBook),
        Phrase('Quantum robin', frankenBook)
      )
      test('allows duplicate phrases.', () => {
        expect(quantumRobin.length).toBe(3)
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
    })
  })
})

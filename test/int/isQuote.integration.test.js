import { isQuote } from '../../src/Utility/predicate.js'
import { Normal, Phrase, Quote } from '../../src/Quotes/Quote.js'
import { wikipedia } from '../mocks/MockRef.js'

describe('isQuote() Integration Tests.', () => {
  describe('isQuote(Normal())', () => {
    test('recognizes objects returned by Normal() as quotes', function () {
      expect(isQuote(Normal('a', 'b', wikipedia))).toBe(true)
    })
  })
  describe('isQuote(Phrase())', () => {
    test('recognizes objects returned by Phrase() as quotes', function () {
      expect(isQuote(Phrase('a', wikipedia))).toBe(true)
    })
  })
  describe('isQuote(Phrase())', () => {
    test('recognizes objects returned by Quote() as quotes', function () {
      expect(isQuote(Quote({ name: 'a', refs: [wikipedia] }))).toBe(true)
    })
  })
})

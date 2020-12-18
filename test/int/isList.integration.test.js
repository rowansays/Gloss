// System under test.
import { isList } from '../../src/Utility/predicate.js'

// Factories that should return lists.
import { GlossList } from '../../src/Lists/GlossList.js'
import { QuoteList } from '../../src/Lists/QuoteList.js'
import { ReferenceList } from '../../src/Lists/ReferenceList.js'
import { StringList } from '../../src/Lists/StringList.js'

// Factories that should not return lists.
import { Book } from '../../src/References/Book.js'
import { Card } from '../../src/Card.js'
import { Glossary } from '../../src/Glossaries/Glossary.js'
import { HybridGlossary } from '../../src/Glossaries/HybridGlossary.js'
import { Normal, Phrase, Quote } from '../../src/Quotes/Quote.js'
import { Term } from '../../src/Glosses/Term.js'
import { Webpage } from '../../src/References/Webpage.js'

describe('isList() Integration Tests.', () => {
  describe('Approves value', () => {
    test('returned by GlossList().', function () {
      expect(isList(GlossList({ name: '123', items: [] }))).toBe(true)
    })
    test('returned by QuoteList().', function () {
      expect(isList(QuoteList({ name: '123', items: [] }))).toBe(true)
    })
    test('returned by ReferenceList().', function () {
      expect(isList(ReferenceList({ name: '123', items: [] }))).toBe(true)
    })
    test('returned by StringList().', function () {
      expect(isList(StringList())).toBe(true)
    })
  })
  describe('Denies values', () => {
    test('returned by Book().', function () {
      expect(isList(Book())).toBe(false)
    })
    test('returned by Card().', function () {
      expect(isList(Card())).toBe(false)
    })
    test('returned by Glossary().', function () {
      expect(isList(Glossary())).toBe(false)
    })
    test('returned by HybridGlossary().', function () {
      expect(isList(HybridGlossary())).toBe(false)
    })
    test('returned by Normal().', function () {
      expect(isList(Normal('abc', 'def'))).toBe(false)
    })
    test('returned by Phrase().', function () {
      expect(isList(Phrase('abc'))).toBe(false)
    })
    test('returned by Quote().', function () {
      expect(isList(Quote({ name: 'abc' }))).toBe(false)
    })
    test('returned by Term().', function () {
      expect(isList(Term('abc'))).toBe(false)
    })
    test('returned by Webpage().', function () {
      expect(isList(Webpage())).toBe(false)
    })
  })
})

// System under test.
import { isNamed } from '../../src/Utility/predicate.js'

// Factories that should produce named values.
import { Book } from '../../src/References/Book.js'
import { Card } from '../../src/Card.js'
import { Glossary } from '../../src/Glossaries/Glossary.js'
import { HybridGlossary } from '../../src/Glossaries/HybridGlossary.js'
import { Normal, Phrase, Quote } from '../../src/Quotes/Quote.js'
import { Term } from '../../src/Glosses/Term.js'
import { Webpage } from '../../src/References/Webpage.js'

// Factories that should not produce named values.
import { GlossList } from '../../src/Lists/GlossList.js'
import { QuoteList } from '../../src/Lists/QuoteList.js'
import { ReferenceList } from '../../src/Lists/ReferenceList.js'

describe('isNamed() Integration Tests.', () => {
  describe('Recognizes named objects.', () => {
    test('Values returned by Book() are named.', function () {
      expect(isNamed(Book())).toBe(true)
    })
    test('Values returned by Card() are named.', function () {
      expect(isNamed(Card())).toBe(true)
    })
    test('Values returned by Glossary() are named.', function () {
      expect(isNamed(Glossary())).toBe(true)
    })
    test('Values returned by HybridGlossary() are named.', function () {
      expect(isNamed(HybridGlossary())).toBe(true)
    })
    test('Values returned by Normal() are named.', function () {
      expect(isNamed(Normal('Normal', 'Actual'))).toBe(true)
    })
    test('Values returned by Phrase() are named.', function () {
      expect(isNamed(Phrase('Phrase'))).toBe(true)
    })
    test('Values returned by Term() are named.', function () {
      expect(isNamed(Term('Term Name'))).toBe(true)
    })
    test('Values returned by Webpage() are named.', function () {
      expect(isNamed(Webpage())).toBe(true)
    })
  })
  describe('Overlooks unnamed objects.', () => {
    test('Values returned by GlossList() are not named.', function () {
      expect(isNamed(GlossList())).toBe(false)
    })
    test('Values returned by QuoteList() are not named.', function () {
      expect(isNamed(QuoteList())).toBe(false)
    })
    test('Values returned by ReferenceList() are not named.', function () {
      expect(isNamed(ReferenceList())).toBe(false)
    })
  })
})

// Import predicates
import {
  isGloss,
  isList,
  isNamed,
  isQuote,
  isReference
} from '../../src/Utility/predicate.js'

// Import factory functions
import { Book } from '../../src/References/Book.js'
import { Card } from '../../src/Card.js'
import { Glossary } from '../../src/Glossaries/Glossary.js'
import { GlossList } from '../../src/Lists/GlossList.js'
import { HybridGlossary } from '../../src/Glossaries/HybridGlossary.js'
import { Normal, Phrase, Quote } from '../../src/Quotes/Quote.js'
import { QuoteList } from '../../src/Lists/QuoteList.js'
import { ReferenceList } from '../../src/Lists/ReferenceList.js'
import { Term } from '../../src/Glosses/Term.js'
import { Webpage } from '../../src/References/Webpage.js'

describe('isGloss() + various constructors.', () => {
  test('Instances of Term() are glosses.', function () {
    expect(isGloss(Term('a'))).toBe(true)
  })
})

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

describe('isQuote() Integration Tests.', () => {
  describe('isQuote(Normal())', () => {
    test('recognizes objects returned by Normal() as quotes', function () {
      expect(isQuote(Normal('a', 'b'))).toBe(true)
    })
  })
  describe('isQuote(Phrase())', () => {
    test('recognizes objects returned by Phrase() as quotes', function () {
      expect(isQuote(Phrase('a'))).toBe(true)
    })
  })
  describe('isQuote(Phrase())', () => {
    test('recognizes objects returned by Quote() as quotes', function () {
      expect(isQuote(Quote({ name: 'a' }))).toBe(true)
    })
  })
})

describe('isReference() + various constructors.', () => {
  const emptyBook = new Book()
  test('Instances of Book() are references.', function () {
    expect(isReference(new Book())).toBe(true)
  })
  test('Instances of Webpage() are references.', function () {
    expect(isReference(Webpage())).toBe(true)
  })
})

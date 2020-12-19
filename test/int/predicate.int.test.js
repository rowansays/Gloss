// Import predicates
import {
  isGloss,
  isList,
  isNamed,
  isQuote,
  isRef
} from '../../src/Utility/predicate.js'

// Import factory functions
import { Book } from '../../src/Refs/Book.js'
import { Card } from '../../src/Card.js'
import { Glossary } from '../../src/Glossaries/Glossary.js'
import { GlossList } from '../../src/Lists/GlossList.js'
import { HybridGlossary } from '../../src/Glossaries/HybridGlossary.js'
import { Normal, Phrase, Quote } from '../../src/Quotes/Quote.js'
import { QuoteList } from '../../src/Lists/QuoteList.js'
import { Ref } from '../../src/Refs/Ref.js'
import { RefList } from '../../src/Refs/RefList.js'
import { Term } from '../../src/Glosses/Term.js'


describe('isGloss() Integration Tests', () => {
  test('Instances of Term() are glosses.', function () {
    expect(isGloss(Term('a'))).toBe(true)
  })
})

describe('isList() Integration Tests', () => {
  describe('Approves value', () => {
    test('returned by GlossList().', function () {
      expect(isList(GlossList({ name: '123', items: [] }))).toBe(true)
    })
    test('returned by QuoteList().', function () {
      expect(isList(QuoteList({ name: '123', items: [] }))).toBe(true)
    })
    test('returned by RefList().', function () {
      expect(isList(RefList({ name: '123', items: [] }))).toBe(true)
    })
  })
  describe('Denies values', () => {
    test('returned by Book().', function () {
      expect(isList(Book({ title: 'abc' }))).toBe(false)
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
    test('returned by Ref().', function () {
      expect(isList(Ref({ name: 'abc' }))).toBe(false)
    })
    test('returned by Term().', function () {
      expect(isList(Term('abc'))).toBe(false)
    })
  })
})

describe('isNamed() Integration Tests', () => {
  describe('Recognizes named objects.', () => {
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
    /*
    test('Values returned by Ref() are named.', function () {
      expect(isNamed(Ref({ name: 'abc' }))).toBe(true)
    })
    test('Values returned by Book() are named.', function () {
      expect(isNamed(Book({ title: 'abc' }))).toBe(true)
    })
    */
  })
  describe('Overlooks unnamed objects.', () => {
    test('Values returned by GlossList() are not named.', function () {
      expect(isNamed(GlossList())).toBe(false)
    })
    test('Values returned by QuoteList() are not named.', function () {
      expect(isNamed(QuoteList())).toBe(false)
    })
    test('Values returned by RefList() are not named.', function () {
      expect(isNamed(RefList())).toBe(false)
    })
  })
})

describe('isQuote() Integration Tests', () => {
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

describe('isRef() Intergration Tests', () => {
  test('Instances of Book() are references.', function () {
    expect(isRef(Book({ title: 'abc' }))).toBe(true)
  })
  test('Instances of Ref() are references.', function () {
    expect(isRef(Ref({ name: 'abc' }))).toBe(true)
  })
})

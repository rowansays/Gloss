// Import Predicates
import {
  isGloss,
  isList,
  isNamed,
  isQuote,
  isRef
} from '../../src/Utility/predicate.js'

// Import Factory Functions
import {
  Gloss,
  Glossary,
  HybridGlossary,
  Normal,
  Phrase,
  Quote,
  Term
} from '../../src/Utility/factory.js'

// Import Constructors
import { $Book } from '../../src/Constructor/Book.js'
import { $Gloss } from '../../src/Constructor/Gloss.js'
import { $GlossList } from '../../src/Constructor/GlossList.js'
import { $QuoteList } from '../../src/Constructor/QuoteList.js'
import { $Ref } from '../../src/Constructor/Ref.js'
import { $RefList } from '../../src/Constructor/RefList.js'

describe('isGloss() Integration Tests', () => {
  test('Instances of $Gloss() are glosses.', function () {
    expect(isGloss(new $Gloss({ name: 'a' }))).toBe(true)
  })
  test('Instances of Gloss() are glosses.', function () {
    expect(isGloss(Gloss({ name: 'a' }))).toBe(true)
  })
  test('Instances of Term() are glosses.', function () {
    expect(isGloss(Term('a'))).toBe(true)
  })
})

describe('isList() Integration Tests', () => {
  describe('Approves value', () => {
    test('returned by $GlossList().', function () {
      expect(isList(new $GlossList({ name: '123', items: [] }))).toBe(true)
    })
    test('returned by $QuoteList().', function () {
      expect(isList(new $QuoteList({ name: '123', items: [] }))).toBe(true)
    })
    test('returned by $RefList().', function () {
      expect(isList(new $RefList({ name: '123', items: [] }))).toBe(true)
    })
  })
  describe('Denies values', () => {
    test('returned by $Book().', function () {
      expect(isList(new $Book({ title: 'abc' }))).toBe(false)
    })
    test('returned by Glossary().', function () {
      expect(isList(Glossary({ name: 'a' }))).toBe(false)
    })
    test('returned by HybridGlossary().', function () {
      expect(isList(HybridGlossary({ name: 'a' }))).toBe(false)
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
    test('returned by $Ref().', function () {
      expect(isList(new $Ref({ name: 'abc' }))).toBe(false)
    })
    test('returned by Term().', function () {
      expect(isList(Term('abc'))).toBe(false)
    })
  })
})

describe('isNamed() Integration Tests', () => {
  describe('Recognizes named objects.', () => {
    test('Values returned by Glossary() are named.', function () {
      expect(isNamed(Glossary({ name: 'a' }))).toBe(true)
    })
    test('Values returned by HybridGlossary() are named.', function () {
      expect(isNamed(HybridGlossary({ name: 'a' }))).toBe(true)
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
    test('Values returned by $Ref() are named.', function () {
      expect(isNamed(new $Ref({ name: 'abc' }))).toBe(true)
    })
    test('Values returned by $Book() are named.', function () {
      expect(isNamed(new $Book({ title: 'abc' }))).toBe(true)
    })
    */
  })
  describe('Overlooks unnamed objects.', () => {
    test('Values returned by $GlossList() are not named.', function () {
      expect(isNamed(new $GlossList())).toBe(false)
    })
    test('Values returned by $QuoteList() are not named.', function () {
      expect(isNamed(new $QuoteList())).toBe(false)
    })
    test('Values returned by $RefList() are not named.', function () {
      expect(isNamed(new $RefList())).toBe(false)
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
  test('Instances of $Book() are references.', function () {
    expect(isRef(new $Book({ title: 'abc' }))).toBe(true)
  })
  test('Instances of $Ref() are references.', function () {
    expect(isRef(new $Ref({ name: 'abc' }))).toBe(true)
  })
})

// System under test.
import { isList } from '../src/Utility/predicate.js'

// Factories that should return lists.
import { GlossList } from '../src/Lists/GlossList.js'
import { QuoteList } from '../src/Lists/QuoteList.js'
import { ReferenceList } from '../src/Lists/ReferenceList.js'
import { StringList } from '../src/Lists/StringList.js'

// Factories that should not return lists.
import { Book } from '../src/References/Book.js'
import { Card } from '../src/Card.js'
import { Glossary } from '../src/Glossaries/Glossary.js'
import { HybridGlossary } from '../src/Glossaries/HybridGlossary.js'
import { Normal, Phrase, Quote } from '../src/Quotes/Quote.js'
import { Term } from '../src/Glosses/Term.js'
import { Webpage } from '../src/References/Webpage.js'



// Testing libraries
import chai from 'chai'
import mocha from 'mocha'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isList() Integration Tests.', () => {
  describe('Approves value', () => {
    it('returned by GlossList().', function () {
      expect(isList(GlossList({ name: '123', items: [] }))).to.be.true
    })
    it('returned by QuoteList().', function () {
      expect(isList(QuoteList({ name: '123', items: [] }))).to.be.true
    })
    it('returned by ReferenceList().', function () {
      expect(isList(ReferenceList({ name: '123', items: [] }))).to.be.true
    })
    it('returned by StringList().', function () {
      expect(isList(StringList())).to.be.true
    })
  })
  describe('Denies values', () => {
    it('returned by Book().', function () {
      expect(isList(Book())).to.be.false
    })
    it('returned by Card().', function () {
      expect(isList(Card())).to.be.false
    })
    it('returned by Glossary().', function () {
      expect(isList(Glossary())).to.be.false
    })
    it('returned by HybridGlossary().', function () {
      expect(isList(HybridGlossary())).to.be.false
    })
    it('returned by Normal().', function () {
      expect(isList(Normal('abc', 'def'))).to.be.false
    })
    it('returned by Phrase().', function () {
      expect(isList(Phrase('abc'))).to.be.false
    })
    it('returned by Quote().', function () {
      expect(isList(Quote({ name: 'abc' }))).to.be.false
    })
    it('returned by Term().', function () {
      expect(isList(Term('abc'))).to.be.false
    })
    it('returned by Webpage().', function () {
      expect(isList(Webpage())).to.be.false
    })
  })
})

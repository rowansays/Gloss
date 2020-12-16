// System under test.
import { isNamed } from '../src/Utility/isNamed.js'

// Factories that should produce named values.
import { Book } from '../src/References/Book.js'
import { Card } from '../src/Card.js'
import { Glossary } from '../src/Glossaries/Glossary.js'
import { HybridGlossary } from '../src/Glossaries/HybridGlossary.js'
import { Normal, Phrase, Quote } from '../src/Quotes/Quote.js'
import { Term } from '../src/Glosses/Term.js'
import { Webpage } from '../src/References/Webpage.js'

// Factories that should not produce named values.
import { GlossList } from '../src/Lists/GlossList.js'
import { QuoteList } from '../src/Lists/QuoteList.js'
import { ReferenceList } from '../src/Lists/ReferenceList.js'
import { StringList } from '../src/Lists/StringList.js'

// Testing libraries
import chai from 'chai'
import mocha from 'mocha'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isNamed() Integration Tests.', () => {
  describe('Recognizes named objects.', () => {
    it('Values returned by Book() are named.', function () {
      expect(isNamed(Book())).to.be.true
    })
    it('Values returned by Card() are named.', function () {
      expect(isNamed(Card())).to.be.true
    })
    it('Values returned by Glossary() are named.', function () {
      expect(isNamed(Glossary())).to.be.true
    })
    it('Values returned by HybridGlossary() are named.', function () {
      expect(isNamed(HybridGlossary())).to.be.true
    })
    it('Values returned by Normal() are named.', function () {
      expect(isNamed(Normal('Normal', 'Actual'))).to.be.true
    })
    it('Values returned by Phrase() are named.', function () {
      expect(isNamed(Phrase('Phrase'))).to.be.true
    })
    it('Values returned by Term() are named.', function () {
      expect(isNamed(Term('Term Name'))).to.be.true
    })
    it('Values returned by Webpage() are named.', function () {
      expect(isNamed(Webpage())).to.be.true
    })
  })
  describe('Overlooks unnamed objects.', () => {
    it('Values returned by GlossList() are not named.', function () {
      expect(isNamed(GlossList())).to.be.false
    })
    it('Values returned by QuoteList() are not named.', function () {
      expect(isNamed(QuoteList())).to.be.false
    })
    it('Values returned by ReferenceList() are not named.', function () {
      expect(isNamed(ReferenceList())).to.be.false
    })
    it('Values returned by StringList() are not named.', function () {
      expect(isNamed(StringList())).to.be.false
    })
  })
})

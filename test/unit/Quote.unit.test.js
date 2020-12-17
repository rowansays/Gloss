import chai from 'chai'
import mocha from 'mocha'
import { Quote } from '../src/Quotes/Quote.js'
import { testFactoryFunction } from './helpers/factories.js'
import { test } from './helpers/prototypes.js'
import { aliceBook, devilsBook, frankenBook, prideBook } from './data/refs.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function expectQuote(q, name, size, mentions, altSize, isSingular) {
  expect(q.getAltNames().length, ` "There must be ${altSize} alt names."`).to.equal(altSize)
  expect(q.getName(), `getName() must return "${name}"`).to.equal(name)
  expect(q.length, `length must equal "${size}"`).to.equal(size)
  expect(q.mentions, `mentions must equal "${mentions}"`).to.equal(mentions)
  expect(q.isSingular(), `isSingular() must return "${isSingular}"`).to.equal(isSingular)
}

/**
 * Test one of the objects returned by $Quote.prototype.getProps()
 * @return {undefined}
 */
function testQuoteProp (aught, name, refs) {
  expect(aught).to.be.an('object')
  expect(aught).to.have.property('name', name)
  expect(aught)
    .to.have.property('refs')
    .that.is.an('array')
    .that.has.lengthOf(refs.length)
  refs.forEach(ref => {
    expect(aught.refs).to.include(ref)
  })
}

describe('Quote: Tests', function () {
  const instance = Quote({ name: 'a', refs: [frankenBook] })
  testFactoryFunction('Quote', Quote, instance)
  describe('Prototype', function () {
    test('forEach', instance)
    test('getAltNames', instance)
    test('getName', instance)
    test('getProps', instance, () => {
      describe('Singular quote with 0 references', function () {
        const props = Quote({ name: 'One', refs: [] }).getProps()
        it ('returns an array with 1 object', () => {
          expect(props).to.be.an('array').that.has.lengthOf(1)
          testQuoteProp(props[0], 'One', [])
        })
      })
      describe('Double quote with 0 references', function () {
        const props = Quote(
          { name: 'One', refs: [] },
          { name: 'Two', refs: [] }
        ).getProps()
        it ('returns an array with 2 objects', () => {
          expect(props).to.be.an('array').that.has.lengthOf(2)
          testQuoteProp(props[0], 'One', [])
          testQuoteProp(props[1], 'Two', [])
        })
      })
      describe('Sextuple quote with 2 references', function () {
        const props = Quote(
          { name: 'One', refs: [] },
          { name: 'Two', refs: [frankenBook] },
          { name: 'Three', refs: [] },
          { name: 'Four', refs: [] },
          { name: 'Five', refs: [aliceBook] },
          { name: 'Six', refs: [] }
        ).getProps()
        it ('returns an array with 6 objects', () => {
          expect(props).to.be.an('array').that.has.lengthOf(6)
          testQuoteProp(props[0], 'One', [])
          testQuoteProp(props[1], 'Two', [frankenBook])
          testQuoteProp(props[2], 'Three', [])
          testQuoteProp(props[3], 'Four', [])
          testQuoteProp(props[4], 'Five', [aliceBook])
          testQuoteProp(props[5], 'Six', [])
        })
      })
      describe('Singular quote with 1 reference', function () {
        const props = Quote({ name: 'One', refs: [aliceBook] }).getProps()
        it ('returns an array with 1 object', () => {
          expect(props).to.be.an('array').that.has.lengthOf(1)
          testQuoteProp(props[0], 'One', [aliceBook])
        })
      })
      describe('Singular quote with 2 references', function () {
        const props = Quote({ name: 'One', refs: [aliceBook, devilsBook] }).getProps()
        it ('returns an array with 2 objects', () => {
          expect(props).to.be.an('array').that.has.lengthOf(2)
          testQuoteProp(props[0], 'One', [aliceBook])
          testQuoteProp(props[1], 'One', [devilsBook])
        })
      })
      describe('Double quote with 1 reference each', function () {
        const props = Quote(
          { name: 'One', refs: [aliceBook] },
          { name: 'Two', refs: [devilsBook] }
        ).getProps()
        it ('returns an array with 2 objects', () => {
          expect(props).to.be.an('array').that.has.lengthOf(2)
          testQuoteProp(props[0], 'One', [aliceBook])
          testQuoteProp(props[1], 'Two', [devilsBook])
        })
      })
      describe('Double quote with 3 total references.', function () {
        const props = Quote(
          { name: 'One', refs: [aliceBook, devilsBook] },
          { name: 'Two', refs: [frankenBook] }
        ).getProps()
        it ('returns an array with 2 objects', () => {
          expect(props).to.be.an('array').that.has.lengthOf(3)
          testQuoteProp(props[0], 'One', [aliceBook])
          testQuoteProp(props[1], 'One', [devilsBook])
          testQuoteProp(props[2], 'Two', [frankenBook])
        })
      })
      describe('Double quote with 2 references each.', function () {
        const props = Quote(
          { name: 'One', refs: [aliceBook, devilsBook] },
          { name: 'Two', refs: [frankenBook, prideBook] }
        ).getProps()
        it ('returns an array with 2 objects', () => {
          expect(props).to.be.an('array').that.has.lengthOf(4)
          testQuoteProp(props[0], 'One', [aliceBook])
          testQuoteProp(props[1], 'One', [devilsBook])
          testQuoteProp(props[2], 'Two', [frankenBook])
          testQuoteProp(props[3], 'Two', [prideBook])
        })
      })
    })
    test('isSingular', instance)
    test('slice', instance, () => {
      const songwritters = Quote(
        Quote({ name: 'Johnny', refs: [aliceBook] }),
        Quote({ name: 'Nick', refs: [devilsBook] }),
        Quote({ name: 'Tom', refs: [frankenBook] }),
        Quote({ name: 'Leonard', refs: [prideBook] }),
      )
      it('clones a quote', () => {
        expectQuote(songwritters.slice(0), 'Johnny', 4, 4, 3, false)
        expectQuote(songwritters.slice(0, 4), 'Johnny', 4, 4, 3, false)
      })
      it('plucks first quote', () => {
        expectQuote(songwritters.slice(0, 1), 'Johnny', 1, 1, 0, true)
      })
      it('plucks second quote', () => {
        expectQuote(songwritters.slice(1, 2), 'Nick', 1, 1, 0, true)
      })
      it('plucks third quote', () => {
        const slice =
        expectQuote(songwritters.slice(2, 3), 'Tom', 1, 1, 0, true)
      })
      it('plucks fourth quote', () => {
        expectQuote(songwritters.slice(3, 4), 'Leonard', 1, 1, 0, true)
      })
      it('plucks fourth quote', () => {
        expectQuote(songwritters.slice(3, 4), 'Leonard', 1, 1, 0, true)
      })
      it('plucks first two quotes', () => {
        expectQuote(songwritters.slice(0, 2), 'Johnny', 2, 2, 1, false)
      })
      it('plucks middle two quotes', () => {
        expectQuote(songwritters.slice(1, 3), 'Nick', 2, 2, 1, false)
      })
      it('plucks last two quotes', () => {
        expectQuote(songwritters.slice(2, 4), 'Tom', 2, 2, 1, false)
      })
      it('plucks first three quotes', () => {
        expectQuote(songwritters.slice(0, 3), 'Johnny', 3, 3, 2, false)
      })
      it('plucks last three quotes', () => {
        expectQuote(songwritters.slice(1, 4), 'Nick', 3, 3, 2, false)
      })
    })
    test('withQuote', instance, () => {
      it('accepts 1 plain object.', () => {
        const q = instance.withQuote({ name: 'b', refs: [aliceBook] })
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('accepts 2 plain objects.', () => {
        const q = instance.withQuote(
          { name: 'b', refs: [aliceBook] },
          { name: 'c', refs: [devilsBook] }
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
      it('accepts 1 quote.', () => {
        const q = instance.withQuote(Quote({ name: 'b', refs: [aliceBook] }))
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('accepts 2 quotes.', () => {
        const q = instance.withQuote(
          Quote({ name: 'b', refs: [aliceBook] }),
          Quote({ name: 'c', refs: [devilsBook] })
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    test('withRef', instance, () => {
      it('appends 1 ref to a single quote.', () => {
        const q = instance.withRef(aliceBook)
        expectQuote(q, 'a', 1, 2, 0, true)
        expect(q.hasRef(frankenBook)).to.be.true
        expect(q.hasRef(aliceBook)).to.be.true
      })
      it('appends 2 refs to a single quote.', () => {
        const q = instance.withRef(aliceBook, devilsBook)
        expectQuote(q, 'a', 1, 3, 0, true)
        expect(q.hasRef(frankenBook)).to.be.true
        expect(q.hasRef(aliceBook)).to.be.true
        expect(q.hasRef(devilsBook)).to.be.true
      })
      it('appends 1 ref to a double quote.', () => {
        const q = Quote(
          Quote({ name: 'Bubble', refs: [aliceBook] }),
          Quote({ name: 'Bobble', refs: [aliceBook] })
        ).withRef(frankenBook)

        expectQuote(q, 'Bubble', 2, 4, 1, false)
        expect(q.hasRef(aliceBook)).to.equal(true)
        expect(q.hasRef(frankenBook)).to.equal(true)
      })
      it('appends 2 refs to a double quote.', () => {
        const q = Quote(
          Quote({ name: 'Bubble', refs: [aliceBook] }),
          Quote({ name: 'Bobble', refs: [devilsBook] })
        ).withRef(frankenBook, prideBook)

        expectQuote(q, 'Bubble', 2, 6, 1, false)
        expect(q.hasRef(aliceBook)).to.equal(true)
        expect(q.hasRef(devilsBook)).to.equal(true)
        expect(q.hasRef(frankenBook)).to.equal(true)
        expect(q.hasRef(prideBook)).to.equal(true)
      })
    })
  })
  describe('Constructor Signature', function () {
    describe('Plain objects: unique ', function () {
      it('accepts 1 object.', () => {
        const q = Quote({ name: 'a', refs: [aliceBook] })
        expectQuote(q, 'a', 1, 1, 0, true)
      })
      it('accepts 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'b', refs: [devilsBook] }
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('accepts 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'b', refs: [devilsBook] },
          { name: 'c', refs: [frankenBook] }
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Plain objects: identical names & refs', function () {
      it('merges 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      it('merges 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Plain objects: identical names & unique refs', function () {
      it('merges 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [devilsBook] }
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      it('merges 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [devilsBook] },
          { name: 'a', refs: [frankenBook] }
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Plain objects: unique names & identical refs', function () {
      it('merges 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'b', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('merges 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'b', refs: [aliceBook] },
          { name: 'c', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Quotes: unique ', function () {
      it('accepts 1 quote.', () => {
        const q = Quote(Quote({ name: 'a', refs: [aliceBook] }))
        expectQuote(q, 'a', 1, 1, 0, true)
      })
      it('accepts 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'b', refs: [devilsBook] })
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('accepts 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'b', refs: [devilsBook] }),
          Quote({ name: 'c', refs: [frankenBook] })
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Quotes: identical names & refs', function () {
      it('merges 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [aliceBook] })
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      it('merges 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [aliceBook] })
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Quotes: identical names & unique refs', function () {
      it('merges 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [devilsBook] })
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      it('merges 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [devilsBook] }),
          Quote({ name: 'a', refs: [frankenBook] })
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Quotes: unique names & identical refs', function () {
      it('merges 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'b', refs: [aliceBook] })
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('merges 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'b', refs: [aliceBook] }),
          Quote({ name: 'c', refs: [aliceBook] })
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Rejections: thrown errors', function () {
      it('rejects undefined', () => {
        expect(function () { Quote() }).to.throw(Error)
      })
      it('rejects null', () => {
        expect(function () { Quote(null) }).to.throw(Error)
      })
      it('rejects strings', () => {
        expect(function () { Quote('') }).to.throw(Error)
        expect(function () { Quote('abc') }).to.throw(Error)
      })
      it('rejects numbers', () => {
        expect(function () { Quote(123) }).to.throw(Error)
      })
      it('rejects invalid object literals', () => {
        expect(function () { Quote({}) }).to.throw(Error)
        expect(function () { Quote({ refs: ['abc'] }) }).to.throw(Error)
        expect(function () { Quote({ name: ['abc'], refs: '123' }) }).to.throw(Error)
      })
    })
    describe('Refs are optional', function () {
      it('does not require refs #1', () => {
        const q = Quote(
          { name: 'a' },
          { name: 'b', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 2, 1, 1, false)
      })
      it('does not require refs #2', () => {
        const q = Quote(
          { name: 'a' },
          { name: 'b' },
          { name: 'c' },
          { name: 'd' },
        )
        expectQuote(q, 'a', 4, 0, 3, false)
      })
      it('strips falsey values from refs', () => {
        expectQuote(
          Quote({ name: 'a', refs: [undefined] }),
          'a', 1, 0, 0, true
        )
      })
    })
  })
})
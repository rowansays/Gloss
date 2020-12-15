import chai from 'chai'
import mocha from 'mocha'
import { Quote } from '../src/Quotes/Quote.js'
import { testFactoryFunction } from './helpers/factories.js'
import { test } from './helpers/prototypes.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function expectQuote(q, name, size, freq, altSize, isSingular) {
  expect(q.getAltNames().length, ` "There must be ${altSize} alt names."`).to.equal(altSize)
  expect(q.getFreq(), `getFreq() must return "${freq}"`).to.equal(freq)
  expect(q.getName(), `getName() must return "${name}"`).to.equal(name)
  expect(q.getSize(), `getSize() must return "${size}"`).to.equal(size)
  expect(q.isSingular(), `isSingular() must return "${isSingular}"`).to.equal(isSingular)
}

describe('Quote() Factory Function Unit Tests', function () {
  const instance = Quote({ name: 'a', refs: [1] })
  testFactoryFunction('Quote', Quote, instance)
  describe('Prototype', function () {
    test('getAltNames', instance)
    test('getFreq', instance)
    test('getName', instance)
    test('getProps', instance)
    test('getSize', instance)
    test('isSingular', instance)
    test('slice', instance, () => {
      const songwritters = Quote(
        Quote({ name: 'Johnny', refs: ['Cash'] }),
        Quote({ name: 'Nick', refs: ['Cave'] }),
        Quote({ name: 'Tom', refs: ['Waits'] }),
        Quote({ name: 'Leonard', refs: ['Cohen'] }),
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
        const q = instance.withQuote({ name: 'b', refs: [2] })
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('accepts 2 plain objects.', () => {
        const q = instance.withQuote(
          { name: 'b', refs: [2] },
          { name: 'c', refs: [3] }
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
      it('accepts 1 quote.', () => {
        const q = instance.withQuote(Quote({ name: 'b', refs: [2] }))
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('accepts 2 quotes.', () => {
        const q = instance.withQuote(
          Quote({ name: 'b', refs: [2] }),
          Quote({ name: 'c', refs: [3] })
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
  })
  describe('Constructor Signature', function () {
    describe('Plain objects: unique ', function () {
      it('accepts 1 object.', () => {
        const q = Quote({ name: 'a', refs: [2] })
        expectQuote(q, 'a', 1, 1, 0, true)
      })
      it('accepts 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [1] },
          { name: 'b', refs: [2] }
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('accepts 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [1] },
          { name: 'b', refs: [2] },
          { name: 'c', refs: [3] }
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Plain objects: identical names & refs', function () {
      it('merges 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [1] },
          { name: 'a', refs: [1] }
        )
        expectQuote(q, 'a', 1, 1, 0, true)
      })
      it('merges 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [1] },
          { name: 'a', refs: [1] },
          { name: 'a', refs: [1] }
        )
        expectQuote(q, 'a', 1, 1, 0, true)
      })
    })
    describe('Plain objects: identical names & unique refs', function () {
      it('merges 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [1] },
          { name: 'a', refs: [2] }
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      it('merges 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [1] },
          { name: 'a', refs: [2] },
          { name: 'a', refs: [3] }
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Plain objects: unique names & identical refs', function () {
      it('merges 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [1] },
          { name: 'b', refs: [1] }
        )
        expectQuote(q, 'a', 2, 1, 1, false)
      })
      it('merges 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [1] },
          { name: 'b', refs: [1] },
          { name: 'c', refs: [1] }
        )
        expectQuote(q, 'a', 3, 1, 2, false)
      })
    })
    describe('Quotes: unique ', function () {
      it('accepts 1 quote.', () => {
        const q = Quote(Quote({ name: 'a', refs: [2] }))
        expectQuote(q, 'a', 1, 1, 0, true)
      })
      it('accepts 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [1] }),
          Quote({ name: 'b', refs: [2] })
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      it('accepts 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [1] }),
          Quote({ name: 'b', refs: [2] }),
          Quote({ name: 'c', refs: [3] })
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Quotes: identical names & refs', function () {
      it('merges 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [1] }),
          Quote({ name: 'a', refs: [1] })
        )
        expectQuote(q, 'a', 1, 1, 0, true)
      })
      it('merges 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [1] }),
          Quote({ name: 'a', refs: [1] }),
          Quote({ name: 'a', refs: [1] })
        )
        expectQuote(q, 'a', 1, 1, 0, true)
      })
    })
    describe('Quotes: identical names & unique refs', function () {
      it('merges 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [1] }),
          Quote({ name: 'a', refs: [2] })
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      it('merges 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [1] }),
          Quote({ name: 'a', refs: [2] }),
          Quote({ name: 'a', refs: [3] })
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Quotes: unique names & identical refs', function () {
      it('merges 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [1] }),
          Quote({ name: 'b', refs: [1] })
        )
        expectQuote(q, 'a', 2, 1, 1, false)
      })
      it('merges 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [1] }),
          Quote({ name: 'b', refs: [1] }),
          Quote({ name: 'c', refs: [1] })
        )
        expectQuote(q, 'a', 3, 1, 2, false)
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
    describe('Everything Else...', function () {
      it('does not require refs #1', () => {
        const q = Quote(
          { name: 'a' },
          { name: 'b', refs: [1] }
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
    })
  })
})

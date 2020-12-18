import { Quote } from '../../src/Quotes/Quote.js'
import { testFactoryFunction } from '../helpers/factories.js'
import { testProtoFunc } from '../helpers/prototypes.js'
import { aliceBook, devilsBook, frankenBook, prideBook } from '../data/refs.js'

function expectQuote(q, name, size, mentions, altSize, isSingular) {
  expect(q.getAltNames().length).toBe(altSize)
  expect(q.getName()).toBe(name)
  expect(q.length).toBe(size)
  expect(q.mentions).toBe(mentions)
  expect(q.isSingular()).toBe(isSingular)
}

describe('Quote: Tests', () => {
  const instance = Quote({ name: 'a', refs: [frankenBook] })
  testFactoryFunction('Quote', Quote, instance)
  describe('Prototype', () => {
    testProtoFunc('forEach', instance)
    testProtoFunc('getAltNames', instance)
    testProtoFunc('getName', instance)
    testProtoFunc('getProps', instance, () => {
      test('Singular + 0 refs = 1 object', () => {
        const propsA = [
          { name: 'One', refs: [] }
        ]
        const propsB = Quote(...propsA).getProps()
        expect(propsA).toEqual(propsB)
      })
      test('Double + 0 refs = 2 objects', () => {
        const propsA = [
          { name: 'One', refs: [] },
          { name: 'Two', refs: [] }
        ]
        const propsB = Quote(...propsA).getProps()
        expect(propsA).toEqual(propsB)
      })
      test('Sextuple + 2 refs = 6 objects', () => {
        const propsA = [
          { name: 'One', refs: [] },
          { name: 'Two', refs: [frankenBook] },
          { name: 'Three', refs: [] },
          { name: 'Four', refs: [] },
          { name: 'Five', refs: [aliceBook] },
          { name: 'Six', refs: [] }
        ]
        const propsB = Quote(...propsA).getProps()
        expect(propsA).toEqual(propsB)
      })
      test('Single + 1 ref = 1 object', () => {
        const propsA = [
          { name: 'One', refs: [aliceBook] }
        ]
        const propsB = Quote(...propsA).getProps()
        expect(propsA).toEqual(propsB)
      })
      test('Single + 2 refs = 2 objects', () => {
        const props = Quote(
          { name: 'One', refs: [aliceBook, devilsBook] }
        ).getProps()
        expect(props).toMatchObject([
          { name: 'One', refs: [aliceBook] },
          { name: 'One', refs: [devilsBook] }
        ])
      })
      test('Double + 1 ref each = 2 objects', () => {
        const propsA = [
          { name: 'One', refs: [aliceBook] },
          { name: 'Two', refs: [devilsBook] }
        ]
        const propsB = Quote(...propsA).getProps()
        expect(propsA).toEqual(propsB)
      })
      test('Double + 3 refs = 3 objects', () => {
        const props = Quote(
          { name: 'One', refs: [aliceBook, devilsBook] },
          { name: 'Two', refs: [frankenBook] }
        ).getProps()
        expect(props).toMatchObject([
          { name: 'One', refs: [aliceBook] },
          { name: 'One', refs: [devilsBook] },
          { name: 'Two', refs: [frankenBook] }
        ])
      })
      test('Double + 2 refs each = 4 objects', () => {
        const props = Quote(
          { name: 'One', refs: [aliceBook, devilsBook] },
          { name: 'Two', refs: [frankenBook, prideBook] }
        ).getProps()
        expect(props).toMatchObject([
          { name: 'One', refs: [aliceBook] },
          { name: 'One', refs: [devilsBook] },
          { name: 'Two', refs: [frankenBook] },
          { name: 'Two', refs: [prideBook] }
        ])
      })
    })
    testProtoFunc('isSingular', instance)
    testProtoFunc('slice', instance, () => {
      const songwritters = Quote(
        Quote({ name: 'Johnny', refs: [aliceBook] }),
        Quote({ name: 'Nick', refs: [devilsBook] }),
        Quote({ name: 'Tom', refs: [frankenBook] }),
        Quote({ name: 'Leonard', refs: [prideBook] }),
      )
      test('clones a quote', () => {
        expectQuote(songwritters.slice(0), 'Johnny', 4, 4, 3, false)
        expectQuote(songwritters.slice(0, 4), 'Johnny', 4, 4, 3, false)
      })
      test('plucks first quote', () => {
        expectQuote(songwritters.slice(0, 1), 'Johnny', 1, 1, 0, true)
      })
      test('plucks second quote', () => {
        expectQuote(songwritters.slice(1, 2), 'Nick', 1, 1, 0, true)
      })
      test('plucks third quote', () => {
        const slice =
        expectQuote(songwritters.slice(2, 3), 'Tom', 1, 1, 0, true)
      })
      test('plucks fourth quote', () => {
        expectQuote(songwritters.slice(3, 4), 'Leonard', 1, 1, 0, true)
      })
      test('plucks fourth quote', () => {
        expectQuote(songwritters.slice(3, 4), 'Leonard', 1, 1, 0, true)
      })
      test('plucks first two quotes', () => {
        expectQuote(songwritters.slice(0, 2), 'Johnny', 2, 2, 1, false)
      })
      test('plucks middle two quotes', () => {
        expectQuote(songwritters.slice(1, 3), 'Nick', 2, 2, 1, false)
      })
      test('plucks last two quotes', () => {
        expectQuote(songwritters.slice(2, 4), 'Tom', 2, 2, 1, false)
      })
      test('plucks first three quotes', () => {
        expectQuote(songwritters.slice(0, 3), 'Johnny', 3, 3, 2, false)
      })
      test('plucks last three quotes', () => {
        expectQuote(songwritters.slice(1, 4), 'Nick', 3, 3, 2, false)
      })
    })
    testProtoFunc('withQuote', instance, () => {
      test('accepts 1 plain object.', () => {
        const q = instance.withQuote({ name: 'b', refs: [aliceBook] })
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      test('accepts 2 plain objects.', () => {
        const q = instance.withQuote(
          { name: 'b', refs: [aliceBook] },
          { name: 'c', refs: [devilsBook] }
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
      test('accepts 1 quote.', () => {
        const q = instance.withQuote(Quote({ name: 'b', refs: [aliceBook] }))
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      test('accepts 2 quotes.', () => {
        const q = instance.withQuote(
          Quote({ name: 'b', refs: [aliceBook] }),
          Quote({ name: 'c', refs: [devilsBook] })
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    testProtoFunc('withRef', instance, () => {
      test('appends 1 ref to a single quote.', () => {
        const q = instance.withRef(aliceBook)
        expectQuote(q, 'a', 1, 2, 0, true)
        expect(q.hasRef(frankenBook)).toBe(true)
        expect(q.hasRef(aliceBook)).toBe(true)
      })
      test('appends 2 refs to a single quote.', () => {
        const q = instance.withRef(aliceBook, devilsBook)
        expectQuote(q, 'a', 1, 3, 0, true)
        expect(q.hasRef(frankenBook)).toBe(true)
        expect(q.hasRef(aliceBook)).toBe(true)
        expect(q.hasRef(devilsBook)).toBe(true)
      })
      test('appends 1 ref to a double quote.', () => {
        const q = Quote(
          Quote({ name: 'Bubble', refs: [aliceBook] }),
          Quote({ name: 'Bobble', refs: [aliceBook] })
        ).withRef(frankenBook)

        expectQuote(q, 'Bubble', 2, 4, 1, false)
        expect(q.hasRef(aliceBook)).toBe(true)
        expect(q.hasRef(frankenBook)).toBe(true)
      })
      test('appends 2 refs to a double quote.', () => {
        const q = Quote(
          Quote({ name: 'Bubble', refs: [aliceBook] }),
          Quote({ name: 'Bobble', refs: [devilsBook] })
        ).withRef(frankenBook, prideBook)

        expectQuote(q, 'Bubble', 2, 6, 1, false)
        expect(q.hasRef(aliceBook)).toBe(true)
        expect(q.hasRef(devilsBook)).toBe(true)
        expect(q.hasRef(frankenBook)).toBe(true)
        expect(q.hasRef(prideBook)).toBe(true)
      })
    })
  })
  describe('Constructor Signature', () => {
    describe('Plain objects: unique ', () => {
      test('accepts 1 object.', () => {
        const q = Quote({ name: 'a', refs: [aliceBook] })
        expectQuote(q, 'a', 1, 1, 0, true)
      })
      test('accepts 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'b', refs: [devilsBook] }
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      test('accepts 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'b', refs: [devilsBook] },
          { name: 'c', refs: [frankenBook] }
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Plain objects: identical names & refs', () => {
      test('merges 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      test('merges 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Plain objects: identical names & unique refs', () => {
      test('merges 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [devilsBook] }
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      test('merges 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'a', refs: [devilsBook] },
          { name: 'a', refs: [frankenBook] }
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Plain objects: unique names & identical refs', () => {
      test('merges 2 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'b', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      test('merges 3 objects.', () => {
        const q = Quote(
          { name: 'a', refs: [aliceBook] },
          { name: 'b', refs: [aliceBook] },
          { name: 'c', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Quotes: unique ', () => {
      test('accepts 1 quote.', () => {
        const q = Quote(Quote({ name: 'a', refs: [aliceBook] }))
        expectQuote(q, 'a', 1, 1, 0, true)
      })
      test('accepts 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'b', refs: [devilsBook] })
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      test('accepts 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'b', refs: [devilsBook] }),
          Quote({ name: 'c', refs: [frankenBook] })
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Quotes: identical names & refs', () => {
      test('merges 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [aliceBook] })
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      test('merges 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [aliceBook] })
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Quotes: identical names & unique refs', () => {
      test('merges 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [devilsBook] })
        )
        expectQuote(q, 'a', 1, 2, 0, true)
      })
      test('merges 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'a', refs: [devilsBook] }),
          Quote({ name: 'a', refs: [frankenBook] })
        )
        expectQuote(q, 'a', 1, 3, 0, true)
      })
    })
    describe('Quotes: unique names & identical refs', () => {
      test('merges 2 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'b', refs: [aliceBook] })
        )
        expectQuote(q, 'a', 2, 2, 1, false)
      })
      test('merges 3 quotes.', () => {
        const q = Quote(
          Quote({ name: 'a', refs: [aliceBook] }),
          Quote({ name: 'b', refs: [aliceBook] }),
          Quote({ name: 'c', refs: [aliceBook] })
        )
        expectQuote(q, 'a', 3, 3, 2, false)
      })
    })
    describe('Rejections: thrown errors', () => {
      test('rejects undefined', () => {
        expect(() => { Quote() }).toThrow(Error)
      })
      test('rejects null', () => {
        expect(() => { Quote(null) }).toThrow(Error)
      })
      test('rejects strings', () => {
        expect(() => { Quote('') }).toThrow(Error)
        expect(() => { Quote('abc') }).toThrow(Error)
      })
      test('rejects numbers', () => {
        expect(() => { Quote(123) }).toThrow(Error)
      })
      test('rejects invalid object literals', () => {
        expect(() => { Quote({}) }).toThrow(Error)
        expect(() => { Quote({ refs: ['abc'] }) }).toThrow(Error)
        expect(() => { Quote({ name: ['abc'], refs: '123' }) }).toThrow(Error)
      })
    })
    describe('Refs are optional', () => {
      test('does not require refs #1', () => {
        const q = Quote(
          { name: 'a' },
          { name: 'b', refs: [aliceBook] }
        )
        expectQuote(q, 'a', 2, 1, 1, false)
      })
      test('does not require refs #2', () => {
        const q = Quote(
          { name: 'a' },
          { name: 'b' },
          { name: 'c' },
          { name: 'd' },
        )
        expectQuote(q, 'a', 4, 0, 3, false)
      })
      test('strips falsey values from refs', () => {
        expectQuote(
          Quote({ name: 'a', refs: [undefined] }),
          'a', 1, 0, 0, true
        )
      })
    })
  })
})

import { $Term } from '../../src/Glosses/Term.js'
import { MockQuote } from '../mocks/MockQuote.js'
import { MockRef } from '../mocks/MockRef.js'
import { $DefList } from '../../src/Constructor/DefList.js'
import { $QuoteList } from '../../src/Lists/QuoteList.js'

describe('$Term', () => {
  it('is a function', () => {
    expect(typeof $Term).toBe('function')
  })
  it('is idempotent when simple', () => {
    const a = new $Term({
      name: 'a',
      memos: [new MockQuote('One')],
      defs: [new MockQuote('Two')],
      refs: [new MockRef('Three')]
    })
    const b = new $Term(a)
    expect(a).toStrictEqual(b)
    expect(a === b).toBe(false)
  })
  it('throws if called without the new keyword', () => {
    expect(() => { $Term() }).toThrow()
  })
  it('throws if no parameters are passed', function () {
    expect(() => { new $Term() }).toThrow()
  })
  it('constructs frozen instances', function () {
    expect(Object.isFrozen(new $Term({ name: 'a' }))).toBe(true)
  })
  it('constructs instances with frozen prototypes', function () {
    const t = new $Term({ name: 'a' })
    expect(Object.isFrozen(Object.getPrototypeOf(t))).toBe(true)
  })
  it('constructs instances of $Term', function () {
    expect(new $Term({ name: 'a' })).toBeInstanceOf($Term)
  })
  it('constructs with default properties defined', function () {
    const term = new $Term({ name: 'a' })
    expect(term.name).toBe('a')
    expect(term.length).toBe(0)
    expect(term.memos).toBeInstanceOf($QuoteList)
    expect(term.defs).toBeInstanceOf($DefList)
  })
  it('accepts 1 mock quote object for optional "defs" prop', function () {
    const props = {
      name: 'a',
      defs: [ new MockQuote('b') ]
    }
    const term = new $Term(props)
    expect(term.name).toBe(props.name)
    expect(term.length).toBe(1)
    expect(term.defs.get(0).name).toBe('b')
  })
  it('accepts 2 mock quote objects with unique names as defs', function () {
    const props = {
      name: 'a',
      defs: [
        new MockQuote('b'),
        new MockQuote('c')
      ]
    }
    const term = new $Term(props)
    expect(term.name).toBe(props.name)
    expect(term.length).toBe(2)
    expect(term.defs.get(0).name).toBe('b')
    expect(term.defs.get(1).name).toBe('c')
  })
  it('merges 2 quote objects with same names', function () {
    const props = {
      name: 'a',
      defs: [
        new MockQuote('b'),
        new MockQuote('b')
      ]
    }
    const term = new $Term(props)
    expect(term.name).toBe(props.name)
    expect(term.length).toBe(1)
    expect(term.defs.get(0).name).toBe('b')
  })
  it('merges 2 quote objects with same names', function () {
    const props = {
      name: 'a',
      defs: [
        new MockQuote('b'),
        new MockQuote('b')
      ]
    }
    const term = new $Term(props)
    expect(term.name).toBe(props.name)
    expect(term.length).toBe(1)
    expect(term.defs.get(0).name).toBe('b')
  })
  it('has prototype function: as().', () => {
    expect(typeof new $Term({ name: 'a' }).as).toBe('function')
  })
  it('  - returns an instance of $Term.', () => {
    expect(new $Term({ name: 'a' }).as().constructor.name).toBe('$Term')
  })
  it('  - adds a single definition to an empty term.', () => {
    expect(new $Term({ name: 'a' }).as(new MockQuote('Klingon')).length).toBe(1)
  })
  it('  - adds three unique definitions to an empty term.', () => {
    const term = new $Term({ name: 'a' }).as(
      new MockQuote('Klingon'),
      new MockQuote('Vulcan'),
      new MockQuote('Andorian')
    )
    expect(term.length).toBe(3)
  })
  it('  - merges three identical definitions to an empty term.', () => {
    const term = new $Term({ name: 'a' }).as(
      new MockQuote('Klingon'),
      new MockQuote('Klingon'),
      new MockQuote('Klingon')
    )
    expect(term.length).toBe(1)
  })
  it('has prototype function: from()', () => {
    expect(typeof new $Term({ name: 'a' }).from).toBe('function')
  })
  it('  - returns "this" when no parameters are passed', () => {
    const a = new $Term({ name: 'a' })
    const b = a.from()
    expect(b === a).toBe(true)
  })
  it('  - returns "this" when unrecognizable parameters are passed', () => {
    const a = new $Term({ name: 'a' })
    const b = a.from('', 123, true, false, null, {}, [], new Map(), Symbol())
    expect(b === a).toBe(true)
  })
  it('  - returns clone with provided ref appended to the RefList', () => {
    const book = new MockRef('Frankenstein')
    const chap = new MockRef('Chapter 2')
    const page = new MockRef('Page 14')
    const a = new $Term({ name: 'a', refs: book })
    const b = a.from(chap)
    const c = b.from(page)
    expect(b).not.toBe(a)
    expect(b).not.toBe(c)
    expect(c).not.toBe(a)

    expect(b.name).toBe(a.name)
    expect(b.refs.length).toBe(2)
    expect(b.ref(0)).toBe(book)
    expect(b.ref(1)).toBe(chap)

    expect(c.name).toBe(a.name)
    expect(c.refs.length).toBe(3)
    expect(c.ref(0)).toBe(book)
    expect(c.ref(1)).toBe(chap)
    expect(c.ref(2)).toBe(page)
  })
  it('has prototype function: ref()', () => {
    expect(typeof new $Term({ name: 'a' }).ref).toBe('function')
  })
  it('  - returns undefined when no refs exist', () => {
    const a = new $Term({ name: 'a' })
    expect(a.ref(0)).toBeUndefined()
    expect(a.ref(1)).toBeUndefined()
    expect(a.ref(2)).toBeUndefined()
  })
  it('  - returns undefined when requested ref does not exist', () => {
    const a = new $Term({ name: 'a' }).from()
    expect(a.ref(0)).toBeUndefined()
    expect(a.ref(1)).toBeUndefined()
    expect(a.ref(2)).toBeUndefined()
  })
  it('  - returns correct ref by index', () => {
    const book = new MockRef('Frankenstein')
    const chap = new MockRef('Chapter 2')
    const page = new MockRef('Page 14')
    const a = new $Term({ name: 'a' }).from(book, chap, page)
    expect(a.ref(0)).toBe(book)
    expect(a.ref(1)).toBe(chap)
    expect(a.ref(2)).toBe(page)
  })
  it('  - returns correct ref by name', () => {
    const book = new MockRef('Frankenstein')
    const chap = new MockRef('Chapter 2')
    const page = new MockRef('Page 14')
    const a = new $Term({ name: 'a' }).from(book, chap, page)
    expect(a.ref('Frankenstein')).toBe(book)
    expect(a.ref('Chapter 2')).toBe(chap)
    expect(a.ref('Page 14')).toBe(page)
  })


})





/*
describe('Term() Unit Tests', () => {
  testFactoryFunction('Term', Term, Term('a'))
  describe('Term(): Function Signatures', function () {
    describe('(name)', () => {
      test('accepts a non-empty string as parameter one.', () => {
        expect(function () { Term('a') }).not.toThrow(Error)
      })
      test('accepts a number as parameter one.', () => {
        expect(function () { Term(123) }).not.toThrow(Error)
      })
      test('accepts a named object as parameter one.', () => {
        expect(function () { Term(new NamedObject()) }).not.toThrow(Error)
      })
      test('rejects empty strings as parameter one by throwing a TypeError.', () => {
        expect(function () { Term('') }).toThrow(TypeError)
      })
      test('rejects unnamed objects as parameter one by throwing a TypeError.', () => {
        expect(function () { Term(new UnnamedObject()) }).toThrow(TypeError)
      })
    })
    describe('(name, memo)', () => {
      test('accepts an empty string as parameter two.', () => {
        expect(function () { Term('a', '') }).not.toThrow(Error)
      })
      test('accepts a non-empty string as parameter two.', () => {
        expect(function () { Term('a', 'Betelgeuse') }).not.toThrow(Error)
      })
      test('accepts an integer as parameter two.', () => {
        expect(function () { Term('a', 123) }).not.toThrow(Error)
      })
      test('accepts a named object as parameter two.', () => {
        expect(function () { Term(new NamedObject()) }).not.toThrow(Error)
      })
      test('rejects an unnamed objects as parameter two by throwing a TypeError.', () => {
        expect(function () { Term(new UnnamedObject()) }).toThrow(TypeError)
      })
    })
    describe('(name, memo, def)', () => {
      test('accepts a non-empty string as parameter three.', () => {
        expect(function () { Term('a', '', 'BANANA') }).not.toThrow(Error)
      })
      test('accepts a non-empty string as parameter three.', () => {
        expect(function () { Term('a', '', 'BANANA') }).not.toThrow(Error)
      })
    })
  })
  describe('Term: Instance Methods', function () {
    describe('getMemo()', function () {
      test('is a function.', () => {
        expect(typeof Term('a').getMemo).toBe('function')
      })
      test('returns undefined when no memo exists.', () => {
        expect(Term('a').getMemo()).toBe(undefined)
      })
      test('returns the only memo when one memo exists.', () => {
        const memo = new MockQuote('The book not the show.')
        expect(Term('American Gods', memo).getMemo()).toBe(memo)
      })
    })
    describe('getDef()', function () {
      const d1 = new MockQuote('Klingon')
      const d2 = new MockQuote('Vulcan')
      const d3 = new MockQuote('Andorian')
      const term = Term('a', '', d1, d2, d3)
      test('is a function.', () => {
        expect(typeof Term('a').getDef).toBe('function')
      })
      test('returns value of first def parameter.', () => {
        expect(term.getDef(0)).toBe(d1)
      })
      test('returns value of second def parameter.', () => {
        expect(term.getDef(1)).toBe(d2)
      })
      test('returns value of third def parameter.', () => {
        expect(term.getDef(2)).toBe(d3)
      })
    })
    describe('withMemo()', function () {
      test('Allows a string memo to be appended.', () => {
        const memo1 = new MockQuote('They are dangerous.')
        const memo2 = new MockQuote('They are mageistic.')
        const term = Term('a', memo1).withMemo(memo2)
        expect(term.getMemo(0)).toBe(memo1)
        expect(term.getMemo(1)).toBe(memo2)
      })
    })
    describe('withGloss()', function () {
      test('Allows a single gloss to be merged.', () => {
        const term1 = Term(
          'Klingon',
          new MockQuote('They are dangerous.'),
          new MockQuote('aliens'),
          new MockQuote('warlike')
        )
        const term2 = Term(
          'Klingon(TNG)',
          new MockQuote('They are mageistic.'),
          new MockQuote('honorable'),
          new MockQuote('spiritual')
        )
        const term3 = term1.withGloss(term2)
        expect(term3.name).toBe('Klingon')
        expect(term3.getMemo(0).name).toBe('They are dangerous.')
        expect(term3.getMemo(1).name).toBe('They are mageistic.')
        expect(term3.getDef(0).name).toBe('aliens')
        expect(term3.getDef(1).name).toBe('warlike')
        expect(term3.getDef(2).name).toBe('honorable')
        expect(term3.getDef(3).name).toBe('spiritual')
      })
    })
  })
})
*/

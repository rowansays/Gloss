// Quote Unit
import { $Quote } from '../../src/Quotes/Quote.js'
import { aliceBook, devilsBook } from '../data/refs.js'

// Quote: Integration
import { isQuote } from '../../src/Utility/predicate.js'



describe('$Quote', () => {
  it('is a function', () => {
    expect(typeof $Quote).toBe('function')
  })
  it('is idempotent', () => {
    const a = new $Quote({ name: 'a', from: 'b', ref: aliceBook })
    const b = new $Quote(a)
    expect(a).toStrictEqual(b)
    expect(a === b).toBe(false)
  })
  it('throws if called without the new keyword', () => {
    expect(() => { $Quote() }).toThrow()
  })
  it('throws if no parameters are passed', function () {
    expect(() => { new $Quote() }).toThrow()
  })
  it('constructs frozen instances', function () {
    expect(Object.isFrozen(new $Quote({ name: 'a' }))).toBe(true)
  })
  it('constructs instances with frozen prototypes', function () {
    const q = new $Quote({ name: 'a' })
    expect(Object.isFrozen(Object.getPrototypeOf(q))).toBe(true)
  })
  it('constructs instances of $Quote', function () {
    expect(new $Quote({ name: 'a' })).toBeInstanceOf($Quote)
  })
  test('accepts non-empty string for required prop "name"', function () {
    const a = new $Quote({ name: 'abc'})
    expect(a).toMatchObject({
      name: 'abc',
      from: '',
      refs: { items: [], length: 0 }
    })
  })
  test('accepts non-empty string for optional prop "from"', function () {
    const a = new $Quote({ name: 'abc', from: 'def' })
    expect(a).toMatchObject({
      name: 'abc',
      from: 'def',
      refs: { items: [], length: 0 }
    })
  })
  test('accepts instance of $Ref for optional prop "ref"', function () {
    const a = new $Quote({ name: 'abc', ref: aliceBook })
    expect(a).toMatchObject({
      name: 'abc',
      from: '',
      refs: {
        items: [aliceBook],
        length: 1
      }
    })
  })
  test('prototype.reduce() is a function.', function () {
    expect(typeof new $Quote({ name: 'a' }).reduce).toBe('function')
  })
  test('  - returns this when "from" is empty.', function () {
    const a = new $Quote({ name: 'abc', refs: [aliceBook] })
    const b = a.reduce()
    expect(a === b).toBe(true)
  })
  test('  - returns a new instance that moves "from" to "name".', function () {
    const a = new $Quote({ name: 'abc', from: 'def', ref: aliceBook })
    const b = a.reduce()
    expect(b === a).toBe(false)
    expect(b).toMatchObject({ name: a.from, from: '', ref: a.ref })
  })
  test('prototype.withRef() is a function.', function () {
    expect(typeof new $Quote({ name: 'a' }).withRef).toBe('function')
  })
  test('  - throws when parameter 1 is not a reference.', function () {
    const a = new $Quote({ name: 'abc', refs: [aliceBook] })
    expect(() => { a.withRef() }).toThrow()
    expect(() => { a.withRef(true) }).toThrow()
    expect(() => { a.withRef(null) }).toThrow()
    expect(() => { a.withRef('') }).toThrow()
    expect(() => { a.withRef('') }).toThrow()
    expect(() => { a.withRef({}) }).toThrow()
  })
  test('  - creates a new instance with provided reference.', function () {
    const a = new $Quote({ name: '123', from: '456', ref: aliceBook })
    const b = a.withRef(devilsBook)
    expect(b === a).toBe(false)
    expect(b).toMatchObject({
      name: a.name,
      from: a.from,
      refs: {
        items: [devilsBook],
        length: 1
      }
    })
  })
})

// Quote: Integration Tests

test('Quotes are Quotes.', function () {
  expect(isQuote(new $Quote({ name: 'a' }))).toBe(true)
})

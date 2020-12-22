// Quote Unit
import { $Quote } from '../../src/Quotes/Quote.js'
import { aliceBook, devilsBook } from '../data/refs.js'
import { MockRef } from '../mocks/MockRef.js'

// Quote: Integration
import { isQuote } from '../../src/Utility/predicate.js'



describe('$Quote', () => {
  it('is a function', () => {
    expect(typeof $Quote).toBe('function')
  })
  it('is idempotent', () => {
    const a = new $Quote({ name: 'a', cite: 'b', ref: aliceBook })
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
      cite: '',
      refs: { items: [], length: 0 }
    })
  })
  test('accepts non-empty string for optional prop "cite"', function () {
    const a = new $Quote({ name: 'abc', cite: 'def' })
    expect(a).toMatchObject({
      name: 'abc',
      cite: 'def',
      refs: { items: [], length: 0 }
    })
  })
  test('accepts instance of $Ref for optional prop "ref"', function () {
    const a = new $Quote({ name: 'abc', ref: aliceBook })
    expect(a).toMatchObject({
      name: 'abc',
      cite: '',
      refs: {
        items: [aliceBook],
        length: 1
      }
    })
  })
  it('has prototype function: prototype.from().', function () {
    expect(typeof new $Quote({ name: 'a' }).from).toBe('function')
  })
  test('  - returns "this" when no parameters are passed', function () {
    const a = new $Quote({ name: 'abc', refs: [aliceBook] })
    const b = a.from()
    expect(b === a).toBe(true)
  })
  test('  - throws when a non-reference is provided.', function () {
    const a = new $Quote({ name: 'abc', refs: [aliceBook] })
    expect(() => { a.from(true) }).toThrow()
    expect(() => { a.from(null) }).toThrow()
    expect(() => { a.from('') }).toThrow()
    expect(() => { a.from('') }).toThrow()
    expect(() => { a.from({}) }).toThrow()
  })
  test('  - creates a new instance with 1 reference.', function () {
    const a = new $Quote({ name: '123', cite: '456', ref: aliceBook })
    const b = a.from(devilsBook)
    expect(b === a).toBe(false)
    expect(b).toMatchObject({
      name: a.name,
      cite: a.cite,
      refs: {
        items: [devilsBook],
        length: 1
      }
    })
  })
  test('prototype.map() is a function.', function () {
    expect(typeof new $Quote({ name: 'a' }).map).toBe('function')
  })
  test('  - throws when parameter one is undefined.', function () {
    const a = new $Quote({ name: 'abc' })
    expect(() => { a.map() }).toThrow()
  })
  test('  - returns empty array when no refs exist.', function () {
    const a = new $Quote({ name: 'abc' })
    const b = a.map(() => {})
    expect(Array.isArray(b)).toBe(true)
    expect(b.length).toBe(0)
  })
  test('  - applies callback once to each ref when 1 ref exists.', function () {
    const ref = new MockRef()
    const quote = new $Quote({ name: 'abc', ref: ref })
    const array = quote.map(ref => ref.name)
    expect(Array.isArray(array)).toBe(true)
    expect(array.length).toBe(1)
    expect(array[0]).toBe(ref.name)
  })
  test('  - applies callback once to each ref when 3 refs exists.', function () {
    const ref1 = new MockRef('Jon')
    const ref2 = new MockRef('Arya')
    const ref3 = new MockRef('Bran')
    const quote = new $Quote({ name: 'abc', refs: [ref1, ref2, ref3] })
    const array = quote.map(ref => ref.name)
    expect(Array.isArray(array)).toBe(true)
    expect(array.length).toBe(3)
    expect(array[0]).toBe(ref1.name)
    expect(array[1]).toBe(ref2.name)
    expect(array[2]).toBe(ref3.name)
  })
  test('prototype.reduce() is a function.', function () {
    expect(typeof new $Quote({ name: 'a' }).reduce).toBe('function')
  })
  test('  - returns this when "cite" is empty.', function () {
    const a = new $Quote({ name: 'abc', refs: [aliceBook] })
    const b = a.reduce()
    expect(a === b).toBe(true)
  })
  test('  - returns a new instance that moves "cite" to "name".', function () {
    const a = new $Quote({ name: 'abc', cite: 'def', ref: aliceBook })
    const b = a.reduce()
    expect(b === a).toBe(false)
    expect(b.name).toBe(a.cite)
    expect(b.cite).toBe('')
  })
  test('  - preserves the refs property.', function () {
    const a = new $Quote({ name: 'abc', cite: 'def', ref: aliceBook })
    const b = a.reduce()
    expect(b.ref(0)).toBe(a.ref(0))
  })
})

// Quote: Integration Tests

test('Quotes are Quotes.', function () {
  expect(isQuote(new $Quote({ name: 'a' }))).toBe(true)
})

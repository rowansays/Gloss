import { $DefList } from '../../src/Defs/DefList.js'
import { MockRef } from '../mocks/MockRef.js'
import { MockQuote } from '../mocks/MockQuote.js'

describe('$DefList', () => {
  it('is a function', () => {
    expect(typeof $DefList).toBe('function')
  })
  it('throws if called without the new keyword', () => {
    expect(() => { $DefList() }).toThrow()
  })
  it('constructs without parameters', function () {
    expect(() => { new $DefList() }).not.toThrow()
  })
  it('constructs frozen instances', function () {
    expect(Object.isFrozen(new $DefList())).toBe(true)
  })
  it('constructs instances with frozen prototypes', function () {
    expect(Object.isFrozen(Object.getPrototypeOf(new $DefList()))).toBe(true)
  })
  it('constructs instances of $DefList', function () {
    expect(new $DefList()).toBeInstanceOf($DefList)
  })
  it('constructs with 1 quote', function () {
    const props = [
      new MockQuote('Hello', '', new MockRef('Alice in Wonderland', '1865'))
    ]
    const a = new $DefList(...props)
    expect(a).toMatchObject({ length: 1 })
    expect(a.get(0)).toMatchObject({ name: 'Hello', length: 1 })
  })
  it('constructs with 2 quotes having the same name', function () {
    const props = [
      new MockQuote('Hello', '', new MockRef('Alice in Wonderland', '1865')),
      new MockQuote('Hello', '', new MockRef('Frankenstein', '1818'))
    ]
    const a = new $DefList(...props)
    expect(a).toMatchObject({ length: 1 })
    expect(a.get(0)).toMatchObject({ name: 'Hello', length: 2 })
  })
  it('constructs with 3 quotes having the same name', function () {
    const props = [
      new MockQuote('Hello', '', new MockRef('Alice in Wonderland', '1865')),
      new MockQuote('Hello', '', new MockRef('Frankenstein', '1818')),
      new MockQuote('Hello', '', new MockRef('Pride and Prejudice', '1813'))
    ]
    const a = new $DefList(...props)
    expect(a).toMatchObject({ length: 1 })
    expect(a.get(0)).toMatchObject({ name: 'Hello', length: 3  })
  })
})

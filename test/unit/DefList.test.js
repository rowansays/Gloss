import { $DefList } from '../../src/Defs/DefList.js'
import { $Quote } from '../../src/Quotes/Quote.js'
import { aliceBook, devilsBook, frankenBook, prideBook } from '../data/refs.js'

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
      new $Quote({ name: 'Hello', refs: aliceBook })
    ]
    const a = new $DefList(...props)
    expect(a).toMatchObject({ length: 1 })
    expect(a.get(0)).toMatchObject({ name: 'Hello', length: 1 })
  })
  it('constructs with 2 quotes having the same name', function () {
    const props = [
      new $Quote({ name: 'Hello', refs: aliceBook }),
      new $Quote({ name: 'Hello', refs: devilsBook })
    ]
    const a = new $DefList(...props)
    expect(a).toMatchObject({ length: 1 })
    expect(a.get(0)).toMatchObject({ name: 'Hello', length: 2 })
  })
  it('constructs with 4 quotes with the same names', function () {
    const props = [
      new $Quote({ name: 'Hello', refs: aliceBook }),
      new $Quote({ name: 'Hello', refs: devilsBook }),
      new $Quote({ name: 'Hello', refs: frankenBook }),
      new $Quote({ name: 'Hello', refs: prideBook })
    ]
    const a = new $DefList(...props)
    expect(a).toMatchObject({ length: 1 })
    expect(a.get(0)).toMatchObject({ name: 'Hello', length: 4  })
  })
})

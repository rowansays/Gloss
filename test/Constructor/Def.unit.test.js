import { $Def } from '../../src/Constructor/Def.js'
import { $RefList } from '../../src/Constructor/RefList.js'
import { $Quote } from '../../src/Constructor/Quote.js'
import { aliceBook, devilsBook, frankenBook, prideBook } from '../data/refs.js'
import { MockRef } from '../mocks/MockRef.js'

describe('$Def', () => {
  it('is a function', () => {
    expect(typeof $Def).toBe('function')
  })
  it('is idempotent when empty', () => {
    const a = new $Def()
    const b = new $Def(a)
    expect(b === a).toBe(false)
    expect(b).toMatchObject(a)
  })
  it('is idempotent when full', () => {
    const a = new $Def(
      new $Quote({name: 'Bunnies', from : '', ref: aliceBook }),
      new $Quote({name: 'Bunnies', from : 'Rabbits', ref: aliceBook }),
    )
    const b = new $Def(a)
    expect(b === a).toBe(false)
    expect(b).toMatchObject(a)
  })
  it('throws if called without the new keyword', () => {
    expect(() => { $Def() }).toThrow()
  })
  it('constructs without parameters', function () {
    expect(() => { new $Def() }).not.toThrow()
  })
  it('constructs frozen instances', function () {
    expect(Object.isFrozen(new $Def())).toBe(true)
  })
  it('constructs instances with frozen prototypes', function () {
    expect(Object.isFrozen(Object.getPrototypeOf(new $Def()))).toBe(true)
  })
  it('constructs instances of $Def', function () {
    expect(new $Def()).toBeInstanceOf($Def)
  })
  it('constructs with one $Quote instance', function () {
    const a = new $Def(
      new $Quote({ name: 'Hello', refs: aliceBook })
    )
    expect(a).toMatchObject({ name: 'Hello', length: 1 })
  })
  it('construts with four $Quote instances having the same name', function () {
    const a = new $Def(
      new $Quote({ name: 'Hello', refs: aliceBook }),
      new $Quote({ name: 'Hello', refs: devilsBook }),
      new $Quote({ name: 'Hello', refs: frankenBook }),
      new $Quote({ name: 'Hello', refs: prideBook }),
    )
    expect(a).toMatchObject({ name: 'Hello', length: 4 })
  })
  it('throws when one $Quote instance has an incompatible name', function () {
    expect(() => {
      const a = new $Def(
        new $Quote({ name: 'Hello', refs: aliceBook }),
        new $Quote({ name: 'Hello', refs: devilsBook }),
        new $Quote({ name: 'Hello', refs: frankenBook }),
        new $Quote({ name: 'Goodbye', refs: prideBook }),
      )
    }).toThrow()
  })
  it('has prototype function: from()', function () {
    expect(typeof new $Def().from).toBe('function')
  })
  it('  - returns "this" when no parameters are provided', function () {
    const a = new $Def()
    const b = a.from()
    expect(a === b).toBe(true)
  })
  test('prototype.mapBy()', function () {
    expect(typeof new $Def().mapBy).toBe('function')
  })
  it('  - returns an empty Map Instance for an empty definition', function () {
    const d = new $Def().mapBy()
    expect(d).toBeInstanceOf(Map)
    expect(d.size).toBe(0)
  })
  it('  - maps quotes by the year their reference was published ', function () {
    const def = new $Def(
      new $Quote({ name: 'Hello', ref: new MockRef('The Wonderful Wizard of OZ', '1900') }),
      new $Quote({ name: 'Hello', ref: new MockRef('Whilomville Stories', '1900') }),
      new $Quote({ name: 'Hello', ref: new MockRef('Claudine at School', '1900') }),
      new $Quote({ name: 'Hello', ref: new MockRef('Alice in Wonderland', '1865') }),
      new $Quote({ name: 'Hello', ref: new MockRef('Frankenstein', '1818') }),
    )
    const map = def.mapBy('year')
    expect(map).toBeInstanceOf(Map)
    expect(map.size).toBe(3)

    const _1900 = map.get('1900')
    expect(Array.isArray(_1900)).toBe(true)
    expect(_1900.length).toBe(3)

    const _1865 = map.get('1865')
    expect(Array.isArray(_1865)).toBe(true)
    expect(_1865.length).toBe(1)

    const _1818 = map.get('1818')
    expect(Array.isArray(_1818)).toBe(true)
    expect(_1818.length).toBe(1)
  })
  it('  - lists quotes in insertion order', function () {
    const def = new $Def(
      new $Quote({ name: 'Hello', ref: new MockRef('The Wonderful Wizard of OZ', '1900') }),
      new $Quote({ name: 'Hello', ref: new MockRef('Whilomville Stories', '1900') }),
      new $Quote({ name: 'Hello', ref: new MockRef('Claudine at School', '1900') })
    )
    const map = def.mapBy('year')
    expect(map).toBeInstanceOf(Map)
    expect(map.size).toBe(1)

    const _1900 = map.get('1900')
    expect(_1900[0].ref(0).name).toBe('The Wonderful Wizard of OZ')
    expect(_1900[1].ref(0).name).toBe('Whilomville Stories')
    expect(_1900[2].ref(0).name).toBe('Claudine at School')
  })
  test('prototype.refs()', function () {
    expect(typeof new $Def().refs).toBe('function')
  })
  it('  - returns an instance of $RefList', function () {
    expect(new $Def().refs()).toBeInstanceOf($RefList)
  })
  it('  - returns a list of unique references', function () {
    const def = new $Def(
      new $Quote({ name: 'Hello', ref: aliceBook }),
      new $Quote({ name: 'Hello', ref: aliceBook }),
      new $Quote({ name: 'Hello', ref: aliceBook })
    )
    const refs = def.refs()
    expect(refs.length).toBe(1)
    expect(refs.get(0)).toBe(aliceBook)
  })
})

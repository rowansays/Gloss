import { $DefList } from '../../src/Constructor/DefList.js'
import { MockRef } from '../mocks/MockRef.js'
import { MockQuote } from '../mocks/MockQuote.js'
import { testConstructor } from '../helpers/testConstructor.js'

describe('$DefList', () => {
  testConstructor($DefList)
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

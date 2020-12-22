import { $Quote, Normal } from '../../src/Quotes/Quote.js'
import { aliceBook } from '../data/refs.js'

describe('Normal() Unit Tests', () => {
  test('is a function', () => {
    expect(typeof Normal).toBe('function')
  })
  test('throws when parameter 1 is empty', () => {
    expect(() => { Normal() }).toThrow()
    expect(() => { Normal('') }).toThrow()
  })
  test('throws when parameter 2 is empty', () => {
    expect(() => { Normal('a') }).toThrow()
    expect(() => { Normal('a', '') }).toThrow()
  })
  test('returns an instance of $Quote', () => {
    expect(Normal('a', 'b')).toBeInstanceOf($Quote)
  })
  test('constructs a $Quote with expected properties', () => {
    const n = Normal('normal', 'actual', aliceBook)
    expect(n).toMatchObject({
      name: 'normal',
      cite: 'actual',
      refs: {
        items: [aliceBook],
        length: 1
      }
    })
  })
})

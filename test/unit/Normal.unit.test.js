import { Normal } from '../../src/Quotes/Quote.js'

import { aliceBook } from '../data/refs.js'

describe('Normal() Unit Tests', () => {
  test('It has a length of one', () => {
    const n = Normal('normal', 'actual', aliceBook)
    expect(n.length).toBe(1)
  })
})

import { Phrase } from '../../src/Utility/factory.js'
import { $Quote } from '../../src/Constructor/Quote.js'
import { aliceBook } from '../data/refs.js'

describe('Phrase()', () => {
  test('is a function', () => {
    expect(typeof Phrase).toBe('function')
  })
  test('throws when parameter 1 is empty', () => {
    expect(() => { Phrase() }).toThrow()
    expect(() => { Phrase('') }).toThrow()
  })
  test('returns an instance of $Quote', () => {
    expect(Phrase('a')).toBeInstanceOf($Quote)
  })
  test('constructs a $Quote with expected properties', () => {
    const n = Phrase('verbatim', aliceBook)
    expect(n).toMatchObject({
      name: 'verbatim',
      cite: '',
      refs: {
        items: [aliceBook],
        length: 1
      }
    })
  })
})

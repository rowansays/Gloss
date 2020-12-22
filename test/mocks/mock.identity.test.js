import { MockQuote } from './MockQuote.js'
import { MockRef } from './MockRef.js'
import { MockWork } from './MockWork.js'

import {
  isQuote,
  isRef,
  isWork
} from '../../src/Utility/predicate.js'

describe('Mock Identity Tests', () => {
  describe('MockRef() instances', function () {
    test('are recognized as a reference', () => {
      const a = new MockRef('alice', 'Alice in Wonderland')
      expect(isRef(a)).toBe(true)
    })
  })
  describe('MockQuote() instances', () => {
    const a = new MockQuote(
      'That\'s very curious!',
      '',
      new MockRef('alice', 'Alice in Wonderland')
    )
    test('are recognized as a quote', () => {
      expect(isQuote(a)).toBe(true)
    })
  })
  describe('MockWork() instances', () => {
    test('are recognized as a work', () => {
      expect(isWork(new MockWork())).toBe(true)
    })
  })
})

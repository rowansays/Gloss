import { MockQuote } from './MockQuote.js'
import { MockRef } from './MockRef.js'
import { MockWork } from './MockWork.js'

import {
  isQuote,
  isRef,
  isWork
} from '../../src/Utility/predicate.js'

describe('Mock Identity Tests', () => {
  const aliceBook = new MockRef('alice', 'Alice in Wonderland')
  const aliceQuote = new MockQuote('That\'s very curious!', aliceBook)
  describe('MockRef() instances', function () {
    test('are recognized as a reference', () => {
      expect(isRef(aliceBook)).toBe(true)
    })
  })
  describe('MockQuote() instances', () => {
    test('are recognized as a quote', () => {
      expect(isQuote(aliceQuote)).toBe(true)
    })
  })
  describe('MockWork() instances', () => {
    test('are recognized as a work', () => {
      expect(isWork(new MockWork())).toBe(true)
    })
  })
})

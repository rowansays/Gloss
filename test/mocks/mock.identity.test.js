import chai from 'chai'
import mocha from 'mocha'

import { MockQuote } from './MockQuote.js'
import { MockRef } from './MockRef.js'
import { MockWork } from './MockWork.js'

import { isQuote } from '../../src/Utility/isQuote.js'
import { isReference } from '../../src/Utility/isReference.js'
import { isWork } from '../../src/Utility/isWork.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Mock Identity Tests', () => {
  const aliceBook = new MockRef('alice', 'Alice in Wonderland')
  const aliceQuote = new MockQuote('That\'s very curious!', aliceBook)
  describe('MockRef() instances', function () {
    it('are recognized as a reference', () => {
      expect(isReference(aliceBook)).to.be.true
    })
  })
  describe('MockQuote() instances', () => {
    it('are recognized as a quote', () => {
      expect(isQuote(aliceQuote)).to.be.true
    })
  })
  describe('MockWork() instances', () => {
    it('are recognized as a work', () => {
      expect(isWork(new MockWork())).to.be.true
    })
  })
})

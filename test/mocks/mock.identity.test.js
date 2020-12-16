import chai from 'chai'
import mocha from 'mocha'

import { MockQuote } from './MockQuote.js'
import { MockRef } from './MockRef.js'

import { isQuote } from '../../src/Utility/isQuote.js'
import { isReference } from '../../src/Utility/isReference.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Mock Identity Tests', () => {
  const aliceBook = new MockRef('alice', 'Alice in Wonderland')
  const aliceQuote = new MockQuote('That\'s very curious!', aliceBook)
  describe('MockRef() instances', function () {
    it('are recognized as a reference', () => {
      console.log(aliceBook)
      expect(isReference(aliceBook)).to.be.true
    })
  })
  describe('MockQuote() instances', () => {
    it('are recognized as a quote', () => {
      expect(isQuote(aliceQuote)).to.be.true
    })
  })
})

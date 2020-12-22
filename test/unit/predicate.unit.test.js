import {
  isGloss,
  isNamed,
  isQuote,
  isRef
} from '../../src/Utility/predicate.js'

import { testObjectPredicate } from '../helpers/factories.js'

import { MockRef } from '../mocks/MockRef.js'

testObjectPredicate('isGloss', isGloss, () => {
  test('returns true for objects that behave like glosses.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.name = ''
    Gloss.prototype.as = function () {return new Gloss()}
    Gloss.prototype.from = function () {return new Gloss()}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).toBe(true)
  })
})

testObjectPredicate('isNamed', isNamed, () => {
  test('returns true for objects that have a name method.', () => {
    function Named () {}
    Named.prototype.name = ''
    expect(isNamed(new Named())).toBe(true)
  })
})

testObjectPredicate('isQuote', isQuote)

testObjectPredicate('isRef', isRef, () => {
  test('recognizes valid references.', async () => {
    expect(isRef(new MockRef('abc', 'def'))).toBe(true)
  })
})

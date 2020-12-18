import { isReference } from '../../src/Utility/predicate.js'
import { testObjectPredicate } from '../helpers/factories.js'
import { MockRef } from '../mocks/MockRef.js'

testObjectPredicate('isReference', isReference, () => {
  test('recognizes valid references.', async () => {
    expect(isReference(new MockRef('abc', 'def'))).toBe(true)
  })
})

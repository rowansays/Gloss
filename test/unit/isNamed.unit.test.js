// System under test.
import { isNamed } from '../../src/Utility/predicate.js'
import { testObjectPredicate } from '../helpers/factories.js'

testObjectPredicate('isNamed', isNamed, () => {
  test('returns true for objects that have a getName() method.', () => {
    function Named () {}
    Named.prototype.getName = function () {return ''}
    expect(isNamed(new Named())).toBe(true)
  })
})

import { isGloss } from '../../src/Utility/predicate.js'
import { Term } from '../../src/Glosses/Term.js'

describe('isGloss() + various constructors.', () => {
  test('Instances of Term() are glosses.', function () {
    expect(isGloss(Term('a'))).toBe(true)
  })
})

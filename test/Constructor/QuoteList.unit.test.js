// System under test.
import { $QuoteList } from '../../src/Constructor/QuoteList.js'

// Helpers.
import { testConstructor } from '../helpers/testConstructor.js'
import { testObjectList } from '../helpers/testLinear.js'

describe('$QuoteList', function () {
  testConstructor($QuoteList)
  test('  ⋅ constructs when passed three QuoteList instances.', () => {
    const ql = new $QuoteList(
      new $QuoteList(),
      new $QuoteList(),
      new $QuoteList()
    )
    expect(ql.length).toBe(0)
  })
  testObjectList($QuoteList)
})

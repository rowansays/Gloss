// System under test.
import { $GlossList } from '../../src/Constructor/GlossList.js'
import { testConstructor } from '../helpers/testConstructor.js'
import { testObjectList } from '../helpers/testLinear.js'

describe('$GlossList', function () {
  testConstructor($GlossList)
  it('  ⋅ ignores string items.', () => {
    const gl = new $GlossList('a', 'b', 'c')
    expect(gl.length).toBe(0)
  })
  it('  ⋅ ignores number items.', () => {
    const gl = new $GlossList(1, 2, 3)
    expect(gl.length).toBe(0)
  })
  testObjectList($GlossList)
})

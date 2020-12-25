// System under test.
import { $RefList } from '../../src/Constructor/RefList.js'
import { testConstructor } from '../helpers/testConstructor.js'
import { testObjectList } from '../helpers/testLinear.js'

describe('$RefList', function () {
  testConstructor($RefList)
  it('ignores string items', () => {
    const gl = new $RefList('a', 'b', 'c')
    expect(gl.length).toBe(0)
  })
  it('ignores number items', () => {
    const gl = new $RefList(1, 2, 3)
    expect(gl.length).toBe(0)
  })
  testObjectList($RefList)
})

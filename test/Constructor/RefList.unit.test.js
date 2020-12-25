// System under test.
import { $RefList } from '../../src/Constructor/RefList.js'
import { testConstructor } from '../helpers/testConstructor.js'
import { testObjectListInterface } from '../helpers/prototypes.js'

describe('$RefList Parameters', function () {
  testConstructor('$RefList', $RefList)
  it('ignores string items', () => {
    const gl = new $RefList('a', 'b', 'c')
    expect(gl.length).toBe(0)
  })
  it('ignores number items', () => {
    const gl = new $RefList(1, 2, 3)
    expect(gl.length).toBe(0)
  })
})

describe('$RefList.prototype', () => {
  testObjectListInterface(new $RefList())
})

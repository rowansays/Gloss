// System under test.
import { $RefList } from '../../src/Constructor/RefList.js'

import { testObjectListInterface } from '../helpers/prototypes.js'
import { testFactoryFunction } from '../helpers/factories.js'

testFactoryFunction('$RefList', $RefList, new $RefList())

describe('$RefList.prototype', () => {
  testObjectListInterface(new $RefList())
})
describe('$RefList Parameters', function () {
  it('does not require parameters', () => {
    const gl = new $RefList()
    expect(gl.length).toBe(0)
  })
  it('ignores string items', () => {
    const gl = new $RefList('a', 'b', 'c')
    expect(gl.length).toBe(0)
  })
  it('ignores number items', () => {
    const gl = new $RefList(1, 2, 3)
    expect(gl.length).toBe(0)
  })
})

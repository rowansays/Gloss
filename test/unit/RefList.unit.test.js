// System under test.
import { RefList } from '../../src/Refs/RefList.js'

import { testObjectListInterface } from '../helpers/prototypes.js'
import { testFactoryFunction } from '../helpers/factories.js'

testFactoryFunction('RefList', RefList, RefList())

describe('RefList.prototype', () => {
  testObjectListInterface(RefList())
})
describe('RefList Parameters', function () {
  it('does not require parameters', () => {
    const gl = RefList()
    expect(gl.length).toBe(0)
  })
  it('ignores string items', () => {
    const gl = RefList('a', 'b', 'c')
    expect(gl.length).toBe(0)
  })
  it('ignores number items', () => {
    const gl = RefList(1, 2, 3)
    expect(gl.length).toBe(0)
  })
})

// System under test.
import { GlossList } from '../../src/Lists/GlossList.js'

import { testObjectListInterface } from '../helpers/prototypes.js'
import { testFactoryFunction } from '../helpers/factories.js'

testFactoryFunction('GlossList', GlossList, GlossList())

describe('GlossList.prototype', () => {
  testObjectListInterface(GlossList())
})
describe('GlossList(): Parameters', function () {
  describe("()", () => {
    it('accepts an empty array.', () => {
      const gl = GlossList()
      expect(gl.length).toBe(0)
    })
    it('ignores string items.', () => {
      const gl = GlossList('a', 'b', 'c')
      expect(gl.length).toBe(0)
    })
    it('ignores number items.', () => {
      const gl = GlossList(1, 2, 3)
      expect(gl.length).toBe(0)
    })
  })
})

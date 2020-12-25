// System under test.
import { $GlossList } from '../../src/Constructor/GlossList.js'

import { testObjectListInterface } from '../helpers/prototypes.js'
import { testFactoryFunction } from '../helpers/factories.js'

testFactoryFunction('$GlossList', $GlossList, new $GlossList())

describe('$GlossList.prototype', () => {
  testObjectListInterface(new $GlossList())
})
describe('$GlossList(): Parameters', function () {
  describe("()", () => {
    it('accepts an empty array.', () => {
      const gl = new $GlossList()
      expect(gl.length).toBe(0)
    })
    it('ignores string items.', () => {
      const gl = new $GlossList('a', 'b', 'c')
      expect(gl.length).toBe(0)
    })
    it('ignores number items.', () => {
      const gl = new $GlossList(1, 2, 3)
      expect(gl.length).toBe(0)
    })
  })
})

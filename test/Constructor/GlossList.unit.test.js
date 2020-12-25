// System under test.
import { $GlossList } from '../../src/Constructor/GlossList.js'
import { testObjectListInterface } from '../helpers/prototypes.js'
import { testConstructor } from '../helpers/testConstructor.js'

describe('$GlossList(): Parameters', function () {
  testConstructor('$GlossList', $GlossList)
  describe("()", () => {
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

describe('$GlossList.prototype', () => {
  testObjectListInterface(new $GlossList())
})

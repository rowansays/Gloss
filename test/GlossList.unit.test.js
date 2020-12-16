// System under test.
import { GlossList } from '../src/Lists/GlossList.js'

// Test library
import chai from 'chai'
import mocha from 'mocha'
import { testObjectListInterface } from './helpers/prototypes.js'
import { testFactoryFunction } from './helpers/factories.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

testFactoryFunction('GlossList', GlossList, GlossList())

describe('GlossList.prototype', () => {
  testObjectListInterface(GlossList())
})
describe('GlossList(): Parameters', function () {
  describe("()", () => {
    it('accepts an empty array.', () => {
      const gl = GlossList()
      expect(gl.length).to.equal(0)
    })
    it('ignores string items.', () => {
      const gl = GlossList('a', 'b', 'c')
      expect(gl.length).to.equal(0)
    })
    it('ignores number items.', () => {
      const gl = GlossList(1, 2, 3)
      expect(gl.length).to.equal(0)
    })
  })
})

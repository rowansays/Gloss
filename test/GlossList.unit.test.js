// System under test.
import { GlossList } from '../src/Lists/GlossList.js'

// Test library
import chai from 'chai'
import mocha from 'mocha'
import { testAbstractObjectListPrototype } from './helpers/prototypes.js'
import { testFactoryFunction, testNameProp } from './helpers/factories.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

testFactoryFunction('GlossList', GlossList, GlossList({ name: 'nobody' }))

describe('GlossList.prototype', () => {
  testAbstractObjectListPrototype(GlossList({ name: 'nobody' }))
})
describe('GlossList(): Parameters', function () {
  testNameProp(GlossList)
  describe("({ name: 'nobody', items: [] })", () => {
    it('accepts an empty array.', () => {
      const gl = GlossList({ name: 'nobody', items: [] })
      expect(gl.length).to.equal(0)
    })
    it('ignores string items.', () => {
      const gl = GlossList({ name: 'nobody', items: ['a', 'b', 'c'] })
      expect(gl.length).to.equal(0)
    })
    it('ignores number items.', () => {
      const gl = GlossList({ name: 'nobody', items: [1, 2, 3] })
      expect(gl.length).to.equal(0)
    })
  })
})

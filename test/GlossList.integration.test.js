import chai from 'chai'
import mocha from 'mocha'
import { GlossList } from '../src/Lists/GlossList.js'
import { Phrase } from '../src/Quotes/Phrase.js'
import { Term } from '../src/Glosses/Term.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('GlossList() Integration Tests', function () {
  it('merges four phrases with the same names (case sensitive).', () => {
    const gl = GlossList(
      Term('3', '', Phrase('natural number', 'wikipedia')),
      Term('3', '', Phrase('odd number', 'wikipedia')),
      Term('3', '', Phrase('prime number', 'wikipedia')),
      Term('3', '', Phrase('magic number', 'schoolhouse-rock'))
    )
    expect(gl.getSize()).to.equal(1)
    expect(gl.getItem(0).getSize()).to.equal(4)
  })
})

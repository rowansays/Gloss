import chai from 'chai'
import mocha from 'mocha'
import { isGloss } from '../src/Predicates/isGloss.js'
import { Term } from '../src/Glosses/Term.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isGloss() + various constructors.', () => {
  it('Instances of Term() are glosses.', function () {
    expect(isGloss(Term('a'))).to.be.true
  })
})

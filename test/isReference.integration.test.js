import chai from 'chai'
import mocha from 'mocha'
import { isReference } from '../index.js'
import { Book } from '../index.js'
import { Webpage } from '../index.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isSource() + various constructors.', () => {
  const emptyBook = new Book()
  it('An instance of Book() is a references.', function () {
    expect(isReference(new Book())).to.be.true
  })
  it('Instances of Webpage() are references.', function () {
    expect(isReference(Webpage())).to.be.true
  })
})

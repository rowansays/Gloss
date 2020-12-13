import chai from 'chai'
import mocha from 'mocha'
import { isReference } from '../src/Utility/isReference.js'
import { Book } from '../src/References/Book.js'
import { Webpage } from '../src/References/Webpage.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isReference() + various constructors.', () => {
  const emptyBook = new Book()
  it('Instances of Book() are references.', function () {
    expect(isReference(new Book())).to.be.true
  })
  it('Instances of Webpage() are references.', function () {
    expect(isReference(Webpage())).to.be.true
  })
})

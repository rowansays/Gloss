import chai from 'chai'
import mocha from 'mocha'
import { isSource } from '../src/Predicates/isSource.js'
import { Book } from '../Book.js'
import { Webpage } from '../Webpage.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('isSource() + various constructors.', () => {
  const emptyBook = new Book()
  it('An instance of Book() is a source.', function () {
    expect(isSource(new Book())).to.be.true
  })
  it('Instances of Webpage() are sources.', function () {
    expect(isSource(Webpage())).to.be.true
  })
})

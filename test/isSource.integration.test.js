import chai from 'chai'
import mocha from 'mocha'
import { Book } from '../Book.js'
import { isSource } from '../isSource.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

const emptyBook = new Book()

describe('isSource(Book())', () => {
  it('An instance of Book() is a source.', function () {
    expect(isSource(new Book())).to.be.true
  })
})

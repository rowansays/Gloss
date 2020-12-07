import chai from 'chai'
import mocha from 'mocha'
import { Book } from '../src/Sources/Book.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

const emptyBook = new Book()
const frankenBook = new Book(
  'frankenstein',
  'Frankenstein',
  'Or, The Modern Prometheus',
  'A novel by Mary Shelly published in 1818',
  'Mary Shelley',
  '1818',
  'https://www.gutenberg.org/ebooks/84'
)

describe('Book()', () => {
  it('is a function.', () => {
    expect(typeof Book).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { Book() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Book())).to.equal(true)
    if (typeof Book().__proto__ === 'object') {
      expect(Object.isFrozen(Book().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('Book(): Parameters', function () {
  describe('1. key', () => {
    it('accepts a string as parameter one.', () => {
      expect(function () { new Book('') }).not.to.throw(Error)
    })
  })
  describe('2. title', () => {
    it('accepts a string as parameter two.', () => {
      expect(function () { new Book('', '') }).not.to.throw(Error)
    })
  })
  describe('3. subtitle', () => {
    it('accepts a string as parameter three.', () => {
      expect(function () { new Book('', '', '') }).not.to.throw(Error)
    })
  })
  describe('4. author', () => {
    it('accepts a string as parameter 4.', () => {
      expect(function () { new Book('', '', '', '') }).not.to.throw(Error)
    })
  })
  describe('5. date', () => {
    it('accepts a string as parameter 5.', () => {
      expect(function () { new Book('', '', '', '', '') }).not.to.throw(Error)
    })
    it('accepts an integer as 5.', () => {
      expect(function () { new Book('', '', '', '', 0) }).not.to.throw(Error)
    })
  })
  describe('6. url', () => {
    it('accepts a string as parameter 6.', () => {
      expect(function () { new Book('', '', '', '', '', '') }).not.to.throw(Error)
    })
  })
})
describe('Book: Instance Methods', function () {
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof emptyBook.getName).to.equal('function')
    })
    it('returns value of title property when no parameters are defined.', () => {
      expect(frankenBook.getName()).to.equal('Frankenstein')
    })
    it('returns title when parameter 1 is "short".', () => {
      const name = frankenBook.getName('long')
      expect(name).to.equal('Frankenstein Or, The Modern Prometheus')
    })
    it('concatenates title and subtitle when parameter 1 is "long".', () => {
      const name = frankenBook.getName('long')
      expect(name).to.equal('Frankenstein Or, The Modern Prometheus')
    })
    it('returns title when parameter 1 is unrecognized.', () => {
      const name = frankenBook.getName([])
      expect(name).to.equal('Frankenstein')
    })
  })
  describe('getDescription()', function () {
    it('is a function.', () => {
      expect(typeof Book().getDescription).to.equal('function')
    })
    it('returns empty when no description exists.', () => {
      expect(Book().getDescription()).to.equal('')
    })
    it('returns string when a valid description exists.', () => {
      expect(frankenBook.getDescription()).to.equal('A novel by Mary Shelly published in 1818')
    })
  })
  describe('getKey()', function () {
    it('is a function.', () => {
      expect(typeof Book().getKey).to.equal('function')
    })
    it('returns empty when no description exists.', () => {
      expect(Book().getKey()).to.equal('')
    })
    it('returns string when a valid description exists.', () => {
      expect(frankenBook.getKey()).to.equal('frankenstein')
    })
  })
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof Book().getName).to.equal('function')
    })
    it('returns value of title property when no parameters are defined.', () => {
      expect(frankenBook.getName()).to.equal('Frankenstein')
    })
    it('returns title when parameter 1 is "short".', () => {
      const name = frankenBook.getName('long')
      expect(name).to.equal('Frankenstein Or, The Modern Prometheus')
    })
    it('concatenates title and subtitle when parameter 1 is "long".', () => {
      const name = frankenBook.getName('long')
      expect(name).to.equal('Frankenstein Or, The Modern Prometheus')
    })
    it('returns title when parameter 1 is unrecognized.', () => {
      const name = frankenBook.getName([])
      expect(name).to.equal('Frankenstein')
    })
  })
  describe('getSubtitle()', function () {
    it('is a function.', () => {
      expect(typeof Book().getSubtitle).to.equal('function')
    })
    it('returns empty when no description exists.', () => {
      expect(Book().getSubtitle()).to.equal('')
    })
    it('returns string when a valid description exists.', () => {
      expect(frankenBook.getSubtitle()).to.equal('Or, The Modern Prometheus')
    })
  })
  describe('getTitle()', function () {
    it('is a function.', () => {
      expect(typeof Book().getTitle).to.equal('function')
    })
    it('returns empty when no description exists.', () => {
      expect(Book().getTitle()).to.equal('')
    })
    it('returns string when a valid description exists.', () => {
      expect(frankenBook.getTitle()).to.equal('Frankenstein')
    })
  })
  describe('getUrl()', function () {
    it('is a function.', () => {
      expect(typeof emptyBook.getUrl).to.equal('function')
    })
    it('returns the value of the "url" property.', () => {
      const url = frankenBook.getUrl()
      expect(url).to.equal('https://www.gutenberg.org/ebooks/84')
    })
  })
})

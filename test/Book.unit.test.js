import chai from 'chai'
import mocha from 'mocha'
import { Book } from '../Book.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

const emptyBook = new Book()
const frankenBook = new Book(
  'frankenstein',
  'Frankenstein',
  'Or, The Modern Prometheus',
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
describe('Book: Instance Properties', function () {
  describe('author', function () {
    it('defaults to an empty string.', () => {
      expect(emptyBook.author).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(frankenBook.author).to.equal('Mary Shelley')
    })
  })
  describe('date', function () {
    it('defaults to an empty string.', () => {
      expect(emptyBook.date).to.equal('')
    })
    it('inherits the value of the date parameter.', () => {
      expect(frankenBook.date).to.equal('1818')
    })
    it('converts integer dates to strings.', () => {
      expect((new Book('', '', '', '', 2020)).date).to.equal('2020')
    })
  })
  describe('key', function () {
    it('defaults to an empty string.', () => {
      expect(emptyBook.key).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(frankenBook.key).to.equal('frankenstein')
    })
  })
  describe('subtitle', function () {
    it('defaults to an empty string.', () => {
      expect(emptyBook.subtitle).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(frankenBook.subtitle).to.equal('Or, The Modern Prometheus')
    })
  })
  describe('title', function () {
    it('defaults to an empty string.', () => {
      expect(emptyBook.title).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(frankenBook.title).to.equal('Frankenstein')
    })
  })
  describe('url', function () {
    it('defaults to an empty string.', () => {
      expect(emptyBook.url).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(frankenBook.url).to.equal('https://www.gutenberg.org/ebooks/84')
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
  describe('getType()', function () {
    it('is a function.', () => {
      expect(typeof emptyBook.getType).to.equal('function')
    })
    it('always returns "Publication".', () => {
      expect(emptyBook.getType()).to.equal('Publication')
      expect(frankenBook.getType()).to.equal('Publication')
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
describe('Book.fromObject()', function () {
  it('is a function.', () => {
    expect(typeof Book.fromObject).to.equal('function')
  })
  it('constructs an empty book by default.', () => {
    const book = Book.fromObject()
    expect(book.key).to.equal('')
    expect(book.title).to.equal('')
    expect(book.subtitle).to.equal('')
    expect(book.author).to.equal('')
    expect(book.date).to.equal('')
    expect(book.url).to.equal('')
  })
  it('constructs an valid book from an object.', () => {
    const obj = {
      url: 'https://www.gutenberg.org/ebooks/84',
      title: 'Frankenstein',
      subtitle: 'Or, The Modern Prometheus',
      key: 'frankenstein',
      date: '1818',
      author: 'Mary Shelley',
    }
    const book = Book.fromObject(obj)
    expect(book.key).to.equal(obj.key)
    expect(book.title).to.equal(obj.title)
    expect(book.subtitle).to.equal(obj.subtitle)
    expect(book.author).to.equal(obj.author)
    expect(book.date).to.equal(obj.date)
    expect(book.url).to.equal(obj.url)
  })
})

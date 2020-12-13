import chai from 'chai'
import mocha from 'mocha'
import { Book } from '../src/References/Book.js'
import { testFactoryFunction } from './helpers/factories.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function Work() {}
Work.prototype.getAuthor = function () { return 'Mary Shelley'}
Work.prototype.getDate = function () { return '1818' }
Work.prototype.getDescription = function () { return 'A novel by Mary Shelly published in 1818' }
Work.prototype.getKey = function () { return 'frankenstein' }
Work.prototype.getName = function () { return 'Name' }
Work.prototype.getSubtitle = function () { return 'Or, The Modern Prometheus' }
Work.prototype.getTitle = function () { return 'Frankenstein' }
Work.prototype.getUrl = function () { return 'https://www.gutenberg.org/ebooks/84' }

const frankenBook = Book(
  new Work(),
  'Lackington, Hughes, Harding, Mavor, & Jones'
)

testFactoryFunction('Book', Book, Book())

describe('Book(): Parameters', function () {
  describe('1. id', () => {
    it('accepts an abstract work as parameter one.', () => {
      expect(function () { new Book(new Work()) }).not.to.throw(Error)
    })
  })
  describe('2. publisher', () => {
    it('accepts a string as parameter 2.', () => {
      expect(function () { new Book(new Work(), '') }).not.to.throw(Error)
    })
  })
})
describe('Book: Instance Methods', function () {
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
  describe('getPublisher()', function () {
    it('is a function.', () => {
      expect(typeof Book().getPublisher).to.equal('function')
    })
    it('returns empty when no publisher exists.', () => {
      expect(Book().getPublisher()).to.equal('')
    })
    it('returns string when a valid publisher exists.', () => {
      expect(frankenBook.getPublisher()).to.equal('Lackington, Hughes, Harding, Mavor, & Jones')
    })
  })
  describe('getSubtitle()', function () {
    it('is a function.', () => {
      expect(typeof Book().getSubtitle).to.equal('function')
    })
    it('returns empty when no subtitle exists.', () => {
      expect(Book().getSubtitle()).to.equal('')
    })
    it('returns string when a valid subtitle exists.', () => {
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
      expect(typeof Book().getUrl).to.equal('function')
    })
    it('returns empty when no url exists.', () => {
      expect(Book().getUrl()).to.equal('')
    })
    it('returns string when a valid url exists.', () => {
      const url = frankenBook.getUrl()
      expect(url).to.equal('https://www.gutenberg.org/ebooks/84')
    })
  })
})

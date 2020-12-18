import { Book } from '../../src/References/Book.js'
import { testFactoryFunction } from '../helpers/factories.js'

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
    test('accepts an abstract work as parameter one.', () => {
      expect(function () { new Book(new Work()) }).not.toThrow(Error)
    })
  })
  describe('2. publisher', () => {
    test('accepts a string as parameter 2.', () => {
      expect(function () { new Book(new Work(), '') }).not.toThrow(Error)
    })
  })
})
describe('Book: Instance Methods', function () {
  describe('getName()', function () {
    test('is a function.', () => {
      expect(typeof Book().getName).toBe('function')
    })
    test('returns value of title property when no parameters are defined.', () => {
      expect(frankenBook.getName()).toBe('Frankenstein')
    })
    test('returns title when parameter 1 is "short".', () => {
      const name = frankenBook.getName('long')
      expect(name).toBe('Frankenstein Or, The Modern Prometheus')
    })
    test('concatenates title and subtitle when parameter 1 is "long".', () => {
      const name = frankenBook.getName('long')
      expect(name).toBe('Frankenstein Or, The Modern Prometheus')
    })
    test('returns title when parameter 1 is unrecognized.', () => {
      const name = frankenBook.getName([])
      expect(name).toBe('Frankenstein')
    })
  })
  describe('getDescription()', function () {
    test('is a function.', () => {
      expect(typeof Book().getDescription).toBe('function')
    })
    test('returns empty when no description exists.', () => {
      expect(Book().getDescription()).toBe('')
    })
    test('returns string when a valid description exists.', () => {
      expect(frankenBook.getDescription()).toBe('A novel by Mary Shelly published in 1818')
    })
  })
  describe('getKey()', function () {
    test('is a function.', () => {
      expect(typeof Book().getKey).toBe('function')
    })
    test('returns empty when no description exists.', () => {
      expect(Book().getKey()).toBe('')
    })
    test('returns string when a valid description exists.', () => {
      expect(frankenBook.getKey()).toBe('frankenstein')
    })
  })
  describe('getName()', function () {
    test('is a function.', () => {
      expect(typeof Book().getName).toBe('function')
    })
    test('returns value of title property when no parameters are defined.', () => {
      expect(frankenBook.getName()).toBe('Frankenstein')
    })
    test('returns title when parameter 1 is "short".', () => {
      const name = frankenBook.getName('long')
      expect(name).toBe('Frankenstein Or, The Modern Prometheus')
    })
    test('concatenates title and subtitle when parameter 1 is "long".', () => {
      const name = frankenBook.getName('long')
      expect(name).toBe('Frankenstein Or, The Modern Prometheus')
    })
    test('returns title when parameter 1 is unrecognized.', () => {
      const name = frankenBook.getName([])
      expect(name).toBe('Frankenstein')
    })
  })
  describe('getPublisher()', function () {
    test('is a function.', () => {
      expect(typeof Book().getPublisher).toBe('function')
    })
    test('returns empty when no publisher exists.', () => {
      expect(Book().getPublisher()).toBe('')
    })
    test('returns string when a valid publisher exists.', () => {
      expect(frankenBook.getPublisher()).toBe('Lackington, Hughes, Harding, Mavor, & Jones')
    })
  })
  describe('getSubtitle()', function () {
    test('is a function.', () => {
      expect(typeof Book().getSubtitle).toBe('function')
    })
    test('returns empty when no subtitle exists.', () => {
      expect(Book().getSubtitle()).toBe('')
    })
    test('returns string when a valid subtitle exists.', () => {
      expect(frankenBook.getSubtitle()).toBe('Or, The Modern Prometheus')
    })
  })
  describe('getTitle()', function () {
    test('is a function.', () => {
      expect(typeof Book().getTitle).toBe('function')
    })
    test('returns empty when no description exists.', () => {
      expect(Book().getTitle()).toBe('')
    })
    test('returns string when a valid description exists.', () => {
      expect(frankenBook.getTitle()).toBe('Frankenstein')
    })
  })
  describe('getUrl()', function () {
    test('is a function.', () => {
      expect(typeof Book().getUrl).toBe('function')
    })
    test('returns empty when no url exists.', () => {
      expect(Book().getUrl()).toBe('')
    })
    test('returns string when a valid url exists.', () => {
      const url = frankenBook.getUrl()
      expect(url).toBe('https://www.gutenberg.org/ebooks/84')
    })
  })
})

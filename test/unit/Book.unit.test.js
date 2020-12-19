import { Book } from '../../src/Refs/Book.js'

const frankenProp = {
  title: 'Frankenstein',
  subtitle: 'Or, The Modern Prometheus',
  datePublished: '1818',
  author: 'Mary Shelley',
  desc: 'A novel by Mary Shelly published in 1818',
  url: 'https://www.gutenberg.org/ebooks/84'
}
Object.freeze(frankenProp)

describe('Book(): Unit Tests', () => {
  describe('General Errors', () => {
    test('throws when no props are given.', () => {
      expect(() => { Book() }).toThrow()
    })
    test('throws when title coerces to an empty string.', () => {
      expect(() => { Book({ title: '' }) }).toThrow()
      expect(() => { Book({ title: [] }) }).toThrow()
      expect(() => { Book({ title: {} }) }).toThrow()
      expect(() => { Book({ title: false }) }).toThrow()
    })
  })
  describe('Single', () => {
    test('constructs with only a non-empty title.', () => {
      expect(Book({ title: 'abc' })).toMatchObject({ title: 'abc' })
    })
    test('sets length property to one for single refs.', () => {
      const b = Book({ title: 'abc' })
      expect(b.length).toBe(1)
    })
    test('constructs with all recognized props.', () => {
      const r = Book(frankenProp)
      expect(r).toMatchObject({
        author: frankenProp.author,
        datePublished: frankenProp.datePublished,
        name: frankenProp.title,
        desc: frankenProp.desc,
        type: 'RefBook',
        url: frankenProp.url,
        length: 1
      })
    })
    test('ignores unrecognized properties.', () => {
      const r = Book({
        title: 'I am the name',
        unrecognized: 'potato chip',
        unknown: 'balloon',
        shark: 'hammerhead',
      })
      expect(r).toMatchObject({
        type: 'RefBook',
        title: 'I am the name',
        length: 1
      })
      expect(r).not.toHaveProperty('unrecognized')
      expect(r).not.toHaveProperty('unknown')
      expect(r).not.toHaveProperty('shark')
    })
    test('is idempotent.', () => {
      const a = Book(frankenProp)
      const b = Book(a)
      expect(a).toMatchObject(b)
    })
    test('stores first parameter as a null object when it is a Book.', () => {
      const a = Book(frankenProp)
      const b = Book(a)
      expect(a === b.refs[0]).toBe(false)
      expect(a).toMatchObject(b.refs[0])
      expect(Object.getPrototypeOf(b.refs[0])).toBe(null)
    })
  })
  describe('Compound', () => {
    test('constructs with one plain object and one book.', () => {
      const r = Book({title: 'abc'}, Book({title: 'def'}))
      expect(r).toMatchObject({
        type: 'RefBook',
        title: 'abc',
        url: '',
        length: 2
      })
    })
    test('throws when plain object is passed as param 2.', () => {
      expect(() => { Book(frankenProp, frankenProp) }).toThrow()
    })
  })
  describe('Extension', () => {
    test('no property can be modified.', () => {
      const r = Book(frankenProp)
      expect(() => { r.desc = '' }).toThrow()
      expect(() => { r.length = '' }).toThrow()
      expect(() => { r.name = '' }).toThrow()
      expect(() => { r.refs = '' }).toThrow()
      expect(() => { r.url = '' }).toThrow()
    })
    test('new properties cannot be added.', () => {
      const r = Book(frankenProp)
      expect(() => { r.newProp = '' }).toThrow()
    })
  })
})

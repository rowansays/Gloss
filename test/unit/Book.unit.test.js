import { $Book } from '../../src/Constructor/Book.js'

const frankenProp = {
  title: 'Frankenstein',
  subtitle: 'Or, The Modern Prometheus',
  datePublished: '1818',
  author: 'Mary Shelley',
  desc: 'A novel by Mary Shelly published in 1818',
  url: 'https://www.gutenberg.org/ebooks/84'
}
Object.freeze(frankenProp)

describe('$Book: Unit Tests', () => {
  test('throws when no props are given.', () => {
    expect(() => { new $Book() }).toThrow()
  })
  test('throws when title coerces to an empty string.', () => {
    expect(() => { new $Book({ title: '' }) }).toThrow()
    expect(() => { new $Book({ title: [] }) }).toThrow()
    expect(() => { new $Book({ title: {} }) }).toThrow()
    expect(() => { new $Book({ title: false }) }).toThrow()
  })
  test('constructs with only a non-empty title.', () => {
    expect(new $Book({ title: 'abc' })).toMatchObject({ title: 'abc' })
  })
  test('constructs with all recognized props.', () => {
    const r = new $Book(frankenProp)
    expect(r).toMatchObject({
      author: frankenProp.author,
      datePublished: frankenProp.datePublished,
      title: frankenProp.title,
      desc: frankenProp.desc,
      type: 'RefBook',
      url: frankenProp.url,
    })
  })
  test('ignores unrecognized properties.', () => {
    const r = new $Book({
      title: 'I am the name',
      unrecognized: 'potato chip',
      unknown: 'balloon',
      shark: 'hammerhead',
    })
    expect(r).toMatchObject({
      type: 'RefBook',
      title: 'I am the name',
    })
    expect(r).not.toHaveProperty('unrecognized')
    expect(r).not.toHaveProperty('unknown')
    expect(r).not.toHaveProperty('shark')
  })
  test('is idempotent.', () => {
    const a = new $Book(frankenProp)
    const b = new $Book(a)
    expect(a).toMatchObject(b)
  })
})

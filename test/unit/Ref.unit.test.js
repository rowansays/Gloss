import { Ref } from '../../src/Refs/Ref.js'

const exampleParam = {
  name: 'Example',
  desc: 'This is just an example.',
  url: 'https://example.com'
}
Object.freeze(exampleParam)

describe('Ref(): Unit Tests', () => {
  describe('General Errors', () => {
    test('throws when no props are given.', () => {
      expect(() => { const r = Ref() }).toThrow()
    })
    test('throws when name coerces to an empty string.', () => {
      expect(() => { const r = Ref({ name: '' }) }).toThrow()
      expect(() => { const r = Ref({ name: [] }) }).toThrow()
      expect(() => { const r = Ref({ name: {} }) }).toThrow()
      expect(() => { const r = Ref({ name: false }) }).toThrow()
    })
  })
  describe('Extension', () => {
    test('no property can be modified.', () => {
      const r = Ref(exampleParam)
      expect(() => { r.desc = '' }).toThrow()
      expect(() => { r.length = '' }).toThrow()
      expect(() => { r.name = '' }).toThrow()
      expect(() => { r.refs = '' }).toThrow()
      expect(() => { r.url = '' }).toThrow()
    })
    test('new properties cannot be added.', () => {
      const r = Ref(exampleParam)
      expect(() => { r.newProp = '' }).toThrow()
    })
  })
  describe('Single', () => {
    test('constructs with only a non-empty name.', () => {
      expect(Ref({ name: 'abc' })).toMatchObject({
        type: 'Ref',
        name: 'abc',
        url: '',
        length: 1
      })
    })
    test('constructs with all recognized props.', () => {
      const r = Ref({
        name: 'I am the name',
        desc: 'I am the description',
        url: 'https://iamtheurl.org'
      })
      expect(r).toMatchObject({
        type: 'Ref',
        name: 'I am the name',
        desc: 'I am the description',
        url: 'https://iamtheurl.org',
        length: 1
      })
    })
    test('ignores unrecognized properties.', () => {
      const r = Ref({
        name: 'I am the name',
        unrecognized: 'potato chip',
        unknown: 'balloon',
        shark: 'hammerhead',
      })
      expect(r).toMatchObject({
        type: 'Ref',
        name: 'I am the name',
        length: 1
      })
      expect(r).not.toHaveProperty('unrecognized')
      expect(r).not.toHaveProperty('unknown')
      expect(r).not.toHaveProperty('shark')
    })
    test('is idempotent.', () => {
      const a = Ref(exampleParam)
      const b = Ref(a)
      expect(a).toMatchObject(b)
    })
    test('stores first parameter as a null object when it is a Ref.', () => {
      const a = Ref(exampleParam)
      const b = Ref(a)
      expect(a === b.refs[0]).toBe(false)
      expect(a).toMatchObject(b.refs[0])
      expect(Object.getPrototypeOf(b.refs[0])).toBe(null)
    })
  })
  describe('Compound', () => {
    test('constructs with one object and one ref.', () => {
      const r = Ref({name: 'abc'}, Ref({name: 'def'}))
      expect(r).toMatchObject({
        type: 'Ref',
        name: 'abc',
        url: '',
        length: 2
      })
    })
    test('throws when plain object is passed as param 2.', () => {
      expect(() => { Ref(example, example) }).toThrow()
    })
  })
})

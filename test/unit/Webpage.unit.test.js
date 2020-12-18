import { Webpage } from '../../src/References/Webpage.js'
import { MockWork } from '../mocks/MockWork.js'
import { testFactoryFunction } from '../helpers/factories.js'

const wikiWork = new MockWork({
  author: 'The contributors',
  date: 'n.d.',
  description: 'Everthing that the authors of Wikipedia have to say about unit testing.',
  key: 'wikipedia:unitTesting',
  subtitle: 'From Wikipedia, the free encyclopedia',
  title: 'Unit Testing',
  url: 'https://en.wikipedia.org/wiki/Unit_testing',
})

const wikiPage = Webpage(
  wikiWork,
  'https://wikipedia.org'
)

testFactoryFunction('Webpage', Webpage, Webpage())

describe('Webpage(): Parameters', function () {
  describe('1. id', () => {
    test('accepts a work instance as parameter 1.', () => {
      expect(function () { Webpage(wikiWork) }).not.toThrow(Error)
    })
  })
  describe('2. publisher', () => {
    test('accepts a string as parameter 2.', () => {
      expect(function () { Webpage(wikiWork, '') }).not.toThrow(Error)
    })
  })
})
describe('Webpage: Instance Methods', function () {
  describe('getAuthor()', function () {
    test('is a function.', () => {
      expect(typeof Webpage().getAuthor).toBe('function')
    })
    test('returns empty when no description exists.', () => {
      expect(Webpage().getAuthor()).toBe('')
    })
    test('inherits author from the Work parameter.', () => {
      expect(wikiPage.getAuthor()).toBe('The contributors')
    })
  })
  describe('getDescription()', function () {
    test('is a function.', () => {
      expect(typeof Webpage().getDescription).toBe('function')
    })
    test('returns empty when no description exists.', () => {
      expect(Webpage().getDescription()).toBe('')
    })
    test('returns string when a valid description exists.', () => {
      expect(wikiPage.getDescription()).toBe('Everthing that the authors of Wikipedia have to say about unit testing.')
    })
  })
  describe('getKey()', function () {
    test('is a function.', () => {
      expect(typeof Webpage().getKey).toBe('function')
    })
    test('returns empty when no description exists.', () => {
      expect(Webpage().getKey()).toBe('')
    })
    test('returns string when a valid description exists.', () => {
      expect(wikiPage.getKey()).toBe('wikipedia:unitTesting')
    })
  })
  describe('getName()', function () {
    test('is a function.', () => {
      expect(typeof Webpage().getName).toBe('function')
    })
    test('inherits title from work parameter when no parameters are defined.', () => {
      expect(wikiPage.getName()).toBe('Unit Testing')
    })
    test('returns title from work parameter when parameter 1 is "short".', () => {
      const name = wikiPage.getName('short')
      expect(name).toBe('Unit Testing')
    })
    test('concatenates title and subtitle when parameter 1 is "long".', () => {
      const name = wikiPage.getName('long')
      expect(name).toBe('Unit Testing From Wikipedia, the free encyclopedia')
    })
    test('returns title when parameter 1 is unrecognized.', () => {
      const name = wikiPage.getName([])
      expect(name).toBe('Unit Testing')
    })
  })
  describe('getHomeUrl()', function () {
    test('is a function.', () => {
      expect(typeof Webpage().getHomeUrl).toBe('function')
    })
    test('returns empty when no publisher exists.', () => {
      expect(Webpage().getHomeUrl()).toBe('')
    })
    test('returns string when a valid publisher exists.', () => {
      expect(wikiPage.getHomeUrl()).toBe('https://wikipedia.org')
    })
  })
  describe('getSubtitle()', function () {
    test('is a function.', () => {
      expect(typeof Webpage().getSubtitle).toBe('function')
    })
    test('returns empty when no subtitle exists.', () => {
      expect(Webpage().getSubtitle()).toBe('')
    })
    test('returns string when a valid subtitle exists.', () => {
      expect(wikiPage.getSubtitle()).toBe('From Wikipedia, the free encyclopedia')
    })
  })
  describe('getTitle()', function () {
    test('is a function.', () => {
      expect(typeof Webpage().getTitle).toBe('function')
    })
    test('returns empty when no description exists.', () => {
      expect(Webpage().getTitle()).toBe('')
    })
    test('returns string when a valid description exists.', () => {
      expect(wikiPage.getTitle()).toBe('Unit Testing')
    })
  })
  describe('getUrl()', function () {
    test('is a function.', () => {
      expect(typeof Webpage().getUrl).toBe('function')
    })
    test('returns empty when no url exists.', () => {
      expect(Webpage().getUrl()).toBe('')
    })
    test('returns string when a valid url exists.', () => {
      const url = wikiPage.getUrl()
      expect(url).toBe('https://en.wikipedia.org/wiki/Unit_testing')
    })
  })
})

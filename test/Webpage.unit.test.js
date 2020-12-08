import chai from 'chai'
import mocha from 'mocha'
import { Webpage } from '../src/References/Webpage.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function Work() {}
Work.prototype.getAuthor = function () { return 'The contributors'}
Work.prototype.getDate = function () { return 'n.d.' }
Work.prototype.getDescription = function () { return 'Everthing that the authors of Wikipedia have to say about unit testing.' }
Work.prototype.getKey = function () { return 'wikipedia:unitTesting' }
Work.prototype.getSubtitle = function () { return 'From Wikipedia, the free encyclopedia' }
Work.prototype.getTitle = function () { return 'Unit Testing' }
Work.prototype.getUrl = function () { return 'https://en.wikipedia.org/wiki/Unit_testing' }

const wikiPage = new Webpage(
  new Work(),
  'https://wikipedia.org'
)

describe('Webpage()', () => {
  it('is a function.', () => {
    expect(typeof Webpage).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { Webpage() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Webpage())).to.equal(true)
    if (typeof Webpage().__proto__ === 'object') {
      expect(Object.isFrozen(Webpage().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('Webpage(): Parameters', function () {
  describe('1. id', () => {
    it('accepts a work instance as parameter 1.', () => {
      expect(function () { new Webpage(new Work()) }).not.to.throw(Error)
    })
  })
  describe('2. publisher', () => {
    it('accepts a string as parameter 2.', () => {
      expect(function () { new Webpage(new Work(), '') }).not.to.throw(Error)
    })
  })
})
describe('Webpage: Instance Methods', function () {
  describe('getAuthor()', function () {
    it('is a function.', () => {
      expect(typeof Webpage().getAuthor).to.equal('function')
    })
    it('returns empty when no description exists.', () => {
      expect(Webpage().getAuthor()).to.equal('')
    })
    it('inherits author from the Work parameter.', () => {
      expect(wikiPage.getAuthor()).to.equal('The contributors')
    })
  })
  describe('getDescription()', function () {
    it('is a function.', () => {
      expect(typeof Webpage().getDescription).to.equal('function')
    })
    it('returns empty when no description exists.', () => {
      expect(Webpage().getDescription()).to.equal('')
    })
    it('returns string when a valid description exists.', () => {
      expect(wikiPage.getDescription()).to.equal('Everthing that the authors of Wikipedia have to say about unit testing.')
    })
  })
  describe('getKey()', function () {
    it('is a function.', () => {
      expect(typeof Webpage().getKey).to.equal('function')
    })
    it('returns empty when no description exists.', () => {
      expect(Webpage().getKey()).to.equal('')
    })
    it('returns string when a valid description exists.', () => {
      expect(wikiPage.getKey()).to.equal('wikipedia:unitTesting')
    })
  })
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof Webpage().getName).to.equal('function')
    })
    it('inherits title from work parameter when no parameters are defined.', () => {
      expect(wikiPage.getName()).to.equal('Unit Testing')
    })
    it('returns title from work parameter when parameter 1 is "short".', () => {
      const name = wikiPage.getName('short')
      expect(name).to.equal('Unit Testing')
    })
    it('concatenates title and subtitle when parameter 1 is "long".', () => {
      const name = wikiPage.getName('long')
      expect(name).to.equal('Unit Testing From Wikipedia, the free encyclopedia')
    })
    it('returns title when parameter 1 is unrecognized.', () => {
      const name = wikiPage.getName([])
      expect(name).to.equal('Unit Testing')
    })
  })
  describe('getHomeUrl()', function () {
    it('is a function.', () => {
      expect(typeof Webpage().getHomeUrl).to.equal('function')
    })
    it('returns empty when no publisher exists.', () => {
      expect(Webpage().getHomeUrl()).to.equal('')
    })
    it('returns string when a valid publisher exists.', () => {
      expect(wikiPage.getHomeUrl()).to.equal('https://wikipedia.org')
    })
  })
  describe('getSubtitle()', function () {
    it('is a function.', () => {
      expect(typeof Webpage().getSubtitle).to.equal('function')
    })
    it('returns empty when no subtitle exists.', () => {
      expect(Webpage().getSubtitle()).to.equal('')
    })
    it('returns string when a valid subtitle exists.', () => {
      expect(wikiPage.getSubtitle()).to.equal('From Wikipedia, the free encyclopedia')
    })
  })
  describe('getTitle()', function () {
    it('is a function.', () => {
      expect(typeof Webpage().getTitle).to.equal('function')
    })
    it('returns empty when no description exists.', () => {
      expect(Webpage().getTitle()).to.equal('')
    })
    it('returns string when a valid description exists.', () => {
      expect(wikiPage.getTitle()).to.equal('Unit Testing')
    })
  })
  describe('getUrl()', function () {
    it('is a function.', () => {
      expect(typeof Webpage().getUrl).to.equal('function')
    })
    it('returns empty when no url exists.', () => {
      expect(Webpage().getUrl()).to.equal('')
    })
    it('returns string when a valid url exists.', () => {
      const url = wikiPage.getUrl()
      expect(url).to.equal('https://en.wikipedia.org/wiki/Unit_testing')
    })
  })
})

import chai from 'chai'
import mocha from 'mocha'
import { Webpage } from '../src/Sources/Webpage.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

const emptyWebpage = new Webpage()
const wikipediaWebpage = new Webpage(
  'wikipedia:unitTesting',
  'Unit Testing',
  'The contributors',
  'https://en.wikipedia.org/wiki/Unit_testing'
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
  describe('1. key', () => {
    it('accepts a string as parameter one.', () => {
      expect(function () { new Webpage('') }).not.to.throw(Error)
    })
  })
  describe('2. title', () => {
    it('accepts a string as parameter two.', () => {
      expect(function () { new Webpage('', '') }).not.to.throw(Error)
    })
  })
  describe('3. author', () => {
    it('accepts a string as parameter 3.', () => {
      expect(function () { new Webpage('', '', '') }).not.to.throw(Error)
    })
  })
  describe('4. url', () => {
    it('accepts a string as parameter 4.', () => {
      expect(function () { new Webpage('', '', '', '') }).not.to.throw(Error)
    })
  })
})
describe('Webpage: Instance Properties', function () {
  describe('author', function () {
    it('defaults to an empty string.', () => {
      expect(emptyWebpage.author).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(wikipediaWebpage.author).to.equal('The contributors')
    })
  })
  describe('key', function () {
    it('defaults to an empty string.', () => {
      expect(emptyWebpage.key).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(wikipediaWebpage.key).to.equal('wikipedia:unitTesting')
    })
  })
  describe('title', function () {
    it('defaults to an empty string.', () => {
      expect(emptyWebpage.title).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(wikipediaWebpage.title).to.equal('Unit Testing')
    })
  })
  describe('url', function () {
    it('defaults to an empty string.', () => {
      expect(emptyWebpage.url).to.equal('')
    })
    it('inherits the value of parameter two.', () => {
      expect(wikipediaWebpage.url).to.equal('https://en.wikipedia.org/wiki/Unit_testing')
    })
  })
})
describe('Webpage: Instance Methods', function () {
  describe('getName()', function () {
    it('is a function.', () => {
      expect(typeof emptyWebpage.getName).to.equal('function')
    })
    it('returns value of title property.', () => {
      expect(wikipediaWebpage.getName()).to.equal('Unit Testing')
    })
  })
  describe('getUrl()', function () {
    it('is a function.', () => {
      expect(typeof emptyWebpage.getUrl).to.equal('function')
    })
    it('returns the value of the "url" property.', () => {
      const url = wikipediaWebpage.getUrl()
      expect(url).to.equal('https://en.wikipedia.org/wiki/Unit_testing')
    })
  })
})

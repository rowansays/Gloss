import chai from 'chai'
import mocha from 'mocha'
import { Term } from '../src/Glosses/Term.js'
import { testFactoryFunction } from './helpers/factories.js'
import { MockQuote } from './mocks/MockQuote.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

function NamedObject () {}
NamedObject.prototype.getName = function () {return 'This is my name'}

function UnnamedObject () {}
UnnamedObject.prototype.getName = function () {return ''}

function Quote (source, name) {
  this.name = name
  this.source = source
}
Quote.prototype.getFull = function () { return this.name }
Quote.prototype.getName = function () { return this.name }
Quote.prototype.getSource = function () { return this.source }

describe('Term() Unit Tests', () => {
  testFactoryFunction('Term', Term, Term('a'))
  describe('Term(): Function Signatures', function () {
    describe('(name)', () => {
      it('accepts a non-empty string as parameter one.', () => {
        expect(function () { Term('a') }).not.to.throw(Error)
      })
      it('accepts a number as parameter one.', () => {
        expect(function () { Term(123) }).not.to.throw(Error)
      })
      it('accepts a named object as parameter one.', () => {
        expect(function () { Term(new NamedObject()) }).not.to.throw(Error)
      })
      it('rejects empty strings as parameter one by throwing a TypeError.', () => {
        expect(function () { Term('') }).to.throw(TypeError)
      })
      it('rejects unnamed objects as parameter one by throwing a TypeError.', () => {
        expect(function () { Term(new UnnamedObject()) }).to.throw(TypeError)
      })
    })
    describe('(name, memo)', () => {
      it('accepts an empty string as parameter two.', () => {
        expect(function () { Term('a', '') }).not.to.throw(Error)
      })
      it('accepts a non-empty string as parameter two.', () => {
        expect(function () { Term('a', 'Betelgeuse') }).not.to.throw(Error)
      })
      it('accepts an integer as parameter two.', () => {
        expect(function () { Term('a', 123) }).not.to.throw(Error)
      })
      it('accepts a named object as parameter two.', () => {
        expect(function () { Term(new NamedObject()) }).not.to.throw(Error)
      })
      it('rejects an unnamed objects as parameter two by throwing a TypeError.', () => {
        expect(function () { Term(new UnnamedObject()) }).to.throw(TypeError)
      })
    })
    describe('(name, memo, def)', () => {
      it('accepts a non-empty string as parameter three.', () => {
        expect(function () { Term('a', '', 'BANANA') }).not.to.throw(Error)
      })
      it('accepts a non-empty string as parameter three.', () => {
        expect(function () { Term('a', '', 'BANANA') }).not.to.throw(Error)
      })
    })
  })
  describe('Term: Instance Methods', function () {
    describe('getMemo()', function () {
      it('is a function.', () => {
        expect(typeof Term('a').getMemo).to.equal('function')
      })
      it('returns undefined when no memo exists.', () => {
        expect(Term('a').getMemo()).to.equal(undefined)
      })
      it('returns the only memo when one memo exists.', () => {
        const memo = new MockQuote('The book not the show.')
        expect(Term('American Gods', memo).getMemo()).to.equal(memo)
      })
    })
    describe('getName()', function () {
      it('is a function.', () => {
        expect(typeof Term('a').getName).to.equal('function')
      })
      it('returns value of name.', () => {
        expect(Term('Poetic Edda').getName()).to.equal('Poetic Edda')
      })
    })
    describe('getDef()', function () {
      const d1 = new MockQuote('Klingon')
      const d2 = new MockQuote('Vulcan')
      const d3 = new MockQuote('Andorian')
      const term = Term('a', '', d1, d2, d3)
      it('is a function.', () => {
        expect(typeof Term('a').getDef).to.equal('function')
      })
      it('returns value of first def parameter.', () => {
        expect(term.getDef(0)).to.equal(d1)
      })
      it('returns value of second def parameter.', () => {
        expect(term.getDef(1)).to.equal(d2)
      })
      it('returns value of third def parameter.', () => {
        expect(term.getDef(2)).to.equal(d3)
      })
    })
    describe('withDef()', function () {
      it('is a function.', () => {
        expect(typeof Term('a').withDef).to.equal('function')
      })
      it('returns an instance of $Term.', () => {
        expect(Term('a').withDef().constructor.name).to.equal('$Term')
      })
      it('adds a single definition to an empty term.', () => {
        expect(Term('a').withDef(new MockQuote('Klingon')).length).to.equal(1)
      })
      it('adds three unique definitions to an empty term.', () => {
        const term = Term('a').withDef(
          new MockQuote('Klingon'),
          new MockQuote('Vulcan'),
          new MockQuote('Andorian')
        )
        expect(term.length).to.equal(3)
      })
      it('merges three identical definitions to an empty term.', () => {
        const term = Term('a').withDef(
          new MockQuote('Klingon'),
          new MockQuote('Klingon'),
          new MockQuote('Klingon')
        )
        expect(term.length).to.equal(1)
      })
    })
    describe('withMemo()', function () {
      it('Allows a string memo to be appended.', () => {
        const memo1 = new MockQuote('They are dangerous.')
        const memo2 = new MockQuote('They are mageistic.')
        const term = Term('a', memo1).withMemo(memo2)
        expect(term.getMemo(0)).to.equal(memo1)
        expect(term.getMemo(1)).to.equal(memo2)
      })
    })
    describe('withGloss()', function () {
      it('Allows a single gloss to be merged.', () => {
        const term1 = Term(
          'Klingon',
          new MockQuote('They are dangerous.'),
          new MockQuote('aliens'),
          new MockQuote('warlike')
        )
        const term2 = Term(
          'Klingon(TNG)',
          new MockQuote('They are mageistic.'),
          new MockQuote('honorable'),
          new MockQuote('spiritual')
        )
        const term3 = term1.withGloss(term2)
        expect(term3.getName()).to.equal('Klingon')
        expect(term3.getMemo(0).getName()).to.equal('They are dangerous.')
        expect(term3.getMemo(1).getName()).to.equal('They are mageistic.')
        expect(term3.getDef(0).getName()).to.equal('aliens')
        expect(term3.getDef(1).getName()).to.equal('warlike')
        expect(term3.getDef(2).getName()).to.equal('honorable')
        expect(term3.getDef(3).getName()).to.equal('spiritual')
      })
    })
  })
})

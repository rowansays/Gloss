import { isGloss } from '../../src/Utility/predicate.js'
import { testObjectPredicate } from '../helpers/factories.js'

testObjectPredicate('isGloss', isGloss, () => {
  test('returns true for objects that behave like glosses.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).toBe(true)
  })
  test('returns false for objects that lack a getMemo() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).toBe(false)
  })
  test('returns false for objects that lack a getName() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).toBe(false)
  })
  test('returns false for objects that lack a withDef() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).toBe(false)
  })
  test('returns false for objects that lack a withMemo() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withGloss = function () {return new Gloss()}
    expect(isGloss(new Gloss())).toBe(false)
  })
  test('returns false for objects that lack a withGloss() method.', () => {
    function Gloss () { this.length = 0; }
    Gloss.prototype.getMemo = function () {return ''}
    Gloss.prototype.getName = function () {return ''}
    Gloss.prototype.withDef = function () {return new Gloss()}
    Gloss.prototype.withMemo = function () {return new Gloss()}
    expect(isGloss(new Gloss())).toBe(false)
  })
})

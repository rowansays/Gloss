import chai from 'chai'
import mocha from 'mocha'
import { castString } from '../src/Utility/castString.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('castString()', () => {
  it('is a function.', () => {
    expect(typeof castString).to.equal('function')
  })
  it('returns an empty string when no parameters are passed.', () => {
    expect(castString()).to.equal('')
  })
  it('returns an empty string for many objects.', () => {
    expect(castString(null)).to.equal('')
    expect(castString({})).to.equal('')
    expect(castString([])).to.equal('')
  })
  it('trims spaces from boths sides of a string.', () => {
    expect(castString(' A ',)).to.equal('A')
  })
  it('considers a space to be empty.', () => {
    expect(castString(' ')).to.equal('')
    expect(castString('  ')).to.equal('')
    expect(castString('   ')).to.equal('')
  })
  it('considers a tabs to be empty.', () => {
    expect(castString(' ')).to.equal('')
    expect(castString('    ')).to.equal('')
    expect(castString('      ')).to.equal('')
  })
  it('coerces numbers to strings.', () => {
    expect(castString(123)).to.equal('123')
  })
  it('extracts the "name" value from objects with a getName() method.', () => {
    function NamedObject (name) { this.name = name }
    NamedObject.prototype.getName = function () { return this.name }
    expect(castString(new NamedObject('Kublai Khan'))).to.equal('Kublai Khan')
  })
  it('perserves valid string values.', () => {
    expect(castString('Juniper')).to.equal('Juniper')
  })
})

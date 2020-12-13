import chai from 'chai'
import mocha from 'mocha'

var expect = chai.expect
var it = mocha.it

const name = m => `has a ${m}() method.`
function test(method, instance) {
  it(name(method), () => { expect(typeof instance[method]).to.equal('function') })
}

export function testAbstractObjectListPrototype(instance) {
  test('forEach', instance)
  test('getItem', instance)
  test('getItems', instance)
  test('getSize', instance)
  test('sortAscBy', instance)
  test('sortDescBy', instance)
}

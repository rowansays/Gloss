import chai from 'chai'
import mocha from 'mocha'
import { Glossary } from '../src/Glossaries/Glossary.js'
import { testFactoryFunction } from './helpers/factories.js'
import { test } from './helpers/prototypes.js'
import { frankenObject } from './data/ids.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Glossary() Unit Tests', function () {
  const instance = Glossary({
    id: frankenObject,
    ref: 'abc',
    glosses: []
  })
  testFactoryFunction('Glossary', Glossary, instance)
  describe('Prototype', function () {
    test('forEach', instance)
    test('getGloss', instance)
    test('getRef', instance)
  })
})

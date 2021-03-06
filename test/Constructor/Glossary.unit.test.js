import { $Glossary } from '../../src/Constructor/Glossary.js'
import { testFactoryFunction } from '../helpers/factories.js'
import { testProtoFunc } from '../helpers/prototypes.js'
import { frankenObject } from '../data/ids.js'

describe('$Glossary Unit Tests', function () {
  const instance = new $Glossary({
    name: 'Test Glossary',
    ref: 'abc',
    glosses: []
  })
  testFactoryFunction('$Glossary', $Glossary, instance)
  describe('Prototype', function () {
    testProtoFunc('forEach', instance)
    testProtoFunc('getGloss', instance)
    testProtoFunc('getRef', instance)
  })
})

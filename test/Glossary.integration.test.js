import chai from 'chai'
import mocha from 'mocha'
import { Glossary } from '../src/Glossaries/Glossary.js'
import { Term } from '../src/Glosses/Term.js'
import { Phrase } from '../src/Quotes/Quote.js'
import { frankenstein } from './data/ids.js'

var describe = mocha.describe
var expect = chai.expect
var it = mocha.it

describe('Glossary() Integration Tests', function () {
  describe('Constructor Signature', function () {
    it('assigns reference to all gloss definitions.', () => {
      const ref = 'glitter'
      const g = Glossary({
        id: frankenstein,
        ref: ref,
        glosses: [
          Term('Characters',
            '',
            Phrase('Clerval'),
            Phrase('Elizabeth'),
            Phrase('Justine')
          ),
          Term('Places',
            '',
            Phrase('Geneva'),
            Phrase('Naples'),
            Phrase('St. Petersburg')
          )
        ]
      })

      const characters = g.getGloss('Characters')
      expect(characters.getDef('Clerval').hasRef(ref)).to.be.true
      expect(characters.getDef('Elizabeth').hasRef(ref)).to.be.true
      expect(characters.getDef('Justine').hasRef(ref)).to.be.true

      const places = g.getGloss('Places')
      expect(places.getDef('Geneva').hasRef(ref)).to.be.true
      expect(places.getDef('Naples').hasRef(ref)).to.be.true
      expect(places.getDef('St. Petersburg').hasRef(ref)).to.be.true
    })
  })
})

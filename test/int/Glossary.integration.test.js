import { Glossary } from '../../src/Glossaries/Glossary.js'
import { Term } from '../../src/Glosses/Term.js'
import { Phrase } from '../../src/Quotes/Quote.js'
import { frankenBook, nobodysWork } from '../data/refs.js'

describe('Glossary() Integration Tests', function () {
  describe('Constructor Signature', function () {
    test('assigns reference to all gloss definitions.', () => {
      const ref = frankenBook
      const g = Glossary({
        id: nobodysWork,
        ref: frankenBook,
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
      expect(characters.getDef('Clerval').hasRef(ref)).toBe(true)
      expect(characters.getDef('Elizabeth').hasRef(ref)).toBe(true)
      expect(characters.getDef('Justine').hasRef(ref)).toBe(true)

      const places = g.getGloss('Places')
      expect(places.getDef('Geneva').hasRef(ref)).toBe(true)
      expect(places.getDef('Naples').hasRef(ref)).toBe(true)
      expect(places.getDef('St. Petersburg').hasRef(ref)).toBe(true)
    })
  })
})

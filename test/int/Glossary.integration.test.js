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
      expect(characters.def('Clerval').quote(0).ref).toBe(ref)
      expect(characters.def('Elizabeth').quote(0).ref).toBe(ref)
      expect(characters.def('Justine').quote(0).ref).toBe(ref)

      const places = g.getGloss('Places')
      expect(places.def('Geneva').quote(0).ref).toBe(ref)
      expect(places.def('Naples').quote(0).ref).toBe(ref)
      expect(places.def('St. Petersburg').quote(0).ref).toBe(ref)
    })
  })
})

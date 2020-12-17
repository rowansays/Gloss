import { Card } from '../../src/Card.js'
import { Book } from '../../src/References/Book.js'
import { aliceObject, devilsObject, frankenObject, prideObject } from './ids.js'

export const nobodysWork = Card({
  title: 'Nobody\'s Work',
  subtitle: 'Nothing to see here.',
  key: 'nobodysWork',
  author: 'Nobody',
  date: '2020-12-16',
  description: 'Nobody knows what this is.',
  url: 'https://example.com'
})

export const aliceBook = Book(aliceObject)
export const devilsBook = Book(devilsObject)
export const frankenBook = Book(frankenObject)
export const prideBook = Book(prideObject)

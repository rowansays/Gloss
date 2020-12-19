import { Book } from '../../src/Refs/Book.js'
import {
  aliceObject,
  devilsObject,
  frankenObject,
  prideObject
} from './ids.js'

export const nobodysWork = Book({
  title: 'Nobody\'s Work',
  subtitle: 'Nothing to see here.',
  author: 'Nobody',
  datePublished: '2020',
  description: 'Nobody knows what this is.',
  url: 'https://example.com'
})

export const aliceBook = Book(aliceObject)
export const devilsBook = Book(devilsObject)
export const frankenBook = Book(frankenObject)
export const prideBook = Book(prideObject)

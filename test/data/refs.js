import { $Book } from '../../src/Constructor/Book.js'
import {
  aliceObject,
  devilsObject,
  frankenObject,
  prideObject
} from './ids.js'

export const nobodysWork = new $Book({
  title: 'Nobody\'s Work',
  subtitle: 'Nothing to see here.',
  author: 'Nobody',
  datePublished: '2020',
  description: 'Nobody knows what this is.',
  url: 'https://example.com'
})

export const aliceBook = new $Book(aliceObject)
export const devilsBook = new $Book(devilsObject)
export const frankenBook = new $Book(frankenObject)
export const prideBook = new $Book(prideObject)

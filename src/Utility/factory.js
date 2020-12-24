import { $Book } from '../Constructor/Book.js'
import { $Def } from '../Constructor/Def.js'
import { $DefList } from '../Constructor/Deflist.js'
import { $Glossary } from '../Constructor/Glossary.js'
import { $GlossList } from '../Constructor/GlossList.js'
import { $HybridGlossary } from '../Constructor/HybridGlossary.js'
import { $Page } from '../Constructor/Page.js'
import { $Quote } from '../Constructor/Quote.js'
import { $QuoteList } from '../Constructor/QuoteList.js'

import { validateStringProp } from './validate.js'

export function Book () {
  return new $Book(...arguments)
}

export function Def () {
  return new $Def(...arguments)
}

export function DefList () {
  return new $DefList(...arguments)
}

export function Glossary () {
  return new $Glossary(...arguments)
}

export function GlossList () {
  return new $GlossList(...arguments)
}

export function HybridGlossary () {
  return new $HybridGlossary(...arguments)
}

/**
 * Normalized phrase factory.
 *
 * A normalized phrase is one that has been paraphrased to a simpler form
 * consistent with quotations from other sources.
 *
 * For example...
 *
 * Imagine that the term "Book" appears in Reference #1 and we want to quote it
 * We can use the Phrase function:
 *
 * ```
 * const book = Prase('Book', 'reference1')
 * ```
 *
 * Now imagine that the idea of a book is contained in Reference #2 however,
 * the word "Tome" is used. To allow the term "Tome" to be understood as a
 * "Book" we can normalize it using Normal().
 *
 * ```
 * const tome = Normal('Book', 'Tome', 'reference2')
 * ```
 *
 * Doing so will allow these 2 quotes to be understood as the same idea and
 * merged together by other processes - namely those in `QuoteList()`.
 *
 * @param {string} normal Required. The normalized form of the quote.
 * @param {string} cite Required. The quote as it appears in the reference.
 * @param {string} [ref] The key of the reference in which this quote was taken.
 *
 * @return {$Quote} A compound quote.
 * @thorws {TypeError} When name coerces to an empty string
 */
export function Normal (normal, cite, ref) {
  return new $Quote({
    name: validateStringProp('Normal', 'normal', normal),
    cite: validateStringProp('Normal', 'verbatim', cite),
    ref: ref
  })
}

export function Page () {
  return new $Page(...arguments)
}

/**
 * Phrase factory.
 *
 * Create a quote from a single reference.
 *
 * @param {string} verbatim Required. The quote as it appears in the reference.
 * @param {string} [ref] The key of the reference in which this quote was taken.
 *
 * @return {$Quote} A singular quote.
 * @thorws {TypeError} When name coerces to an empty string
 */
export function Phrase (verbatim, ref) {
  return new $Quote({
    name: validateStringProp('Phrase', 'verbatim', verbatim),
    ref: ref
  })
}

/**
 * Quote factory.
 *
 * This function shares a signature with &Quote()
 *
 * @param {...$Quote|...Object} quotes Zero or more objects that represent a
 *   quote.
 *
 * @return {$Quote} A new quote.
 * @thorws {TypeError} When an invalid name or reference is present in
 *   arguments.
 */
export function Quote () {
  return new $Quote(...arguments)
}

export function QuoteList () {
  return new $QuoteList(...arguments)
}

export function Ref () {
  return new $Ref(...arguments)
}

export function RefList () {
  return new $RefList(...arguments)
}

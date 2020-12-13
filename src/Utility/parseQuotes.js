import { castString } from './castString.js'
import { isList } from './isList.js'
import { isQuote } from './isQuote.js'
import { Phrase } from '../Quotes/Phrase.js'

/**
 * Parse quotes parameter.
 *
 * Robust function which accepts just about any value that can be converted to
 * a quote.
 *
 * @param {Array|Quote|QuoteList|string} param
 * @return {Quote[]} A flat array of quotes.
 */
export function parseQuotes (...params) {
  let output = []
  params = Array.isArray(params) ? params : []
  params.forEach(param => {
    if (typeof param === 'string' || typeof param === 'number') {
      const clean = castString(param)
      if (clean !== '') {
        output.push(Phrase(param))
      }
    } else if (isQuote(param)) {
      output.push(param)
    } else if (isList(param)) {
      param.forEach(subParam => {
        output.push(subParam)
      })
    } else if (Array.isArray(param)) {
      output = output.concat(parseQuotes(...param))
    }
  })
  return output
}

/**
 * Merge quotes.
 *
 * Merges all duplicate quotes into single quotes containing multiple
 * references. To illustrate:
 *
 * Input array: [
 *   Phrase { value: 'Alice', references: ['aaiw:movie'] },
 *   Phrase { value: 'Alice', references: ['aaiw:book'] },
 *   Phrase { value: 'Alice', references: ['aaiw:comic'] },
 *   Phrase { value: 'Wonderland', references: ['aaiw:book'] },
 * ]
 *
 * Output array: [
 *   Phrase { value: 'Alice', references: ['aaiw:movie', 'aaiw:book', 'aaiw:comic'] },
 *   Phrase { value: 'Wonderland', references: ['encyclopedia'] },
 * ]
 *
 * @param {Quote[]} A flat array of {Quote} objects.
 * @return {Quote{}} A flat array of {Quote} objects with duplicates merged.
 */
export function mergeQuotes (quotes) {
  quotes = Array.isArray(quotes) ? quotes : []

  const map = new Map()
  quotes.forEach(quote => {
    const key = quote.getName()
    if (map.has(key)) {
      // merge quotes with the same name.
      map.set(key, map.get(key).withQuote(quote))
    } else {
      // Add new quote to the list.
      map.set(key, quote)
    }
  })

  return Array.from(map.values())
}

export function MockRef (name, year) {
  this.desc = ''
  this.length = 1
  this.name = name || 'unknown'
  this.refs = []
  this.url = ''
  this.datePublished = year
}
MockRef.prototype.add = function () { return this }

export const wikipedia = new MockRef('Wikipedia')
export const wiktionary = new MockRef('Wiktionary')

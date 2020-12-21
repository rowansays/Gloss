export function MockRef (name, year) {
  this.desc = ''
  this.length = 1
  this.name = name
  this.refs = []
  this.url = ''
  this.datePublished = year
}


export const wikipedia = new MockRef('Wikipedia')
export const wiktionary = new MockRef('Wiktionary')

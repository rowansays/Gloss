export function MockRef (key, name) {
  this.desc = ''
  this.length = 1
  this.name = name
  this.refs = []
  this.url = ''
}


export const wikipedia = new MockRef('wikipedia', 'Wikipedia')
export const wiktionary = new MockRef('wiktionary', 'Wiktionary')

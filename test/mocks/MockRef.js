export function MockRef (key, name) {
  this.name = name
  this.key = key
}
MockRef.prototype.getKey = function () { return this.key }
MockRef.prototype.getName = function () { return this.name }
MockRef.prototype.getUrl = function () { return 'https://example.com' }
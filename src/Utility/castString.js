function castString (dirty) {
  dirty = typeof dirty === 'number' ? String(dirty) : dirty
  return typeof dirty === 'string' ? dirty.trim() : ''
}

export { castString }

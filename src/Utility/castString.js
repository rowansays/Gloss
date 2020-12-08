function castString (dirty) {
  return !!dirty && typeof dirty === 'string' ? dirty.trim() : ''
}

export { castString }

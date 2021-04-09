// const mdLinks = require('../');
const {
  itExists,
  isAbsolute,
  relativToAbs,
  isFile,
  isDirectory,
  mdExt
} = require('../index.js')

// IT EXISTS
describe('file or directory exists ', () => {
  it('should be a function', () => {
    expect(typeof itExists).toBe('function')
  })
  it('should be false', () => {
    expect(itExists()).toBe(false)
    expect(itExists(0)).toBe(false)
    expect(itExists(null)).toBe(false)
    expect(itExists([])).toBe(false)
  })
  it('should return ""', () => {
    expect(itExists('index.js')).toBe(true)
  })
})

describe('function that transforms relative paths into absolute ', () => {
  it('should be a function', () => {
    expect(typeof relativToAbs).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => relativToAbs()).toThrowError('The "path" argument must be of type string. Received undefined')
    expect(() => relativToAbs(0)).toThrowError()
    expect(() => relativToAbs([])).toThrowError()
    expect(() => relativToAbs(null)).toThrowError()
  })
})

describe('is this path absolute? ', () => {
  it('should be a function', () => {
    expect(typeof isAbsolute).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => isAbsolute()).toThrowError('The "path" argument must be of type string. Received undefined')
    expect(() => isAbsolute(0)).toThrowError()
    expect(() => isAbsolute([])).toThrowError()
    expect(() => isAbsolute(null)).toThrowError()
  })
})

describe('is this a file?', () => {
  it('should be a function', () => {
    expect(typeof isFile).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => isFile()).toThrowError('The "path" argument must be of type string or an instance of Buffer or URL. Received undefined')
    expect(() => isFile(0)).toThrowError()
    expect(() => isFile([])).toThrowError()
    expect(() => isFile(null)).toThrowError()
  })
})

describe('file or directory exists ', () => {
  it('should be a function', () => {
    expect(typeof isDirectory).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => isDirectory()).toThrowError('The "path" argument must be of type string or an instance of Buffer or URL. Received undefined')
    expect(() => isDirectory(0)).toThrowError()
    expect(() => isDirectory([])).toThrowError()
    expect(() => isDirectory(null)).toThrowError()
  })
})

describe('file or directory exists ', () => {
  it('should be a function', () => {
    expect(typeof mdExt).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => mdExt()).toThrowError('The "path" argument must be of type string. Received undefined')
    expect(() => mdExt(0)).toThrowError()
    expect(() => mdExt([])).toThrowError()
    expect(() => mdExt(null)).toThrowError()
  })
})

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

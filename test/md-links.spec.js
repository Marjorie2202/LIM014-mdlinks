const {
  itExists,
  normalize,
  relativToAbs,
  isFile,
  isDirectory,
  mdExt,
  mdFiles,
  getLinks,
  validateLinks
} = require('../index.js')
const fetch = require('node-fetch')
jest.mock('node-fetch')

const objA = [
  {
    href: 'https://code.tutsplus.com/es/tutorials/how-to-use-map-filter-reduce-in-javascript--cms-26209',
    text: 'entramos al 3er dir',
    file: 'C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory/secondExampleDirectory/thirdExampleDirectory/exampFile6.md'
  }
]
const objValidationA = [
  {
    href: 'https://code.tutsplus.com/es/tutorials/how-to-use-map-filter-reduce-in-javascript--cms-26209',
    text: 'entramos al 3er dir',
    file: 'C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory/secondExampleDirectory/thirdExampleDirectory/exampFile6.md',
    status: 200,
    message: 'OK'
  }
]
const objResolve = {
  status: 200,
  message: 'OK'
}

const objB = [
  {
    href: 'https://neoattac.com/proyectos/',
    text: 'Entramos al 1er directorio - Link roto)',
    file: 'firstExampleDirectory\\exampFile2.md'
  }
]

const objRejectionB = [
  {
    href: 'https://neoattac.com/proyectos/',
    text: 'Entramos al 1er directorio - Link roto)',
    file: 'firstExampleDirectory\\exampFile2.md',
    status: 500,
    message: 'FAIL'
  }
]

const objReject = {
  status: 500,
  message: 'FAIL'
}

const objC = [
  {
    href: 'https://raw.githubusercontent.com/erikagonza25/LIM014-mdlinks/main/img/links_404',
    text: 'entramos al 2do dir - status404',
    file: 'firstExampleDirectory/secondExampleDirectory/exampFile4.md'
  }
]

const objValidationC = [
  {
    href: 'https://raw.githubusercontent.com/erikagonza25/LIM014-mdlinks/main/img/links_404',
    text: 'entramos al 2do dir - status404',
    file: 'firstExampleDirectory/secondExampleDirectory/exampFile4.md',
    status: 404,
    message: 'FAIL'
  }
]

const objResolveC = {
  status: 404,
  message: 'FAIL'
}

describe('File or directory exists ', () => {
  it('should be a function', () => {
    expect(typeof itExists).toBe('function')
  })
  it('should be false', () => {
    expect(itExists()).toBe(false)
    expect(itExists(0)).toBe(false)
    expect(itExists(null)).toBe(false)
    expect(itExists([])).toBe(false)
  })
  it('should return "true"', () => {
    expect(itExists('index.js')).toBe(true)
  })
})

describe('Normalize Path', () => {
  it('should be a function', () => {
    expect(typeof normalize).toBe('function')
  })
  it('should return "C:\\temp\\foo\\"', () => {
    expect(normalize('C:\\temp\\\\foo\\bar\\..\\')).toBe('C:\\temp\\foo\\')
  })
})

describe('Function that transforms relative paths into absolute ', () => {
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

describe('Is this a file?', () => {
  it('should be a function', () => {
    expect(typeof isFile).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => isFile()).toThrowError('The "path" argument must be of type string or an instance of Buffer or URL. Received undefined')
    expect(() => isFile(0)).toThrowError()
    expect(() => isFile([])).toThrowError()
    expect(() => isFile(null)).toThrowError()
  })
  it('should return "true"', () => {
    expect(isFile('index.js')).toBe(true)
  })
})

describe('Is it a directory? ', () => {
  it('should be a function', () => {
    expect(typeof isDirectory).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => isDirectory()).toThrowError('The "path" argument must be of type string or an instance of Buffer or URL. Received undefined')
    expect(() => isDirectory(0)).toThrowError()
    expect(() => isDirectory([])).toThrowError()
    expect(() => isDirectory(null)).toThrowError()
  })
  it('should return "true"', () => {
    expect(isDirectory('test')).toBe(true)
  })
})

describe('Is it an md file?', () => {
  it('should be a function', () => {
    expect(typeof mdExt).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => mdExt()).toThrowError('The "path" argument must be of type string. Received undefined')
    expect(() => mdExt(0)).toThrowError()
    expect(() => mdExt([])).toThrowError()
    expect(() => mdExt(null)).toThrowError()
  })
  it('should return "true"', () => {
    expect(mdExt('README.md')).toBe(true)
  })
})

describe('Access Directory and get mdFiles', () => {
  it('should be a function', () => {
    expect(typeof mdFiles).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => mdFiles()).toThrowError('The "path" argument must be of type string or an instance of Buffer or URL. Received undefined')
    expect(() => mdFiles(0)).toThrowError()
    expect(() => mdFiles([])).toThrowError()
    expect(() => mdFiles(null)).toThrowError()
  })
  it('should return an empty array', () => {
    expect(mdFiles('C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/test')).toStrictEqual([])
  })
  it('should return an array', () => {
    expect(mdFiles('C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory'))
      .toStrictEqual([
        'C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory/exampFile2.md',
        'C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory/secondExampleDirectory/exampFile4.md',
        'C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory/secondExampleDirectory/thirdExampleDirectory/exampFile6.md',
        'C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory/secondExampleDirectory/thirdExampleDirectory/exampFile7.md'
      ])
  })
})

describe('Get Links', () => {
  it('should be a function', () => {
    expect(typeof getLinks).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => getLinks()).toThrowError('The "path" argument must be of type string or an instance of Buffer or URL. Received undefined')
    expect(() => getLinks(0)).toThrowError()
    expect(() => getLinks([])).toThrowError()
    expect(() => getLinks(null)).toThrowError()
  })
  it('should return an array with objects', () => {
    expect(getLinks('C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory/secondExampleDirectory/thirdExampleDirectory/exampFile7.md'))
      .toStrictEqual([])
  })
  it('should return an array with objects', () => {
    expect(getLinks('C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory/secondExampleDirectory/thirdExampleDirectory/exampFile6.md'))
      .toStrictEqual([
        {
          href: 'https://code.tutsplus.com/es/tutorials/how-to-use-map-filter-reduce-in-javascript--cms-26209',
          text: 'entramos al 3er dir',
          file: 'C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/firstExampleDirectory/secondExampleDirectory/thirdExampleDirectory/exampFile6.md'
        }
      ])
  })
})

describe('Validate Links', () => {
  it('should be a function', () => {
    expect(typeof validateLinks).toBe('function')
  })
  it('should throw Error when invoked with wrong argument types', () => {
    expect(() => validateLinks()).toThrowError(TypeError)
    expect(() => validateLinks(0)).toThrowError()
    expect(() => validateLinks(null)).toThrowError()
  })
  test('mock promise resolution 200', async () => {
    fetch.mockResolvedValue(objResolve)
    return Promise.all(validateLinks(objA)).then((data) => {
      expect(data).toEqual(objValidationA)
    })
  })
  test('mock promise rejection', async () => {
    fetch.mockRejectedValue(objReject)
    return Promise.all(validateLinks(objB)).then((data) => {
      expect(data).toEqual(objRejectionB)
    })
  })
  test('mock promise resolution 404', async () => {
    fetch.mockResolvedValue(objResolveC)
    return Promise.all(validateLinks(objC)).then((data) => {
      expect(data).toEqual(objValidationC)
    })
  })
})

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

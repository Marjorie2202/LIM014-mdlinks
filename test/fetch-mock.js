const { validateLinks } = require('../index.js')
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

test('mock promise resolution', async () => {
  fetch.mockResolvedValue(objResolve)
  return Promise.all(validateLinks(objA)).then((data) => {
    expect(data).toEqual(objValidationA)
  }
  )
})
test('mock promise rejection', async () => {
  fetch.mockRejectedValue(objReject)
  return Promise.all(validateLinks(objB)).then((data) => {
    expect(data).toEqual(objRejectionB)
  }
  )
})
// test('mock promise resolution', () => {
//   const mock = jest.fn()
//   mock.mockResolvedValue(obj)

//   expect(mock(objValidation)).resolves.toBe(obj)
//   expect(mock).toHaveBeenCalledWith(objValidation)
//   expect(mock).toHaveBeenCalledTimes(1)
// })

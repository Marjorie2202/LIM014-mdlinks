/* eslint-disable prefer-promise-reject-errors */
const {
  itExists,
  relativToAbs,
  isFile,
  mdExt,
  mdFiles,
  getLinks,
  validateLink
} = require('C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/index.js')

const mdLinks = (filePath, option) => {
  return new Promise((resolve, reject) => {
    if (itExists(filePath)) {
      const absolutePath = relativToAbs(filePath)
      if (isFile(absolutePath)) {
        if (mdExt(absolutePath)) {
          if (option && option.validate) {
            validateLink(getLinks(absolutePath))
              .then((res) => { resolve(res) })
              .catch((error) => console.error(error))
          } else { resolve(getLinks(absolutePath)) }
        } else { resolve('No soy archivo con extensión MD') }
      } else {
        let promises
        if (option && option.validate) {
          mdFiles(absolutePath).forEach(file => {
            promises = (validateLink(getLinks(file)))
          })
          Promise.all(promises).then((res) => resolve(res))
        } else { mdFiles(absolutePath).forEach((file) => { resolve(getLinks(file)) }) }
      }
    } else { reject('ruta no existe') }
  })
}

mdLinks(process.argv[2], { validate: true })
  .then((links) => {
    console.log(links)
  })
  .catch(console.error)

module.exports = {
  mdLinks
}

// resolve((promises).then((links) => { console.log(links) }))

// PROBAR CON CREAR ARRAY
// promiseStorage = promiseStorage.concat(validateLink(getLinks(file)))
// promiseStorage = [...promiseStorage, ...(getLinks(file))]
// promiseStorage.push(...(getLinks(file)))

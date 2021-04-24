/* eslint-disable prefer-promise-reject-errors */
const {
  itExists,
  relativToAbs,
  isFile,
  mdExt,
  mdFiles,
  getLinks,
  validateLinks
} = require('C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/index.js')

const mdLinks = (filePath, option) => {
  return new Promise((resolve, reject) => {
    if (itExists(filePath)) {
      const absolutePath = relativToAbs(filePath)
      if (isFile(absolutePath) && mdExt(absolutePath)) {
        if (option && option.validate) {
          const validateLinksCatched = validateLinks(getLinks(absolutePath)).map(x => x.catch(x => x))
          Promise.all(validateLinksCatched)
            .then((res) => { resolve(res) })
            .catch(() => console.log('ERROR'))
        } else { resolve(getLinks(absolutePath)) }
      } else {
        let promises
        if (option && option.validate) {
          mdFiles(absolutePath).forEach(file => {
            promises = validateLinks(getLinks(file)).map(x => x.catch(x => x))
          })
          Promise.all(promises)
            .then((res) => resolve(res))
            .catch(() => console.log(' ERROR'))
        } else { mdFiles(absolutePath).forEach((file) => { resolve(getLinks(file)) }) }
      }
    } else { reject('Ruta no existe') }
  })
}

// mdLinks(process.argv[2], { validate: true })
//   .then((links) => {
//     console.log(links)
//   })
//   .catch(console.error)

module.exports = {
  mdLinks
}

// resolve((promises).then((links) => { console.log(links) }))

// PROBAR CON CREAR ARRAY
// promiseStorage = promiseStorage.concat(validateLinks(getLinks(file)))
// promiseStorage = [...promiseStorage, ...(getLinks(file))]
// promiseStorage.push(...(getLinks(file)))

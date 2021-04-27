/* eslint-disable prefer-promise-reject-errors */
const {
  normalize,
  itExists,
  relativToAbs,
  isFile,
  mdExt,
  mdFiles,
  getLinks,
  isDirectory,
  validateLinks
} = require('C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/index.js')
const chalk = require('chalk')

const mdLinks = (filePath, option) => {
  return new Promise((resolve, reject) => {
    if (itExists(filePath)) {
      const absolutePath = relativToAbs(normalize(filePath))
      if (isFile(absolutePath) && mdExt(absolutePath)) {
        if (option && option.validate) {
          const validateLinksCatched = validateLinks(getLinks(absolutePath)).map(x => x.catch(x => x))
          Promise.all(validateLinksCatched)
            .then((res) => { resolve(res) })
            .catch(() => console.log((chalk.rgb(168, 209, 31)('NO HAY LINKS PARA VALIDAR 🍀'))))
        } else { resolve(getLinks(absolutePath)) }
      } else if (isDirectory(absolutePath)) {
        let promises
        if (option && option.validate) {
          mdFiles(absolutePath).forEach(file => {
            promises = validateLinks(getLinks(file)).map(x => x.catch(x => x))
          })
          Promise.all(promises)
            .then((res) => resolve(res))
            .catch(() => console.log((chalk.rgb(168, 209, 31)('NO HAY LINKS PARA VALIDAR 🍀'))))
        } else { mdFiles(absolutePath).forEach((file) => { resolve(getLinks(file)) }) }
      } else { reject('No es archivo MD 🥀 ') }
    } else { reject('Ruta no existe 🥀 ') }
  })
}

// mdLinks(process.argv[2], { validate: true })
//   .then((links) => {
//     console.log(links)
//   })
//   .catch((error) => console.log(error))

module.exports = {
  mdLinks
}

// resolve((promises).then((links) => { console.log(links) }))

// PROBAR CON CREAR ARRAY
// promiseStorage = promiseStorage.concat(validateLinks(getLinks(file)))
// promiseStorage = [...promiseStorage, ...(getLinks(file))]
// promiseStorage.push(...(getLinks(file)))

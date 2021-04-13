/* eslint-disable prefer-promise-reject-errors */
const {
  itExists,
  relativToAbs,
  isFile,
  isDirectory,
  mdExt,
  accessDirectory,
  getLinks,
  validateLink
} = require('C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/index.js')

const mdLinks = (filePath, option) => {
  return new Promise((resolve, reject) => {
    if (itExists(filePath)) {
      if (relativToAbs(filePath)) {
        if (isFile(filePath)) {
          if (mdExt(filePath)) {
            if (option.validate) {
              Promise.all(validateLink(getLinks(filePath)))
                .then((res) => { resolve(res) })
                .catch((error) => console.error(error))
            } else {
              resolve(getLinks(filePath))
            }
          } else { resolve('No soy archivo con extensión MD') }
        } else if (isDirectory(filePath)) {
          accessDirectory(filePath).forEach((file) => {
            if (option.validate) {
              Promise.all(validateLink(getLinks(file)))
                .then((res) => { resolve(res) })
                .catch((error) => console.error(error))
            } else {
              resolve(getLinks(file))
            }
          })
        } else { reject('No hay archivos MD') }
      }
    } else { reject('ruta no existe') }
  })
}

mdLinks(process.argv[2], { validate: false })
  .then((links) => {
    console.log(links)
  })
  .catch(console.error)

module.exports = {
  mdLinks
}

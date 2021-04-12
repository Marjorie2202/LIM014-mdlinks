/* eslint-disable prefer-promise-reject-errors */
const {
  itExists,
  isAbsolute,
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
      if (isAbsolute(filePath)) {
        if (isFile(filePath)) {
          if (mdExt(filePath)) {
            if (option.validate) {
              Promise.all(validateLink(getLinks(filePath)))
                .then((res) => {
                  resolve(res)
                })
                .catch((error) => console.error(error))
            } else {
              resolve(getLinks(filePath))
            }
          } else { resolve('No soy archivo con extensión MD') }
        } else if (isDirectory(filePath)) {
          // console.log(accessDirectory(filePath))
          accessDirectory(filePath).forEach((file) => {
            resolve(file + ' Soy archivo con extensión MD')
          })
        }
      } else {
        mdLinks(relativToAbs(filePath))
      }
    } else {
      console.log('ruta no existe')
    }
  })
}

//  readingFile(process.argv[2])

// const mdLinks = (filePath, option) => {
//   return new Promise((resolve, reject) => {
//     const checkPath = itExists(filePath)
//     if (checkPath) {
//       resolve(filePath)
//     } else {
//       reject('No existe')
//     }
//   })
// }

mdLinks(process.argv[2], { validate: false })
  .then((links) => {
    console.log(links)
  })
  .catch(console.error)

const {
  itExists,
  isAbsolute,
  relativToAbs,
  isFile,
  isDirectory,
  mdExt,
  accessDirectory,
  getLinks
} = require('C:/Users/Astrid/Desktop/LABORATORIA/PROYECTO_MDLINKS/LIM014-mdlinks/index.js')

const readingFile = (filePath, option) => {
  if (itExists(filePath)) {
    if (isAbsolute(filePath)) {
      if (isFile(filePath)) {
        if (mdExt(filePath)) {
        } else { console.log('No soy archivo con extensión MD') }
      } else if (isDirectory(filePath)) {
        console.log(accessDirectory(filePath))
        accessDirectory(filePath).forEach((file)=> {})
      }
    } else if (isAbsolute(filePath) === false) {
      readingFile(relativToAbs(filePath))
    }
  } if (itExists(filePath) === false) {
    console.log('ruta no existe')
  }
}

readingFile(process.argv[2])

// mdLinks("hello.md")
//   .then((links) => {
//     console.log(links);
//   })
//   .catch(console.error);

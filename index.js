/* eslint-disable no-useless-escape */
/* eslint-disable indent */
/* eslint-disable no-multiple-empty-lines */

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const fetch = require('node-fetch')


// CONVERTIR RUTA RELATIVA A ABSOLUTA
 const relativToAbs = (filePath) => path.resolve(filePath)

//  DETERMINAR SI ES DIRECTORIO O ARCHIVO
const isFile = (filePath) => fs.statSync(filePath).isFile()
const isDirectory = (filePath) => fs.statSync(filePath).isDirectory()

//  DETERMINAR SI ARCHIVO EXISTE
const itExists = (filePath) => fs.existsSync(filePath)

// LEER DIRECTORIO
const readDir = (filePath) => fs.readdirSync(filePath)

// IDENTIFICAR EXTENSIÓN MD
function mdExt (file) {
    return path.extname(file) === '.md' || path.extname(file) === '.MD' || path.extname(file) === '.Md' || path.extname(file) === '.mD'
}

// FUNCIÓN RECURSIVA ACCEDER A DIRECTORIO Y FILTRAR ARCHIVOS MD
const mdFilesArr = []
const mdFiles = (directory) => {
    readDir(directory).forEach(file => {
        if (isFile(directory + `/${file}`)) {
            if (mdExt(directory + `/${file}`)) {
            mdFilesArr.push(directory + `/${file}`)
            }
        } else { mdFiles(directory + `/${file}`) }
    })
    return mdFilesArr
}

// LEER ARCHIVO
const readFile = (filePath) => (fs.readFileSync(filePath, 'utf8'))

// OBTENER LINKS
const storageLinks = []
const getLinks = (file) => {
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
        const validHref = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        if (validHref.test(href)) {
        const linkInfo = {
        href: href,
        text: text,
        file: file
        }
        storageLinks.push(linkInfo)
    }
    }
    marked(readFile(file), { renderer })
    return storageLinks
}
// console.log(getLinks(process.argv[2]))


const validateLinks = (arr) => arr.map((obj) =>
    fetch(obj.href)
    .then((res) => {
        return {
            href: obj.href,
            text: obj.text,
            file: obj.file,
            status: res.status,
            message: (res.status === 200) ? 'OK' : 'FAIL'
        }
    })
    .catch(() => {
       return {
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: 500,
        message: 'FAIL'
      }
    })
)


// Promise.all(validateLinks(getLinks(process.argv[2])))
// .then((res) => {
//     console.log(res)
// })
// .catch((error) => console.error(error))



module.exports = {
    itExists,
    relativToAbs,
    isFile,
    isDirectory,
    mdExt,
    mdFiles,
    validateLinks,
    getLinks
}

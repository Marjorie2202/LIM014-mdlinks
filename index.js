/* eslint-disable indent */
/* eslint-disable no-multiple-empty-lines */

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const fetch = require('node-fetch')


// DETERMINAR SI EL PATH ES ABSOLUTO
//  const isAbsolute = (filePath) => path.isAbsolute(filePath)

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
// CONVERTIR LA FUNCIÓN A PURA
// console.log(mdFiles(process.argv[2]))

// LEER ARCHIVO
const readFile = (filePath) => (fs.readFileSync(filePath, 'utf8'))

// OBTENER LINKS
const storageLinks = []
const getLinks = (filePath) => {
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
        const validHref = /https:([^"')\s]+)/
        if (validHref.test(href) === true) {
        const linkInfo = {
        href: href,
        text: text,
        file: filePath
        }
        storageLinks.push(linkInfo)
    }
    }
    marked(readFile(filePath), { renderer })
    return storageLinks
}
// console.log(getLinks(process.argv[2]))


const validateLink = (arr) => arr.map((obj) =>
    fetch(obj.href)
    .then((res) => {
        return {
            Href: obj.href,
            Text: obj.text,
            File: obj.file,
            Status: res.status,
            Message: (res.status === 200) ? 'OK' : 'FAIL'
        }
    })
    .catch(() => {
       return {
        Href: obj.href,
        Text: obj.text,
        File: obj.file,
        status: 500,
        statusText: 'FAIL'
      }
    })
)


// Promise.all(validateLink(getLinks()))
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
    validateLink,
    getLinks
}

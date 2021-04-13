/* eslint-disable indent */
/* eslint-disable no-multiple-empty-lines */

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const fetch = require('node-fetch')

// md.validateLink = function () { return true }

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
const mdFiles = []
const accessDirectory = (directory) => {
// AVERIGUAR SI ES ARCHIVO O DIRECTORIO NODE FS
    readDir(directory).forEach(file => {
        if (isFile(directory + `/${file}`)) {
            if (mdExt(directory + `/${file}`)) {
            mdFiles.push(directory + `/${file}`)
            }
        } else if (isDirectory(directory + `/${file}`)) {
            accessDirectory(directory + `/${file}`)
        }
    })
    return mdFiles
}
// CONVERTIR LA FUNCIÓN A PURA
// console.log(accessDirectory(process.argv[2]))

// LEER ARCHIVO
const readFile = (filePath) => (fs.readFileSync(filePath, 'utf8'))
// readFile('.gitignore')

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
// console.log(getLinks('readme2.md'))

const validateLink = (arr) => arr.map((obj) =>
    fetch(obj.href)
    .then((res) => {
        if (res.status === 200) {
                const objLink = {
                    Href: obj.href,
                    Text: obj.text,
                    File: obj.file,
                    Status: res.status,
                    Message: 'OK'
                }
                return (objLink)
            } else if (res.status !== 200) {
                const objLink = {
                    Href: obj.href,
                    Text: obj.text,
                    File: obj.file,
                    Status: res.status,
                    Message: 'FAIL'
                }
                return (objLink)
            }
    })
    .catch(() => ({
        Href: obj.href,
        Text: obj.text,
        File: obj.file,
        status: 500,
        statusText: 'FAIL'
      }))
)

// Promise.all(validateLink(getLinks(process.argv[2])))
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
    accessDirectory,
    validateLink,
    getLinks
}

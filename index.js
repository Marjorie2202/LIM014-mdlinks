/* eslint-disable indent */
/* eslint-disable no-multiple-empty-lines */

const fs = require('fs')
const path = require('path')
const marked = require('marked')
// const fetch = require('node-fetch')
const https = require('https')

// md.validateLink = function () { return true }

// DETERMINAR SI EL PATH ES ABSOLUTO
 const isAbsolute = (filePath) => path.isAbsolute(filePath)

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
    return path.extname(file) === '.md' || path.extname(file) === '.MD'
}

function dirExt (file) {
    return path.extname(file) === ''
}

// FUNCIÓN RECURSIVA ACCEDER A DIRECTORIO Y FILTRAR ARCHIVOS MD
const mdFiles = []
const accessDirectory = (filePath) => {
    readDir(filePath).forEach(file => {
        if (mdExt(file)) {
            mdFiles.push(file)
        } else if (dirExt(file)) {
            accessDirectory(filePath + `/${file}`)
        }
    })
    return mdFiles
}

// LEER ARCHIVO
const readFile = (filePath) => (fs.readFileSync(filePath, 'utf8'))
// readFile('.gitignore')

// OBTENER LINKS
const storageLinks = []
const getLinks = (filePath) => {
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
      const linkInfo = {
        href: href,
        text: text,
        file: filePath
      }
      return storageLinks.push(linkInfo)
    }
    marked(readFile(filePath), { renderer })
    return storageLinks
}

const validateLink = (arr) => arr.map((obj) =>
    new Promise((resolve, reject) => {
    https.get(obj.href, (res) => {
            if (res.statusCode === 200) {
                const objLink = {
                    Href: obj.href,
                    Text: obj.text,
                    File: obj.file,
                    Status: res.statusCode,
                    Message: res.statusMessage
                }
                resolve(console.log(objLink))
            } else if (res.statusCode !== 200) {
                const objLink = {
                    Href: obj.href,
                    Text: obj.text,
                    File: obj.file,
                    Status: res.statusCode,
                    Message: 'FAIL'
                }
                resolve(console.log(objLink))
            } else {
                const err = new Error(`REQUEST ERROR ON ${obj.href}. Status ${res.statusCode}`)
                reject(err)
            }
     })
}))


Promise.all(validateLink(getLinks(process.argv[2])))
.then((res) => {
    console.log(res)
})
.catch((error) => console.error(error))



module.exports = {
    itExists,
    isAbsolute,
    relativToAbs,
    isFile,
    isDirectory,
    mdExt,
    readFile,
    readDir,
    accessDirectory
}

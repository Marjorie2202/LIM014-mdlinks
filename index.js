/* eslint-disable indent */
/* eslint-disable no-multiple-empty-lines */

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const md = require('markdown-it')()



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
const getLinks = (filePath) => {
//    const validateLinks = (link) => md.validateLink(link)
    const prueba = []
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
      const linkInfo = {
        href: href,
        text: text,
        file: filePath
      }
      return prueba.push(linkInfo)
      // validateLinks(href))
    }
    marked(readFile(filePath), { renderer })
    return prueba
}
console.log(getLinks('README.md'))

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

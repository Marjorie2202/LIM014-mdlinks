#!/usr/bin/env node

const program = require('commander')
program.version('0.0.1')
const { mdLinks } = require('./md-links.js')
const { mdTitle, flowers, flowers2, flowers3, flowers4, flowers5 } = require('./imagenes/images.js')
const chalk = require('chalk')
const figlet = require('figlet')

// const lilacColor = chalk.rgb(229, 108, 240)
// const pinkColor = chalk.rgb(242, 73, 123)
// const babyPinkColor = chalk.rgb(245, 154, 170)
const bubblegumColor = chalk.rgb(250, 103, 118)
const hotPinkColor = chalk.rgb(245, 37, 72)
// const orangeColor = chalk.rgb(250, 185, 77)
const creamColor = chalk.rgb(255, 255, 143)
const babyYellowColor = chalk.rgb(255, 242, 171)
const pollenColor = chalk.rgb(255, 213, 77)
// const skyBlueColor = chalk.rgb(101, 207, 219)
// const mustardColor = chalk.rgb(232, 216, 44)
// const turquoiseColor = chalk.rgb(152, 219, 198)
const lemonGreenColor = chalk.rgb(168, 209, 31)

const defaultOption = (arr) => arr.forEach((obj) => {
  const path = pollenColor(`Path: ${(obj.file)} |`)
  const link = bubblegumColor(`  Link: ${(obj.href)} |`)
  const text = babyYellowColor(`  Text: ${(obj.text).substr(0, 50)}`)
  return console.log('• ' + path + link + text)
})
//  validate((process.argv[2]))

const toValidate = (arr) => arr.forEach((obj) => {
  const path = pollenColor(`Path: ${(obj.file)} |`)
  const link = bubblegumColor(`  Link: ${(obj.href)}  |`)
  const text = babyYellowColor(`  Text: ${(obj.text).substr(0, 50)} |`)
  let status
  if (obj.message === 'OK') {
    status = lemonGreenColor(` Status: ${(obj.status)} ${(obj.message)} `)
  } else if (obj.message === 'FAIL') {
    status = hotPinkColor(` Status: ${(obj.status)} ${(obj.message)} `)
  }
  return console.log('• ' + path + link + text + status)
})
//  validate((process.argv[2]))

const toStats = (arr) => {
  const total = []
  const unique = new Set()
  arr.forEach(element => {
    total.push(element.href)
    unique.add(element.href)
  })
  const totalLinks = creamColor(`Total: ${(total.length)}`)
  const uniqueLinks = lemonGreenColor(`  Unique: ${(unique.size)}`)
  return console.log(totalLinks + uniqueLinks)
}
// stats((process.argv[2]))

const toStatsValidate = (arr) => {
  const total = []
  const unique = new Set()
  const broken = arr.filter(element => element.message === 'FAIL')
  arr.forEach(element => {
    total.push(element.href)
    unique.add(element.href)
  })
  const totalLinks = creamColor(`Total: ${(total.length)}`)
  const uniqueLinks = lemonGreenColor(`  Unique: ${(unique.size)}`)
  const brokenLinks = hotPinkColor(`  Broken: ${broken.length} `)
  return console.log(totalLinks + uniqueLinks + brokenLinks)
}
// statsValidate(process.argv[2])

program
  .usage('path')
  .option('-v, --validate', 'links validation')
  .option('-s, --stats', 'links basic statistics')
  .option('-a, --statsValidate', 'links statistics adding validation')
  .action(path => {
    const options = program.opts()

    mdLinks(path, { validate: true })
      .then(arr => {
        if (options.validate) {
          toValidate(arr)
          console.log((lemonGreenColor.bold(flowers)))
        } else if (options.stats) {
          toStats(arr)
          console.log(bubblegumColor.bold(flowers2))
        } else if (options.statsValidate) {
          toStatsValidate(arr)
          console.log(pollenColor.bold(flowers3))
        } else if (arr.length === 0) {
          console.log(creamColor.bold(flowers4))
        } else {
          defaultOption(arr)
          console.log((lemonGreenColor.bold(flowers5)))
        }
      }
      )
  })
program.parse(process.argv)

// console.log(mdTitle)
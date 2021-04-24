const figlet = require('figlet')
const chalk = require('chalk')


const flowers = ` 
🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷  E N D 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷 🌷
`
const flowers2 = ` 
🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹  E N D  🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 🌹 
`
const flowers3 = `
🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 E N D 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼 🌼
`
const flowers4 = `
🏵️  🏵️  🏵️  🏵️  🏵️  🏵️  🏵️   N O   H A Y  L I N K S  🏵️  🏵️  🏵️  🏵️  🏵️  🏵️  🏵️  
`
const flowers5 = `
🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺  E N D 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 🌺 
`

const mdTitle = (chalk.rgb(255, 213, 77)(figlet.textSync('md-Links', {
  font: 'Flower Power',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 100,
  whitespaceBreak: true
})))

module.exports = {
  mdTitle,
  flowers,
  flowers2,
  flowers3,
  flowers4,
  flowers5
}

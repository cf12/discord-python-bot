// Dependencies
const Eris = require('eris')
const fs = require('fs')
const path = require('path')

// Setting up objects & vars
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')))
let bot = new Eris(config.bot_token)
let pf = '$'

// Attempts to connect the bot
bot.connect()

// Class: Logger
function Logger () {
  // Log to console
  Logger.prototype.logConsole = (log, type) => {
    if (type === 'info') {
      console.log('INFO > ' + log)
    } else if (type === 'err') {
      console.log('ERROR > ' + log)
    } else if (type === 'debug') {
      console.log('DEBUG > ' + log)
    } else {
      console.log('ERROR > Invalid console log')
    }
  }

  // Log to channel
  Logger.prototype.logChannel = (log, type) => {
    if (type === 'info') {
      message.channel.createMessage('```> INFO: ' + log + '```')
    } else if (type === 'err') {
      message.channel.createMessage('```> ERROR: ' + log + '```')
    } else {
      console.log('ERROR > Invalid channel log')
    }
  }
}

// Vars and Object Init
let message = null
let logger = new Logger()

// On: Bot Ready
bot.on('ready', () => {
  console.log('INFO > Bot activated')
})

bot.on('messageCreate', (msg) => {

})

// On: Bot Error
bot.on('error', (err, id) => {
  if (err) {
    logger.logConsole('Unknown error has occured to shard ' + id + '. Please see stack trace', 'err')
    throw err
  }
})

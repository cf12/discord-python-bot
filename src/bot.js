// Dependencies
const Discord = require('discord.js')
const PythonShell = require('python-shell')
const Downloader = require('mt-files-downloader')
const fs = require('fs')
const path = require('path')

// Setting up objects & vars
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')))
let bot = new Discord.Client()
let downloader = new Downloader()
let dl = null
let pythonOptions = {
  mode: 'text',
  pythonPath: 'C:\\Python27\\python.exe'
}

// Attempts to connect the bot
bot.login(config.bot_token)

// On: Bot Ready
bot.on('ready', () => {
  console.log('INFO > Bot activated')
})

bot.on('message', (msg) => {
  if (msg.attachments.array().length >= 1) {
    let url = msg.attachments.array()[0].url
    let fileName = url.substring(url.lastIndexOf('\\'))
    console.log('DEBUG > Attachment found')
    console.log('DEBUG > URL: ' + url)
    console.log('DEBUG > File Name: ' + fileName)

    if (url.slice(-3) === '.py') {
      console.log('DEBUG > Python Attachment Found')
      console.log('DEBUG > Running')

      dl = downloader.download(url, path.join(__dirname + '/cache.py'))
      dl.start()
      dl
      .on('end', (dl) => {
        PythonShell.run(path.join(__dirname + '/cache.py'), pythonOptions, (err, results) => {
          if (err) {
            msg.channel.sendMessage('__**ERROR: (Yay!)**__\n```' + err + '```')
            return
          }
          msg.channel.sendMessage('__**SUCCESS: (Wait, It ACTUALLY worked?)**__\n```' + results + '```')
          dl.destroy()
        })
      })

      .on('error', (dl) => {
        console.log(dl)
      })
    }
  }
})

// On: Bot Error
bot.on('error', (err, id) => {
  if (err) {
    console.log('ERROR > Unknown error has occured on shard ' + id + '. Please see stack trace:')
    throw err
  }
})

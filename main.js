const Discord = require('discord.js')
const client = new Discord.Client({ fetchAllMembers: true, intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS] })
const config = require('./config.json')
const { startCMHandler } = require('./modules/commandHandler')
const { startEVHandler } = require('./modules/eventHandler')

startCMHandler(client)
startEVHandler(client)

client.login(config.bot.token)
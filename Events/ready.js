const Discord = require('discord.js')
const colors = require('colors')
const config = require('../config.json')
const { twitchModuleStarter } = require('../modules/twichModule')
const { richPresenceModuleStarter } = require('../modules/richPresence')

module.exports = async client => {
    console.log(`\n[BOT] `.green + `Iniciado com sucesso.`)
    console.log(`[BOT] `.green + `Autenticado como ${client.user.tag} (${client.user.id})`)
    console.log(`[BOT] `.green + `Users: ${client.users.cache.size}`)
    console.log(`[BOT] `.green + `Guilds: ${client.guilds.cache.size}\n`)

    if (config.functions.twitch_notify.enabled === true) {
        twitchModuleStarter(client)
    }

    if (config.functions.rich_presence.enabled === true) {
        richPresenceModuleStarter(client)
    }
}
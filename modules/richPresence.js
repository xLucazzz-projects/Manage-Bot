const config = require('../config.json')
const colors = require('colors')

async function richPresenceUpdate(client) {
    return await client.user.setActivity(config.functions.rich_presence.status[Math.floor(Math.random() * config.functions.rich_presence.status.length)])
}

async function richPresenceModuleStarter(client) {
    richPresenceUpdate(client)
    setInterval(() => {
        richPresenceUpdate(client)
    }, config.functions.rich_presence.update_cooldown);
}

module.exports = { richPresenceModuleStarter}
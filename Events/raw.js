
const Discord = require('discord.js')
const colors = require('colors')
const config = require('../config.json')

module.exports = async (client, event) => {
    console.log(event)
    /*if (config.functions.log_events.enabled === true) {
        var embed = new Discord.MessageEmbed()

            .setAuthor({ name: member.user.username, iconURl: member.user.avatarURL(), url: member.user.avatarURL() })
            .setColor("#ff0000")
            .setDescription(`🚫 <@${member.user.id}> foi banido por <@${fetchedLogs.entries.first().executor.id}>`)
            .setFooter({ text: `ID do usuário: ${member.user.id}` })
            .setTimestamp()

        return await client.channels.cache.get(config.functions.log_events.channel_id).send({ embeds: [embed] })

    }*/
}

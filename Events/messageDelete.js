const Discord = require('discord.js')
const config = require('../config.json')
const colors = require('colors')

module.exports = async (client, message) => {
    if (message.channel.type === "dm") return
    
    if (config.functions.log_events.enabled === true) {
        var embed = new Discord.MessageEmbed()

            .setAuthor({ name: message.author.username, iconURl: message.author.avatarURL(), url: message.author.avatarURL() })
            .setColor("#ff0000")
            .setDescription(`**📝 Mensagem de texto deletada\n\nCanal de texto: <#${message.channel.id}>**`)
            .addField(`**Mensagem**`, "```" + message.content + "```")
            .setFooter({ text: `ID do usuário: ${message.author.id}` })
            .setTimestamp()

        return await client.channels.cache.get(config.functions.log_events.channel_id).send({ embeds: [embed] })
    }
}
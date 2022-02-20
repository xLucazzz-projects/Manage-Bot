const Discord = require('discord.js')
const colors = require('colors')
const config = require('../config.json')

module.exports = async (client, oldMember, newMember) => {
    if (oldMember.nickname !== newMember.nickname) {
        if (oldMember.nickname === null) oldMember.nickname = "🤷 Nenhum apelido"
        if (newMember.nickname === null) newMember.nickname = "🤷 Nenhum apelido"

        var embed = new Discord.MessageEmbed()

            .setAuthor({ name: newMember.user.username, iconURl: newMember.user.avatarURL(), url: newMember.user.avatarURL() })
            .setColor("GREEN")
            .setDescription("**📝 Nickname de " + oldMember.nickname + " foi alterado\n\nAntigo nickname: `" + oldMember.nickname + "`\nNovo nickname: `" + newMember.nickname + "`**")
            .setFooter({ text: `ID do usuário: ${newMember.user.id}` })
            .setTimestamp()

        return await client.channels.cache.get(config.functions.log_events.channel_id).send({ embeds: [embed] })
    }
    
    if (config.functions.log_events.enabled === true) {
        await oldMember.roles.cache.map(async role => {
            if (!newMember.roles.cache.get(role.id)) {
                var embed = new Discord.MessageEmbed()

                    .setAuthor({ name: newMember.user.username, iconURl: newMember.user.avatarURL(), url: newMember.user.avatarURL() })
                    .setColor("#ff0000")
                    .setDescription(`📝 <@${newMember.user.id}> perdeu um cargo`)
                    .addField(`CARGO`, `<@&${role.id}>`)
                    .setFooter({ text: `ID do usuário: ${newMember.user.id}` })
                    .setTimestamp()

                await client.channels.cache.get(config.functions.log_events.channel_id).send({ embeds: [embed] })
            }
        })

        await newMember.roles.cache.map(async role => {
            if (!oldMember.roles.cache.get(role.id)) {
                var embed = new Discord.MessageEmbed()

                    .setAuthor({ name: newMember.user.username, iconURl: newMember.user.avatarURL(), url: newMember.user.avatarURL() })
                    .setColor("GREEN")
                    .setDescription(`📝 <@${newMember.user.id}> ganhou um cargo`)
                    .addField(`CARGO`, `<@&${role.id}>`)
                    .setFooter({ text: `ID do usuário: ${newMember.user.id}` })
                    .setTimestamp()

                await client.channels.cache.get(config.functions.log_events.channel_id).send({ embeds: [embed] })

            }
        })
    }

}
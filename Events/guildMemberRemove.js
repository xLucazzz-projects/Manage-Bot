const Discord = require('discord.js')
const colors = require('colors')
const config = require('../config.json')

module.exports = async (client, member) => {
    if (config.functions['join-leave-message'].enabled === true) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription(`⬅️ ${member.user.tag} saiu do servidor`)

        await client.channels.cache.get(config.functions['join-leave-message'].leave_channel).send({ embeds: [embed] }).catch(async err => {
            console.log(`[${config.functions['join-leave-message'].config_name}]`.red + ` Ocorreu um erro ao notificar a saída. Err: ${err}`)
        })
    }

    if (config.functions.log_events.enabled === true) {
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        })

        if (fetchedLogs.entries.first().target.id === member.user.id) {
            var embed = new Discord.MessageEmbed()

                .setAuthor({ name: member.user.username, iconURl: member.user.avatarURL(), url: member.user.avatarURL() })
                .setColor("#ff0000")
                .setDescription(`🚫 <@${member.user.id}> foi banido por <@${fetchedLogs.entries.first().executor.id}>`)
                .setFooter({ text: `ID do usuário: ${member.user.id}` })
                .setTimestamp()

            return await client.channels.cache.get(config.functions.log_events.channel_id).send({ embeds: [embed] })
        }

    }

    if (config.functions.members_count.enabled === true) {
        var channel = await client.channels.cache.get(config.functions.members_count.channel_id)

        if (channel) {
            if (channel.type !== "GUILD_VOICE") {
                return console.log(`[${config.functions.members_count.config_name}]`.red + ` O canal deve ser do tipo VOZ. `)
            }

            await channel.setName(`👥 Membros: ${member.guild.members.cache.size}`).catch(async err => {
                console.log(`[${config.functions.members_count.config_name}]`.red + ` Ocorreu um erro ao trocar o nome do canal. Err: ${err}`)
            })
        } else {
            console.log(`[${config.functions.members_count.config_name}]`.red + ` Ocorreu um erro ao encontrar o canal informado. `)
        }
    }

}
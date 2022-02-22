const Discord = require('discord.js')
const colors = require('colors')
const config = require('../config.json')

module.exports = async (client, member) => {
    if (config.functions['join-leave-message'].enabled === true) {
        var embed = new Discord.MessageEmbed()

            .setColor("GREEN")
            .setDescription(`➡️ <@${member.user.id}> entrou no servidor`)

        await client.channels.cache.get(config.functions['join-leave-message'].join_channel).send({ embeds: [embed] }).catch(async err => {
            console.log(`[${config.functions['join-leave-message'].config_name}]`.red + ` Ocorreu um erro ao notificar a entrada. Err: ${err}`)
        })
    }

    if (config.functions.auto_role.enabled === true) {
        await member.roles.add(config.functions.auto_role.role_id).catch(async err => {
            console.log(`[${config.functions.auto_role.config_name}]`.red + ` Ocorreu um erro ao adicionar o cargo. Err: ${err}`)
        })
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
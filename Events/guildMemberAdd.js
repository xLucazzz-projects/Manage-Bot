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
}
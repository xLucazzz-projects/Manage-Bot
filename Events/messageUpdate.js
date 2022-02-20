const Discord = require('discord.js')
const config = require('../config.json')
const colors = require('colors')

module.exports = async (client, oldMessage, message) => {
    if (message.channel.type === "dm") return
    if (message.author.bot) return;

    if (config.functions.anti_invite.enabled === true) {
        const reg = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/g
        var authorized = false

        await message.member.roles.cache.map(async role => {
            var find = config.functions.anti_invite.roles_permission.find(u => u === role.id)
            if (find) authorized = true
        })

        if (authorized === false) {
            if (reg.test(message.content.toLowerCase().replace(/\s+/g, ''))) {
                await message.delete().catch(err => console.error)

                var embed = new Discord.MessageEmbed()

                    .setColor("RED")
                    .setDescription("❌ | Você não pode enviar convites de outros servidores de discord !")

                return message.channel.send({ content: `${message.author}`, embeds: [embed] }).then(async msg => setTimeout(() => { msg.delete().catch(async err => console.error) }, 10000))
            }
        }
    }
    if (config.functions.log_events.enabled === true) {
        var embed = new Discord.MessageEmbed()

            .setAuthor({ name: message.author.username, iconURl: message.author.avatarURL(), url: message.author.avatarURL() })
            .setColor("#fffb00")
            .setDescription(`**📝 ${message.author} editou uma mensagem de texto\n\nCanal de texto: <#${message.channel.id}>**`)
            .addField(`**Antiga Mensagem**`, "```" + oldMessage.content + "```")
            .addField(`**Nova Mensagem**`, "```" + message.content + "```")
            .setFooter({ text: `ID do usuário: ${message.author.id}` })
            .setTimestamp()

        await client.channels.cache.get(config.functions.log_events.channel_id).send({ embeds: [embed] })
    }
    if (!message.content.startsWith(config.bot.prefix)) return

    var prefix = config.bot.prefix
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    let archive = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))

    if (archive) {
        archive.run(client, message, args, prefix)
    } else {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription(`❌ | O comando executado não existe.`)

        return message.channel.send({ content: `${message.author}`, embeds: [embed] }).then(async msg => setTimeout(() => { msg.delete().catch(async err => console.error) }, 10000))
    }
}
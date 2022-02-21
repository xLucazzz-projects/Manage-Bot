const Discord = require("discord.js");
const moment = require('moment')
moment.locale("pt-br")

module.exports.run = async (client, message, args, prefix, cmd) => {

    var fields1 = []
    var fields2 = []

    var embed = new Discord.MessageEmbed()

        .setColor("#7289da")

    if (!args[0] && !message.mentions.members.first()) {
        var permissions = ""

        await message.member.permissions.toArray().map(r => permissions += "`" + r + "`,")

        embed.setThumbnail(message.author.avatarURL())
        embed.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
        fields1 = [{ name: `🔖 Tag do Discord`, value: "`" + message.author.tag + "`", inline: true },
        { name: `💻 ID do Discord`, value: "`" + message.author.id + "`", inline: true },
        { name: `📅 Conta criada há`, value: `${moment(message.author.createdAt).format("LLL")} (<t:${parseInt(message.author.createdAt / 1000)}:R>)`, inline: true },
        { name: `🌟 Entrou há`, value: `${moment(message.member.joinedAt).format("LLL")} (<t:${parseInt(message.member.joinedAt / 1000)}:R>)`, inline: true }]
        embed.addFields(fields1)

        fields2 = [
            { name: `💼 Cargos (${message.member.roles.cache.size})`, value: message.member.roles.cache.map(r => "`" + r.name + "`,").join(" ").replace(", `@everyone`,", "").replace("`@everyone`,", "`@everyone`"), inline: false },
            { name: `🛡 Permissões (${message.member.permissions.toArray().length})`, value: permissions, inline: false }
        ]
    }


    if (message.mentions.members.first()) {
        var permissions = ""

        await message.mentions.members.first().permissions.toArray().map(r => permissions += "`" + r + "`,")

        embed.setThumbnail(message.mentions.members.first().user.avatarURL())
        embed.setAuthor({ name: message.mentions.members.first().user.username, iconURL: message.mentions.members.first().user.avatarURL() })
        fields1 = [{ name: `🔖 Tag do Discord`, value: "`" + message.mentions.members.first().user.tag + "`", inline: true },
        { name: `💻 ID do Discord`, value: "`" + message.mentions.members.first().user.id + "`", inline: true },
        { name: `📅 Conta criada há`, value: `${moment(message.mentions.members.first().user.createdAt).format("LLL")} (<t:${parseInt(message.mentions.members.first().user.createdAt / 1000)}:R>)`, inline: true },
        { name: `🌟 Entrou há`, value: `${moment(message.mentions.members.first().joinedAt).format("LLL")} (<t:${parseInt(message.mentions.members.first().joinedAt / 1000)}:R>)`, inline: true }]
        embed.addFields(fields1)


        fields2 = [
            { name: `💼 Cargos (${message.mentions.members.first().roles.cache.size})`, value: message.mentions.members.first().roles.cache.map(r => "`" + r.name + "`,").join(" ").replace(", `@everyone`,", "").replace("`@everyone`,", "`@everyone`"), inline: true },
            { name: `🛡 Permissões (${message.mentions.members.first().permissions.toArray().length})`, value: permissions, inline: false }
        ]
    }


    return message.channel.send({ embeds: [embed] }).then(async msg => {
        await msg.react("▶️")
        const filter = (reaction, user) => {
            return user.id === message.author.id;
        };
        const collector = msg.createReactionCollector({ filter, time: 120000 });

        var page = 0

        collector.on("collect", async collected => {
            if (page === 0) {
                page = 1
                await clearReactions(msg)
                embed.fields = fields2
                msg.edit({
                    embeds: [embed]
                })
                await msg.react("◀️")

            } else {
                page = 0
                await clearReactions(msg)

                embed.fields = fields1
                msg.edit({
                    embeds: [embed]
                })
                await msg.react("▶️")

            }
        })
    })
}

async function clearReactions(msg) {
    await msg.reactions.cache.map(async reaction => {
        reaction.remove().catch(err => console.error())
    })
}


module.exports.config = {
    name: 'userinfo',
    description: "Comando para ver as informações de um usuario",
    aliases: ["usuarioinfo", "user"]
}
const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, cmd) => {
    if (!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
        message.delete().catch(err => console.error)

        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve possuir a permissão `MANAGE_EMOJIS_AND_STICKERS` para utilizar este comando!")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] }).then(async msg => setTimeout(() => { msg.delete().catch(async err => console.error) }, 10000))
    }

    if (!args[0]) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve informar o emoji.")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] }).then(async msg => setTimeout(() => { msg.delete().catch(async err => console.error) }, 10000))

    }

    if (args[0].startsWith("<:") || args[0].startsWith("<a:")) {
        try {
            var url = ""
            if (args[0].startsWith("<a:")) {
                url = `https://cdn.discordapp.com/emojis/${args[0].split(':')[2].split('>')[0]}.gif`
            } else if (args[0].startsWith("<:")) {
                url = `https://cdn.discordapp.com/emojis/${args[0].split(':')[2].split('>')[0]}.png`
            }

            await client.guilds.cache.get(message.guild.id).emojis.create(url, `${args[0].split(':')[1].split('>')[0]}`).then(async success => {
                var emoji = ""
                if (success.animated === true) {
                    emoji = `<a:${success.name}:${success.id}>`
                } else {
                    emoji = `<:${success.name}:${success.id}>`
                }
                var embed = new Discord.MessageEmbed()

                    .setColor("GREEN")
                    .setDescription(`✅ | O emoji ${emoji} foi adicionado com sucesso.`)

                return message.channel.send({ content: `${message.author}`, embeds: [embed] })
            }).catch(async err => {
                var embed = new Discord.MessageEmbed()

                    .setColor("RED")
                    .setDescription(`❌ | Ocorreu um erro ao adicionar o emoji.`)

                return message.channel.send({ content: `${message.author}`, embeds: [embed] })
            })
        } catch (error) {
            console.log(error)
            var embed = new Discord.MessageEmbed()

                .setColor("RED")
                .setDescription(`❌ | Ocorreu um erro ao adicionar o emoji.`)

            return message.channel.send({ content: `${message.author}`, embeds: [embed] })
        }
    } else {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve informar o emoji.")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] }).then(async msg => setTimeout(() => { msg.delete().catch(async err => console.error) }, 10000))
    }
}


module.exports.config = {
    name: 'emoji',
    description: "Comando para adicionar um emoji",
    aliases: ["emojiadd", "addemoji"]
}
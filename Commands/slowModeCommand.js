const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, cmd) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.delete().catch(err => console.error)

        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve possuir a permissão `ADMINISTRATOR` para utilizar este comando!")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] }).then(async msg => setTimeout(() => { msg.delete().catch(async err => console.error) }, 10000))
    }

    if (!args[0]) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve informar o `COOLDOWN` em segundos")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] })
    }

    if (isNaN(args[0])) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | O `COOLDOWN` deve ser um número.")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] })
    }

    return await message.channel.setRateLimitPerUser(args[0]).then(async success => {
        if (parseInt(args[0]) === 0) {
            var embed = new Discord.MessageEmbed()

                .setColor("GREEN")
                .setDescription("✅ | Modo lento removido.")

            return message.channel.send({ content: `${message.author}`, embeds: [embed] })
        } else {
            var embed = new Discord.MessageEmbed()

                .setColor("GREEN")
                .setDescription("✅ | Modo lento definido para `" + args[0] + "` segundos.")

            return message.channel.send({ content: `${message.author}`, embeds: [embed] })
        }
    }).catch(async err => {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Ocorreu um erro ao adicionar o modo lento.")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] })
    })
}


module.exports.config = {
    name: 'slowmode',
    description: "Comando para adicionar modo lento em um canal",
    aliases: ["modolento"]
}
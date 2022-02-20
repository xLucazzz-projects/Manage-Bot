const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, cmd) => {
    if (!message.member.permissions.has("KICK_MEMBERS")) {

        message.delete().catch(err => console.error)

        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve possuir a permissão `KICK_MEMBERS` para utilizar este comando!")

        return message.channel.send({content: `${message.author}`,embeds: [embed]}).then(async msg => setTimeout(() => {msg.delete().catch(async err => console.error)}, 10000))
    }

    var member = args[0] || message.mentions.members.first()
    if (!member) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve informar um usuário.")

        return message.channel.send({content: `${message.author}`,embeds: [embed]}).then(async msg => setTimeout(() => {msg.delete().catch(async err => console.error)}, 10000))
    }

    if (message.mentions.members.first()) {
        await client.guilds.cache.get(message.guild.id).members.cache.get(message.mentions.members.first().id).kick().then(async success => {
            var embed = new Discord.MessageEmbed()

                .setColor("GREEN")
                .setDescription(`✅ | O usuário ${message.mentions.members.first().user.tag} foi expulso.`)

            return message.channel.send({content: `${message.author}`,embeds: [embed]})
        }).catch(async err => {
            var embed = new Discord.MessageEmbed()

                .setColor("RED")
                .setDescription(`❌ | Ocorreu um erro ao expulsar o usuário ${message.mentions.members.first().user.tag}.\nErr: ${err}`)

            return message.channel.send({content: `${message.author}`,embeds: [embed]})
        })
    } else {
        var member1 = client.guilds.cache.get(message.guild.id).members.cache.get(args[0])

        if (member1) {
            await member1.kick().then().then(async success => {
                var embed = new Discord.MessageEmbed()

                    .setColor("GREEN")
                    .setDescription(`✅ | O usuário ${member1.user.tag} foi expulso.`)

                return message.channel.send({content: `${message.author}`,embeds: [embed]})
            }).catch(async err => {
                var embed = new Discord.MessageEmbed()

                    .setColor("RED")
                    .setDescription(`❌ | Ocorreu um erro ao expulsar o usuário ${member1.user.tag}.\nErr: ${err}`)

                return message.channel.send({content: `${message.author}`,embeds: [embed]})
            })
        } else {
            var embed = new Discord.MessageEmbed()

                .setColor("RED")
                .setDescription(`❌ | Não foi possível localizar o usuário informado.`)

            return message.channel.send({content: `${message.author}`,embeds: [embed]})
        }
    }
}


module.exports.config = {
    name: 'kick',
    description: "Comando para expulsar um usuário",
    aliases: ["kickar", "expulsar"]
}
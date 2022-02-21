const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, cmd) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.delete().catch(err => console.error)

        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve possuir a permissão `ADMINISTRATOR` para utilizar este comando!")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] }).then(async msg => setTimeout(() => { msg.delete().catch(async err => console.error) }, 10000))
    }

    if (!message.mentions.roles.first()) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve mencionar um cargo!")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] })
    }

    if (!message.mentions.roles.first().editable) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Eu não tenho permissão para remover o cargo mencionado.")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] })
    }

    var effect = 0
    await message.guild.members.cache.map(async member => {
        effect++
        member.roles.remove(message.mentions.roles.first().id).catch(err => console.error)

        if (effect === message.guild.members.cache.size) {
            var embed = new Discord.MessageEmbed()

                .setColor("GREEN")
                .setDescription(`✅ | Cargo removiido de **${effect}** membros.`)

            return message.channel.send({ content: `${message.author}`, embeds: [embed] })
        }
    })
}


module.exports.config = {
    name: 'unroleall',
    description: "Comando para remover um cargo de todos os membros",
    aliases: ["rolerem", "remcargo"]
}
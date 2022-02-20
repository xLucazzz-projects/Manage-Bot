const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, cmd) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.delete().catch(err => console.error)

        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve possuir a permissão `ADMINISTRATOR` para utilizar este comando!")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] }).then(async msg => setTimeout(() => { msg.delete().catch(async err => console.error) }, 10000))
    }

    return await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true }).then(async success => {
        var embed = new Discord.MessageEmbed()

            .setColor("GREEN")
            .setDescription("✅ | Canal aberto com sucesso.")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] })
    }).catch(async err => {
        var embed = new Discord.MessageEmbed()

            .setColor("GREEN")
            .setDescription("❌ | Ocorreu um erro ao reabrir o canal.")

        return message.channel.send({ content: `${message.author}`, embeds: [embed] })
    })
}


module.exports.config = {
    name: 'unlock',
    description: "Comando para destrancar um canal",
    aliases: ["destrancar", "abrir", "reabrir"]
}
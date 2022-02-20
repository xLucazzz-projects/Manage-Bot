const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, cmd) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.delete().catch(err => console.error)

        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve possuir a permissão `ADMINISTRATOR` para utilizar este comando!")

        return message.channel.send({content: `${message.author}`,embeds: [embed]}).then(async msg => setTimeout(() => {msg.delete().catch(async err => console.error)}, 10000))
    }

    if (!args[0]) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | Você deve possuir informar a `QUANTIDADE DE MENSAGENS` que serão excluidas.")

        return message.channel.send({content: `${message.author}`,embeds: [embed]})
    }

    if (isNaN(args[0])) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | A `QUANTIDADE DE MENSAGENS` deve ser um número.")

        return message.channel.send({content: `${message.author}`,embeds: [embed]})
    }

    if (args[0] > 100) {
        var embed = new Discord.MessageEmbed()

            .setColor("RED")
            .setDescription("❌ | A `QUANTIDADE DE MENSAGENS` deve ser `MENOR QUE 100`.")

        return message.channel.send({content: `${message.author}`,embeds: [embed]})
    }

    await message.channel.bulkDelete(args[0]).then(async success => {
        var embed = new Discord.MessageEmbed()

            .setColor("GREEN")
            .setDescription("✅ | Foram deletadas `" + args[0] + "` mensagens.")

        return message.channel.send({content: `${message.author}`,embeds: [embed]})
    }).catch(async err => {
        var embed = new Discord.MessageEmbed()

            .setColor("GREEN")
            .setDescription("❌ | Ocorreu um erro ao deletar as mensagens.")

        return message.channel.send({content: `${message.author}`,embeds: [embed]})
    })

}


module.exports.config = {
    name: 'clear',
    description: "Comando para deletar mensagens em massa",
    aliases: ["limpar"]
}
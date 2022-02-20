const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, cmd) => {
    var embed = new Discord.MessageEmbed()

        .setColor("AQUA")
        .setDescription(`**Lista de Comandos**\n\n${client.command_list}`)

    return message.channel.send({ embeds: [embed] })

}


module.exports.config = {
    name: 'help',
    description: "Comando de ajuda",
    aliases: ["ajuda", "comandos", "commands"]
}
const Discord = require("discord.js");
const moment = require('moment')
moment.locale("pt-br")

module.exports.run = async (client, message, args, prefix, cmd) => {

    var embed = new Discord.MessageEmbed()

        .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL()})
        .setColor("#7289da")
        .setThumbnail(message.guild.iconURL())
        .addField(`💻 ID`, message.guild.id, true)
        .addField(`👑 Dono`, "`" + client.guilds.cache.get(message.guild.id).members.cache.get(message.guild.ownerId).user.tag + "` (" + client.guilds.cache.get(message.guild.id).members.cache.get(message.guild.ownerId).user.id + ")", true)
        .addField(`📅 Criado em`, `${moment(parseInt(message.guild.createdTimestamp)).format("LLL")}`, true)
        .addField(`🌟 Entrei aqui em`, `${moment(parseInt(message.guild.joinedTimestamp)).format("LLL")}`, true)
        .addField(`💬 Canais `, `**📝 Texto: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}\n🗣 Voz: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}**`, true)
        .addField(`👥 Membros (${message.guild.members.cache.size})`, `**👥 Usuários: ${message.guild.members.cache.filter((m) => !m.user.bot).size}\n🤖 Robôs: ${message.guild.members.cache.filter((m) => m.user.bot).size}**`, true)

    return message.channel.send({embeds: [embed]})
}


module.exports.config = {
    name: 'server',
    description: "Comando para ver as informações do servidor",
    aliases: ["serverinfo", "svinfo"]
}
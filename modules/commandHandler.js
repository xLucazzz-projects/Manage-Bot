const fs = require('fs')
const Discord = require('discord.js')
const colors = require('colors')

async function startCMHandler(client) {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();

    fs.readdir(`./Commands/`, (err, files) => {
        if (err) return console.log("Comando não encontrado.")
        console.log(colors.cyan("\n[Info] ") + "Importação dos comandos iniciada!\n")

        var jsfile = files.filter(f => f.split(".").pop() === "js")
        jsfile.forEach((f, i) => {
            let pull = require(`../Commands/${f}`)
            client.commands.set(pull.config.name, pull);

            console.log(colors.red('-> ') + ('O comando ' + colors.green(f) + ' foi carregado com sucesso.'))
            if (err) console.log(colors.red('-> ') + 'O comando ' + colors.red(f) + ' não foi carregado com sucesso.')

            if (client.command_list) {
                client.command_list = client.command_list + "> `" + pull.config.name + "` -> `" + pull.config.description + "`\n"
            } else {
                client.command_list = "> `" + pull.config.name + "` -> `" + pull.config.description + "`\n"
            }
            pull.config.aliases.forEach(alias => {
                client.aliases.set(alias, pull.config.name)
            });
        });
    });
}

module.exports = { startCMHandler }
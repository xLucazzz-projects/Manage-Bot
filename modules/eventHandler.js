const fs = require('fs')
const colors = require('colors')

async function startEVHandler(client) {
    fs.readdir(`./Events/`, (err, files) => {
        if (err) return console.log("Evento não encontrado.")
        console.log(colors.cyan("\n[Info] ") + "Importação dos eventos iniciada!\n")

        var jsfile = files.filter(f => f.split(".").pop() === "js")
        jsfile.forEach((f, i) => {
            console.log(colors.red('-> ') + ('O evento ' + colors.green(f) + ' foi carregado com sucesso.'))
            if (err) console.log(colors.red('-> ') + 'O evento ' + colors.red(f) + ' não foi carregado com sucesso.')

            var event = require(`../Events/${f}`)
            var eventName = f.split('.js')[0]
            client.on(eventName, event.bind(null, client))
        });
    });
}

module.exports = { startEVHandler }
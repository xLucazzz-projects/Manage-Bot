# Manage Bot

Um bot de Discord simples feito utilizando <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>

## Instalação

```bash
npm install
```

## Configurações

```
config.bot.token                                    => Token de Autenticação do Bot
config.bot.prefix                                   => Prefixo utilizado nos comandos

config.functions.join-leave-message.join_channel    => ID do canal que serão enviadas as Logs de Entrada
config.functions.join-leave-message.leave_channel   => ID do canal que serão enviadas as Logs de Saída

config.functions.anti_invite.roles_permission       => Lista de ID's dos cargos autorizados

config.functions.autor_role.role_id                 => ID do cargo que será adicionado

config.functions.twitch_notify.twitch_client_id     => Client Secret da aplicação da Twitch.tv 
config.functions.twitch_notify.twitch_client_secret => Client Secret da aplicação da Twitch.tv 
config.functions.twitch_notify.channel_notify       => ID do canal que será notificado
config.functions.twitch_notify.twitch_channels      => Lista de canais que serão notificados

config.functions.log_events.channel_id              => ID do canal que serão enviadas as Logs
```

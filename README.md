# Manage Bot

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>

## Funções

- Auto-Role
- Anti-Invite
- Twitch Live Stream Notify
- Audit Logs
- Manage Commands
- Random Status
- Command Handler
- Event Handler
- Members Counter

## Instalação

```bash
npm install
```

## Configurações

- `bot`
  - `token`: Your Steam account name
  - `prefix`: Your Steam password
- `functions`
  - `commands`
    - `channel`: ID do canal que os comandos serão executados (utilize `null` para não utilizar um canal específico)
  - `members_count`
    - `channel_id`: ID do canal que será atualizado a quantidade de membros
  - `rich_presence`
    - `update_cooldown`: Cooldown em MS para a atualização do Status
    - `status`: Lista de Status
  - `join-leave`
    - `join_channel`: ID do canal que serão enviadas as Logs de Entrada
    - `leave_channel`: ID do canal que serão enviadas as Logs de Saída
  - `anti_invite`
    - `roles_permission`: Lista de ID's dos cargos autorizados
  - `auto_role`
    - `role_id`: ID do cargo que será adicionado
  - `twitch_notify`
    - `twitch_client_id`: Client ID da aplicação da Twitch.tv 
    - `twitch_client_secret`: Client Secret da aplicação da Twitch.tv 
    - `channel_notify`: ID do canal que será notificado
    - `twitch_channels`: Lista de canais que serão notificados
  - `log_events`
    - `channel_id`: ID do canal que serão enviadas as Logs

<center>Feito com ❤️ por xLucazzz</center>

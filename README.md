# onebot-open-source

ONEBot, but open source :grin:

Prerequisites:
Node.js v16.9.0+
discord.js v14
I probably missed something - if you get an error, just run npm install `whatever`

# Installation

###### oh the joys

clone and install dependencies
```bash
$ git clone https://github.com/1TV-IE/onebot-open-source.git
$ npm install
```

make le config.json file, should look something like this:
```json
{
    "token": "discord-bot-token",
    "clientId": "bot-user-id",
    "guildId": "bot-guild-id",
    "serverInviteCode": "bot-server-invite-code"
}
```

deploy the commands and run!

```bash
$ npm deploy
...
$ npm start
```

yay it should work

if it doesn't (internal screaming occurs), send me an email or DM me on le discord

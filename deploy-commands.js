const fs = require('fs/promises');
const path = require('node:path');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commandsPath = path.join(__dirname, 'commands');
const commands = [];
fs.readdir(commandsPath)
  .then((files) => {
    files
      .filter((file) => path.extname(file) === '.js')
      .forEach((file) => {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command);
      });
  })
  .catch(console.error);

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  console.log('Refreshing application (/) commands...');

  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands
    });
    console.log('Successfully refreshed application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

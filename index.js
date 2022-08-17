const { readFile, readdir } = require('fs/promises');
const path = require('node:path');

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

readFile('schedule.txt')
  .then((data) => console.log(`Fetched data:\n${data.toString()}`))
  .catch(console.error);

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');

readdir(commandsPath)
  .then((files) => {
    files
      .filter((file) => path.extname(file) === '.js')
      .forEach((file) => {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
      });
  })
  .catch(console.error);

client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: 'ONE - https://one-tv.co.uk' }],
    status: 'dnd'
  });
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    if ((command = client.commands.get(interaction.commandName))) {
      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        await interaction.reply({
          content: 'An error occurred while executing the command.',
          ephemeral: true
        });
      }
    }
  }
});

client.login(token);

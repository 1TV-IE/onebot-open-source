const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('node:fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

const commands = [
	new SlashCommandBuilder().setName('pong').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('test').setDescription('Replies with test info!'),
	new SlashCommandBuilder().setName('ping').setDescription('Replies with the ping to NBC (new broadcasting centre)'),
	new SlashCommandBuilder().setName('schedule').setDescription('Replies with the newest schedule'),
	new SlashCommandBuilder().setName('invite').setDescription('Get an invite to join our server.'),
	new SlashCommandBuilder().setName('botinvite').setDescription('Invite this bot!'),
]

	.map(command => command.toJSON());

// Place your client and guild ids here
const clientId = '';
const guildId = '';


const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

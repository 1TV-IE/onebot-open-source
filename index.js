// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
var fs = require("fs");
// Asynchronous read
fs.readFile('input.txt', function (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log("Fetched data: " + data.toString());
});

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
        console.log('Ready!');
        client.user.setPresence({ activities: [{ name: 'ONE - https://one-tv.co.uk' }], status: 'dnd' });
});
//normal cmds
const exampleEmbed = new MessageEmbed()
	.setColor('#009cfa')
	.setTitle('Somehow embeds also work')
	.setURL('')
	.setAuthor({ name: '', iconURL: '', url: '' })
	.setDescription('This runs on INSERT SERVER HERE - so expect a lot of downtime lmao')
	.setThumbnail('')
	.setImage('')
	.setTimestamp()
	.setFooter({ text: 'ONE', iconURL: 'https://images-ext-1.discordapp.net/external/l0yPv28Wx8nmBknv8TGDyYtP23WsjmCtqmAMgLDIplo/https/pbs.twimg.com/profile_images/1513271977703878660/sJnJodt1_400x400.jpg' });
 //slash cmds
 
client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
 
        const { commandName } = interaction;
 
        if (commandName === 'pong') {
                await interaction.reply({ content: 'Pong!', ephemeral: true });
        } else if (commandName === 'server') {
                await interaction.reply({ content:`{Server name: ${interaction.guild.name}nTotal members: ${interaction.guild.memberCount}`, ephemeral: true });
        } else if (commandName === 'user') {
                await interaction.reply({ content:'it is 11 pm, will code soon', ephemeral: true});
        } else if (commandName === 'test') {
			    await interaction.reply({ephemeral: true, embeds: [exampleEmbed]});
		} else if (commandName === 'ping') {
			const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: true });
interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
		} else if (commandName === 'schedule') {
			var data = fs.readFileSync('input.txt');
console.log("Fetched Schedule: " + data.toString());
const schedule = new MessageEmbed()
	.setColor('#009cfa')
	.setTitle('Program Schedule')
	.setURL('')
	.setAuthor({ name: '', iconURL: '', url: '' })
	.setDescription('Current schedule:' + data.toString())
	.setThumbnail('')
	.setImage('')
	.setFooter({ text: 'ONE', iconURL: 'https://images-ext-1.discordapp.net/external/l0yPv28Wx8nmBknv8TGDyYtP23WsjmCtqmAMgLDIplo/https/pbs.twimg.com/profile_images/1513271977703878660/sJnJodt1_400x400.jpg' });
			const sent = await interaction.reply({ content: '<a:loading:997111113734959134> Checking...', fetchReply: true, ephemeral: true });
			await wait(2000);
			await interaction.editReply({ content: 'Done!', ephemeral: true, embeds: [schedule]});
        } else if (commandName === 'invite') {
			await interaction.reply({ content:'https://discord.gg/insert invite here', ephemeral: true});
		} else if (commandName === 'botinvite') {
			await interaction.reply({ content:'https://discord.com/insert link here', ephemeral: true});
		}
});


client.login(token);

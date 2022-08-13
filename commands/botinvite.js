const { SlashCommandBuilder } = require('@discordjs/builders')
const { clientId } = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinvite')
    .setDescription('Get the bot invite'),
  async execute(interaction) {
    await interaction.reply({
      content: `Bot invite: https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`,
      ephemeral: true
    })
  }
}

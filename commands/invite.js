const { SlashCommandBuilder } = require('@discordjs/builders')
const { serverInviteCode } = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Get the server invite'),
  async execute(interaction) {
    await interaction.reply({
      content: `https://discord.gg/${serverInviteCode}`,
      ephemeral: true
    })
  }
}

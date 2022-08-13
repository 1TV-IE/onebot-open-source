const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pong')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply({ content: 'Pong!', ephemeral: true });
  }
};

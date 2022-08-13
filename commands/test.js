const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command'),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor('#009cfa')
      .setTitle('Somehow embeds also work')
      .setDescription(`This runs on a VPS now so don't expect much downtime`)
      .setTimestamp()
      .setFooter({
        text: 'ONE',
        iconURL:
          'https://images-ext-1.discordapp.net/external/l0yPv28Wx8nmBknv8TGDyYtP23WsjmCtqmAMgLDIplo/https/pbs.twimg.com/profile_images/1513271977703878660/sJnJodt1_400x400.jpg'
      })
    await interaction.reply({ embeds: [exampleEmbed] })
  }
}

const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { readFile } = require('fs/promises');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Get the programming schedule for ONE'),
  async execute(interaction) {
    const msg = await interaction.reply({
      content: '<a:loading:997111113734959134> Checking...',
      fetchReply: true
    });
    const schedule = await readFile('./schedule.txt');
    const embed = new EmbedBuilder()
      .setColor(0x009cfa)
      .setTitle('Program Schedule')
      .setDescription(schedule.toString())
      .setFooter({
        text: 'ONE',
        iconURL:
          'https://images-ext-1.discordapp.net/external/l0yPv28Wx8nmBknv8TGDyYtP23WsjmCtqmAMgLDIplo/https/pbs.twimg.com/profile_images/1513271977703878660/sJnJodt1_400x400.jpg'
      });
    await interaction.editReply({
      content: 'Done!',
      embeds: [embed],
      ephemeral: true
    });
  }
};

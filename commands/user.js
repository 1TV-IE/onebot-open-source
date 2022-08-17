const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with your user information'),
  async execute(interaction) {
    const member = interaction.member;
    const user = member.user;
    const avatar = user.avatarURL({
      format: 'png',
      dynamic: true,
      size: 512
    });
    const embed = new EmbedBuilder()
      .setTitle(`User info: ${user.tag}`)
      .setColor(member.roles.highest.color)
      .setAuthor({ name: user.tag, iconURL: avatar })
      .setThumbnail(avatar)
      .setTimestamp()
      .addFields(
        { name: 'ID', value: user.id, inline: true },
        {
          name: 'User created at',
          value: user.createdAt.toLocaleString(),
          inline: true
        },
        {
          name: 'Joined at',
          value: member.joinedAt.toLocaleString(),
          inline: true
        },
        {
          name: 'Roles',
          value:
            member.roles.cache
              .map((r) => r)
              .join(', ')
              .replace('@everyone', '')
              .slice(0, -2) || 'None',
          inline: true
        },
        {
          name: 'Permissions',
          value: member.permissions
            .toArray()
            .map((p) =>
              p.match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g).join(' ')
            )
            .join(', ')
            .slice(0, -1)
        }
      );
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};

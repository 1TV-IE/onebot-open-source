const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinvite")
        .setDescription("Get the bot invite"),
    async execute(interaction) {
        await interaction.reply({
            content: "https://discord.com/insert invite here",
            ephemeral: true,
        });
    },
};

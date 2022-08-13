const { readFile, readdir } = require("node:fs");
const path = require("node:path");

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.schedule = readFile("schedule.txt", function (err, data) {
    if (err) {
        return console.error(err);
    } else {
        const stringData = data.toString();
        console.log("Fetched data: " + stringData);
        return stringData;
    }
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");

readdir(commandsPath, (err, files) => {
    if (err) {
        return console.error(err);
    } else {
        files
            .filter((file) => path.extname(file) === ".js")
            .forEach((file) => {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                client.commands.set(command.data.name, command);
            });
    }
});

client.once("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setPresence({
        activities: [{ name: "ONE - https://one-tv.co.uk" }],
        status: "dnd",
    });
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        if ((command = client.commands.get(interaction.commandName))) {
            try {
                await command.execute(interaction);
            } catch (err) {
                console.error(err);
                await interaction.reply({
                    content: "An error occurred while executing the command.",
                    ephemeral: true,
                });
            }
        }
    }
});

client.login(token);

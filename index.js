const { Client, GatewayIntentBits, Partials, Collection,EmbedBuilder} = require('discord.js');

const {Guilds, GuildMembers, GuildMessages,MessageContent,GuildMessageReactions} = GatewayIntentBits;
const {User, Message, GuildMember,ThreadMember, Channel,SendMessages} = Partials;

const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');



const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages,MessageContent,GuildMessageReactions],
    partials: [User, Message, GuildMember, ThreadMember,SendMessages, Channel],
});

client.commands = new Collection();
client.config = require('../WitherCode/BotConfig/config.json');

client.login(client.config.Token).then(() => {
    loadEvents(client);
    loadCommands(client);
});


client.on("error", (err) => {
    handleError("Błąd Discord API:", err);
});

process.on("unhandledRejection", (reason, p) => {
    handleError("Niezłapane odrzucenie obietnicy:", reason);
});

process.on("uncaughtException", (err, origin) => {
    handleError("Niezłapany wyjątek:", err);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
    handleError("Monitor niezłapanego wyjątku:", err);
});

process.on("warning", (warn) => {
    handleError("Ostrzeżenie:", warn);
});

function handleError(message, error) {
    const ChannelID = "1264160222570610742";
    console.log(message, error);
    const Embed = new EmbedBuilder()
        .setColor("Aqua")
        .setTimestamp()
        .setFooter({ text: "⚠️ System anty-crash" })
        .setTitle("Wystąpił błąd")
        .setFooter(({ text: "WitherCode - AntyCrash" }));
    const Channel = client.channels.cache.get(ChannelID);
    if (!Channel) return;
    Channel.send({
        embeds: [
            Embed.setDescription(
                `**${message}\n\n** \`\`\`${error}\`\`\``
            ),
        ],
    });
}

module.exports = client;
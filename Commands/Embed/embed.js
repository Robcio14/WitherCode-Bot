// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Wysyła wiadomość jako bot')
        .addBooleanOption(option => option.setName('embed').setDescription('Użyj embeda').setRequired(true))
        .addStringOption(option => option.setName('text').setDescription('Tekst do wysłania').setRequired(true))
        .addStringOption(option => option.setName('title').setDescription('Tytuł dla embeda'))
        .addStringOption(option => option.setName('image').setDescription('Adres URL obrazu dla embeda'))
        .addStringOption(option => option.setName('footer').setDescription('Stopka dla embeda')),
    async execute(interaction) {
        const embedOption = interaction.options.getBoolean('embed');
        const textOption = interaction.options.getString('text');
        const titleOption = interaction.options.getString('title');
        const imageOption = interaction.options.getString('image');
        const footerOption = interaction.options.getString('footer');

        const embed = new EmbedBuilder()
            .setTitle(titleOption)
            .setDescription(textOption)
            .setColor("#0000FF");

        if (imageOption) {
            embed.setImage(imageOption);
        }

        const footerObject = {};

        if (footerOption) {
            footerObject.text = footerOption;
            footerObject.iconURL = interaction.guild.iconURL();
        } else {
            footerObject.text = `WitherCode -> Twój serwer code  | ${new Date().toISOString()}`;
            footerObject.iconURL = interaction.guild.iconURL();
        }

        embed.setFooter(footerObject);

        if (embedOption) {
            interaction.reply({ embeds: [embed] });
        } else {
            interaction.reply({ content: textOption });
        }
    },
};

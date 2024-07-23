// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weryfikacja')
        .setDescription('Ustaw kanał weryfikacji')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Wysyłanie weryfikacji na podany kanał')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        const verifyEmbed = new EmbedBuilder()
            .setTitle("Akceptacja Regulaminu")
            .setDescription(`
            > Kliknij w przycisk poniżej, jeśli zapoznaleś się z regulaminem obowiązującymi na serwerze,
            > **WitherCode**. Po kliknięciu otrzymasz pełny dostęp do korzystania z serwera Discord.`)
            .setColor("#0000FF")
            .setFooter({ text: "WitherCode - Weryfikacja" })
        let sendChannel = channel.send({
            embeds: [verifyEmbed],
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('• Zapoznałem się z zasadami, wchodzę!').setStyle(ButtonStyle.Success),
                ),
            ],
        });

        if (!sendChannel) {
            return interaction.reply({ content: 'Wystąpił błąd, spróbuj ponownie później.', ephemeral: true });
        } else {
            return interaction.reply({ content: 'Pomyślnie ustawiono kanał weryfikacji!', ephemeral: true });
        }
    },
};

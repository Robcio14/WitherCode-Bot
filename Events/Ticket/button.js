// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|



const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
const DISCORD_INVITE_LINK = 'https://discord.gg/Utf8kK4B';




module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) {
            return;
        }

        try {
            if (interaction.customId === 'zamknij') {
                const ticketChannel = interaction.channel;

                const author = interaction.user;
                if (author) {
                    // Tworzenie embeda
                    const embed = new EmbedBuilder()
                        .setTitle('Ticket Zamknięty ')
                        .setDescription(`
                         Twój ticket na serwerze WitherCode został zamknięty.
                         Jednak mamy nadzieję, że pomogliśmy rozwiązać twój problem.
          
                         Kontakt znajdziesz do nas na:
                         Discord: [Kliknij tutaj](${DISCORD_INVITE_LINK})
                        \`Dziękujemy za kontakt i życzymy miłej gry!\`
            `)
                        .setColor('#0000FF')
                        .setFooter({ text: "WitherCode - Ticket" })

                    // Wysłanie embeda na prywatną wiadomość użytkownika
                    await author.send({ embeds: [embed] });

                    // Usunięcie kanału
                    await ticketChannel.delete();
                }
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas obsługi interakcji:', error);
            await interaction.reply({ content: 'Wystąpił błąd podczas przetwarzania twojej interakcji.' });
        }
    }
}

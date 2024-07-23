const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tickety')
        .setDescription('Wysyła tickety')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Kanał, na który mają być wysłane tickety')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: 'Nie masz uprawnień do wykonania tej komendy!',
                ephemeral: true,
            });
        }

        const channel = interaction.options.getChannel('channel');

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('ticket')
                .setMaxValues(1)
                .setPlaceholder('Dokonaj wyboru')
                .addOptions([
                    {
                        label: 'Discord Bot',
                        value: 'discord_bot',
                        description: 'Kliknij, jeśli chcesz kupić bota.',
                    },
                    {
                        label: 'Grafiki',
                        value: 'grafiki',
                        description: 'Kliknij, jeśli chcesz kupić grafikę.',
                    },
                    {
                        label: 'Pluginy',
                        value: 'pluginy',
                        description: 'Kliknij, jeśli chcesz zakupić plugin ',
                    },
                    {
                        label: 'Skrypty',
                        value: 'skrypty',
                        description: 'Kliknij, jeśli chcesz kupić skrypt.',
                    },
                ])
        );

        const embed = new EmbedBuilder()
            .setTitle('`\uD83D\uDCDC` Tickety')
            .setDescription(`
                Witaj, jeżeli potrzebujesz pomocy od naszego zespołu administracji, to wybierz interesującą ciebie kategorię!

                Cierpliwość. Prosimy cierpliwie czekać, nie tylko ty czekasz na pomoc. Maksymalny czas na sprawdzenie zgłoszenia to 48h!
          
                Zarząd. Nie oznaczaj zarządu (Zarządu/Administracji). Jedyne osoby, które mogą oznaczać zarząd to administracja! 

                Wybierz kategorię, która cię interesuje.
            `)
            .setColor('#0000FF')
            .setFooter({ text: "WitherCode - Ticket" });

        await channel.send({
            embeds: [embed],
            components: [row],
        });

        interaction.reply({
            content: 'Wysłałeś tickety!',
            ephemeral: true,
        });
    },
};

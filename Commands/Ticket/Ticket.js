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
                        description: 'Kliknij, jeśli chcesz kupić bota na swój serwer,wybierz tą obcję',
                    },
                    {
                        label: 'Grafiki',
                        value: 'grafiki',
                        description: 'Kliknij, jeśli chcesz kupić grafikę,wybierz tą obcję',
                    },
                    {
                        label: 'Pluginy Minecraft',
                        value: 'pluginy',
                        description: 'Kliknij, jeśli chcesz zakupić plugin na swój serwer,wybierz tą obcję',
                    },
                    {
                        label: 'Skrypty',
                        value: 'skrypty',
                        description: 'Kliknij, jeśli chcesz kupić skrypt na swój serwer, wybierz tą obcję',
                    },
                    {
                        label: 'Pomoc',
                        value:'pomoc',
                        description: 'Kliknij jeżeli potrzebujesz pomocy, wybierz tą obcję'
                    },
                    {
                        label:"Serwery Discord",
                        value:"dc",
                        description: "Kliknij, jeśli chcesz kupić,wybierz tą obcję "
                    }

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

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("cennik")
        .setDescription("Wysyła cennik na kanał"),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: 'Nie masz uprawnień do wykonania tej komendy!',
                ephemeral: true,
            });
        }
        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('cennik')
                .setMaxValues(1)
                .setPlaceholder('Dokonaj wyboru')
                .addOptions([
                    {
                        label: 'Discord Bot',
                        value: 'discord_bot',
                        description: 'Kliknij, jeśli chcesz poznać cenę tego produktu ,wybierz tą obcję',
                    },{
                        label: 'Grafiki',
                        value: 'grafiki',
                        description: 'Kliknij, jeśli chcesz poznać cenę tego produktu ,wybierz tą obcję',
                    },
                    {
                        label: 'Pluginy Minecraft',
                        value: 'plugins',
                        description: 'Kliknij, jeśli chcesz poznać cenę tego produktu ,wybierz tą obcję',
                    },
                    {
                        label: 'Skrypty',
                        value: 'skrypt',
                        description: 'Kliknij, jeśli chcesz poznać cenę tego produktu ,wybierz tą obcję',
                    },
                    {
                        label: 'Serwery Discord',
                        value: 'serwdc',
                        description: 'Kliknij, jeśli chcesz poznać cenę tego produktu ,wybierz tą obcję',
                    }

                ])
        );
        const embed = new EmbedBuilder()
            .setTitle('`\uD83D\uDCDC` Cennik')
            .setDescription(`
                Jak złożyć zamówienie?

                Aby złożyć zamówienie, udaj się na kanał https://discord.com/channels/1264160218766512220/1264160220876378189, a następnie utwórz ticketa i napisz co chciałbyś zamówić.

                   Nasze oferty:
                   Boty Discord
                   Serwery Discord
                   Grafiki
                   Pluginy Minecraft
                   Skrypty

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


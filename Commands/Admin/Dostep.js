// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');

const roleId = '1264160219123023884';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dostep')
        .setDescription('Nadaj rolę zweryfikowany użytkownikowi')
        .addUserOption(option =>
            option.setName('użytkownik')
                .setDescription('Użytkownik, który otrzyma rolę')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply('Nie masz uprawnień do użycia tej komendy.');
        }

        if (!roleId) {
            return interaction.reply('ID roli "zweryfikowany" nie zostało zdefiniowane.');
        }

        const user = interaction.options.getUser('użytkownik');
        const member = await interaction.guild.members.fetch(user.id);

        try {
            await member.roles.add(roleId);
            interaction.reply(`Nadano rolę "zweryfikowany" użytkownikowi ${user.tag}.`);
        } catch (error) {
            console.error('Błąd podczas nadawania roli:', error);
            interaction.reply('Wystąpił błąd podczas nadawania roli.');
        }
    },
};

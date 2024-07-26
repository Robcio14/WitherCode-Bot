// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require("discord.js");
const { Dostep } = require(`${process.cwd()}/BotConfig/config.json`);
const { zweryfikowany } = Dostep;

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


        const roleId = zweryfikowany;


        if (!roleId) {
            return interaction.reply('Rola "zweryfikowany" nie została zdefiniowana w konfiguracji.');
        }


        const user = interaction.options.getUser('użytkownik');
        const member = await interaction.guild.members.fetch(user.id);


        await member.roles.add(roleId);
        interaction.reply(`Nadano rolę "zweryfikowany" użytkownikowi ${user.tag}.`);
    },
};

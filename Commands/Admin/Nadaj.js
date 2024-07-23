const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nadaj')
        .setDescription('Nadaj rolę użytkownikowi')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption((option) =>
            option
                .setName('osoba')
                .setDescription('Podaj osobę, której chcesz nadać rolę')
                .setRequired(true)
        )
        .addRoleOption((option) =>
            option
                .setName('rola')
                .setDescription('Podaj rolę, którą chcesz nadać')
                .setRequired(true)
        ),
    async execute(interaction) {
        const osoba = interaction.options.getMember('osoba'),
            rola = interaction.options.getRole('rola'),
            najwyzszaRolaWysylajacego = interaction.member.roles.highest;

        if (!osoba || !rola) {
            return interaction.reply({
                content: 'Niepoprawne użycie!',
                ephemeral: true,
            });
        }

        if (najwyzszaRolaWysylajacego.position <= rola.position) {
            return interaction.reply({
                content:
                    'Nie możesz nadać roli wyższej lub równej twojej najwyższej roli!',
                ephemeral: true,
            });
        }

        try {
            await osoba.roles.add(rola);
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'Wystąpił błąd podczas nadawania roli.',
                ephemeral: true,
            });
        }

        const embed = new EmbedBuilder()
            .setDescription(
                'Zaaktualizowano rolę dla: ' + osoba + ' na rolę ' + rola
            )
            .setColor('#7606ff')
            .setFooter(({ text: "WitherCode" }))
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

        return interaction.reply({ embeds: [embed] });
    },
};

// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { DropRole } = require(`${process.cwd()}/BotConfig/config.json`);
const { znizka5id, znizka10id, znizka15id, znizka20id } = DropRole;

const cooldowns = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drop_standard')
        .setDescription('Losuj zniżki dla użytkowników premium'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const cooldownTime = 6 * 60 * 60 * 1000;
        const now = Date.now();

        if (cooldowns.has(userId)) {
            const lastUsed = cooldowns.get(userId);
            if (now - lastUsed < cooldownTime) {
                const remainingTime = ((cooldownTime - (now - lastUsed)) / (60 * 60 * 1000)).toFixed(2);
                return interaction.reply({
                    content: `Musisz poczekać ${remainingTime} godzin przed ponownym użyciem tej komendy.`,
                    ephemeral: true,
                });
            }
        }

        cooldowns.set(userId, now);


        const discount = getRandomDiscount([5, 10, 15, 20, null], [0.02, 0.02, 0.02, 0.02, 0.92]);

        if (discount !== null) {
            const roleId = getRoleId(discount);
            if (!roleId) {
                return interaction.reply({
                    content: 'Nie można znaleźć odpowiedniej roli dla tej zniżki.',
                    ephemeral: true,
                });
            }

            const member = await interaction.guild.members.fetch(userId);
            await member.roles.add(roleId);

            const discountEmbed = new EmbedBuilder()
                .setTitle('Gratulacje!')
                .setDescription(`Otrzymujesz zniżkę **${discount}%**!`)
                .setColor('#00FF00')

                .setFooter({ text: 'WitherCode - Zniżki' });

            return interaction.reply({ embeds: [discountEmbed] });
        } else {
            const noDiscountEmbed = new EmbedBuilder()
                .setTitle('Niestety...')
                .setDescription('Spróbuj ponownie następnym razem!')
                .setColor('#FF0000')
                .setFooter({ text: 'WitherCode - Zniżki' });

            return interaction.reply({ embeds: [noDiscountEmbed] });
        }
    },
};

function getRandomDiscount(discounts, probabilities) {
    const rand = Math.random();
    let cumulative = 0;

    for (let i = 0; i < discounts.length; i++) {
        cumulative += probabilities[i];
        if (rand < cumulative) {
            return discounts[i];
        }
    }

    return null;
}

function getRoleId(discount) {
    switch (discount) {
        case 5:
            return znizka5id;
        case 10:
            return znizka10id;
        case 15:
            return znizka15id;
        case 20:
            return znizka20id;
        default:
            return null;
    }
}

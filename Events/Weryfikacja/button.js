// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|


const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        const { customId } = interaction;

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                return interaction.reply({ content: "Nieznane polecenie" });
            }
            command.execute(interaction, client);
        } else if (interaction.isButton()) {
            if (customId == "verify") {
                const modal = new ModalBuilder()
                    .setCustomId('verifyModal')
                    .setTitle('Verification');

                const additionQuestion = new TextInputBuilder()
                    .setCustomId('additionQuestion')
                    .setLabel('Ile to jest  2 + 4?')
                    .setStyle(TextInputStyle.Short);

                const firstActionRow = new ActionRowBuilder().addComponents(additionQuestion);

                modal.addComponents(firstActionRow);

                await interaction.showModal(modal);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId === 'verifyModal') {
                const additionAnswer = interaction.fields.getTextInputValue('additionQuestion');

                if (additionAnswer === '6') {
                    const role = interaction.guild.roles.cache.get("1264160219123023882");
                    return interaction.member.roles.add(role).then((member) =>
                        interaction.reply({
                            content: `Zostałeś zweryfikowany i otrzymałeś rolę ${role}`,
                            ephemeral: true,
                        })
                    );
                } else {
                    await interaction.reply({ content: 'Weryfikacja się nie powiodła. Spróbuj puźniej.', ephemeral: true });
                }
            }
        }
    },
};

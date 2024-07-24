module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const {customId, guild, user} = interaction;
        if (!interaction.isStringSelectMenu()) {
            return;
        }
        if (customId === "cennik") {
            if (interaction.values[0] === '') {
            }
        }
    }}
// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { sendUnbanLog } = require("../../Events/Logs/unbanlogs"); // Import funkcji z logger.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Odbanowuje użytkownika na serwerze.")
        .addStringOption((option) =>
            option.setName("user_id").setDescription("ID użytkownika, którego chcesz odbanować.").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("Powód odbanowania.")
        ),
    async execute(interaction) {
        const memberId = interaction.options.getString("user_id");
        const reason = interaction.options.getString("reason") || "BRAK POWODU";

        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`⛔ Błąd: \`unban\``)
                        .setDescription("Nie masz uprawnień do odbanowania użytkownika.")
                ]
            });
        }

        const guild = interaction.guild;

        try {
            const bannedUser = await guild.bans.fetch(memberId);
            await guild.members.unban(memberId, reason);
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Green')
                        .setFooter({ text: "WitherCode - Unban " })
                        .setTitle(`✅ Pomyślnie odbanowano użytkownika!`)
                        .setDescription(`Użytkownik <@${memberId}> został odbanowany przez ${interaction.user.tag}`)
                        .addFields({ name: "📑 Powód", value: `\`\`\`${reason}\`\`\``, inline: false }),
            ],
            });

            // Wywołanie funkcji do logów
            sendUnbanLog(memberId, interaction, reason, bannedUser);
        } catch (error) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setTitle(`⛔ Błąd: \`unban\``)
                        .setDescription("Podany użytkownik nie ma bana!")
                ]
            });
        }
    },
};

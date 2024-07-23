// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { sendKickLog } = require("../../Events/Logs/kicklogs"); // Import funkcji z logger.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Wyrzuca użytkownika z serwera.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption((option) =>
            option.setName("user").setDescription("Użytkownik do wyrzucenia").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("Powód wyrzucenia").setRequired(false)
        ),
    async execute(interaction) {
        const member = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason") || "BRAK POWODU";

        const memberPosition = member.roles.highest.position;
        const moderationPosition = interaction.member.roles.highest.position;
        if (moderationPosition <= memberPosition)
            return interaction.reply({ content: "Nie możesz wyrzucić kogoś, kto jest wyższy/równy tobie.", ephemeral: true });

        if (!member.kickable)
            return interaction.reply({ content: "Nie można wyrzucić podanego użytkownika.", ephemeral: true });

        try {
            await member.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#0000FF')
                        .setFooter({ text: "WitherCode - Kick " })
                        .setTimestamp()
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setTitle(`✅ Zostałeś wyrzucony z serwera!`)
                        .setDescription(`Zostałeś wyrzucony przez **${interaction.user.tag}** na serwerze **${interaction.guild.name}**`)
                        .addFields({ name: `📑 Powód`, value: `\`\`\`${reason}\`\`\``, inline: false }),
                ],
            });
        } catch {
            return interaction.reply({
                content: "Nie można wysłać wiadomości prywatnej do tego użytkownika, ponieważ ma zablokowane DM'y.",
                ephemeral: true,
            });
        }

        member.kick({ reason }).then(() => {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#0000FF')
                        .setFooter({ text: "WitherCode - Kick " })
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setTitle(`✅ Pomyślnie wyrzucono użytkownika!`)
                        .setDescription(`Użytkownik **${member.user.tag}** został wyrzucony z serwera!`)
                        .addFields({ name: `📑 Powód`, value: `\`\`\`${reason}\`\`\``, inline: false }),
                ],
            });
            sendKickLog(member, interaction, reason);
        });
    },
};

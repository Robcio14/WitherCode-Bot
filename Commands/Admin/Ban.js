// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { sendBanLog } = require("../../Events/Logs/banlogs"); // Import funkcji z logger.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Banuje danego użytkownika.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption((option) =>
            option.setName("user").setDescription("Użytkownik do zbanowania").setRequired(true)
        )
        .addIntegerOption((option) =>
            option.setName("days").setDescription("Czas bana (od 1 do 7)").setRequired(false)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("Powód bana").setRequired(false)
        ),
    async execute(interaction) {
        const member = interaction.options.getMember("user");
        const days = interaction.options.getInteger("days") || 0;
        const reason = interaction.options.getString("reason") || "BRAK POWODU";

        const memberPosition = member.roles.highest.rawPosition;
        const moderationPosition = interaction.member.roles.highest.rawPosition;

        if (moderationPosition <= memberPosition)
            return interaction.reply({ content: "Nie możesz zbanować kogoś, kto jest wyższy/równy tobie.", ephemeral: true });

        if (!member.bannable)
            return interaction.reply({ content: "Nie można zbanować podanego użytkownika.", ephemeral: true });

        try {
            await member.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#0000FF')
                        .setFooter(({ text: "SkyHard.pl", iconURL:"https://cdn.discordapp.com/attachments/1082010015646359674/1234865551969484810/logo2-1.png?ex=6635956a&is=663443ea&hm=95c273a336eb775eaa94608fb6f05d5faf0ce2288d207ecf3007ffd7f884fcf6&" }))
                        .setTimestamp()
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setTitle(`✅ Zostałeś zbanowany!`)
                        .setDescription(`Zostałeś zbanowany przez **${interaction.user.tag}** na serwerze **${interaction.guild.name}** na **${days === 0 ? `Zawsze` : `${days} Dni`}**`)
                        .setImage(`https://cdn.discordapp.com/attachments/1082010015646359674/1235274571989385386/ban.png?ex=6633c698&is=66327518&hm=0f0c1409b625118040150ca0682d09b64d6168188070bc744c94e66e7e89f31c&`)

                        .addFields({ name: `📑 Powód`, value: `\`\`\`${reason}\`\`\``, inline: false }),
                ],
            });
        } catch {
            return interaction.reply({ content: `Nie można wysłać wiadomości prywatnej do ${member.user}, ponieważ ma zablokowane DM'y.`, ephemeral: true });
        }

        member.ban({
            days: days,
            reason: reason
        }).then(() => {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#0000FF')
                        .setFooter(({ text: "SkyHard.pl", iconURL:"https://cdn.discordapp.com/attachments/1082010015646359674/1234865551969484810/logo2-1.png?ex=6635956a&is=663443ea&hm=95c273a336eb775eaa94608fb6f05d5faf0ce2288d207ecf3007ffd7f884fcf6&" }))
                        .setTimestamp()
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setTitle(`✅ Pomyślnie zbanowano użytkownika!`)
                        .setDescription(`Użytkownik **${member.user.tag}** został zbanowany na **${days === 0 ? `Zawsze` : `${days} Dni`}**`)
                        .setImage(`https://cdn.discordapp.com/attachments/1082010015646359674/1235274571989385386/ban.png?ex=6633c698&is=66327518&hm=0f0c1409b625118040150ca0682d09b64d6168188070bc744c94e66e7e89f31c&`)
                        .addFields({ name: `📑 Powód`, value: `\`\`\`${reason}\`\`\``, inline: false }),
                ],
            });

            // Wywołanie funkcji do logów
            sendBanLog(member, interaction, days, reason);
        });
    },
};

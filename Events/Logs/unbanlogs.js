// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|
const { EmbedBuilder } = require("discord.js");
const ustawienia = require(`${process.cwd()}/BotConfig/config.json`);

function sendUnbanLog(memberId, interaction, reason, bannedUser) {
    const logs = interaction.guild.channels.cache.find((c) => c.id == ustawienia.Logi.Kanal);

    logs.send({
        embeds: [
            new EmbedBuilder()
                .setColor('#0000FF')
                .setAuthor(`Akcja: unban | <@${memberId}>`)
                .addFields(
                    { name: "Użytkownik", value: `${memberId}(${bannedUser.user.tag})`, inline: false },
                    { name: "Moderator", value: `${interaction.user}`, inline: false },
                    { name: "Powód", value: `\`\`\`${reason}\`\`\``, inline: false }
                )
                .setFooter(({ text: "WitherCode - Logs"})),
        ],
    });
}

module.exports = {
    sendUnbanLog,
};

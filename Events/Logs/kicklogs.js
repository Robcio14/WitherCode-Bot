// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|
const { EmbedBuilder } = require("discord.js");
const ustawienia = require(`${process.cwd()}/BotConfig/config.json`);

function sendKickLog(member, interaction, reason) {
    const logs = interaction.guild.channels.cache.find((c) => c.id == ustawienia.Logi.Kanal);

    logs.send({
        embeds: [
            new EmbedBuilder()
                .setColor('#0000FF')
                .setFooter(({ text: "WitherCode - Logs"}))
                .setTimestamp()
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setAuthor({ name: `Akcja: \`kick\` | ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ format: `png` })})
                .addFields([
                    { name: `Użytkownik`, value: `${member}(${member.user.id})`, inline: false },
                    { name: `Moderator`, value: `${interaction.user}`, inline: false },
                    { name: `Powód`, value: `\`\`\`${reason}\`\`\``, inline: false }
                ]),
        ],
    });
}

module.exports = {
    sendKickLog,
};

// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|

const fs = require("fs");
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

const settingsPath = `${process.cwd()}/BotConfig/config.json`;

function checkForLink(content, member, linkSenderRoleID) {
    const hasLinkSenderRole = member.roles.cache.has(linkSenderRoleID);
    if (hasLinkSenderRole) {
        return false;
    }

    const urlCheck = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    return urlCheck.test(content) || content.includes("discord.gg") || content.includes("discord.com/invite/");
}

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) return;

        try {
            const rawData = fs.readFileSync(settingsPath, 'utf8');
            const settings = JSON.parse(rawData);
            const linkSenderRoleID = settings.Administracja.linkSenderRoleID;

            if (!linkSenderRoleID) {
                throw new Error('Nie można odnaleźć ID roli dla nadawcy linku w pliku ustawienia.json');
            }

            if (checkForLink(message.content, message.member, linkSenderRoleID)) {
                try {
                    await message.delete();
                } catch (error) {
                    console.error(`Błąd podczas usuwania wiadomości: ${error}`);
                }

                try {
                    const muteDuration = '7d';
                    await message.member.timeout(ms(muteDuration));

                    const embed = new EmbedBuilder()
                        .setColor("#ff0000")
                        .setTitle("Auto Moderacja")
                        .setDescription(`
                         Użytkownik ${message.author}, próbował wysłać link!
                         Czynność została zablokowana pomyślnie. 

                         Nałożona została blokada na ${muteDuration}, pamiętaj aby zapoznać się z [regulaminem] (https://discord.com/channels/1264160218766512220/1264160221358718988)
`)
                        .setFooter({ text: "WitherCode - AutoModeracaja" });
                    await message.channel.send({ embeds: [embed] });
                } catch (error) {
                    console.error(`Błąd podczas nadawania przerwy: ${error}`);
                }
            }
        } catch (err) {
            console.error('Błąd podczas odczytu pliku config.json:', err.message);

        }
    }
};

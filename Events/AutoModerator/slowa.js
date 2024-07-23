const fs = require("fs");
const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) return;
        const bannedWordsPath = `${process.cwd()}/BotConfig/automoderator.json`;
        const bannedWordsData = fs.readFileSync(bannedWordsPath);
        const bannedWords = JSON.parse(bannedWordsData).bannedWords;

        const content = message.content.toLowerCase();
        if (bannedWords.some(word => content.includes(word))) {
            try {
                await message.delete();
            } catch (error) {
                console.error(`Błąd podczas usuwania wiadomości: ${error}`);
            }

            try {
                const muteDuration = ' 7d';
                await message.member.timeout(ms(muteDuration));


                const embed = new EmbedBuilder()
                    .setColor("#ff0000")
                    .setTitle("Auto Moderacja")
                    .setDescription(`
                         Użytkownik ${message.author}, próbował wysłać link!
                         
                         Czynność została zablokowana pomyślnie.
                          
                         Nałożona została blokada na ${muteDuration}, pamiętaj aby zapoznać się z [regulaminem] (https://discord.com/channels/1264160218766512220/1264160221358718988)
`)
                    .setFooter({ text: "WitherCode - AutoModeracaja" })
                await message.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error(`Błąd podczas nadawania przerwy: ${error}`);
            }
        }
    }
};


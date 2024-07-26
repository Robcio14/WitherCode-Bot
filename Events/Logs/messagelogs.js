// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|


const { Events, EmbedBuilder } = require('discord.js');
const db3 = require('../../Database/MessageLogsDatabase');

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (!message.guild || message.author.bot) return;

        const guildId = message.guild.id;

        db3.get('SELECT * FROM logs WHERE Guild = ?', [guildId], async (err, row) => {
            if (!row) return;

            const sendChannel = await message.guild.channels.fetch(row.Channel);
            const attachments = message.attachments.map(attachment => attachment.url);
            const member = message.author;
            const deleteTime = `<t:${Math.floor(Date.now() / 1000)}:R>`;

            const embed = new EmbedBuilder()
                .setColor('Blurple')
                .setTitle('🗑️ Nowa usunięta wiadomość')
                .setDescription(`Ta wiadomość została usunięta ${deleteTime} i jest rejestrowany w celach moderacyjnych.`)
                .addFields({ name: 'Treść wiadomości', value: `${message.content || 'No message content'}` })
                .addFields({ name: 'Autor wiadomości', value: `${member.username} (${member.id})` })
                .addFields({ name: 'Kanał wiadomości', value: `${message.channel} (${message.channel.id})` })
                .setFooter(({ text: "WitherCode - Logs"}))
                .setTimestamp();

            if (attachments.length > 0) {
                embed.addFields({ name: 'Załączniki wiadomości', value: attachments.join(', ') });
            }

            await sendChannel.send({ embeds: [embed] });
        });
    }
};

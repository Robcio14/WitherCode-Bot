// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
const { Kategoria } = require(`${process.cwd()}/BotConfig/config.json`);
const { ticketpermission } = require(`${process.cwd()}/BotConfig/config.json`);
const { ownerRoleId } = require(`${process.cwd()}/BotConfig/config.json`);
const { supervisorRoleId } = require(`${process.cwd()}/BotConfig/config.json`);
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const { customId, guild, user } = interaction;
        if (!interaction.isStringSelectMenu()) {
            return;
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('zamknij')
                .setLabel('Zamknij')
                .setStyle(ButtonStyle.Danger),
        );

        if (customId === 'ticket') {
            if (interaction.values[0] === 'discord_bot') {

                const existingTicketChannel = interaction.guild.channels.cache.find(channel => channel.topic === interaction.user.id);

                if (existingTicketChannel) {
                    const errorEmbed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setTitle('⛔ Błąd')
                        .setDescription(`
            > ❗ Witaj Użytkowniku,
            
            > Z przykrością informujemy, że już posiadasz otwarty ticket! Nie możesz narazie tworzyć więcej ticketów.
            
            > Zamknij poprzedni ticket, aby móc otworzyć kolejny ticket.
            
            > Jeśli potrzebujesz pomocy, skontaktuj się z administratorem.`)

                        .setFooter({ text: 'WitherCode - Ticket' });


                    return await interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true,
                    });
                }
                const embed = new EmbedBuilder()
                    .setAuthor({
                        name: user.tag,
                        iconURL: user.displayAvatarURL({ dynamic: true }),
                    })
                    .setColor('#FFA500')
                    .setDescription(
                        ` 🎟️ **Witaj ${interaction.member}, właśnie utworzyłeś ticket w kategorii \`Discord_Bot\`.**

            
            `
                    )
                    .setFooter({ text: "SkyHard.pl", iconURL: "https://cdn.discordapp.com/attachments/1082010015646359674/1234865551969484810/logo2-1.png?ex=6635956a&is=663443ea&hm=95c273a336eb775eaa94608fb6f05d5faf0ce2288d207ecf3007ffd7f884fcf6&" })
                    .setImage(`https://cdn.discordapp.com/attachments/1082010015646359674/1235274641942118522/ticket.png?ex=6633c6a8&is=66327528&hm=eb1e4f381d2338ae9deef61ae63d27a31492538a3d2edbba5ead900a6ddcb983&`);

                const response = await interaction.reply({
                    content: 'Poczekaj chwile, tworzę już twój ticket.',
                    ephemeral: true,
                });

                const createdChannel = await guild.channels.create({
                    name: `${user.username}-zakup`,
                    type: ChannelType.GuildText,
                    parent: Kategoria,
                    topic: user.id, // Use the user ID to mark this channel
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: guild.roles.everyone,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: ticketpermission,
                            deny: [PermissionFlagsBits.ViewChannel],
                        }
                    ],
                });

                await response.edit({
                    content: `Stworzyłeś ticket! ${createdChannel}`,
                    ephemeral: true,
                });

                await createdChannel.send({
                    content: `${interaction.member}`,
                    embeds: [embed],
                    components: [row],
                });
            }
        }
    }
}

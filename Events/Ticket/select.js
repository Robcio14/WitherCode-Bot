// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
const { TicketConfig } = require(`${process.cwd()}/BotConfig/config.json`);
const { Kategoria, Bot_Dev,Java_Dev,Grafik,Skript_Dev,Support,Zespol } = TicketConfig;

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
                        `**Witaj ${interaction.member}, właśnie utworzyłeś ticket dotyczący zakupu bota discord.**
                        
                         Dziękujemy za zainteresowanie naszymi usługami! Proszę o podanie pakietu którego chcesz zakupić. 
                         
                         Jeżeli masz Inwidualny pakiet  który chcesz zakupić to proszę o napisanie  poniżej a nasi developerzy wycenią i podadzą cenę.
                         
                         Nie zapmonij podać informacji jaką metodą płatności będziesz płacił
            
            `
                    )
                    .setFooter({ text: "WitherCode - Ticket " })

                const response = await interaction.reply({
                    content: 'Poczekaj chwile, tworzę już twój ticket.',
                    ephemeral: true,
                });

                const createdChannel = await guild.channels.create({
                    name: `${user.username}-discord_bot`,
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
                            id: Bot_Dev, // Allow the Bot_Dev role to view the channel
                            allow: [PermissionFlagsBits.ViewChannel],
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
            if (interaction.values[0] === 'grafiki') {
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
                        `**Witaj ${interaction.member}, właśnie utworzyłeś ticket dotyczący zakupu Grafiki.**
                        
                         Dziękujemy za zainteresowanie naszymi usługami! Proszę o podanie wyszystkich wymagań dotyczących Grafiki. 
                         
                         
                         Nie zapmonij podać informacji jaką metodą płatności będziesz płacił
            
            `
                    )
                    .setFooter({ text: "WitherCode - Ticket " })

                const response = await interaction.reply({
                    content: 'Poczekaj chwile, tworzę już twój ticket.',
                    ephemeral: true,
                });

                const createdChannel = await guild.channels.create({
                    name: `${user.username}-grafiki`,
                    type: ChannelType.GuildText,
                    parent: Kategoria,
                    topic: user.id,
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
                            id: Grafik,
                            allow: [PermissionFlagsBits.ViewChannel],
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
            if (interaction.values[0] === 'pluginy') {
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
                        `**Witaj ${interaction.member}, właśnie utworzyłeś ticket dotyczący zakupu Plugin Minecraft.**
                        
                         Dziękujemy za zainteresowanie naszymi usługami! Proszę o podanie wyszystkich wymagań dotyczących  pluginu. 
                         
                         
                         Nie zapmonij podać informacji jaką metodą płatności będziesz płacić
            
            `
                    )
                    .setFooter({ text: "WitherCode - Ticket " })

                const response = await interaction.reply({
                    content: 'Poczekaj chwile, tworzę już twój ticket.',
                    ephemeral: true,
                });

                const createdChannel = await guild.channels.create({
                    name: `${user.username}-Plugin`,
                    type: ChannelType.GuildText,
                    parent: Kategoria,
                    topic: user.id,
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
                            id: Java_Dev,
                            allow: [PermissionFlagsBits.ViewChannel],
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
            if (interaction.values[0] === 'skrypty'){
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
                        `**Witaj ${interaction.member}, właśnie utworzyłeś ticket dotyczący zakupu Skrypt.**
                        
                         Dziękujemy za zainteresowanie naszymi usługami!  Proszę o podanie wyszystkich wymagań dotyczących  skryptu. 
                         
                         Nie zapmonij podać informacji jaką metodą płatności będziesz płacił
            
            `
                    )
                    .setFooter({ text: "WitherCode - Ticket " })

                const response = await interaction.reply({
                    content: 'Poczekaj chwile, tworzę już twój ticket.',
                    ephemeral: true,
                });

                const createdChannel = await guild.channels.create({
                    name: `${user.username}-skrypt`,
                    type: ChannelType.GuildText,
                    parent: Kategoria,
                    topic: user.id,
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
                            id: Skript_Dev,
                            allow: [PermissionFlagsBits.ViewChannel],
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
            if (interaction.values[0] === 'pomoc') {
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
                        `**Witaj ${interaction.member}, właśnie utworzyłeś ticket dotyczący Pomocy Ogólnej.**

                        Dziękujemy za skontaktowanie się z nami! Jesteśmy tutaj, aby pomóc w każdej sprawie, którą możesz mieć.

                        Prosimy o podanie szczegółowych informacji dotyczących Twojego zapytania, abyśmy mogli szybko i skutecznie Ci pomóc.          

                        Dziękujemy i cieszymy się na współpracę z Tobą!`
                    )

                    .setFooter({ text: "WitherCode - Ticket " })

                const response = await interaction.reply({
                    content: 'Poczekaj chwile, tworzę już twój ticket.',
                    ephemeral: true,
                });

                const createdChannel = await guild.channels.create({
                    name: `${user.username}-pomoc`,
                    type: ChannelType.GuildText,
                    parent: Kategoria,
                    topic: user.id,
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
                            id: Zespol,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
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
            if (interaction.values[0] === 'dc') {
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
                        ` **Witaj ${interaction.member}, właśnie utworzyłeś ticket dotyczący zakupu serwera Discord.**

                            Dziękujemy za zainteresowanie naszymi usługami! Aby dostosować naszą ofertę do Twoich potrzeb, prosimy o podanie następujących informacji:
    
                            - **Preferowany pakiet:** (Standard, Medium, Hard)
                            - **Metoda płatności:** (BLIK, PayPal, Przelew, PaySafeCard)
                            - **Dodatkowe wymagania:** (jeśli masz jakieś specjalne życzenia lub potrzebujesz dodatkowych funkcji)

                        Nasze pakiety zawierają różnorodne funkcje, od komend administratorskich i statystyk, po powitania, pożegnania, weryfikacje i wiele więcej. Jeśli masz jakiekolwiek pytania lub potrzebujesz wyceny indywidualnej, daj nam znać, a przygotujemy ofertę dostosowaną do Twoich wymagań.

                        Cieszymy się na współpracę z Tobą i dziękujemy za wybór naszych usług!`
                    )


                    .setFooter({ text: "WitherCode - Ticket " })

                const response = await interaction.reply({
                    content: 'Poczekaj chwile, tworzę już twój ticket.',
                    ephemeral: true,
                });

                const createdChannel = await guild.channels.create({
                    name: `${user.username}-serwer_discord`,
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
                            id: Support,
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
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

// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|


const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const emoji = require(`${process.cwd()}/BotConfig/emojis.json`);
const db = require('../../Database/PropozycjeDB');

async function fetchSuggestionData(messageId) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM suggestions WHERE message_id = ?',
      [messageId],
      (err, row) => {
        if (err) return reject(err);

        if (row) {
          row.voted_ppl = JSON.parse(row.voted_ppl);
          row.downvoted_ppl = JSON.parse(row.downvoted_ppl);
        }

        resolve(row);
      }
    );
  });
}


module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.inGuild() || !interaction.isButton()) return;
    if (!interaction.message.guild || !interaction.message.guild.available || !interaction.message.channel) return;
    if (interaction.message.author.id !== client.user.id) return;
    if (!interaction.customId.startsWith("Propozycja_")) return;

   
    let SuggestionsData = await fetchSuggestionData(interaction.message.id);

    if (!SuggestionsData) {
      SuggestionsData = {
        upvotes: 0,
        downvotes: 0,
        voted_ppl: [],
        downvoted_ppl: []
      };
      
      db.run(
        'INSERT INTO suggestions (message_id, upvotes, downvotes, voted_ppl, downvoted_ppl) VALUES (?, ?, ?, ?, ?)',
        [interaction.message.id, SuggestionsData.upvotes, SuggestionsData.downvotes, JSON.stringify(SuggestionsData.voted_ppl), JSON.stringify(SuggestionsData.downvoted_ppl)],
        (err) => {
          if (err) {
            console.error('Błąd podczas dodawania początkowych danych sugestii do bazy danych:', err);
           
          }
        }
      );
    }

    if (interaction.customId == "Propozycja_za") {
      if (SuggestionsData.voted_ppl.includes(interaction.user.id)) {
        return interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setAuthor({ name: 'WitcherCode - Propozycja' })
              .setColor("Red")
              .setDescription(`${emoji.msg.blad}・Nie możesz dwukrotnie zagłosować na tą samą opcję!`)
              .setFooter(({ text: "WitherCode - Propozycje" }))          ]
        });
      } else {
        interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
                .setAuthor({ name: 'WitcherCode - Propozycja' })
              .setDescription(`${emoji.msg.sukces}・Pomyślnie oddałeś swój głos!`)
              .setColor('Green')
                .setFooter(({ text: "WitherCode - Propozycje" }))          ]        });
       
        db.run(
          `UPDATE suggestions
          SET upvotes = ?, voted_ppl = ?
          WHERE message_id = ?`,
          [SuggestionsData.upvotes + 1, JSON.stringify(SuggestionsData.voted_ppl.concat(interaction.user.id)), interaction.message.id],
          (err) => {
            if (err) {
              console.error('Błąd podczas aktualizacji danych w bazie danych dla "Propozycja_za":', err);
              
            }
          }
        );
      }
    }

    if (interaction.customId == "Propozycja_przeciw") {
      if (SuggestionsData.downvoted_ppl.includes(interaction.user.id)) {
        return interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
                .setAuthor({ name: 'WitcherCode - Propozycja' })
              .setColor("Red")
              .setDescription(`${emoji.msg.blad}・Nie możesz dwukrotnie zagłosować na tą samą opcję!`)
                .setFooter(({ text: "WitherCode - Propozycje" }))          ]        });
      } else {
        interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
                .setAuthor({ name: 'WitcherCode - Propozycja' })
              .setDescription(`${emoji.msg.sukces}・Pomyślnie oddałeś swój głos!`)
              .setColor('Green')
                .setFooter(({ text: "WitherCode - Propozycje" }))          ]        });
        db.run(
          `UPDATE suggestions
          SET downvotes = ?, downvoted_ppl = ?
          WHERE message_id = ?`,
          [SuggestionsData.downvotes + 1, JSON.stringify(SuggestionsData.downvoted_ppl.concat(interaction.user.id)), interaction.message.id]
        );
      }
    }
   
    if (interaction.customId === "Propozycja_kto") {
      const embed = new EmbedBuilder()
          .setColor("Red")
          .setTitle(`❓ **Kto zagłosował?** ❓`);
  
      if (SuggestionsData.voted_ppl && Array.isArray(SuggestionsData.voted_ppl)) {
          if (SuggestionsData.voted_ppl.length > 0) {
              const votedPplField =
                  SuggestionsData.voted_ppl.length < 20
                      ? SuggestionsData.voted_ppl.map(r => `<@${r}>`).join("\n")
                      : [...SuggestionsData.voted_ppl.slice(0, 20).map(r => `<@${r}>`), `${SuggestionsData.voted_ppl.length - 20} więcej...`].join("\n");
              embed.addFields({ name: "Głosy za", value: votedPplField, inline: true });
          } else {
              embed.addFields({ name: "Głosy za", value: "Brak głosów", inline: true });
          }
      } else {
          embed.addFields({ name: "Głosy za", value: "Brak głosów", inline: true });
      }
  
      if (SuggestionsData.downvoted_ppl && Array.isArray(SuggestionsData.downvoted_ppl)) {
          if (SuggestionsData.downvoted_ppl.length > 0) {
              const downvotedPplField =
                  SuggestionsData.downvoted_ppl.length < 20
                      ? SuggestionsData.downvoted_ppl.map(r => `<@${r}>`).join("\n")
                      : [...SuggestionsData.downvoted_ppl.slice(0, 20).map(r => `<@${r}>`), `${SuggestionsData.downvoted_ppl.length - 20} więcej...`].join("\n");
              embed.addFields({ name: "Głosy przeciw", value: downvotedPplField, inline: true });
          } else {
              embed.addFields({ name: "Głosy przeciw", value: "Brak głosów", inline: true });
          }
      } else {
          embed.addFields({ name: "Głosy przeciw", value: "Brak głosów", inline: true });
      }
  
      interaction.reply({
          ephemeral: true,
          embeds: [embed], 
      });
  }


   
    SuggestionsData = await fetchSuggestionData(interaction.message.id);
    let embed = interaction.message.embeds[0];
    embed.fields[0].value = `- Głosy za: \`${SuggestionsData.upvotes}\` | **${Math.round((SuggestionsData.upvotes / (SuggestionsData.upvotes + SuggestionsData.downvotes)) * 100)}%**\n- Głosy przeciw: \`${SuggestionsData.downvotes}\` | **${Math.round((SuggestionsData.downvotes / (SuggestionsData.upvotes + SuggestionsData.downvotes)) * 100)}%**`;

    const btn_up = new ButtonBuilder()
      .setLabel(String(SuggestionsData.upvotes))
        .setEmoji('✅')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('Propozycja_za')
      .setDisabled(false);
    const btn_down = new ButtonBuilder()
      .setLabel(String(SuggestionsData.downvotes))
        .setEmoji('❌')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('Propozycja_przeciw')
      .setDisabled(false);
    const btn_who = new ButtonBuilder()
      .setLabel('Kto zagłosował?')
      .setEmoji('❓')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('Propozycja_kto')
      .setDisabled(false);

    interaction.message.edit({ embeds: [embed], components: [new ActionRowBuilder().addComponents(btn_up, btn_down, btn_who)] });
  }
}
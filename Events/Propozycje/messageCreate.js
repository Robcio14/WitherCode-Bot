// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|


const { EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ActionRowBuilder } = require('discord.js');
const ee = require(`${process.cwd()}/BotConfig/embed.json`);
const emoji = require(`${process.cwd()}/BotConfig/emojis.json`);
const ustawienia = require(`${process.cwd()}/BotConfig/config.json`);
const db = require('../../Database/PropozycjeDB');
const { Collection } = require('discord.js');

function hasLink(string) {
  let link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  if (link.test(string)) return true;
  return false;
}



module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.partial) await message.fetch();

    var suggestChannel = ustawienia.Propozycje.Kanal;
    if (!suggestChannel) return;

    if (message.channel.id === suggestChannel) {
      if (hasLink(message.content)) return;
      setTimeout(() => message.delete(), 1000);

      if (!client.propozycje) {
        client.propozycje = {}; 
      }

      const btn_up = new ButtonBuilder()
          .setLabel(`0`)
          .setEmoji('✅')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('Propozycja_za')
          .setDisabled(false);
      const btn_down = new ButtonBuilder()
          .setLabel(`0`)
          .setEmoji('❌')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('Propozycja_przeciw')
          .setDisabled(false);
      const btn_who = new ButtonBuilder()
          .setLabel('Kto zagłosował?')
          .setEmoji('❓')
          .setStyle(ButtonStyle.Primary)
          .setCustomId('Propozycja_kto')
          .setDisabled(false)
      const row = new ActionRowBuilder()
        .addComponents([btn_up, btn_down, btn_who]);
      var embed = new EmbedBuilder()
        .setAuthor({ name: `Propozycja: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`
          **Treść propozycji:**
          > ${message.content}
          `)
        .addFields([
          { name: `Status głosów:`, value: `- Głosy za: \`0\` | **0%**\n- Głosy przeciw: \`0\` | **0%**`, inline: false },
          { name: `Jak zagłosować?`, value: `Użyj jednego z dwóch przycisków zamieszczonych pod wiadomością propozycji.\n${emoji.msg.sukces} - Jestem za tą propozycją\n${emoji.msg.blad} - Jestem przeciwko tej propozycji`, inline: false }
        ])
        .setThumbnail(ee.footericon)
        .setColor(ee.color).setTimestamp().setFooter({ text: `Masz jakąś ciekawą propozycje? Napisz ją na tym kanale!` });

      message.channel.send({
        embeds: [embed],
        components: [row]
      }).then(async (m) => {
        m.startThread({
          name: `Debata na temat propozycji`,
          autoArchiveDuration: 60,
          type: 'GUILD_PUBLIC_THREAD'
        });

        client.propozycje = new Collection();


        client.propozycje.ensure(message.id, () => ({
          upvotes: 0,
          downvotes: 0,
          voted_ppl: [],
          downvoted_ppl: [],
        }));


        db.run(
          `INSERT INTO suggestions (message_id, upvotes, downvotes, voted_ppl, downvoted_ppl, createdAt)
              VALUES (?, ?, ?, ?, ?, ?)`,
          [m.id, 0, 0, JSON.stringify([]), JSON.stringify([]), Date.now()]
        );
      });

    }
  }

};
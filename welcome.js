const { EmbedBuilder, Events } = require("discord.js");

module.exports = (client) => {

  const WELCOME_CHANNEL_ID = "1499527016347865399";

  // =====================
  // EMOJI
  // =====================
  const EMOJI = {
    wave: "👋",
    ticket: "🎫",
    legit: "✅",
    calc: "🧮",

    exchange: "<:exchange:1508159193792647248>",

    users: "<:users:1509273733838274712>",

    green: "<a:green:1501990166082879538>",
    zap: "<:zap:1509273899920265379>",
    pin: "<:pin:1509273884279705800>",
    lock: "<:lock:1509274087447593070>"
  };

  // =====================
  // MEMBER JOIN
  // =====================
  client.on(Events.GuildMemberAdd, async (member) => {

    try {

      const channel = await client.channels.fetch(WELCOME_CHANNEL_ID);

      if (!channel) {
        return console.log("❌ Nie znaleziono kanału welcome");
      }

      // liczba osób
      const memberCount = member.guild.memberCount;

      // =====================
      // EMBED
      // =====================
      const embed = new EmbedBuilder()

        .setColor("#2b2d31")

        .setTitle(`${EMOJI.wave} StarX Exchange » Welcome`)

        .setDescription(
[
`## ${EMOJI.green} Witaj na serwerze!`,
`> ${member} miło Cię widzieć na **StarX Exchange**`,
`> Jesteś **${memberCount}** osobą na serwerze 🔥`,
``,
`## ${EMOJI.pin} Ważne kanały`,
`> ${EMOJI.exchange} Wymiany — <#1509272463672868901>`,
`> ${EMOJI.ticket} Tickety — <#1509272463484129385>`,
`> ${EMOJI.legit} Legit Check — <#1509272463672868897>`,
`> ⭐ Opinie — <#1509272463672868899>`,
`> ${EMOJI.calc} Kalkulator — <#1509272463672868899>`,
``,
`## ${EMOJI.lock} Weryfikacja`,
`> Wejdź na <#1509272463484129383>`,
`> Zweryfikuj się aby uzyskać`,
`> pełny dostęp do serwera 🔓`,
``,
`## ${EMOJI.zap} Informacje`,
`> Zachowuj kulturę`,
`> Przeczytaj regulamin`,
`> Życzymy udanych wymian 🔥`
].join("\n")
        )

        .setThumbnail(
          member.user.displayAvatarURL({
            dynamic: true,
            size: 1024
          })
        )

        .setImage(
          "https://i.imgur.com/4KfOswz_d.webp?maxwidth=760&fidelity=grand"
        )

        .setFooter({
          text: "© 2026 StarX Exchange"
        })

        .setTimestamp();

      // =====================
      // SEND
      // =====================
      await channel.send({
        content: `${EMOJI.wave} ${member}`,
        embeds: [embed]
      });

      console.log(`✅ Welcome sent: ${member.user.tag}`);

    } catch (err) {

      console.log("❌ Welcome error:", err);
    }
  });
};

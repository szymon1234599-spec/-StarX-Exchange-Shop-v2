const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  Events
} = require("discord.js");

module.exports = (client) => {

  const CHANNEL_ID = "1509272463672868903";

  // ========================
  // EMOJI
  // ========================
  const EMOJI_SPOTIFY = "<:Spotify:1500238701718933627>";
  const EMOJI_NETFLIX = "<:Netflix:1509273851983565013>";
  const EMOJI_YT = "<:ytpremium:1509274214899912854>";
  const EMOJI_HBO = "<:HBOmax:1509273765245092043>";

  const EMOJI_NITRO = "<a:nitro:1509274169336926238>";
  const EMOJI_CRUNCHY = "<:crunchyroll:1509273659909607536>";
  const EMOJI_DISNEY = "<:disney:1509273702238261449>";
  const EMOJI_MONEY = "<a:money:1509274139444379751>";

  const EMOJI_PIN = "<:pin:1509273884279705800>";
  const EMOJI_ZAP = "<:zap:1509273899920265379>";
  const EMOJI_LOCK = "<:lock:1509274087447593070>";

  const EMOJI_PRIME = "<:primevideo:1509274200597201108>";
  const EMOJI_CHATGPT = "<:chatgpt:1509273474571702302>";
  const EMOJI_CAPCUT = "<:capcut:1509273687667380305>";

  const EMOJI_NORD = "<:nordvpn:1501999409343369400>";
  const EMOJI_MULLVAD = "<:mullvad:1501999834159255712>";
  const EMOJI_TUNNEL = "<:tunnelbear:1502000450009042984>";

  const EMOJI_CDA = "<:cda:1509273634957692939>";

  // ========================
  // PANEL
  // ========================
  client.once(Events.ClientReady, async () => {

    try {

      const channel = await client.channels.fetch(CHANNEL_ID);
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setColor("#1b2dff")
        .setTitle("🌟 StarX Exchange » CENNIK")
        .setDescription(
`${EMOJI_PIN} Wybierz kategorię z menu poniżej.

━━━━━━━━━━━━━━━━━━━━━━━

${EMOJI_ZAP} Szybka realizacja  
${EMOJI_LOCK} Bezpieczne transakcje  
${EMOJI_MONEY} Najlepsze ceny

━━━━━━━━━━━━━━━━━━━━━━━`
        )
        .setImage("https://i.imgur.com/4KfOswz_d.webp?maxwidth=760&fidelity=grand")
        .setFooter({ text: "© 2026 StarX Exchange" });

      const menu = new StringSelectMenuBuilder()
        .setCustomId("starx_cennik")
        .setPlaceholder("📦 Wybierz kategorię...")
        .addOptions([
          {
            label: "NITRO",
            value: "nitro",
            emoji: { id: "1509274169336926238", name: "nitro" }
          },
          {
            label: "STREAMING",
            value: "streaming",
            emoji: { id: "1509273851983565013", name: "Netflix" }
          },
          {
            label: "VPN",
            value: "vpn",
            emoji: { id: "1501999409343369400", name: "nordvpn" }
          }
        ]);

      const row = new ActionRowBuilder().addComponents(menu);

      await channel.send({
        embeds: [embed],
        components: [row]
      });

      console.log("✅ Cennik wysłany");

    } catch (err) {
      console.log("❌ Cennik error:", err);
    }
  });

  // ========================
  // MENU
  // ========================
  client.on(Events.InteractionCreate, async (interaction) => {

    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== "starx_cennik") return;

    try {

      // =====================
      // NITRO
      // =====================
      if (interaction.values[0] === "nitro") {

        const embed = new EmbedBuilder()
          .setColor("#1b2dff")
          .setTitle(`${EMOJI_NITRO} StarX Exchange » NITRO`)
          .setDescription(
`${EMOJI_NITRO} **Nitro Boost (28 dni • Full Warranty)**  
${EMOJI_MONEY} \`20 zł\``
          )
          .setFooter({ text: "StarX Exchange • Najlepsze ceny" });

        return interaction.reply({
          embeds: [embed],
          flags: 64
        });
      }

      // =====================
      // STREAMING
      // =====================
      if (interaction.values[0] === "streaming") {

        const embed = new EmbedBuilder()
          .setColor("#1b2dff")
          .setTitle(`${EMOJI_NETFLIX} StarX Exchange » STREAMING`)
          .setDescription(
`${EMOJI_SPOTIFY} **Spotify Premium LIFETIME [KEY]**  
${EMOJI_MONEY} \`30 zł\`

${EMOJI_SPOTIFY} **Spotify Premium FA [LIFETIME]**  
${EMOJI_MONEY} \`20 zł\`

${EMOJI_YT} **YT Premium FA [LIFETIME]**  
${EMOJI_MONEY} \`20 zł\`

${EMOJI_PRIME} **Prime Video 1 Month**  
${EMOJI_MONEY} \`20 zł\`

${EMOJI_CHATGPT} **ChatGPT Plus FA 1 Month**  
${EMOJI_MONEY} \`40 zł\`

${EMOJI_CAPCUT} **CapCut Pro FA [LIFETIME]**  
${EMOJI_MONEY} \`20 zł\`

${EMOJI_NETFLIX} **Netflix Lifetime**  
${EMOJI_MONEY} \`20 zł\`

${EMOJI_HBO} **Max (HBO) Lifetime**  
${EMOJI_MONEY} \`10 zł\`

${EMOJI_DISNEY} **Disney+ Lifetime**  
${EMOJI_MONEY} \`10 zł\`

${EMOJI_CRUNCHY} **Crunchyroll Fan Lifetime**  
${EMOJI_MONEY} \`10 zł\`

${EMOJI_CDA} **CDA Premium Lifetime**  
${EMOJI_MONEY} \`10 zł\``
          )
          .setFooter({ text: "StarX Exchange • Najniższe ceny" });

        return interaction.reply({
          embeds: [embed],
          flags: 64
        });
      }

      // =====================
      // VPN
      // =====================
      if (interaction.values[0] === "vpn") {

        const embed = new EmbedBuilder()
          .setColor("#1b2dff")
          .setTitle(`${EMOJI_NORD} StarX Exchange » VPN`)
          .setDescription(
`${EMOJI_NORD} **NordVPN (Private) [LIFETIME]**  
${EMOJI_MONEY} \`15 zł\`

${EMOJI_MULLVAD} **Mullvad VPN [LIFETIME]**  
${EMOJI_MONEY} \`40 zł\`

${EMOJI_TUNNEL} **Tunnel Bear [VPN]**  
${EMOJI_MONEY} \`20 zł\``
          )
          .setFooter({ text: "StarX Exchange • VPN Store" });

        return interaction.reply({
          embeds: [embed],
          flags: 64
        });
      }

    } catch (err) {
      console.log("❌ Menu error:", err);
    }
  });
};

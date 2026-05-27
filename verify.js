const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");

module.exports = (client) => {

    // =========================================
    // CONFIG
    // =========================================
    const VERIFY_CHANNEL_ID = "1509272463484129383";
    const VERIFIED_ROLE_ID = "1509272462922354896";

    // kanały do pinga po weryfikacji
    const PING_CHANNELS = [
        "1509272463484129385",
        "1509272463672868903",
        "1509272463832383552",
        "1509272463672868901",
        "1509272463672868899",
        "1509272463672868897",
        "1509272463672868903"
    ];

    // =========================================
    // CUSTOM EMOJIS
    // =========================================
    const EMOJIS = {
        verify: "<a:verify:1509274073518313623>",
        shield: "<:shield:1509273605857345606>",
        pin: "<:pin:1509273884279705800>"
    };

    // przechowywanie odpowiedzi
    const challenges = new Map();

    // =========================================
    // GENEROWANIE DZIAŁANIA
    // =========================================
    function generateMath() {

        const isAdd = Math.random() > 0.5;

        // DODAWANIE
        if (isAdd) {

            const a = Math.floor(Math.random() * 16);
            const b = Math.floor(Math.random() * (31 - a));

            return {
                question: `🟢 ${a} + ${b}`,
                answer: a + b
            };
        }

        // ODEJMOWANIE
        const a = Math.floor(Math.random() * 31);
        const b = Math.floor(Math.random() * (a + 1));

        return {
            question: `🔴 ${a} − ${b}`,
            answer: a - b
        };
    }

    // =========================================
    // TWORZENIE MENU
    // =========================================
    function createMenu() {

        return new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("verify_select")
                .setPlaceholder("Kliknij aby się zweryfikować")
                .addOptions([
                    {
                        label: "Zweryfikuj się",
                        description: "Rozwiąż działanie matematyczne",
                        value: "math",
                        emoji: {
                            id: "1509274073518313623",
                            animated: true
                        }
                    }
                ])
        );
    }

    // =========================================
    // PANEL
    // =========================================
    async function sendPanel() {

        const channel = await client.channels.fetch(VERIFY_CHANNEL_ID);

        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`${EMOJIS.shield}・Weryfikacja`)
            .setDescription(
                [
                    `> ${EMOJIS.pin} Kliknij menu poniżej`,
                    `> ${EMOJIS.verify} Rozwiąż proste działanie matematyczne`,
                    `> ${EMOJIS.shield} Odbierz dostęp do serwera`
                ].join("\n")
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({
                text: "System zabezpieczeń serwera"
            })
            .setTimestamp();

        await channel.send({
            embeds: [embed],
            components: [createMenu()]
        });
    }

    // =========================================
    // READY
    // =========================================
    client.once(Events.ClientReady, async () => {

        console.log(`${client.user.tag} online`);

        await sendPanel();
    });

    // =========================================
    // INTERAKCJE
    // =========================================
    client.on(Events.InteractionCreate, async (interaction) => {

        // =====================================
        // SELECT MENU
        // =====================================
        if (interaction.isStringSelectMenu()) {

            if (interaction.customId !== "verify_select") return;

            const math = generateMath();

            challenges.set(interaction.user.id, math.answer);

            const modal = new ModalBuilder()
                .setCustomId("math_modal")
                .setTitle("Weryfikacja");

            const input = new TextInputBuilder()
                .setCustomId("math_answer")
                .setLabel(`Ile to: ${math.question} ?`)
                .setPlaceholder("Wpisz poprawny wynik")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(3);

            const row = new ActionRowBuilder().addComponents(input);

            modal.addComponents(row);

            await interaction.showModal(modal);

            // =================================
            // RESET SELECT MENU
            // =================================
            setTimeout(async () => {

                await interaction.message.edit({
                    components: [createMenu()]
                }).catch(() => {});

            }, 500);
        }

        // =====================================
        // MODAL SUBMIT
        // =====================================
        if (interaction.isModalSubmit()) {

            if (interaction.customId !== "math_modal") return;

            const userAnswer = interaction.fields.getTextInputValue("math_answer");
            const correctAnswer = challenges.get(interaction.user.id);

            // =================================
            // POPRAWNA ODPOWIEDŹ
            // =================================
            if (Number(userAnswer) === correctAnswer) {

                challenges.delete(interaction.user.id);

                const member = await interaction.guild.members.fetch(interaction.user.id);

                // dodanie roli
                await member.roles.add(VERIFIED_ROLE_ID);

                // =================================
                // PING NA KANAŁACH
                // =================================
                for (const channelId of PING_CHANNELS) {

                    try {

                        const channel = await client.channels.fetch(channelId);

                        if (!channel) continue;

                        const message = await channel.send({
                            content: `${interaction.user}`
                        });

                        // usuń po 1 sekundzie
                        setTimeout(async () => {
                            await message.delete().catch(() => {});
                        }, 1000);

                    } catch (err) {
                        console.log(`Błąd kanału ${channelId}:`, err.message);
                    }
                }

                // =================================
                // SUKCES
                // =================================
                const successEmbed = new EmbedBuilder()
                    .setColor("#57F287")
                    .setDescription(
                        `${EMOJIS.verify} **Pomyślnie przeszedłeś weryfikację!**`
                    );

                await interaction.reply({
                    embeds: [successEmbed],
                    ephemeral: true
                });

            } else {

                // =================================
                // BŁĘDNA ODPOWIEDŹ
                // =================================
                const errorEmbed = new EmbedBuilder()
                    .setColor("#ED4245")
                    .setDescription(
                        "❌ **Błędna odpowiedź! Spróbuj ponownie.**"
                    );

                await interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }
        }
    });
};

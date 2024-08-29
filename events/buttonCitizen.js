const { Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
        if ( interaction.isButton() ) {
            if (interaction.customId == "citizenbutton") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Registering Citizen", ephemeral: true,
                    });
                    const modal = new ModalBuilder()
                        .setCustomId('nicknamemodal')
                        .setTitle("Citizen information");
                    const nicknameInput = new TextInputBuilder()
                        .setCustomId('nicknameinput')
                        .setLabel("Insert your 'in-city' [Name][Surname]")
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(3)
                        .setRequired(true);
                    const firstActionRow = new ActionRowBuilder().addComponents(nicknameInput);
                    modal.addComponents(firstActionRow);
                    await interaction.showModal(modal);
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Button Citizen.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
        }
    },
};
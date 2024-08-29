const { Events, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId === "closeChannel") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Attempting to close the ticket", ephemeral: true,
                    });
                    const closeYesButton = new ButtonBuilder()                 
                        .setCustomId('closeyes')
                        .setLabel("✅ Close Ticket")
                        .setStyle(ButtonStyle.Success)
                    const closeNoButton = new ButtonBuilder()                 
                        .setCustomId('closeno')
                        .setLabel("❌ Cancel")
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(false);
                    const confirmEmbed = new EmbedBuilder()
                        .setDescription(`Are you sure you want to close this ticket?`)
                    await interaction.channel.send({                           
                        embeds: [confirmEmbed],
                        components: [new ActionRowBuilder().addComponents(closeYesButton).addComponents(closeNoButton)]                            
                    });
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Button Close Ticket.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};
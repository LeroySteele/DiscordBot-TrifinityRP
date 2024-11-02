const { Events } = require('discord.js');
const ids = require('../data/ids');

module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId === "closeno") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Are you sure?", ephemeral: true,
                    });
                    const mes = await interaction.channel.messages.fetch({ limit: 2 });
                    mes.forEach((msg) => {
                        if (msg.author.id === ids.CLIENT_ID) msg.delete();
                    });
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Button close no.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};
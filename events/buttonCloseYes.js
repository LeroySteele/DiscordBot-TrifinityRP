const { Events, EmbedBuilder, Collection } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId === "closeyes") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Deleting ticket and creating a transcript", ephemeral: true,
                    });
                    async function fetchMore(channel, limit = 250) {
                        if (!channel) {
                            throw new Error(`Expected channel, got ${typeof channel}.`);
                        }
                        if (limit <= 100) {
                            return channel.messages.fetch({ limit });
                        }
                        let collection = new Collection();
                        let lastId = null;
                        let options = {};
                        let remaining = limit;
                        while (remaining > 0) {
                            options.limit = remaining > 100 ? 100 : remaining;
                            remaining = remaining > 100 ? remaining - 100 : 0;
                            if (lastId) {
                                options.before = lastId;
                            }
                            let messages = await channel.messages.fetch(options);
                            if (!messages.last()) {
                            break;
                            }
                            collection = collection.concat(messages);
                            lastId = messages.last().id;
                        }
                        return collection;
                    }
                    const meslist = await fetchMore(interaction.channel, 250);
                    let R = "";
                    await meslist.forEach( m => {
                        if ( R.includes(m.author.id) ) {

                        } else {
                            R = R.concat("<@" + m.author.id + ">\n"); 
                        }
                    });
                    const attachment = await discordTranscripts.createTranscript(interaction.channel);
                    const playerid = meslist.last().content.replace('<', '').replace('@', '').replace('$', '').replace('{', '').replace('}', '').replace('>', '');
                    const player = await interaction.client.users.fetch(playerid);
                    if ( (interaction.channel.parentId === idList.policeApplicationsCategory) ) {
                        const transcriptChan = interaction.client.channels.cache.find(ch => ch.id === idList.policeApplicationsTrans);
                        const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                        const transEmbed = new EmbedBuilder()
                        .setAuthor({ name: 'Trifinity PD', iconURL: botAvatar.displayAvatarURL() })
                        .setTitle('Police application Ticket')
                        .addFields(
                            { name: 'Ticket Owner', value: player.username + `\n` + meslist.last().content , inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Closed by', value: interaction.user.username + `\n` + `<@${interaction.user.id}>` , inline: true },
                        )
                        .addFields(
                            { name: 'Ticket Name', value: interaction.channel.name, inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Users in transcript', value: R, inline: true },
                        )
                        .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });
                        await transcriptChan.send({
                            embeds: [transEmbed],
                            files: [attachment]
                        }).then(await interaction.channel.delete());
                    } else if ( (interaction.channel.parentId === idList.citizenComplaintsCategory) ) {
                        const transcriptChan = interaction.client.channels.cache.find(ch => ch.id === idList.citizenComplaintsTrans);
                        const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                        const transEmbed = new EmbedBuilder()
                        .setAuthor({ name: 'Trifinity PD', iconURL: botAvatar.displayAvatarURL() })
                        .setTitle('Citizen Complaints Ticket')
                        .addFields(
                            { name: 'Ticket Owner', value: player.username + `\n` + meslist.last().content , inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Closed by', value: interaction.user.username + `\n` + `<@${interaction.user.id}>` , inline: true },
                        )
                        .addFields(
                            { name: 'Ticket Name', value: interaction.channel.name, inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Users in transcript', value: R, inline: true },
                        )
                        .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });
                        await transcriptChan.send({
                            embeds: [transEmbed],
                            files: [attachment]
                        }).then(await interaction.channel.delete());
                    } else if ( (interaction.channel.parentId === idList.policeComplaintsCategory) ) {
                        const transcriptChan = interaction.client.channels.cache.find(ch => ch.id === idList.policeComplaintsTrans);
                        const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                        const transEmbed = new EmbedBuilder()
                        .setAuthor({ name: 'Trifinity PD', iconURL: botAvatar.displayAvatarURL() })
                        .setTitle('Police Complaints Ticket')
                        .addFields(
                            { name: 'Ticket Owner', value: player.username + `\n` + meslist.last().content , inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Closed by', value: interaction.user.username + `\n` + `<@${interaction.user.id}>` , inline: true },
                        )
                        .addFields(
                            { name: 'Ticket Name', value: interaction.channel.name, inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Users in transcript', value: R, inline: true },
                        )
                        .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });
                        await transcriptChan.send({
                            embeds: [transEmbed],
                            files: [attachment]
                        }).then(await interaction.channel.delete());
                    } else if ( (interaction.channel.parentId === idList.applicationsAndPermitsCategory) ) {
                        const transcriptChan = interaction.client.channels.cache.find(ch => ch.id === idList.PermitsTrans);
                        const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                        const transEmbed = new EmbedBuilder()
                        .setAuthor({ name: 'Trifinity PD', iconURL: botAvatar.displayAvatarURL() })
                        .setTitle('Applications-and-Permits Tickets')
                        .addFields(
                            { name: 'Ticket Owner', value: player.username + `\n` + meslist.last().content , inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Closed by', value: interaction.user.username + `\n` + `<@${interaction.user.id}>` , inline: true },
                        )
                        .addFields(
                            { name: 'Ticket Name', value: interaction.channel.name, inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Users in transcript', value: R, inline: true },
                        )
                        .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });
                        await transcriptChan.send({
                            embeds: [transEmbed],
                            files: [attachment]
                        }).then(await interaction.channel.delete());
                    } else if ( (interaction.channel.parentId === idList.divisionTestApplicationsCategory) ) {
                        const transcriptChan = interaction.client.channels.cache.find(ch => ch.id === idList.divisionTestsTrans);
                        const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                        const transEmbed = new EmbedBuilder()
                        .setAuthor({ name: 'Trifinity PD', iconURL: botAvatar.displayAvatarURL() })
                        .setTitle('Division test applications')
                        .addFields(
                            { name: 'Ticket Owner', value: player.username + `\n` + meslist.last().content , inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Closed by', value: interaction.user.username + `\n` + `<@${interaction.user.id}>` , inline: true },
                        )
                        .addFields(
                            { name: 'Ticket Name', value: interaction.channel.name, inline: true },
                            { name: " ", value: " ", inline: true },
                            { name: 'Users in transcript', value: R, inline: true },
                        )
                        .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });
                        await transcriptChan.send({
                            embeds: [transEmbed],
                            files: [attachment]
                        }).then(await interaction.channel.delete());
                    } else {
                        await interaction.editReply({ content: `You are not allowed to close this channel, as this isn't a ticket`, ephemeral: true });
                    };
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Button Close Yes.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};
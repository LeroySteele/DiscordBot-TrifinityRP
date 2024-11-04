// Used to create a ticket, adds the required members and then sends the relative information based on the ticket type.

const { Events, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "pdcomplaintsbutton") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Creating ticket to complain about a fellow officer", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const deleteTicket = new ButtonBuilder()                                       
                        .setCustomId('closeChannel')
                        .setLabel("🗑️ Close Ticket")
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(false);
                    const ticketEmbed = new EmbedBuilder()
                        .setTitle('Officer complaints')
                        .setDescription(`Thanks for bringing this to our attention! We take complaints between Po-Po's seriously. Our team is on the case, ready to investigate.\n\nHang tight while we delve into the matter. Together, we'll ensure our precinct remains a shining beacon of professionalism.`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Trifinity PD',iconURL:  botAvatar.displayAvatarURL() });
                    const server = await interaction.client.guilds.fetch(interaction.guild.id);
                    const member = await server.members.cache.find((member) => member.id === interaction.user.id);
                    const num = member.nickname.indexOf(")") + 1;
                    let result = member.nickname.substr(num);
                    if ( member.nickname === null ) {
                        await interaction.editReply({ content: `You need to change your discord nickname to your 'in-city' name`, ephemeral: true });
                        return;
                    } else {
                        const channel = await interaction.guild.channels.create({
                            name: result + " PD complaint",
                            parent: idList.policeComplaintsCategory,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.roles.everyone,
                                    deny: [ PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.AttachFiles,
                                            PermissionsBitField.Flags.BanMembers, PermissionsBitField.Flags.ChangeNickname, PermissionsBitField.Flags.CreateInstantInvite,
                                            PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                            PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                            PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                            PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory,
                                            PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages,
                                            PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers,
                                            PermissionsBitField.Flags.ViewAuditLog, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ViewCreatorMonetizationAnalytics,
                                            PermissionsBitField.Flags.ViewGuildInsights],
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks,
                                            PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendTTSMessages,
                                            PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalEmojis,
                                            PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],  
                                },
                                {
                                    id: idList.commissionerRole,           
                                    allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                            PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                            PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                            PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                            PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                            PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                            PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                                },
                                {
                                    id: idList.highCommandRole,           
                                    allow: [PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ChangeNickname,
                                            PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels,
                                            PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageGuildExpressions, PermissionsBitField.Flags.ManageMessages,
                                            PermissionsBitField.Flags.ManageNicknames, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageWebhooks,
                                            PermissionsBitField.Flags.ModerateMembers, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages,
                                            PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseApplicationCommands,
                                            PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.ViewChannel],   
                                }
                            ],
                            type: ChannelType.GuildText,
                        }).catch().then(
                            channel => channel.send(
                                {
                                    content: `<@${interaction.user.id}>`,
                                    embeds: [ticketEmbed], 
                                    components: [new ActionRowBuilder().addComponents(deleteTicket)]
                                }
                            )   
                        );
                    }
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Button Cop Complaint.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};

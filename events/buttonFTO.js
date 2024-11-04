// Used to create a ticket, adds the required members and then sends the relative information based on the ticket type.

const { Events, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "ftobutton") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Creating FTO Application", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('👨‍🏫 ︱ ***Field Training Officer Application***')
                        .setDescription(`‎ \nLead the next generation of law enforcement professionals as part of the FTO Team.\n\nExperienced officers who excel in mentorship, instruction, and guiding new recruits should apply to shape the future of the department.\n\nUse the button below and fill out the paperwork.\n\n<@&` + idList.ftoLeadRole + `>`)
                        .setImage("https://media.discordapp.net/attachments/1233706893772591104/1233707359998705694/copPaperwork3.PNG?ex=662e1303&is=662cc183&hm=9a80b23b4a023c73999c7e185217bf6c18f81fb407cd0551f6010fcbf6934eb8&=&format=webp&quality=lossless&width=385&height=369")
                        .setFooter({text: 'Trifinity PD', iconURL: botAvatar.displayAvatarURL() });
                    const server = await interaction.client.guilds.fetch(interaction.guild.id);
                    const member = await server.members.cache.find((member) => member.id === interaction.user.id);
                    if ( member.nickname === null ) {
                        await interaction.editReply({ content: `You need to change your discord nickname to your 'in-city' name`, ephemeral: true });
                        return;
                    } else {
                        const num = member.nickname.indexOf(")") + 1;
                        let result = member.nickname.substr(num);
                        const channel = await interaction.guild.channels.create({
                            name: result + " fto certification",
                            parent: idList.divisionTestApplicationsCategory,
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
                                },
                                {
                                    id: idList.ftoLeadRole,           
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
                                    embeds: [initialEmbed], 
                                    components: [
                                        {
                                            "type" : 1,
                                            "components": [
                                                {
                                                    "type" : 2,
                                                    "label" : "👨‍🏫  FTO",
                                                    "style" : 5,
                                                    "url" : "https://docs.google.com/forms/d/14vOjB2UA_TmcU85-O_YWUgtrbG4ELaEU2DO0hwLidmM/edit"
                                                },
                                            ]
                                        },
                                        {
                                            "type" : 1,
                                            "components": [
                                                {
                                                    "type" : 2,
                                                    "label" : "🗑️ Close Ticket",
                                                    "style" : 4,
                                                    "custom_id" : "closeChannel"
                                                }
                                            ]
                                        }
                                        
                                    ]
                                }
                            )
                        );
                    }
                } catch (err) {
                    await interaction.editReply({
                        content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Button FTO.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};

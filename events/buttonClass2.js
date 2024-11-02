const { Events, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "class2button") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Creating class 2 certification application", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('🎯 ︱ ***Class 2 Certification***')
                        .setDescription(`‎ \nPlease answer in length and detail to increase your chances of passing. Please not that this certification is a privilege and not a right and can be removed at any time. It is important to remember that weapons should be stored in lockers/vehicles when not in use. You cannot open carry class 2s at all times\n\nAsk for a supervisor to assist you when you are done.\n\nUse the button to fill out the paperwork.`)
                        .setImage("https://media.discordapp.net/attachments/1233706893772591104/1235671365298950225/image.png?ex=66353823&is=6633e6a3&hm=fe0cfabb137510d66fb2e86c14736ed665f9686ac364fdd6d0b4f34e4af6bf2e&=&format=webp&quality=lossless&width=625&height=588")
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
                            name: result + " class 2 certification",
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
                                    id: idList.trtLeadRole,           
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
                                                    "label" : "🎯 ︱ Class 2 Certification",
                                                    "style" : 5,
                                                    "url" : "https://docs.google.com/forms/d/1KhEWXpxUqD3jht9xCRnBYSnqecUbPylFUupK2sKziDg/edit"
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
                        content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Button class2.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};
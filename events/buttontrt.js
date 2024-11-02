const { Events, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "trtbutton") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Creating TRT Application", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('⚔️ ︱ ***Tactical Response Team ***')
                        .setDescription(`‎ \nJoin the elite TRT for high-stakes operations requiring precision and teamwork.\n\nApplicants should apply for TRT if they thrive under pressure and are committed to protecting the community with advanced tactics and equipment.\n\nUse the button below and fill out the paperwork.\n\n<@&` + idList.trtLeadRole + `>`)
                        .setImage("https://media.discordapp.net/attachments/1233706893772591104/1233796363658067988/image.png?ex=662e65e7&is=662d1467&hm=e915115a7a3bda572f04525395dda71dcb207f8094874eaf59d2cd9c47a5b2f8&=&format=webp&quality=lossless&width=480&height=460")
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
                            name: result + " TRT certification",
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
                                                    "label" : "🎯  TRT",
                                                    "style" : 5,
                                                    "url" : "https://docs.google.com/forms/d/1UVpx-_omCsEuPaxeJxs9I2NKJIoTJFygXz47q4IUET8/edit"
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
                        content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Button TRT.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};
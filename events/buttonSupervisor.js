// Used to create a ticket, adds the required members and then sends the relative information based on the ticket type.

const { EmbedBuilder, PermissionsBitField, ChannelType, Events } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');
module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
		if ( interaction.isButton() ) {
			if (interaction.customId == "supperbutton") {
                try {
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.editReply({
                        content: "Creating suppervisor Application", ephemeral: true,
                    });
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('👨‍🎓 ︱ ***Supervisor Application***')
                        .setDescription(`‎ \nAs a higher supervisor, you'll play a pivotal role in charting the course for success and fostering an environment of growth and innovation.\n\nJoin us in shaping the future of our department and unlocking its full potential.\n\nIf you're ready to seize this opportunity and make a meaningful impact, take the first step by clicking the button below to initiate the application process.`)
                        .setImage("https://media.discordapp.net/attachments/1233706893772591104/1234545288580960326/image.png?ex=66311f65&is=662fcde5&hm=5e3ce000f26282eb411092f7346242771ede6c7e49676f511787021f1df0ece7&=&format=webp&quality=lossless&width=290&height=280")
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
                            name: result + " suppervisor certification",
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
                                                    "label" : "👨‍🎓 Supervisor",
                                                    "style" : 5,
                                                    "url" : "https://docs.google.com/forms/d/1QIQ-ZqnPuSm_abmjf3XQTu6BpZmLw6sStU-8wiRIAQo/edit"
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
                        content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Button Supervisor.`, ephemeral: true,
                    });
                    console.error(err);
                }
            }
		}
    },
};

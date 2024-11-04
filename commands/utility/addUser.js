// By default only the ticket creater and select members are given permission to see/interact with the ticket, this command allows new members to be added and gives them permissions
// A messege is sent in the ticket notifying other members about the addition

const { SlashCommandBuilder } = require('discord.js');
const idList = require('../../data/idList');

module.exports = { 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('adduser')
        .setDescription('Add a user to this ticket.')
        .addUserOption((option) => 
            option
            .setName('user')
            .setDescription('Select a username.')
            .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
                content: "Adding user to ticket", ephemeral: true,
            });
            if (    (interaction.channel.parentId === idList.policeApplicationsCategory) ||
                    (interaction.channel.parentId === idList.citizenComplaintsCategory ) ||
                    (interaction.channel.parentId === idList.applicationsAndPermitsCategory ) ||
                    (interaction.channel.parentId === idList.policeComplaintsCategory ) ||
                    (interaction.channel.parentId === idList.enrollIntoTheAcademyCategory ) ||
                    (interaction.channel.parentId === idList.divisionTestApplicationsCategory )
            ){
                if ( (interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) || (interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) || (interaction.member.roles.cache.some(role => role.id === idList.highCommandRole))|| (interaction.member.roles.cache.some(role => role.id === idList.supervisorRole)) ) {
                    const playerid = interaction.options.get('user').value;
                    await interaction.channel.permissionOverwrites.edit(playerid, { AddReactions: true, AttachFiles: true, EmbedLinks: true, ReadMessageHistory: true, SendMessages: true, SendTTSMessages: true, SendVoiceMessages: true,
                                                                                    UseApplicationCommands: true, UseExternalEmojis: true, UseExternalStickers: true, ViewChannel: true});
                    await interaction.channel.send({content:  "<@" + playerid + "> has been added to the ticket."});
                } else {
                    await interaction.editReply({
                        content: "Only HC and supervisors can use this command", ephemeral: true,
                    });
                };
            } else {
                await interaction.editReply({
                    content: "You are unable to add a user here as this isn't a ticket", ephemeral: true,
                });
            };
        } catch (err) {
            await interaction.editReply({
				content: `An error has occurred, please try again in a bit and if the problem persists contact a high command officer. Code: AddUser.`, ephemeral: true,
			});
            console.error(err);
        };
    }
};

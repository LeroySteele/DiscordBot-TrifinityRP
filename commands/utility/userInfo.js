// This command gets used by administrators/staff to view information about a certain users account

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList.js');

module.exports = { 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Use this command to view information about a user')
        .addUserOption(option => 
            option
            .setName('username')
            .setDescription('Discord username.')
            .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
                content: "Fetching user information.", ephemeral: true,
            });
            const chan = interaction.client.channels.cache.find(ch => ch.id === interaction.channelId);
            if( (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.highCommandRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) ){
                const member = interaction.options.getUser('username');
                const profile = await interaction.client.users.fetch(member.id);
                let R = "";
                const person = interaction.options.getMember('username');
                interaction.guild.roles.cache.forEach(role => {
                    if ( person.roles.cache.has(role.id) ) {  //member
                        if( (role.name === "@everyone") || (role.id === idList.assignedRolesHeading) || (role.id === idList.achieveableRolesHeading) || (role.id === idList.personalisedRolesHeading) || (role.id === idList.specialRolesHeading) || (role.id === idList.notificationsHeading) || (role.id === idList.discLevels) || (role.id === idList.warningsHeading) ) {
                        } else {
                            R = R.concat("<@&" + role.id + "> ");
                        }
                    };
                });
                const arrayPerms = person.permissions.toArray();
                let perms = "";
                for (var i = 0; i < arrayPerms.length; i++) {
                  perms = perms.concat(arrayPerms[i] + ", ");
                }
                const userEmbed = new EmbedBuilder()
                .setAuthor({ name: profile.username, iconURL: profile.displayAvatarURL() }) 
                .setColor([255,0,0])
                .setThumbnail( profile.displayAvatarURL() )
                .setDescription(`<@${member.id}>`)
                .addFields(
                    { name: 'Joined Discord', value: profile.createdAt.toDateString(), inline: true },
                    { name: 'Joined Server', value: person.joinedAt.toDateString()},
                )
                .addFields(
                    { name: 'Roles', value: R },
                )
                .addFields(
                    { name: 'Key Permissions', value: perms },
                )
                .setFooter( { text: `ID: ${member.id}`} );
                await chan.send({
                    embeds: [userEmbed]
                });
            } else{
                await interaction.editReply({
                    content: "Only HC and supervisors can view user's profiles.", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: User Info.`, ephemeral: true,
            });
            console.error(err);
        }
    },
};

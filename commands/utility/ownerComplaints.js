// This is used to send the initial messege that contains the button where users can open a ticket. (citizens complaint ticket)
// This command can only get used by certain roles and only in 1 specific channel

const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');

module.exports = { 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ownercomplaintsmessage')
        .setDescription('Create initial message for citizen complaints'),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
                content: "Creating complaint message", ephemeral: true,
            });
            if ( (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) ) {
                if ( interaction.channelId === idList.complaintsChannel ) {
                    const complaintButton = new ButtonBuilder()                 
                        .setCustomId('complaintsbutton')
                        .setLabel("🛂 File Complaint")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('Voice your concerns')
                        .setDescription(`Step right up, folks! Welcome to our one-stop-shop for airing your grievances, whether they're as minor as a flat soda or as major as a case of mistaken identity with the local police.\n\nGot a complaint about behavior, content, or anything else under the sun? Don't be shy, spill the beans! Our team of complaint connoisseurs is here to turn your frowns upside down faster than you can say "police brutality."\n\nSo, unleash your inner critic, and let's keep this community circus from turning into a three-ring nightmare. Thanks for joining us on this wild ride through the land of gripes and giggles!`)
                        .setImage( "https://media.discordapp.net/attachments/1233706893772591104/1233707311470481408/copPaperwork2.PNG?ex=662e12f8&is=662cc178&hm=b90778fc7bc0136703fd21057fb06143175f315cc0694e9d6e65a83cabb0bd41&=&format=webp&quality=lossless&width=294&height=280" )
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Trifinity RP',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({                           
                        embeds: [initialEmbed],
                        components: [new ActionRowBuilder().addComponents(complaintButton)]                            
                    });
                } else {
                    await interaction.editReply({
                        content: "This command can only be used in the 'complaints' channel", ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: "Only government and HC can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Owner Complaints.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};

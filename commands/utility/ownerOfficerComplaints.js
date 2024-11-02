const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');

module.exports = { 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ownerpdcomplaintsmessage')
        .setDescription('Create initial message for PD complaints'),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
                content: "Creating PD complaint message", ephemeral: true,
            });
            if ( (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) ) {
                if ( interaction.channelId === idList.officerComplaintsChannel ) {
                    const pdcomplaintButton = new ButtonBuilder()                 
                        .setCustomId('pdcomplaintsbutton')
                        .setLabel("📋 File Complaint")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('Officer-to-Officer Complaints')
                        .setDescription(`Alright, folks, welcome to our Po-Po to Po-Po Complaint! Whether it's as small as a disagreement over who forgot to refill the coffee pot in the break room or as serious as feeling like you've stumbled into a buddy cop movie gone wrong, we're here to listen!\n\nGot a complaint about a fellow officer's behavior, actions, or anything else that's got you questioning whether you're in the right precinct?\n\nDon't hesitate, lay it on us!`)
                        .addFields({ name: ' ', value: ' ' })
                        .setImage( "https://media.discordapp.net/attachments/1233706893772591104/1233707335407632455/copPaperwork.PNG?ex=662e12fd&is=662cc17d&hm=79961a0ffbb67f668fb0b40c65e4ce59eea820762f2c042f91d6e9d7a88bd32b&=&format=webp&quality=lossless&width=391&height=367" )
                        .setFooter({text: 'Trifinity RP',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({                           
                        embeds: [initialEmbed],
                        components: [new ActionRowBuilder().addComponents(pdcomplaintButton)]                            
                    });
                } else {
                    await interaction.editReply({
                        content: "This command can only be used in the 'officer complaints' channel", ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: "Only government and HC can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Officer Complaint.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
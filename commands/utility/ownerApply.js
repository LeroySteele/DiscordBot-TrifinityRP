const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ownerapplymessage')
        .setDescription('Create initial message for police applications'),
    async execute(interaction) { 
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
                content: "Creating application message", ephemeral: true,
            });
            if ( (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) ) {
                if ( interaction.channelId === idList.applyNowChannel ) {
                    const applyNowButton = new ButtonBuilder()                 
                        .setCustomId('applynowbutton')
                        .setLabel("📋 Apply")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('Police Application')
                        .setDescription(`Ready to be a real-life superhero? Join the PO PO!\n\nChase bad guys, rock the uniform, and get free donuts.\n\nPlus, you'll be a smooth talker extraordinaire.\n\nLet's make crime-fighting fun together!`)
                        .addFields({ name: ' ', value: ' ' })
                        .setImage( "https://media.discordapp.net/attachments/1217018890924589156/1217019888724607026/banner_ticktok.png?ex=66276b18&is=6614f618&hm=16b4013c213ace3a914dde6c49610b652548fce0a6e1c731d7d5676317250790&=&format=webp&quality=lossless&width=971&height=364" )
                        .setFooter({text: 'Trifinity RP',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({                           
                        embeds: [initialEmbed],
                        components: [new ActionRowBuilder().addComponents(applyNowButton)]                            
                    });
                } else {
                    await interaction.editReply({
                        content: "This command can only be used in the 'apply-now' channel", ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: "Only government and HC can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Owner Apply.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
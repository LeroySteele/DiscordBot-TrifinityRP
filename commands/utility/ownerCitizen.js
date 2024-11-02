const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');

module.exports = { 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ownercitizen')
        .setDescription('Create initial message to register citizens'),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
                content: "Creating citizen message", ephemeral: true,
            });
            if ( (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) ) {
                if ( interaction.channelId === idList.joinPDChannel ) {
                    const citizenButton = new ButtonBuilder()                 
                        .setCustomId('citizenbutton')
                        .setLabel("📋 Register")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('Welcome!')
                        .setDescription(`Ready to become part of the community of upstanding citizens?\n\nClick 'Register' to join us and update your in city name.`)
                        .addFields({ name: ' ', value: ' ' })
                        .setFooter({text: 'Trifinity RP',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({                           
                        embeds: [initialEmbed],
                        components: [new ActionRowBuilder().addComponents(citizenButton)]                            
                    });
                } else {
                    await interaction.editReply({
                        content: "This command can only be used in the 'View PD Discord", ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: "Only government and HC can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Owner Citizen.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
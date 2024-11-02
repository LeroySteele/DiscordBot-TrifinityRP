const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');
const { content } = require('googleapis/build/src/apis/content/index.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('suggestion')
        .setDescription('Use this command to submit a suggestion.')
        .addStringOption((option) => 
            option
            .setName('topic')
            .setDescription('Provide us with the topic of your suggestion.')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('suggestion')
            .setDescription('Provide us with the description and benefits of your suggestion.')
            .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            if (interaction.channelId === idList.suggestionChannel){
                await interaction.editReply({
                    content: "Creating suggestion", ephemeral: true,
                });
                const sugTopic = interaction.options.get('topic').value;
                const suggestion = interaction.options.get('suggestion').value;
                const chan = interaction.client.channels.cache.find(ch => ch.id === interaction.channelId);
                const server = await interaction.client.guilds.fetch(interaction.guild.id);
                const member = await server.members.cache.find((member) => member.id === interaction.user.id);

                const initialEmbed = new EmbedBuilder()
                    .setTitle('PD Suggestion')
                    .setDescription(`- **Topic: **` + sugTopic + `\n- **Suggestion: **` + suggestion + `\n- **Suggested by: **` + member.nickname)
                    .addFields({ name: ' ', value: ' ' });
                const mes = await chan.send({
                    embeds: [initialEmbed]
                });
                mes.startThread({
                    name: sugTopic,
                });
            } else {
                await interaction.reply({
                    content: "You can only use this command in the suggestion channel", ephemeral: true,
                });
            };
        } catch (error) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Suggestions.`, ephemeral: true,
            });
            console.log(error);
        }
    }
};
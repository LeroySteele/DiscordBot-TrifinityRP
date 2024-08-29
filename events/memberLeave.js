const { Events, EmbedBuilder } = require('discord.js');
const idList = require('../data/idList.js');
const ids = require('../data/ids');

module.exports = { 
    name:Events.GuildMemberRemove,
    async execute(member) {
        try {
            const botAvatar = await member.client.users.fetch(ids.CLIENT_ID);
            const userAvatar = await member.client.users.fetch(member.user.id);
            const logEmbed = new EmbedBuilder()
                .setDescription(`<@${member.id}> has left the server `)
                .setThumbnail(userAvatar.displayAvatarURL())
                .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });
            const logs = member.client.channels.cache.find((ch) => ch.id === idList.botLogsChannel);
            await logs.send({
                embeds: [logEmbed],
            });
        } catch (err) {
            console.error(err);
        }
    }
};
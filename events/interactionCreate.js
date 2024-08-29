const { Events, Collection, EmbedBuilder } = require('discord.js');
const idList = require('../data/idList.js');
const ids = require('../data/ids.js');

module.exports = { 
	name: Events.InteractionCreate,
	async execute(interaction) {
		try {
			if ( interaction.isChatInputCommand() ) {
				const command = interaction.client.commands.get(interaction.commandName);
				const { cooldowns } = interaction.client;
				if (!cooldowns.has(command.data.name)) {
					cooldowns.set(command.data.name, new Collection ());
				}
				const now = Date.now();
				const timestamps = cooldowns.get(command.data.name);
				const defaultCooldownDuration = 3;
				const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;
				if (timestamps.has(interaction.user.id)) {
					const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
					if (now < expirationTime) {
						const expiredTimestamp = Math.round(expirationTime / 1_000);
						return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
					}
				}
				timestamps.set(interaction.user.id, now);
				setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
				if (!command) {
					console.error(`No command matching ${interaction.commandName} was found.`);
					return;
				}
				try {
					await command.execute(interaction);
				} catch (error) {
					console.error(`Error executing ${interaction.commandName}`);
					console.error(error);
				}
			} else if (interaction.isModalSubmit() ) {
				if (interaction.customId === 'nicknamemodal') {
					const cityName = interaction.fields.getTextInputValue('nicknameinput');
					const info = [];
					info[0] = cityName.toLowerCase().split(" ")
					const newName = info.map(val => val[0][0].toUpperCase() + val[0].slice(1) + " " + val[1][0].toUpperCase() + val[1].slice(1) );
					const strName = "" + newName;
					await interaction.reply({
						content: "Name saved as : " + strName, ephemeral: true,
					});
					const server = await interaction.client.guilds.fetch(interaction.guild.id);
					const member = await server.members.cache.find((member) => member.id === interaction.user.id);
					await member.setNickname(strName);
					await member.roles.remove(idList.alienRole);
					await member.roles.add(idList.CitizenRole);
					const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
					const profile = await interaction.client.users.fetch(member.id);
					const logEmbed = new EmbedBuilder()
						.setDescription(`<@${interaction.user.id}> set their name to ${newName}`)
						.setThumbnail(profile.displayAvatarURL())
						.setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });
					const logs = interaction.client.channels.cache.find(ch => ch.id === idList.botLogsChannel );
					await logs.send({
						embeds: [logEmbed],
					});
				}
			}
		} catch (err) {
			console.log(err);
		}
	},
};
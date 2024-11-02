const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');

module.exports = { 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ownerlicencemessage')
        .setDescription('Create initial message for applications and permits'),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
                content: "Creating application message", ephemeral: true,
            });
            if ( (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) ) {
                if ( interaction.channelId === idList.PermitsChannel ) {
                    const permitsButton = new ButtonBuilder()                 
                        .setCustomId('permitsbutton')
                        .setLabel("🗂️ Apply for a licence")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('Licences and permits')
                        .setDescription(`Welcome, permit seekers! Dive into our streamlined hub for all your permit needs. Simply click "Apply for a License" and complete the application that follows.\n\nWhether it's for an event, a gun or a project, we've got you covered. Our expert team is here to guide you through requirements and deadlines, ensuring a smooth process.\n\nLet's make your permit journey hassle-free and successful. Thanks for choosing us as your permit partner!\n\n`)
                        .addFields({ name: ' ', value: ' ' })
                        .setImage( "https://media.discordapp.net/attachments/1233706893772591104/1233712263714705408/gunpermit.PNG?ex=662e1794&is=662cc614&hm=a587389484796f31e634921bab71db17181bc7b72e5a12fdbd1b3961fa3636d9&=&format=webp&quality=lossless&width=392&height=371" )
                        .setFooter({text: 'Trifinity RP',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({                           
                        embeds: [initialEmbed],
                        components: [new ActionRowBuilder().addComponents(permitsButton)]                            
                    });
                } else {
                    await interaction.editReply({
                        content: "This command can only be used in the 'permits' channel", ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: "Only government and HC can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Owner Permits.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
const { SlashCommandBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');

module.exports = {
    cooldown: 5, 
    data: new SlashCommandBuilder()
        .setName('ownerenrollnowmessage')
        .setDescription('Create initial message for the academy.'),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({
                content: "Creating academy message", ephemeral: true,
            });
            if ( (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) ) {
                if ( interaction.channelId === idList.divisionTestsChannel ) {
                    const enrollButton = new ButtonBuilder()                 
                        .setCustomId('enrollbutton')
                        .setLabel("📋 Enroll")
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false);
                    const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                    const initialEmbed = new EmbedBuilder()
                        .setTitle('Looking to further your career with certifications?')
                        .setDescription(
                            `‎ \n**Available certifications for Senior Deputy/Officer and higher : **` + 
                            `\n\n- 🎯 ︱ ***Class 2 Certification***\nIncrease your potential with access to higher calibre (class 2) weaponry for normal patrol.` +
                            `\n\n- ⚔️ ︱ ***Tactical Response Team (TRT)***\nJoin the elite TRT for high-stakes operations requiring precision and teamwork. Applicants should apply for TRT if they thrive under pressure and are committed to protecting the community with advanced tactics and equipment.\n__Just remember when applying for TRT you first require class 2 certification__` +
                            `\n\n- 🏎️ ︱ ***Inteceptor Certified***\nSeeking skilled drivers for adrenaline-fueled pursuits. Candidates for the Interceptor Team should apply if they possess exceptional driving abilities, quick reflexes, and a dedication to maintaining public safety on the roads.` + 
                            `\n\n- 🚁 ︱ ***Air 1***\nTake flight with the Air 1 Unit for aerial law enforcement missions. Applicants with piloting skills and a passion for aviation should apply to contribute to surveillance, search and rescue, and rapid response operations from the skies.` + 
                            `\n\n- 👨‍🏫 ︱ ***Field Training Officer (FTO)***\nLead the next generation of law enforcement professionals as part of the FTO Team. Experienced officers who excel in mentorship, instruction, and guiding new recruits should apply to shape the future of the department.` + 
                            `\n\n- 🤵 ︱ ***Junior Management Team (JMT)***\nStep up to a leadership role within the department's management team. Candidates with strategic thinking, organizational skills, and a desire to contribute to decision-making processes should apply to help steer the department toward success and growth.` +
                            `\n\n- 👨‍🎓 ︱ ***Suppervisor***\nAre you ready to take the helm and lead our department to new heights? We're in search of visionary leaders who possess a knack for strategic planning, a flair for effective organization, and a drive to shape the future of our department.`
                        )
                        .setThumbnail( botAvatar.displayAvatarURL() )
                        .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });;
                    await interaction.channel.send({                           
                        embeds: [initialEmbed],
                        components: [
                            {
                                "type" : 1,
                                "components": [
                                    {
                                        "type" : 2,
                                        "label" : "🎯  Class 2",
                                        "style" : 3,
                                        "custom_id" : "class2button"
                                    },
                                    {
                                        "type" : 2,
                                        "label" : "⚔️  TRT",
                                        "style" : 3,
                                        "custom_id" : "trtbutton"
                                    },
                                    {
                                        "type" : 2,
                                        "label" : "🏎️  Inteceptor",
                                        "style" : 3,
                                        "custom_id" : "interceptorbutton"
                                    },
                                    {
                                        "type" : 2,
                                        "label" : "🚁  Air 1",
                                        "style" : 3,
                                        "custom_id" : "air1button"
                                    },
                                ]
                            },
                            {
                                "type" : 1,
                                "components": [
                                    {
                                        "type" : 2,
                                        "label" : "👨‍🏫  FTO",
                                        "style" : 3,
                                        "custom_id" : "ftobutton"
                                    },
                                    {
                                        "type" : 2,
                                        "label" : "🤵 JMT",
                                        "style" : 3,
                                        "custom_id" : "jmtbutton"
                                    },
                                    {
                                        "type" : 2,
                                        "label" : "👨‍🎓  Supervisor",
                                        "style" : 3,
                                        "custom_id" : "supperbutton"
                                    },
                                ]
                            },
                        ]       
                    });
                } else {
                    await interaction.editReply({
                        content: "This command can only be used in the 'enroll-now' channel", ephemeral: true,
                    });
                }
            } else {
                await interaction.editReply({
                    content: "Only government or HC can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Enroll.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
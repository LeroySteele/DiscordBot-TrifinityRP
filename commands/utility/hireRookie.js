// This command takes 2 parameters (username, department)

// If a new user is recruited, this command will 
// -add them to the excel sheet 
// -give them a nickname in discord (with their call sign)
// -give them the required police roles based on their department
// -sends a messege in the users job application and displays the 10-codes, dress code and further instructions
// -sends a messege in the logs channel for record keeping

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');
const { google } = require('googleapis');

module.exports = { 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('hire')
        .setDescription('Use this command to hire a Rookie')
        .addUserOption((option) => 
        option
        .setName('username')
        .setDescription('Discord username.')
        .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('department')
            .setDescription('BCSO or LSPD')
            .setRequired(true)
            .setChoices(
                {
                    name: 'BSCO',
                    value: 'BCSO',
                },
                {
                    name: 'LSPD',
                    value: 'LSPD',
                }
            )
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            if ( (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.highCommandRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.ftoLeadRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) ) {
                await interaction.editReply({
                    content: "Hiring officer", ephemeral: true,
                });
                const member = interaction.options.getMember('username');
                const server = await interaction.client.guilds.fetch(interaction.guild.id);
                const player = await server.members.cache.find((mem) => mem.id === member.id);
                if ( (player.roles.cache.has(idList.BCSORole)) || (player.roles.cache.has(idList.LSPDRole)) ){
                    await interaction.editReply({
                        content: "This person already works here !!", ephemeral: true,
                    });
                    return;
                }
                const tabName = interaction.options.get('department').value;
                const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                const info = [];
                info[0] = player.nickname.toLowerCase().replace(' ','-').split('-');
                const newName = info.map(val => val[0][0].toUpperCase() + val[0].slice(1) + " " + val[1][0].toUpperCase() + val[1].slice(1) );
                let clothing = "";
                if ( tabName === "BCSO" ){
                    await member.roles.add(idList.BCSORole);
                    await member.roles.add(idList.BCSORecruitRole);
                    clothing = idList.BCSOClothingChannel;
                } else if( tabName === "LSPD" ){
                    await member.roles.add(idList.LSPDRole);
                    await member.roles.add(idList.LSPDRecruitRole);
                    clothing = idList.LSPDClothingChannel;
                } else {
                    console.log("Department is defunded")
                }
                //fetch google sheet
                async function _getGoogleSheetClient() {
                    const auth = new google.auth.GoogleAuth({
                        keyFile: ids.serviceAccountKeyFile,
                        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
                    });
                    const authClient = await auth.getClient();
                    return google.sheets({
                        version: 'v4',
                        auth: authClient,
                    });
                };
                //read google sheet
                async function _readGoogleSheet(googleSheetClient, tabName) {
                    const res = await googleSheetClient.spreadsheets.values.get({
                      spreadsheetId: ids.sheetId,
                      range: `${tabName}!${ids.range}`,
                    });
                    return res.data.values;
                }
                ///clear data
                async function clearSheet(googleSheetClient, tabName) {
                    await googleSheetClient.spreadsheets.values.clear({
                        spreadsheetId: ids.sheetId,
                        range: `${tabName}!${ids.range}`,
                    })  
                }
                //write
                async function _writeGoogleSheet(googleSheetClient, tabName, data) {
                    await googleSheetClient.spreadsheets.values.update({
                      spreadsheetId: ids.sheetId,
                      range: `${tabName}!${ids.range}`,
                      valueInputOption: 'USER_ENTERED',
                      resource: {
                        "majorDimension": "ROWS",
                        "values": data
                      },
                    })
                }
                let check = true;
                async function main() {
                    const googleSheetClient = await _getGoogleSheetClient();
                    const data = await _readGoogleSheet(googleSheetClient, tabName);
                    await data.forEach(el => {
                        if ( (el[0] === "") && (el[1] > 800 ) ) {
                            while(check){
                                el[0] =  "" + newName;
                                callsign = el[1];
                                member.setNickname('(' + el[1] + ') ' + newName);
                                check = false;
                            }
                        }
                    });
                    await clearSheet(googleSheetClient, tabName);
                    await _writeGoogleSheet(googleSheetClient, tabName, data);
                }
                main()
                const logEmbed = new EmbedBuilder()
                    .setDescription(`<@${interaction.user.id}> recruited <@${player.id}> for ${tabName} `)
                    .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });

                const logs = interaction.client.channels.cache.find(ch => ch.id === idList.botLogsChannel );
                await logs.send({
                    embeds: [logEmbed],
                });
                const crucialEmbed = new EmbedBuilder()
                    .setTitle('Crucial Information')
                    .setDescription(`- Visit the PD station and get hired by a High Command officer.\n- The police radio is channel nr 1, remember to add your name and callsign on your radio as well (your callsign is shown in your discord name).\n- Uniform can be found here under cadet - <#` + clothing + `>`);
                const mirandaEmbed = new EmbedBuilder()
                    .setDescription(`- Miranda Rights`)
                    .setImage( "https://media.discordapp.net/attachments/1233706893772591104/1252386476524572742/MIRANDA.JPEG?ex=6672074c&is=6670b5cc&hm=be72392f7ba63e70756356826cbff59936e94ec683f9c16d7606379ae519c1cb&=&format=webp&width=263&height=350" );
                const tenEmbed = new EmbedBuilder()
                    .setDescription(`- 10 Codes`)
                    .setImage( "https://media.discordapp.net/attachments/1228689528303128709/1229558713971507290/PD1.png?ex=66301ec9&is=661da9c9&hm=4b143ffa83438239992867f62b4dd8d9becf6d300bec6517be31f2869038d82f&=&format=webp&quality=lossless&width=424&height=379" )
                    .setFooter({text: 'Trifinity RP',iconURL: botAvatar.displayAvatarURL() });
                    await interaction.channel.send({
                        embeds: [crucialEmbed, mirandaEmbed, tenEmbed]
                    });
            }else {
                await interaction.editReply({
                    content: "Only HC and supervisors can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Hire.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};

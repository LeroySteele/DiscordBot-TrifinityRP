const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');
const { google } = require('googleapis');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('fire')
        .setDescription('Use this command to fire an officer')
        .addUserOption((option) => 
        option
        .setName('username')
        .setDescription('Discord username.')
        .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            if ( (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.highCommandRole))|| (await interaction.member.roles.cache.some(role => role.id === idList.ftoLeadRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) ) {
                await interaction.editReply({
                    content: "Firing the officer", ephemeral: true,
                });
                const member = interaction.options.getMember('username');
                const server = await interaction.client.guilds.fetch(interaction.guild.id);
                const player = await server.members.cache.find((mem) => mem.id === member.id);
                let department = "";
                if ( player.roles.cache.has(idList.BCSORole) ){
                    department = "BCSO";
                } else if ( player.roles.cache.has(idList.LSPDRole) ) {
                    department = "LSPD";
                } else {
                    await interaction.editReply({
                        content: "This person does not work for the police department", ephemeral: true,
                    });
                    return;
                } 
                const noSpaceNickname = player.nickname.replace('(','').replace(')','').replace(' ','-').replace(' ','-').replace(' ','-').toLowerCase();
                const info = [];
                info[0] = noSpaceNickname.toLowerCase().split("-")
                const newName = info.map(val => val[1][0].toUpperCase() + val[1].slice(1) + " " + val[2][0].toUpperCase() + val[2].slice(1) );
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
                if ( department === "BCSO" ) {
                    const googleSheetClient = await _getGoogleSheetClient();
                    const data = await _readGoogleSheet(googleSheetClient, department);
                    async function clearRank() {
                        const propName = "" + newName;
                        await data.forEach(el => {
                            if ( (el[0] === propName) ) {
                                rename = el[0];
                                el[0] =  "";
                                el[2] = "False";
                                el[3] = "False";
                                el[4] = "False";
                                el[5] = "False";
                                el[6] = "False";
                            };
                        });
                        
                        await clearSheet(googleSheetClient, department);
                        await _writeGoogleSheet(googleSheetClient, department, data);
                    };
                    clearRank();
                    const person = interaction.options.getMember('username');
                    await interaction.guild.roles.cache.forEach(role => {
                        if ( person.roles.cache.has(role.id) ) { 
                            if( (role.name === "@everyone") || (role.id === idList.CitizenRole) ) {
                            } else {
                                setTimeout(() => {
                                    member.roles.remove(role.id);
                                }, 500);
                            };
                        };
                    });
                    await member.setNickname(rename);
                } else if ( department === "LSPD" ) {
                    let rename = "";
                    const googleSheetClient = await _getGoogleSheetClient();
                    const data = await _readGoogleSheet(googleSheetClient, department);
                    async function clearRank() {
                        const propName = "" + newName;
                        await data.forEach(el => {
                            if ( (el[0] === propName) ) {
                                rename = el[0];
                                el[0] =  "";
                                el[2] = "False";
                                el[3] = "False";
                                el[4] = "False";
                                el[5] = "False";
                                el[6] = "False";
                            };
                        });
                        await member.setNickname(rename);
                        await clearSheet(googleSheetClient, department);
                        await _writeGoogleSheet(googleSheetClient, department, data);
                    };
                    clearRank();
                    const person = interaction.options.getMember('username');
                    await interaction.guild.roles.cache.forEach(role => {
                        if ( person.roles.cache.has(role.id) ) { 
                            if( (role.name === "@everyone") || (role.id === idList.CitizenRole) ) {
                            } else {
                                setTimeout(() => {
                                    member.roles.remove(role.id);
                                }, 500);
                            };
                        };
                    });
                };
                const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                const logEmbed = new EmbedBuilder()
                    .setDescription(`<@${player.id}> has been fired by <@${interaction.user.id}>`)
                    .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });
                const logs = interaction.client.channels.cache.find(ch => ch.id === idList.botLogsChannel );
                await logs.send({
                    embeds: [logEmbed],
                });
                await interaction.editReply({
                    content: "This person no longer works for the department", ephemeral: true,
                });
            }else {
                await interaction.editReply({
                    content: "Only HC can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Fire.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
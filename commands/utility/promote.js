const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const idList = require('../../data/idList');
const ids = require('../../data/ids.js');
const { google } = require('googleapis');

module.exports = { 
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('promote')
        .setDescription('Use this command to promote an officer')
        .addUserOption((option) => 
        option
        .setName('username')
        .setDescription('Discord username.')
        .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });
            if ( (await interaction.member.roles.cache.some(role => role.id === idList.commissionerRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.highCommandRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.ftoLeadRole)) || (await interaction.member.roles.cache.some(role => role.id === idList.governmentRole)) ) {
                await interaction.editReply({
                    content: "Promoting the officer", ephemeral: true,
                });
                const member = interaction.options.getMember('username');
                const server = await interaction.client.guilds.fetch(interaction.guild.id);
                const player = await server.members.cache.find((mem) => mem.id === member.id);
                let department = "";
                let newRankNum = ""; 
                if ( player.roles.cache.has(idList.BCSORole) ){
                    department = "BCSO";
                } else if ( player.roles.cache.has(idList.LSPDRole) ) {
                    department = "LSPD";
                } else {
                    await interaction.editReply({
                        content: "This person is not an officer, you can only promote employees!", ephemeral: true, 
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
                let rankName = "";
                if ( department === "BCSO" ) {
                    const googleSheetClient = await _getGoogleSheetClient();
                    const data = await _readGoogleSheet(googleSheetClient, department);
                    const currentRank = info.map(val => val[0][0].toUpperCase() + val[0].slice(1) );
                    const currentRankS = currentRank + "";
                    if ( currentRankS > 800 ) {
                        const newRank = "700";
                        rankName = "Deputy";
                        await member.roles.remove(idList.BCSORecruitRole);
                        await member.roles.add(idList.BCSODeputyRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 700) && (currentRankS < 800) ) {
                        const newRank = "600";
                        rankName = "Senior Deputy";
                        await member.roles.remove(idList.BCSODeputyRole);
                        await member.roles.add(idList.BCSOSeniorDeputyRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 600) && (currentRankS < 700) ) {
                        const newRank = "500";
                        rankName = "Corporal";
                        await member.roles.remove(idList.BCSOSeniorDeputyRole);
                        await member.roles.add(idList.BCSOCorporalRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 500) && (currentRankS < 600) ) {
                        const newRank = "400";
                        rankName = "Sergeant";
                        await member.roles.remove(idList.BCSOCorporalRole);
                        await member.roles.add(idList.BCSOSergeantRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 400) && (currentRankS < 500) ) { 
                        const newRank = "300";
                        rankName = "Lieutenant";
                        await member.roles.remove(idList.BCSOSergeantRole);
                        await member.roles.add(idList.BCSOLieutenantRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 300) && (currentRankS < 400) ) {
                        const newRank = "200";
                        rankName = "Major";
                        await member.roles.remove(idList.BCSOLieutenantRole);
                        await member.roles.add(idList.BCSOMajorRole);
                        moveRank(currentRankS, newRank);
                    }
                    async function moveRank(currentRankS, newRank) {
                        const propName = "" + newName;
                        await data.forEach(el => {
                            if ( (el[0] === propName) && ( el[1] === currentRankS)) {
                                const FTO = el[2];
                                const TRT = el[3];
                                const Class2 = el[4];
                                const Interceptor = el[5];
                                const Phoenix = el[6];
                                el[0] =  "";
                                el[2] = "False";
                                el[3] = "False";
                                el[4] = "False";
                                el[5] = "False";
                                el[6] = "False";
                                for (var i = 0; i < data.length; i++) {
                                    const find = data[i][1] + "";
                                    if ( (data[i][0] === "") && (data[i][1] < currentRankS) && (data[i][1] > newRank) ) {
                                        data[i][0] = propName;
                                        newRankNum = data[i][1];
                                        data[i][2] = FTO;
                                        data[i][3] = TRT;
                                        data[i][4] = Class2;
                                        data[i][5] = Interceptor;
                                        data[i][6] = Phoenix;
                                        break;
                                    };
                                };
                            };
                        });
                        await member.setNickname('(' + newRankNum + ') ' + newName);
                        await clearSheet(googleSheetClient, department);
                        await _writeGoogleSheet(googleSheetClient, department, data);
                    };
                } else if ( department === "LSPD" ) {
                    const googleSheetClient = await _getGoogleSheetClient();
                    const data = await _readGoogleSheet(googleSheetClient, department);
                    const currentRank = info.map(val => val[0][0].toUpperCase() + val[0].slice(1) );
                    const currentRankS = currentRank + "";
                    if ( currentRankS > 800 ) {
                        const newRank = "700";
                        rankName = "Officer";
                        await member.roles.remove(idList.LSPDRecruitRole);
                        await member.roles.add(idList.LSPDOfficerRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 700) && (currentRankS < 800) ) {
                        const newRank = "600";
                        rankName = "Senior Officer";
                        await member.roles.remove(idList.LSPDOfficerRole);
                        await member.roles.add(idList.LSPDSeniorOfficerRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 600) && (currentRankS < 700) ) {
                        const newRank = "500";
                        rankName = "Corporal";
                        await member.roles.remove(idList.LSPDSeniorOfficerRole);
                        await member.roles.add(idList.LSPDCorporalRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 500) && (currentRankS < 600) ) {
                        const newRank = "400";
                        rankName = "Sergeant";
                        await member.roles.remove(idList.LSPDCorporalRole);
                        await member.roles.add(idList.LSPDSergeantRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 400) && (currentRankS < 500) ) {
                        const newRank = "300";
                        rankName = "Lieutenant";
                        await member.roles.remove(idList.LSPDSergeantRole);
                        await member.roles.add(idList.LSPDLieutenantRole);
                        moveRank(currentRankS, newRank);
                    } else if ( (currentRankS > 300) && (currentRankS < 400) ) {
                        const newRank = "200";
                        rankName = "Captain";
                        await member.roles.remove(idList.LSPDLieutenantRole);
                        await member.roles.add(idList.captainRole);
                        moveRank(currentRankS, newRank);
                    }
                    async function moveRank(currentRankS, newRank) {
                        const propName = "" + newName;
                        await data.forEach(el => {
                            if ( (el[0] === propName) && (el[1].includes(currentRankS)) ) {
                                const FTO = el[2];
                                const TRT = el[3];
                                const Class2 = el[4];
                                const Interceptor = el[5];
                                const Phoenix = el[6];
                                el[0] =  "";
                                el[2] = "False";
                                el[3] = "False";
                                el[4] = "False";
                                el[5] = "False";
                                el[6] = "False";
                                for (var i = 0; i < data.length; i++) {
                                    const find = data[i][1] + "";
                                    if ( (data[i][0] === "") && (data[i][1] < currentRankS) && (data[i][1] > newRank) ) {
                                        data[i][0] = propName;
                                        newRankNum = data[i][1];
                                        data[i][2] = FTO;
                                        data[i][3] = TRT;
                                        data[i][4] = Class2;
                                        data[i][5] = Interceptor;
                                        data[i][6] = Phoenix;
                                        break;
                                    };
                                };
                            };
                        });
                        await member.setNickname('(' + newRankNum + ') ' + newName);
                        await clearSheet(googleSheetClient, department);
                        await _writeGoogleSheet(googleSheetClient, department, data);
                    };
                }
                const botAvatar = await interaction.client.users.fetch(ids.CLIENT_ID);
                const logEmbed = new EmbedBuilder()
                    .setDescription(`<@${interaction.user.id}> promoted <@${player.id}> to ${rankName} `)
                    .setFooter({text: 'Trifinity PD',iconURL: botAvatar.displayAvatarURL() });
                const logs = interaction.client.channels.cache.find(ch => ch.id === idList.botLogsChannel );
                await logs.send({
                    embeds: [logEmbed],
                });
            }else {
                await interaction.editReply({
                    content: "Only HC can use this command", ephemeral: true,
                });
            }
        } catch (err) {
            await interaction.editReply({
                content: `An error has occurred, please try again later and if the problem persists contact a high command officer. Code: Promote.`, ephemeral: true,
            });
            console.error(err);
        }
    }
};
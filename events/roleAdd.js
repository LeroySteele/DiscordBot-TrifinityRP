// If an officer gets a 'certification' role, then the bot will update the excel sheet (added roles or removed roles)

const { Events } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');
const { google } = require('googleapis');

module.exports = { 
    name: Events.GuildMemberUpdate,
    async execute(oldMember, newMember){
        try {
            const oldRoles = await oldMember.roles.cache;
            const newRoles = await newMember.roles.cache;
            //
            let officer = "" + newMember.nickname;
            let noSpaceNickname = officer.replace('(','').replace(')','');
            const propName = noSpaceNickname.slice(4);
            //
            let department = "";
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
            let O = [];
            await oldRoles.forEach(R => {
                if ( (R.id === idList.ftoRole) || (R.id === idList.trtRole) || (R.id === idList.class2) || (R.id === idList.interceptorRole) || (R.id === idList.air1Role) ){
                    O = O.concat(R.id);
                } else if ( R.id === idList.BCSORole ) {
                    department = "BCSO";
                } else if ( R.id === idList.LSPDRole ) {
                    department = "LSPD";
                }
            });
            let N = [];
            await newRoles.forEach(R => {
                if ( (R.id === idList.ftoRole) || (R.id === idList.trtRole) || (R.id === idList.class2) || (R.id === idList.interceptorRole) || (R.id === idList.air1Role) ){
                    N = N.concat(R.id);
                }
            });
            let certification = "";
            let list = [];
            let chanID = "";
            if ( department === "" ) {
                return;
            } else if ( N.length > O.length ) {
                //role added
                const googleSheetClient = await _getGoogleSheetClient();
                const data = await _readGoogleSheet(googleSheetClient, department);
                let addedRole = "";
                N.forEach(R => {
                    if (!O.includes(R)){
                        addedRole = R;
                    }
                });
                await data.forEach(el => {
                    if ( (el[0] === propName) ) {
                        if ( addedRole === idList.ftoRole ) {
                            el[2] = true;
                            chanID = idList.ftoOfficersChannel;
                        } else if ( addedRole === idList.trtRole ) {
                            el[3] = true;
                            chanID = idList.trtOfficersChannel;
                        } else if ( addedRole === idList.class2 ) {
                            el[4] = true;
                            chanID = idList.class2OfficersChannel;
                        } else if ( addedRole === idList.interceptorRole ) {
                            el[5] = true;
                            chanID = idList.interceptorOfficersChannel;
                        } else if ( addedRole === idList.air1Role ) {
                            el[6] = true;
                            chanID = idList.air1OfficersChannel;
                        }
                    };
                });
                if ( addedRole === idList.ftoRole ) {
                    certification = "2"
                } else if ( addedRole === idList.trtRole ) {
                    certification = "3"
                } else if ( addedRole === idList.class2 ) {
                    certification = "4"
                } else if ( addedRole === idList.interceptorRole ) {
                    certification = "5"
                } else if ( addedRole === idList.air1Role ) {
                    certification = "6"
                }
                await data.forEach(el => {
                    if ( (el[certification] === "TRUE") ) {
                        list = list + el[0]
                    };
                });
                await clearSheet(googleSheetClient, department);
                await _writeGoogleSheet(googleSheetClient, department, data);
            } else if ( O > N ) {
                //role removed
                const googleSheetClient = await _getGoogleSheetClient();
                const data = await _readGoogleSheet(googleSheetClient, department);
                let removedRole = "";
                O.forEach(R => {
                    if (!N.includes(R)){
                        removedRole = R;
                    }
                });
                await data.forEach(el => {
                    if ( (el[0] === propName) ) {
                        if ( removedRole === idList.ftoRole ) {
                            el[2] = false;
                        } else if ( removedRole === idList.trtRole ) {
                            el[3] = false;
                        } else if ( removedRole === idList.class2 ) {
                            el[4] = false;
                        } else if ( removedRole === idList.interceptorRole ) {
                            el[5] = false;
                        } else if ( removedRole === idList.air1Role ) {
                            el[6] = false;
                        }
                    };
                });
                await clearSheet(googleSheetClient, department);
                await _writeGoogleSheet(googleSheetClient, department, data);
            }
        } catch (err) {
            console.error(err);
        }
    }
};

const { EmbedBuilder, Events } = require('discord.js');
const idList = require('../data/idList');
const ids = require('../data/ids');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		try {
            if (message.author.bot) {
                if ( message.channel.id === idList.suggestionChannel ) { //suggestion channel messeges
                    let embed1 = message.embeds;
                    if ( embed1[0].description.includes("PD Suggestion Template") ) {
                        //don't react
                    } else {
                        await message.react(idList.tickReaction).then(await message.react(idList.crossReaction));
                        const mes = await message.channel.messages.fetch({ limit: 10 });
                        mes.forEach((msg) => {
                            let embed2 = msg.embeds;
                            if ( embed2[0].description.includes("PD Suggestion Template") ) {
                                msg.delete();
                            };
                        });
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.suggestionChannel);
                        const initialEmbed = new EmbedBuilder()
                            .setColor([255,0,0])
                            .setDescription(`PD Suggestion Template\n\nUse /suggestion and provide us with a topic and a reason for this suggestion\n\neg.\n- Topic: More PD cars\n- Suggestion: Add more PD cars to pick from, as well as off-road options .`);
                        await chan.send({
                            embeds: [initialEmbed]
                        });
                    };
                };
            } else {
                if ( message.channel.id === idList.warrantChannel ) {
                    if (message.author.id != ids.CLIENT_ID) {
                        const mes = await message.channel.messages.fetch({ limit: 10 });
                        mes.forEach((msg) => {
                            if (msg.author.id === ids.CLIENT_ID) msg.delete();
                        });
                        await message.channel.send({
                            content: "# Copy the format and fill it in:\n\n```APPLICATION FOR ARREST WARRANT\n\n## Applicant Information:\n- Officers Name:\n[Applicant's rank]\n## Suspect Information:\n- Name:\n[Suspect's Full Name]\n## Offense Information:\n- Offense(s) Committed:\n[Detailed Description of Offense(s)]\n- Date and Time of Offense:\n[Date and Time]\n- Location of Offense/s:\n[Location]\n## Summary information:\n- Summary of incident\n[Description of what happened with as much detail]\n- Evidence of the crime/s committed\n[Photo's, Blood on scene, Bullet casings, Etc]\nSigned\n@yourself\n```\n",
                        });
                    }
                } else if ( message.channel.id === idList.cadetReportChannel ) {
                    if (message.author.id != ids.CLIENT_ID) {
                        const mes = await message.channel.messages.fetch({ limit: 10 });
                        mes.forEach((msg) => {
                            if (msg.author.id === ids.CLIENT_ID) msg.delete();
                        });
                        await message.channel.send({
                            content: "# Cadet Report Template:\n\n```**Name and Callsign of Cadet:**\n(100) Name and Surname\n\n**Name and Callsign of FTO:**\n(301) Name and Surname\n\n**Areas of Improvement:**\neg\n- Paperwork(be more descriptful)\n- Driving (practice jumps/rat strats)\n\nFeedback:\nDriving ?/10 \nSop knowledge: ?/10\n10-Codes: ?/10\nRespect of fellow officers: ?/10\nArresting procedures: ?/10\nForce continuum: ?/10\n\nExtra notes: xxxxxxxxxxxxxxxxxxxxx```",
                        });
                    }
                } else if ( message.channel.id === idList.suggestionChannel ) {
                    message.delete();
                };
            };
		} catch (err) {
			console.error(err);
		}
	},
};
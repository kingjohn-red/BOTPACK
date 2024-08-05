const fs = require('fs');

module.exports.config = {
    name: "prefix",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Joshua Apostol",
    description: "Replies with the prefix",
    usePrefix: false,
    commandCategory: "no prefix",
    usages: "prefix",
    cooldowns: 1,
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
    const { threadID, messageID, senderID, body } = event;

    api.getUserInfo(senderID, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        const senderName = result[senderID]?.name || "";

        if (/^prefix/i.test(body)) {
            const prefix = global.config.PREFIX;
            const message = `Yo, my prefix is [ 𓆩 '${prefix}' 𓆪 ]\n\n𝗦𝗢𝗠𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗧𝗛𝗔𝗧 𝗠𝗔𝗬 𝗛𝗘𝗟𝗽 𝗬𝗢𝗨:\n➥ '${prefix}help [command] -> information and usage of command\n\nHave fun using it, enjoy! ❤`;

            try {
                api.sendMessage(message, threadID, messageID);
            } catch (error) {
                console.error('Error executing command:', error);
                api.sendMessage('An error occurred while executing the command.', threadID, messageID);
            }

            api.setMessageReaction("🥵", messageID, (err) => {
                if (err) console.error(err);
            }, true);
        }
    });
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
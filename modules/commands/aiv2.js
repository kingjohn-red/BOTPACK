const axios = require('axios');

module.exports.config = {
    name: "aiv2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Joshua Apostol",
    description: "AI by Joshua Apostol using NashBot API",
    usePrefix: false,
    commandCategory: "ai",
    usages: "[ask]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID } = event;
    const content = encodeURIComponent(args.join(" "));

    if (!args[0]) {
        return api.sendMessage("Please type a message...", threadID, messageID);
    }
    
    api.sendMessage("Please wait...", threadID, async (err, info) => {
        if (err) {
            console.error('Error sending wait message:', err);
            return;
        }

        try {
            const res = await axios.get(`https://nash-api-end.onrender.com/gpt-3_5-turbo?prompt=${content}`);
            
            if (res.data.status === 200) {
                const respond = res.data.result.reply;
                api.sendMessage(respond, threadID, messageID);
            } else {
                api.sendMessage(`Error: ${res.data.error || 'Unknown error'}`, threadID, messageID);
            }
        } catch (error) {
            console.error('Error executing command:', error);
            api.sendMessage("An error occurred while fetching the data.", threadID, messageID);
        }
    });
};
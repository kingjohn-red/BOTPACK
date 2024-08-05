const axios = require('axios');

module.exports.config = {
    name: "gemini",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Joshua Apostol",
    description: "Gemini by Joshua Apostol using NashBot API",
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
            const res = await axios.get(`https://nash-api-end.onrender.com/gemini?prompt=${content}`);
            
            if (res.data.author === "NashBot") {
                const respond = res.data.response;
                const formattedResponse = `✨ NashBot Response ✨\n\n${respond}`;
                api.sendMessage(formattedResponse, threadID, messageID);
            } else {
                api.sendMessage(`Error: Unexpected author ${res.data.author}`, threadID, messageID);
            }
        } catch (error) {
            console.error('Error executing command:', error);
            api.sendMessage("An error occurred while fetching the data.", threadID, messageID);
        }
    });
};
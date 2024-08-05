module.exports.config = {
	name: "rules",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "joshua",
	description: "",
	usePrefix: true,
  commandCategory: "info",
	cooldowns: 1
};

module.exports.run = ({ event, api }) => api.sendMessage(`⚠️ Please adhere strictly to the following rules to avoid being restricted from using commands (user ban):

1.Avoid spamming bot commands or prefixes excessively to prevent overload or disruption of bot functions.
2.Refrain from initiating conflicts or engaging in simulated warfare with bots, as they are not real interactive users.
3.Do not exploit bots for malicious purposes or any activities that violate ethical standards or laws.
4.Abstain from using profanity or offensive language towards the bot, as the system will automatically impose a ban.
5.Resist the urge to resend bot messages to maintain clarity and avoid clutter in the conversation.
6.Stay tuned for further updates, but remember to create your own rules and emojis for personalization. ⚙️`, event.threadID, event.messageID);
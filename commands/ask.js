const Discord = require("discord.js");
const global = require("../function/global.js");

module.exports = {
    name:"ask",
    description:"",
    guildOnly: false,
    devOnly: false,
    perms: [],
    type: "fun",
    help: "prefix + ask \"question\"",
    cooldown: 5,
    execute(client, message, args) {
        
        message.delete(5000).catch(() => {
            return;
        });
    
        var replies = ["Yes.", "No.", "It's possible.", "It's impossible.", "I don't know.", "Ask later.", "DIDN'T READ.", "WHO R U?", "Not saying antything. 😶", "LEAVE ME ALONE!", "It\'s a secret. 🤐", "Shhhh 🤐", "Maybe 😏", "No speak english.", "42.", "Good question.. I don't know"];
        var result = Math.floor((Math.random() * replies.length));
    
        const embed = new Discord.RichEmbed()
            .setColor("FF0000")
            .setThumbnail("https://png.icons8.com/ask_question/office/100")
            .addField("Question :", args.join(" "), false)
            .addField("Response :", replies[result], false);
        return message.channel.send(embed);
    }
};
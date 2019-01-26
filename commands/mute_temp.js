const config = require('../storage/globalSettings.js');
const ms = require('ms');
const logger = require('../function/logger.js');
const global = require('../function/global.js');
const fs = require('fs');

let serverSettings = JSON.parse(fs.readFileSync('./storage/serverSettings.json', 'utf8'));

module.exports = {
    name: 'tempmute',
    description: '',
    guildOnly: true,
    devOnly: false,
    perms: ['MUTE_MEMBERS'],
    type: 'moderation',
    help: '',
    cooldown: 5,
    async execute(client, message, args) {
        global.del(message, 5000);

        var usermention = message.mentions.members.first();
        var muteRole = message.guild.roles.find((role) => role.name === 'mute');
        var user = message.member;

        if (!usermention) {
            return message.reply(`couldn't find this user, please do ${serverSettings[message.guild.id].prefix}tempmute @mention time`);
        }
        if (config.devs.includes(usermention.id) || usermention.id === config.id) {
            return;
        }
        if (usermention.hasPermission("MUTE_MEMBERS")) {
            return message.reply(`can't mute, too powerful`);
        }
        if (!args[1]) {
            return message.reply('please give me some time (e.g. : 2hour, 1day, even 7year if you\'re brave enough..');
        }
        if (!muteRole) {
            try {
                muteRole = await message.guild.createRole({
                    name: "mute",
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (error) {
                logger.newError(client, error, __filename);
            }
        }

        await (usermention.addRole(muteRole.id));
        message.channel.send(`${usermention.user.username} was muted by ${message.author.username} for ${ms(ms(args[1], {long: true}))}.`);

        setTimeout(() => {
            if (!usermention.roles.find((role) => role.name === 'mute')) {
                return;
            }
            usermention.removeRole(muteRole.id);
            message.channel.send(`${usermention.user.username} is no longer muted.`);
        }, ms(args[1]));
    }
};
const Discord = require('discord.js');
const config = require('../config.js');
const espion = require('../function/espion.js')
exports.run = (client, member, guild) => {
    if (member.guild.id === '110373943822540800') return
    else espion.member_add(client, member, guild)
    if (member.guild.id === '416532107939151872') {
        var autorole = member.guild.roles.find('id', '178896511378259968')
        member.addRole(autorole);
    }

}
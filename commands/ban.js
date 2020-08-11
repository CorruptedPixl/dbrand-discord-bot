/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const { msgDeleteDelay, prefix } = require('../config.json');

module.exports.run = async (client, message, args) => {
    message.channel.bulkDelete(1);
    message.channel.send(`This module isn't finished yet. Bug Pixl about it or something. (I head money is a good motivator ;) )`)
        .then(msg => {
            msg.delete(msgDeleteDelay);
        });
}

module.exports.help = {
    name: "ban",
    description: `Usage: ${prefix}ban id reason`,
    helpimage: "./commands/assets/ban_help.png"
}
const { prefix } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = async (bot, message) => {
    // Ignore dms or bot messages
    if (message.author.bot || message.channel.type === "dm") return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (commandfile) commandfile.run(bot, message, args)

    // command logging
    console.log(`${message.member.user.tag}${message.member} ran: ${message}`);

    const embed = new MessageEmbed()
        .setAuthor(message.member.user.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 64 }))
        .setDescription(`ran: ${message}`)
        .setTimestamp()
        .setFooter(`User ID: ${message.member.id}`, `${message.guild.iconURL()}`);

    switch (true) {
        case !!commandfile:
            embed.setColor(0x33de44);
            break;
        case !commandfile:
            embed.setColor(0xff3333);
            break;
        default:
            embed.setColor(0xffbb00);
            break;
    }

    bot.channels.cache.get(process.env.logchannelid).send(embed);
}
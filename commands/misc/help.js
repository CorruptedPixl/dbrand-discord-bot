// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require("discord.js");
const { msgDeleteDelay, prefix } = require('../../config.json');
const { readdirSync } = require("fs")

module.exports = {
    run: async (bot, message, args) => {

        let commandName = args[0];

        if (args === undefined || args.length == 0) {
            // don't forget to add the same categories in the command.js handler
            const categories = ["misc", "moderation"];
            const commands = [];

            const getCommands = dirs => {
                let commandFiles = readdirSync(`commands/${dirs}/`).filter(file => file.endsWith('.js'));
                commands.push(commandFiles.map(file => file.split('.js')[0]));
            }

            categories.forEach(category => getCommands(category));



            const embed = new MessageEmbed()
                .setColor(0xffbb00)
                .setTitle("**Help**")
                .setDescription('**Use `!help command` for specific help!**')
                .setThumbnail('https://cdn.discordapp.com/attachments/520366222835974164/743174157440647279/db-logo-bright.png')
                .addField('\u200B', 'Current commands are:', true)

            commands.forEach((category, i) => {
                embed.addField(categories[i], category.join(`, `))
            });

            message.channel.send(embed);

        } else {

            const commandfile = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName))

            try {
                console.log(commandfile.info.help);
                if (typeof commandfile.info.help === 'undefined' || commandfile.info.help === '') throw "No help info for given command.";
                else {
                    const helpEmbed = new MessageEmbed()
                        .setColor(0xffbb00)
                        .setTitle(`**${commandfile.info.name}**`)
                        .setDescription(commandfile.info.help)

                    message.channel.send(helpEmbed);
                }

            } catch (error) {

                const getRightErrorMessage = error => {
                    if (typeof error === 'object') return error[0];
                    else return error;
                }

                message.delete();
                message.channel.send(getRightErrorMessage(error) || "An error occured.")
                    .then(msg => {
                        msg.delete({ timeout: msgDeleteDelay });
                    });
            }
        }
    },

    info: {
        name: "help",
        description: `${prefix}help lists all available commands. Do ${prefix}help [command name] to get specific info about a command.`,
        help: "Displays this message"
    }
}
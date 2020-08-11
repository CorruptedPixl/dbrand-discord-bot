// eslint-disable-next-line no-unused-vars
const Discord = require("discord.js");
const { msgDeleteDelay, prefix } = require('../config.json');
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    let commandName = args[0];                                                              //Gets the command name from the first argument
    let command;                                                                            //Defines the variable but doesn't assign anything yet

    if (args === undefined || args.length == 0) {                                           //Checks if the args array is empty, aka if the user just posted "!help" with no specific command as arg

        let commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));  //Reads all files in the command folder (__dirname is current folder) that end in .js, aka all commands
        commandFiles = commandFiles.map(file => file.split('.js')[0]);                      //Removes the .js extention

        //Instantiates a new embed. Previously the help command just sent a message, but this was ugly. This has now been changed to an embed.
        const embed = new Discord.RichEmbed()
            .setColor(0xffbb00)
            .setTitle("**Help**")
            .setDescription('**Use `!help command` for specific help!**')
            .setThumbnail('https://cdn.discordapp.com/attachments/607657180673343500/685924479385468952/db-logo.png')
            .addField('Current commands', `${commandFiles.join(`, `)}`, true)               //Sends a list of all commands
        message.channel.send(embed);

        return;                                                                             //!Return statement!
    } else if (fs.existsSync(__dirname + `/${commandName}.js`)) {
        command = require(__dirname + `/${commandName}.js`);                                           //Loads the command file because the "help description" data and image location is in that
    } else {                                                                                //If the command doesn't exist, send an error message
        message.delete();
        message.channel.send(`Selected command doesn't exist.`)
            .then(msg => {
                msg.delete(msgDeleteDelay);
            });
        return                                                                              //!Return statement!
    }


    let helpimage = command.help.helpimage;                                                 //Gets the image path from the command file help secion

    try {

        if (!commandName) {
            message.channel.send(`No command selected, please use \`${prefix}help command\``);
        }

        if (fs.existsSync(helpimage)) {                                                     //Tests if the help image exists
            message.channel.send(command.help.description, {
                files: [`${command.help.helpimage}`]
            });
        } else {                                                                            //If the help image doesn't exist, it just sends the description and an error message
            message.channel.send(command.help.description);
            message.channel.send("Help image doesn't exist, dm Pixl asap!")
                .then(msg => {
                    msg.delete(msgDeleteDelay);
                });
        }

    } catch (error) {
        console.error(error);
        message.channel.send("There was an error trying to execute that command! Please let pixl know of this error");
    }
}

module.exports.help = {
    name: "help",
    description: `${prefix}help lists all available commands. Do ${prefix}help [command name] to get specific info about a command.`,
    helpimage: "./commands/assets/help-help.png"
}
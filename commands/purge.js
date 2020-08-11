/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const { msgDeleteDelay, prefix } = require('../config.json');

module.exports.run = async (client, message, args) => {

    let messageDeleteAmount = args[0];                                                              //We store the args in a variable to use later
    messageDeleteAmount = parseInt(args[0]);                                                        //We clean the user input in order to avoid exploits. We convert the input to a number, thus invalidating code injection exploits.
    messageDeleteAmount++;                                                                          //We add 1 to the amount to clear to include the initial "!purge x" command too

    if (message.member.hasPermission("MANAGE_MESSAGES", false, true, true)) {                        //Checks if the user has permissions to manage messages

        if (messageDeleteAmount <= 0) {                                                                  //Handles an error if the user enters a negative value or 0
            message.channel.send(`You're an absolute dipshit, ${message.member}. You can't purge a negative amount of messages!`)
                .then(msg => {
                    msg.delete(msgDeleteDelay);
                });
        }

        else if (messageDeleteAmount >= 100) {                                                           //Handles an error if the user tries to delete more than 100 messages
            message.channel.bulkDelete(100);
            message.channel.send(`You can only delete 100 messages at a time ${message.member}.`)
                .then(msg => {
                    msg.delete(msgDeleteDelay);
                });
        }

        else if (messageDeleteAmount <= 100 && messageDeleteAmount >= 0) {
            message.channel.bulkDelete(messageDeleteAmount);                                            //This actually deletes the messages if there are no errors
        }

        else {                                                                                           //If the arg isn't a number we send an error message
            message.channel.bulkDelete(1);
            message.channel.send(`How about you try and enter a number this time around? ${message.member}`)
                .then(msg => {
                    msg.delete(msgDeleteDelay)
                });
        }
    }

    else {
        message.channel.bulkDelete(1);
        message.channel.send(`You don't have permission to use that command ${message.member}`)                 //Send error message when a non-admin/mod user tries to use the bot
            .then(msg => {
                msg.delete(msgDeleteDelay)
            });

    }


}

//TODO ADD CHECK WHEN DELETING MESSAGES OLDER THAN 14 DAYS

module.exports.help = {
    name: "purge",
    description: `Use \`${prefix}purge x\`to delete x amount of messages. Max 100 at a time.`
}
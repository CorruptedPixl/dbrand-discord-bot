/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const { msgDeleteDelay, prefix } = require('../../config.json');
const { log } = require("console");

module.exports = {
    run: async (client, message) => {
        const verifyTimeoutDelay = 60000;   //Sets the timeout of the command (default: 60000 aka 1 min)

        //Define emojis
        const emojiMax = "671045011487326228";
        // const emojiMax = await client.emojis.get("671045011487326228");
        // const emojiHal = await client.emojis.get("520742867933724676");
        // const emojiPyramid = await client.emojis.get("682715410289786887");
        // const emojiCube = await client.emojis.get("664627160551522317");
        // const emojiMaxBad = client.emojis.find(emoji => emoji.name === "max_flipoff");
        const emojiMaxBad = "671045012250689576";

        message.reply(`Almost there! **Click the** ${emojiMax} **emote on your message!**`)
            .then(message.delete({ timeout: verifyTimeoutDelay }))
        // .then(msg => {
        //     msg.delete(verifyTimeoutDelay + msgDeleteDelay);
        // });
        log("FUCK")
        message.react(emojiMax).then(() => message.react(emojiMaxBad)); //Adds 2 reactions to the member's message

        const filter = (reaction, user) => {
            return ["max_approved", "max_flipoff"].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        message.awaitReactions(filter, {
            max: 1,
            time: verifyTimeoutDelay,
            errors: ['time']
        })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === "max_approved") {
                    message.reply("you're verified!")
                        .then(msg => {
                            msg.delete({ timeout: msgDeleteDelay });
                        });
                } else {
                    message.reply("you're an idiot")
                        .then(msg => {
                            msg.delete({ timeout: msgDeleteDelay });
                        });
                }
            })
            .catch(collected => {
                message.reply("Verification timed out. Try again with `!verify`")
                    .then(msg => {
                        msg.delete({ timeout: msgDeleteDelay });
                    });
            });
    },

    info: {
        name: "verify",
        description: `${prefix}verify verifies the person after completing a challenge`
    }

}
/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const { msgDeleteDelay, prefix } = require('../../config.json');
const { log } = require("console");
const { format } = require("path");

module.exports = {
    run: async (client, message) => {
        const verifyTimeoutDelay = 60000;   //Sets the timeout of the command (default: 60000 aka 1 min)

        const emojis = {
            ":max:": "619335115268423691",
            ":max_flipoff:": "671045012250689576",
            ":max_approved:": "671045011487326228",
            // "a:corrupted:": "563134699342659596",
            // ":robot:": "547914045643030543",
            ":yes:": "706150991040610354",
            ":no:": "706150990788689962",
            // ":pyramid2:": "664924147289161728",
            // ":cube2:": "664627160551522317",
            // ":pyramid:": "682715410289786887"
        }

        let emojiOne = { "key": Object.keys(emojis)[Object.keys(emojis).length * Math.random() << 0] }
        let emojiTwo = { "key": Object.keys(emojis)[Object.keys(emojis).length * Math.random() << 0] }
        let emojiThree = { "key": Object.keys(emojis)[Object.keys(emojis).length * Math.random() << 0] }

        while (emojiTwo.key == emojiOne.key) {
            log('Rerolling emoji');
            emojiTwo = { "key": Object.keys(emojis)[Object.keys(emojis).length * Math.random() << 0] }
        }

        while (emojiThree.key == emojiTwo.key) {
            log('Rerolling emoji');
            emojiThree = { "key": Object.keys(emojis)[Object.keys(emojis).length * Math.random() << 0] }
        }

        emojiOne.value = emojis[emojiOne.key];
        emojiTwo.value = emojis[emojiTwo.key];
        emojiThree.value = emojis[emojiThree.key];


        message.reply(`Almost there! **Click the** <${emojiOne.key + emojiOne.value}> **emote on your message!**`)
            .then(message.delete({ timeout: verifyTimeoutDelay }))
            .then(msg => {
                msg.delete({ timeout: verifyTimeoutDelay + msgDeleteDelay });
            });

        //Add reactions to the member's message
        message.react(emojiOne.value)
            .then(() => message.react(emojiTwo.value))
            .then(() => message.react(emojiThree.value))
            .catch(() => console.error('One of the emojis failed to react.'));

        const filter = (reaction, user) => {
            return [emojiOne.value, emojiTwo.value, emojiThree.value].includes(reaction.emoji.id) && user.id === message.author.id;
        };

        message.awaitReactions(filter, {
            max: 1,
            time: verifyTimeoutDelay,
            errors: ['time']
        })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.id === emojiOne.value) {
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
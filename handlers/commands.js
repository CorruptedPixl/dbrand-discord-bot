const { readdirSync } = require("fs")
const { log } = require("console");

module.exports = (bot) => {

    const load = dirs => {
        const commands = readdirSync(`commands/${dirs}/`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            let command = require(`../commands/${dirs}/${file}`);
            bot.commands.set(command.info.name, command);
            log(`Command ${file} loaded!`);
            if (command.info.aliases) command.info.aliases.forEach(alias => bot.aliases.set(alias, command.info.name));
        }
    };

    // add command categories below (and as folder in the /commands/ dir)
    ["misc"/*, "moderation"*/].forEach(category => load(category));
};
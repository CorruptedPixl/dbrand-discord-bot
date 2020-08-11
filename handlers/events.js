const { readdirSync } = require("fs");
const { log } = require("console");

module.exports = (bot) => {

    const load = dirs => {
        const events = readdirSync(`./events/${dirs}/`).filter(file => file.endsWith('.js'));

        for (let file of events) {
            const event = require(`../events/${dirs}/${file}`);
            let eName = file.split('.')[0];
            bot.on(eName, event.bind(null, bot));
            log(`Event ${eName} loaded!`);
        }
    };
    ["client", "guild"].forEach(category => load(category));
};
const { Client, Collection } = require("discord.js");
const config = require('./config.json');
const bot = new Client();

bot.commands = new Collection();
bot.aliases = new Collection();
bot.prefix = config.prefix;

require('dotenv').config()
require('./handlers/commands.js')(bot);
require('./handlers/events.js')(bot);


bot.login(process.env.CLIENT_TOKEN);
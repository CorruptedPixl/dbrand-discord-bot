const { Client, Collection } = require("discord.js");
require('dotenv').config()
// require('handlers/commands')(bot);
// require('handlers/events')(bot);

const bot = new Client();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.prefix = '!';

bot.login(process.env.TOKEN);
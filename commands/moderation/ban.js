require(`dotenv`).config();
const msgDeleteDelay = process.env.msgDeleteDelay;
const prefix = process.env.prefix;

module.exports = {
  run: async (client, message, args) => {
    message.channel.bulkDelete(1);
    message.channel.send(`This module isn't finished yet. Bug Pixl about it or something.`)
      .then(msg => {
        msg.delete({ timeout: msgDeleteDelay });
      });
  },

  info: {
    name: `ban`,
    description: `Usage: ${prefix}ban id reason`,
    help: `Bans specified user`
  }
};
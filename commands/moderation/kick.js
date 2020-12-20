require(`dotenv`).config();
const msgDeleteDelay = process.env.msgDeleteDelay;
const prefix = process.env.prefix;

module.exports = {
  run: async (client, message, args) => {

  },

  info: {
    name: `kick`,
    help: `Kicks specified user`
  }
}; 
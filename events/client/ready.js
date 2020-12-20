module.exports = async bot => {
  const status = `over ${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} dipshits`;
  bot.user.setStatus(`idle`);
  bot.user.setActivity(status, { type: `WATCHING` });
  console.log(`✔ Bot Ready!`);

  switch (bot.guilds.size) {
  case 1:
    console.log(`The bot is online in 1 server.`);
    break;

  default:
    console.log(`The bot is online in ${bot.guilds.cache.size} servers.`);
    break;
  }
};
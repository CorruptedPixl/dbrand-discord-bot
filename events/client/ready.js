module.exports = async (bot) => {
    let status = `over ${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} dipshits`
    bot.user.setActivity(status, { type: "WATCHING" });
}
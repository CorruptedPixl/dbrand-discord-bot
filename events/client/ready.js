module.exports = async bot => {
    let status = "With y'alls feelings"
    bot.user.setActivity(status, { type: "PLAYING" });
}
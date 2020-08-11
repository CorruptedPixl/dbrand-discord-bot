module.exports = {
    info: {
        name: "ping",
        description: `pings the bot and reports the... ping...`
    },
    run: async (client, message) => {
        message.channel.send("Pong...").then(msg => {
            msg.edit(`<:max:619335115268423691> ${msg.createdTimestamp - message.createdTimestamp} ms`);
        });
    }
}

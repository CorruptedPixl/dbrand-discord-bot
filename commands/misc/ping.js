module.exports = {
    info: {
        name: "ping",
        description: `pings the bot and reports the... ping...`
    },
    run: async (client, message) => {
        message.channel.send(`Pong! <:max:619335115268423691> \nThe current ping is ${Math.floor(client.ws.ping)} ms`);
    }
}
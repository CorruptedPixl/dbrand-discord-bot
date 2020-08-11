module.exports.run = async (client, message) => {
    message.delete();
    console.log(`Ping is ${client.ping}!`);
    message.channel.send(`Pong! \nThe current ping is ${Math.floor(client.ping)} ms`)

}

module.exports.help = {
    name: "ping",
    description: `pings the bot and reports the... ping...`,
    helpimage: "./commands/assets/ping-help.png"
}
# dbrand-discord-bot

## What's this

A custom built Discord bot using Discord.js V12 for the [dbrand server](https://discord.gg/dbrand).

### Prerequisites

This bot is made to run on server side js such as node. If you want to run it you'll have to install it first. Google can help you with this.

### Installing

Download the source code and run the index.js file. It'll load all the necessary commands and other files such as the config.json.

I've changed the way the bot loads the token to be more secure. This is accomplished by using a .env file. As with config.json, this is not included but should be in the same directory as index.js. Here's an example of what your .env file should look like.

```env
CLIENT_TOKEN=YourTokenHere
```

To verify that the bot is online, run `npm start` and you should see the Discord bot appear online on your server.
_Note: this requires nodemon to be installed so be sure that you have all dependencies installed if you run into any issues._

Test it out by running the ping command: `!ping`

If you see `Pong! The current ping is 148 ms` the bot's up and running!

## Built With

- [Discord.js](https://discord.js.org/#/) - The JavaScript framework used

## Special thanks to

[Misly](https://github.com/Misly16) for helping with the bot's structure and some examples!

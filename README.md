
# discord-devbot

A custom built Discord bot using Discord.js

## Why

The point of this project is to improve my JavaScript skills and also get something functional out of it. I have a few different Discord servers that could use a bot so this is the perfect solution.

### Prerequisites

This bot is made to run on server side js such as npm. If you want to run it you'll have to install it first.

### Installing

Download the source code and run the index.js file. It'll load all the necessary commands and other files such as the config.json. This file isn't included because of obvious security reasons so you'll have to make it yourself. Just copy the text below in a *config.json* file in the root directory.

```json
{
    "prefix": "!",
    "msgDeleteDelay": 5000
}
```

I've changed the way the bot loads the token to be more secure. This is accomplished by using a .env file. As with config.json, this is not included but should be in the same directory as index.js. Here's an example of what your .env file should look like.

```.env
CLIENT_TOKEN=YourTokenHere
```

To verify that the bot is online, run ``npm start``and you should see the Discord bot appear online on your server.
Note: this requires nodemon to be installed so be sure that you have all dependencies installed if you run into any issues.

Test it out by running the ping command: ``!ping``

If you see ``Pong! The current ping is 148 ms`` the bot works!

## Built With

* [Discord.js](https://discord.js.org/#/) - The JavaScript framework used

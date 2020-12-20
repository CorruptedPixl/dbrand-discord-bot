const Discord = require(`discord.js`);
require(`dotenv`).config();
const fetch = require(`node-fetch`);
const msgDeleteDelay = process.env.msgDeleteDelay;
const prefix = process.env.prefix;
const shippingDataUrl = process.env.shippingDataUrl;

const { shippingArray, /*howtoArray*/ } = require(`../../commands/command-config/sitemap-arrays.json`);

module.exports = {
  run: async (client, message, args) => {

    // Maps whole array and turns into lowercase for checks later
    args = args.map(arg => arg = arg.toLowerCase());

    // Defines global variables
    let destination;
    // Sets standard link to add to later
    let link = `https://dbrand.com/`;


    // Deletes user message and sends an error if they don't give any args
    if (args.length === 0) {
      message.delete();
      message.channel.send(`No argument. Please use !db *argument*`);
    }


    else if (args.length > 0) {

      //!Below are the supported functions that handle certain db args
      // Set link to grip
      const caseGrip = () => {
        link = `${link  }shop/grip/#grip-devices`;
        message.delete();
      };

      // Set link to support
      const caseSupport = () => {
        link = `${link  }contact`;
        message.delete();
      };

      // Set link to skins
      const caseSkin = () => {
        link = `${link  }shop/skins`;
        message.delete();
      };

      // Set link to Prism
      const casePrism = () => {
        link = `${link  }shop/prism`;
        message.delete();
      };

      const caseShipping = () => {
        let matches;
        // Deletes user's message
        message.delete();

        // Checks for an argument
        if (args[1] !== undefined) {

          // Tests via a regex if the argument is only characters, not emoji's or special chars or numbers
          const isTextOnly = /^[A-Z-]+$/i.test(args[1]);
          if (!isTextOnly) {
            message.channel.send(`Emoji's and special chars are not supported. Please type part of the country's name or two letter country code to search.`)
              .then(msg => {
                msg.delete({ timeout: msgDeleteDelay });
              });
          }

          if (args[1].length === 2 && isTextOnly){
            try {
              // Try getting the data from dbrand's shipping api
              fetch(`${shippingDataUrl}${args[1]}`)
                .then(res => res.json())
                .then(json => fillData(json))
                .catch(err => {
                  console.error(`Fetching [${shippingDataUrl}${args[1]}] FAILED, ${err}`);
                  message.channel.send(`\`${err}\` \nLooks like something went wrong. If it keeps failing, please ping Pixl`)
                    .then(msg => {
                      msg.delete({ timeout: msgDeleteDelay });
                    });
                });


              // Create and send the embed with data from the api res
              const fillData = async json => {
                if (!json.is_valid){
                  throw new Error(`Invalid country code`);
                } 
                // Check that shipping is available
                else if (!json.shipping_available) {
                  message.reply(json.unavailable_message.split(`.`)[0]);
                  return;
                }

                const countrySafe = json.country.replace(`the `, ``).replace(/\s+/g, `-`).toLowerCase();
                const encodedURI = encodeURI(`${link}shipping/${countrySafe}`);
                const shippingOptions = await loadShippingOptions(json);

                const dbrandShippingEmbed = new Discord.MessageEmbed()
                  .setTitle(`Shipping to ${json.country}`)
                  .setDescription(`Click the link above to see shipping time to ${json.country}. \n[View all destinations](https://dbrand.com/shipping)  |  [Check shipping status](https://dbrand.com/status#main-content:~:text=${encodeURI(countrySafe.replace(/-/g, ` `))})`)
				          .setURL(encodedURI)
                  .setColor(`#ffbb00`)
                  .setTimestamp()
                  .setThumbnail(`https://dbrand.com/${json.country_flag}`)
                  .setFooter(`dbrand.com`, `attachment://db-logo.png`);

                shippingOptions.forEach(option => dbrandShippingEmbed.addField(option.name, option.value, true));

                message.channel.send(dbrandShippingEmbed);

              };

              // Add shipping options
              const loadShippingOptions = async json => {
                /* eslint-disable-next-line*/
                let shippingData = [];
                // Fill in the first response from the initial json we got, then loop over the others to fetch and fill
                shippingData.push({name: json.shipping_services_available[0].title, value: json[`time-title`]});
                const shippingServices = json.shipping_services_available.slice(1);
				
                for (const shippingOption of shippingServices) {
                  await fetch(`${shippingDataUrl}${args[1]}/${shippingOption.url}`)
                    .then(res => res.json())
                    .then(json => shippingData.push({name: shippingOption.title, value: json[`time-title`]}))
                    .catch(err => {
                      //TODO add error handling function to clean up this mess throughout the code
                      console.error(`Fetching [${shippingDataUrl}${args[1]}] FAILED, ${err}`);
                      message.channel.send(`\`${err}\` \nLooks like something went wrong. If it keeps failing, please ping Pixl`)
                        .then(msg => {
                          msg.delete({ timeout: msgDeleteDelay });
                        });
                    });
                }
                return shippingData;
              };

            } catch (error) {
              message.channel.send(`Looks like something went wrong. Try again in a bit. If it keeps failing, please ping Pixl`)
                .then(msg => {
                  msg.delete({ timeout: msgDeleteDelay });
                });
            }


          }
          // If not 2 character arg (usually country code)
          else {

            //combines arg[1] and arg[2] to also find "united-states" and such
            const searchTerms = args.slice(1, 3).join(`-`);

            //Creates an array with all country's found that match part of the substring (arg1)
            matches = shippingArray.filter(s => s.includes(searchTerms.toString().toLowerCase()));

            if (matches.length > 0) {
              link = `https://dbrand.com/shipping/${matches[0]}`;
              destination = matches[0];

              const shippingEmbed = new Discord.MessageEmbed()
                .setTitle(`Shipping to ${destination}`)
                .setDescription(`Click the link above to see shipping time to ${destination}. \nYou can also [view all shipping destinations here](https://dbrand.com/shipping)`)
                .setURL(`${link}`)
                .setColor(`#ffbb00`)
                .setTimestamp()
                .attachFiles([`../dbrand-bot-V2/commands/assets/db-logo.png`])
                .setFooter(`dbrand.com`, `attachment://db-logo.png`);
              message.channel.send(shippingEmbed);

            } else if (isTextOnly) {
              link = `${link  }shipping`;

              const shippingEmbedNotFound = new Discord.MessageEmbed()
                .setTitle(`Check shipping times here!`)
                .setDescription(`Country not found.\nYou can [view all shipping destinations here](https://dbrand.com/shipping)`)
                .setURL(`${link}`)
                .setColor(`#ffbb00`)
                .setTimestamp()
                .attachFiles([`../dbrand-bot-V2/commands/assets/db-logo.png`])
                .setFooter(`dbrand.com`, `attachment://db-logo.png`);
              message.channel.send(shippingEmbedNotFound);
            }
          }
        } else {
          message.reply(`Please type the county code you want to view shipping options for. e.g. \`!db ship GB\``)
            .then(msg => {
              msg.delete({ timeout: msgDeleteDelay });
            });
        }
      };

      const caseUnknown = () => {
        message.reply(`Unknown argument. Please choose from \`grip, support, help, skins, prism or shipping\``)
          .then(message.delete())
          .then(msg => {
            msg.delete({ timeout: msgDeleteDelay });
          });
      };

      //!This checks the first argument. Handles it if found, if not, it just stops
      switch (args[0]) {
      //Grip
      case `grip`: caseGrip(); break;
      case `g`: caseGrip(); break;
        //Support
      case `support`: caseSupport(); break;
      case `help`: caseSupport(); break;
      case `contact`: caseSupport(); break;
      case `h`: caseSupport(); break;
      case `c`: caseSupport(); break;
        //Skins
      case `skins`: caseSkin(); break;
      case `skin`: caseSkin(); break;
      case `s`: caseSkin(); break;
        //Prism
      case `prism`: casePrism(); break;
      case `p`: casePrism(); break;

        //Larger commands
      case `shipping`: caseShipping(); break;
      case `ship`: caseShipping(); break;

      default:
        caseUnknown(); break;
      }


      const dbEmbedLink = new Discord.MessageEmbed()

        .setTitle(link)
        .setURL(link)
        .setDescription(link)
        .setThumbnail(`attachment://db-logo.png`)
        .addField(`Regular field title`, `Some value here`)
        .addField(`\u200B`, `\u200B`)
        .setColor(`#ffbb00`)
        .addField(`Inline field title`, `Some value here`, true)
        .addField(`Inline field title`, `Some value here`, true)
        .attachFiles([`../dbrand-bot-V2/commands/assets/db-logo.png`])
        .setImage(`attachment://db-logo.png`)
        .setTimestamp()
        .setFooter(`dbrand.com`, `attachment://db-logo.png`);

      // .setTitle(`Check item here!`)
      // .setDescription(`${link}`)
      // .setURL(`${link}`)
      // .setColor('#ffbb00')
      // .setTimestamp()
      // .attachFiles(['../dbrand-bot-V2/commands/assets/db-logo.png'])
      // .setFooter('dbrand.com', 'attachment://db-logo.png')


      if (args[0] !== `shipping` && args[0] !== `ship`) {
        message.channel.send(dbEmbedLink);
      }

    }

    else {
      message.delete();
      message.channel.send(`Invalid command, please try again ${message.member} \nCurrent commands are !db grip, support, shipping, skins and prism.`)
        .then(msg => {
          msg.delete({ timeout: msgDeleteDelay });
        });
    }

  },

  info: {
    name: `db`,
    description: `Use \`${prefix}db x y\` to post a link in chat to a specific product. For example \`${prefix}db grip op7p\``,
    help: `get quick links to skins, grip, shipping info and support`
  }
};

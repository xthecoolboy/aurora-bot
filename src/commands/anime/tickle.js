/** 
 * @author ZYROUGE
 * @license GPL-3.0
*/

const { Command } = require("aurora");
const axios = require("axios");

class _Command extends Command {
    constructor (client) {
        super(client, {
            name: "tickle",
            description: "Tickle your loved ones!",
            usage: "<user|name>",
            guildOnly: false,
            aliases: [],
            permission: {
                bot: ["embedLinks"],
                user: []
            },
            enabled: true
        });
    }

    async run(message, args) {
        const responder = new this.client.responder(message.channel);
        try {
            const eEmbed = this.client.embeds.error(null, {
                description: 'Couldn\'t fetch an Image.'
            });
            const { data } = await axios.get(`https://nekos.life/api/v2/img/tickle`).catch(e => {
                return responder.send({ embed: eEmbed });
            });
            if(!data || !data.url) return responder.send({ embed: eEmbed });
            const embed = this.client.embeds.embed();
            embed.description = `${message.author.mention} tickles **${args.join(" ") || "Air"}**`;
            embed.image = {
                url: data.url
            };
            embed.color = this.client.utils.colors.pink;
            responder.send({ embed });
        } catch(e) {
            responder.send({
                embed: this.client.embeds.error(message.author, {
                    description: `${this.client.emojis.cross} Something went wrong. **${e}**`
                })
            });
        }
    }
}

module.exports = _Command;
const { Command } = require("aurora");

/** 
 * @author ZYROUGE
 * @license GPL-3.0
*/

class _Command extends Command {
    constructor (client) {
        super(client, {
            name: "",
            description: "",
            usage: "",
            guildOnly: true,
            aliases: [],
            permission: {
                bot: [],
                user: []
            },
            enabled: false
        });
    }

    async run(message, args) {
        const responder = new this.client.responder(message.channel);
        try {

        } catch(e) {
            
        }
    }
}

module.exports = _Command;
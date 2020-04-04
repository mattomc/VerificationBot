const Discord = require('discord.js');
const colors = require("colors");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const config = require("./config.json");

bot.on("message", async message => {
    if (message.content == `${config.prefix}verify`) {
        message.delete().catch(O_o=>{})
        if(message.guild.id === config.serverid) return message.reply(`Use this command in other Discord servers other than this.`).then(msg => msg.delete(30000));
        const list = bot.guilds.get(config.serverid);

        let role1 = message.guild.roles.find(r => r.name === main.rolename)
        if(!role1) {
            message.guild.createRole({
                name: config.rolename,
                color: "BLUE",
                mentionable: true,
                permissions: ["ADD_REACTIONS", "SEND_MESSAGES", "VIEW_CHANNEL"]
            }).catch(console.error)
            return message.channel.send(`I could not find the role named ${config.rolename}. I have created one for you please redo the command`).then(msg => msg.delete(15000) & console.log(`Created role named ${main.rolename} in ${message.guild.name}!`))
        }

         let user_id = message.author.id;

         if(list.member(user_id)) {
             message.channel.send(`Success! ${message.author.username} was verified`).then(msg => msg.delete(30000));
             message.member.addRole(role1).catch();
             console.log(`${user_id} or ${message.author.username} was verified and given the ${config.rolename} Role.`.green);
            
            }else{
            
             message.channel.send(`Error! ${message.author.username}, You are not in the server`).then(msg => msg.delete(30000));
             console.log(`${user_id} or ${message.author.username} was not verified. we could not find their ID in the Discord server!`.red);
            
            }
    }
});

bot.on("guildCreate", async guild => {
    console.log(`Bot has been added to ${guild.name}`)
});

bot.on("guildDelete", async guild => {
    console.log(`Bot has been removed from ${guild.name}`)
});


bot.on("message", async message => {
    //a little bit of data parsing/general checks
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    let content = message.content.split(" ") || "Image/Embed";
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;
  });



bot.on("ready", () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`.blue.bold)
    console.log("Servers:".red)
    bot.guilds.forEach((guild) => {
        console.log(" - ".red + guild.name.green + " with ID: ".red + guild.id.green)
    })
    console.log("---------------------------------------\n")
    bot.user.setActivity(`${config.presence}`);
})

bot.login(config.token);

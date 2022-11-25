const { bprefix, developerID } = require("./config.json")
const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang, pau, on, off} = require("./emojis.json")
const math = require("mathjs")
const { config } = require("dotenv");
const fetch = require("node-fetch");
const db =require("quick.db");
const moment = require("moment");
const ima = require("image-cord")
const Discord = require('discord.js')
const { Client, MessageEmbed, Collection }  = require('discord.js');
const { readdirSync } = require("fs");
const { join } = require("path");

const client = new Discord.Client({
  disableEveryone: false
});
const disbut = require('discord-buttons')
disbut(client)
client.queue = new Map();
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
let cooldown = new Set();
let cdseconds = 3; 
 const DisTube = require("distube")
const queue2 = new Map();
const queue3 = new Map();
const queue = new Map();
const games = new Map()

const yts = require('yt-search');

const ads = require("./JSON/ad.json")



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
process.on('UnhandledRejection', console.error);


client.on("message", async message => {
  let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = bprefix
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
  
   const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {

    let embed = new MessageEmbed()
        .setTitle(`${client.user.username} is Here!`)
        .setDescription(`Hey **${message.author.username},** It's me ${client.user.username}. Here are some my config: 

        ${dot}Bot Prefix: \`${prefix}\`
        ${inv}Invite Link: [Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)
        `)
        .setColor("#EFB9BE")
        .setFooter(`Thanks for using me`)

    return message.channel.send(embed);
  }


    
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
let ad = ads.ad[Math.floor((Math.random() * ads.ad.length))];
  if(cooldown.has(message.author.id)){

    return message.channel.send(`**${message.author.username}** please wait 3 seconds to use this command again! \n\n ${ad}`)
  }
  cooldown.add(message.author.id);
  setTimeout(() => {
cooldown.delete(message.author.id)}, cdseconds * 1000)

  if (!message.member)
    message.member = message.guild.fetchMember(message);


  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command.premium) {
    let guild = await db.get(`premium_${message.guild.id}`);

 let pree = new MessageEmbed()
      .setDescription(`**${pr} This server is not premium server.** \n${b}${dot} Use \`${prefix}premium supreme2022\` to get free 1 year premium.`)
    if (!guild) {
      return message.channel.send(pree)
    }

  }
   let ops = {
            queue: queue,
            queue2: queue2,
            queue3: queue3,
            games: games
        }

         let color = db.get(`color_${message.author.id}`);
  if(color === null) color = "#EFB9BE";


  if (command) command.run(client, message, args, ops, color);
  

});



client.on("message", async message => {

const channel = db.get(`count_${message.guild.id}`);


const chan = client.channels.cache.get(channel);
 if (message.channel.id == chan) {
    if (message.author.bot) return;
    message.channel.startTyping();

     if(isNaN(message.content)) {
       message.delete();
                return message.author.send(`You should include only number!`)
            
            }
message.channel.send(`${math.evaluate(`${message.content} + 1`)}`)
 message.channel.stopTyping();

 }

        
});


// Do not change anything here
require('http').createServer((req, res) => res.end(`
 |-----------------------------------------|
 |              Informations               |
 |-----------------------------------------|
 |• Alive: 24/7                            |
 |-----------------------------------------|
 |• Server: https://dsc.gg/logistack       |
 |-----------------------------------------|
 |• Github: https://github.com/logistacks  |
 |-----------------------------------------|
 |• License: MIT                           |
 |-----------------------------------------|
`)).listen(3000) //Dont remove this 

client.on("ready", () => {
   client.user.setStatus("dnd"); // You can change it to online, dnd, idle

 console.log(`Successfully logined as ${client.user.tag} `)
});




//  For Watching Status
// client.on("ready", () => {
// client.user.setActivity(`https://`, { type: "WATCHING" })
// console.log(`Successfully logined as ${client.user.tag}});

client.login(process.env.TOKEN);

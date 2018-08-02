// Load up the discord.js library
const Discord = require("discord.js");

//The actual client object
const client = new Discord.Client();
 
const config = require("./auth.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => { //runs if login was successful
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`Playing Fortnite with ${client.guilds.size} friends`);
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Playing Fortnite with ${client.guilds.size} friends`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Playing Fortnite with ${client.guilds.size} friends`);
});

console.log("* \r");
console.log("* \r");
console.log("* \r");


client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.
  
    //checks to see if it is the author of the new message
    if(message.author.bot) 
        return;
  
    //checks to see if the prefix command was used
    if(message.content.indexOf(config.prefix) !== 0) 
        return;
  
    // Here we separate our "command" name, and our "arguments" for the command. 
    const args = message.content.slice(1, message.content.lenght);
    //message.channel.send(args);

    // const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    // const command = args.shift().toLowerCase();
  
    if(args === "ping") { //calculates latency
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`); 
    }
  
    if(args === "say") { //make the bot say anything
        const sayMessage = args.join(" ");
        console.log("User called the !say function");
        message.delete().catch(O_o=>{}); //delete command message
        message.channel.send(sayMessage); //send copied message
    }
  
    if(args === "purge") { //removes up to 100 messages in a channel

        // get the delete count, as an actual number.
        const deleteCount = parseInt(args[0], 10);
    
        // Ooooh nice, combined conditions. <3
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }

    if(args === "good bot") { //Cale wanted it
        
        const sayMessage = "You're too kind " + ":grin:";
        console.log("User called the !good bot function");
        message.channel.send(sayMessage);
    }

    if(args === "bad bot") { //Cale also wanted it
        
        const sayMessage = "I'm sorry... " + ":cry:";
        console.log("User called the !bad bot function");
        message.channel.send(sayMessage);
    }

    if(args === "joke") { //dumbest joke
        
        const sayMessage = "Your mom.";
        console.log("User called the !joke function");
        message.channel.send(sayMessage);
    }

    if(args === "help") { //providing a list of supported commands
    
        const sayMessage = "Current supported commands: \r\r" +
                            "**!ping** - calculate server latency \r" +
                            "**!say** - repeat what user says \r" +
                            "**!purge** (Lynard only) - delete up to 100 messages \r" +
                            "**!good bot** - Thanks! \r" +
                            "**!bad bot** - awhh.... \r" +
                            "**!joke** - It's a good one. \r";
        
        console.log("User called the !help function");
        message.channel.send(sayMessage); //sends message
    }
});

client.login(config.token);

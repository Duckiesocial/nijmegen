const discord = require("discord.js");

const botConfig = require("./botconfig.json");

const fs = require("fs");



const active = new Map();



const bot = new discord.Client();

bot.commands = new discord.Collection();





fs.readdir("./commands/", (err, files) => {







    if(err) console.log(err);







    var jsFiles = files.filter(f => f.split(".").pop() === "js");







    if(jsFiles.length <=0) {



        console.log("Kon geen Files vinden!");



        return;



    }







    jsFiles.forEach((f, i) => {







        var fileGet = require(`./commands/${f}`);



        console.log(`De file ${f} is Binnen`);







        bot.commands.set(fileGet.help.name, fileGet);



    })







});







bot.on("ready", async () => {



    console.log(`${bot.user.username} Is nu online!`)



    bot.user.setActivity(`Nijmegen en naar ${bot.users.size} Leden`, {type: "WATCHING"});



});





bot.on("guildMemberAdd", member =>{







    var role = member.guild.roles.find("name", "Burger van Delft");





    if( !role) return message.channel.send("This role Doesnt Exist!");





    member.addRole(role);





    const channel = member.guild.channels.find("name", "📄kletsen📃");





    if (!channel) return;





    channel.send(`Welkom in **Nijmegen RolePlay | NRP** ${member}`);





});





bot.on("message", async message => {







    // ALs bot bericht stuurt dan Return



    if(message.author.bot) return;



    if(message.channel.type === "dm") return;



    var prefix = botConfig.prefix;



    var messageArray = message.content.split(" ");



    var command = messageArray[0];



    var arguments = messageArray.slice(1);



    var commands = bot.commands.get(command.slice(prefix.length));



    var options = {

        active: active



    }



    if (commands) commands.run(bot, message, arguments, options);





    // if( command === `${prefix}hallo`){







    //     return message.channel.send(`Hey hoe gaat het ${message.author.username}!`);





});





bot.login(process.env.token)
module.exports.run = async (bot, message, args) => {

    if (!message.member.voiceChannel) return message.channel.send("Gelieve met een spraak kanaal te verbinden.");

    if (!message.guild.me.voiceChannel) return message.channel.send("Sorry de bot is niet met een spraak kanaal verbonden.");

    if (message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send("Sorry je bent niet met hetzelfde kanaal verbonden.");

    message.guild.me.voiceChannel.leave();

    message.channel.send("Kanaal aan het verlaten...");    
}

module.exports.help = {
    name: "leave",
    description: "Laat de bot leaven van het kanaal."
}
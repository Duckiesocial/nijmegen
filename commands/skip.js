const discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {

    // Ophalen van het ID van de server voor de data.
    var guildIDData = ops.active.get(message.guild.id);

    // Nakijken als er al liedjes gepsleet worden in deze server.
    if (!guildIDData) return message.channel.send("Er is geen muziek aan het spelen op dit moment.");

    // Nakijken als in zelfde kanaal zit als de bot.
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Sorry je zit niet in een zelfde kanaal als de bot");

    // Het aantal members opvragen in het spraakkanaal.
    var amountUsers = message.member.voiceChannel.members.size;

    // Berekenen hoe veel er nodig zijn om te stemmen voor het skippen.
    var amountSkip = Math.ceil(amountUsers / 2);

    // We moeten de data toevoegen aan onze al bestaande data daarom gaan we een array aanmaken met de id's van de users die al gevote hebben.
    if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

    // Als je al eens gestemd hebt mag je niet meer stemmen.
    if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry je hebt al eens gevote. ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);

    // Data toevoegen aan de array.
    guildIDData.queue[0].voteSkips.push(message.member.id);

    // Updaten van de data.
    ops.active.set(message.guild.id, guildIDData);

    // Nakijken als we kunnen skippen.
    if (guildIDData.queue[0].voteSkips.length >= amountSkip) {

        message.channel.send("Opweg naar het volgend liedje");

        // Roep in de dispatcher finish op.
        return guildIDData.dispatcher.emit("end");

    }

    message.channel.send(`Tegevoegd van skip aanvraag. ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);

}

module.exports.help = {
    name: "skip",
    description: "Skip een liedje"
}
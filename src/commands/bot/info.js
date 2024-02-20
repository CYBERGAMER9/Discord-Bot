const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const promises = [
        client.shard.broadcastEval(client => client.guilds.cache.size),
        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        client.shard.broadcastEval(client => client.channels.cache.size),
        client.shard.broadcastEval(client => client.voice.adapters.size)
    ];
    return Promise.all(promises)
        .then(async results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
            const totalVoice = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);

            const duration = moment.duration(client.uptime).format("\`D\` [days], \`H\` [hrs], \`m\` [mins], \`s\` [secs]");

            client.embed({
                title: `<:TWD_INFO:1208096044173361274>・Bot information`,
                desc: `____________________________`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                fields: [
               {
                    name: "<:TWD_INFO:1208096044173361274>┆Information",
                    value: `Bot is a bot with which you can run your entire server! With no less than 350+ commands, we have a large bot with many options to improve your server!`,
                    inline: false,
                },
                {
                    name: "_____ \n\n│General",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "<:TWD_BOTS:1183034435390685234>┆Bot name",
                    value: `${client.user.username}`,
                    inline: true,
                },
                {
                    name: "<:TWD_ID_CARD:1183024415185842268>┆Bot id",
                    value: `${client.user.id}`,
                    inline: true,
                },
                {
                    name: "<a:TWD_WIFI:1183374744515526656>┆Shards",
                    value: `\`${client.options.shardCount}\` shards`,
                    inline: true,
                },
                {
                    name: "<a:TWD_CROWN:1183033867951685674>┆Bot owner",
                    value: `<@!1169487822344962060>`,
                    inline: true,
                },
                {
                    name: "<:TWD_USAGE:1183243972013993984>┆Bot developer",
                    value: `<@!1169487822344962060> <@!892608407444520970>`,
                    inline: true,
                },
                {
                    name: "<:TWD_EXAMPLE:1183244489276522548>┆Commands",
                    value: `\`${client.commands.size}\` commands`,
                    inline: true,
                },
                {
                    name: "<a:TWD_USERS:1183029058775285832>┆Servers",
                    value: `\`${totalGuilds}\` servers`,
                    inline: true,
                },
                {
                    name: "<a:TWD_USERS:1183029058775285832>┆Servers this shard",
                    value: `\`${client.guilds.cache.size}\` servers`,
                    inline: true,
                },
                {
                    name: "<:TWD_USERNAME:1183051792494379129>┆Members",
                    value: `\`${totalMembers}\` members`,
                    inline: true,
                },
                {
                    name: "<a:TWD_SPEAKER:1208831274496557066>┆Connected channels",
                    value: `\`${totalVoice}\` channels`,
                    inline: true,
                },
                {
                    name: "<:TWD_CHANNEL:1183028361820373208>┆Channels",
                    value: `\`${totalChannels}\` channels`,
                    inline: true,
                },
                {
                    name: "<a:TWD_CALLENDER:1183028715077238865>┆Created",
                    value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },

                {
                    name: "_____ \n\n│System",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "<a:TWD_UPTIME:1183374458581430393>┆Uptime",
                    value: `${duration}`,
                    inline: true,
                },
                {
                    name: "<a:TWD_TIMER:1183025564559351868>┆API speed:",
                    value: `\`${client.ws.ping}\`ms`,
                    inline: true,
                },
                {
                    name: "🏷┆Bot Version",
                    value: `\`${require(`${process.cwd()}/package.json`).version}\``,
                    inline: true,
                },
                {
                    name: "🏷┆Node.js Version",
                    value: `\`${process.version}\``,
                    inline: true,
                },
                {
                    name: "📂┆Discord.js Version",
                    value: `\`${Discord.version}\``,
                    inline: true,
                },
                {
                    name: "💾┆Bot memory",
                    value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`,
                    inline: true,
                },
                {
                    name: "🔗┆Links",
                    value: `Add me: [[HERE]](${client.config.discord.botInvite}) \nSupport server: [[HERE]](${client.config.discord.serverInvite})`,
                    inline: false,
                }],
                type: 'editreply'
            }, interaction)
        })
}



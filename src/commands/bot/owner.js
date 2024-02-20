const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `<:TWD_USERNAME:1183051792494379129>・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "<a:TWD_CROWN:1183033867951685674>┆Owner name",
            value: `CYBER`,
            inline: true,
        },
        {
            name: "<:TWD_ID_CARD:1183024415185842268>┆Discord tag",
            value: `</cyber>`,
            inline: true,
        },
        {
            name: "<:TWD_LOGO:1183009939371868241>┆Organization",
            value: `Third World Development`,
            inline: true,
        },
        {
            name: "<:TWD_DISCORD:1183397647801909390>┆Server",
            value: `[Click Here](https://discord.gg/uPtx8Pz9q7)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 

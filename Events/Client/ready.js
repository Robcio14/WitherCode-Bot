// |----------------------------------------------------------|
// |
// | COPYRIGHT dwayne5 | 2024
// |
// |----------------------------------------------------------|

const { Client } = require('discord.js');
const config = require('../../BotConfig/config.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);

        // Set bot activities
        const activities = [
            'Ogląda withercode',
            'Made By dwayne5'
        ];
        setInterval(() => {
            const status = activities[Math.floor(Math.random() * activities.length)];
            client.user.setPresence({ activities: [{ name: `${status}` }] });
        }, 6000);

    }}

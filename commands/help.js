import { SlashCommandBuilder } from 'discord.js';

export default { 
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('OverWhich help'),
    async execute(interaction) {
        await interaction.reply('Use the following commands to get a random hero: `/tank`, `/dps`, or `/support`.');
    }
}

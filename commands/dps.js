import { SlashCommandBuilder } from 'discord.js';
import { heroSelect, buildResponseMessage } from '../utils/utils.js';

const ROLE = 'dps'

export default { 
    data: new SlashCommandBuilder()
        .setName(ROLE)
        .setDescription(`Select a ${ROLE}`),
    async execute(interaction) {
        const hero = await heroSelect(ROLE);
        const responseMessage = buildResponseMessage(hero)
        await interaction.reply(responseMessage);
    }
}